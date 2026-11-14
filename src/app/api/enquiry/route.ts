import { NextResponse } from "next/server";
import { validateEnquiry, type EnquiryInput } from "@/lib/validation";
import { deliverEnquiry } from "@/lib/enquiry-delivery";

export const runtime = "nodejs";

/* ── Spam protection ──────────────────────────────────────────
 *  1. Honeypot field ("website") — humans never fill it.
 *  2. Time trap — forms submitted < 2.5 s after render are bots.
 *  3. Per-IP rate limit (in-memory; use Redis/Upstash if you scale out).
 *  4. Payload size cap + strict validation (shared with the client).
 *  Upgrade path: add Cloudflare Turnstile / reCAPTCHA verification here.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "");

export async function POST(req: Request) {
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > 10_000) return NextResponse.json({ error: "payload_too_large" }, { status: 413 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // bots: pretend success so they learn nothing
  const elapsed = Date.now() - Number(body.startedAt ?? 0);
  if (clean(body.website, 100) || !Number.isFinite(elapsed) || elapsed < 2500) {
    return NextResponse.json({ ok: true });
  }

  const input: EnquiryInput = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 20),
    email: clean(body.email, 120),
    membership: clean(body.membership, 60),
    goal: clean(body.goal, 80),
    contactMethod: clean(body.contactMethod, 20),
  };

  const errors = validateEnquiry(input);
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", errors }, { status: 422 });

  try {
    const result = await deliverEnquiry(input);
    if (result === "not-configured") {
      if (process.env.NODE_ENV !== "production") {
        console.info("[enquiry] ENQUIRY_WEBHOOK_URL not set — dev mode, logging instead:\n", input);
        return NextResponse.json({ ok: true, delivered: false });
      }
      // Never claim success in production if nobody will receive the enquiry.
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
