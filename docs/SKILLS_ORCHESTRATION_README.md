# Skills Orchestration Component

## Overview
An animated rotating capabilities showcase that cycles through three design leadership pillars, positioned immediately after the Hero section on the homepage.

## Component Features

### Content Structure
- **Static Headline**: "Everyone generates. Few orchestrate." (always visible)
- **Three Rotating Pillars**: Auto-cycles every 5 seconds
  1. **AI-Native Orchestration**: Insight-to-shipped workflows
  2. **Technical Fluency + Exceptional Craft**: Full-stack design leadership
  3. **Strategic Execution Velocity**: Clarity in ambiguity

### Animation & Interaction
- **Auto-rotation**: 5-second dwell time per pillar
- **Smooth transitions**: Fade in/out with subtle vertical movement
- **Pause on hover**: Animation pauses when user hovers over content
- **Keyboard navigation**: Arrow keys (Left/Right or Up/Down) to cycle through pillars
- **Progress indicator**: Three dots showing current pillar (clickable)

### Accessibility
✅ **WCAG 2.1 AA Compliant**
- Respects `prefers-reduced-motion` (near-instant transitions)
- Keyboard navigable with arrow keys
- Focus management with visible focus rings
- ARIA live region for screen reader announcements
- Semantic HTML with proper roles and labels
- Screen reader instructions (sr-only)

### Design Specifications
- **Typography**:
  - Static headline: Playfair Display, 3rem/3.75rem (mobile/desktop), bold
  - Rotating subheadline: Inter Bold, 1.5rem/1.875rem
  - Body text: Inter Regular, 1rem/1.125rem, line-height 1.6
  - Max-width: 60ch for optimal readability

- **Colors**: Uses your design token system
  - Primary: Electric Lime (#DFFF00) for highlights and dots
  - Foreground: Black/White (theme-aware)
  - Muted foreground: Secondary text color
  - Border: Subtle dividers

- **Spacing**:
  - Section padding: 4rem/5rem/6rem (mobile/tablet/desktop)
  - Content max-width: 60rem (container)
  - Vertical rhythm: 3rem between elements

- **Progress Dots**:
  - Inactive: 0.5rem circle, border color
  - Active: 3rem × 0.5rem pill, primary color
  - 0.75rem gap between dots

### Layout & Positioning
- **Location**: Immediately after Hero section, before About section
- **Container**: `max-w-5xl` centered container with responsive padding
- **Min-height**: 280px (mobile) / 240px (desktop) to prevent layout shift during transitions
- **Text alignment**: Center-aligned for all content

## Usage

### Basic Implementation
```tsx
import SkillsOrchestration from "@/components/SkillsOrchestration";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsOrchestration />
      <About />
    </>
  );
}
```

### Customization

#### Adjust Rotation Speed
Change the interval in `useEffect`:
```tsx
const interval = setInterval(() => {
  setCurrentIndex((prev) => (prev + 1) % pillars.length);
}, 7000); // 7 seconds instead of 5
```

#### Modify Content
Edit the `pillars` array:
```tsx
const pillars: Pillar[] = [
  {
    id: 1,
    subheadline: "Your custom subheadline",
    body: "Your custom body text explaining the capability.",
  },
  // Add more pillars...
];

const pillarTitles = [
  "Your Custom Title",
  // Add more titles...
];
```

#### Change Colors
Uses CSS custom properties from your design tokens:
- `--primary`: Main accent color (Electric Lime)
- `--foreground`: Main text color
- `--muted-foreground`: Secondary text
- `--border`: Dividers and inactive dots

Override in component:
```tsx
<div className="bg-accent text-accent-foreground">
  {/* Custom color section */}
</div>
```

#### Adjust Mobile Breakpoints
Modify responsive classes:
```tsx
// Current: text-5xl md:text-6xl
// Custom: text-4xl md:text-5xl lg:text-6xl xl:text-7xl
<h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
  Everyone generates. Few orchestrate.
</h2>
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires Framer Motion (already in project)
- CSS custom properties support
- ES2020+ features

## Performance Considerations
- **Animations**: GPU-accelerated (opacity, transform)
- **Re-renders**: Optimized with `AnimatePresence` and `mode="wait"`
- **Memory**: Cleans up interval on unmount
- **Accessibility**: Zero motion for reduced motion users

## Dependencies
- `react` (19.2.1+)
- `framer-motion` (12.23.22+)
- `@/hooks/useReducedMotion` (custom hook)

## File Location
```
/client/src/components/SkillsOrchestration.tsx
```

## Integration in Home Page
```tsx
// /client/src/pages/Home.tsx
import SkillsOrchestration from "@/components/SkillsOrchestration";

export default function Home() {
  return (
    <main>
      <Hero />
      <SkillsOrchestration />  {/* ← Added here */}
      <About />
      {/* ... rest of sections */}
    </main>
  );
}
```

## Testing Checklist
- [ ] Auto-rotation works (5 seconds per pillar)
- [ ] Hover pauses animation
- [ ] Arrow keys navigate pillars
- [ ] Progress dots are clickable
- [ ] Progress dots update on pillar change
- [ ] Reduced motion disables animations
- [ ] Screen reader announces changes
- [ ] Focus rings are visible on keyboard navigation
- [ ] Mobile responsive (text scales appropriately)
- [ ] No layout shift during transitions

## Common Issues & Solutions

### Animation not working
- Check that Framer Motion is installed: `pnpm install framer-motion`
- Verify `useReducedMotion` hook exists in `/client/src/hooks/`

### Layout shift on transition
- Ensure parent container has `min-h-[280px] md:min-h-[240px]`
- Check that content is center-aligned

### Progress dots not updating
- Verify `currentIndex` state is updating
- Check that `pillars.length` matches `pillarTitles.length`

### Keyboard navigation not working
- Ensure parent div has `tabIndex={0}`
- Check `onKeyDown` handler is attached

## Future Enhancements
- [ ] Add swipe gestures for mobile
- [ ] Implement touch-based navigation
- [ ] Add animation direction control (forward/backward)
- [ ] Save current pillar to localStorage
- [ ] Add transition sound effects (opt-in)
- [ ] Implement lazy loading for images (if added)

## Maintenance
- Update pillar content in `pillars` array
- Adjust animation timing via `interval` duration
- Customize colors via design tokens
- Modify typography via Tailwind classes

---

**Version**: 1.0.0
**Last Updated**: 2026-01-13
**Author**: Claude (Anthropic)
**License**: Part of David Phillip Portfolio
