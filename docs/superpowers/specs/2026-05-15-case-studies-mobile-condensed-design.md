# Case Studies: Mobile-First Condensed Design

**Date:** 2026-05-15  
**Project:** Portfolio case study optimization for mobile readability  
**Status:** Design Approved

---

## Problem Statement

The current case studies (Coutts, HSBC, Cognism, HSBC Kinetic) are 250-300 lines of detailed content each. For a busy audience trying to grasp scope, approach, and outcomes in 2-3 minutes on mobile, this is overwhelming.

**Current state:**
- Coutts: ~300 lines of data, ~13-15 min reading time
- HSBC: ~250 lines of data, ~12 min reading time
- Cognism: ~280 lines of data, ~14 min reading time
- HSBC Kinetic: ~180 lines of data, ~10 min reading time

**Goal:** Condense all four case studies by 40-50% while preserving the narrative arc: Challenge → Approach → Outcome. Keep all metrics and core decisions visible.

---

## Design: Dual Data Structure with Backups

### Content Strategy

**KEEP (Essential narrative):**
- Challenge/Business Context: 1-2 concise paragraphs (not 4-5)
- Key Decisions: Numbered list of critical choices made
- Metrics: All kept—these drive decision-making
- One exemplary section or case: Pick the strongest proof point, trim the rest
- Testimonials: 1-2 (not 3-4)
- Key Takeaways: 3-4 learnings (not 6-8)

**CONDENSE (Reduce verbosity, combine overlapping sections):**
- Research methodology: Reference findings, not process
- Team building narratives: Keep essentials, trim the story
- Process/workflow details: Combine similar sections
- Design system details: Summary, not specs
- Lessons learned: Merge with "What Worked Well" where overlap exists

**REMOVE (Redundant or nice-to-have):**
- Duplicate narratives (e.g., Challenge context + Strategy often repeat)
- Deep subsections that don't serve quick comprehension
- Verbose explanatory text throughout

**Target compression:** 40-50% reduction in content lines per case study.

### File Structure

```
apps/client/src/views/
├── CaseStudy.tsx (component, unchanged)
├── caseStudiesData (condensed versions)
│   ├── "ux-sidekick": {...}
│   ├── "coutts": {...} [condensed]
│   ├── "hsbc": {...} [condensed]
│   ├── "cognism": {...} [condensed]
│   └── "hsbc-kinetic": {...} [condensed]
│
└── _case-study-backups/ (archive folder, new)
    ├── coutts-full-backup.ts
    ├── hsbc-full-backup.ts
    ├── cognism-full-backup.ts
    └── hsbc-kinetic-full-backup.ts
```

**Backup folder characteristics:**
- Located in `src/views/` alongside CaseStudy.tsx
- Contains full, unmodified versions of each case study
- Version-controlled (committed to git)
- Marked with clear comments: "BACKUP: Full version archived on 2026-05-15"
- Can be referenced if future editions need historical context

### Condensed Data Format

**Structure remains identical** — only content is reduced:
- Same TypeScript interfaces (CaseStudyData, CaseStudySection, etc.)
- Same section types (items, content, subsections, testimonials)
- Same metrics array (unchanged)
- Reduced number of sections per case study:
  - Coutts: 12 sections → 8 sections
  - HSBC: 11 sections → 7 sections
  - Cognism: 11 sections → 7 sections
  - HSBC Kinetic: 7 sections → 5 sections

**Example condensing (Coutts Challenge section):**

Current (4 content blocks):
```
{
  subtitle: "Business Context",
  text: "Coutts serves Britain's wealthiest families... [200+ words]"
},
{
  subtitle: "Organisational Complexity",
  text: "As a 330-year-old institution... [180+ words]"
},
{
  subtitle: "The Threefold Problem",
  text: "Build team capability... [120+ words]"
}
```

Condensed (1-2 content blocks):
```
{
  subtitle: "The Challenge",
  text: "Coutts serves Britain's wealthiest families with legacy digital tools. Modernizing required zero tolerance for security incidents while navigating intense regulatory scrutiny. The mandate: scale the design team from 5 to 15, prove design could drive revenue, and rebuild the platform."
},
{
  subtitle: "Why It Mattered",
  text: "40% of prospects under 50 cited outdated digital tools as their reason for choosing competitors. The clock was ticking."
}
```

---

## Mobile Experience Goals

**Primary:** Grasp scope, approach, and outcome in 2 minutes or less  
**Secondary:** Deep-dive content (testimonials, lessons) still accessible if interested

**Reading time targets:**
- Coutts: ~13 min → ~7-8 min
- HSBC: ~12 min → ~6-7 min
- Cognism: ~14 min → ~8-9 min
- HSBC Kinetic: ~10 min → ~5-6 min

**Verification checklist:**
- [ ] Each case study reads coherently (no narrative gaps)
- [ ] Scroll time to "Impact" section under 2 minutes on mobile
- [ ] All metrics visible and highlighted
- [ ] Reading time estimate updates in UI
- [ ] Desktop experience feels less cluttered
- [ ] Testimonials still accessible (not removed entirely)

---

## Implementation Workflow

### Execution Order

1. **Create backup folder** — `src/views/_case-study-backups/`
2. **Archive full versions** — Copy current case study data to individual backup files
3. **Condense in main file** — Edit caseStudiesData in CaseStudy.tsx, one case study at a time
4. **Test on mobile** — Screenshot and verify readability for each case study
5. **Commit together** — Single commit: "Condense case studies for mobile readability; archive full versions"
6. **Verify UI** — Check reading time estimates update

### Git Strategy

- **Single commit** with both backups and condensed data
- **Clear commit message:** "Condense case studies for mobile readability; archive full versions for reference"
- **Backups version-controlled:** Reverting is always possible if needed
- **No `.gitignore` changes** — Backups are intentionally committed

---

## Success Criteria

✓ All four case studies condensed by 40-50%  
✓ Narrative arc (Challenge → Approach → Outcome) remains clear  
✓ All metrics retained and visible  
✓ Mobile scroll time to outcomes section under 2 minutes  
✓ Backup versions archived and committed  
✓ Component code unchanged (data-only edits)  
✓ Reading time estimates update automatically

---

## Notes & Constraints

- **UX Sidekick case study:** Not condensed (already concise, ~150 lines)
- **Component logic:** No changes required—same data structure throughout
- **Metrics:** All kept (never condensed—these are the proof points)
- **Mobile testing:** Visual verification needed, not just word count reduction

