"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { facilities } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { cn, pad } from "@/lib/utils";

export function Facilities() {
  const [active, setActive] = useState(0);
  const current = facilities[active];

  return (
    <section id="facilities" className="section-y relative bg-graphite">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="Facilities"
          lines={["Everything you need.", "Nothing you don't."]}
          lineClass={{ 1: "outline-text" }}
          text="Explore the floor. From heavy strength stations to open turf, every zone at VOLTT is set up for focused training."
        />

        {/* Desktop — interactive index + large photograph */}
        <div className="mt-16 hidden gap-12 lg:grid lg:grid-cols-12">
          <ul className="col-span-5 border-t border-line" role="tablist" aria-label="Facility categories" aria-orientation="vertical">
            {facilities.map((f, i) => {
              const isActive = i === active;
              return (
                <li key={f.id} className="border-b border-line">
                  <button
                    type="button"
                    role="tab"
                    id={`fac-tab-${f.id}`}
                    aria-selected={isActive}
                    aria-controls="fac-panel"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group relative block w-full py-5 text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className={cn("font-sans text-xs font-medium tracking-[0.2em] transition-colors", isActive ? "text-amber" : "text-mist")}>
                        {pad(i + 1)}
                      </span>
                      <span
                        className={cn(
                          "display text-[clamp(1.8rem,3vw,2.6rem)] transition-all duration-500 ease-[var(--ease-expo)]",
                          isActive ? "translate-x-2 text-white" : "text-white/40 group-hover:text-white/70",
                        )}
                      >
                        {f.name}
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden pl-[3.1rem] text-[0.95rem] leading-relaxed text-silver"
                        >
                          <span className="block pt-3">{f.description}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="fac-bar"
                        className="absolute -bottom-px left-0 h-px w-full bg-amber shadow-[0_0_10px_1px_rgb(214_164_63/0.7)]"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="col-span-7">
            <div id="fac-panel" role="tabpanel" aria-labelledby={`fac-tab-${current.id}`} className="brackets sticky top-28 aspect-[4/3.4] overflow-hidden bg-ink">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08, clipPath: "inset(0 0 0 100%)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={current.image}
                    alt={current.alt}
                    fill
                    sizes="(min-width:1024px) 55vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: current.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-0 left-0 z-10 flex items-end justify-between gap-4 p-7">
                <p className="display text-3xl text-white">{current.name}</p>
                {!current.confirmed && <PlaceholderTag>Details TBC</PlaceholderTag>}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet — stacked photo cards */}
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {facilities.map((f, i) => (
            <Reveal as="li" key={f.id} delay={(i % 2) * 0.08}>
              <article className="group">
                <div className="brackets relative aspect-[4/3] overflow-hidden bg-ink">
                  <Image
                    src={f.image}
                    alt={f.alt}
                    fill
                    sizes="(min-width:640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-110"
                    style={{ objectPosition: f.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 font-sans text-xs font-medium tracking-[0.2em] text-amber">{pad(i + 1)}</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <h3 className="display text-3xl">{f.name}</h3>
                  {!f.confirmed && <PlaceholderTag>TBC</PlaceholderTag>}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-silver">{f.description}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
