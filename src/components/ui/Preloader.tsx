"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { markIntroDone } from "@/lib/intro";

const KEY = "voltt-intro-seen";

/** Short curtain intro (once per session). The hero entrance starts as it lifts. */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen || reduce) {
      setShow(false);
      markIntroDone();
      return;
    }
    const t1 = setTimeout(() => markIntroDone(), 1250);
    const t2 = setTimeout(() => setShow(false), 1250);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          aria-hidden="true"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="flex w-[min(78vw,22rem)] flex-col items-center gap-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src="/images/logo-mark.png" alt="" width={1466} height={624} priority className="h-auto w-full" />
            </motion.div>
            <div className="relative h-px w-full bg-white/10">
              <motion.span
                className="absolute inset-y-0 left-0 bg-amber shadow-[0_0_14px_2px_rgb(214_164_63/0.7)]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
