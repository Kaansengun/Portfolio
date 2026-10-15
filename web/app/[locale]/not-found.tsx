import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("nav");
  return (
    <section className="grid min-h-svh place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-7xl font-medium text-accent">404</p>
        <Link href="/" className="mt-6 inline-block border-b border-ink pb-1 hover:text-accent">
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
