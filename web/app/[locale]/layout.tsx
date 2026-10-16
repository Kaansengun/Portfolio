import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Sora, Fira_Sans, JetBrains_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { siteUrl, links } from "@/content/links";
import { ContactProvider } from "@/components/ContactProvider";
import { ContactPanel } from "@/components/ContactPanel";
import { SideMenu } from "@/components/SideMenu";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import "../globals.css";

// Only the thin hero font (the LCP text) is preloaded; the rest swap in right after.
const sora = Sora({ subsets: ["latin", "latin-ext"], variable: "--font-sora", display: "swap", preload: false });
const fira = Fira_Sans({ subsets: ["latin", "latin-ext"], weight: "100", variable: "--font-fira", display: "swap" });
const firaBold = Fira_Sans({ subsets: ["latin", "latin-ext"], weight: "700", variable: "--font-fira-bold", display: "swap", preload: false });
// Only the code window further down uses the mono font, so it is not preloaded.
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-jetbrains", display: "swap", preload: false });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  // Lets env(safe-area-inset-*) work so the floating button clears the iPhone home indicator.
  viewportFit: "cover",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: "/tr", en: "/en", "x-default": "/tr" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "Kaan Şengün",
      title: t("title"),
      description: t("description"),
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? "en_US" : "tr_TR",
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
    authors: [{ name: "Kaan Şengün", url: siteUrl }],
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kaan Şengün",
    jobTitle: "Software Engineer",
    url: siteUrl,
    email: `mailto:${links.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" },
    alumniOf: "Karadeniz Technical University",
    sameAs: [links.linkedin, links.github],
  };

  return (
    <html lang={locale} className={`${sora.variable} ${fira.variable} ${firaBold.variable} ${mono.variable}`}>
      <body>
        {/* Loader: the monogram blinks, then the curtain lifts (CSS only, skipped with reduced motion) */}
        <div className="loader" aria-hidden>
          <span className="grid size-16 place-items-center rounded-2xl bg-accent font-mono text-xl font-semibold text-accent-ink">KŞ</span>
        </div>
        <a
          href="#main"
          className="fixed top-3 left-1/2 z-[60] -translate-x-1/2 -translate-y-20 rounded-lg bg-accent px-4 py-2 text-accent-ink transition-transform focus:translate-y-0"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider>
          <ContactProvider>
            <SmoothScroll />
            <SideMenu />
            <ScrollProgress />
            <main id="main" className="pl-[var(--rail)]">
              {children}
            </main>
            <ContactPanel />
          </ContactProvider>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
