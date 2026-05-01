# 10XAI Brand Guidelines (v1)

> **Authored:** 2026-04-30 · **Status:** Locked for Phase 3 build · See [02-ui-ux-redesign-brief.md](../strategy/02-ui-ux-redesign-brief.md) for the full design system.

---

## 1. Logo system

Five SVG variants live in this folder. All vectors, infinitely scalable, no font embedded (uses DM Sans → Inter → system-ui fallback chain). For final production, convert text to outlined paths.

| File | Use |
|---|---|
| `logo-wordmark-light.svg` | Primary wordmark on cream/white surfaces — most uses |
| `logo-wordmark-dark.svg` | Wordmark inverted on ink/dark surfaces |
| `logo-monogram.svg` | Square mark for app icons, social avatars, stickers |
| `favicon.svg` | 32×32 simplified mark for browser tabs |
| `logo-lockup-horizontal.svg` | Monogram + wordmark combined, for site headers |

### Construction
The wordmark is **"10X | AI"** — the gold vertical bar is the signature element. The bar:
- Separates "10X" (the promise: 10× the output) from "AI" (the medium)
- Is the only spot of brand color in the wordmark
- Reads at every scale, including 16px favicon

The monogram inverts: black surface, gold "10X", small "AI" caption — readable as a sticker, an app icon, or an embossed business card.

### Clear space
Always leave clear space ≥ the height of the lowercase "x" of the wordmark on all four sides. No content, no edges, no other logos within that buffer.

### Minimum sizes
- Wordmark: **80px wide** minimum on screen
- Monogram: **24px square** minimum
- Favicon: ships at 32×32; auto-downsamples to 16×16 in browsers

### Don'ts
- ❌ Don't recolor the wordmark (gold bar must stay `#CA8A04`)
- ❌ Don't apply effects (shadows, glows, strokes, 3D)
- ❌ Don't stretch or skew
- ❌ Don't place on busy photographs without a contrast scrim
- ❌ Don't pair with another logo at equal weight (10XAI is always primary on its own surfaces)
- ❌ Don't translate "10XAI" to other languages — the brand is identical across EN/PT-BR/ES

---

## 2. Color tokens

### Primary palette (the only brand colors)

| Token | Hex | RGB | Use |
|---|---|---|---|
| `ink.DEFAULT` | `#0C0A09` | 12, 10, 9 | All body text |
| `ink.900` | `#1C1917` | 28, 25, 23 | Dark surfaces, primary brand background |
| `ink.700` | `#44403C` | 68, 64, 60 | Secondary text, muted body |
| `ink.500` | `#78716C` | 120, 113, 108 | Muted text, captions, placeholders |
| `ink.300` | `#D6D3D1` | 214, 211, 209 | Hairline borders, dividers |
| `gold.DEFAULT` | `#CA8A04` | 202, 138, 4 | Primary CTA, brand accent, links |
| `gold.600` | `#A16207` | 161, 98, 7 | CTA hover, pressed states |
| `gold.100` | `#FEF9C3` | 254, 249, 195 | Subtle highlight bands, callouts |
| `cream.DEFAULT` | `#FAFAF9` | 250, 250, 249 | Page background |
| `cream.50` | `#FFFFFF` | 255, 255, 255 | Card surface, elevated content |
| `cream.100` | `#F5F5F4` | 245, 245, 244 | Alternating section bands |

### Semantic palette (sparingly)

| Token | Hex | Use |
|---|---|---|
| `success` | `#15803D` | Confirmation states, completed steps |
| `danger` | `#B91C1C` | Errors, destructive actions |
| `info` | `#0369A1` | Neutral informational notices |

### Contrast guarantees (WCAG)
- `ink.DEFAULT` on `cream.DEFAULT` → **20:1** (AAA, body)
- `cream.DEFAULT` on `gold.DEFAULT` (CTA) → **7:1** (AAA, large text)
- `cream.DEFAULT` on `ink.DEFAULT` (inverted) → **20:1** (AAA)
- `ink.700` on `cream.DEFAULT` → **10:1** (AAA, secondary text)
- `gold.DEFAULT` on `cream.DEFAULT` (links) → **5.4:1** (AA — pair with underline for AAA)

### Tailwind config (paste into `tailwind.config.ts`)
```ts
import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0C0A09',
          900: '#1C1917',
          700: '#44403C',
          500: '#78716C',
          300: '#D6D3D1',
        },
        gold: {
          DEFAULT: '#CA8A04',
          600: '#A16207',
          100: '#FEF9C3',
        },
        cream: {
          DEFAULT: '#FAFAF9',
          50: '#FFFFFF',
          100: '#F5F5F4',
        },
        success: '#15803D',
        danger: '#B91C1C',
        info: '#0369A1',
      },
    },
  },
} satisfies Config;
```

### Forbidden palettes
- ❌ Generic SaaS blue (`#2563EB`-range) — what the current site uses, what every competitor uses
- ❌ Purple/pink AI gradients
- ❌ Neon greens, electric cyans
- ❌ Any pastel
- ❌ Multiple accent colors at once (gold is the only accent)

---

## 3. Typography

### Type families
| Role | Primary (Fontshare) | Fallback (Google Fonts) | System fallback |
|---|---|---|---|
| Display / Heading | **Satoshi** (700–900) | DM Sans (700–900) | system-ui |
| Body | **General Sans** (400–500) | Inter (400–500) | system-ui |
| Mono | **JetBrains Mono** | JetBrains Mono | ui-monospace |

### Loading
- Use `font-display: swap`
- Apply once in `app/layout.tsx`
- Never per-page imports
- Reserve metrics with `size-adjust` to prevent CLS

### Type scale
| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `text-display-xl` | 40 / 1.05 | 72 / 1.0 | Hero only — once per page |
| `text-display-lg` | 32 / 1.1 | 56 / 1.05 | Section heroes |
| `text-h1` | 28 / 1.15 | 40 / 1.15 | Page titles |
| `text-h2` | 24 / 1.2 | 32 / 1.2 | Section titles |
| `text-h3` | 20 / 1.3 | 24 / 1.3 | Card titles |
| `text-body-lg` | 18 / 1.6 | 20 / 1.6 | Lead paragraphs |
| `text-body` | 16 / 1.6 | 16 / 1.6 | Body |
| `text-caption` | 13 / 1.4 | 14 / 1.4 | Captions, eyebrow text |

### Typographic rules
- Body line-length clamped to `max-w-prose` (~65ch)
- Tight tracking on display (`-0.04em`); normal on body
- Bold for emphasis within body — never italic (italic doesn't work in our display family)
- All caps reserved for eyebrow labels (e.g., section kickers) — use `tracking-widest`
- Never center body text — only headings

---

## 4. Spacing & layout

### Spacing scale (Tailwind default, unmodified)
Use Tailwind's default 4px-based scale: `gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-12`, `gap-16`, `gap-24`. No custom spacing.

### Section vertical rhythm
- **Compact section:** `py-16 md:py-24`
- **Standard section:** `py-24 md:py-32`
- **Hero section:** `py-32 md:py-48`

### Container
Always `max-w-6xl mx-auto px-4 md:px-6 lg:px-8`. Same width across every page.

### Grid
- 12-column flex grid via Tailwind utilities
- Card grids: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Engine grid (6+1): `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`

### Cards
- `bg-cream-50 border border-ink-300/60 rounded-xl p-6 md:p-8`
- Hover: `hover:shadow-md hover:border-ink-300 transition-shadow duration-200`
- Never scale cards on hover (layout shift)

---

## 5. Iconography

### Library
**Lucide** (open-source, consistent stroke weights). Install via `npm i lucide-react`.

### Sizing
- Inline with text: `w-5 h-5`
- Buttons: `w-5 h-5` left of label
- Feature blocks: `w-8 h-8`
- Hero icons: `w-12 h-12`

### Color
- Same as adjacent text by default
- Gold (`text-gold`) only when used as a brand mark

### Forbidden
- ❌ Emojis as UI icons (anywhere)
- ❌ Mixed icon sets (no Heroicons + Lucide on same site)
- ❌ Filled + outlined icons mixed (pick one — outlined preferred for our voice)

---

## 6. Motion

### Principles
- **Purposeful, not decorative**
- **150–300ms** for micro-interactions (button hover, accordion)
- **Ease-out** for entries, **ease-in** for exits
- **Respect `prefers-reduced-motion`** — disable everything but functional state changes

### Allowed motion patterns
- Color/opacity transitions on hover (150–200ms)
- Page-enter fade-up (300ms, once on intersection)
- Skeleton pulse during async operations
- Count-up on intersection for metrics (≤500ms)
- Accordion expand/collapse (200ms)

### Forbidden motion
- ❌ Scale or translate on card hover (layout shift)
- ❌ Infinite/decorative animations on page load
- ❌ Bouncing icons or "look at me" effects
- ❌ Parallax scrolling
- ❌ Animated gradients

---

## 7. Voice & tone

Anchored in the master strategy. Repeating here for asset producers:

- **Direct, not cute.** "We find businesses with proven demand and build them websites." Not: "Let's transform your digital journey."
- **Outcome-first, not technology-first.** "Your front desk books appointments while you sleep" beats "AI-powered scheduling agent."
- **Confident, not boastful.** "Built by an operator with 20 years inside revenue technology." Never name the employer.
- **Trilingual native.** Each locale reads native; no translated copy.
- **No jargon walls.** "AI agent," "RAG," "agentic" — used only when no plain alternative exists. Define on first use.
- **First-person founder voice on About + Methodology.** Brand-tone (we) elsewhere.
- **Numbers earn their place.** Use specific metrics from real engagements. Never invented stats.

---

## 8. Photography & illustration direction

See `image-direction.md` for full briefs. Core principles:

- **Real before stock.** Founder photos > agency stock. Operations photos > generic SaaS dashboards.
- **Warm before cool.** Lighting biased toward warm whites and amber, never cold blue light.
- **Documentary feel.** Studio shots can be polished, environmental shots stay candid.
- **Human-scale.** People > products. Faces > screens.
- **No team-around-laptop clichés.** Forbidden: people pointing at screens, smiling at meetings, high-fiving over dashboards.

---

## 9. Implementation rules for the build team

### Hard rules
- All UI uses tokens from this file via Tailwind config — never hex literals in JSX
- Logo files used as `next/image` with explicit width/height (avoid CLS)
- Favicon set generated from `favicon.svg` (multiple sizes auto)
- OG image (`opengraph-image.tsx`) per page uses brand tokens
- Dark mode is **out of scope for v1** — light only, simplifies trust layer
- Apply WCAG focus rings on every interactive element
- All copy reviewed by native-speaker editor per locale

### File organization
```
brand/
├── logo-wordmark-light.svg
├── logo-wordmark-dark.svg
├── logo-monogram.svg
├── favicon.svg
├── logo-lockup-horizontal.svg
├── brand-guidelines.md  ← this file
└── image-direction.md   ← image briefs + AI prompts
```

When the Phase 3 build starts, brand assets get copied (or symlinked) into `app/public/brand/`.

---

## 10. What's still to commission

| Asset | Source | Cost | Priority |
|---|---|---|---|
| Founder studio photoshoot (3 outfits, ~30 final shots) | Local photographer | $400–1,200 | HIGH |
| Founder environmental shots (in operations / WFH context) | Same shoot or follow-up | $200–600 | HIGH |
| 4 hero illustrations (Lighthouse, Engines, Methodology, Multilingual) | Designer or AI gen + designer cleanup | $300–1,000 | MED |
| 6 engine icons (custom, beyond Lucide) | Designer | $200–500 | LOW (Lucide first) |
| Credential badge SVGs (ATD, AA-ISP, FGV) | DIY recreation or designer | $0–200 | LOW |
| YouTube channel art (3 locale variants) | Designer or template | $200–500 | MED (when YT launches) |
| **Total estimate** | | **$1,300–4,000** | Within lean budget |

---

## Version history

- **v1.0** — 2026-04-30 — Initial brand system locked; ready for Phase 3 build
