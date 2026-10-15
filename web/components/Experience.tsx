import { useFormatter, useTranslations } from "next-intl";
import { experience } from "@/content/experience";
import { SectionTitle } from "./SectionTitle";

const toDate = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1));
};

export function Experience() {
  const t = useTranslations("experience");
  const format = useFormatter();
  const fmt = (ym: string) => format.dateTime(toDate(ym), { month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <section id="experience" aria-labelledby="experience-title" className="px-4 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <SectionTitle id="experience-title">{t("title")}</SectionTitle>

        <ol className="relative mt-12">
          <span aria-hidden data-anim="draw" className="absolute top-2 bottom-2 left-[5px] w-px bg-accent/40" />
          {experience.map((job) => (
            <li key={job.id} data-anim="left" data-anim-start="top 88%" className="relative grid gap-1 pb-9 pl-8 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <span aria-hidden className={`absolute top-1.5 left-0 size-[11px] rounded-full ring-4 ring-bg ${job.kind === "ios" ? "bg-accent" : "bg-periwinkle"}`} />
              <p className="font-mono text-xs text-muted sm:pt-1">
                <time dateTime={job.start}>{fmt(job.start)}</time>
                {" – "}
                {job.end ? <time dateTime={job.end}>{fmt(job.end)}</time> : t("present")}
              </p>
              <div>
                <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-semibold">
                  {job.title}
                  <span className="font-normal text-muted">· {job.company}</span>
                  <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-normal ${job.kind === "ios" ? "bg-accent-soft text-accent" : "bg-mint text-emerald-900"}`}>
                    {t(`kinds.${job.kind}`)}
                  </span>
                  {job.isInternship && (
                    <span className="rounded-full bg-blush px-2 py-0.5 font-mono text-[11px] font-normal text-rose-900">{t("intern")}</span>
                  )}
                </h3>
                <p className="mt-1 text-pretty">{t(`items.${job.id}.summary`)}</p>
                <p className="mt-1 text-sm text-muted">{t(`items.${job.id}.location`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
