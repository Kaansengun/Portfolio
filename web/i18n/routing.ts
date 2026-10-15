import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "always",
  // No cookies anywhere on the site, so no consent banner is needed.
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];
