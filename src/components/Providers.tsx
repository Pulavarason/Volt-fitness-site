"use client";
import { MotionConfig } from "motion/react";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Preloader } from "@/components/ui/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      {children}
    </MotionConfig>
  );
}
