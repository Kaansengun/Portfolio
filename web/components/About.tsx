import Image from "next/image";
import { useTranslations } from "next-intl";
import { links } from "@/content/links";
import { profilePhoto } from "@/content/media";
import { skillGroups } from "@/content/skills";
import { SkillIcon } from "./SkillIcon";
import { ArrowUpRight, CapIcon, ChatIcon, PinIcon } from "./icons";

export function About() {
  const t = useTranslations("about");
  const ext = useTranslations("common")("external");

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden px-4 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div aria-hidden className="wash pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 opacity-40 [mask-image:linear-gradient(to_top,transparent,black)]" />
      <div className="mx-auto max-w-5xl lg:pr-56">
        <div className="flex items-center gap-5">
          <span className="relative size-20 shrink-0 overflow-hidden rounded-full lg:hidden">
            <Image src={profilePhoto} alt="" fill sizes="80px" className="object-cover" />
          </span>
          <div>
            <h2 id="about-title" data-anim="up" className="text-4xl font-bold sm:text-5xl">
              {t("name")}
            </h2>
            <p data-anim="up" className="mt-2 flex items-center gap-1.5 text-[1.17rem] font-medium">
              <PinIcon className="size-4" />
              {t("location")}
            </p>
          </div>
        </div>

        <div className="mt-10 max-w-2xl space-y-12">
          <div data-anim="lines">
            <p data-line className="text-2xl leading-snug font-normal text-balance sm:text-[2rem]">{t("lead")}</p>
            <p data-line className="mt-6 text-lg leading-relaxed font-light text-pretty sm:text-[1.375rem]">{t("bio")}</p>
            <ul data-line className="mt-6 space-y-2">
              <li className="flex items-start gap-2">
                <CapIcon className="size-5 shrink-0 text-accent" />
                {t("education")}
              </li>
              <li className="flex items-start gap-2">
                <ChatIcon className="size-5 shrink-0 text-accent" />
                {t("languages")}
              </li>
            </ul>
            <a
              data-line
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 border-b border-ink pb-0.5 transition-colors hover:border-accent hover:text-accent"
            >
              {t("linkedin")}
              <span className="sr-only"> {ext}</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="space-y-6">
            {skillGroups.map((group) => (
              <div key={group.id}>
                <h3 data-anim="up" className="text-xl font-bold">.{t(`groups.${group.id}`)}</h3>
                <ul data-anim="stagger" className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      title={skill.name}
                      className="flex items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-sm shadow-soft"
                    >
                      <SkillIcon name={skill.name} icon={skill.icon} />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
