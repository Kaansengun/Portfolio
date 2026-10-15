"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { PhoneFrame } from "./PhoneFrame";
import { SectionTitle } from "./SectionTitle";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./icons";

/**
 * Horizontal project cards. Hovering an edge arrow keeps scrolling that way
 * (mouse only); clicking it jumps one card, and touch users simply swipe.
 */
export function Projects() {
  const t = useTranslations("projects");
  const ext = useTranslations("common")("external");
  const trackRef = useRef<HTMLUListElement>(null);
  const frame = useRef(0);

  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const glide = (dir: 1 | -1) => {
    if (reduce()) return;
    const step = () => {
      trackRef.current?.scrollBy({ left: dir * 7 });
      frame.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(step);
  };
  const stop = () => cancelAnimationFrame(frame.current);

  const jump = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("li");
    if (!track || !card) return;
    track.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: reduce() ? "auto" : "smooth" });
  };

  const edge =
    "group absolute inset-y-0 z-10 hidden w-24 items-center from-bg to-transparent sm:flex focus-visible:outline-offset-[-4px]";

  return (
    <section id="work" aria-labelledby="projects-title" className="px-4 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="projects-title">{t("title")}</SectionTitle>

        <div className="relative mt-10">
          <button
            type="button"
            aria-label={t("prev")}
            onClick={() => jump(-1)}
            onPointerEnter={(e) => e.pointerType === "mouse" && glide(-1)}
            onPointerLeave={stop}
            className={`${edge} left-0 justify-start bg-gradient-to-r pl-2`}
          >
            <span className="grid size-11 place-items-center rounded-lg bg-ink text-white transition-transform group-hover:scale-110">
              <ArrowLeft className="size-5" />
            </span>
          </button>
          <button
            type="button"
            aria-label={t("next")}
            onClick={() => jump(1)}
            onPointerEnter={(e) => e.pointerType === "mouse" && glide(1)}
            onPointerLeave={stop}
            className={`${edge} right-0 justify-end bg-gradient-to-l pr-2`}
          >
            <span className="grid size-11 place-items-center rounded-lg bg-ink text-white transition-transform group-hover:scale-110">
              <ArrowRight className="size-5" />
            </span>
          </button>

          <ul
            ref={trackRef}
            data-lenis-prevent-horizontal
            data-anim="stagger"
            className="no-scrollbar relative flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain"
          >
            {projects.map((project) => {
              const title = t(`items.${project.id}.title`);
              return (
                <li key={project.id} className="w-[85%] shrink-0 snap-start sm:w-[34rem]">
                  <article className={`group/card relative flex h-[30rem] flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-6 sm:h-[34rem] sm:p-8 ${project.tint}`}>
                    <h3 className="text-2xl font-light tracking-tight sm:text-3xl">.{title}</h3>
                    <div className="flex flex-1 items-center justify-center gap-4 py-6">
                      {project.images.map((src, n) => (
                        <PhoneFrame
                          key={src}
                          src={src}
                          alt={t("screenshot", { title, n: n + 1 })}
                          sizes="(min-width: 640px) 176px, 36vw"
                          className={`w-[38%] max-w-[11rem] transition-transform duration-500 ease-out-soft ${
                            n === 0 ? "group-hover/card:-translate-y-2 group-hover/card:-rotate-2" : "translate-y-5 group-hover/card:translate-y-2 group-hover/card:rotate-2"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <p className="font-mono text-xs text-muted">{t(`items.${project.id}.meta`)}</p>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-surface px-4 py-2 text-sm font-medium shadow-soft transition-colors hover:bg-accent hover:text-accent-ink"
                      >
                        {t(`items.${project.id}.cta`)}
                        <span className="sr-only"> {ext}</span>
                        <ArrowUpRight className="size-4" />
                      </a>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
