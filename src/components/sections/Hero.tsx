"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useIntroDone } from "@/lib/intro";
import { openEnquiry } from "@/lib/enquiry-bus";
import { scrollToId } from "@/lib/lenis";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 26 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="home" ref={ref} className="relative isolate flex min-h-svh items-end overflow-hidden grain">
      {/* background photo with parallax + slow zoom */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <div className="absolute inset-[-4%] animate-kenburns will-change-transform">
          <Image
            src="/images/gym-main.jpg"
            alt="The VOLTT Fitness Studio training floor lit by warm amber LED strips"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_50%]"
          />
        </div>
      </motion.div>
      {/* cinematic overlays */}
      <div className="absolute inset-0 -z-[5] bg-ink/35" />
      <div className="absolute inset-0 -z-[5] bg-[radial-gradient(ellipse_at_30%_55%,transparent_0%,rgb(10_10_11/0.4)_70%,rgb(10_10_11/0.85)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-[5] h-1/3 bg-gradient-to-t from-ink to-transparent" />

      {/* vertical tagline (desktop) */}
      <motion.p
        {...rise(1.1)}
        aria-hidden="true"
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] font-display text-xs font-semibold uppercase tracking-[0.5em] text-silver/70 xl:block"
      >
        Strength · Discipline · Performance
      </motion.p>

      <motion.div style={{ opacity: fade, y: textY }} className="container-x relative pb-28 pt-40 md:pb-32 lg:pb-36">
        <motion.span {...rise(0.1)} className="eyebrow">
          {site.locality}
        </motion.span>

        <SplitHeading
          as="h1"
          animateNow
          start={ready}
          delay={0.2}
          lines={["Built Different.", "Train Different."]}
          lineClass={{ 1: "outline-text" }}
          className="mt-6 text-[clamp(2.7rem,12.4vw,10rem)]"
        />

        <motion.p {...rise(0.75)} className="mt-8 max-w-xl text-base leading-relaxed text-silver md:text-lg">
          Your strength. Your discipline. Your transformation. Experience a better standard of fitness at VOLTT Fitness Studio.
        </motion.p>

        <motion.div {...rise(0.9)} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" magnetic arrow onClick={() => openEnquiry()}>
            Start Your Journey
          </Button>
          <Button size="lg" variant="outline" magnetic href="#facilities">
            Explore the Gym
          </Button>
        </motion.div>
      </motion.div>

      {/* animated scroll indicator */}
      <motion.a
        {...rise(1.3)}
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("about");
        }}
        aria-label="Scroll to About section"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-display text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-silver"
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-x-0 top-0 h-full animate-cue bg-amber" />
        </span>
      </motion.a>
    </section>
  );
}
