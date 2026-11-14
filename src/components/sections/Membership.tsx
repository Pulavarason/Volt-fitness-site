"use client";
import { MouseEvent } from "react";
import { Check, Minus, Zap } from "lucide-react";
import { plans, comparisonRows, popularLabel, type Plan } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { openEnquiry } from "@/lib/enquiry-bus";
import { whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

function trackPointer(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function PlanCard({ plan, i }: { plan: Plan; i: number }) {
  const msg = `Hi VOLTT Fitness Studio, I'd like to enquire about the ${plan.name} (${plan.duration}).`;
  const wa = whatsappLink(msg);

  return (
    <Reveal delay={i * 0.09} className="h-full">
      <article
        onMouseMove={trackPointer}
        className={cn(
          "group spotlight relative flex h-full flex-col border bg-graphite p-7 transition-all duration-500 ease-[var(--ease-expo)] hover:-translate-y-2 hover:border-amber/70 hover:shadow-[0_30px_60px_-30px_rgb(214_164_63/0.35)]",
          plan.popular ? "border-amber/60 bg-panel lg:-mt-4 lg:pb-11 lg:pt-11" : "border-line",
        )}
      >
        {/* top light-strip */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent transition-opacity duration-500",
            plan.popular ? "opacity-100 shadow-[0_0_18px_2px_rgb(214_164_63/0.7)]" : "opacity-0 group-hover:opacity-100",
          )}
        />
        {plan.popular && (
          <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 bg-amber px-3 py-1 font-display text-[0.78rem] font-bold uppercase tracking-[0.2em] text-ink">
            <Zap className="size-3.5 fill-ink" /> {popularLabel}
          </span>
        )}

        <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-amber">{plan.duration}</p>
        <h3 className="display mt-2 text-[2rem] leading-[0.95]">{plan.name}</h3>

        <div className="mt-7 border-y border-line py-6">
          {plan.price ? (
            <p className="display text-6xl">
              <span className="mr-1 align-top text-3xl text-amber">₹</span>
              {plan.price.toLocaleString("en-IN")}
            </p>
          ) : (
            <div>
              <p className="display flex items-start text-6xl text-white/90">
                <span className="mr-1 text-3xl text-amber">₹</span>
                <span aria-hidden="true">—</span>
                <span className="sr-only">Price to be confirmed</span>
              </p>
              <PlaceholderTag className="mt-3">₹ [Client to confirm]</PlaceholderTag>
            </div>
          )}
        </div>

        <ul className="mt-6 flex-1 space-y-3.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[0.95rem] text-silver">
              <Check className="mt-0.5 size-4 shrink-0 text-amber" strokeWidth={2.5} />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-stretch gap-2">
          <Button
            variant={plan.popular ? "primary" : "outline"}
            className="flex-1"
            onClick={() => openEnquiry({ plan: plan.id })}
          >
            Enquire Now
          </Button>
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about the ${plan.name} on WhatsApp`}
              className="flex size-12 shrink-0 items-center justify-center border border-white/25 text-white transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-ink"
            >
              <WhatsAppIcon className="size-5" />
            </a>
          ) : (
            <button
              type="button"
              aria-label={`Enquire about the ${plan.name} — WhatsApp number coming soon, opens the enquiry form`}
              title="WhatsApp number to be added — opens the enquiry form"
              onClick={() => openEnquiry({ plan: plan.id })}
              className="flex size-12 shrink-0 items-center justify-center border border-white/25 text-white transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-ink"
            >
              <WhatsAppIcon className="size-5" />
            </button>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function Membership() {
  return (
    <section id="membership" className="section-y relative bg-graphite">
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="Membership"
          lines={["Choose your membership.", "Commit to yourself."]}
          lineClass={{ 1: "text-amber" }}
          text="Four simple plans. The longer you commit, the more consistent you become. Pricing is confirmed by the studio on enquiry."
        />

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {plans.map((p, i) => (
            <PlanCard key={p.id} plan={p} i={i} />
          ))}
        </div>

        {/* comparison */}
        <Reveal className="mt-24">
          <h3 className="display text-4xl md:text-5xl">Compare plans</h3>
          <div className="relative mt-8 overflow-x-auto border border-line" tabIndex={0} role="region" aria-label="Membership comparison table (scrollable)">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Comparison of VOLTT membership plans</caption>
              <thead>
                <tr className="border-b border-line bg-panel">
                  <th scope="col" className="sticky left-0 z-10 bg-panel p-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-mist md:p-5">
                    Benefit
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={cn("p-4 font-display text-base font-bold uppercase tracking-[0.12em] md:p-5", p.popular ? "text-amber" : "text-white")}
                    >
                      {p.duration}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-b-0 hover:bg-white/[0.02]">
                    <th scope="row" className="sticky left-0 z-10 bg-graphite p-4 text-sm font-medium text-silver md:p-5">
                      {row.label}
                    </th>
                    {row.values.map((v, i) => (
                      <td key={i} className={cn("p-4 text-sm md:p-5", plans[i].popular && "bg-amber/[0.04]")}>
                        {v === true ? (
                          <>
                            <Check className="size-5 text-amber" strokeWidth={2.5} aria-hidden="true" />
                            <span className="sr-only">Included</span>
                          </>
                        ) : v === false ? (
                          <>
                            <Minus className="size-5 text-mist" aria-hidden="true" />
                            <span className="sr-only">Not included</span>
                          </>
                        ) : (
                          <span className={cn(String(v).includes("CLIENT") ? "text-amber/80" : "text-white")}>{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
