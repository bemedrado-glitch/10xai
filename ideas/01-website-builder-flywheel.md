# Idea — "No-Website Reviews" Flywheel (Flagship Lead Engine)

> Captured from Bernardo on 2026-04-30. This is potentially **the** signature 10XAI prospecting product — both a service to sell and an internal lead-gen engine for the agency itself.

---

## The idea (verbatim direction)

> "Find all the small companies with great reviews on Google but that don't have a website. Use Claude to build them a website. Reach out to them, then sell it ready-to-go."

---

## Why this is a great wedge

1. **The qualification is the proof.** A business with great Google reviews already has paying customers and reputation — they're a real business with real demand, just missing a digital storefront. Conversion logic: *if the reviews work without a site, imagine with one.*
2. **The cold outreach has a built-in hook.** Email/WhatsApp opens with "Here's the website I built for you — already live, ready to launch under your domain. Want to see it?" That is *categorically* different from "Hi, I do websites." It's a finished asset, not a pitch.
3. **AI cost has collapsed.** Generating a tailored 5-section site from Google Business Profile + reviews costs cents. Margin is enormous if even 2–5% convert.
4. **Repeatable + automatable.** Every step (finding leads, generating sites, drafting outreach, follow-up cadence) is a workflow — i.e., exactly what 10XAI sells to *other* SMBs as a service. The flywheel becomes a public case study: "we built our agency on this same automation."
5. **Land-and-expand.** Sell the website as the foothold; upsell to AI sales agent, LMS, customer service automation. The site is a $X engagement that opens a $XX–$XXX/mo retainer door.

---

## Pipeline (the 7-step engine)

1. **Source.** Pull Google Business Profile data (Places API or scraping fallback) for a target geo + vertical with filters: ≥4.5 stars, ≥20 reviews, no website field, active in last 12 months.
2. **Enrich.** Pull reviews, photos, hours, contact (phone, WhatsApp), category, owner-response history (signal of engagement).
3. **Generate.** Claude generates a tailored multi-page website draft (hero, services, reviews carousel, contact, hours, location). Brand pulled from photos via vision; copy in the local language.
4. **Stage.** Auto-deploy to a temporary preview URL (Vercel preview, Netlify draft, or in-platform iframe).
5. **Reach out.** Multi-channel cadence — email, WhatsApp, Instagram DM, phone — with a personalized loom or screenshot of *their* live preview.
6. **Close.** Inbound conversation → booking with the 10XAI team (or self-serve checkout for $X one-time + optional $X/mo hosting+updates).
7. **Expand.** Post-purchase, intro the AI customer service agent, the booking automation, the LMS for staff training. The website was the wedge.

---

## What we'd need to build (rough scope)

- **Lead-finder tool** (Google Places API integration; this is the prospecting "magic")
- **Site-generation pipeline** (template + Claude + brand-extraction + deploy)
- **Outreach cadence engine** (email + WhatsApp + DM templates with personalization tokens)
- **Conversion landing page** (preview + "claim your site" flow)
- **Internal CRM / pipeline view**

This is also exactly what we'd sell as a **productized service** to e.g. local marketing agencies that want to do the same in their territory.

---

## Productization paths

- **Path A — In-house lead engine.** 10XAI uses this internally. Public positioning: "we ate our own dog food."
- **Path B — White-label SaaS.** Local marketing agencies buy access to the engine. Recurring revenue.
- **Path C — DFY service.** 10XAI runs the engine for a client in their geo + vertical. One-off campaign with a results guarantee.
- **Path D — Combo.** A + (B or C) — internal flywheel + external monetization.

Phase 2 strategy report should pick a primary path.

---

## Risks & considerations

- **Google ToS** for Places API has data display + commercial-use rules; check before deploying at scale. Scraping is grayer.
- **Spam compliance.** US (CAN-SPAM), Brazil (LGPD), Mexico/AR/CO etc. — outreach cadences must respect opt-out, identification, and B2B/B2C distinctions.
- **WhatsApp Business API** rate limits + template approval for proactive outreach.
- **Quality bar.** A bad auto-generated site is worse than no outreach. Human-in-the-loop QA gate before send is non-negotiable.
- **Domain handling.** Either use the business's existing domain (rare for non-website businesses) or register/transfer one as part of the package.

---

## Why this could be the marquee product

Most AI agencies sell *consulting hours* or *agent licenses*. This sells **finished, working assets to businesses that already have customers**. The buyer's risk is near zero. The economics for 10XAI are exceptional. The story for the site is unbeatable: every feature 10XAI sells, 10XAI itself uses to acquire customers.

This deserves its own dedicated landing page on the new site, and likely its own brand within the 10XAI portfolio.
