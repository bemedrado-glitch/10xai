# Avatar Concierge — Build Plan (`Dez`)

> **Working name:** "Dez" (Portuguese for *ten* — direct nod to 10X). Bernardo decides final.
> **Goal:** Ship a Piper-equivalent AI sales agent with a live video avatar on `10xai.us` — and productize the same engine as a sellable service.
> See [21-piper-and-avatar-stack.md](../research/21-piper-and-avatar-stack.md) for the underlying research.

---

## What we're building

A real-time conversational AI on the 10XAI homepage. A visitor lands → optional video face appears → voice or chat → Dez qualifies, answers, books a call with Bernardo, and writes everything to the CRM. Trilingual (EN / PT-BR / ES) from day one.

Same engine, repackaged, becomes a flagship service for clients.

---

## Architecture (recap)

```
Next.js page  →  LiveKit (WebRTC)  →  Deepgram STT  →  Claude  →  ElevenLabs TTS  →  Anam avatar
                                                       │
                                                       └→ tool calls (Cal.com, HubSpot, RAG knowledge)
```

**Why these picks** ([full rationale in research doc](../research/21-piper-and-avatar-stack.md)):
- **LiveKit Agents** — open-source orchestration, free up to 1K min/mo, used by OpenAI/Salesforce
- **Deepgram Nova-3** — multilingual STT, fast and cheap
- **Claude Sonnet 4.6** — instruction-following, factual reliability, on-brand control
- **ElevenLabs** — best-in-class multilingual TTS
- **Anam.ai** — 180 ms latency, 70+ languages (incl. PT-BR/ES), BYO Claude, HIPAA-ready
- **HeyGen LiveAvatar** — backup, used later for "talk to Bernardo's digital twin" premium surface

---

## Phased build plan

### Phase A — Chat-only MVP (1–2 weeks)

Goal: a Piper-style AI on the page. No avatar yet. Validate the brain, the knowledge, the booking flow.

Tasks:
1. Knowledge base — write 10XAI's six systems, founder bio, FAQ, pricing rules in 3 languages → store as embeddings (Supabase pgvector)
2. System prompt + tool-call definitions (Claude)
3. Embed chat widget on a staging site
4. Wire booking tool (Cal.com or HubSpot meetings)
5. CRM lead capture (HubSpot or simple Postgres + Slack notifications to start)
6. Internal QA — 50 simulated visitor conversations across 3 languages
7. Deploy behind a feature flag on `10xai.us`

**Cost:** ~$50–200/mo at launch volume. Build effort: ~30–60 founder hours or ~$3–6K agency hours.

### Phase B — Add voice (2–3 more weeks)

Goal: visitor can click "talk" → real-time voice conversation with Dez.

Tasks:
1. LiveKit Agents Python service deployed (Railway / Fly.io / Render)
2. Wire Deepgram STT + ElevenLabs TTS into the LiveKit pipeline
3. Voice activity detection + interruption handling (LiveKit built-ins)
4. Add LiveKit web SDK to the site, with a "Talk to Dez" CTA next to chat
5. Test latency on average residential connections from US, BR, MX
6. Pick voices per language (one EN voice, one PT-BR voice, one ES voice)
7. Deploy + measure conversation-to-booking rate

**Cost:** +~$0.30/min voice infra. Build effort: ~40–80 hours.

### Phase C — Add avatar (1–2 more weeks)

Goal: visitor sees a face that responds in real time.

Tasks:
1. Anam SDK integration into the LiveKit room
2. Pick base avatar (or capture custom — see Phase D)
3. Lip-sync ElevenLabs audio to Anam render
4. UX: avatar starts hidden → visible after first user message → minimizable
5. Browser perf testing — fallback to voice-only on weak connections
6. A/B test: avatar-on vs avatar-off → measure conversion lift

**Cost:** +~$2–5/conversation. Build effort: ~20–40 hours.

### Phase D — "Talk to Bernardo" digital twin (month 2–3, optional premium surface)

Goal: a HeyGen-captured digital twin of Bernardo for the highest-trust touchpoints (e.g., a /book-bernardo page).

Tasks:
1. Bernardo records 2 min footage per HeyGen requirement
2. Train HeyGen Interactive Avatar
3. Use the Lite SDK (BYO LLM) so Claude continues to drive the brain
4. Constrain prompt: this avatar is *Bernardo specifically*, not Dez — different tone, different content scope
5. Deploy as a secondary entry point for high-intent visitors

**Cost:** HeyGen Pro tier (TBD) + ~$3–6/conversation. Build effort: ~10–20 hours.

### Phase E — Productize for clients (month 3–6)

Goal: ship the same engine as a 10XAI service offering.

Tasks:
1. Multi-tenant data model: tenant ID → knowledge base + brand voice + booking calendar + CRM destination
2. White-label theming (agent name, colors, avatar choice)
3. Client onboarding playbook (week 1: knowledge intake; week 2: build; week 3: train; week 4: launch + handoff)
4. Pricing pages on `10xai.us` for the three tiers (Lite / Pro / Avatar)
5. First 3 pilot clients (offered free or discounted in exchange for case study rights — critical for trust gap)

---

## Pricing tiers (productized for clients)

| Tier | Name (working) | Setup | Monthly | Margin |
|---|---|---|---|---|
| Concierge Lite | Chat-only AI agent | $1,500 | $99 | 70%+ |
| Concierge Pro | Voice + chat + booking + multilingual | $3,500 | $299 | 65% |
| Concierge Avatar | Full real-time avatar + voice + chat + multilingual + CRM | $7,500 | $599 | 55% |
| White-label | Agency partners resell | $15,000 + 30% rev share | varies | varies |

These sit 5–10x below enterprise vendors (Qualified, Tavus direct), 3x above commodity chat tools (Drift, Tidio). Whitespace.

---

## Risks & open questions

### Technical risks
- **Avatar latency on weak connections.** LatAm residential broadband varies. Need explicit fallback to voice-only at >300ms RTT.
- **Multilingual turn-taking.** Code-switching (e.g., PT → EN mid-sentence) is real for LatAm executives. LiveKit's multilingual turn detector helps; needs tuning.
- **Hallucination on pricing.** If Dez quotes wrong prices, that's a deal killer. System prompt must hard-block and route to "let me confirm with Bernardo" for any custom-pricing question.
- **Cost runaway.** A single vexatious user could rack up $30+ in one session. Add per-session length caps and per-IP rate limiting.

### Strategic risks
- **Salesforce conflict (Bernardo's day job).** Dez talking about CRM/sales-engagement could attract Salesforce attention if the demo is *too* good. Phase 2 founder-comms guidelines must address this.
- **Avatar fatigue.** Some visitors will dislike a face. The "minimize avatar, keep voice/chat" path must always be one click away.
- **Brand voice drift.** Three languages × six service systems × tone-of-voice consistency is hard. Build evals from day one.

### Open questions for Bernardo
1. **Final agent name?** (Dez / Mira / Iris / other)
2. **Phase D — your face on the site?** (HeyGen digital twin in month 2–3?)
3. **Voice gender per language?** (Dez sounds masculine in PT — do we want a female PT voice as a counterweight, or male across all three?)
4. **CRM target?** HubSpot, Salesforce, or Cal.com + Notion to start lean?
5. **Pilot client list?** Who are 3 SMBs that would let us deploy a pilot in exchange for case study rights?
6. **Sequence preference?** Phase A → B → C → D → E (recommended) or skip straight to C?

---

## Next action

If Bernardo greenlights this plan and the broader Phase 2 strategy, **Phase A (chat-only MVP) can start within 48 hours** — knowledge base intake first.
