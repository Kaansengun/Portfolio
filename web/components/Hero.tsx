import type { CSSProperties, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { HeroParallax } from "./HeroParallax";
import { ScrollLink } from "./ScrollLink";
import { Typed } from "./Typed";
import { ArrowDown } from "./icons";

const k = (chunks: ReactNode) => <span className="text-accent">{chunks}</span>;

function Line({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 sm:gap-5">
      <span aria-hidden className="w-6 shrink-0 font-display text-base font-thin text-faint select-none sm:w-8 sm:text-2xl">
        {String(n).padStart(2, "0")}
      </span>
      {children}
    </div>
  );
}

const depth = (px: number) => ({ "--depth": `${px}px` }) as CSSProperties;

export function Hero() {
  const t = useTranslations("hero");
  // Typing starts once the loader has lifted (~1.1s) and runs line by line.
  const start = 1.15;

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <HeroParallax className="relative flex flex-1 items-center px-4 pt-24 pb-10 sm:px-10 lg:px-16">
        {/* Floating decorations that drift with the mouse */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="float absolute top-[16%] left-[8%] size-14 rounded-2xl bg-gradient-to-br from-periwinkle to-transparent opacity-80 sm:size-20" style={depth(-14)} />
          <span className="float absolute top-[12%] right-[8%] hidden size-3 rounded-full bg-accent sm:block" style={depth(18)} />
          <span className="float absolute right-[10%] bottom-[18%] hidden h-16 w-9 rounded-xl border-2 border-ink/80 sm:block" style={depth(-22)}>
            <span className="absolute top-1 left-1/2 h-1 w-3 -translate-x-1/2 rounded-full bg-ink/80" />
          </span>
          <span className="float absolute bottom-[14%] left-[22%] hidden rounded-md bg-surface px-2 py-1 font-mono text-xs text-accent shadow-soft sm:block" style={depth(16)}>
            {"</>"}
          </span>
          <span className="float absolute top-[12%] right-[34%] hidden font-mono text-2xl text-periwinkle md:block" style={depth(-10)}>
            ✦
          </span>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <h1 id="hero-title" className="font-display text-[clamp(1.45rem,7.4vw,2.4rem)] leading-[1.6] font-thin whitespace-nowrap sm:text-5xl sm:leading-[1.4] xl:text-[3.8rem] xl:leading-[80px]">
            <Line n={1}>
              <span>
                <span aria-hidden className="text-faint">&lt;</span>
                <Typed delay={start} duration={0.8} steps={16}>
                  {t.rich("line1", { k })}
                </Typed>
                <span aria-hidden className="text-faint">&gt;</span>
              </span>
            </Line>
            <Line n={2}>
              <span>
                <span aria-hidden className="text-faint">&lt;</span>
                <Typed delay={start + 1} duration={0.9} steps={18}>
                  {t.rich("line2", { k })}
                </Typed>
              </span>
            </Line>
            <Line n={3}>
              <span className="pl-[0.55em]">
                <Typed delay={start + 2.05} duration={0.8} steps={16} keepCaret>
                  {t.rich("line3", { k })}
                </Typed>
                <span aria-hidden className="ml-[0.2em] text-faint">/&gt;</span>
              </span>
            </Line>
          </h1>
          <p className="fade-up mt-8 pl-9 font-display-bold text-lg font-bold sm:mt-10 sm:pl-[3.25rem] sm:text-2xl" style={{ "--delay": `${start + 3}s` } as CSSProperties}>
            {t("title")}
          </p>
        </div>
      </HeroParallax>

      <div className="relative flex justify-center pb-28 sm:pb-10">
        <div aria-hidden className="wash absolute inset-x-0 bottom-0 -z-10 h-48 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <ScrollLink
          to="story-idea"
          style={{ "--delay": `${start + 3.3}s` } as CSSProperties}
          className="fade-up group inline-flex items-center rounded-[5px] bg-surface px-[13px] py-[10px] shadow-soft transition-all duration-200 ease-in-out hover:p-[5px] hover:shadow-none"
        >
          <span className="ml-2.5 text-[17px] leading-[45px] font-light">{t("learnMore")}</span>
          <span className="bob ml-5 grid h-[41px] w-[49px] place-items-center rounded-[5px] bg-accent text-accent-ink group-hover:[animation-play-state:paused]">
            <ArrowDown className="size-5" />
          </span>
        </ScrollLink>
      </div>
    </section>
  );
}
