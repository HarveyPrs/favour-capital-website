# Favour Capital — Design System

> Version 0.1 · Owner: Favour Capital · Reference aesthetic: [checkout.com](https://www.checkout.com/)
> Target stack: **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**, deployed on Vercel.

This is the single source of truth for the Favour Capital website redesign. Checkout.com is our reference for **execution quality** — depth, motion, whitespace, typography — **not** a palette to clone. Every token below is derived from the approved hero concept and the Favour Capital brand (navy + orange).

---

## 1. Design principles

The Checkout feel is a _stack_ of choices, not one trick. Hold all six or it reads as a knockoff.

1. **Motion is first-class.** Scroll reveals, count-ups, hover lifts, ambient drift. ~50% of the "premium" feeling. Always behind `prefers-reduced-motion`.
2. **Type does the heavy lifting.** Large, tight, confident display headings with room to breathe.
3. **Generous whitespace.** Sections breathe — 2–3× the spacing of the old site.
4. **Depth & layering.** Soft shadows, glassmorphism, cards floating over gradient-lit backgrounds, subtle grid/noise.
5. **Vibrant light over deep base.** Near-black indigo grounds the palette; orange + blue provide luminous accents.
6. **Data made beautiful.** Deal proof and stats are designed objects, not paragraphs.

**Restraint rule:** one primary CTA per view; accents earn their place. Default to the quieter option.

---

## 2. Color

### 2.1 Brand core

| Token                 | Hex       | Use                                                  |
| --------------------- | --------- | ---------------------------------------------------- |
| `brand-orange`        | `#F26522` | Primary accent, CTAs, highlights, glow               |
| `brand-orange-strong` | `#EC5518` | Pressed/darker orange, gradient end                  |
| `brand-blue`          | `#1D4ED8` | Secondary accent, logo blue, glow                    |
| `brand-navy`          | `#0B1E44` | Text on light, deep surfaces                         |
| `ink`                 | `#080D22` | Page background (dark mode base — near-black indigo) |

> Exact logo hexes are approximate (sampled from assets). Confirm against brand guidelines before launch.

### 2.2 Orange ramp (accent)

```
50  #FEF1EA   100 #FBD8C6   200 #F9B78C   300 #F79461
400 #F26522   500 #EC5518   600 #C6430F   700 #98330B   800 #6B2408   900 #3E1504
```

### 2.3 Blue ramp (secondary)

```
50  #EAF1FE   100 #C8DBFB   200 #9DBEF6   300 #6F9DEE
400 #3B82F6   500 #1D4ED8   600 #1740AE   700 #123186   800 #0C224F   900 #061530
```

### 2.4 Indigo / neutral-dark ramp (surfaces on dark)

```
ink        #080D22   (page)
surface-1  #0C1330   (raised panel)
surface-2  #121A3D   (card)
surface-3  #1A2450   (hover / elevated)
hairline   rgba(255,255,255,0.10)
hairline-2 rgba(255,255,255,0.18)
```

### 2.5 Text

| Token            | Dark bg   | Light bg  |
| ---------------- | --------- | --------- |
| `text-primary`   | `#FFFFFF` | `#0B1E44` |
| `text-secondary` | `#C2CADF` | `#465170` |
| `text-muted`     | `#9DA8C6` | `#7A849E` |
| `text-accent`    | `#FBB68C` | `#C6430F` |

### 2.6 Signature gradients

```css
--grad-headline: linear-gradient(100deg, #ff7a3d, #ffc49a 45%, #8fbbff);
--grad-cta: linear-gradient(180deg, #f97b3d, #ec5518);
--glow-orange: radial-gradient(circle, #f26522, transparent 66%);
--glow-blue: radial-gradient(circle, #1d4ed8, transparent 68%);
--glass: linear-gradient(
  160deg,
  rgba(255, 255, 255, 0.12),
  rgba(255, 255, 255, 0.04)
);
```

### 2.7 Light & dark mode

The site is **dark-first** for hero/immersive sections and **light** for content-dense sections (Services, Insights, article bodies). Rules:

- Dark sections: `ink` base, white logo lockup, glass cards, glow.
- Light sections: `#FFFFFF` / `#F7F8FB` surfaces, full-color logo, navy text, orange accents, soft shadows (no glow).
- Every component must be legible in the context it lands in. The nav logo swaps white ↔ full-color per section background.

---

## 3. Typography

| Family      | Role               | Weights            |
| ----------- | ------------------ | ------------------ |
| **Sora**    | Display / headings | 600, 700, 800      |
| **Manrope** | Body, UI, labels   | 400, 500, 600, 700 |

Load via `next/font/google`. Fallback: `system-ui, sans-serif`.

### Type scale (desktop → mobile)

| Token        | Font / weight | Size / line-height | Tracking |
| ------------ | ------------- | ------------------ | -------- |
| `display-xl` | Sora 800      | 60/1.05 → 40/1.1   | -1.5px   |
| `display-lg` | Sora 800      | 48/1.06 → 34/1.1   | -1px     |
| `h1`         | Sora 700      | 40/1.1 → 30/1.15   | -1px     |
| `h2`         | Sora 700      | 30/1.15 → 24/1.2   | -0.5px   |
| `h3`         | Sora 600      | 22/1.25 → 20/1.3   | -0.25px  |
| `body-lg`    | Manrope 400   | 18/1.6             | 0        |
| `body`       | Manrope 400   | 16/1.6             | 0        |
| `body-sm`    | Manrope 400   | 14/1.55            | 0        |
| `label`      | Manrope 600   | 13/1               | 0.2px    |
| `overline`   | Manrope 600   | 11/1 UPPERCASE     | 1.4px    |

- **Eyebrow/overline**: uppercase, `brand-orange` tint, 1.4px tracking — the section-labeling device carried from the old site, refined.
- **Gradient headline phrase**: apply `--grad-headline` with `background-clip: text` to one emphasis phrase per hero, never a whole heading.

---

## 4. Spacing, layout & radius

- **Base unit:** 4px. Scale: 4 8 12 16 20 24 32 40 48 64 80 96 128.
- **Container:** max-width `1200px`, side padding `24px` (mobile) → `48px` (desktop).
- **Section vertical padding:** `96px` desktop / `64px` mobile (hero taller).
- **Grid:** 12-col, 24px gutter. Card grids use `repeat(auto-fit, minmax(280px, 1fr))`.
- **Radius:** `sm 8px`, `md 12px` (cards), `lg 16px`, `pill 999px` (buttons, tags, eyebrows).
- **Hairlines:** 0.5–1px, low-opacity white on dark / `brand-navy`@10% on light.

---

## 5. Motion language

Named tokens — use everywhere for consistency. All motion respects `prefers-reduced-motion: reduce` (disable transforms, keep opacity).

| Token         | Value                       | Use                       |
| ------------- | --------------------------- | ------------------------- |
| `dur-fast`    | 180ms                       | Hover, tap                |
| `dur-base`    | 300ms                       | Enter/leave, color        |
| `dur-slow`    | 700ms                       | Scroll reveals            |
| `dur-count`   | 1400ms                      | Stat count-ups            |
| `dur-ambient` | 15000–26000ms               | Drift, Ken-Burns          |
| `ease-out`    | `cubic-bezier(.2,.7,.2,1)`  | Default — the house curve |
| `ease-inout`  | `cubic-bezier(.65,0,.35,1)` | Ambient loops             |

### Patterns (Framer Motion)

- **Reveal on scroll** — `opacity 0→1`, `y 16→0`, `dur-slow`, `ease-out`, `whileInView` once, `staggerChildren: 0.1`.
- **Count-up** — animate number 0→target over `dur-count`, cubic ease-out, on in-view. Always `Math.round`.
- **Hover-lift** (buttons/cards) — `y: -3px` + deepen shadow, `dur-fast`. `active`: `y: -1px`.
- **Ken-Burns** (hero photo) — `scale 1→1.08`, `dur-ambient`, `alternate`, infinite. Exposed as the `animate-ken-burns` utility (`--animate-ken-burns`, 26s).
- **Glow drift** — translate/scale blobs slowly, `mix-blend-mode: screen`, infinite. Exposed as `animate-drift-slow` / `animate-drift-slower` (`--animate-drift-*`, 15s / 18s). All three are `motion-safe:`-gated so they drop under reduced motion.
- **Pulse dot** — expanding box-shadow ring, 2s infinite (live/status indicator).
- **Bob** (hero glass tombstones) — `translateY 0→-8px→0`, `6s`, `ease-inout`, infinite. Exposed as the `animate-bob` utility (`--animate-bob` token); a stack of cards drifts out of phase via a per-card `animationDelay` (0 / .55 / 1.1s). `motion-safe:`-gated, so it's dropped under reduced motion.

---

## 6. Components

Specs reflect the approved hero. Build as reusable React components.

### Navigation (`<SiteHeader>`)

- Transparent over dark hero; on scroll → `ink`@85% with `backdrop-blur` + hairline bottom.
- Left: logo lockup (white on dark, full-color on light). Center/right: nav links (`label`, `text-secondary`, hover white). Right: **Get in touch** pill.
- Mobile: hamburger → full-screen `ink` overlay menu.
- Logo/tone swap: the fixed bar is dark-toned by default. A light-background section can claim the bar (navy wordmark + white glass fill) by carrying a `data-header-light` attribute on the element that sits under the header band — `<SiteHeader>` watches these and applies `.tone-light` while one straddles the header baseline. The lockup is a tight-cropped inline SVG (`<Logo>`); the mark keeps its brand colors, the wordmark inherits `currentColor`.

### Buttons

- **Primary (`btn-primary`)**: solid **white** bg, `brand-navy` text, `pill` radius, soft shadow. Hover: **lift −3px** + deeper shadow. Active: −1px. (Force styles against host resets.)
- **Secondary (`btn-secondary`)**: near-white (`#fff`@90%) + hairline border, same lift.
- **Ghost (nav CTA)**: `white`@11% fill, hairline border, white text.
- On light sections: primary becomes `brand-navy` (or orange) solid with white text.

### Eyebrow / overline

Pill, `brand-orange`@13% fill, `brand-orange`@40% border, orange text, optional pulse dot. Precedes section headings.

### Glass card (`<GlassCard>`)

`--glass` fill, hairline border, `backdrop-blur(8px)`, radius `md`, subtle bob on hero. Used for deal tombstones and floating UI.

### Deal tombstone (`<DealCard>`)

Glass card. Row: company name (Sora 700, white) + round tag (blue-tinted pill). Amount (Sora 700, `text-accent` orange). Sub-line: investors (`body-sm`, `text-muted`). Props: `company, round, amount, investors`. Drives the "representative clients / deals" proof.

### Stat block (`<StatBlock>`)

Number (Sora 800, 22–36px, white/navy) + overline label (`text-muted`). Count-up on in-view. Grid of 3–4. Mark placeholder values with `*` until real figures confirmed.

### Section shell (`<Section>`)

Handles vertical rhythm, container, optional dark/light variant, optional background layers (photo + scrim + grid + glow). Props: `tone: 'dark' | 'light'`, `bg?`.

### Background layers (`<BackgroundLayers>`)

Reusable layered backdrop for dark immersive sections. Stack z-order: photo (`opacity .62`, Ken-Burns) → glow blobs (`screen`) → grid (masked) → scrim (dual gradient for legibility) → diagonal accent → content. The diagonal is a **folded-corner motif** in the top-left: a subtle brand-tinted glass wedge (`screen`) for depth, a soft light bloom along the fold, and two orange+blue lines that **fade out at both tips** where they meet the edges — so the accent wraps the corner of the poster rather than reading as applied bars.

- Props: `layers?` (subset of `photo | glow | grid | scrim | diagonal`, default all — photo auto-skips with no image), `image?`, `imageAlt?`, `imagePosition?`, `priority?`, `intensity?` (`subtle | normal | bold` — scales photo + glow opacity only, never the scrim, so the AA guarantee is constant).
- Server component: pure CSS + `next/image`, `aria-hidden`, non-interactive. The composite geometry/masks live as the `fx-blob` / `fx-grid` / `fx-scrim` utilities in `globals.css` (all color from tokens); ambient loops use the `animate-ken-burns` / `animate-drift-*` tokens, `motion-safe:`-gated (§8).
- Drop it into the `<Section bg={…}>` slot: the section becomes a clipped stacking context and its content is lifted to `relative z-10` above the layers.

### Footer

`brand-navy`/`ink` bg, full nav sitemap, socials, legal. Light-on-dark.

---

## 7. Imagery & assets

- **Logos** (from brand repo): `FC Logo (white text, no bg).png` for dark, `FC Logo. (no bg).png` (mark) for favicon/light. **Export tight-cropped SVGs** for production (don't crop padded squares in CSS as we did in preview).
- **Hero photo:** Singapore Marina Bay (`Singapore.png`). **Optimize before use** — serve WebP/AVIF, ≤200KB, via `next/image`. Raw PNG (1.3MB) is too heavy.
- **Deal tombstones:** keep the existing FC-branded tombstone graphics from the Insights page where useful.
- Never rely on color alone for meaning; pair with label/shape.

---

## 8. Accessibility

- Contrast: text ≥ 4.5:1 (AA). Scrims exist to guarantee this over photos — verify per section.
- All interactive elements keyboard-focusable with visible focus ring.
- `prefers-reduced-motion` honored globally.
- Semantic landmarks, alt text, `aria-label` on icon-only controls.
- Logo lockup carries `aria-label="Favour Capital"`.

---

## 9. Reference implementation

The approved hero concept (v5) is the canonical implementation of these tokens: dark indigo base, Singapore skyline scrimmed into legibility, glow blobs, gradient headline phrase, white lift-on-hover CTAs, glass deal tombstones (dtcpay / Buymed / Inteluck), animated stat strip, real logo in nav + favicon. Rebuild it in the target stack as the first component milestone.
