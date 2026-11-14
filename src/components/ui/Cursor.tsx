"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Mode = "default" | "link" | "view" | "hidden";

/** Desktop-only cursor accent. The native cursor is left intact. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t?.closest) return;
      if (t.closest("input, textarea, select")) return setMode("hidden");
      if (t.closest("[data-cursor='view']")) return setMode("view");
      if (t.closest("a, button, [role='button'], [data-cursor]")) return setMode("link");
      setMode("default");
    };
    const leave = () => setMode("hidden");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === "view" ? 84 : mode === "link" ? 54 : 34;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[250] flex items-center justify-center rounded-full border border-amber/70 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: mode === "hidden" ? 0 : 1,
          backgroundColor: mode === "view" ? "rgb(214 164 63)" : mode === "link" ? "rgb(214 164 63 / 0.14)" : "rgb(214 164 63 / 0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        {mode === "view" ? "View" : null}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[250] size-1.5 rounded-full bg-amber"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: mode === "hidden" || mode === "view" ? 0 : 1 }}
      />
    </>
  );
}
