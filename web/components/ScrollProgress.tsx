"use client";

import { useEffect, useRef } from "react";

/** Reading progress, also the divider between the sidebar and the page on desktop. */
export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      barRef.current?.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Desktop: a 2px light-gray line on the sidebar's edge that doubles as the divider and fills
  // from the top as you scroll. Mobile: the same idea along the top edge.
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[3px] bg-[#f1f1f1] lg:inset-x-auto lg:inset-y-0 lg:left-[var(--rail)] lg:h-auto lg:w-[2px]"
    >
      <span
        ref={barRef}
        className="block h-full w-full origin-left scale-x-[var(--p,0)] bg-[linear-gradient(90deg,#fff,#b8ceff,#002e92,#002279)] lg:origin-top lg:scale-x-100 lg:scale-y-[var(--p,0)] lg:bg-[linear-gradient(180deg,#fff,#b8ceff,#002e92,#002279)]"
      />
    </div>
  );
}
