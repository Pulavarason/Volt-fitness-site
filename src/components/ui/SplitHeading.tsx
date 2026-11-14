"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** classes applied to a specific line index (e.g. outline / amber) */
  lineClass?: Record<number, string>;
  /** play on mount instead of on scroll */
  animateNow?: boolean;
  /** (with animateNow) hold until true — used to wait for the preloader */
  start?: boolean;
  delay?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Masked line-by-line text reveal. The observer sits on the (unclipped)
 *  heading; the masked lines animate via variants. */
export function SplitHeading({ lines, as = "h2", className, lineClass, animateNow, start = true, delay = 0 }: Props) {
  const Tag = motion[as] as typeof motion.h2;
  return (
    <Tag
      className={cn("display", className)}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: delay } } }}
      {...(animateNow
        ? { animate: start ? "show" : "hidden" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] pt-[0.02em]">
          <motion.span
            className={cn("block will-change-transform", lineClass?.[i])}
            variants={{ hidden: { y: "108%" }, show: { y: 0, transition: { duration: 1.05, ease: EASE } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
