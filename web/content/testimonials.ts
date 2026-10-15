import type { Locale } from "@/i18n/routing";

/**
 * The testimonials section only renders when this list is non-empty.
 * Example entry:
 * {
 *   name: "Ayşe Yılmaz",
 *   role: { tr: "Kurucu", en: "Founder" },
 *   company: "Örnek Ltd.",
 *   quote: { tr: "…", en: "…" },
 * }
 */
export type Testimonial = {
  name: string;
  role: Record<Locale, string>;
  company: string;
  quote: Record<Locale, string>;
};

export const testimonials: Testimonial[] = [];
