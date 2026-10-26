# Portfolio 2026 Redesign

The public site (`/`, `/case-study/:slug`, `/cv`) was redesigned to read as a
premium, editorial portfolio for a Head of Design / Design Director in
financial services. Legacy and admin routes are unchanged.

## Who it is for

1. **Hiring managers**: CPOs, CTOs, Chief Design Officers and VPs at banks,
   wealth managers, fintechs and B2B SaaS companies. Often not designers.
2. **Specialist recruiters** (e.g. Zebra People, Futureheads, Major Players),
   who scan for level, sector, commercial outcomes and availability in
   seconds.

## What the benchmark said

Guidance from hiring managers and design leaders on senior portfolios
consistently points to the same things:

- Show what you **enabled** (team scale, operating model, organisational
  impact), not just screens. Directors are judged on scaling design and
  cross-functional alignment.
- Make it **scannable for non-designers**: the problem, your role and the
  outcome should be visible before anyone scrolls.
- Lead case studies with **outcomes and metrics**, and be explicit about what
  you owned versus what the team did.
- Show **2–4 strong projects**, not an archive.
- Remove friction to contact: availability, CV and a booking link everywhere.

Sources: UXPin's 2026 portfolio roundup (the IBM VP of Design example),
Design Week on "old-fashioned" portfolios, Adobe Design on outcomes, Lyssna's
summary of NN/g hiring-manager research, and the earlier internal audits in
this folder (`PORTFOLIO_REBUILD_AUDIT.md`, `BNY_ROLE_FIT_AUDIT.md`,
`apps/reseach-recommendations/research-recommendations.md`).

## Design decisions

| Decision | Why |
| --- | --- |
| Ink + warm paper neutrals, one cobalt accent | Restraint reads as premium and trustworthy for finance; cobalt echoes the portrait and banking blues. |
| Instrument Serif display, Geist UI, Geist Mono labels | Editorial authority with modern, highly legible UI text. |
| Hero states level, sector, availability and proof up front | Passes the recruiter "6-second scan". |
| Outcome-first case study cards with the lead metric large | Hiring managers look for the result first. |
| "How I lead" principles, each with a proof point | Shows leadership philosophy backed by evidence. |
| "The first 90 days" plan | Answers the hiring manager's real question: what happens if we hire you? |
| References section with a featured CPO quote | Third-party proof from senior stakeholders and direct reports. |
| Honest career timeline, with 2024 – now shown as independent AI product work (UX Sidekick) | Recruiters check dates; showing what filled them builds trust. |
| Case study TL;DR (role, timeline, team, scope) and sticky contents | Fast scanning on long pages. |
| Password gate redesigned, with "book a walkthrough" and "email me" | Confidential work still converts into a conversation. |

## Implementation

- Content: `apps/client/src/rebuild/portfolioData.ts`; essays: `rebuild/writing.ts`
  (from `shared/constants/linkedin-articles.ts`)
- Page titles and descriptions, shared by the browser and the prerender:
  `apps/client/src/rebuild/meta.ts`
- Shared layout, header, footer, contact, scroll handling: `apps/client/src/rebuild/site.tsx`
- Pages: `apps/client/src/views/PortfolioV2.tsx`, `PortfolioV2CaseStudy.tsx`,
  `CV.tsx`, `LinkedInArticlesView.tsx` (Writing), `NotFound.tsx`
- Tokens, type scale and self-hosted fonts: end of `apps/client/src/app/index.css`;
  font files and licences in `apps/client/public/fonts/`
- Optimised images: `apps/client/public/images/site/` (WebP, ~700 KB); the
  source PNGs were removed from the repo and remain in git history.
  Web-encoded films are in `apps/client/public/videos/`.

### Audience versions

The short page at `/` is the main portfolio. Send it by default, or the
longer version that matches the role. All versions share the same design,
case studies, references and CV; only the framing and length change.

| Link | Use for | Leads with |
| --- | --- | --- |
| `/` (main) | Everyone, by default: a one-page, two-minute read | Three projects as problem, what I did, result; three references; contact |
| `/full` | Banks, wealth managers, fintech, when they want depth | Trust in financial products; Coutts first |
| `/saas` | B2B SaaS, scale-ups, product-led companies | "Makes complex SaaS feel simple"; Cognism first |
| `/design-leadership` | Any other sector | Complex products and the teams that build them; Cognism first |

Each version has its own headline, intro, proof row, case-study order,
"What this shows" lines, leadership framing, contact sentence and social
share image. Once a visitor lands on a version, the header, footer and case
study links keep them in it. The `/saas` and `/design-leadership` pages are
marked `noindex`, so search engines only show the main site.

To edit a version or add a new one, change `apps/client/src/rebuild/audiences.ts`.
A new version also needs a route in `src/app/App.tsx`, an entry in
`prerenderRoutes` (`rebuild/meta.ts`), a rewrite in `vercel.json`, and the
path added to `homePaths` in `scripts/prerender.mjs`.

### Prerendering

`pnpm build` runs `vite build`, then `scripts/prerender.mjs`, which renders
`/`, `/cv`, `/articles` and every case study to static HTML with per-page
titles, canonicals and social tags (`src/app/entry-server.tsx`). The browser
hydrates that HTML (`src/app/main.tsx`). Every other route gets the plain SPA
shell, `spa.html`, through the catch-all rewrite in `vercel.json`. To add a
public page, add it to `prerenderRoutes` in `rebuild/meta.ts` and add a
matching rewrite in `vercel.json`.

### The main portfolio (`/`)

Since October 2026 the main portfolio is a deliberately brief single page
(it started at `/v2`, which now redirects here, keeping `?ref=`). It shares the design
tokens, case studies and CV with the main site but is written for a two-minute
read: a one-sentence promise, three proof numbers, three projects in a fixed
problem / what I did / result format, three principles with evidence, three
references quoted as complete sentences, recent roles and a single call to
action. Every project links to its full case study, and those pages link back
to `/`. The footer links to the full portfolio at `/full`. Edit the copy in `apps/client/src/rebuild/shortPortfolio.ts`.

### Using it for applications

- **Track who opened what.** Add `?ref=<company>` to any link you send, e.g.
  `https://david-phillip-portfolio.vercel.app/saas?ref=monzo`. In Vercel,
  open the project's Analytics tab: the Pages list shows `/ref/monzo/saas`,
  `/ref/monzo/case-study/cognism` and so on. Turn on Web Analytics in the
  project settings once.
- **CV as a link.** `/David-Phillip-CV.pdf` is rebuilt from
  `public/docs/DP CV - Download.md` on every deploy, in the site's
  typefaces, with whole words only so applicant tracking systems can match
  keywords.
- **Sharing a case study** on LinkedIn or by message shows its own preview
  card with the headline metric (`public/og-case-*.jpg`).

### Safety checks

Every deploy runs the typecheck, unit tests and a build check
(`scripts/verify-build.mjs`); if any fails, Vercel keeps the previous
version live. GitHub Actions also runs an axe accessibility scan of every
public page at desktop and phone widths. The admin pages and the private
API are off in production (see `AGENTS.md`).

### Routes retired

`/legacy` and `/legacy/case-study/:slug` redirect to the new pages, as do the
old `/portfolio-v2` routes. The previous views (`views/Home.tsx`,
`views/CaseStudy.tsx`) remain in the repo for reference. Build output in
`dist/` is no longer tracked in git.

## Quality checks at handover

See `PORTFOLIO_BENCHMARK.md` for the full rubric. In short:

- axe-core (WCAG 2.2 AA and best practices): 0 violations on home, case
  studies, CV, Writing and 404, at desktop and mobile widths.
- Lighthouse desktop: 100 / 100 / 100 / 100 on home, case study, CV and Writing.
- Lighthouse mobile (slow 4G, 4× CPU): Performance 87–90, everything else 100.
- Rubric score: 40 of 42, up from 19 for the previous site.

## Recommended follow-ups

1. **Server-side protection for private case studies.** The password check is
   client-side and the content ships in the bundle. Fine for a soft gate,
   not for genuinely confidential material.
2. **Verify every metric** against source evidence before sharing widely.
3. **Add talks, mentoring or a short video intro**: the two signals the
   benchmark exemplars have that this site does not yet.
4. **Add one design-system artefact** (guidelines or governance model) if
   confidentiality allows; platform-design roles ask for it.
5. **Custom domain and matching email** (e.g. davidphillip.design). Update
   `SITE_URL` and the files listed at the end of `AGENTS.md`.
6. **Higher-resolution case study images.** The Coutts and HSBC artefacts are
   632–639 px wide and look soft on large and retina screens.
