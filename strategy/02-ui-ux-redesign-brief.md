# 10XAI — UI/UX Audit & Redesign Brief

> **Phase 2.5 deliverable.** Authored 2026-04-30.
> Driven by `ui-ux-pro-max` design intelligence + `ckm-ui-styling` (shadcn + Tailwind + Canvas) + the master strategy at [00-master-strategy.md](./00-master-strategy.md).
> This is the source of truth for every visual + interaction decision in Phase 3 build.

---

## Part 1 — Audit of current `10xai.us`

### What's already working (preserve these)
| ✓ Strength | Why it works |
|---|---|
| **Premium, airy spacing** | ~60–80px section gaps; designer-forward whitespace already on-brand |
| **Operator-focused copy voice** | "Stop discussing AI in theory" / "without enterprise drag" — anti-hype, founder-to-founder |
| **Single CTA discipline** | "Schedule a Call" repeated 5+ times — consistent next action |
| **Honest disclaimer on case studies** | "Not presented as current 10XAI clients" reads as trustworthy |
| **High contrast / WCAG AA** | Body text dark on white — accessibility floor cleared |
| **Already on Next.js** | Image optimization in place; matches our chosen stack |
| **Long-form copy density** | Operators read; the long-page format matches the buyer |

### What's broken (must fix in v2)
| ✗ Problem | Severity | Fix |
|---|---|---|
| **Zero founder presence** | CRITICAL | Bernardo's face + bio in hero or above-fold band on Home + dedicated About page |
| **Generic, repeated imagery** (same hero graphic 3x) | HIGH | Custom illustrations + real photography (founder + operations) |
| **No interactive lead magnet** | HIGH | Ship the AI Operations Audit + Lighthouse Live Preview as the *primary conversion engine* |
| **No live AI on the site** | HIGH | Dez chat widget — agency dogfoods its own product |
| **English-only content surface** | HIGH | True trilingual: `/`, `/pt`, `/es` from Day 1 |
| **No published case studies (only "aspirational" examples)** | HIGH | At least 1–2 real case studies before launch (free pilots if needed) |
| **No social media links in footer** | MEDIUM | LinkedIn, YouTube, Instagram, Facebook, X — full social row |
| **Form fields without visible labels** ("Send a qualified brief") | MEDIUM | Persistent visible labels (a11y + clarity) |
| **Long scroll before first conversion opportunity** | MEDIUM | Move CTA above the fold + sticky header on scroll |
| **Repeated "founder-led/operator-led" phrase** (4+ times) | LOW | Copy edit pass — say it once, with conviction |
| **No visible focus states implied** | MEDIUM | Tailwind `focus:ring-2 focus:ring-amber-500/60` everywhere |
| **No published trust badges** (SOC 2-ready, LGPD-ready, etc.) | MEDIUM | Add a Trust band — even "in process" beats nothing |

### Numbers from `--design-system` analysis
- Pattern recommended: **Minimal Single Column** — matches current, validates direction
- Style recommended: **Trust & Authority** — certificates/badges/credentials/case studies/metrics
- Best-fit verticals: *"Healthcare/medical landing pages, financial services, enterprise software, premium/luxury products, legal services"* — **bullseye** for Bernardo's MedTech credentials + SMB premium positioning

---

## Part 2 — Locked design system

### Visual style: Trust & Authority + Minimal Single Column
Anchored on:
- Visible credentials (ATD, AA-ISP, FGV, Top 100 Healthcare BR)
- Metrics-first case studies (with real numbers when available)
- Before/after comparisons where meaningful
- Generous whitespace + large type
- Single dominant CTA per surface
- Mobile-first

### Color system — **Black / Gold / Off-white** (recommended)

Pulled from `--design-system` Trust & Authority. Differentiates 10XAI from generic SaaS blue, signals premium + founder-tier positioning, reads as "Nike × Apple" + healthcare-credible.

```css
/* Tailwind config — paste into tailwind.config.ts theme.colors */
{
  ink: {
    DEFAULT: '#0C0A09',   /* primary text */
    900:     '#1C1917',   /* dark surface, primary brand */
    700:     '#44403C',   /* secondary text */
    500:     '#78716C',   /* muted */
    300:     '#D6D3D1',   /* hairline borders */
  },
  gold: {
    DEFAULT: '#CA8A04',   /* CTA + brand accent */
    600:     '#A16207',   /* CTA hover */
    100:     '#FEF9C3',   /* subtle highlight bg */
  },
  cream: {
    DEFAULT: '#FAFAF9',   /* page background */
    50:      '#FFFFFF',   /* card surface */
    100:     '#F5F5F4',   /* alt section bg */
  },
  /* semantic */
  success: '#15803D',
  danger:  '#B91C1C',
  info:    '#0369A1',
}
```

**Contrast guarantees** (WCAG AAA):
- `ink.DEFAULT` (#0C0A09) on `cream.DEFAULT` (#FAFAF9) → ~20:1 ✓
- `cream.DEFAULT` on `gold.DEFAULT` for CTA → ~7:1 ✓
- `ink.700` on `cream.DEFAULT` for body → ~10:1 ✓

### Color system — **Alternative: Slate / Blue / Off-white** (fallback)

Only if Bernardo wants the safer "B2B service" palette over the premium one.

```css
{
  primary:    '#0F172A',
  secondary:  '#334155',
  cta:        '#0369A1',
  background: '#F8FAFC',
  text:       '#020617',
  border:     '#E2E8F0',
}
```

**Recommendation:** go with **Black/Gold/Off-white**. The current site already uses generic SaaS blue — switching to gold-accented black is the visual cue that 10XAI is *the premium SMB AI agency*, not another vendor.

### Anti-patterns (forbidden)
- ❌ AI purple/pink gradients (cliché — every AI startup does this)
- ❌ Playful illustrations (mismatched to operator buyer)
- ❌ Hidden credentials
- ❌ Emoji used as UI icons (use SVG: Lucide / Heroicons)
- ❌ Generic stock photography of "diverse team smiling at laptop"
- ❌ Animated gradients on hero text
- ❌ Glassmorphism (over-used; doesn't match Trust & Authority)

### Typography — **Premium Sans pairing**

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Hero | **Satoshi** | 700–900 | Fontshare; geometric, confident, modern |
| Heading | **Satoshi** | 600–700 | Same family, lighter weight |
| Body | **General Sans** | 400–500 | Fontshare; humanist, readable, pairs cleanly |
| Mono (code, data) | **JetBrains Mono** | 400 | Technical surfaces only |

**Google Fonts fallback** (free-tier-friendly): **DM Sans** (heading) + **Inter** (body). Same mood, easier loading.

**Tailwind config:**
```ts
fontFamily: {
  display: ['Satoshi', 'DM Sans', 'sans-serif'],
  sans:    ['General Sans', 'Inter', 'system-ui', 'sans-serif'],
  mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
}
```

**Loading guardrails:**
- `font-display: swap` everywhere (avoid FOIT)
- Reserve space with fallback metrics (`size-adjust`, `ascent-override`) — prevents layout shift
- Apply font in `app/layout.tsx` only; never import per-page

### Type scale (modular, mobile-first)

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `text-display-xl` | 40px / leading-tight | 72px | Hero only |
| `text-display-lg` | 32px | 56px | Section heroes |
| `text-h1` | 28px | 40px | Page titles |
| `text-h2` | 24px | 32px | Section titles |
| `text-h3` | 20px | 24px | Card titles |
| `text-body-lg` | 18px | 20px | Lead paragraphs |
| `text-body` | 16px | 16px | Body, line-height 1.6 |
| `text-caption` | 13px | 14px | Captions, eyebrow text |

**Line-length rule:** body copy clamped at `max-w-prose` (~65ch).

### Effects (subtle, purposeful)

- **Hover:** `transition-colors duration-200` on color/opacity only — never scale/translate (no layout shift)
- **Focus:** `focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2`
- **Cards:** `hover:shadow-md` (no border on hover; just elevation)
- **Page enter:** subtle `opacity-0 → 1` with `translate-y-2 → 0` over 300ms; respects `prefers-reduced-motion`
- **Metric reveal:** count-up on intersection (300ms ease-out); single use, never gimmick
- **Badge pulse:** `animate-pulse` only on Lighthouse "live preview" generating state

### Iconography
- **Library:** Lucide (open-source, comprehensive, consistent stroke)
- **Size:** `w-5 h-5` for inline, `w-6 h-6` for buttons, `w-8 h-8` for feature blocks
- **Stroke:** `stroke-2` default
- **Color:** matches text token; gold only when used as a brand mark

---

## Part 3 — Information architecture

### Top navigation (sticky, glass-on-scroll)

```
Logo  |  Lighthouse  |  Engines  |  About  |  Methodology  |  Resources ▾  |  ES ▾    Talk to Dez  →  Book a Call
```

- **Lighthouse** — flagship sub-product (separately addressable)
- **Engines** — dropdown listing the 6 service tiers + Concierge (Dez)
- **About** — founder-front (anchor of credibility)
- **Methodology** — the "From Pilot Purgatory to Production AI" 4-week protocol
- **Resources** — Blog, Comparisons, Case Studies, Tools, State-of-AI Report
- **Locale switcher** — `EN | PT | ES` with persistent cookie
- **Talk to Dez** — opens Dez chat widget (secondary CTA)
- **Book a Call** — primary CTA, gold, persistent in nav

### Footer (full social row)

```
[10XAI logo]                                    [LI] [YT] [IG] [FB] [X]

Lighthouse · Engines · About · Methodology · Trust · Privacy · Terms · Contact

contato@10xai.us · WhatsApp +1 ... · Apex / Raleigh, NC · São Paulo · CDMX

© 2026 10XAI. All rights reserved.
                                              [EN  PT  ES]
```

### Sitemap (Phase 3 build target)

```
/                                              Home (EN)
/pt/                                           Home (PT-BR)
/es/                                           Home (ES)

/lighthouse                                    Flagship — flywheel landing + live preview tool
  /lighthouse/preview/[gbp-id]                 Generated site preview (per business)

/engines                                       All 6 engines + Dez overview
  /engines/sales                               Sales Engine
  /engines/care                                Care Engine
  /engines/reach                               Reach Engine
  /engines/mind                                Mind Engine (LMS)
  /engines/bid                                 Bid Engine (RFP)
  /engines/dez                                 Concierge — Dez landing

/about                                         Founder-front; Bernardo + ATD/AA-ISP/FGV credentials
/methodology                                   The 4-week production protocol

/tools/                                        Free interactive tools index
  /tools/audit                                 AI Operations Audit (URL → 6-system gap analysis)
  /tools/lighthouse-preview                    Lighthouse Live Preview (Google Business URL → site)

/case-studies                                  Index (placeholder content until first ships)
  /case-studies/[slug]                         Per-case-study pages

/vs/                                           Comparisons index
  /vs/11x-ai
  /vs/artisan
  /vs/aisdr
  /vs/relevance-ai
  /vs/gohighlevel
  /vs/blip
  /vs/durable

/for/                                          Vertical pages
  /for/dental-practices
  /for/accounting-firms
  /for/marketing-agencies
  /for/home-services

/blog                                          Articles
/state-of-ai-2026                              Gated lead-magnet report
/trust                                         Compliance, methodology, what we don't do
/privacy
/terms
/contact

/api/                                          Internal endpoints (Dez, audit, preview, bookings, leads)
```

All pages mirrored in `/pt/...` and `/es/...`.

---

## Part 4 — Page-by-page redesign

### Home (`/`)

**Above the fold:**
```
┌────────────────────────────────────────────────────────┐
│  [logo]   nav...                  [Talk to Dez] [Book→]│
├────────────────────────────────────────────────────────┤
│                                                        │
│  AI Operating Systems                                  │
│  for the businesses that                              │
│  can't afford a 12-person team.            [B. photo] │
│                                                        │
│  We find your demand. We build the systems that turn  │
│  it into bookings, sales, and answered customers.     │
│  English. Português. Español.                         │
│                                                        │
│  [Try Lighthouse  →]   [Talk to Dez]                  │
│                                                        │
│  ATD Master Trainer · AA-ISP Accredited · FGV         │
└────────────────────────────────────────────────────────┘
```

**Below the fold (in order):**
1. **Lighthouse band** — "We find local businesses with great reviews and no website. We build them one. Then we reach out." → embedded live preview tool
2. **Three principles** — 1 priority / 4 weeks to production / 1 aligned team (preserved from current site, refreshed)
3. **The 6 Engines** — card grid: Lighthouse, Sales, Care, Reach, Mind, Bid + Dez. Each card: name, one-line outcome, anchor "From $X", CTA
4. **Methodology preview** — visual 4-week timeline (Discover → Build → Adopt → Grow)
5. **Markets** — three columns: US / Brasil / LatAm with regional case stub + locale flag
6. **Outcomes / ROI band** — Bernardo's interactive AI Operations Audit embedded
7. **Founder band** — large photo + 3-paragraph story, employer-redacted, credentials prominent
8. **FAQ** — 8 questions, accordion (shadcn)
9. **Final CTA** — split: "Book a Call" or "Talk to Dez"
10. **Footer**

**Conversion mechanics:**
- Sticky header reveals after 200px scroll
- Three CTAs total: Lighthouse (top), Talk to Dez (top + bottom), Book a Call (top + bottom)
- Dez chat widget bottom-right, `Talk to Dez` button opens it pre-filled with "Hi, I'm interested in..."
- Single-column layout (matches `--design-system` recommendation)

### Lighthouse (`/lighthouse`)

The flagship sub-product page. This page must convert by itself.

**Structure:**
1. **Hero** — "Find demand. Ship the front door. Reach out." + 3-line subhead + live preview tool above the fold
2. **Live preview tool** — paste any Google Business URL → 60-sec generated site preview
3. **The 7-step motion** — visual timeline from Source → Enrich → Generate → Stage → Reach out → Close → Expand
4. **Anchor pricing** — "From $497 setup + $49/mo" prominent, demo-gated for full
5. **What you get** — bullet list with Lucide icons
6. **What we won't do** — quality bar / compliance bar (LGPD, CAN-SPAM, opt-out by default)
7. **Process** — 4-week pilot timeline
8. **CTA** — Book a Lighthouse Pilot (single-line form: domain + email)

### Engines (`/engines`) + per-engine pages

**Index page:** card grid (3×2 + Dez), each card matches the Home grid but with deeper copy.

**Per-engine page template** (e.g., `/engines/sales`):
1. Hero — engine name + outcome promise + "From $X" anchor
2. Who this is for (ICP bullets — operator language)
3. What it does (3–5 features with Lucide icons)
4. How we deploy it (4-week timeline)
5. What it integrates with (logo strip — HubSpot, Cal.com, etc.)
6. Case study or "first 3 customers get..." offer
7. Pricing anchor + Book a discovery call CTA

### About (`/about`) — founder-front

**Structure:**
1. **Large founder photo, hero left, copy right**
2. **Headline:** "I spent 20 years inside revenue technology so my SMB clients don't have to." (employer-redacted)
3. **Body (first person):** 3 paragraphs — origin, why 10XAI, what makes the work different
4. **Credentials wall:** ATD Master Trainer · ATD Instructional Design · AA-ISP Accredited · LinkedIn Sales Navigator · FGV · Top 100 Most Influential in Healthcare in Brazil 2015 — each as a card with the badge/seal where available
5. **Languages spoken:** EN / PT-BR / ES with proficiency
6. **Connect:** LinkedIn, YouTube, email
7. **CTA:** Book a Call

**Critical constraint:** no employer name. Use role-based framing throughout.

### Methodology (`/methodology`)

The "From Pilot Purgatory to Production AI in 4 Weeks" page.

**Structure:**
1. Hero — "77% of SMBs that buy AI tools abandon them in 6 months. We don't."
2. The 4-week protocol — visual timeline with deliverables per week
3. What we measure (week 1 baseline → week 4 outcome metrics)
4. Quality bar — what we ship vs. what we don't
5. CTA

### Tools — `/tools/audit` and `/tools/lighthouse-preview`

These are the inbound magnets. Built as full-page tools (no nav clutter).

**Audit tool page:**
- Single input: business URL or LinkedIn company URL
- Loading state: skeleton with "Reviewing your operations..." (avoid frozen UI)
- Output: 6-system gap analysis with $ value estimates per system
- Email gate before showing full PDF download
- "Let's talk about fixing #1" CTA → books a call

**Lighthouse preview tool page:**
- Single input: Google Business Profile URL
- Loading state: skeleton + estimated 60-sec wait
- Output: live generated site preview in iframe
- "Claim your site" CTA → books a Lighthouse pilot call
- "Send to my email" secondary action

### Comparison pages (`/vs/[competitor]`)

Template per page (one per top competitor):
1. Hero — "10XAI vs [Competitor]: Which is right for SMBs in EN/PT-BR/ES?"
2. Side-by-side feature table
3. Pricing comparison (where public)
4. When to pick each
5. Independent comparison disclaimer
6. CTA

7 comparison pages in EN at launch; localized in Phase 4.

### Vertical pages (`/for/[vertical]`)

Template per page:
1. Hero — vertical-specific outcome ("AI Operating Systems for Dental Practices")
2. The pain — 3 bullets specific to vertical
3. The fix — which engines apply, in what order
4. Vertical case study (or "first 3 customers get..." offer)
5. Vertical-specific compliance note (e.g., HIPAA for dental)
6. CTA

---

## Part 5 — Component inventory (shadcn-based)

Install on Phase 3 day 1:

```bash
npx shadcn@latest init
npx shadcn@latest add button card dialog drawer input form label \
  navigation-menu sheet badge separator accordion tabs \
  toast tooltip avatar table command dropdown-menu skeleton
```

### Custom variants to extend

```ts
// button variants — add gold CTA
buttonVariants({
  variant: {
    default: 'bg-gold text-cream hover:bg-gold-600',
    secondary: 'bg-ink-900 text-cream hover:bg-ink-700',
    ghost: 'hover:bg-ink-300/40',
    link: 'text-gold hover:underline',
  }
})
```

### Bespoke components needed

| Component | Purpose | Notes |
|---|---|---|
| `<Hero>` | Reusable hero with headline + subhead + dual CTAs + optional founder photo | |
| `<EngineCard>` | Card for each of the 6 engines + Dez | Same shape, swappable copy |
| `<MethodologyTimeline>` | 4-week visual timeline | Pure CSS, no JS |
| `<AuditTool>` | Embedded audit tool (lazy-loaded with `next/dynamic`) | Server-action driven |
| `<LighthousePreview>` | Embedded preview tool | Streaming response |
| `<DezWidget>` | Floating chat widget | LiveKit + fallback chat-only |
| `<LocaleSwitcher>` | EN/PT/ES toggle in nav + footer | Persists cookie |
| `<CredentialBadge>` | Single credential card (ATD, AA-ISP, etc.) | Image + label + year |
| `<MetricCounter>` | Animated count-up on intersection | Respects reduced-motion |
| `<ComparisonTable>` | Side-by-side competitor table | Used on `/vs/*` pages |
| `<TrustBand>` | Compliance + security row | LGPD/HIPAA-ready/SOC 2 in process etc. |

---

## Part 6 — Trilingual implementation

### Routing — Next.js App Router i18n
```
/app/[locale]/...
  /(marketing)/
    page.tsx                  ← / or /pt or /es home
    lighthouse/page.tsx
    engines/...
    about/page.tsx
    ...
```

`middleware.ts` — locale detection from `Accept-Language` + cookie persistence + redirect to default.

### Content layer
- **Source content:** MDX files per locale (`content/en/home.mdx`, `content/pt/home.mdx`, `content/es/home.mdx`)
- **Translation pipeline:** Bernardo writes EN → native-speaker editor produces PT-BR + ES (NEVER MT)
- **UI strings:** `next-intl` with separate locale JSON
- **Dez agent prompt + knowledge:** locale-bound (different system prompt per language)

### Locale-specific tweaks
- **PT-BR:** WhatsApp button more prominent (cultural channel norm)
- **ES:** Mexican-variant copy primary (largest LatAm tech market); add note for region-neutral terms
- **EN:** US dollar pricing; PT-BR & ES show local currency anchors (BRL / MXN) when set

### URL examples
- `https://10xai.us/lighthouse` → English
- `https://10xai.us/pt/lighthouse` → Portuguese
- `https://10xai.us/es/lighthouse` → Spanish

`hreflang` tags on every page for SEO.

---

## Part 7 — Conversion path optimization

### The three primary conversion paths

**Path 1 — Inbound to demo (slowest, most qualified)**
Home → Engine page or About → Methodology → Book a Call
Time-to-CTA target: under 90 seconds

**Path 2 — Inbound to tool to demo (highest-converting)**
Home → Lighthouse Preview *or* AI Audit → Email gate → Book a Call
Time-to-CTA target: under 5 minutes (tool runs)

**Path 3 — Talk to Dez (instant, lowest-friction)**
Any page → Dez widget → Q&A → Booking handoff
Time-to-CTA target: under 60 seconds for a qualified visitor

### CTA hierarchy (single, consistent)
- **Primary** (gold): "Book a Call" — appears in nav, hero, every section's tail
- **Secondary** (ink): "Talk to Dez" — opens widget, less commitment
- **Tertiary** (link): "Try Lighthouse" → tool — for unqualified visitors

Never more than 2 visible CTAs in the same viewport — kills decision paralysis.

### Friction removal
- Sticky header with always-available primary CTA (after first scroll)
- Dez widget reachable from every page (one-click)
- Cal.com booking embed inline on `/contact` (no popup, no extra page)
- Form fields with persistent visible labels + helper text
- WhatsApp Click-to-Chat link in footer + Dez fallback for LatAm visitors who prefer it

---

## Part 8 — Accessibility checklist (WCAG AA minimum, AAA where feasible)

- [ ] Color contrast ≥ 4.5:1 (text), ≥ 3:1 (large text + UI components) — palette engineered for AAA
- [ ] All images have meaningful alt text (Lighthouse-generated images included)
- [ ] Form inputs use `<Label htmlFor>` + persistent visible labels
- [ ] Focus rings visible on every interactive element (`focus-visible:ring-2 focus-visible:ring-gold/60`)
- [ ] Tab order matches visual order across nav, hero, sections
- [ ] Skip-to-content link for keyboard users
- [ ] `aria-label` on icon-only buttons (chat widget, locale switcher, etc.)
- [ ] Touch targets ≥ 44×44px (especially mobile nav, accordion triggers)
- [ ] `prefers-reduced-motion` respected — disable transforms + reveal animations
- [ ] All animations purposeful, ≤ 300ms, ease-out
- [ ] No infinite/decorative animations (Result 3 from `--domain ux`)
- [ ] Live regions (`aria-live="polite"`) for Dez streaming responses + tool loading messages
- [ ] Forms validate inline with `aria-invalid` + `aria-describedby`
- [ ] Keyboard-traversable Dez widget (open/close, send, escape)
- [ ] Locale switcher accessible via keyboard
- [ ] Color is not the *only* indicator of state (always pair with icon or text)
- [ ] `lang` attribute set per locale on `<html>`

---

## Part 9 — Performance + Next.js guardrails

### Hard rules from `--stack nextjs`

| ✓ Always | ✗ Never |
|---|---|
| `next/image` for every image | `<img>` tags |
| `fill` + relative parent for responsive images | hard-coded width matching window |
| Skeleton loaders matching final aspect ratios | content popping in (CLS) |
| `remotePatterns` whitelist in `next.config.ts` | `domains: ['*']` |
| Font loaded once in `app/layout.tsx` | per-page font imports |
| OG image per page (`opengraph-image.tsx`) | missing social previews |
| `next/dynamic()` for heavy components (charts, Dez widget, video) | static import of everything |
| `font-display: swap` | FOIT (invisible text during font load) |
| Bundle analyzer in CI (`ANALYZE=true npm run build`) | shipping blind |

### Targets at launch
- Lighthouse score: ≥ 95 perf / 100 a11y / 100 best-practices / 100 SEO (mobile *and* desktop)
- LCP ≤ 1.8s on mid-tier mobile (4G simulated)
- INP ≤ 200ms
- CLS ≤ 0.05
- Total JS ≤ 200KB gzipped on home page

### Loading states
- Skeleton screens for any async content (Result 6: `> 300ms` operations)
- Loading buttons disabled during async, with inline spinner (Result 7)
- Lazy-load below-fold images (Result 4)
- Defer Dez widget initialization until idle (`requestIdleCallback`)

---

## Part 10 — Brand assets to commission/produce

| Asset | Owner | Cost (lean budget) |
|---|---|---|
| Logo refresh (vector + monogram + dark/light variants) | Designer | $300–800 |
| Founder photography (3 outfits, 2 locations, ~30 final shots) | Local photographer | $400–1,200 |
| Custom illustrations (4 hero + 6 engine icons + Methodology timeline) | Designer / AI-assisted | $500–1,500 |
| Credential badge SVGs | DIY or designer | $0–200 |
| Open Graph image template (per page) | DIY (Figma + auto-gen via `opengraph-image.tsx`) | $0 |
| Favicon set | DIY | $0 |
| YouTube channel art (3 locale variants) | Designer | $200–500 |
| **Total** | | **$1,400–4,200** |

Within the lean $5–15K budget. Most can be Bernardo-led with one freelance designer.

---

## Part 11 — Pre-delivery checklist (every page, every locale)

### Visual quality
- [ ] No emojis as icons (Lucide SVG only)
- [ ] All icons from same set with same stroke width
- [ ] Brand logos correct (verified via Simple Icons)
- [ ] Hover states use color/opacity only — no scale/translate (no layout shift)
- [ ] Focus-visible rings on every interactive element

### Interaction
- [ ] `cursor-pointer` on every clickable card/element
- [ ] Smooth transitions 150–300ms ease-out
- [ ] Loading states for all async actions
- [ ] Disabled buttons during submission

### Light-mode contrast (this site is light-only at v1)
- [ ] Body text ≥ `ink.700` (#44403C) on `cream.DEFAULT` (#FAFAF9)
- [ ] Borders use `ink.300` (#D6D3D1) — visible
- [ ] Subtle backgrounds use `cream.100` (#F5F5F4) — distinguishable

### Layout
- [ ] Sticky header has top spacing on mobile (no notch overlap)
- [ ] Content padding accounts for sticky header height
- [ ] Same `max-w-6xl` (or `max-w-7xl`) container across all pages
- [ ] Tested at 375px / 768px / 1024px / 1440px / 1920px
- [ ] No horizontal scroll on mobile

### Trilingual
- [ ] `<html lang>` correct per locale
- [ ] `hreflang` alternates point to every locale variant
- [ ] No machine-translated strings — every locale reviewed by native speaker
- [ ] Currency / date formatting locale-aware
- [ ] PT-BR uses Brazilian PT, not European
- [ ] ES uses Mexican-leaning regional Spanish

---

## Part 12 — Implementation sequencing (aligned with 90-day plan)

### Week 1 — Foundation
- Brand voice doc (Section 11 of master strategy formalized)
- Tailwind theme tokens (Section 2 above) committed to repo
- shadcn init + first 12 components added
- Logo refresh kicked off
- Founder photoshoot scheduled

### Weeks 2–3 — EN site v1 (the build week)
- `app/layout.tsx` with fonts + tokens
- Components: Hero, EngineCard, MethodologyTimeline, CredentialBadge, MetricCounter, TrustBand, LocaleSwitcher
- Pages: `/`, `/lighthouse`, `/engines`, `/engines/[slug]` × 6, `/about`, `/methodology`, `/trust`, `/contact`
- AI Operations Audit tool (`/tools/audit`)
- Lighthouse Preview tool (`/tools/lighthouse-preview`)
- Dez chat widget (chat-only)
- Cal.com booking embedded
- HubSpot Free wired for lead capture
- Resend transactional email
- Lighthouse perf pass (target ≥95 mobile)

### Weeks 4–5 — Localization
- PT-BR translation pass + locale routing live
- ES translation pass + locale routing live
- Dez localized prompts (3 languages)
- All page titles + meta + OG localized
- `hreflang` audit clean

### Weeks 6–9 — Content depth
- 7 comparison pages live in EN
- 4 vertical pages live in EN
- Blog scaffolding + first 4 cornerstone articles
- "State of AI for SMBs in LatAm 2026" gated landing page

### Weeks 10–13 — Compounding
- Comparison + vertical pages localized
- First case study published with custom photography/video
- A/B test: founder hero photo vs. abstract — measure conversion
- Add `/case-studies` index + first 1–3 entries
- Final Lighthouse audit + accessibility audit

---

## Appendix A — Why the recommended palette beats the alternative

The current `10xai.us` uses generic SaaS blue (#2563EB-range). Every AI startup uses some variant of blue. The `--design-system` recommendation of **Black / Gold / Off-white** does three things blue can't:

1. **Differentiation in a saturated category.** Scrolling LinkedIn or YouTube, gold + black stops the eye where blue gets ignored.
2. **Maps to the founder's story.** Bernardo's credentials are *premium professional*, not enterprise-tech. Gold reads as "expertise + earned trust." Blue reads as "another SaaS."
3. **Cross-cultural premium signal.** In Brazilian and Mexican markets, gold/black on a service site signals quality more reliably than blue (which trends toward government and bank associations).

If Bernardo prefers a safer blue, the fallback palette in Part 2 is fully WCAG-compliant and ready to swap. Recommendation stands: **go gold.**

---

## Appendix B — Open questions for Phase 3 build

1. **Final CTA wording** — "Book a Call" vs. "Talk to Bernardo" vs. "Schedule 15 min"? (recommend "Book a Call" for clarity; localize PT/ES in cultural register)
2. **Founder photo style** — studio (premium, controlled) vs. environmental (operations context)? Recommend mix: hero shot studio, About page environmental.
3. **Logo direction** — keep current 10XAI mark or refresh? If refresh: monogram + wordmark + favicon set.
4. **Currency display in PT/ES** — show USD only, or local currency anchors (BRL/MXN)? Recommend dual: USD primary, local in parens.
5. **Demo gate vs. inline pricing on Engine pages** — strategy says "from $X" anchor, but should the actual tier table be public, or behind email gate? Recommend visible "from $X", full tier table behind email gate.
