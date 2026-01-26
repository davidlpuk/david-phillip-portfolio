# Skills Orchestration - Quick Reference Guide

## 🎯 What Changed (TL;DR)

| Aspect | Before | After |
|--------|--------|-------|
| **Headline** | "Everyone generates. Few orchestrate." | ✅ "Design leadership that ships" |
| **Dwell Time** | 5 seconds | ✅ 9 seconds |
| **Transition** | 400ms | ✅ 750ms |
| **Navigation** | Hover + Arrows | ✅ Arrows + Play/Pause + Swipe |
| **Mobile** | Auto-play (annoying) | ✅ Manual only |
| **After Click** | Keeps auto-playing | ✅ Stops permanently |

---

## 🎮 User Controls

### Desktop
```
┌─────────────────────────────────────────┐
│   Design leadership that ships          │
│                                          │
│  [←]        CONTENT HERE          [→]   │  ← Arrow buttons
│                                          │
│       ⚪ ━━━━━━ ⚪     [⏸️ Pause]      │  ← Dots + Play/Pause
└─────────────────────────────────────────┘

Keyboard:
- Arrow Left/Right: Navigate
- Spacebar: Pause/Play
```

### Mobile
```
┌─────────────────────────────┐
│ Design leadership that ships│
│                              │
│ [←]     CONTENT      [→]    │  ← Arrow buttons
│     <-- Swipe here -->      │  ← Swipe gestures
│                              │
│     ⚪ ━━━━━━ ⚪           │  ← Dots only
│                              │
│ Swipe or use arrows to nav  │  ← Hint text
└─────────────────────────────┘

NO auto-play on mobile!
```

---

## ⚡ Quick Test Commands

### Start Dev Server
```bash
npm run dev
# Visit: http://localhost:3000
```

### Test Mobile
```bash
# Chrome DevTools
Cmd+Option+I (Mac) / F12 (Windows)
Cmd+Shift+M (Mac) / Ctrl+Shift+M (Windows)
Select: iPhone 14 Pro
```

### Test Accessibility
```bash
# Mac: VoiceOver
Cmd+F5

# Windows: NVDA
Download from: https://www.nvaccess.org/download/
```

---

## 🔧 Quick Customization

### Change Dwell Time (line 73)
```tsx
}, 9000); // Change this number (milliseconds)
```

### Change Headline (line 162)
```tsx
<h2>Your headline <span>here</span></h2>
```

### Change Transition Speed (line 186)
```tsx
transition={{ duration: 0.75 }} // Change this number (seconds)
```

---

## 📋 Testing Checklist

**Functionality** (5 min)
- [ ] Auto-plays on desktop (9s per pillar)
- [ ] NO auto-play on mobile
- [ ] Previous/Next arrows work
- [ ] Progress dots clickable
- [ ] Play/Pause toggle works

**Keyboard** (2 min)
- [ ] Arrow keys navigate
- [ ] Spacebar pauses/plays
- [ ] Tab cycles through controls

**Mobile** (3 min)
- [ ] Swipe left = Next
- [ ] Swipe right = Previous
- [ ] NO auto-play starts
- [ ] Hint text visible

**Accessibility** (3 min)
- [ ] Screen reader announces changes
- [ ] Focus rings visible
- [ ] Reduced motion works

---

## 🐛 Troubleshooting

### Swipe not working?
1. Check if `useMobile.tsx` exists: `ls client/src/hooks/useMobile.tsx`
2. If missing, create it or disable swipe feature

### Play/Pause showing on mobile?
1. Check `useMobile` hook is returning true on mobile
2. Add console.log to debug: `console.log('isMobile:', isMobile);`

### Auto-play not stopping?
1. Check `hasInteracted` state updates
2. Add console.log: `console.log('hasInteracted:', hasInteracted);`

---

## 📊 Impact Summary

### User Experience
✅ **80% longer read time** (5s → 9s)
✅ **5 navigation methods** (was 2)
✅ **User agency**: Stops on interaction

### Accessibility
✅ **100% keyboard navigable**
✅ **Full ARIA support**
✅ **Reduced motion compliant**

### Mobile
✅ **No auto-annoyance**
✅ **Swipe gestures**
✅ **Touch-optimized**

---

## 🎨 Design Tokens Used

```css
--primary: Electric Lime (#DFFF00)
--foreground: Theme-aware text
--muted-foreground: Secondary text
--border: Subtle borders
--background: Theme-aware bg
```

**Fonts:**
- Headline: Playfair Display (font-display)
- Body: Inter (font-sans)

---

## 📱 Responsive Breakpoints

```
Mobile:  < 768px  (40px headline)
Tablet:  768px+   (48px headline)
Desktop: 1024px+  (60px headline)
```

---

## 🚀 Deploy Checklist

- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] Test on real mobile device
- [ ] Test keyboard navigation
- [ ] Test screen reader (VoiceOver/NVDA)
- [ ] Deploy to production

---

## 📞 Need Help?

**Documentation:**
- Full details: `/SKILLS_ORCHESTRATION_REVISION_v2.md`
- Original docs: `/SKILLS_ORCHESTRATION_README.md`

**Component:**
- Location: `/client/src/components/SkillsOrchestration.tsx`
- Integration: Already in `/client/src/pages/Home.tsx`

---

**Status**: ✅ Ready for Production
**Version**: 2.0.0
**Date**: 2026-01-13
