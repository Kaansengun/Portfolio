import { useTranslations } from "next-intl";
import { caseStudyScreens } from "@/content/media";
import { links } from "@/content/links";
import { PhoneFrame } from "./PhoneFrame";
import { SectionTitle } from "./SectionTitle";
import { ArrowUpRight } from "./icons";

export function CaseStudy() {
  const t = useTranslations("caseStudy");
  const ext = useTranslations("common")("external");

  return (
    <section id="projects" aria-labelledby="case-title" className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p data-anim="up" className="font-mono text-sm text-muted">{t("eyebrow")}</p>
        <SectionTitle id="case-title" className="mt-2">{t("title")}</SectionTitle>

        <div data-anim="fan" role="img" aria-label={t("mockups")} className="relative mx-auto mt-12 flex h-[22rem] max-w-3xl items-center justify-center sm:h-[30rem]">
          <div data-fan-x="-150" data-fan-r="-8" className="absolute w-[30%] max-w-[13rem]">
            <PhoneFrame src={caseStudyScreens[0]} alt="" sizes="(min-width: 640px) 208px, 30vw" className="w-full" />
          </div>
          <div data-fan-x="150" data-fan-r="8" className="absolute w-[30%] max-w-[13rem]">
            <PhoneFrame src={caseStudyScreens[2]} alt="" sizes="(min-width: 640px) 208px, 30vw" className="w-full" />
          </div>
          <div className="relative z-10 w-[33%] max-w-[14.5rem]">
            <PhoneFrame src={caseStudyScreens[1]} alt="" sizes="(min-width: 640px) 232px, 33vw" className="w-full" />
          </div>
        </div>

        <dl data-anim="stagger" className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {(["problem", "solution", "contribution"] as const).map((key) => (
            <div key={key} className="border-t-2 border-accent pt-4">
              <dt className="font-semibold">{t(`${key}Title`)}</dt>
              <dd className="mt-1 text-muted text-pretty">{t(key)}</dd>
            </div>
          ))}
        </dl>

        <div data-anim="up" className="mt-10 flex justify-center">
          <a
            href={links.smartBeautyAppStore}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-xl bg-ink px-6 py-3.5 font-medium text-white transition-transform duration-300 ease-out-soft hover:-translate-y-0.5"
          >
            {t("appStore")}
            <span className="sr-only"> {ext}</span>
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
