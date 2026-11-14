"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { navLinks } from "@/data/content";
import { scrollToId, lockScroll } from "@/lib/lenis";
import { openEnquiry } from "@/lib/enquiry-bus";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function useActiveSection() {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function RollLabel({ children }: { children: string }) {
  return (
    <span className="relative block h-[1.25em] overflow-hidden">
      <span className="block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">{children}</span>
      <span className="absolute inset-x-0 top-full block text-amber transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">
        {children}
      </span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    // let the menu release scroll lock before scrolling
    setTimeout(() => scrollToId(id), open ? 60 : 0);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[110] transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            aria-label="VOLTT Fitness Studio — back to top"
            className="relative z-[130] shrink-0"
          >
            <Image src="/images/logo-mark.png" alt="VOLTT Fitness Studio" width={1466} height={624} priority className="h-9 w-auto lg:h-11" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex xl:gap-3">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.id);
                  }}
                  aria-current={active === l.id ? "true" : undefined}
                  className={cn(
                    "group relative block px-3 py-2 font-display text-[0.95rem] font-semibold uppercase tracking-[0.18em] transition-colors xl:px-4",
                    active === l.id ? "text-white" : "text-silver hover:text-white",
                  )}
                >
                  <RollLabel>{l.label}</RollLabel>
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-amber shadow-[0_0_8px_1px_rgb(214_164_63/0.8)] xl:inset-x-4"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button size="sm" magnetic onClick={() => openEnquiry()}>
                Join VOLTT
              </Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-[130] flex size-12 items-center justify-center lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-7">
                <span className={cn("absolute left-0 h-px w-full bg-white transition-all duration-500 ease-[var(--ease-expo)]", open ? "top-1/2 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-1/2 h-px w-full bg-amber transition-all duration-300", open ? "scale-x-0 opacity-0" : "")} />
                <span className={cn("absolute left-0 h-px w-full bg-white transition-all duration-500 ease-[var(--ease-expo)]", open ? "top-1/2 -rotate-45" : "bottom-0")} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[105] flex flex-col bg-ink pt-24 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="container-x flex flex-1 flex-col justify-center gap-1 pb-8">
              {navLinks.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.id);
                    }}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, delay: 0.12 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "display flex min-h-14 items-baseline gap-4 py-1.5 text-[clamp(2.4rem,11vw,3.6rem)]",
                      active === l.id ? "text-amber" : "text-white",
                    )}
                  >
                    <span className="font-sans text-xs font-medium tracking-[0.2em] text-mist">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="container-x pb-10">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => openEnquiry(), 60);
                }}
              >
                Join VOLTT
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
