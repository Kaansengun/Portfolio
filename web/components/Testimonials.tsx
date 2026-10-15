import { useLocale, useTranslations } from "next-intl";
import { testimonials } from "@/content/testimonials";
import type { Locale } from "@/i18n/routing";
import { SectionTitle } from "./SectionTitle";

/** Renders nothing until content/testimonials.ts has entries. */
export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale() as Locale;
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="px-4 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="testimonials-title">{t("title")}</SectionTitle>
        <ul data-anim="stagger" className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col rounded-[var(--radius)] bg-surface p-7 shadow-soft">
                <blockquote className="flex-1 text-pretty">“{item.quote[locale]}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden className="grid size-10 place-items-center rounded-full bg-accent-soft font-mono text-accent">
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-medium">{item.name}</span>
                    <span className="block text-sm text-muted">
                      {item.role[locale]}, {item.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
