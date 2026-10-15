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

export function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const toggle = "play none none reverse";
      const startOf = (el: Element, fallback = "top 82%") => el.getAttribute("data-anim-start") ?? fallback;

      gsap.utils.toArray<HTMLElement>("[data-anim]").forEach((el) => {
        const kind = el.dataset.anim!;
        const start = startOf(el);

        if (kind in enter) {
          gsap.from(el, {
            ...enter[kind],
            duration: kind === "scale" ? 0.6 : 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start, toggleActions: toggle },
          });
        } else if (kind === "stagger") {
          gsap.from(el.children, {
            y: 50,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start, toggleActions: toggle },
          });
        } else if (kind === "lines") {
          gsap.from(el.querySelectorAll("[data-line]"), {
            y: 80,
            skewY: 6,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power4.out",
            stagger: { amount: 0.35 },
            scrollTrigger: { trigger: el, start, toggleActions: toggle },
          });
        } else if (kind === "fan") {
          gsap.utils.toArray<HTMLElement>("[data-fan-x]", el).forEach((child) => {
            gsap.fromTo(
              child,
              { x: 0, rotate: 0 },
              {
                x: Number(child.dataset.fanX),
                rotate: Number(child.dataset.fanR ?? 0),
                ease: "none",
                scrollTrigger: { trigger: el, start: "top 85%", end: "center 50%", scrub: 0.6 },
              },
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
    });

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
