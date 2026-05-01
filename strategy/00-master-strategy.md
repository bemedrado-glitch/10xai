# 10XAI — Master Strategy & GTM Plan (Phase 2)

> **Founder:** Bernardo Medrado · **Geo:** US + BR + Spanish LatAm · **Languages:** EN / PT-BR / ES · **Authored:** 2026-04-30
> Locked decisions feeding this doc are listed at the end. This is the source-of-truth strategy through end of Phase 4 build.

---

## 0. The 30-second pitch

> 10XAI builds **finished AI operating systems** for small and mid-sized businesses in the US and Latin America. We don't sell tools and walk away — we deliver running systems that book meetings, recover receivables, train staff, and serve customers, in three languages, with a real founder behind every engagement. Our flagship lead engine, **Lighthouse**, finds local businesses with proven Google-reviews demand but no website, builds them one with AI, and reaches out — turning silent demand into our pipeline (and theirs).

This is the working pitch. Final brand-voice variations refined in Section 11.

---

## 1. Founder-comms guidelines (employer-name redaction)

**Hard rule:** Bernardo's current full-time employer is **never named** in any 10XAI public surface — site copy, social, video, podcast, outbound, slide decks, press, partner materials. Period.

Acceptable framings:
- ✅ "20+ years building revenue and growth systems."
- ✅ "Decade+ inside top-tier B2B SaaS / revenue technology."
- ✅ "Trained at the world's leading sales-enablement organizations."
- ❌ Any specific company name from his employment history that overlaps current obligations.

Trust signals lead with **employer-independent credentials**:
- ATD Master Trainer + Instructional Design Certificate
- AA-ISP Accredited Inside Sales Management
- LinkedIn Sales Navigator certifications
- FGV (Fundação Getulio Vargas)
- Top 100 Most Influential in Healthcare in Brazil (2015)
- 20+ years in healthcare / medtech / revenue tech

This protects Bernardo's day job AND positions 10XAI as an independent venture in its own right.

---

## 2. ICP — three regions, one operator

### Common across all three regions
- **Size:** 15–500 employees
- **Revenue:** $500K – $50M
- **Decision-maker:** Founder / owner-operator (not committee)
- **Buying state:** Already feeling friction in workflows; has *bought* AI tools that aren't being used (pilot purgatory)
- **Tech posture:** Modest — uses email, WhatsApp, possibly a basic CRM; has Google Business Profile
- **Pain hierarchy:** Time → people → revenue. They want their day back.

### US ICP
| Field | Value |
|---|---|
| Geo focus (Year 1) | NC, SC, GA, FL → expand to TX, CA, NY |
| Verticals | Dental practices, accounting firms, marketing agencies, home services (HVAC, landscaping, plumbing, cleaning), boutique e-commerce, fitness studios |
| Avg buyer | Owner / managing partner, 35–60 years old, runs payroll on QuickBooks |
| Channels | LinkedIn, YouTube, Google Local, NextDoor (for home services), Instagram (beauty/fitness) |
| Trust trigger | Real founder face + a US-based client testimonial + transparent service description |

### BR ICP (PT-BR)
| Field | Value |
|---|---|
| Geo focus (Year 1) | SP, RJ, MG, RS, PR |
| Verticals | Clínicas odontológicas + estéticas, contabilidade, agências de marketing, restaurantes / açaí / cervejarias, beleza/bem-estar, cursos |
| Avg buyer | Dono/dona, 30–55 years, lives on WhatsApp |
| Channels | Instagram, YouTube, WhatsApp, LinkedIn, podcasts |
| Trust trigger | Native PT-BR (no MT), Brazilian case study, founder presence in Portuguese |
| Cultural note | Trust and warmth precede pricing. Lead with relationship; quote later. |

### Spanish LatAm ICP (ES)
| Field | Value |
|---|---|
| Geo focus (Year 1) | México (CDMX, Monterrey, Guadalajara), Colombia (Bogotá, Medellín), Argentina (Buenos Aires), Chile (Santiago) |
| Verticals | Same as BR + auto/talleres (LatAm is auto-services-heavy) |
| Avg buyer | Dueño/dueña, 30–55 years |
| Channels | LinkedIn, YouTube, Instagram, WhatsApp, regional podcasts |
| Trust trigger | Native ES (regional, not Castilian), Mexican or Colombian case study, founder in ES |

---

## 3. Flagship — Lighthouse (the No-Website Flywheel)

> **Working name:** Lighthouse · *Same word in PT/ES, recognizable in EN, evokes guidance + visibility.*

Bernardo's call (Decision #1): the flywheel idea is the marquee narrative of 10XAI. This is the lead story on the homepage, the hero of paid ads, the topic of the founder's first 12 YouTube videos, and the wedge product that opens every other engagement.

### The motion in seven steps
1. **Source.** Pull Google Business Profile data for a target geo + vertical. Filter: ≥4.5 stars, ≥20 reviews, no website field, active in last 12 months.
2. **Enrich.** Reviews, photos, hours, contact (phone, WhatsApp), category, owner-response history.
3. **Generate.** Claude generates a 5-section site (hero, services, reviews, contact, hours/location) in the local language, brand pulled from photos via vision.
4. **Stage.** Auto-deploy to a preview URL (Vercel preview or sub-domain).
5. **Reach out.** 7-day cadence — email + WhatsApp + Instagram DM + (later) phone — with personalized loom of *their* preview.
6. **Close.** Inbound reply → 15-min Cal.com call → close at $497 setup + $49–99/mo hosting+updates → site goes live.
7. **Expand.** Post-purchase, intro the Concierge (Dez), the booking automation, the AI customer service. Lighthouse is the wedge; the LTV is in the stack.

### Why this wins
- **Durable proves $40M ARR exists in AI site building** — but they only do *inbound*. Nobody runs the outbound motion. Wide-open lane.
- **The qualification is the proof** — businesses with great reviews already have demand. Conversion logic: *if reviews work without a site, imagine with one.*
- **The hook can't be matched** — "Here's the website I built for you, already live, ready to launch under your domain" is categorically different from any other agency cold open.
- **It's the narrative for everything else** — "we built our agency on this same automation" is the strongest possible founder story for an AI agency targeting SMBs.

### Lighthouse landing page (sub-product, sub-brand inside 10XAI)
Public URL: `10xai.us/lighthouse` (EN), `/pt/lighthouse`, `/es/lighthouse`.

Anchors:
- "We find local businesses with great reviews and no website. We build them one. Then we reach out."
- Live demo: input *any* Google Business URL → see a generated preview.
- "From $497 setup + $49/mo" anchor.
- 3 case studies (when available).

### Compliance guardrails
- **Google Places API ToS** — read carefully before scaling; commercial use rules apply.
- **CAN-SPAM (US), LGPD (BR), Mexico/AR/CO outreach laws** — every cadence respects opt-out, identifies the sender, and qualifies as B2B legitimate-interest.
- **WhatsApp Business** — start on Meta Cloud API direct (lean budget); revisit Blip Partners for BSP scale once volume justifies.
- **Quality gate** — every generated site reviewed by a human before send. Bad auto-sites are worse than no outreach.

---

## 4. Service catalog — the 10XAI stack

The current 6 systems on 10xai.us are good but flat. Re-organized as a coherent stack with Lighthouse as the wedge:

| # | Tier | Public name | What it is | Floor anchor (public) | Real range |
|---|---|---|---|---|---|
| 0 | Wedge / lead engine | **Lighthouse** | Auto-built sites + outbound for review-rich, site-less SMBs | **From $497 setup + $49/mo** | $497–1,500 setup + $49–149/mo |
| 1 | AI Concierge | **Dez** (chat, then voice, then avatar) | Real-time AI sales agent on the client's site (or 10XAI's) | **From $99/mo** | $99–599/mo + $1.5–7.5K setup |
| 2 | Sales OS | **Sales Engine** | AI SDR cadences + CRM sync + booking | **From $1,500 setup + $499/mo** | up to $5K + $1.5K/mo |
| 3 | Customer Success OS | **Care Engine** | Booking automation + CS agent + AI review responses | **From $1,500 setup + $499/mo** | up to $4K + $1.2K/mo |
| 4 | Marketing OS | **Reach Engine** | Content + social + ads orchestration with autonomous agents | **From $2,500 setup + $799/mo** | up to $7.5K + $2.5K/mo |
| 5 | Knowledge OS / LMS | **Mind Engine** | Onboarding, training, knowledge consolidation | **From $3,500** | $3.5K–25K project |
| 6 | Bid / RFP OS | **Bid Engine** | RFP intelligence and qualification | **From $5,000** | $5K–30K project |

### Pricing strategy (per Bernardo's Decision #3 + agreed compromise)
**Demo-gated** for full pricing. Public **"From $X" floor anchors** on every service page. This:
- Keeps the premium positioning the demo motion implies
- Prevents the 70% of SMBs who self-disqualify when they see no number
- Sets buyer expectation honestly so demos don't waste anyone's time
- Lets Bernardo flex up or down inside the demo without losing trust

### Packaging logic
- **Lighthouse** is the *only* product the visitor can self-serve buy without a call (under $1K total). Every other tier requires a discovery call.
- **Concierge (Dez)** is the natural cross-sell after Lighthouse: "Your new site has visitors — let's give them a real-time agent."
- **Sales / Care / Reach / Mind / Bid Engines** are quoted bespoke in the discovery call.
- **Bundles** are encouraged: any 3 Engines bundled at 15% off list, signed for 12 months.

---

## 5. Prospecting & marketing motion — three loops

### Loop A — Inbound magnet
Owner: the website + Dez + content engine.

Mechanics:
- SEO-first cornerstone content per locale (Section 7)
- Two free interactive tools as lead magnets:
  - **AI Operations Audit** — input business URL → 6-system gap analysis + $ value of fixing each
  - **Lighthouse Live Preview** — input any Google Business URL → see a generated site within 60 seconds
- Dez chat agent on every page in the visitor's locale
- Content pieces *all* end with a CTA into one of the two tools (not a generic "book a demo")

### Loop B — Outbound flywheel (Lighthouse)
Owner: the lead engine + outbound cadence.

Cadence (7-day):
- Day 0: Email with live preview link + 60-sec loom
- Day 2: WhatsApp with one-line pitch + same link
- Day 5: Instagram DM
- Day 8: Phone (or Dez voice when available)
- Day 14: "Closing the loop" email + opt-out

Volume target by month 3: 200 prospected SMBs/week. Conversion target: 2–5% reply, 0.5–1% close on $500+ avg.

### Loop C — Founder-led authority
Owner: Bernardo's content cadence (Decision #4 — full social commitment).

| Channel | Cadence | Format | Goal |
|---|---|---|---|
| YouTube EN | Weekly | 8–15 min talking-head + screen share | SMB founder discovery + agency authority |
| YouTube PT-BR | Weekly | Same format, Brazilian-Portuguese context, BR examples | Brazilian SMB discovery |
| YouTube ES | Biweekly | Same format, LatAm context (México-first) | LatAm SMB discovery |
| LinkedIn | 5–6 posts/week (mostly EN, 1–2 PT-BR) | Mix: insight / case / behind-scenes / hot take | Mid-funnel nurture |
| Instagram | 3–5/week (multi-locale) | Reels + carousels | Brand surface + flywheel social proof |
| Facebook | 3/week (auto-cross from IG) | Same as IG | LatAm older-buyer reach |
| Newsletter (EN/PT-BR) | Monthly | "State of AI Operations for SMBs" | List-build |

### The three loops compound
Loop C (founder authority) drives demand to Loop A (inbound magnet). Loop B (outbound flywheel) generates revenue *and* case studies that fuel Loop C. The closer they reinforce, the lower the cost per acquisition.

---

## 6. Content & SEO map per locale

### EN cornerstone content (priority 1)
**Pages (must ship by end of month 2):**
- Home (Lighthouse-led narrative)
- /lighthouse (sub-product page with live demo)
- /services (the 7 tiers with anchors)
- /about (founder front, employer-redacted)
- /methodology (the "From Pilot Purgatory to Production AI in 4 weeks" page)
- /trust (compliance, methodology, what we don't do)
- /tools/ai-operations-audit
- /tools/lighthouse-preview
- /case-studies (placeholder until first 1–2 ship)

**Articles (12 in 90 days):**
1. "Why 77% of SMBs abandon their AI tools — and how to ship operations that survive year two"
2. "The 4-week protocol: from AI pilot to production"
3. "Google reviews are demand. Why does your favorite local restaurant still have no website?"
4. "AI SDR vs human SDR: the actual math for a 30-person company"
5. "Stack consolidation: replacing 14 SaaS tools with 1 operating system"
6. "The trilingual operator's edge: serving SMBs in EN/PT-BR/ES"
7. "Real-time AI agents on small business websites — what's possible in 2026"
8. "Inside Lighthouse: how AI builds a 5-section website in 60 seconds"
9. "Why your 'AI assistant' isn't an assistant — it's a chatbot"
10. "The compliance map: HIPAA, LGPD, GDPR for SMB AI deployments"
11. "What we built our own agency with — the 10XAI stack, in detail"
12. "State of AI for SMBs 2026: data from 500+ small businesses"

**Comparison pages:**
- /vs/11x-ai
- /vs/artisan
- /vs/aisdr
- /vs/relevance-ai
- /vs/gohighlevel
- /vs/blip
- /vs/durable

**Vertical pages:**
- /for/dental-practices
- /for/accounting-firms
- /for/marketing-agencies
- /for/home-services

### PT-BR localized content (priority 2 — structural moat)
- All cornerstone pages above translated by **native PT-BR speakers, not MT**
- "Estado da IA para PMEs no Brasil 2026" — flagship gated report
- Vertical pages: `/pt/para/clinicas-odontologicas`, `/pt/para/contabilidade`, `/pt/para/agencias-de-marketing`, `/pt/para/restaurantes`
- Comparison pages adapted to LatAm landscape: `/pt/vs/blip`, `/pt/vs/take`, `/pt/vs/manychat`
- Bernardo's PT-BR YouTube channel — distinct content, not subtitles

### ES localized content (priority 3)
- Cornerstone pages translated by **native ES speakers (Mexican variant primary)**
- "Estado de la IA para PYMEs en LatAm 2026"
- Vertical pages
- Bernardo's ES YouTube channel

### Translation guardrail
Machine translation is **not acceptable** for any public copy. Use a native-speaker editor per locale. Budget for this in Section 9.

---

## 7. Tech stack — hybrid (Decision #2)

### Custom (we own)
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** App Router, RSC | Best i18n routing, fastest TTFB, Vercel-native |
| Hosting | **Vercel** | Free tier covers launch; Pro $20/mo when needed |
| DB / auth / storage | **Supabase** | Generous free tier, Postgres, pgvector for RAG, RLS for multi-tenant |
| AI brain | **Anthropic Claude** | Sonnet 4.6 default; Opus 4.7 for high-stakes (Dez, Lighthouse generation) |
| Vector / RAG | **Supabase pgvector** | No separate vendor; Postgres-native |
| Real-time agent (Dez chat MVP) | **LiveKit Agents** in chat-only mode | Production framework; voice-ready when you scale |
| Analytics | **PostHog** | Open-source, strong free tier, EU/US options |

### Buy (subscriptions)
| Need | Choice | Cost |
|---|---|---|
| Email transactional | **Resend** | Free up to 3K/mo, then $20/mo |
| Email marketing | **Beehiiv** or **Brevo** | Free tiers available |
| CRM | **HubSpot Free** → Starter $20/mo | Industry standard, generous free tier |
| Booking | **Cal.com** | Free, open-source, self-hostable later |
| WhatsApp | **Meta Cloud API direct** | Free up to ~1K convs/mo. Apply to Blip Partners later for BSP scale. |
| DNS / CDN / DDoS | **Cloudflare** | Free |
| Code repo | **GitHub** (already done — `bemedrado-glitch/10xai`) | Private, free |

### Estimated monthly run cost
- Launch (≤1K visitors/mo, ~30 Dez chats/mo): **$0–50/mo**
- Moderate scale (5K visitors/mo, 200 Dez chats/mo, 50 Lighthouse generations/mo): **~$150–300/mo**
- Voice/avatar enabled (Phase B/C, later): **add $300–800/mo per active client**

### Build vs. buy decisions explicitly NOT made (yet)
- ❌ Don't build: CRM, booking, transactional email, DNS, vector store-as-a-service
- ✅ Build: marketing site, Dez agent + multi-tenant version, Lighthouse engine (lead-finder + site-gen + outreach orchestrator), knowledge / RAG layer, the public interactive tools

---

## 8. 90-day milestone plan

### Week 1 — Foundation (Days 1–7)
- ✅ Workspace + research (done)
- Brand voice + tone-of-voice doc (1-pager) — define "Nike × Apple" concretely with examples
- Founder-comms guidelines doc (Section 1 above formalized)
- Domain + DNS plan: keep `10xai.us`; add `10xai.com.br`, `10xai.mx` as forwarders if available
- First Dez system prompt + knowledge base (EN baseline)
- Cal.com booking link live
- HubSpot Free instance set up

### Weeks 2–3 — EN site v1 (Days 8–21)
- Next.js + Supabase scaffolded
- i18n routing for `/`, `/pt`, `/es` (PT/ES placeholder content)
- Pages: Home, About, Services (with anchor pricing), Lighthouse, Methodology, Trust, Contact
- Two interactive tools live in EN:
  - AI Operations Audit (input URL → output 6-system gap analysis)
  - Lighthouse Live Preview (input Google Business URL → output generated site)
- Dez chat agent deployed in EN (chat-only — no voice/avatar yet)
- Resend transactional email wired
- Replace current `10xai.us` content (cut over carefully — keep working email + WhatsApp links)

### Weeks 4–5 — Localization (Days 22–35)
- PT-BR translation pass (native speaker)
- ES translation pass (native speaker)
- Dez localized in PT-BR and ES (separate prompt + voice tone per locale)
- First 50 prospects identified for Lighthouse pilot (BR dental + accounting verticals)
- First 4 YouTube videos shipped (2 EN, 2 PT-BR) — topics from Section 6 article list
- LinkedIn cadence begins (5 posts/wk)

### Weeks 6–9 — Pilot Lighthouse (Days 36–63)
- First 10 generated sites for pilot prospects (run by Bernardo + 1 native PT-BR contractor for QA)
- First outreach campaign run — measure reply, call, close rates
- Comparison pages live in EN (7 pages)
- Vertical pages live in EN (4 pages)
- "State of AI for SMBs in LatAm 2026" first draft (gated)
- Refine pricing and messaging based on first 3 sales conversations

### Weeks 10–13 — Compounding (Days 64–90)
- Target: 1–3 paying Lighthouse clients
- First case study published (with permission) — written + video version
- Comparison pages localized to PT-BR + ES
- Vertical pages localized
- 12 YouTube videos total shipped (8 EN, 4 PT-BR; 1–2 ES)
- LinkedIn following grown by 1K+ via cadence
- "State of AI for SMBs 2026" published + email gate live
- **Phase 3 review:** scale flywheel based on pilot data, plan Dez voice + avatar Phase B if economics support it

---

## 9. Budget — fitting $5–15K (Decision #6)

| Line item | Cost | Notes |
|---|---|---|
| Founder hours (Bernardo) | $0 (his time) | Largest input — assume 15–25 hrs/week for 90 days |
| Native PT-BR translator/editor | $1,500–3,000 | Paid per word or hourly — 25–50 pages of localization |
| Native ES translator/editor | $1,500–3,000 | Same |
| YouTube production (light) | $500–2,000 | Mic + lighting + simple edit (Riverside / Descript) |
| Logo + brand polish | $500–2,000 | One-time, 99designs / boutique |
| Paid SaaS (Vercel Pro, HubSpot Starter, Cal.com Pro, Resend) | ~$50–150/mo × 3 = $150–450 | Most start free |
| Anthropic Claude API | ~$100–500 | Powers Dez + Lighthouse + audits during pilot |
| Misc tools (PostHog, domain, monitoring) | ~$100–300 | |
| Buffer (always) | $500–2,000 | |
| **TOTAL 90-day cash spend** | **~$5,000–13,000** | Within budget |

**Most of the build is Bernardo's time.** Lean budget = founder execution. The cash spend is for things only money can solve: native translation, light video, Claude API, base SaaS.

---

## 10. Risks & mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Bernardo bandwidth (FT job + 25 hrs/wk on this) | High | Phase plan + hard week-by-week gate. Cut scope first, never quality. |
| Day-job conflict-of-interest | High | Section 1 redaction policy applied site-wide. Legal review before any content that names competitors of his employer (e.g., comparison pages). |
| Generated sites quality bar | High | Human-in-loop QA gate before any outbound send. Cap pilot at 50 sites total before reviewing rejection rates. |
| LatAm payment friction (BR/MX checkout) | Medium | Use Stripe initially (covers all three), add Pix (BR) and OXXO (MX) by month 4 if revenue concentrates there. |
| Localization quality (MT slip-ups) | Medium | Native-speaker editor per locale. Never publish without review. |
| WhatsApp BSP delay | Medium | Start on Meta Cloud API; volume-justify Blip Partners later. |
| Outbound deliverability / spam complaints | Medium | Strict opt-out; warm sender domain; cap volume at 200/week until reputation solid. |
| Dez hallucinating pricing or making promises | Medium | Hard prompt rule: route any custom-pricing or guarantee question to "let me confirm with Bernardo." Add tests to evals. |
| Founder burnout | High | Treat Bernardo's hours as a non-renewable resource. Aggressive auto-pause if pilot data shows no traction by Day 60. |

---

## 11. Brand voice & naming

### Voice — "Nike × Apple," operationalized
- **Direct, not cute.** "We find businesses with proven demand and build them websites." Not: "Let's transform your digital journey 🚀."
- **Outcome-first, not technology-first.** "Your front desk books appointments while you sleep" beats "AI-powered scheduling agent."
- **Confident, not boastful.** "Built by an operator with 20 years inside revenue technology." Not: "World-class consultant changes the game."
- **Bilingual mind, not translated copy.** Each locale reads native. Idioms welcome where they fit.
- **No jargon walls.** "AI agent," "RAG," "agentic" — used only when there's no plain-English alternative. Define on first use.
- **Founder-tone in first person on About + Methodology.** Brand-tone in third person elsewhere.

### Naming registry (locked names from this strategy)
| Surface | Name |
|---|---|
| Agency | **10XAI** |
| Founder | Bernardo Medrado |
| AI concierge agent | **Dez** (chat-only at MVP; voice + avatar later) |
| Flywheel sub-product | **Lighthouse** |
| Sales OS | Sales Engine |
| Customer Success OS | Care Engine |
| Marketing OS | Reach Engine |
| Knowledge / LMS | Mind Engine |
| RFP OS | Bid Engine |

All names work cleanly in EN / PT-BR / ES. None require localization.

---

## Appendix A — Locked decisions feeding this strategy

| # | Decision | Bernardo's call (2026-04-30) |
|---|---|---|
| 1 | Flagship product | The no-website Google-reviews flywheel → **Lighthouse** |
| 2 | Build vs. buy | **Hybrid** — custom for marketing + Dez + Lighthouse + knowledge; buy commodity infra (HubSpot, Cal.com, Resend, Cloudflare) |
| 3 | Public pricing | **Demo-gated with "From $X" anchors** |
| 4 | Founder content | **Full social** — weekly EN + PT-BR YouTube, biweekly ES, plus IG + FB + LinkedIn |
| 5 | Current employer reference | **Never named in 10XAI public copy** |
| 6 | Budget | **Lean, $5–15K cash + founder time** |
| 7 | Concierge sequencing | **Chat-only Dez at MVP**, voice + avatar later when revenue supports |

---

## Appendix B — What changes if Bernardo wants to revisit

These are the high-leverage levers if any decision turns out wrong:

- **If pilot Lighthouse conversion < 0.5% by Day 60:** Pause outbound, double down on inbound + founder authority. Lighthouse becomes a feature, not the flagship.
- **If Dez chat-only doesn't lift bookings by Day 45:** Either fix the prompt/knowledge or skip Phase B (voice/avatar) entirely until next funding cycle.
- **If LatAm conversion lags US by 2x:** Re-prioritize content + paid budget toward whichever locale converts faster; the trilingual moat is real but compounds at different speeds.
- **If founder-content cadence slips:** Cut to one channel (YouTube EN + LinkedIn) before cutting quality.

---

**Phase 3 begins** when Bernardo signs off on this strategy. First action: scaffold the Next.js + Supabase repo inside `/app` and wire the EN home + Dez chat MVP.
