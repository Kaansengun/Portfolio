import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Smooth-scrolls to a section, through Lenis when it is running. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const offset = window.matchMedia("(min-width: 1024px)").matches ? 0 : -72;
  if (lenis) {
    lenis.scrollTo(target, { offset });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  history.replaceState(null, "", `#${id}`);
}

/** Pauses page scrolling while an overlay (menu, panel) is open. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
