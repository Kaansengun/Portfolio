import { useTranslations } from "next-intl";
import { links } from "@/content/links";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="flex items-center justify-center gap-3 px-4 pt-6 pb-24 text-sm text-muted lg:pb-8">
      <p>{t("rights")}</p>
      <span aria-hidden>·</span>
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t("linkedin")} className="rounded-full p-2 text-ink transition-colors hover:text-accent">
        <LinkedinIcon className="size-4" />
      </a>
      <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label={t("github")} className="rounded-full p-2 text-ink transition-colors hover:text-accent">
        <GithubIcon className="size-4" />
      </a>
    </footer>
  );
}
