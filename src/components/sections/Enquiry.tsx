"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { plans } from "@/data/content";
import { validateEnquiry, CONTACT_METHODS, type EnquiryErrors, type EnquiryInput } from "@/lib/validation";
import { ENQUIRY_EVENT, type EnquiryPrefill } from "@/lib/enquiry-bus";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site, whatsappLink, telLink, has } from "@/config/site";
import { cn } from "@/lib/utils";

const GOALS = [
  "Build muscle",
  "Lose weight / Weight management",
  "Improve strength",
  "General fitness",
  "Beginner / learning the basics",
  "Personal training",
  "Other",
];

const empty: EnquiryInput = { name: "", phone: "", email: "", membership: "", goal: "", contactMethod: "WhatsApp" };
type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full border border-white/15 bg-ink/60 px-4 py-3.5 text-base text-white placeholder:text-mist/70 outline-none transition-colors focus:border-amber focus-visible:outline-none aria-[invalid=true]:border-red-400/80 min-h-[3.25rem]";
const label = "mb-2 block font-display text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-silver";

export function Enquiry() {
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  // Preselect plan / goal when "Enquire Now" is clicked elsewhere
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const d = (e as CustomEvent<EnquiryPrefill>).detail ?? {};
      setValues((v) => ({ ...v, membership: d.plan ?? v.membership, goal: d.goal ?? v.goal }));
      setStatus((s) => (s === "success" ? "idle" : s));
      setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus({ preventScroll: true }), 1500);
    };
    window.addEventListener(ENQUIRY_EVENT, onPrefill);
    return () => window.removeEventListener(ENQUIRY_EVENT, onPrefill);
  }, []);

  const set = (k: keyof EnquiryInput, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };
  const blur = (k: keyof EnquiryInput) => {
    const e = validateEnquiry(values)[k];
    setErrors((p) => ({ ...p, [k]: e }));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (status === "submitting") return;
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    setStatus("submitting");
    setServerMsg("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, website, startedAt: startedAt.current }),
      });
      if (res.ok) {
        setStatus("success");
        setValues(empty);
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      setServerMsg(
        res.status === 429
          ? "Too many attempts. Please wait a few minutes or contact us directly."
          : "We couldn't send your enquiry just now. Please contact us directly using the details below.",
      );
      setStatus("error");
    } catch {
      setServerMsg("Network error. Please check your connection or contact us directly.");
      setStatus("error");
    }
  }

  const planName = plans.find((p) => p.id === values.membership)?.name;
  const wa = whatsappLink(`Hi VOLTT Fitness Studio, I'd like to enquire about membership${planName ? ` (${planName})` : ""}.`);
  const tel = telLink();

  const err = (k: keyof EnquiryInput) =>
    errors[k] ? (
      <p id={`err-${k}`} role="alert" className="mt-1.5 text-sm text-red-300">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof EnquiryInput) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `err-${k}` : undefined });

  return (
    <section id="enquiry" className="relative isolate overflow-hidden">
      <Image src="/images/gym-dark.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/85 to-ink" />

      <div className="container-x section-y grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="eyebrow">09 — Free Trial &amp; Enquiry</span>
          </Reveal>
          <SplitHeading lines={["Your next", "chapter starts", "here."]} lineClass={{ 2: "text-amber" }} className="mt-5 text-[clamp(2.8rem,8vw,6.2rem)]" />
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-md leading-relaxed text-silver">
              Tell us a little about your goals and we&rsquo;ll get back to you with membership details and the next steps — no pressure, just a plan.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-silver">
              {["Takes less than a minute", "We reply using your preferred method", "No spam. Your details stay with the studio"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-px w-6 bg-amber" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="relative border border-line bg-graphite/90 p-6 backdrop-blur-md sm:p-10">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent shadow-[0_0_16px_2px_rgb(214_164_63/0.6)]" />

            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-10 text-center" role="status">
                  <CheckCircle2 className="mx-auto size-14 text-amber" strokeWidth={1.4} />
                  <h3 className="display mt-6 text-5xl">Enquiry received</h3>
                  <p className="mx-auto mt-4 max-w-sm text-silver">Thank you! The VOLTT team will reach out using your chosen contact method soon.</p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    {wa && (
                      <Button href={wa} external variant="outline">
                        <WhatsAppIcon className="size-4" /> Continue on WhatsApp
                      </Button>
                    )}
                    <Button variant="ghost" onClick={() => setStatus("idle")}>
                      Send another enquiry
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" ref={formRef} onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Membership enquiry form">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="enq-name" className={label}>Full Name *</label>
                      <input id="enq-name" name="name" type="text" autoComplete="name" required placeholder="Your name" value={values.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} className={field} {...a11y("name")} />
                      {err("name")}
                    </div>
                    <div>
                      <label htmlFor="enq-phone" className={label}>Phone Number *</label>
                      <input id="enq-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="98765 43210" value={values.phone} onChange={(e) => set("phone", e.target.value)} onBlur={() => blur("phone")} className={field} {...a11y("phone")} />
                      {err("phone")}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="enq-email" className={label}>Email Address</label>
                      <input id="enq-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@email.com" value={values.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} className={field} {...a11y("email")} />
                      {err("email")}
                    </div>
                    <div>
                      <label htmlFor="enq-plan" className={label}>Interested Membership *</label>
                      <select id="enq-plan" name="membership" required value={values.membership} onChange={(e) => set("membership", e.target.value)} onBlur={() => blur("membership")} className={cn(field, "appearance-none", !values.membership && "text-mist/70")} {...a11y("membership")}>
                        <option value="" disabled>Select a plan</option>
                        {plans.map((p) => (
                          <option key={p.id} value={p.id} className="text-ink">{p.name} — {p.duration}</option>
                        ))}
                        <option value="not-sure" className="text-ink">Not sure yet</option>
                      </select>
                      {err("membership")}
                    </div>
                    <div>
                      <label htmlFor="enq-goal" className={label}>Fitness Goal *</label>
                      <select id="enq-goal" name="goal" required value={values.goal} onChange={(e) => set("goal", e.target.value)} onBlur={() => blur("goal")} className={cn(field, "appearance-none", !values.goal && "text-mist/70")} {...a11y("goal")}>
                        <option value="" disabled>Select your goal</option>
                        {GOALS.map((g) => (
                          <option key={g} value={g} className="text-ink">{g}</option>
                        ))}
                      </select>
                      {err("goal")}
                    </div>
                  </div>

                  <fieldset className="mt-6">
                    <legend className={label}>Preferred Contact Method *</legend>
                    <div className="grid grid-cols-3 gap-2">
                      {CONTACT_METHODS.map((m) => (
                        <label key={m} className="relative cursor-pointer">
                          <input type="radio" name="contactMethod" value={m} checked={values.contactMethod === m} onChange={() => set("contactMethod", m)} className="peer sr-only" />
                          <span className="flex min-h-12 items-center justify-center border border-white/15 px-2 text-center font-display text-[0.85rem] font-bold uppercase tracking-[0.12em] text-silver transition-colors peer-checked:border-amber peer-checked:bg-amber peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber hover:border-amber/60">
                            {m}
                          </span>
                        </label>
                      ))}
                    </div>
                    {err("contactMethod")}
                  </fieldset>

                  {/* honeypot — hidden from people and assistive tech */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Website
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </label>
                  </div>

                  {status === "error" && (
                    <div role="alert" className="mt-6 flex gap-3 border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
                      <AlertTriangle className="mt-0.5 size-5 shrink-0" />
                      <div>
                        <p>{serverMsg}</p>
                        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-white">
                          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-amber">WhatsApp us</a>}
                          {tel && <a href={tel} className="underline underline-offset-4 hover:text-amber">Call {site.contact.phone}</a>}
                          {!wa && !tel && <span className="text-red-200/80">Studio phone &amp; WhatsApp: {has(site.contact.phone) ? site.contact.phone : "[CLIENT TO PROVIDE]"}</span>}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "submitting"} magnetic>
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="size-5 animate-spin" /> Sending…
                        </>
                      ) : (
                        "Submit Enquiry"
                      )}
                    </Button>
                  </div>

                  <p className="mt-6 flex items-start gap-3 text-xs leading-relaxed text-mist">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-amber" />
                    <span>
                      <strong className="font-semibold text-silver">Privacy notice:</strong> we use your details only to respond to this enquiry and share membership information. We never sell or share them with third parties. By submitting you agree to be contacted by {site.name}.
                    </span>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
