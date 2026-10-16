"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Binoculars, GithubLogo, House, LinkedinLogo, Smiley } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { links } from "@/content/links";
import { profilePhoto } from "@/content/media";
import { lockScroll, scrollToSection } from "@/lib/scroll";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { CloseIcon, MenuIcon } from "./icons";

const items = [
  { id: "home", Icon: House },
  { id: "projects", Icon: Binoculars },
  { id: "about", Icon: Smiley },
] as const;

type ItemId = (typeof items)[number]["id"];

function Avatar({ className = "" }: { className?: string }) {
  return (
    <span className={`relative block overflow-hidden rounded-full ${className}`}>
      <Image src={profilePhoto} alt="" fill sizes="180px" className="object-cover" />
    </span>
  );
}

function LanguageSwitch({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  return (
    <p className={`flex items-center gap-1.5 text-xl ${className}`} role="group" aria-label={t("language")}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden className="font-light">
              /
            </span>
          )}
          {l === locale ? (
            <span aria-current="true" className="font-semibold uppercase text-accent">
              {l}
            </span>
          ) : (
            <Link
              href="/"
              locale={l}
              hrefLang={l}
              aria-label={`${l.toUpperCase()}, ${t("switchTo")}`}
              className="font-light uppercase transition-colors hover:font-semibold hover:text-accent"
            >
              {l}
            </Link>
          )}
        </span>
      ))}
    </p>
  );
}

function Socials({ className = "" }: { className?: string }) {
  const icon = "size-[34px] transition-transform duration-100 ease-in-out hover:scale-[1.3]";
  return (
    <div className={`flex gap-4 ${className}`}>
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-1">
        <LinkedinLogo weight="fill" className={icon} />
      </a>
      <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-1">
        <GithubLogo weight="fill" className={icon} />
      </a>
    </div>
  );
}

export function SideMenu() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ItemId>("home");
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useFocusTrap(dialogRef, open, close);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  // The active item is the last section whose top has passed 40% of the viewport.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current: ItemId = "home";
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      {/* Desktop: fixed sidebar (measurements follow the reference: 300px wide, 180px photo, 60px rows) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[var(--rail)] flex-col items-center bg-surface pt-[30px] pb-[45px] lg:flex">
        <a href="#home" onClick={go("home")} aria-label={t("logo")} className="transition-transform duration-300 ease-out-soft hover:scale-[1.03]">
          <Avatar className="size-[140px] xl:size-[180px]" />
        </a>

        <nav aria-label={t("label")} className="mt-16 w-full px-6 xl:px-[35px]">
          <ul>
            {items.map(({ id, Icon }) => {
              const current = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={current ? "true" : undefined}
                    className={`group flex h-[60px] items-center gap-[18px] rounded-[5px] p-[15px] transition-colors duration-200 ${current ? "text-accent" : "text-ink hover:text-accent"}`}
                  >
                    <Icon weight="fill" className="size-9 shrink-0 transition-transform duration-300 ease-out-soft group-hover:scale-110" />
                    <span
                      className={`rounded-[5px] border-l-2 py-2.5 pr-[15px] text-[1.3rem] leading-none font-bold transition-all duration-300 ${
                        current ? "border-accent bg-tint pl-[15px]" : "border-transparent pl-0 group-hover:border-accent group-hover:bg-tint group-hover:pl-[15px]"
                      }`}
                    >
                      {t(id)}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <LanguageSwitch className="mt-14" />
        <Socials className="mt-auto" />
      </aside>

      {/* Mobile: a light bar behind the photo and hamburger so content doesn't collide with them */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-30 h-20 bg-gradient-to-b from-surface via-surface/85 to-transparent lg:hidden" />

      {/* Mobile: photo + hamburger */}
      <a href="#home" onClick={go("home")} aria-label={t("logo")} className="fixed top-4 left-4 z-40 lg:hidden">
        <Avatar className="size-12 shadow-soft" />
      </a>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("openMenu")}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed top-4 right-4 z-40 grid size-12 place-items-center rounded-[5px] bg-surface text-ink shadow-soft lg:hidden"
      >
        <MenuIcon className="size-7" />
      </button>

      {/* Mobile: full-screen menu */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("label")}
        inert={!open}
        data-lenis-prevent
        className={`fixed inset-0 z-50 flex flex-col items-center bg-surface px-6 pt-4 pb-10 transition-[opacity,transform] duration-500 ease-out-soft lg:hidden ${
          open ? "opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex w-full justify-end">
          <button type="button" onClick={close} aria-label={t("closeMenu")} className="grid size-12 place-items-center rounded-[5px] bg-tint text-ink">
            <CloseIcon className="size-7" />
          </button>
        </div>
        <Avatar className="mt-2 size-32" />

        <nav aria-label={t("label")} className="mt-10 w-full max-w-xs">
          <ul>
            {items.map(({ id, Icon }) => {
              const current = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={current ? "true" : undefined}
                    className={`flex h-[64px] items-center gap-[18px] p-[15px] ${current ? "text-accent" : "text-ink"}`}
                  >
                    <Icon weight="fill" className="size-9 shrink-0" />
                    <span className={`rounded-[5px] border-l-2 py-2.5 pr-[15px] text-[1.4rem] leading-none font-bold ${current ? "border-accent bg-tint pl-[15px]" : "border-transparent pl-0"}`}>
                      {t(id)}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <LanguageSwitch className="mt-10" />
        <Socials className="mt-auto" />
      </div>
    </>
  );
}
