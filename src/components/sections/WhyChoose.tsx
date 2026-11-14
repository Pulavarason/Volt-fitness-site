"use client";
import { MouseEvent } from "react";
import { motion } from "motion/react";
import { CalendarCheck, Compass, Cpu, Flag, Target, Users, type LucideIcon } from "lucide-react";
import { whyChoose } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { pad } from "@/lib/utils";

const icons: Record<(typeof whyChoose)[number]["icon"], LucideIcon> = {
  cpu: Cpu,
  compass: Compass,
  users: Users,
  calendar: CalendarCheck,
  target: Target,
  flag: Flag,
};

function trackPointer(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function WhyChoose() {
  return (
    <section id="why" className="section-y relative bg-graphite">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              index="06"
              eyebrow="Why VOLTT"
              lines={["Why choose", "VOLTT?"]}
              lineClass={{ 1: "text-amber" }}
              text="Six reasons members make the studio their daily ground."
            />
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {whyChoose.map((w, i) => {
            const Icon = icons[w.icon];
            return (
              <Reveal as="li" key={w.title} delay={(i % 2) * 0.08} className="bg-graphite">
                <article onMouseMove={trackPointer} className="group spotlight h-full p-8 transition-colors duration-500 hover:bg-panel lg:p-10">
                  <div className="flex items-start justify-between">
                    <motion.span
                      whileHover={{ rotate: [0, -10, 10, -4, 0], scale: 1.12 }}
                      transition={{ duration: 0.6 }}
                      className="relative flex size-14 items-center justify-center border border-amber/40 text-amber transition-colors duration-500 group-hover:bg-amber group-hover:text-ink"
                    >
                      <Icon className="size-6" strokeWidth={1.6} />
                    </motion.span>
                    <span className="font-sans text-xs font-medium tracking-[0.2em] text-mist">{pad(i + 1)}</span>
                  </div>
                  <h3 className="display mt-8 text-3xl md:text-[2rem]">{w.title}</h3>
                  <p className="mt-3 leading-relaxed text-silver">{w.text}</p>
                  <span className="mt-7 block h-px w-10 bg-amber transition-all duration-700 ease-[var(--ease-expo)] group-hover:w-full" />
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
