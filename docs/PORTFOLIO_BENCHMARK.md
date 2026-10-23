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
2. **Exemplars** are portfolios those sources hold up as strong. Direct
   browsing is blocked here, so their content was read through searches
   restricted to each site's own domain (see "Inspected cohort"), supported
   by the curators' published annotations.
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

## What curators say makes the exemplars work

These are the curators' and reviewers' own stated reasons, used here as an
independent standard rather than criteria written for this site.

| Exemplar and curator's reason it works | Source | David's site |
| --- | --- | --- |
| Ramy Adel (Head of Product Design, digital retail bank): team scope stated with numbers on the first screen | Leadership Folios | ✓ "5 → 15 design team scaled" in the hero proof row |
| Ramy Adel: research operations framed as infrastructure the candidate built, which works when screens are confidential | Leadership Folios | ✓ Coutts: "Research operating model", first UX research practice |
| Joel Califa (VP Design): career told as a timeline, with leadership as its own case study | Leadership Folios | ✓ Experience timeline; Cognism and Coutts are leadership case studies |
| Sandeep Datar (VP UX): a VP-level portfolio built when the underlying work is confidential | Leadership Folios | ✓ Public summary, "What this shows", private gate with walkthrough option |
| Josh Taylor (Head of Design, Hedra): growth-stage leadership told as one story, 5 designers to 40 | Leadership Folios | ✓ Cognism 0 → 4, Coutts 5 → 15, each told end to end |
| Fabricio Teixeira: landing page makes clear he is a leader who is still a designer at heart; talks; community | Verified Insider | ✓ Leadership plus hands-on UX Sidekick; ✗ talks, community |
| Julius Gehrig: strong visuals, live work, video intro, strong testimonials, not reams of text | Verified Insider | ✓ visuals, films, 9 references, scannable layout; ✗ video intro |
| Abdus Salam: measurable outcomes, press coverage, blend of leadership and hands-on work | Verified Insider | ✓ outcomes, leadership plus hands-on; ✗ press |
| Jeremy Stokes: distinctive style, clear role on each project, live work | Verified Insider | ✓ style, role grid, films |
| Marissa Louie: business impact, case studies, values, blog posts | Marissa Louie's list | ✓ all four |

Coverage: every trait except talks, community roles, press and a video intro.
All four depend on material David would need to supply.

## Inspected cohort: 10 curator-endorsed leadership portfolios

Each portfolio below was read from its own pages using searches restricted to
that site's domain (direct browsing is blocked here), except Ramy Adel, whose
evidence comes from the Leadership Folios annotation. Twelve content criteria
are drawn from the rubric. ✓ = evidence found, ✗ = evidence of absence,
· = no evidence found either way.

| Criterion | David | Louie | Califa | Adel | Teixeira | Goas | Bukengolts | Gaur | Watson | Gajara |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| C1 Clear title and level up front | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| C2 Availability or how to engage | ✓ | ✓ | · | · | ✓ | · | · | · | · | · |
| C3 Team scale in numbers | ✓ | ✓ | ✓ | ✓ | · | ✓ | · | ✓ | · | · |
| C4 Values or leadership philosophy | ✓ | ✓ | · | · | · | · | · | · | · | · |
| C5 Quantified outcomes | ✓ | ✓ | · | ✓ | · | ✓ | ✓ | · | · | · |
| C6 Leadership as its own case study | ✓ | ✓ | ✓ | ✓ | · | ✓ | · | · | · | · |
| C7 Several case studies with clear role | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | · | ✓ | ✗ |
| C8 Confidential work handled credibly | ✓ | · | · | ✓ | ✓ | · | ✓ | · | ✓ | · |
| C9 Testimonials or endorsements | ✓ | ✓ | ✓ | · | · | · | · | · | · | ✓ |
| C10 Writing | ✓ | ✓ | ✓ | · | ✓ | ✓ | · | ✓ | · | · |
| C11 Talks, awards, press or community | ✗ | · | ✓ | · | ✓ | · | ✓ | ✓ | ✓ | ✓ |
| C12 Hiring-manager aids (90-day plan, "what this shows") | ✓ | · | · | · | · | · | · | · | · | · |
| **Criteria evidenced** | **11** | **9** | **7** | **6** | **6** | **6** | **5** | **4** | **4** | **4** |

Evidence notes:

- **Louie:** "4Ps" values page; org doubled in two months and capacity grew 3x;
  Yahoo News Stream ad revenue $100m to $350m; homepage endorsements; blog;
  open to tech-company and startup clients.
- **Califa:** dedicated "Design Leadership" case study (team doubled,
  onboarding, retros, design principles); DigitalOcean case studies; blog;
  client testimonial; co-founded Design & Code.
- **Adel:** team sizes on the first screen; four case studies; research
  operations as the leadership study, with task-completion metrics; employer
  left unnamed.
- **Teixeira:** OnePlus, Samsung, Equinox and TikTok work; GenAI product under
  NDA; Adobe Max and SmashingConf talks; Clio and Cannes Lions awards; founder
  of UX Collective.
- **Goas:** Dialpad design team grown from 2 to 8; three major launches;
  review cycles nearly halved; blog.
- **Bukengolts:** six case studies framed as decision and result, no client
  names; design system across 800+ properties, production time down 40%;
  teaching.
- **Gaur:** UX executive leading 100+ people; 12 design patents; writing.
- **Watson:** featured case studies, several password-protected, with
  process and role credits; conference speaking; generative-art side
  practice.
- **Gajara:** About page with recognition and client testimonials; talks.

**Reading this fairly:** David's site shows evidence for the most criteria
(11 of 12; the next is 9). It is the only one with explicit hiring-manager
aids. It is behind several peers on public stature: talks, awards, patents
and press. The ranking is by *evidenced* coverage. A "·" may hide a feature
the search did not surface, so this places David's site at the top of the
inspected cohort on the evidence available, not on a complete audit. Visual
craft and performance could not be compared, because the peers' sites
cannot be measured from here.

## Verified, and not verified

**Verified with independent tools:** accessibility (axe-core), performance,
best practices and SEO (Lighthouse), prerendered output and hydration
(Playwright), and a clean build of the pushed branch. Vercel also reports a
successful preview deployment of commit `6893e50` ("Deployment has
completed"); production updates when the branch is merged to `main`.

**Not verified:** a "top 5" placement by any external authority, because
none exists. The inspected cohort above is the closest available comparison.
This environment's network policy also denied direct visits to every exemplar
site (`leadershipfolios.com`, `malouie.com`,
`joelcalifa.com`, `fabricio.work`, `julius.fm`), the Wayback Machine and
`*.vercel.app`. The keyless PageSpeed Insights quota was exhausted, so the
peers' visual craft and performance could not be measured. Their content was
read through domain-restricted search instead (see the cohort above).

**To complete the visual and performance side of the comparison**, allow
those domains in the cloud environment's network settings, or supply a
PageSpeed Insights API key. Each peer can then be screenshotted and run
through the same Lighthouse and axe checks as this site.

## Sources

- [Leadership Folios: design leadership portfolio examples, annotated](https://www.leadershipfolios.com/)
- [Verified Insider: Do design leaders need portfolios?](https://verifiedinsider.substack.com/p/do-design-leaders-need-portfolios)
- [Verified Insider: 9 design portfolios to inspire you](https://verifiedinsider.substack.com/p/9-design-portfolios-to-inspire-you)
- [Marissa Louie: list of 25+ design leadership portfolios](https://twitter.com/malouie/status/1633692272624803841) and [malouie.com](https://malouie.com/)
- [Joel Califa: Design Leadership case study](https://joelcalifa.com/work/digitalocean-design-leadership/)
- [Fabricio Teixeira](https://fabricio.work/)
- [Leadership Folios: Ramy Adel](https://www.leadershipfolios.com/p/ramy-adel)
- [Joel Califa: Design Leadership](https://joelcalifa.com/work/digitalocean-design-leadership/) and [Portfolio of Work](https://joelcalifa.com/work/)
- [Marissa Louie: Leadership Values](https://malouie.com/values) and [Executive Design Leadership](https://malouie.com/project/executive-design-leadership)
- [Fabricio Teixeira: About](https://fabricio.work/about/)
- [Ted Goas: Dialpad team work](https://www.tedgoas.com/work/dialpad-team/)
- [Pavel Bukengolts: Enterprise design system](https://pavel.ux.business/work/enterprise-design-system/)
- [Aastha Gaur: About](https://www.aasthagaur.com/about)
- [Chelsea Watson](https://www.chelseawatson.com/) and [Darshan Gajara: About](https://darshan.design/about.html)
- [UXPin: 16 best UX portfolio examples (2026)](https://www.uxpin.com/studio/blog/ux-portfolio-examples/)
- [UX Collective: Directors and heads of UX, do you need portfolios?](https://uxdesign.cc/directors-and-heads-of-ux-do-you-need-portfolios-to-get-hired-bafbab2436ff)
- [Diego Notes: A VP of Design portfolio](https://diegonmtz.substack.com/p/a-vp-of-design-portfolio-insights)
- [Adobe Design: How applicants can stand out](https://adobe.design/ideas/ask-adobe-design-how-can-applicants-stand-out-when-applying-to-design-jobs)
- [Design Week: IKEA and Deliveroo leaders on "old-fashioned" portfolios](https://www.designweek.co.uk/issues/26-july-1-august-2021/portfolios-deliveroo-ikea)
- [Lyssna: UX portfolio guide](https://www.lyssna.com/blog/ux-designer-portfolio/)
