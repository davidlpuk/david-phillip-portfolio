# David Phillip Portfolio

Portfolio site for David Phillip, Head of Design / Design Director. It is
aimed at hiring managers (CPOs, CTOs, design leaders) and specialist
recruiters, mainly in financial services and B2B SaaS. Live at
https://david-phillip-portfolio.vercel.app. Vercel deploys `main` to
production on every push, so treat `main` as live.

## Ground rules

- **Don't change the content of `/`** (the financial-services version) unless
  David asks. Framing for other audiences lives in the variants (see
  Audience versions).
- Copy is UK English, plain and specific. Metrics must match the case studies
  and CV.
- Before pushing, run `pnpm check && pnpm test && pnpm build`. The build ends
  with a verification step; `pnpm check:a11y` runs the accessibility scan.
- Never put secrets in client code. Anything `VITE_*` ships to the browser.

## Stack

React 19, TypeScript 5.6, Vite 7, Tailwind CSS 4 (`@theme` tokens), wouter 3
routing, Framer Motion 12, Radix UI, `@react-pdf/renderer` 4, Express 4 (local
tools and a Vercel function), Vercel Web Analytics, Vitest 2, pnpm 10.4.1.

## Layout

```
apps/client/            Vite root
  index.html            HTML shell: meta, JSON-LD, font preloads
  public/               Static files: images/site/*.webp, fonts/, videos/,
                        og-*.jpg share images, docs/DP CV - Download.md
  src/app/              App.tsx (routes), main.tsx (hydrate or render),
                        entry-server.tsx (prerender), index.css (all styles)
  src/rebuild/          The current site: content, layout, meta, audiences
    portfolioData.ts    Case studies, references, experience, profile
    audiences.ts        Home page versions (/, /saas, /design-leadership)
    meta.ts             Titles, descriptions, share images, prerender list
    site.tsx            Header, footer, contact, Reveal, scroll handling
    writing.ts          Essays shown on /articles
    analytics.ts        Vercel Analytics with ?ref tracking
  src/views/            Pages. Current: PortfolioV2, PortfolioV2CaseStudy, CV,
                        LinkedInArticlesView, NotFound. The rest are legacy
                        or admin pages.
  src/features/cv-pdf/  CVPDF.tsx, the PDF CV (react-pdf)
apps/server/            Express API for local tools (chat, articles, scraping)
api/index.ts            Wraps the Express app as a Vercel function
apps/chrome-extension/  Job/article capture extension (talks to localhost)
scripts/                prerender, CV PDF, build check, a11y check, share images
docs/                   PORTFOLIO_2026_REDESIGN.md (design rationale),
                        PORTFOLIO_BENCHMARK.md (rubric and peer comparison)
```

## Design system

Everything public renders inside `SiteShell`, which adds the `.dp` class.
Tokens and utilities sit at the end of `src/app/index.css`:

- Colours: ink `#0c0e12`, paper `#f4f1ea`, bone `#fbfaf7`, stone `#585c63`,
  mist `#a3a9b4`, cobalt `#2a4bd8` (accent), periwinkle `#8aa2ff` (accent on
  dark), signal `#2fbf71` (availability).
- Type: Instrument Serif (`font-editorial`, display), Geist (`font-ui`),
  Geist Mono (`font-label`). Self-hosted in `public/fonts/`.
- Utilities: `type-hero`, `type-section`, `type-title`, `type-metric`,
  `type-lede`, `type-label`, `hero-rise`, `glow`, `grid-texture`.

The older CSS in `index.css` and `shared/styles/` (Montserrat, "Theme X"
presets) only serves legacy and admin pages. Montserrat and Material Symbols
load from Google Fonts on those pages only (`useLegacyFonts` in `App.tsx`).

## Routes

| Route | Page |
| --- | --- |
| `/`, `/saas`, `/design-leadership` | Home, one per audience |
| `/v2` | Short one-page portfolio (`views/PortfolioShort.tsx`, copy in `rebuild/shortPortfolio.ts`) |
| `/case-study/:slug` | coutts, hsbc-kinetic, cognism, ux-sidekick |
| `/cv` | CV page; PDF at `/David-Phillip-CV.pdf` |
| `/articles` | Writing (links to LinkedIn) |
| `/articles/:slug`, `/design-system` | Legacy pages |
| `/admin/*`, `/explorer` | Local tools; 404 in production builds |
| `/legacy/*`, `/portfolio-v2/*` | Redirect to the current pages |

## Audience versions

`audiences.ts` defines each version's headline, intro, proof row, case study
order, "What this shows" lines, leadership framing, contact sentence and
share image. `/v2` is also registered as an audience (`short`) so case
studies opened from it link back to it. `/saas`, `/design-leadership` and
`/v2` are `noindex`. A visitor stays
in their version across pages (`useAudience`, sessionStorage). Adding a
version also needs a route in `App.tsx`, an entry in `prerenderRoutes`
(`meta.ts`), a rewrite in `vercel.json` and the path in `homePaths`
(`scripts/prerender.mjs`).

## Build and deploy

`pnpm build` runs:

1. `vite build` to `dist/public`.
2. `scripts/prerender.mjs`: renders every route in `prerenderRoutes` to
   static HTML with its own title, description, canonical and share tags,
   embeds the CV markdown on `/cv`, writes `spa.html` for all other routes,
   and renders the CV PDF (`scripts/cv-pdf.mjs`).
3. `scripts/verify-build.mjs`: fails the build if a page isn't prerendered
   correctly, a share image or the PDF is missing, or admin code or
   `localhost` calls reach the bundle.
4. esbuild bundles the server to `dist/index.js`.

`main.tsx` hydrates prerendered pages and renders the rest client-side.
Vercel (`vercel.json`) installs with `--frozen-lockfile`, runs
`pnpm check && pnpm test && pnpm build`, serves `dist/public`, rewrites
prerendered paths to their `index.html` and everything else to `spa.html`.
A failed build leaves the previous deployment live.
`.github/workflows/ci.yml` runs the same checks plus `pnpm check:a11y` (axe,
WCAG 2.2 AA, desktop and phone) on every push.

## Security model

- The Express API is a local tool. Deployed copies (Vercel or `pnpm start`)
  answer only `/api/health` unless `ENABLE_PRIVATE_API=true`. CORS allows
  localhost and Chrome extensions only; article slugs are validated before
  they touch the file system (`apps/server/src/security.ts`).
- Admin pages are swapped for the 404 page in production builds unless
  `VITE_ENABLE_ADMIN=true`.
- Case study passwords are a client-side soft gate; the content ships in the
  bundle. Don't put anything genuinely confidential in a case study.

## Analytics

Vercel Web Analytics (cookieless) loads in production. Links sent with an
application can carry `?ref=<company>`, e.g. `/saas?ref=monzo`. The ref lasts
the visit and is folded into the recorded path (`/ref/monzo/saas`), so
Vercel's Pages report shows who opened what. Web Analytics must be enabled
in the Vercel project settings.

## Generated assets

- CV PDF: built from `public/docs/DP CV - Download.md` by `CVPDF.tsx`, using
  the TrueType fonts in `public/fonts/pdf/`. Edit the markdown, not the PDF.
- Case study share images: `node scripts/make-share-images.mjs` after
  changing a case study's title, sector, first metric or cover.
- Home share images (`og-image*.jpg`) were made by hand; regenerate if the
  headlines change.

## Commands

```bash
pnpm install          # pnpm 10.4.1
pnpm dev              # site on http://localhost:3000
pnpm server           # local API on http://localhost:3001
pnpm check            # TypeScript
pnpm test             # Vitest
pnpm build            # build, prerender, PDF, verify
pnpm check:a11y       # axe scan of dist (needs Chromium:
                      # pnpm exec playwright-core install chromium)
```

## Environment variables

| Variable | Used by |
| --- | --- |
| `GROQ_API_KEY`, `GROQ_MODEL`, `XAI_API_KEY`, `XAI_MODEL` | Chat (server) |
| `OLLAMA_BASE_URL`, `EMBEDDING_MODEL`, `LLM_MODEL` | Local embeddings (server) |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Admin login (server) |
| `EMAIL_USER`, `EMAIL_PASS` | Contact form email (server) |
| `ENABLE_PRIVATE_API` | Opens the private API on a deployed server |
| `VITE_ENABLE_ADMIN` | Includes admin pages in a production build |
| `VITE_CHAT_API_URL` | Chat endpoint for the admin chat views |
| `SITE_URL` | Overrides the canonical origin when prerendering |

The canonical origin is `SITE_URL` in `src/rebuild/meta.ts`. If the site moves
to a custom domain, update it there, in `index.html` (meta tags and JSON-LD),
`public/sitemap.xml`, `public/robots.txt` and the CV markdown.
