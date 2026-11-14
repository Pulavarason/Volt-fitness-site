import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

/** Smooth-scroll to a section id (works with or without Lenis). */
export function scrollToId(id: string, offset = -72) {
  if (typeof document === "undefined") return;
  const el = id === "home" ? document.documentElement : document.getElementById(id);
  if (!el) return;
  if (instance) {
    if (id === "home") instance.scrollTo(0, { duration: 1.4 });
    else instance.scrollTo(el as HTMLElement, { offset, duration: 1.4 });
  } else {
    const top = id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
  try {
    history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
  } catch {
    /* ignore */
  }
}

/** Lock / unlock page scroll (mobile menu, lightbox). */
export function lockScroll(lock: boolean) {
  if (lock) {
    instance?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    instance?.start();
    document.documentElement.style.overflow = "";
  }
}
