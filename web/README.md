# kaansengun.com

Kaan Şengün's portfolio. Next.js 16 (App Router) + TypeScript, Tailwind CSS v4, next-intl (TR/EN), GSAP + ScrollTrigger, Lenis, Resend.

## Develop

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY
npm run dev                  # http://localhost:3000 → /tr
```

`npm run build` and `npm run lint` must pass before deploying.

## Editing content

All text and data lives outside the components:

| What | Where |
|---|---|
| UI texts, section copy, process dialogue, FAQ (TR/EN) | `messages/tr.json`, `messages/en.json` |
| Projects (tech, screenshots, link) | `content/projects.ts` + `projects.items.<id>` in messages |
| Experience (dates, type, `isInternship`) | `content/experience.ts` + `experience.items.<id>` in messages |
| Prices, FAQ list | `content/pricing.ts` |
| Testimonials (section stays hidden while empty) | `content/testimonials.ts` |
| Skills and icons | `content/skills.ts` |
| Story stages and the 01–10 heading lines | `content/process.ts` + `story.lines.<nn>` in messages |
| Links, email, phone | `content/links.ts` |
| Story / case study screenshots, profile photo | `content/media.ts`, see `public/images/README.md` |

Design tokens (colors, fonts, shadows) are CSS variables at the top of `app/globals.css`.

## Animations

- Loader, hero typing and the typed 01–10 heading are CSS (`.loader`, `.typed-mask` in `app/globals.css`, `components/Typed.tsx`).
- Scroll animations live in one place, `components/Motion.tsx`. Sections opt in with `data-anim`, `data-line` and `data-parallax` attributes (documented at the top of that file).
- Everything is skipped with `prefers-reduced-motion`, and all content is in the HTML without JS.

## Contact form

`POST /api/contact` validates with zod (shared schema in `lib/contact-schema.ts`), drops honeypot submissions and sends through Resend.
Until `kaansengun.com` is verified as a sending domain in Resend, keep `CONTACT_FROM_EMAIL` on `onboarding@resend.dev`.

## Privacy

No cookies are set (next-intl's locale cookie is disabled), so there is no consent banner.
Vercel Analytics (cookieless) loads only when deployed on Vercel.

## Deploy (Vercel)

1. Import the repo in Vercel and set **Root Directory** to `web`.
2. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` as environment variables.
3. Add the `kaansengun.com` domain (and `www` redirect) under Project → Domains.
