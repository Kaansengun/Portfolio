"use client";

import { useRef, type ReactNode } from "react";

/** Sets --mx/--my (-1…1) from the pointer so `.float` children drift with the mouse. */
export function HeroParallax({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const { clientX, clientY } = event;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", (((clientX - r.left) / r.width) * 2 - 1).toFixed(3));
          el.style.setProperty("--my", (((clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        });
      }}
    >
      {children}
    </div>
  );
}
