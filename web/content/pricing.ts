import type { Locale } from "@/i18n/routing";

/**
 * Prices are locale-specific (TL for Turkish, USD for English).
 * Service names live in messages under `faq.plans.<id>`.
 */
export type Plan = {
  id: "landing" | "corporate" | "ios" | "custom";
  price: Record<Locale, string>;
};

export const plans: Plan[] = [
  { id: "landing", price: { tr: "12.000 TL'den başlayan", en: "from $350" } },
  { id: "corporate", price: { tr: "25.000–45.000 TL", en: "$750–1,300" } },
  { id: "ios", price: { tr: "90.000 TL'den başlayan", en: "from $2,500" } },
  { id: "custom", price: { tr: "Kapsama göre teklif", en: "Custom quote" } },
];

export const maintenancePrice: Record<Locale, string> = {
  tr: "1.500 TL/ay'dan başlayan",
  en: "from $45/mo",
};

/** FAQ entries; question/answer texts live in messages under `faq.items.<id>`. */
export const faqIds = ["duration", "selfEdit", "maintenance", "payment"] as const;
