"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Activity, Dumbbell, Flame, HeartPulse, Plus, Sprout, TrendingUp, UserCheck, Check, type LucideIcon } from "lucide-react";
import { programs, type Program } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { openEnquiry } from "@/lib/enquiry-bus";
import { cn, pad } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const icons: Record<Program["icon"], LucideIcon> = {
  dumbbell: Dumbbell,
  trending: TrendingUp,
  flame: Flame,
  user: UserCheck,
  activity: Activity,
  heart: HeartPulse,
  sprout: Sprout,
};

function ProgramCard({ p, i, wide }: { p: Program; i: number; wide?: boolean }) {
  const [open, setOpen] = useState(false);
  const Icon = icons[p.icon];
  const panelId = `program-${p.id}-details`;

  return (
    <Reveal as="article" delay={(i % 3) * 0.08} className={cn("group flex bg-graphite", wide ? "lg:col-span-3 lg:flex-row" : "flex-col")}>
      <div className={cn("brackets relative overflow-hidden bg-ink", wide ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]")}>
        <ImagePlaceholder label="Program photo" />
        <span className="absolute left-5 top-5 z-10 font-sans text-xs font-medium tracking-[0.2em] text-white/80">{pad(i + 1)}</span>
        <span className="absolute bottom-0 left-0 z-10 flex size-14 items-center justify-center bg-amber text-ink">
          <Icon className="size-6" strokeWidth={1.8} />
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col p-7", wide && "lg:p-12")}>
        <h3 className={cn("display", wide ? "text-5xl lg:text-6xl" : "text-4xl")}>{p.name}</h3>
        <p className="mt-3 leading-relaxed text-silver">{p.description}</p>

        <ul className="mt-5 space-y-2.5">
          {p.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-silver">
              <Check className="mt-0.5 size-4 shrink-0 text-amber" strokeWidth={2.5} />
              {b}
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-l border-amber pl-4 text-sm leading-relaxed text-mist">
                <p>{p.details}</p>
                <p className="mt-2 text-silver">
                  <span className="font-semibold text-white">Best for: </span>
                  {p.bestFor}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <Button size="sm" onClick={() => openEnquiry({ goal: p.goal })}>
            Enquire Now
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="group/more inline-flex min-h-10 items-center gap-2 font-display text-[0.9rem] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-amber"
          >
            {open ? "Show Less" : "Learn More"}
            <Plus className={cn("size-4 transition-transform duration-300", open && "rotate-45")} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export function Programs() {
  return (
    <section id="programs" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          index="03"
          eyebrow="Programs"
          lines={["Find your", "kind of training."]}
          lineClass={{ 1: "text-amber" }}
          text="Pick a focus and start. Every program is built on structure, technique and consistency. Individual results vary."
        />
        <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <ProgramCard key={p.id} p={p} i={i} wide={i === programs.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
