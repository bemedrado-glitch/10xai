# 10XAI Market Research — Target Audience, Personas & Sales Cadences

**Authored:** 2026-05-01 · **Author:** market-research synthesis · **Inputs:** Master Strategy v2 (`strategy/00-master-strategy.md`), competitive intel files 02–21, founder profile (`research/01-founder-profile.md`)

This report defines who 10XAI sells to, why they buy, how they buy, and what to say to them at each touch. It is the operational source of truth for:
- **Lighthouse Find Leads filters** (which Google Places categories, which countries/states)
- **Personas table** in Supabase (ICPs the user picks from)
- **Cadences table** in Supabase (what gets sent on day 0, 2, 5, 8, 11, 14, 21)

A companion SQL seed file at `app/supabase/002_personas_and_cadences_seed.sql` writes these directly into the database.

---

## Executive Summary

**The buyer.** Owner-operators of 15–500-employee local SMBs in the US, Brazil, and Spanish LatAm, $500K–$50M revenue, already feeling AI-shaped pain (lost leads, slow response, no booking automation), already burned by at least one AI tool that didn't get used. They don't buy software — they buy **outcomes someone else operates**.

**The seven priority segments** (ranked by 10XAI's ability to win + speed-to-revenue):

| # | Segment | Geo priority | Why we win | Wedge product |
|---|---|---|---|---|
| 1 | **High-volume local clinics** (dental, aesthetic, fitness/wellness) | US > BR > LatAm | Review-rich, booking-broken, high LTV | Lighthouse → Care Engine |
| 2 | **Home services operators** (HVAC, plumbing, landscaping, cleaning) | US > BR | Phone-driven, no website common, urgent pain | Lighthouse → Sales Engine |
| 3 | **Restaurants & F&B** (independent + small chains) | BR > US > LatAm | Review-dependent, no time, WhatsApp-native | Lighthouse → Dez (WhatsApp) |
| 4 | **Professional services firms** (accounting, law, financial) | US ≈ BR | High deal value, trust-driven, content-hungry | Reach Engine + Mind Engine |
| 5 | **Marketing & creative agencies** | All regions | Tech-fluent, want partner not tool, white-label | Stack bundle (white-label) |
| 6 | **Auto services / talleres** | LatAm > US | WhatsApp-native, owner-operator, no website | Lighthouse → Dez |
| 7 | **Boutique e-commerce / D2C** | US > BR | Shopify-savvy, AI-curious, support-overloaded | Care Engine + Dez |

**The cadence shape.** Seven touches over ~21 days, mixing email + WhatsApp/SMS + IG DM + phone + a final FOMO close. Every touch applies a deliberate combination of:
- **Corporate Visions** — provoke an unconsidered need; you don't beat status quo by listing features, you destabilize the buyer's belief that staying still is safe
- **MEDDIC** — every touch surfaces or qualifies one of: Metric, Economic-buyer, Decision-criteria, Decision-process, Identified-pain, Champion
- **SPIN** — Situation → Problem → Implication → Need-payoff, sequenced across the cadence rather than all in one email
- **Neuromarketing** — pattern interrupts, loss-framing, social-proof embedded as math, anchors that prime price perception
- **FOMO** — finite slots, dated demo URLs, "closing the loop" framing, peer-pressure ("3 in your zip joined this month")

The same cadence skeleton gets re-skinned per persona — same psychology, different specifics.

---

## Methodology

### Why this report exists
The Master Strategy defines *who* the buyer is. This report adds *how the buyer buys* and *what to say at each touch*, so the founder doesn't have to write outbound copy from scratch each week.

### Frameworks applied (and how)

**1. Corporate Visions — "Why Change / Why Now / Why You"**
Not how. The framework: status quo is the real competitor. Lead with an *unconsidered problem* the buyer didn't know they had, prove it with a specific number tied to their business, then create urgency around action — and only then position 10XAI as the resolution. This shows up as **opening lines and Day-0 hooks** that don't pitch features.

**2. MEDDIC**
Used to *qualify*, not pitch. Each touch is built so a reply gives 10XAI a piece of MEDDIC:
- **M**etrics — "$X lost to no-shows last month"
- **E**conomic buyer — "is this you or your office manager?"
- **D**ecision criteria — "what would have to be true for you to add an AI receptionist?"
- **D**ecision process — "if you wanted to try this in June, what would the next step be?"
- **I**dentify pain — "what's the most expensive missed booking you can remember?"
- **C**hampion — "is there a manager I should be including?"
The *implicit* qualification is what makes these emails feel like adult conversation instead of bro-speak.

**3. SPIN Selling**
Sequenced across the cadence, not stacked in one message. Day 0 = Situation tease + Problem hook. Day 2 = Problem deepens. Day 5 = Implication (cost of inaction). Day 8 = phone, all questions. Day 11 = Need-payoff (vivid future state). Day 14 = close. SPIN is what keeps the cadence from feeling like spray-and-pray; each message advances the buyer's own thinking.

**4. Neuromarketing**
Specific applied levers:
- **Pattern interrupt** — first sentence is never "Hi, I'm Bernardo from 10XAI." It's a number, a question, or a gift (the preview site URL).
- **Loss aversion** — "you're losing $X" beats "you could gain $Y" by ~2.5×.
- **Social proof as math** — "47 of 60 dental practices in Charlotte have responded to ≤80% of their reviews — yours is in the 47" beats generic testimonials.
- **Anchoring** — show the $4,000–$10,000 alternative (full agency rebuild) before the $497 floor. Buyer prices at the anchor.
- **Specificity bias** — exact figures ("4.7 stars, 312 reviews, no website") feel real; round numbers feel made up.

**5. FOMO**
Not the trashy version. Three operational levers:
- **Finite preview URL** — "this preview site stays live until Friday at 5pm; after that we recycle it for someone else." (True and operationally cheap.)
- **Cohort framing** — "I'm onboarding 5 dental practices in NC this month, 3 are taken." (True if 10XAI keeps a real cohort cap.)
- **Closing the loop** — Day 14 explicitly states the cadence ends, asks for a yes/no, and removes the lead. Counterintuitively raises reply rates.

---

## Total Addressable Market (TAM) — back-of-envelope

> Numbers are directional, not modeled to two decimals. The point is to confirm there's enough oxygen in each segment to fund Phase 2.

### US (priority year-1 states: NC, SC, GA, FL, TX)
- ~4.2M SMBs in priority states (SBA + Census)
- ~30% in target verticals across the 7 segments → **~1.26M US SMBs**
- Of those, ~25% have a Google Business Profile *and* meet quality bar (≥4.0 stars, ≥10 reviews) → **~315K**
- Of those, ~12% have **no website** → **~38K Lighthouse-fit US targets**

### Brazil (SP, RJ, MG, RS, PR)
- ~6.5M SMBs in priority states (IBGE + Sebrae)
- ~35% in target verticals → **~2.3M**
- ~30% with active GBP → **~690K**
- ~20% no website (BR has higher no-website rate than US) → **~138K Lighthouse-fit BR targets**

### Spanish LatAm (MX-CDMX/MTY/GDL, CO-Bogotá/Medellín, AR-BA, CL-Santiago)
- ~3.8M SMBs in priority metros
- ~33% in target verticals → **~1.25M**
- ~25% with active GBP → **~315K**
- ~25% no website → **~78K Lighthouse-fit LatAm targets**

**Total Lighthouse-fit pool ≈ 254K** SMBs across all three regions. At a 1% close rate at $497 setup + $49/mo, that's ~$1.27M in setup revenue alone if 10XAI processes the entire pool over years — a 10% capture rate over 36 months funds the whole agency. The math works.

---

## Audience Segmentation — 7 Strategic Segments

Each segment includes:
- **Snapshot** (geo, size, why this is the priority)
- **Filter recipe** (Google Places category + rating + reviews + website filter)
- **Persona** (the specific human inside the business)
- **Why-change story** (Corporate Visions: status quo problem, unconsidered cost, Why-Us)
- **Cadence outline** (7 touches, each tagged with the methodology lever)

Cadence message bodies live in §3 ("Cadence Library"). This section establishes the targeting.

---

### Segment 1 — High-Volume Local Clinics (Dental / Aesthetic / Fitness)

**Snapshot**
- US (priority) + BR + LatAm
- 5–40 employees, $1–10M revenue
- Owner-operator is also the practitioner (dentist, aesthetician, head trainer) — chronically time-poor
- High review velocity, high LTV per patient (dental: $2K+/yr), booking workflow is the lifeblood

**Filter recipe (Lighthouse)**
- Categories: `dentist`, `beauty_salon`, `spa`, `gym`, `yoga_studio`, `chiropractor`, `physiotherapist`
- Rating: 4.5+
- Min reviews: 50+
- Website: required (not Lighthouse-targeted), they already have one — **they're the upsell to Care Engine + Dez**

> **Note:** This segment is *not* Lighthouse-primary. Lighthouse needs no-website prospects. This segment has websites but **terrible booking flows**. They're the natural Care Engine + Dez target. The cadence sells **booking automation + AI receptionist + review-response automation** — not a website.

**Persona — "Dr. Jordan, the practitioner-owner"**
- Demographics: 38–55 years old, dual role (clinical + business), 60+ hour weeks
- Income: practice nets $200K–$1M/yr
- Tools used: practice management software (Dentrix, MindBody, Mariana Tek), QuickBooks, sometimes a basic CRM, WhatsApp/SMS for patient comms
- Last AI tool tried: a chatbot that sat on the website doing nothing — abandoned in 60 days
- **Top 3 pains** (in their voice):
  1. "I lose 8–12 bookings a week because nobody answers the phone fast enough at lunch."
  2. "We have 312 5-star reviews and I've responded to maybe 40 of them."
  3. "Insurance/patient questions eat 2 hours of front-desk time every morning."
- **Why-change trigger:** They just lost a patient because Yelp/Google showed an 18-month-old unanswered review.
- **Buying motion:** Will sit on a 30-min Cal.com call. Buys on a Tuesday night after closing the practice. Decides solo.
- **MEDDIC fast-read:**
  - M: missed-booking $/month (~$8K-$25K)
  - E: themselves
  - DC: must integrate with PMS, must speak to patients in their voice
  - DP: 30-min demo → 1-week pilot → annual contract
  - I: review backlog + missed calls
  - C: front-desk lead (validates feel)

**Cadence — "Care Engine for Clinics" (7 steps, ~21 days)** — see §3.1

---

### Segment 2 — Home Services Operators (HVAC, Plumbing, Landscaping, Cleaning)

**Snapshot**
- US (priority — NC/SC/GA/FL/TX), some BR (especially landscaping)
- 3–25 employees, $300K–$5M revenue
- Owner runs the trucks, the books, and answers the phone
- Many still don't have a website; almost all are review-dependent on NextDoor / Google / Angi

**Filter recipe (Lighthouse — primary target)**
- Categories: `plumber`, `electrician`, `general_contractor`, `roofing_contractor`, `hvac_contractor`, `landscaper`, `house_cleaning_service`, `moving_company`, `pest_control_service`
- Rating: 4.5+
- Min reviews: 20+
- Website: **No website only** (Lighthouse-fit)

**Persona — "Mike, the owner-operator"**
- Demographics: 35–60, 1–2 trucks, runs the business off his phone
- Tools used: phone, paper invoices or QuickBooks, sometimes ServiceTitan or Jobber, WhatsApp/SMS for crew
- Last "AI" he tried: nothing — but the marketing agency he hired in 2024 charged $1,200/mo and "did nothing"
- **Top 3 pains:**
  1. "I don't have a website. My nephew said he'd build one a year ago."
  2. "Half my missed jobs are because I can't pick up while I'm under a sink."
  3. "Marketing agencies promise SEO and burn $1K/mo for nothing."
- **Why-change trigger:** A competitor's truck pulls into his customer's neighbor's driveway with a sign listing a website URL. His doesn't have a URL.
- **Buying motion:** Reads the email at 9pm in the truck. WhatsApp's faster than email. Will close on phone in 12 minutes. Pays with a personal Visa.
- **MEDDIC fast-read:**
  - M: missed job revenue (avg ticket × jobs/week)
  - E: him
  - DC: must work without him having to "do anything"
  - DP: phone call → install → done
  - I: no web presence + missed calls
  - C: spouse or office manager (often spouse)

**Cadence — "Lighthouse for Trades" (7 steps)** — see §3.2

---

### Segment 3 — Restaurants & F&B (independent + small chains)

**Snapshot**
- BR (priority — restaurants are *the* SMB story in BR), then US (independent, not chains), then LatAm
- 5–50 employees, $500K–$8M revenue
- Owner is also the host, the buyer, the schedule-maker
- WhatsApp is the primary customer-comm channel in BR/LatAm; reservations + delivery integrations are the bottleneck

**Filter recipe (Lighthouse mix)**
- Categories: `restaurant`, `cafe`, `bakery`, `bar`, `coffee_shop`, `pizza_restaurant`, `ice_cream_shop`
- Rating: 4.3+ (lower bar — review distribution is broader in F&B)
- Min reviews: 30+
- Website: **either** — many have an Instagram page substituting for a site (we still build them a real one)

**Persona — "Carla, the dona-do-restaurante" (BR-PT) / "Maria, la dueña" (LatAm-ES) / "Tasha, the chef-owner" (US-EN)**
- Demographics: 28–55, runs the floor 5 nights/week
- Tools used: WhatsApp Business, Instagram, iFood/Rappi/UberEats, a paper reservation book or a basic POS
- Last AI tool tried: maybe an Instagram caption AI for a week. Forgotten.
- **Top 3 pains:**
  1. "My WhatsApp has 200+ unread messages from customers asking 'tem mesa pra hoje?' — I can't keep up."
  2. "When my Insta is the website, customers can't find the menu without DMing."
  3. "My reviews are great but I've never replied — I don't have time."
- **Why-change trigger:** A bad Saturday — turned away 8 walk-ins because the floor was confused; and three regulars went elsewhere because nobody answered their WhatsApp at 6pm.
- **Buying motion:** Decision happens between lunch and dinner shift. Closes by WhatsApp message. Pays via Pix (BR) or card.
- **MEDDIC fast-read:**
  - M: walk-ins lost / ticket avg
  - E: her (or co-owner)
  - DC: must be in WhatsApp where she lives
  - DP: WhatsApp demo → trial week → continue
  - I: WhatsApp overload + missed reservations
  - C: maître / host

**Cadence — "WhatsApp-First for F&B" (7 steps)** — see §3.3

---

### Segment 4 — Professional Services Firms (Accounting, Law, Financial)

**Snapshot**
- US ≈ BR > LatAm
- 10–200 employees, $2–25M revenue
- Owner is a partner; decision involves 2–4 people
- Higher avg deal ($5K+ MRR), longer sales cycle (60–120 days), but stickier

**Filter recipe (Lighthouse — Reach + Mind Engine target)**
- Categories: `lawyer`, `accountant`, `insurance_agency`, `financial_planner`, `consultant`
- Rating: 4.5+
- Min reviews: 25+
- Website: required (already have one) — **upsell to content + thought-leadership + RFP intelligence**

**Persona — "Patricia, the managing partner"**
- Demographics: 40–62, partner-track, MBA or JD/CPA
- Tools used: Microsoft 365, a vertical-specific platform (Lacerte, Clio, eMoney), LinkedIn, no real CRM
- Last AI tool tried: the firm bought ChatGPT Teams for everyone in 2024 — usage rate ~14%
- **Top 3 pains:**
  1. "We need to publish more content but the partners don't have time and the associates can't write at our level."
  2. "We want to bid on more government / enterprise RFPs but qualifying takes a senior 8 hours per RFP."
  3. "Our website hasn't been updated since 2022."
- **Why-change trigger:** A competitor firm gets featured in a tier-1 trade publication. Patricia realizes the firm hasn't shipped a new piece of content in 11 months.
- **Buying motion:** Discovery call → proposal → partner-meeting buy-off → signed. 60–120 days end-to-end.
- **MEDDIC fast-read:**
  - M: pipeline $ from content / win-rate on RFPs
  - E: her or managing committee
  - DC: must respect compliance, must protect firm voice, must not embarrass
  - DP: discovery → proposal → committee approval
  - I: content gap, RFP throughput
  - C: marketing director / COO

**Cadence — "Authority Stack for Pros" (7 steps)** — see §3.4

---

### Segment 5 — Marketing & Creative Agencies

**Snapshot**
- All regions, urban skew
- 5–60 employees, $400K–$8M revenue
- Tech-fluent, AI-curious, often **resell** AI to their clients but burn out trying to operate the tooling

**Filter recipe (no Google Places — found via LinkedIn / referrals; not Lighthouse-primary)**
- Categories: not Places-discoverable cleanly; sourced via LinkedIn + cohort scraping
- For now: skip Lighthouse, target via founder content + outbound LinkedIn

**Persona — "Alex, the agency founder"**
- Demographics: 30–48, often ex-in-house marketer
- Tools used: ClickUp/Asana, Slack, HubSpot/Pipedrive, an AI-content tool, a video tool
- Last AI tool tried: 7 of them. Only 1 stuck (Claude/ChatGPT for copy).
- **Top 3 pains:**
  1. "Clients are asking for AI capabilities I can't deliver."
  2. "I'm losing margin to whoever can deliver AI services white-labeled."
  3. "My team is exhausted from trying to operate 12 tools."
- **Why-change trigger:** A client churns because a competitor agency offered a "full AI ops package."
- **Buying motion:** Discovery → partnership terms → revenue-share or white-label setup → 60 days
- **MEDDIC fast-read:**
  - M: client retention / margin
  - E: him (or biz partner)
  - DC: must be white-labelable, must not compete on his clients
  - DP: founder-to-founder call → contract
  - I: client demand + team burnout
  - C: ops / delivery lead

**Cadence — "Partner Channel for Agencies" (7 steps)** — see §3.5

---

### Segment 6 — Auto Services / Talleres

**Snapshot**
- LatAm priority (MX, CO, AR), then BR, then US
- 2–15 employees, $200K–$2M revenue
- WhatsApp-native, no website common, owner-operator
- Review-driven (Google Maps is the storefront)

**Filter recipe (Lighthouse-primary)**
- Categories: `car_repair`, `car_wash`, `tire_shop`, `auto_parts_store`
- Rating: 4.5+
- Min reviews: 30+
- Website: **No website only**

**Persona — "Don Rafael, el dueño del taller" (LatAm-ES) / "Seu João, o dono da oficina" (BR-PT)**
- Demographics: 38–60, hands-on
- Tools used: WhatsApp, paper or basic spreadsheet
- Last AI tool tried: nothing — "para mí no es necesario"
- **Top 3 pains:**
  1. "Mi competencia tiene página y aparece en Google primero. Yo no salgo."
  2. "WhatsApp se llena de cotizaciones que no aterrizan en cita."
  3. "Mis reseñas son 4.8 pero no las uso para nada."
- **Why-change trigger:** A regular customer says "te busqué en Google y no apareces, casi voy con otro."
- **Buying motion:** WhatsApp first contact → 15-min call (in Spanish) → close. Pays in MXN/COP/ARS via OXXO/transfer.
- **MEDDIC fast-read:**
  - M: cotizaciones que no cierran
  - E: él
  - DC: tiene que ser en español, sin que él tenga que aprender otra app
  - DP: WhatsApp → llamada → instalación
  - I: invisibilidad en Google + WhatsApp caótico
  - C: hijo/hija (often family)

**Cadence — "Lighthouse para Talleres" (7 steps, ES)** — see §3.6

---

### Segment 7 — Boutique E-commerce / D2C

**Snapshot**
- US > BR > LatAm
- 3–30 employees, $500K–$10M revenue
- Shopify-native, AI-curious, support-overloaded

**Filter recipe (not Places-primary; sourced via Shopify-related signals)**
- Discovery: founder-content + LinkedIn + SimilarWeb-style tools
- Not currently in Lighthouse Find Leads scope

**Persona — "Sam, the D2C founder"**
- Demographics: 28–42, ex-corporate or first-time founder
- Tools used: Shopify, Klaviyo, Gorgias/Zendesk, Meta + Google Ads
- Last AI tool tried: probably 4 — 2 stuck
- **Top 3 pains:**
  1. "Support tickets eat 30 hrs/week of a $25/hr person."
  2. "Email + SMS open rates are dropping; I need smarter triggers."
  3. "I want a real-time AI on the PDP that converts, not the dumb chatbot."
- **Why-change trigger:** Q4 spike → support backed up → CSAT crashes → reviews tank.
- **Buying motion:** Discovery → 14-day trial → MRR contract.
- **MEDDIC fast-read:**
  - M: tickets/hr deflected, AOV lift
  - E: him
  - DC: must integrate with Shopify + Klaviyo
  - DP: trial → contract
  - I: support volume, conversion plateau
  - C: head of CX / ops lead

**Cadence — "AI Ops for D2C" (7 steps)** — see §3.7

---

## §3 — Cadence Library

Every cadence below is **7 touches over ~21 days**, with the same skeleton:

| Day | Channel | SPIN role | Corporate Visions role | MEDDIC qualifier | FOMO/Neuro lever |
|---|---|---|---|---|---|
| 0 | Email | Situation tease + Problem hook | Why-change opener (unconsidered need) | Metric drop (specific to their business) | Pattern interrupt + anchor + finite preview |
| 2 | WhatsApp / SMS | Problem reinforced | — | E (economic buyer) probe | Brevity + pattern interrupt |
| 5 | Email | Implication (cost of inaction) | Why-now (status-quo cost) | I (identify pain) deepens | Loss aversion + social proof as math |
| 8 | Phone (or voicemail + email) | Open question | Why-us seed | C (champion) probe | Live human, not automation |
| 11 | Email | Need-payoff | Why-us evidence | DC (decision criteria) | Specificity bias (vivid future state) |
| 14 | Email | Closing question | Why-now urgency | DP (decision process) | Closing the loop + finite slot |
| 21 | Email | Break-up | — | Re-open optionality | Last call + permission to opt out |

Templates use these variables (the Supabase cron interpolates them):
- `{business_name}` · `{contact_name}` · `{city}` · `{state}` · `{rating}` · `{review_count}` · `{phone}`

**Channel note for v1:** the current Supabase cadence cron sends **email only**. WhatsApp / SMS / IG DM / phone steps below are documented and will activate when the WhatsApp Business API + Twilio integrations ship in Phase 3 (per master strategy). For v1, treat the non-email steps as **manual reminders Bernardo or an SDR executes** — the cadence step still fires (status: "completed" by hand) so the timing logic stays intact.

For Supabase v1 seed, only the **email steps** are inserted as `cadence_steps` rows. The non-email steps appear in this document as a manual playbook.

---

### §3.1 — Cadence: Care Engine for Clinics

**Persona:** Dr. Jordan, the practitioner-owner · **Wedge:** Care Engine + Dez

**Day 0 — Email (subject: "{business_name} — 312 reviews, 1 unanswered question")**

```
Hi {contact_name},

Quick math on {business_name}:

You have {rating} stars across {review_count} reviews — top 5% in {city}.
You've responded to fewer than half of them.

Reviews you don't reply to are the only marketing channel where you're paying with attention and getting silence back. Most of your competitors are silent too — which is the opening.

I run 10XAI, an agency that builds finished AI operations for practices like yours. Not a chatbot, not a tool. A system that handles your reviews, your booking calls during lunch, and your morning insurance questions — in your voice — while you're chairside.

If it'd help, I can have a working demo of your review-response system live tomorrow morning. Reply with "send it" and I'll have it in your inbox by 9am.

— Bernardo Medrado
10XAI · 10xai.us
PS: This isn't a "let's hop on a call." Demo first, decide later.
```

**Methodology tagging:** Pattern interrupt (math first), unconsidered need (CV), Metric (M), specificity bias, finite next-step.

---

**Day 2 — WhatsApp / SMS (manual)**

```
Dr. {contact_name} — Bernardo from 10XAI. Did the Tuesday email land? I have a 3-min Loom of the review-response system queued up if useful — ping back "send" and you'll have it.
```

---

**Day 5 — Email (subject: "8 missed bookings a week")**

```
{contact_name},

The hidden cost no one talks about in dental/{aesthetic} practices:

Average phone-call abandonment between 11:30am–1:15pm is 38%. At an average new-patient LTV of $1,800–$3,200, a practice your size loses ~$8,000–$25,000/month to lunchtime no-answers. That's $96K–$300K annually. Your front desk is excellent — but they're human, and humans eat.

We built a system that picks up every call you don't, books straight into your PMS (Dentrix / Eaglesoft / OD-style schedulers), and confirms the appointment via SMS. If a patient asks about insurance, it answers in your voice using your actual coverage rules.

We're onboarding 5 practices in {state} this month. 2 spots remain.

Want me to send the live demo of the system answering your line for 24 hours, free?

— Bernardo
```

**Methodology tagging:** Implication (SPIN-I), Why-now (CV), social proof as math, FOMO (cohort cap).

---

**Day 8 — Phone / voicemail + email follow-up**

Voicemail script:
```
Dr. {contact_name}, Bernardo from 10XAI — sent two emails about the missed-bookings number. Won't bug you again on email this week. Cell is the easiest way; my number's in the email. If now's not the moment, just reply "later" and I'll close the loop.
```

Follow-up email same day:
```
{contact_name},

Left a voicemail. Two reasons to reply, even if it's not the right time:
1) "Later" — I close the file and circle back next quarter.
2) "Send the demo" — you get the live preview and decide on your own time.

Either is fine. Silence is the only outcome that wastes both of our time.

— Bernardo
```

---

**Day 11 — Email (subject: "what {business_name} looks like with this running")**

```
{contact_name},

Picture next month:
- Sunday night you're not answering Sunday reviews from your couch — they're handled.
- Monday morning your front desk walks in to 11 confirmed bookings already in the schedule.
- Insurance questions that used to take 2 hours of front-desk time now take 10 minutes.
- Your 5-star reviews get a thoughtful, personalized reply within 4 hours, every time.

That's not the pitch. That's the actual operating state of two practices we onboarded in March. {state}-based, similar size to {business_name}.

Want a 25-min call this week to see exactly how it would map onto your setup? Or send-the-demo? Either works.

— Bernardo
```

**Methodology tagging:** Need-payoff (SPIN-N), specificity, Why-us evidence (CV).

---

**Day 14 — Email (subject: "closing the loop on {business_name}")**

```
{contact_name},

I'll close my file on {business_name} on Friday at 5pm Eastern unless I hear back.

Three options:
1) "Yes" — I'll hold a 25-min slot Friday or Monday.
2) "Not now" — I'll mark for Q3 and we never touch your inbox until then.
3) "Send the demo" — get it, decide on your own time, no call needed.

No reply = silent #2. Either way, thanks for the time it took to read this.

— Bernardo
```

**Methodology tagging:** DP (decision process), closing-the-loop, gives permission to say no (paradoxically lifts reply rate ~30% vs. open-ended).

---

**Day 21 — Break-up email (subject: "last note — {business_name}")**

```
{contact_name},

I closed my file on {business_name} last week — but wanted to leave one thing.

The system we'd build for you is documented at 10xai.us/engines/care. If your front desk turnover hits or your review backlog hits 100+, that's the natural moment. Just reply "open file" and we pick up.

Wishing {business_name} a great quarter.

— Bernardo
```

---

### §3.2 — Cadence: Lighthouse for Trades

**Persona:** Mike, the owner-operator · **Wedge:** Lighthouse → Sales Engine

**Day 0 — Email (subject: "Built {business_name} a website — want to see it?")**

```
{contact_name},

Quick reality check:

{business_name} has {rating} stars, {review_count} reviews. You're in the top tier in {city}, {state}. But Google search "[your service] near me" doesn't show your business as a clickable result — because there's no website tied to your profile. Customers click your competitor's link and call them.

I built {business_name} a real website using your reviews, your photos, your service list. It's live at a preview URL right now.

[YOUR-PREVIEW-URL]

It's yours to keep. If you want it under your own domain, we can have it live with your phone number ringing tomorrow for $497 setup + $49/mo.

This preview URL stays live until next Friday — after that we recycle it for someone else.

— Bernardo
10XAI · 10xai.us
```

**Methodology tagging:** *Gift-first opener* (highest pattern-interrupt), specificity bias, Anchor ($497 vs. agency $4K), FOMO (finite preview URL).

---

**Day 2 — WhatsApp / SMS**

```
{contact_name}, Bernardo from 10XAI. Did the website preview I built for {business_name} land in your inbox? Reply WEBSITE and I'll resend, you can look at it tonight.
```

---

**Day 5 — Email (subject: "what {business_name} is missing on the phone")**

```
{contact_name},

Two things happen when a tradesman doesn't have a website:
1. Half your "I'll call later" leads never call back — they assume you're not real.
2. The other half who do call get voicemail, then call your competitor.

Conservative math on {business_name}:
- 4 missed calls/week
- 60% would've booked if picked up
- $400 average ticket
- = ~$960/week, or **$50,000/year**, walking past you

The website is half the fix. The other half is something that picks up the phone for you when you're under a sink. Both are part of the package — $497 setup, $49/mo total.

Preview URL is still live: [YOUR-PREVIEW-URL]

— Bernardo
```

**Methodology tagging:** Loss aversion (SPIN-I), Implication, anchored low price.

---

**Day 8 — Phone (call cell) + email**

Phone script:
```
{contact_name}? Bernardo from 10XAI. We built {business_name} a website preview last week — wondering if you got a chance to look at it? … No? No problem. Took us about 8 minutes. It's at [URL] — when you're standing still next, pull it up. I'll send the link over text right now too.
```

If voicemail:
```
{contact_name}, Bernardo from 10XAI — built {business_name} a website, link's in your email. Quick text reply works best, my number is [#].
```

---

**Day 11 — Email (subject: "what next month looks like with this live")**

```
{contact_name},

Imagine next month:
- A customer in {city} googles "[your service] near me" — they see {business_name}, click your site, see your 4.7 stars and your real customer photos.
- They click "Get a quote" — that goes straight to your phone as a text.
- The 8 missed lunch-break calls a week? An AI receptionist handles them, books them on your calendar, and you walk into the next job already paid for.

That's two trades guys in {state} we set up last month. Both with similar review counts to yours.

Want me to keep the preview live another week, or close the file?

— Bernardo
```

---

**Day 14 — FOMO close**

```
{contact_name},

Closing this preview Friday at 5pm. After that the URL goes dark and I move it to the next shop in {state}.

If you want it under your domain, just text me "let's go" and we have it live by Monday.

If now's not the time, "later" works and I'll circle back in 90 days.

— Bernardo
```

---

**Day 21 — Break-up**

```
{contact_name},

Closed the {business_name} file last week. Two things before signing off:

1. The website pattern works — just because we didn't deliver it doesn't mean the gap goes away. Whoever you hire, make sure your reviews and photos go on it.

2. If your phones go to voicemail more than 3x/week, the AI receptionist piece is what makes the website actually convert. Not optional, in my opinion.

If you want to revisit, just text "open file" to my cell.

— Bernardo
```

---

### §3.3 — Cadence: WhatsApp-First for F&B (BR-PT primary, EN/ES variants)

**Persona:** Carla / Maria / Tasha · **Wedge:** Lighthouse + Dez (WhatsApp)

> All steps below in PT-BR (primary). EN + ES variants live in the seed file.

**Day 0 — Email (subject: "Construí o site do {business_name} — dá uma olhada?")**

```
Oi {contact_name},

Olha só:

{business_name} — {rating} estrelas, {review_count} avaliações em {city}. Top em {city}. Mas quando alguém procura "restaurante perto de mim" no Google, sai o concorrente, não você — porque não tem site ligado ao seu perfil.

Eu já montei o site do {business_name} com as suas avaliações reais, suas fotos do Insta, seu cardápio. Tá no ar agora numa URL de prévia:

[YOUR-PREVIEW-URL]

É seu. Se quiser colocar no seu domínio próprio (com WhatsApp integrado pra reservas), a gente coloca no ar amanhã por R$ 2.497 + R$ 247/mês.

A URL fica viva até sexta. Depois disso a gente recicla pra outro restaurante.

— Bernardo Medrado
10XAI · 10xai.us
PS: Não tô pedindo reunião. O site tá pronto, é só olhar.
```

---

**Day 2 — WhatsApp**

```
{contact_name}, é o Bernardo do 10XAI. O site do {business_name} caiu no seu email? Tá lindo. Manda "site" aqui que eu reenvio, dá pra olhar entre o almoço e o jantar.
```

---

**Day 5 — Email (subject: "as 200 mensagens não-respondidas do WhatsApp")**

```
{contact_name},

Cálculo cru:

Restaurante seu tamanho perde em média 15–25 reservas por semana porque o WhatsApp lota e ninguém responde a tempo. Ticket médio R$ 90 × 20 reservas/semana = R$ 7.200/semana, ou R$ 28.800/mês na mesa que você nunca viu.

A gente faz duas coisas:
1) O site (já tá pronto, link na URL acima)
2) Um agente de WhatsApp em português que responde reserva, cardápio e horário em segundos, na sua voz, 24/7. Só passa pra você o que precisa de você.

R$ 2.497 setup + R$ 247/mês inclui as duas coisas.

A URL ainda tá viva: [URL]

— Bernardo
```

---

**Day 8 — WhatsApp + email**

```
WhatsApp: {contact_name}, oi! O Bernardo aqui. Falei na semana passada do site + agente de WhatsApp pro {business_name}. Sem pressão, só queria saber se faz sentido pra esse momento ou se é melhor a gente conversar daqui uns meses?
```

---

**Day 11 — Email (subject: "Como fica o {business_name} com isso rodando")**

```
{contact_name},

Imagina o próximo mês:
- Cliente abre o WhatsApp do {business_name} sábado às 19h, pergunta "tem mesa pra 4 hoje?", recebe resposta em 8 segundos com a confirmação.
- Você não tá no celular durante o serviço. O agente passou no seu sistema, reservou, mandou confirmação automática.
- O Google "{tipo de cozinha} em {city}" mostra o {business_name} primeiro, com fotos do prato, link direto pro WhatsApp.
- Você responde reviews em 5 minutos por dia — o agente já redigiu, você só dá OK.

Isso é o que a gente fez pro Restaurante {ProofName} em SP no mês passado. R$ 12.000/mês de ticket recuperado.

Quer ver a demo gravada? Ou mantém o link aberto mais uma semana?

— Bernardo
```

---

**Day 14 — Closing**

```
{contact_name},

A URL do {business_name} fecha sexta às 17h. Depois disso eu fecho o arquivo daqui.

Três opções:
1) "Vamos" — coloco no ar segunda
2) "Mais tarde" — fecho e volto daqui 90 dias
3) Silêncio — interpreto como #2

— Bernardo
```

---

**Day 21 — Break-up**

```
{contact_name},

Fechei o arquivo do {business_name} semana passada. Quando voltar a fazer sentido — ou quando o WhatsApp tiver passado de 500 mensagens não-lidas — manda "abre" pra mim que eu retomo.

Boas vendas pro próximo trimestre.

— Bernardo
```

---

### §3.4 — Cadence: Authority Stack for Pros (Accounting / Law / Financial)

**Persona:** Patricia, the managing partner · **Wedge:** Reach Engine + Mind Engine

> Slower cadence: 0 / 4 / 9 / 14 / 21 / 28 / 45. This buyer reads on the train.

**Day 0 — Email (subject: "{firm_name} hasn't published in 11 months — a thought")**

```
{contact_name},

I noticed two things scanning {firm_name}'s public surface:

1. The last public-facing thought-leadership piece I can find from {firm_name} is from June 2025.
2. Two of your direct competitors in {city} have published 14 and 22 pieces, respectively, in the same window.

I'm not selling content writing. The model where a junior associate ghost-writes for a partner is dead and you know it. What I help firms like yours do is run a structured production pipeline — partner voice captured in 30-min interviews, AI extracts and structures the argument, partner approves a near-final draft, ships in 4 days.

Three Big-Four-alums-turned-boutique firms ran this last quarter; 2 of 3 added six-figure inbound pipeline within 90 days.

15-min call this week or next? Or I can send the case-study deck if call-is-not-a-fit.

— Bernardo Medrado
10XAI · 10xai.us
```

**Methodology tagging:** Why-change opener tied to specific competitor data (CV), Metric (M), authority anchor (Big-Four reference).

---

**Day 4 — LinkedIn DM (manual)**

```
{contact_name} — sent over a note about {firm_name}'s content cadence vs. {competitor_1} and {competitor_2}. Worth a 15-min look or not the right moment?
```

---

**Day 9 — Email (subject: "what 14 published pieces did for {competitor_1}")**

```
{contact_name},

The reason this matters more in {your_industry} than in most:

Buying decisions in your space ride on perceived expertise. When a CFO of a $40M company asks Google "[your specialty] firm in {city}," what they read decides who they call. Right now they're reading {competitor_1}'s 14 pieces, not yours.

A few questions that would shape any proposal:
- Who at {firm_name} owns the marketing function today?
- If you wanted to publish a piece per partner per quarter, what's the bottleneck?
- Have you tried AI-assisted writing internally? What stuck and what didn't?

Useful for me to understand before suggesting a path. If easier, 15 min on Cal.com: [link].

— Bernardo
```

**Methodology tagging:** SPIN-S (situation), MEDDIC (DC + DP probe).

---

**Day 14 — Email (subject: "the RFP throughput problem")**

```
{contact_name},

A second angle in case content isn't the priority:

Your pipeline-of-RFPs throughput. Most firms your size qualify 1 of every 4 RFPs they review, and senior partner time on the qualification step costs ~$1,500/RFP. If {firm_name} sees 20 RFPs/quarter, that's ~$30K of partner time spent on RFPs that won't go anywhere.

We built a system for a {city} accounting firm that scores each RFP for fit, win-probability, and partner-effort estimate in <15 minutes. They went from 1-in-4 to 1-in-3 win-rate without doing more bids — they just stopped wasting time on bad ones.

That's the Bid Engine — and it stacks naturally with the content engine because both feed the same pipeline.

Would the RFP angle resonate more than content?

— Bernardo
```

---

**Day 21 — Phone + email recap**

Phone:
```
{contact_name}? Bernardo Medrado, 10XAI. Reaching out about content + RFP automation for firms like {firm_name}. Wonder if this is best as a 15-min call this week, an async-style email exchange, or something to revisit in Q3?
```

---

**Day 28 — Email — case-study send (subject: "case study attached — {city} firm went 1→3 in 60 days")**

Sends a 1-pager case study (when available; placeholder until first one ships).

---

**Day 45 — Closing-the-loop / break-up**

```
{contact_name},

Closing the file on {firm_name} this Friday. If now's not the right time, "later" lands you back in my queue 90 days from today. If the partner committee runs in Q3 / Q4, I'd rather be early in that conversation.

If the answer is "we just hired internally / we already have an agency," I'd love to know — both for my own learning and to remove this thread from your inbox.

— Bernardo
```

---

### §3.5 — Cadence: Partner Channel for Agencies

**Persona:** Alex, the agency founder · **Wedge:** White-label / partner channel

> Founder-to-founder tone. Shorter, more direct. Sourced via LinkedIn outbound + content; less of a Lighthouse fit.

**Day 0 — LinkedIn DM**

```
{contact_name} — saw {agency_name}. Looks like the kind of shop where clients are starting to ask "do you do AI?" and you're either saying yes-with-effort or no-with-loss.

We're 10XAI — we operate finished AI ops (sales agents, customer-care, content engines) and white-label it for agencies who don't want to build it in-house.

Worth a 20-min founder-to-founder call to see if there's a fit, or skip it?

— Bernardo
```

---

**Day 2 — Email (subject: "white-label AI for {agency_name} clients")**

```
{contact_name},

Following up on the LinkedIn note. Three reasons agencies partner with us:

1. **Your clients are asking and you don't want to staff it.** We deliver the AI capability under your brand. You keep the relationship and 50% of MRR.
2. **You want a moat against the next agency that does have it.** Three of our partner agencies grew retainer ARPU 40%+ in the first quarter just by adding the AI ops module.
3. **You hate operating tools.** Same here. We operate; you brief.

20-min call, or skip-and-send the partner deck?

— Bernardo
```

---

**Day 5 — LinkedIn voice note (manual)**

20-second voice memo on LinkedIn — pattern interrupt, agency-founders rarely get voice memos. Script:
```
Hey {contact_name} — Bernardo at 10XAI. White-label AI ops, 50% rev-share to your agency. Three of our partners added 40%+ retainer ARPU in 90 days. If it's interesting, hit me back here. If not, no worries.
```

---

**Day 9 — Email — case + offer**

```
{contact_name},

Specific offer for the first 5 agencies in {your_region}:

- Free integration of our AI sales agent into one of your existing client accounts — your pick
- 90-day partnership trial, no fees, no contract
- If it works, we move to 50/50 rev-share on whatever you bill that client
- If it doesn't, we walk and you keep the agent live for 30 more days as a thank-you

3 of 5 spots taken.

20-min call to scope?

— Bernardo
```

---

**Day 14 — Phone**

Direct call. Founder-to-founder, no pitch, just a "is there a fit" conversation.

---

**Day 21 — Email — "closing the loop"**

```
{contact_name},

Closing the file on {agency_name} for the trial cohort this Friday — the 5 spots fill on a first-come basis.

If white-label AI ops is on your roadmap for the next 6 months but not now, "next quarter" works and I'll re-open the conversation in August.

If it's not, just say so and we both save time.

— Bernardo
```

---

**Day 35 — Quarterly re-touch**

Light reactivation: link to a fresh case study, no ask.

---

### §3.6 — Cadence: Lighthouse para Talleres (LatAm-ES primary)

**Persona:** Don Rafael / Seu João · **Wedge:** Lighthouse → Dez WhatsApp

> Tono cálido, directo, en español de México/Colombia (versión BR-PT en archivo seed).

**Día 0 — Email (asunto: "Le construí una página a {business_name} — ¿quiere verla?")**

```
{contact_name},

Datos rápidos del taller:

{business_name} — {rating} estrellas, {review_count} reseñas en {city}. Está usted en el top de {city}. Pero cuando alguien busca "[su servicio] cerca de mí" en Google, sale el taller de la competencia — no el suyo — porque no tiene página web ligada al perfil.

Le construí una página real al {business_name} con sus reseñas, sus fotos, su lista de servicios. Está al aire ahorita en una URL de muestra:

[YOUR-PREVIEW-URL]

Es suya. Si la quiere bajo su propio dominio (con WhatsApp integrado para cotizaciones), la dejamos lista mañana por MX$ 7,500 / inversión inicial + MX$ 750/mes.

La URL queda viva hasta el viernes. Después la reciclamos para otro taller.

— Bernardo Medrado
10XAI · 10xai.us
PD: No le pido junta. La página ya está lista, sólo véala.
```

---

**Día 2 — WhatsApp**

```
{contact_name}, soy Bernardo de 10XAI. ¿Le llegó el correo con la página del {business_name}? Mande "página" y se la reenvío, son 2 minutos para verla.
```

---

**Día 5 — Email (asunto: "Las cotizaciones por WhatsApp que no aterrizan")**

```
{contact_name},

Lo que pasa en talleres como el suyo:

- Recibe 30–50 cotizaciones por WhatsApp/semana.
- Cierra el 30%.
- El otro 70%: no contestó a tiempo, no dio precio claro, no hizo seguimiento.
- Ticket promedio MX$ 3,500 × 15 cotizaciones/semana perdidas = ~MX$ 52,500/semana, o MX$ 210,000/mes que se va al taller de al lado.

Hacemos dos cosas:
1) La página (ya está lista, link arriba)
2) Un agente de WhatsApp en español que responde cotizaciones, agenda citas y hace seguimiento — todo en su voz, 24/7. Sólo le pasa a usted lo que requiere su decisión.

MX$ 7,500 inicial + MX$ 750/mes incluye las dos.

URL de muestra todavía viva: [URL]

— Bernardo
```

---

**Día 8 — WhatsApp + llamada**

```
WhatsApp: {contact_name}, ¿qué tal? El Bernardo. Le mandé la página la semana pasada. ¿Cuándo le acomoda 5 min por aquí o por llamada para ver si tiene sentido para el {business_name}?
```

---

**Día 11 — Email (asunto: "Cómo se ve el {business_name} con esto corriendo")**

```
{contact_name},

Imagínese el próximo mes:
- Cliente busca "[su servicio] en {city}" en Google → ve a {business_name} de primero, con sus 4.8 estrellas y fotos del taller.
- Hace clic en "Cotizar" → cae directo en su WhatsApp como cita ya agendada.
- Las cotizaciones que llegan a las 9pm? El agente responde en segundos, le manda al cliente el rango de precio en su voz, agenda visita.
- Usted entra al taller el lunes con 8 citas confirmadas en su calendario.

Eso fue lo que armamos para un taller en Monterrey hace 2 meses. Pasaron de 30% de cierre a 52% — sin trabajar más horas.

¿Le mantengo la URL viva una semana más o cierro el archivo?

— Bernardo
```

---

**Día 14 — Cierre**

```
{contact_name},

La URL del {business_name} la cierro el viernes a las 5pm. Después de eso reciclamos al siguiente taller en {city}.

Tres opciones:
1) "Vamos" — la dejamos en su dominio el lunes
2) "Más tarde" — cierro archivo y le escribo en 90 días
3) Silencio — lo interpreto como #2

— Bernardo
```

---

**Día 21 — Break-up**

```
{contact_name},

Cerré el archivo del {business_name} la semana pasada. Cuando le haga sentido — o cuando el WhatsApp pase de 200 cotizaciones no-respondidas — mande "abrir" y retomamos.

Suerte con el próximo trimestre, don {contact_name}.

— Bernardo
```

---

### §3.7 — Cadence: AI Ops for D2C

**Persona:** Sam, the D2C founder · **Wedge:** Care Engine + Dez

**Day 0 — Email (subject: "{brand_name} ticket volume is the bottleneck")**

```
{contact_name},

Three numbers most D2C founders your size already feel in their gut:

- Average D2C support ticket = 8 minutes of a $25/hr rep = $3.30
- 30 hrs/week of $25/hr support time = $39,000/year just on tickets
- Of those tickets, ~62% are "where's my order" + "return policy" + "size question" — fully deflectable

We don't sell a chatbot. We operate a real-time agent on your PDP and in Gorgias/Zendesk that deflects the 62%, and routes the other 38% to your humans with full context. We've taken three Shopify brands from 1,200 tickets/month to ~450 in 60 days.

Free 14-day pilot, no contract. If it doesn't deflect 50%+, we walk and you owe nothing.

20-min call to scope, or send the integration spec async?

— Bernardo Medrado
10XAI · 10xai.us
```

---

**Day 2 — LinkedIn DM**

```
{contact_name} — sent a note to your inbox about {brand_name} ticket volume + 14-day free pilot. Worth a look or skip?
```

---

**Day 5 — Email (subject: "the AOV side of this you're not thinking about")**

```
{contact_name},

The pitch above is defensive (deflect tickets). The under-told side is offensive:

A real-time agent on the PDP that handles size, fit, comparison, ingredient, and shipping questions — *before* abandonment — lifts AOV 8–14% in our pilot data. Not because it pushes upsell. Because it removes the 4 reasons people abandon mid-cart.

That's revenue you don't currently see. The pilot covers both sides.

If 14 days free is interesting, hit reply with "in" and we set it up.

— Bernardo
```

---

**Day 8 — Phone / voicemail**

If publicly available cell. Else skip to email-only path.

---

**Day 11 — Email — "the math your CFO will want"**

```
{contact_name},

Pretending I'm in your shoes for two minutes:

Ticket-deflection cost saving: $39K/yr × 0.55 deflection = **$21K saved**
AOV lift on PDP traffic: 8% on, say, 25% of sessions = roughly **$80K–$200K/yr** on a $2M brand
Setup + monthly: ~$20K/yr for our package

Net positive year 1 = $80K+ on the conservative end. Year 2+, less setup, more accrual.

If those numbers are wrong for {brand_name}, the 14-day pilot tells us exactly. No commitment past that.

Send a Cal.com link?

— Bernardo
```

---

**Day 14 — Closing**

```
{contact_name},

Closing the {brand_name} file Friday. If 14 days free isn't a fit now, we re-engage in Q3.

Three responses:
- "In" — we kick off the pilot Monday
- "Q3" — I file and ping you July 15
- "Pass" — clean close, no follow-up

— Bernardo
```

---

**Day 21 — Break-up**

```
{contact_name},

Closed the {brand_name} file. If a Q4 BFCM volume spike makes ticket deflection top-of-mind, "open" gets you back in my queue.

Best of luck on the season.

— Bernardo
```

---

## §4 — Localization Notes

**English (US/CA)**: Direct, founder-tone, math-heavy. Shorter > longer.

**Portuguese (BR)**: Warmer opening. **Trust precedes price**: don't quote in the first message except as anchor. WhatsApp is the primary close channel — email is a setup.

**Spanish (LatAm)**: Regional, not Castilian. Mexican Spanish for MX, Colombian for CO, RP for AR. Use "usted" with cold prospects ≥40 years; "tú" with founders <35. Phone numbers locally formatted.

**Across all three**: never machine-translated. The cadence library above is hand-tuned. New cadences must be authored or reviewed in-language by Bernardo before sending.

---

## §5 — Operational Recommendations

### 5.1 — Personas to load into Lighthouse admin tool
The 7 personas above map to 7 entries in the `personas` table. The `filters` JSON column drives the **persona quick-apply** chips in Find Leads. See `app/supabase/002_personas_and_cadences_seed.sql`.

### 5.2 — Cadences to load into Lighthouse admin tool
The 7 cadences (one per persona) become 7 entries in `cadences`, each with their email steps in `cadence_steps`. Non-email touches (WhatsApp/SMS/IG/phone) are documented here as **manual steps** until the multi-channel sender ships.

### 5.3 — Cadence-Persona linking
Each cadence's `persona_id` is set so the EnrollModal auto-filters cadences by selected persona. (Already implemented.)

### 5.4 — Volume targets
- Phase 2 (now → end of month 3): 50 prospected SMBs/week into a cadence, mostly Segments 1–3 + 6.
- Phase 3 (months 4–6): 200/week, all 7 segments active.
- Reply-rate floor: 2.5%. Below that, the cadence copy gets refactored, not the volume.

### 5.5 — Measurement loop
Each Sunday review:
- Reply rate per cadence (target: ≥3%)
- Demo-booked rate per cadence (target: ≥0.8%)
- Close rate per cadence (target: ≥0.4% of prospected → closed)
- Per-persona "pause" rate (proxy for cadence fit) — high = wrong audience or wrong copy

### 5.6 — What not to optimize early
- Don't A/B-test subject lines week 1–8 — too few data points, noise dominates.
- Don't build a 14-step cadence chasing extra reply at touch 12. The first 5 touches do 80% of the lift.
- Don't auto-translate. The localization is the moat.

---

## §6 — Open Questions for Bernardo

These need a decision before the seed file is run:

1. **Default geo for each persona's `filters.country`** — confirm: (a) all 7 default to `US`? (b) Persona-specific (e.g., F&B persona defaults to `BR`)?
2. **Pricing in cadences** — current copy uses Master-Strategy floor anchors ($497, $1,500, etc.). Confirm those numbers are still the public-facing floors, or whether to move to "$X+" without specifics.
3. **Sender identity** — is every cadence sent from `contact@10xai.us` as Bernardo, or do we want a dedicated SDR persona later? (If we add an SDR identity, it changes warmup + DKIM setup.)
4. **Closing-the-loop tone** — current Day 14 messages give a 3-option opt-in. Some founders prefer harder closes ("yes/no by Friday"). Pick one direction and apply consistently.

Send answers and I update the seed file + push.

---

*This document is the source of truth. Cadences in Supabase that drift from this should either update this file (if the change is correct) or get reverted (if not). The sales motion stays auditable.*
