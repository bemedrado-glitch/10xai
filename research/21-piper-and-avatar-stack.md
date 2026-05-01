# Piper (Qualified) + Real-Time Avatar Stack — Technical Research

> Captured 2026-04-30. Goal: understand how Qualified built Piper, and how 10XAI can ship something equivalent (with a live avatar layer Piper itself does not have).

---

## Part 1 — What Piper actually is

**Important clarification up front:** Piper is **not** a video avatar. Piper is a multi-modal AI SDR that operates primarily as **chat + voice + email**, with optional video calling in some flows. It's a Salesforce-native conversational engine — not a face.

The "live avatar" experience Bernardo described (a face on the website that talks to visitors) is a **separate, newer category** — Tavus, HeyGen LiveAvatar, Anam, D-ID. Combining a Piper-style brain with a real-time avatar face is more advanced than what Qualified itself ships.

### Piper's actual capabilities

| Capability | Detail |
|---|---|
| **Engagement modes** | Chat (primary), voice, email, optional video calling — all on the website |
| **Core jobs** | Qualify inbound visitors → personalize → book meetings → hand off to human SDR with full context |
| **Architecture** | Salesforce-native (Ranked #1 on AppExchange). Built on Salesforce's Agentforce / Data Cloud foundation. Deep integrations with HubSpot, Marketo, Pardot, Eloqua, Outreach, Salesloft, Demandbase, 6sense, Gong, Slack |
| **Brain** | LLM-driven (publicly hinted at Claude via Anthropic, plus their own Salesforce-tuned models) |
| **Data layer** | Pulls visitor identity, firmographics, intent signals, CRM history → personalizes every interaction |
| **Methodology** | "Agentic Marketing Funnel" — Piper works the entire funnel: top-of-funnel nurture, middle-of-funnel qualification, bottom-of-funnel meeting booking |
| **Scale signal** | 500+ companies, 1,800+ G2 reviews, customers like Sinch ("does work of 13 SDRs"), Emplifi (6x SDR efficiency, 22% more opps), Emburse (3x meetings in 6 months) |

### How Piper differs from a generic chatbot (per their own positioning vs. 1mind)

1. **Data integration depth** — Piper sees Salesforce account history before opening its mouth. Generic chatbots see only the page.
2. **Multi-channel continuity** — When the visitor leaves the website, Piper continues over email. 1mind dies at the page.
3. **Active not passive** — Piper proactively engages high-intent visitors (per Salesforce + 6sense + visitor signals). Generic chatbots wait for the click.
4. **Self-serve controls** — Marketers configure Piper without engineering. 1mind requires a support ticket.
5. **Salesforce-certified architecture** — passed Salesforce security review.

---

## Part 2 — The real-time avatar layer (what Piper does NOT have)

This is where the "live avatar" category lives. Three serious options + one open-source orchestration framework that ties everything together.

### Provider comparison

| Provider | Latency | Languages | BYO LLM | Custom Avatar | Pricing | Key Strength | Key Weakness |
|---|---|---|---|---|---|---|---|
| **Anam.ai** | **180ms** (industry-lowest) | **70+ languages** (95% world coverage) | Yes — GPT, Claude, Mistral, anything | Yes | Not public | Best technical specs; LiveKit + Pipecat integrations ready; HIPAA + SOC-II | Newer, smaller customer base (8K+ builders, no household names yet) |
| **HeyGen LiveAvatar** | "Low-latency" (not specified) | Not specified | Yes (Lite SDK) or No (Full SDK uses HeyGen LLM/TTS) | **Yes — from 2 min of footage** ★ | Not public | Killer custom-avatar workflow (perfect for "Bernardo's digital twin"); enterprise customers (HubSpot, JPMorgan, Workday, Coursera); SOC 2 II + GDPR + CCPA + EU AI Act | Latency unclear; full SDK is opinionated |
| **Tavus** | <500ms | Not specified | Unclear (proprietary Sparrow-1 dialogue model) | Yes | Not public | Proprietary stack (Phoenix-4 render, Raven-1 perception, Sparrow-1 dialogue); enterprise white-label; emotional intelligence | Vendor-locked feel; pricing opaque; positioning aimed at platforms not agencies |

### The orchestration glue: LiveKit Agents

This is the framework that connects the avatar to everything else.

| Property | Detail |
|---|---|
| **What it is** | Open-source framework for real-time voice/video AI agents, built on WebRTC |
| **Scale** | 300K+ developers, billions of calls/year. Customers: OpenAI, Oracle, Salesforce, Deutsche Telekom |
| **Languages/SDKs** | Python + TypeScript |
| **LLM support** | 50+ models out-of-box, 200+ via plugins (incl. Anthropic Claude) |
| **Voice providers** | Deepgram (STT), Cartesia (TTS), ElevenLabs, OpenAI Realtime — all swappable |
| **Avatar providers** | Tavus, HeyGen, Anam — all integrate via plugins |
| **Built-in features** | Noise cancellation, end-of-turn detection, interruption handling, multilingual turn detection, SIP telephony |
| **Pricing** | Free Build plan: 1,000 agent session minutes/mo + LiveKit Inference credits + 1 free US phone number. Then usage-based. |
| **Open source** | Yes — `livekit/agents` 10.3K stars; `livekit/livekit` 18.4K stars |
| **Enterprise compliance** | SOC 2 Type II, GDPR, CCPA, HIPAA |

### Recommended provider selection for 10XAI

**Avatar layer → Anam.ai** (primary choice)

Why:
1. **180ms latency** — perceptually instant. Tavus's <500ms is good; Anam's 180ms is conversation-grade.
2. **70+ languages with native voices** — covers EN, PT-BR, ES natively. The biggest competitive moat for 10XAI is trilingual delivery; Anam delivers it natively.
3. **BYO LLM = use Claude.** Anthropic alignment matters: Claude's instruction following + factual reliability outperforms others for sales agents that must stay on-brand.
4. **LiveKit + Pipecat integration ready** — production-grade out of the box; no custom orchestration work.
5. **HIPAA + SOC-II** — required for healthcare verticals (Bernardo's MedTech background means he'll likely sell to dental/medical SMBs early).

**Backup → HeyGen LiveAvatar** for the "Bernardo's digital twin" feature

The 2-minute custom avatar capture is genuinely killer. If Bernardo wants an AI version of *himself* on the site (very on-brand for a founder-led agency), HeyGen does this best. Could ship as a secondary avatar option for high-touch enterprise demos.

**Don't use Tavus first.** Stronger brand and proprietary stack, but vendor-locked, opaque pricing, and aimed at platform builders rather than agencies. Revisit in 12 months if Anam disappoints.

---

## Part 3 — The complete stack architecture for a Piper-equivalent + avatar

```
                         BROWSER (10xai.us)
                  ┌─────────────────────────────┐
                  │  Next.js page                │
                  │  + LiveKit web SDK (WebRTC)  │
                  │  + Anam avatar canvas        │
                  └──────────────┬──────────────┘
                                 │
                                 ▼
                ┌────────────────────────────────────┐
                │  LIVEKIT CLOUD (free tier → paid)  │
                │  — WebRTC room                      │
                │  — Routing                          │
                │  — Recording / observability        │
                └─┬──────────────┬─────────────┬─────┘
                  │              │             │
                  ▼              ▼             ▼
        ┌───────────────┐ ┌──────────┐ ┌──────────────┐
        │ Deepgram STT  │ │ Claude   │ │ ElevenLabs   │
        │ (multilingual)│ │ Sonnet   │ │ TTS          │
        └───────────────┘ │ 4.6      │ └──────────────┘
                          └────┬─────┘
                               │ tool calls
                               ▼
                ┌───────────────────────────────┐
                │  AGENT BACKEND (Python)        │
                │  — LiveKit Agents framework    │
                │  — Knowledge base (RAG)        │
                │  — Booking (Cal.com / HubSpot) │
                │  — CRM sync (HubSpot or SFDC)  │
                │  — Lead capture + handoff      │
                └────┬───────────────────────────┘
                     │
                     ▼
                ┌──────────────────────────┐
                │  ANAM.AI                 │
                │  — Render face           │
                │  — Lip-sync to TTS audio │
                │  — Stream back via       │
                │    LiveKit room          │
                └──────────────────────────┘
```

### Component-by-component cost estimate (per 5-min conversation)

| Component | Provider | Approx. cost |
|---|---|---|
| WebRTC routing | LiveKit (free up to 1K min/mo) | $0 free tier, then ~$0.002/min |
| Speech-to-text | Deepgram Nova-3 | ~$0.026 (5 min × $0.0043/min) |
| LLM brain | Claude Sonnet 4.6 (~2K tokens/min) | ~$0.05–0.20 |
| Text-to-speech | ElevenLabs (~700 chars/min) | ~$0.05–0.10 |
| Avatar render | Anam.ai (estimate) | ~$2–5 (largest cost) |
| **Total per 5-min conversation** | | **~$2.50–$5.50** |

**Math for 10XAI:** if 1 in 20 conversations books a $2,500 engagement, and each conversation costs $5, the unit economics are extraordinary (~500x multiple before factoring infra and Bernardo's time).

### Knowledge base / brain training

The agent should be trained on:
1. **10XAI's six service systems** (full descriptions, FAQs, pricing if any)
2. **Founder bio** (Bernardo's background, credentials, language fluency)
3. **Case studies** (when they exist — until then, the public examples currently on 10xai.us)
4. **Pricing logic** (qualifying questions to map a visitor to the right service tier)
5. **Booking rules** (what calendar slots are available, qualifying gates before booking)
6. **Compliance / off-topic policy** (what NOT to say — never give legal/financial advice; never promise specific revenue outcomes; refer compliance topics to humans)

Pattern: structured system prompt + RAG against a markdown knowledge base + tool calls (book meeting, capture email, send to Slack/HubSpot).

---

## Part 4 — Naming the agent

The agent name will appear hundreds of thousands of times. It must:
- Work in EN / PT-BR / ES without translation
- Be short (1–2 syllables)
- Carry "Nike × Apple" energy — confident, contemporary, not cute
- Ideally pun on 10X or AI

### Three best candidates

| Name | Rationale | Pronunciation |
|---|---|---|
| **Dez** | Portuguese for "ten." Direct nod to 10X. Works as a name in EN. Short. Distinctive. | "deh-z" (PT) / "dez" (EN) — same |
| **Mira** | Means "look" (imperative) in PT/ES — perfect verb for a guide who *shows you* something. Classical name. Trilingual. | "MEE-ra" — same in all three |
| **Iris** | Classical name, instant credibility, professional. Vision/iris metaphor for "AI eyes on your business." Same spelling everywhere. | "EE-ris" (EN/ES) / "EE-rees" (PT) — close enough |

### Honorable mentions
- **Tina** (T-shape echoes "10x")
- **Lia** (PT-BR feminine, friendly)
- **Nova** (universal, "new")
- **Vera** (Latin "truth", trilingual)
- **Maya** / **Sofia** / **Ana** (overused in AI products — avoid)

### Recommendation
**Dez** is the strongest. The 10X pun is on-brand, the name is uncommon enough to avoid AI-product fatigue, and it is the same word in EN/PT/ES. *"Talk to Dez"* on the site is direct, friendly, and culturally resonant in Brazil specifically.

If Bernardo prefers a feminine voice (the Piper / Ava / Alice pattern), **Mira** is the strongest option.

Final call belongs to Bernardo — happy to defer or generate more options.

---

## Part 5 — Productizing this for 10XAI clients

The same stack is **the most sellable AI agency offering in the entire research set**. Why:

1. **It's visible.** SMBs can see, hear, and talk to the agent before buying. No enterprise sales cycle needed.
2. **It's the highest-margin, lowest-incumbent service.** No SMB platform (Durable, GHL, Hocoos) ships this. No mid-market agency (Morningside) productizes it.
3. **The founder's healthcare + medtech background opens a unique vertical.** "Real-time AI receptionist + booking agent" for dental practices, clinics, accounting firms — Bernardo's existing 10XAI ICP is a *perfect* avatar use case.
4. **It's a perfect "no-website flywheel" upsell.** After 10XAI generates a website for a high-Google-reviews local business, the next product is the avatar concierge. The same lead → two products.

### Suggested productized tiers (rough draft for Phase 2)

| Tier | What it includes | Approx. price | Margin |
|---|---|---|---|
| **Concierge Lite** | Chat-only AI agent, 1 language, basic CRM sync, 5 hrs setup | $1,500 setup + $99/mo | 70%+ |
| **Concierge Pro** | Voice + chat, 1–2 languages, calendar booking, knowledge base | $3,500 setup + $299/mo | 65% |
| **Concierge Avatar** | Full real-time avatar (Anam) + voice + chat + multilingual + CRM + handoff | $7,500 setup + $599/mo | 55% |
| **White-label / agency** | We build it; you brand it; recurring revenue share | $15K setup + 30% rev share | varies |

These prices are 5–10x below what enterprise vendors (Qualified, Tavus, HeyGen direct) charge, and 3x what GHL/Drift charge for chat-only. **Wide-open lane.**

---

## Open questions for Phase 2 / Phase 3

1. **Bernardo's call: which agent name?** Dez, Mira, Iris, or other?
2. **Bernardo's voice & face on site, or a standard Anam avatar?** HeyGen could capture his face from 2 min footage; Anam is faster to ship. Recommend: ship Anam standard avatar first (week 2), add HeyGen Bernardo-twin later (month 2–3) as a premium "talk to the founder" surface.
3. **Scope of the first build.** MVP-0 (chat-only Piper-clone) ships in 1–2 weeks. Avatar is 4–6 weeks total. Do we sequence that way, or push straight to avatar?
4. **CRM choice.** HubSpot, Salesforce, or Cal.com + Notion? Affects every integration.
