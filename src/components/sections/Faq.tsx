"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn, pad } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-y relative">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeader index="11" eyebrow="FAQ" lines={["Got", "questions?"]} lineClass={{ 1: "text-amber" }} text="Quick answers to the things new members ask most." />
          </div>
        </div>

        <ul className="border-t border-line lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} delay={i * 0.04} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-7"
                  >
                    <span className="font-sans text-xs font-medium tracking-[0.2em] text-mist">{pad(i + 1)}</span>
                    <span className={cn("flex-1 font-display text-[1.45rem] font-bold uppercase leading-tight tracking-wide transition-colors md:text-[1.7rem]", isOpen ? "text-amber" : "text-white group-hover:text-amber")}>
                      {f.q}
                    </span>
                    <span className={cn("flex size-10 shrink-0 items-center justify-center border transition-all duration-500", isOpen ? "rotate-45 border-amber bg-amber text-ink" : "border-white/25 group-hover:border-amber")}>
                      <Plus className="size-5" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 pl-[2.9rem] pr-4 leading-relaxed text-silver md:pl-[3.7rem]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
