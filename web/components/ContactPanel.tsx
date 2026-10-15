"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { links } from "@/content/links";
import { contactSchema } from "@/lib/contact-schema";
import { lockScroll } from "@/lib/scroll";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useContact } from "./ContactProvider";
import { ArrowSquareLeft } from "@phosphor-icons/react/dist/ssr";

type Status = "idle" | "sending" | "success" | "error";
type Field = "email" | "name" | "message";

export function ContactPanel() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const { open, openContact, closeContact } = useContact();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  // Like a call to action at the end of the story: the button grows once About is on screen.
  const [spotlight, setSpotlight] = useState(false);
  // "Benimle çalış" → "Benimle / çalış", "Work with me" → "Work / with me"
  const [ctaFirst, ...ctaRest] = t("cta").split(" ");

  useEffect(() => {
    const about = document.getElementById("about");
    if (!about) return;
    const observer = new IntersectionObserver(([entry]) => setSpotlight(entry.isIntersecting), {
      rootMargin: "0px 0px -55% 0px",
    });
    observer.observe(about);
    return () => observer.disconnect();
  }, []);

  useFocusTrap(panelRef, open, closeContact);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = contactSchema.safeParse({ ...data, locale });

    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as Field;
        if (field === "email" || field === "name" || field === "message") {
          next[field] = t(`form.errors.${field}`);
        }
      }
      setErrors(next);
      const first = (["email", "name", "message"] as const).find((f) => next[f]);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  // Reference measurements: white field, 1px accent border, 10px radius, 15px padding, Fira Sans 100 at 18px.
  const inputClass =
    "w-full rounded-[10px] border border-accent bg-surface p-[15px] font-display text-lg leading-[21px] font-thin text-ink placeholder:text-faint transition-shadow duration-200 focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-red-600";

  const field = (name: Field, input: ReactNode) => (
    <div>
      {input}
      {errors[name] && (
        <p id={`contact-${name}-error`} className="mt-1.5 text-sm text-red-700">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <>
      {/* Fixed "Work with me" trigger: bottom right on phones, top right on desktop */}
      <button
        type="button"
        onClick={openContact}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`group fixed right-4 bottom-4 z-40 overflow-hidden rounded-[5px] bg-accent px-5 py-3 text-left text-tint shadow-lift [transition:top_.7s_var(--ease-out-soft),transform_.7s_var(--ease-out-soft),background-color_.1s] hover:bg-[#000036] sm:right-6 sm:bottom-6 lg:top-[45px] lg:right-[70px] lg:bottom-auto lg:origin-top-right lg:py-[5px] lg:pr-[45px] lg:pl-[25px] lg:shadow-none ${
          spotlight ? "lg:top-[40vh] lg:scale-[1.35]" : ""
        }`}
      >
        <span className="relative z-10 block text-lg leading-tight font-bold lg:text-2xl lg:leading-9">
          {ctaFirst}
          <br className="hidden lg:block" />
          <span className="lg:hidden"> </span>
          {ctaRest.join(" ")}
        </span>
        {/* One long arrow across the middle, between the two lines; it nudges right on hover */}
        <span
          aria-hidden
          className="absolute top-1/2 right-[20px] left-0 hidden -translate-y-1/2 items-center transition-transform duration-300 ease-out-soft group-hover:translate-x-1.5 lg:flex"
        >
          <span className="h-[1.5px] flex-1 bg-current" />
          <svg viewBox="0 0 10 14" className="-ml-[9px] h-3.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1l8 6-8 6" />
          </svg>
        </span>
      </button>

      <div
        aria-hidden
        onClick={closeContact}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-500 ease-out-soft ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[554px] flex-col overflow-y-auto overscroll-contain bg-tint pb-10 shadow-[5px_5px_40px_rgb(0_0_0/0.1)] transition-transform duration-500 ease-out-soft ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        data-lenis-prevent
      >
        <button type="button" onClick={closeContact} className="group mt-5 ml-4 flex w-fit items-center gap-2.5 text-base transition-colors hover:text-accent sm:mt-[30px] sm:ml-[30px]">
          <ArrowSquareLeft weight="fill" className="size-[34px] transition-transform duration-300 group-hover:-translate-x-1" />
          {t("close")}
        </button>

        <div className="mx-6 mt-10 border-b border-[#808080] pb-[23px] sm:mx-[45px] sm:mt-[55px]">
        <h2 id={titleId} className="text-lg leading-[21px] font-bold text-faint">
          {t("title")}
        </h2>
        <ul className="mt-[22px] space-y-[21px] pl-5 text-[1.375rem] leading-[18px] font-normal">
          <li>
            <a href={`mailto:${links.email}`} className="block break-all transition-colors hover:text-accent">
              <span className="sr-only">{t("emailLabel")}: </span>
              {links.email}
            </a>
          </li>
          <li>
            <a href={links.phoneHref} className="block transition-colors hover:text-accent">
              <span className="sr-only">{t("phoneLabel")}: </span>
              {links.phone}
            </a>
          </li>
        </ul>
        </div>

        <form noValidate onSubmit={onSubmit} className="mx-6 mt-[45px] space-y-[18px] sm:mx-[45px]">
          {field(
            "email",
            <>
              <label htmlFor="contact-email" className="sr-only">
                {t("form.email")}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={t("form.email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={inputClass}
              />
            </>,
          )}
          {field(
            "name",
            <>
              <label htmlFor="contact-name" className="sr-only">
                {t("form.name")}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder={t("form.name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={inputClass}
              />
            </>,
          )}
          {field(
            "message",
            <>
              <label htmlFor="contact-message" className="sr-only">
                {t("form.message")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                placeholder={t("form.message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${inputClass} min-h-[132px] resize-y`}
              />
            </>,
          )}
          {/* Honeypot */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="contact-company">Company</label>
            <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex items-center justify-between gap-4">
            <p role="status" aria-live="polite" className="text-sm">
              {status === "success" && <span className="text-emerald-800">{t("form.success")}</span>}
              {status === "error" && <span className="text-red-700">{t("form.error")}</span>}
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="ml-auto flex shrink-0 origin-right items-center gap-2 rounded-[5px] bg-accent px-8 py-4 font-[Arial,Helvetica,sans-serif] text-xl leading-[23px] font-normal text-tint transition-transform duration-200 hover:scale-110 hover:shadow-[5px_5px_40px_rgb(0_0_0/0.1)] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" && <span className="size-4 animate-spin rounded-full border-2 border-tint/30 border-t-tint" />}
              {status === "sending" ? t("form.sending") : t("form.submit")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
