# Landing Page — Interaction Spec

## Overview

The landing page is built around a **fan card deck** at the bottom of the viewport. Each card maps to a content section. The hero (name + title) occupies the center. Scrolling reveals each card's content section sequentially.

---

## Card Deck

Six cards fan out from the bottom center of the viewport. Their horizontal position and tilt are fixed — this is the **sacrosanct deck position**.

| Card | Label | Index |
|------|-------|-------|
| 01 | Case Studies | 0 |
| 02 | Experiments  | 1 |
| 03 | Thoughts     | 2 |
| 04 | Handcrafted  | 3 |
| 05 | Caffeinated  | 4 |
| 06 | Resume       | 5 |

### Deck rules

- Cards are stacked with consistent z-order: higher index = higher z (front of deck).
- **The deck position does not change.** No card ever breaks its horizontal/tilt position or jumps forward in z-order due to elevation or hover — it only moves vertically within its own lane.
- Overlapping cards have a top-right corner blur to suggest depth. This blur fades on hover.

---

## Three Card States

### 1. Default (submerged)
**1/4 of the card is visible** above the bottom edge.

- Card is at `y: 0` (CSS-anchored, `bottom: -(cardHeight - visible)`)
- `visible ≈ cardHeight / 3 + 28 px` — shows the number, label, and top of the illustration
- Corner blur overlay is present on all non-front cards

### 2. Hover (partially elevated)
**2/4 of the card is elevated** on cursor hover.

- Card lifts `y: -(cardHeight × 0.18)` — approximately half the card becomes visible
- Transition: `tween 0.28 s, ease [0.4, 0, 0.2, 1]` — starts immediately, no delay
- Return: `tween 0.32 s, ease [0.4, 0, 0.2, 1]` — smooth drop, no spring
- Corner blur fades to `opacity: 0` on hover
- Z-order is **unchanged** — hovering a back card does not bring it in front of cards above it

### 3. Scrolled (section-mapped elevation)
**3/4 of the card is elevated** when its mapped rectangular content block is the active scroll step.

- Card lifts `y: -(cardHeight × 0.22)` — most of the card is exposed
- Transition: `tween 0.52 s, ease [0.22, 1, 0.36, 1]` — synchronized with the content block rising
- Z-index bumps to `20` so the card floats above the other deck cards while still respecting deck order relative to the block
- Corner blur fades to `opacity: 0`
- Return to default when the next card's section becomes active (previous card drops back to `y: 0`)
- Hover interaction is **disabled** while a card is in scrolled state

---

## Scroll Sections

Each downward scroll step reveals one card's content block and elevates that card.

```
Scroll step 0  →  Hero visible, all cards in default state
Scroll step 1  →  Case Studies block rises + Case Studies card elevated
Scroll step 2  →  Experiments block rises + Experiments card elevated
                  (Case Studies card returns to default)
```

Scrolling up reverses the sequence.

### Content block anatomy

```
  01
  Case Studies          ← number + label float above the rectangle's top edge
 ┌──────────────────┐
 │  [GIF] │ [GIF]   │  ← glass rectangle (~456 px tall on 900 px viewport)
 │─────────────────│
 │  [GIF   wide   ] │  ← bento grid, 2 rows, varies by card
 └──────────────────┘

        fan deck        ← always visible below, ≥ 220 px clearance
```

- Rectangle height: `calc(100vh - 444px)`, clamped `360 – 520 px`
- Block enters: `y: 180 → 0, scale: 0.88 → 1, duration: 0.52 s, ease [0.22, 1, 0.36, 1]`
- Block exits: `y: 0 → -50, scale: 1 → 0.97, duration: 0.24 s, ease-in`
- Hero and glass-piece animation fade out while a block is shown

### Bento layouts

**Case Studies** — 4 cells, 3-column grid
```
grid-template-areas: "a a b" "c d d"
```

**Experiments** — 3 cells, 2-column grid
```
grid-template-areas: "a b" "c c"
```

---

## Animation Summary

| Trigger | Property | Value | Duration | Easing |
|---------|----------|-------|----------|--------|
| Hover enter | y | −18 % cardH | 0.28 s | `[0.4, 0, 0.2, 1]` |
| Hover leave | y | 0 | 0.32 s | `[0.4, 0, 0.2, 1]` |
| Scroll activate | y | −22 % cardH | 0.52 s | `[0.22, 1, 0.36, 1]` |
| Scroll deactivate | y | 0 | 0.32 s | `[0.4, 0, 0.2, 1]` |
| Block enter | y, scale | 180→0, 0.88→1 | 0.52 s | `[0.22, 1, 0.36, 1]` |
| Block exit | y, scale | 0→-50, 1→0.97 | 0.24 s | ease-in |
| Hero fade | opacity | 1→0 | 0.30 s | ease-out |

---

## Design Tokens (Light theme)

| Token | Value |
|-------|-------|
| Background | `#f7f3ec` |
| Text | `#192040` |
| Text secondary | `rgba(25, 32, 64, 0.42)` |
| Card background | `rgba(255, 255, 255, 0.22)` |
| Card border | `rgba(255, 255, 255, 0.50)` |
| Card backdrop-filter | `blur(18px) saturate(160%)` |
| Card border-radius | `20px 20px 0 0` (fan), `28px` (block) |
