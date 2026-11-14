"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { gallery, galleryCategories, type GalleryImage } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { lockScroll } from "@/lib/lenis";
import { cn, pad } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

function Lightbox({ items, index, onClose, onIndex }: { items: GalleryImage[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const [dir, setDir] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const item = items[index];

  const go = useCallback(
    (d: number) => {
      setDir(d);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    lockScroll(true);
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      lockScroll(false);
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && rootRef.current) {
        const f = rootRef.current.querySelectorAll<HTMLElement>("button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <motion.div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-silver" aria-live="polite">
          <span className="text-amber">{pad(index + 1)}</span> / {pad(items.length)}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex size-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-amber hover:bg-amber hover:text-ink"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-3 md:px-24" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.figure
            key={item.src}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d * 90, opacity: 0, scale: 0.97 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d: number) => ({ x: d * -90, opacity: 0, scale: 0.97 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              else if (info.offset.x > 70) go(-1);
            }}
            className="relative flex max-h-full max-w-full cursor-grab flex-col items-center active:cursor-grabbing"
          >
            <div className="relative h-[60svh] w-[min(80vw,50rem)] max-h-[72svh] overflow-hidden" style={{ aspectRatio: item.ratio }}>
              <ImagePlaceholder label="Gallery photo" />
            </div>
            <figcaption className="mt-4 text-center text-sm text-silver">
              <span className="mr-3 font-display text-xs font-semibold uppercase tracking-[0.25em] text-amber">{item.category}</span>
              {item.alt}
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/40 text-white transition-colors hover:border-amber hover:bg-amber hover:text-ink md:left-8"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/40 text-white transition-colors hover:border-amber hover:bg-amber hover:text-ink md:right-8"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
      <div className="h-6" />
    </motion.div>
  );
}

export function Gallery() {
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(() => (cat === "All" ? gallery : gallery.filter((g) => g.category === cat)), [cat]);
  const counts = useMemo(
    () => Object.fromEntries(galleryCategories.map((c) => [c, c === "All" ? gallery.length : gallery.filter((g) => g.category === c).length])),
    [],
  );

  return (
    <section id="gallery" className="section-y relative">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeader
            index="07"
            eyebrow="Gallery"
            lines={["Step inside", "the studio."]}
            lineClass={{ 1: "outline-text" }}
          />
          <Reveal>
            <div role="group" aria-label="Filter gallery by category" className="flex flex-wrap gap-2">
              {galleryCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  disabled={counts[c] === 0}
                  className={cn(
                    "min-h-11 border px-5 font-display text-[0.9rem] font-bold uppercase tracking-[0.16em] transition-colors disabled:opacity-30",
                    cat === c ? "border-amber bg-amber text-ink" : "border-white/20 text-silver hover:border-amber hover:text-white",
                  )}
                >
                  {c}
                  <sup className="ml-1.5 text-[0.65rem] opacity-70">{counts[c]}</sup>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.ul layout className="mt-14 columns-2 gap-3 md:gap-4 lg:columns-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((g, i) => (
              <motion.li
                layout
                key={g.src}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="mb-3 break-inside-avoid md:mb-4"
              >
                <button
                  type="button"
                  data-cursor="view"
                  onClick={() => setOpen(i)}
                  aria-label={`Open photo: ${g.alt}`}
                  className="group relative block w-full overflow-hidden bg-graphite"
                  style={{ aspectRatio: g.ratio }}
                >
                  <ImagePlaceholder label="Add gallery photo" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between p-4 opacity-0 transition-all duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-white">{g.category}</span>
                    <Maximize2 className="size-4 text-amber" />
                  </span>
                  <span className="absolute inset-0 border border-amber/0 transition-colors duration-500 group-hover:border-amber/60" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mt-8 text-xs text-mist">
          Photographs are editable in <code className="text-silver">src/data/content.ts</code> — drop new images into <code className="text-silver">/public/gallery</code> and add one line per photo.
        </p>
      </div>

      <AnimatePresence>
        {open !== null && items[open] && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
      </AnimatePresence>
    </section>
  );
}
