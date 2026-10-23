# Portfolio Benchmark: Design-Leadership Portfolios

How David's portfolio compares with the design-leadership portfolios that
hiring managers and curators single out, scored against an explicit rubric.

## Method

1. **Criteria** come from published hiring guidance for senior design roles:
   Leadership Folios (33 annotated leadership portfolios), Verified Insider
   (Tom Scott), Marissa Louie's list of 25+ leadership portfolios, UXPin's
   2026 roundup, UX Collective on director/head-of-UX hiring, Diego Notes on
   VP portfolios, Adobe Design, Design Week and Lyssna's summary of NN/g
   research. Recruiter scan criteria come from
   `apps/reseach-recommendations/research-recommendations.md`.
2. **Exemplars** are portfolios those sources hold up as strong. Their
   features are taken from the published annotations; this environment's
   network policy blocked direct visits, so exemplar columns record what is
   *reported*, not what was inspected.
3. **Scoring**: each criterion is 0 (absent), 1 (partial) or 2 (strong). The
   original site is commit `145356f` (the live v2 before this redesign).

## Rubric and scores

| # | Criterion | Original | Now | Evidence now |
| --- | --- | :-: | :-: | --- |
| **A** | **First impression (6-second scan)** | | | |
| 1 | Title, level and sector clear in the first viewport | 2 | 2 | Name, "Head of Design · Design Director", financial-services headline |
| 2 | Availability and contact obvious | 1 | 2 | "Available now · London" badge, "Book a call" in the header on every page |
| 3 | Hard proof above the fold | 1 | 2 | NPS −16 → +12, team 5 → 15, 35% adoption, £400K saved, in the hero |
| **B** | **Leadership evidence** | | | |
| 4 | Team building, scale and retention | 1 | 2 | 5 → 15 and 0 → 4 teams, 100% retention, direct-report references |
| 5 | Leadership philosophy or values | 1 | 2 | Four principles, each with a proof point, plus his "pixels/people" line |
| 6 | Business impact in executive language | 1 | 2 | Adoption, NPS, ARR, cost savings, risk outcomes |
| 7 | How they would operate in a new organisation | 0 | 2 | "The first 90 days" plan |
| **C** | **Case studies** | | | |
| 8 | 2–4 curated, level-appropriate studies | 2 | 2 | Coutts, HSBC Kinetic, Cognism, UX Sidekick |
| 9 | Clear personal role and ownership | 1 | 2 | Role, timeline, team and scope grid on every study |
| 10 | Decisions and trade-offs visible | 2 | 2 | "Key decisions" section |
| 11 | Quantified outcomes, stated plainly | 1 | 2 | Metrics band; leaked hedges like "according to the project material" removed |
| 12 | Scannable summary up front | 1 | 2 | Summary, facts, metrics, sticky contents with reading progress |
| 13 | Why the study is included (the takeaway) | 0 | 2 | "What this shows" on every card and study |
| 14 | Shows the real product | 1 | 2 | Gallery with lightbox, HSBC Kinetic launch film, UX Sidekick walkthrough |
| **D** | **Credibility** | | | |
| 15 | Senior third-party testimonials | 1 | 2 | 9 references led by the Cognism CPO, with relationship labels |
| 16 | Thought leadership (writing, talks, community) | 0 | 1 | 16 essays and a Writing page; no talks or community roles listed |
| 17 | Recognisable clients | 1 | 2 | Logo row: Coutts, HSBC, BlackRock, Cognism, Barclays, Deutsche Bank, Schroders, TSB |
| **E** | **Human** | | | |
| 18 | Personality and real photography | 0 | 1 | Editorial portrait, workshop photo, personal line; no video intro |
| **F** | **Execution** | | | |
| 19 | Visual craft and consistency | 1 | 2 | One editorial system across home, case studies, CV, Writing and 404 |
| 20 | Accessibility, performance, SEO, mobile | 0 | 2 | See quality checks below |
| 21 | Frictionless CV access | 1 | 2 | CV in nav, PDF download, print and copy restored |
| | **Total (max 42)** | **19** | **40** | |

## Signals the exemplars are praised for

| Signal | Reported in | David now |
| --- | --- | :-: |
| Business impact front and centre | Marissa Louie (malouie.com), Arin Bhowmick (UXPin) | ✓ |
| Values or leadership philosophy | Marissa Louie | ✓ |
| A dedicated design-leadership case study | Joel Califa (DigitalOcean "Design Leadership") | ✓ Cognism and Coutts |
| Team growth and process building | Joel Califa, Arin Bhowmick, Verified Insider | ✓ |
| Blog or essays | Marissa Louie, Joel Califa | ✓ |
| Talks and community work | Fabricio Teixeira (UX Collective), Robin Noguier | ✗ |
| Strong visuals, light on text, testimonials | Julius Gehrig | ✓ |
| Live work or video | Julius Gehrig, Jeremy Stokes | ✓ films; no live links |
| Video intro | Julius Gehrig | ✗ |
| Measurable outcomes, leadership plus hands-on | Abdus Salam | ✓ |
| A plan for the first 90 days | Not reported for any exemplar | ✓ differentiator |
| "What this shows" framing per case study | Advised by hiring guidance, not reported in exemplars | ✓ differentiator |

## Quality checks

| Check | Result |
| --- | --- |
| axe-core, WCAG 2.2 AA + best practices | 0 violations on home, three case studies, CV, Writing and 404, at 1440 px and 390 px |
| Lighthouse desktop | 100 / 100 / 100 / 100 on home, case study, CV and Writing |
| Lighthouse mobile (slow 4G, 4× CPU) | Performance 87–90; Accessibility, Best Practices and SEO 100 |
| Prerendering | Home, CV, Writing and four case studies ship as complete HTML and hydrate without mismatches |
| Layout shift | CLS 0 on home and CV |

Mobile performance before this work was 54–68, with the page rendered only in
the browser. Prerendering, compressed delivery and self-hosted fonts account
for the change.

## What would close the remaining gap

All of these need input only David can provide:

1. **Talks, panels, podcasts or mentoring** (e.g. ADPList). Even one entry
   lifts criterion 16.
2. **A 60–90 second video intro** for the hero or About area (criterion 18).
3. **Live links** to the shipped products (App Store pages for Coutts and
   HSBC Kinetic) where they are still public.
4. **Verified metrics** and, if confidentiality allows, one design-system or
   governance artefact for platform-design roles.

## Can "top 5" be proven?

Not objectively: there is no ranked list of design-leadership portfolios. On
the closest defensible measure, the site now scores 40 of 42 on criteria
drawn from hiring guidance. It covers every signal the exemplars are praised
for except talks and a video intro, and adds two that none of them are
reported to have.

## Sources

- [Leadership Folios: design leadership portfolio examples, annotated](https://www.leadershipfolios.com/)
- [Verified Insider: Do design leaders need portfolios?](https://verifiedinsider.substack.com/p/do-design-leaders-need-portfolios)
- [Verified Insider: 9 design portfolios to inspire you](https://verifiedinsider.substack.com/p/9-design-portfolios-to-inspire-you)
- [Marissa Louie: list of 25+ design leadership portfolios](https://twitter.com/malouie/status/1633692272624803841) and [malouie.com](https://malouie.com/)
- [Joel Califa: Design Leadership case study](https://joelcalifa.com/work/digitalocean-design-leadership/)
- [Fabricio Teixeira](https://fabricio.work/)
- [UXPin: 16 best UX portfolio examples (2026)](https://www.uxpin.com/studio/blog/ux-portfolio-examples/)
- [UX Collective: Directors and heads of UX, do you need portfolios?](https://uxdesign.cc/directors-and-heads-of-ux-do-you-need-portfolios-to-get-hired-bafbab2436ff)
- [Diego Notes: A VP of Design portfolio](https://diegonmtz.substack.com/p/a-vp-of-design-portfolio-insights)
- [Adobe Design: How applicants can stand out](https://adobe.design/ideas/ask-adobe-design-how-can-applicants-stand-out-when-applying-to-design-jobs)
- [Design Week: IKEA and Deliveroo leaders on "old-fashioned" portfolios](https://www.designweek.co.uk/issues/26-july-1-august-2021/portfolios-deliveroo-ikea)
- [Lyssna: UX portfolio guide](https://www.lyssna.com/blog/ux-designer-portfolio/)
