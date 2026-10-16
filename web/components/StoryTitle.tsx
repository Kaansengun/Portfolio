"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stages } from "@/content/process";
import { Typed } from "./Typed";

gsap.registerPlugin(ScrollTrigger);

const k = (chunks: ReactNode) => <span className="text-accent">{chunks}</span>;

/**
 * The fixed "01 … 10" heading (desktop only; on phones each stage shows its lines inline, see Story.tsx). Each story stage owns two numbered lines; when a
 * stage scrolls into view its lines type in, like a code editor moving down the file.
 */
export function StoryTitle() {
  const t = useTranslations("story");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const triggers = stages.map((stage, i) =>
      ScrollTrigger.create({
        trigger: `#${stage.id}`,
        // The stage owns the heading while it covers the upper-middle of the screen.
        start: "top 35%",
        end: "bottom 35%",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
          else setActive((current) => (current === i ? null : current));
        },
      }),
    );
    return () => triggers.forEach((st) => st.kill());
  }, []);

  const stage = active === null ? null : stages[active];

  return (
    <div
      aria-hidden={stage === null}
      className={`pointer-events-none fixed top-10 left-[calc(var(--rail)+3.5rem)] z-30 hidden transition-all duration-500 ease-out-soft lg:block ${
        stage ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      }`}
    >
      {stage && (
        <p key={stage.id} className="glow relative w-fit rounded-[5px] bg-surface/95 px-3 py-1.5 font-display backdrop-blur sm:px-4 sm:py-2">
          <span className="sr-only">{t("label")}: </span>
          {stage.lines.map((n, i) => (
            <span key={n} className="flex items-baseline gap-3 font-display-bold text-lg leading-8 font-bold sm:text-2xl">
              <span className="w-7 font-display text-lg font-thin text-faint sm:text-2xl">{n}</span>
              <Typed delay={0.15 + i * 0.55} duration={0.5} steps={14} mask="var(--surface)" keepCaret={i === 1}>
                {t.rich(`lines.${n}`, { k })}
              </Typed>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
