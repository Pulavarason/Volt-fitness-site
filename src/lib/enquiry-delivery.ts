import type { EnquiryInput } from "./validation";

/**
 * ─────────────────────────────────────────────────────────────
 *  ENQUIRY DELIVERY — THE BACKEND INTEGRATION POINT
 * ─────────────────────────────────────────────────────────────
 *  Set ENQUIRY_WEBHOOK_URL in .env.local (see .env.example) and every
 *  validated enquiry is POSTed there as JSON. Works with:
 *    • Google Apps Script web-app (→ Google Sheet + email)
 *    • Zapier / Make / n8n webhooks
 *    • Formspree / Basin / any JSON endpoint
 *  For email via Resend/SendGrid/SMTP, replace the body of this function.
 */
export type DeliveryResult = "delivered" | "not-configured";

export async function deliverEnquiry(e: EnquiryInput): Promise<DeliveryResult> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return "not-configured";

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      ...e,
      source: "voltt-website",
      receivedAt: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return "delivered";
}
