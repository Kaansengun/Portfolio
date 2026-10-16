"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * One place for all scroll animations. Sections stay server components and opt in
 * with data attributes:
 *
 *   data-anim="left|right|up|scale|zoom|pop"   element enters on scroll (reverses on scroll back)
 *   data-anim="stagger"                        direct children rise one after another
 *   data-anim="lines"                          [data-line] children rise with a slight skew
 *   data-anim="fan"                            [data-fan-x]/[data-fan-r] children spread out while scrolling
 *   data-anim="draw"                           grows from the top while scrolling
 *   data-anim-start="top 70%"                  optional trigger start
 *   data-parallax="-60"                        drifts by N px while passing through the viewport
 *
 * Below 1024px everything becomes a short fade-up that plays once (no sideways motion, no parallax).
 * Nothing runs with prefers-reduced-motion; content is always in the HTML and visible without JS.
 */
const enter: Record<string, gsap.TweenVars> = {
  left: { x: -90, autoAlpha: 0 },
  right: { x: 90, autoAlpha: 0 },
  up: { y: 70, autoAlpha: 0 },
  scale: { scale: 0.7, y: 90, autoAlpha: 0.3 },
  zoom: { scale: 2, y: 30, autoAlpha: 0 },
  pop: { scale: 0.85, autoAlpha: 0 },
};

/** Phones: no sideways motion, short distances, play once (content never disappears on scroll-up). */
const enterMobile: gsap.TweenVars = { y: 24, autoAlpha: 0 };

export function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { desktop } = context.conditions as { desktop: boolean; mobile: boolean };
        const toggle = desktop ? "play none none reverse" : "play none none none";
        const startOf = (el: Element) => (desktop ? (el.getAttribute("data-anim-start") ?? "top 82%") : "top 92%");
        const trigger = (el: Element) => ({ trigger: el, start: startOf(el), toggleActions: toggle });

        gsap.utils.toArray<HTMLElement>("[data-anim]").forEach((el) => {
          const kind = el.dataset.anim!;

          if (kind in enter) {
            gsap.from(el, {
              ...(desktop ? enter[kind] : enterMobile),
              duration: desktop ? (kind === "scale" ? 0.6 : 0.7) : 0.5,
              ease: "power3.out",
              scrollTrigger: trigger(el),
            });
          } else if (kind === "stagger") {
            gsap.from(el.children, {
              y: desktop ? 50 : 20,
              autoAlpha: 0,
              duration: desktop ? 0.7 : 0.45,
              stagger: desktop ? 0.12 : 0.08,
              ease: "power3.out",
              scrollTrigger: trigger(el),
            });
          } else if (kind === "lines") {
            gsap.from(el.querySelectorAll("[data-line]"), {
              y: desktop ? 80 : 20,
              skewY: desktop ? 6 : 0,
              autoAlpha: 0,
              duration: desktop ? 0.6 : 0.45,
              ease: "power4.out",
              stagger: { amount: desktop ? 0.35 : 0.2 },
              scrollTrigger: trigger(el),
            });
          } else if (kind === "fan") {
            gsap.utils.toArray<HTMLElement>("[data-fan-x]", el).forEach((child) => {
              const x = Number(child.dataset.fanX);
              const rotate = Number(child.dataset.fanR ?? 0);
              if (!desktop) {
                // Phones: show the spread state directly, scaled to the narrow screen.
                gsap.set(child, { x: x * 0.55, rotate });
                return;
              }
              gsap.fromTo(
                child,
                { x: 0, rotate: 0 },
                { x, rotate, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "center 50%", scrub: 0.6 } },
              );
            });
          } else if (kind === "draw") {
            gsap.fromTo(
              el,
              { scaleY: 0 },
              { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: true } },
            );
          }
        });

        // Parallax only on large screens; on phones it pushes content under fixed UI.
        if (desktop) {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            gsap.fromTo(
              el,
              { y: 0 },
              {
                y: Number(el.dataset.parallax),
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });
        }
      },
    );

    // Late layout shifts (fonts, images) move trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
