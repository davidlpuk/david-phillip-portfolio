# Case Studies Mobile Condensing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Condense four case studies (Coutts, HSBC, Cognism, HSBC Kinetic) by 40-50% for mobile readability, archive full versions, and verify mobile experience.

**Architecture:** Extract full case study data to backup files, condense in-place in CaseStudy.tsx by removing redundancy and deep-dive sections, test mobile readability, single commit.

**Tech Stack:** TypeScript, React, CaseStudy.tsx component with embedded caseStudiesData object

---

## File Structure

**Create:**
- `apps/client/src/views/_case-study-backups/coutts-full-backup.ts` — Full Coutts case study (archive)
- `apps/client/src/views/_case-study-backups/hsbc-full-backup.ts` — Full HSBC case study (archive)
- `apps/client/src/views/_case-study-backups/cognism-full-backup.ts` — Full Cognism case study (archive)
- `apps/client/src/views/_case-study-backups/hsbc-kinetic-full-backup.ts` — Full HSBC Kinetic case study (archive)

**Modify:**
- `apps/client/src/views/CaseStudy.tsx:473-1378` — Condense caseStudiesData object, keeping all case study structures but reducing content

---

## Task 1: Create backup folder and archive Coutts

Create the backup folder and extract the full Coutts case study to a backup file. The Coutts case study spans lines 473-771 in CaseStudy.tsx and contains 12 sections including challenge, strategy, building-team, key-actions, research, hands-on, design-system, impact, what-worked, lessons, testimonials, and takeaways.

**Context:** The current CaseStudy.tsx file is in `apps/client/src/views/CaseStudy.tsx`. The full Coutts data object needs to be extracted as-is (all 12 sections unchanged) and saved to a backup file for future reference.

---

## Task 2: Archive HSBC case study

Extract the full HSBC case study (lines 772-985 in CaseStudy.tsx) to a backup file. Contains 11 sections: challenge, role, key-decisions, research, design-system, ai-integration, impact, reflection, and takeaways. Save to `apps/client/src/views/_case-study-backups/hsbc-full-backup.ts`.

---

## Task 3: Archive Cognism case study

Extract the full Cognism case study (lines 987-1213 in CaseStudy.tsx) to a backup file. Contains 11 sections: challenge, role, hiring, key-decisions, search-redesign, ai-integration, impact, reflection, and takeaways. Save to `apps/client/src/views/_case-study-backups/cognism-full-backup.ts`.

---

## Task 4: Archive HSBC Kinetic case study

Extract the full HSBC Kinetic case study (lines 1214-1377 in CaseStudy.tsx) to a backup file. Contains 7 sections: challenge, strategy, deliverables, work-built, impact, and reflections. Save to `apps/client/src/views/_case-study-backups/hsbc-kinetic-full-backup.ts`.

---

## Task 5: Condense Coutts case study in CaseStudy.tsx

Reduce Coutts from 12 sections to 7 sections (~50% reduction). Target reading time: 13 min → 7-8 min.

**Keep sections:** challenge, strategy, key-actions, research, impact, takeaways
**Remove sections:** building-team (condense into strategy), hands-on, design-system (brief summary in impact), what-worked (merge into takeaways), lessons (merge into takeaways), testimonials (remove)

**Condensing rules:**
- Challenge: Keep 2 content blocks (was 3), shorten each
- Strategy: Convert to numbered items (was content blocks)
- Key-actions: Keep 4 strongest items (was 5)
- Research: Keep findings only, remove methodology
- Impact: Combine subsections, remove testimonials
- Takeaways: 5 key items (was 6-8)

All metrics retained. Narrative arc preserved: Challenge → Approach → Outcome.

---

## Task 6: Condense HSBC case study in CaseStudy.tsx

Reduce HSBC from 11 sections to 7 sections (~45% reduction). Target reading time: 12 min → 6-7 min.

**Keep sections:** challenge, key-decisions, research, design-system, impact, takeaways
**Remove sections:** role, ai-integration (concepts move to research), reflection (condense into lessons)

**Condensing rules:**
- Challenge: 2 content blocks (was 4)
- Key-decisions: Keep 3 strongest decisions (was 4)
- Research: Findings only, no detailed methodology
- Design-system: One paragraph (was longer)
- Impact: Remove detailed operational impact breakdown
- Takeaways: 4 items (was 7)

All metrics retained.

---

## Task 7: Condense Cognism case study in CaseStudy.tsx

Reduce Cognism from 11 sections to 7 sections (~40% reduction). Target reading time: 14 min → 8-9 min.

**Keep sections:** challenge, strategy (hiring/building), impact, takeaways
**Remove sections:** role, key-decisions (move into strategy), search-redesign (move into impact), ai-integration, reflection (condense into takeaways)

**Condensing rules:**
- Challenge: 2 content blocks (was 3)
- Strategy: 3 numbered items covering hiring, design system, proof point
- Impact: Include search redesign proof point
- Takeaways: 4 items (was 7)

All metrics retained.

---

## Task 8: Condense HSBC Kinetic case study in CaseStudy.tsx

Reduce HSBC Kinetic from 7 sections to 5 sections (~35% reduction). Target reading time: 10 min → 5-6 min.

**Keep sections:** challenge, strategy, impact, takeaways
**Remove sections:** deliverables, work-built, reflections (condense into takeaways)

**Condensing rules:**
- Challenge: 2 content blocks (was 2, keep as-is)
- Strategy: 3 numbered items (was longer narrative)
- Impact: Combine all impact subsections into 3 paragraphs
- Takeaways: 3 items (was 2)

All metrics retained.

---

## Task 9: Test mobile readability and verify reading times

Visit each condensed case study on mobile (Chrome DevTools mobile emulation or actual device):
- http://localhost:3000/case-study/coutts
- http://localhost:3000/case-study/hsbc
- http://localhost:3000/case-study/cognism
- http://localhost:3000/case-study/hsbc-kinetic

**Verification checklist per case study:**
- [ ] Reading time estimate matches target (Coutts 7-8, HSBC 6-7, Cognism 8-9, HSBC Kinetic 5-6 min)
- [ ] Scroll to outcomes section under 2 minutes
- [ ] Narrative feels complete (Challenge → Approach → Outcome)
- [ ] No broken images or console errors
- [ ] Metrics are visible and prominent
- [ ] All links work

Verify no TypeScript compilation errors: `pnpm check`

---

## Task 10: Final commit with all backups and condensed data

Create single comprehensive commit with:
- All 4 backup files in `_case-study-backups/`
- Modified `CaseStudy.tsx` with condensed case studies

Commit message:
```
refactor: condense case studies for mobile readability; archive full versions

- Reduced Coutts from 12→7 sections (~50% content reduction)
- Reduced HSBC from 11→7 sections (~45% reduction)
- Reduced Cognism from 11→7 sections (~40% reduction)
- Reduced HSBC Kinetic from 7→5 sections (~35% reduction)

Archive full versions in _case-study-backups/ for reference:
- coutts-full-backup.ts
- hsbc-full-backup.ts
- cognism-full-backup.ts
- hsbc-kinetic-full-backup.ts

Target achieved: Mobile scroll to outcomes <2 min, reading times reduced 40-50%
All metrics retained. Narrative arc (Challenge→Approach→Outcome) preserved.
```

Verify: `pnpm build` succeeds with no errors.

---

## Summary

✅ All four case studies condensed by 35-50%  
✅ Full versions archived in `_case-study-backups/`  
✅ Narrative arc preserved (Challenge → Approach → Outcome)  
✅ All metrics retained and visible  
✅ Mobile readability verified (<2 min to outcomes)  
✅ Reading time estimates updated  
✅ Single comprehensive commit with all changes
