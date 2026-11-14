"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Dumbbell, Cpu, UserCheck, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/data/content";
import { site } from "@/config/site";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const highlights = [
  { icon: Dumbbell, title: "Professional Training Environment", text: "Zoned floors built for focus." },
  { icon: Cpu, title: "Modern Fitness Equipment", text: "Heavy-duty machines and free weights." },
  { icon: UserCheck, title: "Personal Training Support", text: "Guidance when you want it." },
  { icon: Users, title: "Welcoming Fitness Community", text: "Everyone belongs on the floor." },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);

  return (
    <section id="about" className="section-y relative">
      <div className="container-x">
        <div ref={ref} className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* imagery */}
          <div className="relative lg:col-span-6">
            <motion.div style={{ y: yBig }} className="brackets group relative aspect-[4/5] overflow-hidden bg-graphite">
              <ImagePlaceholder label="About photo" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              style={{ y: ySmall }}
              className="absolute -bottom-10 right-[-4%] hidden aspect-[4/3] w-[48%] overflow-hidden border-[6px] border-ink bg-graphite shadow-2xl sm:block"
            >
              <ImagePlaceholder label="About detail photo" />
            </motion.div>
          </div>

          {/* copy */}
          <div className="lg:col-span-6 lg:pl-6">
            <SectionHeader index="01" eyebrow="About VOLTT" lines={["More than a gym.", "It's a mindset."]} lineClass={{ 1: "text-amber" }} />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-silver">
                At {site.name}, training isn&rsquo;t a chore — it&rsquo;s a discipline. Our floor is built around serious equipment, honest effort and a community that shows up.
              </p>
              <p className="mt-5 leading-relaxed text-mist">
                Whether you&rsquo;re walking in for the first time or chasing a new personal best, VOLTT gives you a focused, welcoming space to get stronger — on your terms, at your pace.
              </p>
            </Reveal>

            <ul className="mt-10 grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
              {highlights.map((h, i) => (
                <Reveal as="li" key={h.title} delay={i * 0.08} className="group spotlight bg-graphite p-6 transition-colors hover:bg-panel">
                  <h.icon className="size-6 text-amber transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-wide">{h.title}</h3>
                  <p className="mt-1.5 text-sm text-mist">{h.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* animated statistics */}
        <div className="mt-24 sm:mt-32">
          <dl className="grid grid-cols-2 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className={i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""}>
                <dd className="display text-[clamp(3rem,7vw,5.5rem)] text-white">
                  <Counter to={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-2 font-display text-sm font-semibold uppercase tracking-[0.22em] text-mist">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
