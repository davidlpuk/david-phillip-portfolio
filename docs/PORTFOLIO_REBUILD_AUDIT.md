# David Phillip Portfolio Rebuild Audit

## Current Diagnosis

The current site has strong raw material: credible fintech and SaaS experience, recognisable clients, leadership metrics, AI experimentation and evidence of senior-level delivery. The main issue is not lack of content. It is editing, hierarchy and product focus.

The current implementation also mixes too many concerns: public portfolio pages, admin tools, AI chatbot work, article tooling, CV builders, chrome-extension code and experiments. That makes the site harder to maintain and increases the chance that heavy or irrelevant code leaks into the public experience.

## Main UX Problems

- The homepage asks visitors to read too much before they understand the proposition.
- Several sections repeat similar claims: AI-native, regulated industry, team scaling, design leadership and shipping.
- Case studies are written closer to internal reports than online portfolio stories.
- Some metrics are strong but need clearer evidence framing so the site feels factual, not inflated.
- Password protection is currently client-side and uses plain-text passwords in source code. That is not suitable for genuinely confidential work.
- The visual system has moments of polish but too many decorative elements compete with the message.
- Mobile needs tighter prioritisation: headline, proof, work cards and contact should win over long secondary sections.

## Recommended Portfolio Strategy

Lead with one sentence: David helps regulated and complex product teams make digital services clearer, faster and easier to trust.

Use a layered content model:

- Public homepage: positioning, proof, selected work cards, services, contact.
- Public case-study preview: problem, David's role, proof points and confidentiality note.
- Protected case study: context, constraints, key decisions, outcomes, lessons.
- Optional private walkthrough: link to email or calendar for sensitive details that should not be written online.

## Content Rules

- Replace paragraphs with short blocks: 1 idea per paragraph, 2-4 lines maximum.
- Every case study should answer: what changed, what David owned, what evidence supports it, why it mattered.
- Avoid generic terms unless paired with proof. Example: do not say "strategic leader" without showing the executive decision or business metric.
- Keep metrics labelled as sourced from existing material unless externally verified.
- Use less "I built everything" language for large organisations. Senior portfolios are more credible when they separate direct ownership, team leadership and influenced outcomes.

## Recommended Case Study Format

1. Hero: company, role, timeframe, one-line outcome.
2. Proof strip: 3-4 metrics.
3. Situation: why this mattered commercially or operationally.
4. Constraints: regulation, legacy systems, stakeholders, data access.
5. David's role: decisions made, rituals created, people led.
6. Before / after: product, process or organisational change.
7. Outcome: measurable results and what changed.
8. Reflection: what David would do differently.

## Design System Direction

- Mobile-first cards and sections with generous spacing.
- One expressive type scale, not multiple competing visual styles.
- Neutral editorial palette with one confident accent; avoid novelty gradients unless they clarify hierarchy.
- Use proof components, not decorative icons, to create trust.
- Use progressive disclosure for case studies instead of long pages.
- Keep motion subtle: page load, card hover and section reveal only.

## Technical Recommendations

- Keep the rebuild isolated from experiments until it is ready to replace the current homepage.
- Move confidential case-study content out of the client bundle before launch.
- Use server-side auth or deployment-level protection for private case studies.
- Split public data from private case-study content.
- Compress and resize images, especially hero and case-study assets.
- Remove unused dependencies from the public build when the rebuild becomes production.
- Add a simple content schema so case studies are consistent and easy to edit.

## Pre-Launch Checklist

- Replace client-side case-study gating with server-side authentication if the content is genuinely confidential.
- Verify each metric against source evidence or soften the wording before public launch.
- Compress large hero and case-study images and check mobile LCP.
- Remove experimental/admin routes from the public production bundle or deploy them separately.
- Add page-level metadata for title, description and social sharing imagery.
- Run accessibility checks on mobile and desktop, including keyboard navigation and colour contrast.
- Decide whether `/portfolio-v2` replaces `/` or remains a private preview route.

## AI and Future-Facing Positioning

AI should be positioned as a leadership advantage, not a gimmick. The strongest angle is: David understands how AI changes the design workflow while still applying senior judgment around trust, governance, accessibility and product clarity.

Recommended phrasing: "AI-native design leadership for regulated products." Avoid claiming AI expertise without showing practical examples such as UX Sidekick, research synthesis, critique workflows or prototype acceleration.

## Rebuild Area Added

A new lightweight prototype has been added at `/portfolio-v2`.

- Homepage: `/portfolio-v2`
- Case study route: `/portfolio-v2/case-study/:slug`
- Source data: `apps/client/src/rebuild/portfolioData.ts`
- Password helper: `apps/client/src/rebuild/password.ts`

This is intentionally separate from the current homepage so the new direction can be edited without destabilising the existing site.
