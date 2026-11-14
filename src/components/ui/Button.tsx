"use client";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToId } from "@/lib/lenis";

type Variant = "primary" | "outline" | "ghost";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg" | "sm";
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  magnetic?: boolean;
  arrow?: boolean;
  className?: string;
  "aria-label"?: string;
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden font-display font-bold uppercase tracking-[0.16em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 select-none";
const sizes = { sm: "min-h-10 px-5 text-[0.85rem]", md: "min-h-12 px-7 text-[0.95rem]", lg: "min-h-14 px-9 text-[1.05rem]" };
const variants: Record<Variant, string> = {
  primary: "bg-amber text-ink hover:text-ink",
  outline: "border border-white/30 text-white hover:border-amber hover:text-ink",
  ghost: "text-white hover:text-amber",
};
/* sliding fill that sweeps in on hover */
const fill: Record<Variant, string> = {
  primary: "bg-amber-light",
  outline: "bg-amber",
  ghost: "",
};

export function Button({
  children, variant = "primary", size = "md", href, external, onClick, type = "button",
  disabled, magnetic, arrow, className, ...rest
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: PointerEvent) => {
    if (!magnetic || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const cls = cn(base, sizes[size], variants[variant], className);
  const inner = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -translate-x-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover/btn:translate-x-0",
            fill[variant],
          )}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        {arrow && <ArrowUpRight className="size-[1.1em] transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />}
      </span>
    </>
  );

  let el: ReactNode;
  if (href) {
    const isAnchor = href.startsWith("#");
    el = (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={(e) => {
          if (isAnchor) {
            e.preventDefault();
            scrollToId(href.slice(1));
          }
          onClick?.();
        }}
        aria-label={rest["aria-label"]}
      >
        {inner}
      </a>
    );
  } else {
    el = (
      <button type={type} onClick={onClick} disabled={disabled} className={cls} aria-label={rest["aria-label"]}>
        {inner}
      </button>
    );
  }

  if (!magnetic) return el;
  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {el}
    </motion.span>
  );
}
