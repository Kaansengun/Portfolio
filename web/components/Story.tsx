import type { ReactNode } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { buildScreen, designScreens, profilePhoto } from "@/content/media";
import { faqIds, maintenancePrice, plans } from "@/content/pricing";
import type { Locale } from "@/i18n/routing";
import { PhoneFrame } from "./PhoneFrame";
import { ScrollLink } from "./ScrollLink";
import {
  AlertIcon,
  ArrowDown,
  FlaskIcon,
  LayersIcon,
  LoopIcon,
  MoonIcon,
  PhotoIcon,
  PlusIcon,
  SparkIcon,
  SunIcon,
  TagIcon,
} from "./icons";

const k = (chunks: ReactNode) => <span className="font-medium text-accent">{chunks}</span>;

/** Each stage leaves room at the top for the fixed 01–10 heading. */
const stageClass = "relative px-4 pt-36 pb-16 sm:px-10 lg:px-16 lg:pt-44";

/* ---------------------------------------------------------------- 01–02 idea */

function StoryIdea() {
  const t = useTranslations("chat");
  const bubble = "rounded-[10px] border-b-2 border-accent bg-bubble px-5 py-3 text-base leading-[1.9] font-medium sm:px-10 sm:py-[15px] sm:text-[1.17rem] sm:leading-[2]";

  return (
    <section id="story-idea" className={stageClass}>
      <div className="mx-auto max-w-5xl space-y-8">
        <div data-anim="left" data-anim-start="top 75%" className="flex items-center gap-3 pr-6 sm:gap-5 sm:pr-40">
          <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-mint text-xl font-light text-emerald-900 sm:size-[60px] sm:text-2xl">
            {t("client").charAt(0)}
          </span>
          <p className={bubble}>
            <span className="sr-only">{t("client")}: </span>
            {t.rich("m1", { k })}
          </p>
        </div>
        <div data-anim="right" data-anim-start="top 72%" className="flex flex-row-reverse items-center gap-3 pl-6 sm:gap-5 sm:pl-40">
          <Image src={profilePhoto} alt="" width={60} height={60} className="size-12 shrink-0 rounded-full object-cover sm:size-[60px]" />
          <p className={bubble}>
            <span className="sr-only">{t("kaan")}: </span>
            {t.rich("m2", { k })}
          </p>
        </div>
        <div data-anim="left" data-anim-start="top 70%" className="flex items-center gap-3 pr-6 sm:gap-5 sm:pr-40">
          <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-mint text-xl font-light text-emerald-900 sm:size-[60px] sm:text-2xl">
            {t("client").charAt(0)}
          </span>
          <p className={bubble}>
            <span className="sr-only">{t("client")}: </span>
            {t("m3")}
          </p>
        </div>

        <div data-anim="up" data-anim-start="top 85%" className="flex justify-center pt-6">
          <ScrollLink to="story-analysis" className="group flex flex-col items-center gap-1 rounded-[5px] px-[13px] py-[10px] text-[17px] font-light transition-all duration-200 hover:p-[5px]">
            {t("cta")}
            <span className="bob grid h-[41px] w-[49px] place-items-center rounded-[5px] bg-accent text-accent-ink group-hover:[animation-play-state:paused]">
              <ArrowDown className="size-5" />
            </span>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 03–04 analysis */

function StoryAnalysis() {
  const t = useTranslations("analysis");
  return (
    <section id="story-analysis" className={stageClass}>
      <div data-anim="scale" className="mx-auto max-w-4xl">
        <div data-anim="lines" className="grid gap-10 sm:grid-cols-2">
          {([
            ["market", SparkIcon],
            ["problem", AlertIcon],
          ] as const).map(([key, Icon]) => (
            <div key={key} className="overflow-hidden">
              <h3 data-line className="flex items-center gap-2 text-[1.17rem] font-medium">
                <Icon className="size-5 text-accent" />
                {t(`${key}Title`)}
              </h3>
              <p data-line className="mt-3 text-lg leading-relaxed font-light text-pretty">
                {t(key)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 data-anim="zoom" data-anim-start="top 85%" className="text-4xl font-normal sm:text-5xl">
            {t("solution")}
          </h3>
          <p data-anim="up" className="mx-auto mt-5 max-w-xl text-lg font-light text-pretty">
            {t("solutionText")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 05–06 design */

function StoryDesign() {
  const t = useTranslations("design");
  return (
    <section id="story-design" className={stageClass}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_15rem]">
        <div role="img" aria-label={t("screens")} className="relative flex items-center justify-center gap-3 rounded-[2rem] bg-gradient-to-br from-blush via-surface to-accent-soft px-4 py-12 sm:gap-6 sm:py-16">
          <div data-parallax="40" className="w-[29%] max-w-[13rem]">
            <PhoneFrame src={designScreens[0]} alt="" sizes="(min-width: 1024px) 208px, 29vw" className="w-full" />
          </div>
          <div data-anim="up" data-anim-start="top 85%" className="relative z-10 w-[34%] max-w-[15rem]">
            <PhoneFrame src={designScreens[1]} alt="" sizes="(min-width: 1024px) 240px, 34vw" className="w-full" />
          </div>
          <div data-parallax="-40" className="w-[29%] max-w-[13rem]">
            <PhoneFrame src={designScreens[2]} alt="" sizes="(min-width: 1024px) 208px, 29vw" className="w-full" />
          </div>
        </div>

        <ul data-anim="stagger" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {([
            ["card1", PhotoIcon],
            ["card2", SunIcon],
          ] as const).map(([key, Icon]) => (
            <li key={key} className="rounded-2xl bg-surface p-5 shadow-soft">
              <Icon className="size-6 text-accent" />
              <h3 className="mt-3 font-semibold">{t(`${key}Title`)}</h3>
              <p className="mt-1 text-sm text-muted">{t(key)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 07–08 build */

const code = `struct RecipeListView: View {
    @StateObject private var model = RecipeListViewModel()

    var body: some View {
        NavigationStack {
            List(model.recipes) { recipe in
                RecipeRow(recipe: recipe)
            }
            .searchable(text: $model.query)
            .task { await model.load() }
        }
    }
}`;

const keywords = new Set(["struct", "private", "var", "some", "in", "await"]);

/** Tiny Swift highlighter, enough for one static snippet. */
function highlight(line: string) {
  return line.split(/(\s+|[(){}:.$])/).map((token, i) => {
    if (keywords.has(token)) return <span key={i} className="text-fuchsia-700">{token}</span>;
    if (token.startsWith("@")) return <span key={i} className="text-amber-700">{token}</span>;
    if (/^[A-Z]/.test(token)) return <span key={i} className="text-accent">{token}</span>;
    return token;
  });
}

function StoryBuild() {
  const t = useTranslations("build");
  const lines = code.split("\n");
  return (
    <section id="story-build" className={stageClass}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <figure data-anim="up" className="overflow-hidden rounded-2xl bg-surface shadow-lift">
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-amber-400" />
              <span className="size-3 rounded-full bg-emerald-400" />
              <span className="ml-3 font-mono text-xs text-muted">RecipeListView.swift</span>
            </div>
            <pre aria-label={t("code")} data-anim="lines" data-anim-start="top 75%" className="overflow-x-auto p-4 font-mono text-[11px] leading-6 sm:p-6 sm:text-[13px]">
              <code>
                {lines.map((line, i) => (
                  <span key={i} data-line className="flex gap-4">
                    <span aria-hidden className="w-5 shrink-0 text-right text-faint select-none">{i + 1}</span>
                    <span className="whitespace-pre">{highlight(line)}</span>
                  </span>
                ))}
              </code>
            </pre>
          </figure>
          <ul data-anim="stagger" className="mt-5 grid gap-4 sm:grid-cols-2">
            {([
              ["card1", LayersIcon],
              ["card2", FlaskIcon],
            ] as const).map(([key, Icon]) => (
              <li key={key} className="flex items-start gap-3 rounded-2xl bg-surface p-5 shadow-soft">
                <Icon className="size-6 shrink-0 text-accent" />
                <span>
                  <span className="block font-semibold">{t(`${key}Title`)}</span>
                  <span className="text-sm text-muted">{t(key)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div data-anim="up" data-anim-start="top 90%" className="mx-auto w-[55%] max-w-[16rem] lg:w-full">
          <div data-parallax="-50">
            <PhoneFrame src={buildScreen} alt={t("screen")} sizes="(min-width: 1024px) 256px, 55vw" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 09–10 launch: pricing & FAQ */

function StoryLaunch() {
  const t = useTranslations("faq");
  const locale = useLocale() as Locale;

  const rows = [
    {
      id: "price",
      Icon: TagIcon,
      title: t("priceTitle"),
      body: (
        <>
          <dl className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5">
            {plans.map((plan) => (
              <div key={plan.id} className="contents">
                <dt>{t(`plans.${plan.id}`)}</dt>
                <dd className="text-right font-medium whitespace-nowrap">{plan.price[locale]}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-muted">{t("priceNote")}</p>
        </>
      ),
    },
    { id: "after", Icon: LoopIcon, title: t("afterTitle"), body: <p>{t("after")}</p> },
    {
      id: "relax",
      Icon: MoonIcon,
      title: t("relaxTitle"),
      body: (
        <p>
          {t("relax")} <span className="font-medium whitespace-nowrap">{maintenancePrice[locale]}</span>
        </p>
      ),
    },
  ];

  return (
    <section id="story-launch" className={stageClass}>
      <div className="mx-auto max-w-5xl">
        <div data-anim="lines">
          {rows.map(({ id, Icon, title, body }) => (
            <div key={id} className="grid gap-4 overflow-hidden py-10 md:grid-cols-[13rem_4rem_1fr] md:items-start">
              <h3 data-line className="text-2xl leading-tight font-bold">
                <Icon className="mb-2 size-6 text-accent" />
                {title}
              </h3>
              <span data-line aria-hidden className="mt-5 hidden h-[2px] w-[42px] bg-accent md:block" />
              <div data-line className="text-lg leading-relaxed font-light sm:text-[1.375rem]">
                {body}
              </div>
            </div>
          ))}
        </div>

        <div data-anim="up" className="mt-10 grid gap-8 md:grid-cols-[14rem_1fr]">
          <h3 className="text-sm font-medium text-muted">{t("moreTitle")}</h3>
          <div className="divide-y divide-line border-y border-line">
            {faqIds.map((id) => (
              <details key={id} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {t(`items.${id}.q`)}
                  <PlusIcon className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="pr-10 pb-4 text-muted">{t(`items.${id}.a`)}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <>
      <StoryIdea />
      <StoryAnalysis />
      <StoryDesign />
      <StoryBuild />
      <StoryLaunch />
    </>
  );
}
