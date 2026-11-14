"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { cn, pad } from "@/lib/utils";

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const total = testimonials.length;
  const t = testimonials[index];
  const go = (d: number) => setState([(index + d + total) % total, d]);

  return (
    <section id="testimonials" className="section-y relative overflow-hidden bg-graphite">
      <Quote aria-hidden="true" className="pointer-events-none absolute -right-10 top-10 size-[22rem] rotate-12 text-white/[0.025]" strokeWidth={1} />
      <div className="container-x relative">
        <SectionHeader index="08" eyebrow="Testimonials" lines={["Real people.", "Real experiences."]} lineClass={{ 1: "text-amber" }} />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="relative min-h-[22rem] lg:col-span-9" role="group" aria-roledescription="carousel" aria-label="Member testimonials">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={index}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                aria-live="polite"
                className="cursor-grab border-l border-amber pl-6 active:cursor-grabbing md:pl-10"
              >
                <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`} role="img">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("size-5", i < t.rating ? "fill-amber text-amber" : "text-white/20")} />
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-[clamp(1.7rem,4vw,3.1rem)] font-semibold leading-[1.12] tracking-tight text-white">
                  &ldquo;{t.review}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {t.photo ? (
                    <Image src={t.photo} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
                  ) : (
                    <span className="flex size-14 items-center justify-center rounded-full border border-line bg-panel font-display text-xl font-bold text-amber">
                      {t.name.charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="font-display text-lg font-bold uppercase tracking-[0.12em]">{t.name}</p>
                    <p className="text-sm text-mist">VOLTT Member</p>
                  </div>
                  {t.placeholder && <PlaceholderTag className="ml-auto">Sample — not a real review</PlaceholderTag>}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex items-end justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-end lg:justify-end">
            <p className="display text-6xl text-white/90">
              {pad(index + 1)}
              <span className="text-2xl text-mist"> / {pad(total)}</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex size-14 items-center justify-center border border-white/25 transition-colors hover:border-amber hover:bg-amber hover:text-ink"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex size-14 items-center justify-center border border-white/25 transition-colors hover:border-amber hover:bg-amber hover:text-ink"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-2" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setState([i, i > index ? 1 : -1])}
              className="group flex h-8 items-center"
            >
              <span className={cn("block h-px transition-all duration-500", i === index ? "w-14 bg-amber shadow-[0_0_8px_1px_rgb(214_164_63/0.8)]" : "w-8 bg-white/30 group-hover:bg-white/60")} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
