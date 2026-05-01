import type { Engine } from "@/components/EngineCard";

/**
 * Extended engine record with everything the detail page needs.
 * Home page only uses the core Engine fields; detail page uses the rest.
 */
export type EngineDetail = Engine & {
  slug: string;
  /** One-line value prop  shown under the H1 on the detail page. */
  valueProp: string;
  /** 24 sentence narrative for the detail-page intro. */
  longDesc: string;
  /** Bullets for "Who this is for". */
  whoFor: string[];
  /** Capabilities  shown as a feature grid. */
  features: Array<{ title: string; desc: string }>;
  /** 4-step deployment timeline. */
  process: Array<{ week: string; deliverable: string }>;
  /** Tooling we wire into. Optional. */
  integrations?: string[];
  /** Page-level CTA  defaults to "Book a Call" for non-Lighthouse engines. */
  primaryCta?: { label: string; href: string };
};

export const ENGINES: EngineDetail[] = [
  {
    slug: "lighthouse",
    iconKey: "lighthouse",
    name: "Lighthouse",
    tag: "Lead engine",
    desc: "Find your ideal contacts by ICP. Enrich emails and LinkedIn. Auto-enroll into personalized cadences.",
    valueProp:
      "AI Sales Development Platform that turns an ICP definition into booked pipeline — contact discovery, enrichment, and multichannel cadence in one automated workflow.",
    longDesc:
      "Lighthouse is the contact-to-cadence engine. You define who you want to reach — industry, title, geography. Lighthouse scans 50M+ verified contacts, filters by your ICP, enriches email deliverability and LinkedIn signals, and auto-enrolls qualified leads into a personalized multichannel cadence. Your reps wake up to replies, not to prospecting.",
    details: [
      "ICP-based contact discovery across 50M+ verified records",
      "Email deliverability verification and LinkedIn enrichment",
      "Auto-enrollment into personalized multichannel cadences",
    ],
    bestFor: "B2B operators and agencies targeting SMB decision-makers in defined verticals",
    anchor: "From $1,500 + $499/mo",
    href: "/lighthouse-demo",
    whoFor: [
      "Sales-led teams who spend too much time on manual prospecting",
      "Agencies that need to generate pipeline for multiple clients simultaneously",
      "Operators entering a new vertical or geography and need qualified contacts fast",
      "Anyone replacing a full-time SDR with an always-on AI pipeline engine",
    ],
    features: [
      {
        title: "ICP-driven discovery",
        desc: "Define industry, job title, location, and company size. Lighthouse scans verified contact databases and surfaces only the leads that match your exact criteria.",
      },
      {
        title: "Deep enrichment",
        desc: "Every contact gets email deliverability verification, LinkedIn profile enrichment, and intent signal scoring — so every touch lands on a real, reachable decision-maker.",
      },
      {
        title: "Personalized cadence enrollment",
        desc: "Contacts are auto-enrolled into multichannel cadences (email, LinkedIn, WhatsApp) tailored to their persona, industry, and signal. Each touch is personalized — not templated.",
      },
      {
        title: "Compliant by design",
        desc: "CAN-SPAM, LGPD, and regional outreach laws baked in. Opt-out one-click. Volume-throttled to protect sender reputation.",
      },
    ],
    process: [
      { week: "Week 1", deliverable: "Define ICP, configure filters, pull first batch of 100–200 qualified contacts, draft cadence voice." },
      { week: "Week 2", deliverable: "Enrich contacts, QA enrichment output, launch first cadence batch across all channels." },
      { week: "Week 3", deliverable: "Triage replies, book discovery calls, refine targeting based on reply patterns." },
      { week: "Week 4", deliverable: "Measure: open rate, reply rate, call rate. Tune cadence + ICP for next cohort." },
    ],
    integrations: ["LinkedIn Sales Navigator", "Apollo.io", "Resend", "Cal.com", "WhatsApp Business", "Claude (Anthropic)"],
    primaryCta: { label: "Try the live demo", href: "/lighthouse-demo" },
  },
  {
    slug: "sales",
    iconKey: "sales",
    name: "Sales Engine",
    tag: "AI SDR",
    desc: "Autonomous outbound that books meetings while you sleep.",
    valueProp:
      "An AI SDR built around your ICP, your CRM, your tone. Books qualified meetings into your calendar without adding headcount.",
    longDesc:
      "Most SMBs can't afford an SDR team but still need pipeline. Sales Engine fills the gap with a 24/7 outbound agent that runs multichannel cadences, adapts to intent signals, and books only qualified meetings. We tune it to your ICP, your tone of voice, and your CRM  not a generic template.",
    details: [
      "Multichannel cadences across email, LinkedIn, and WhatsApp",
      "Daily-fresh prospect lists from real-time intent signals",
      "Books qualified meetings directly into your calendar",
    ],
    bestFor: "B2B SaaS, agencies, consulting firms with sales gaps",
    anchor: "From $1,500 + $499/mo",
    whoFor: [
      "B2B service firms with no dedicated SDR function",
      "Founders running their own outbound and losing focus on closing",
      "Mid-market sales teams that want to expand coverage without hiring",
      "Operators tired of expensive outreach tools that don't ship results",
    ],
    features: [
      {
        title: "Intent-driven targeting",
        desc: "We build daily-fresh prospect lists from public signals  funding rounds, leadership hires, tech-stack changes, hiring posts.",
      },
      {
        title: "Multichannel orchestration",
        desc: "Email, LinkedIn, WhatsApp, and phone  every touch picks up where the last left off. No duplicate outreach, no missed handoffs.",
      },
      {
        title: "Qualification before booking",
        desc: "Bernie-style qualification logic ensures the meetings that hit your calendar are real opportunities  not noise.",
      },
      {
        title: "Brand voice matters",
        desc: "We train the agent on your past best-performing emails, LinkedIn posts, and call transcripts. Outreach reads like you, not like a bot.",
      },
    ],
    process: [
      { week: "Week 1", deliverable: "ICP workshop, voice training, CRM integration, baseline metrics captured." },
      { week: "Week 2", deliverable: "Cadences drafted, prospect lists curated, agent deployed in shadow mode." },
      { week: "Week 3", deliverable: "Live outbound with 50100 prospects/week. Real-time monitoring." },
      { week: "Week 4", deliverable: "First-meeting baseline measured. Tuning. Scale-up plan for month 2." },
    ],
    integrations: ["HubSpot", "Pipedrive", "Salesforce", "LinkedIn Sales Navigator", "Cal.com", "WhatsApp Business", "Apollo", "Clay"],
  },
  {
    slug: "care",
    iconKey: "care",
    name: "Care Engine",
    tag: "Customer Success",
    desc: "Real-time AI customer service, booking, and AI-powered review responses.",
    valueProp:
      "A 24/7 customer-service operating system across web, WhatsApp, and email  plus booking automation and AI-powered review responses.",
    longDesc:
      "Care Engine is what happens when an AI agent actually understands your business, your hours, your services, and your tone. It triages tier-1 support, books appointments, recovers abandoned carts, and responds to public reviews  all while routing the genuinely hard issues to a human.",
    details: [
      "24/7 AI agent handles tier-1 support across web + WhatsApp + email",
      "Booking automation tied to your calendar and team availability",
      "AI review responses that protect and grow your reputation",
    ],
    bestFor: "Service businesses with customer-volume pressure",
    anchor: "From $1,500 + $499/mo",
    whoFor: [
      "Clinics, salons, and service shops getting buried in WhatsApp",
      "E-commerce brands with high-volume tier-1 inquiries",
      "Businesses with a Google review profile they're not actively responding to",
      "Owner-operators losing evenings to customer messaging",
    ],
    features: [
      {
        title: "Real-time multichannel agent",
        desc: "Same agent across your website chat, WhatsApp inbox, and email. Context follows the customer across channels.",
      },
      {
        title: "Smart booking",
        desc: "Live calendar sync, rules for staff and service durations, deposit collection, automated reminders, no-show recovery.",
      },
      {
        title: "AI review responses",
        desc: "Drafts personalized responses to every Google review on autopilot  human reviews the queue once a week, then publishes.",
      },
      {
        title: "Human escalation by design",
        desc: "Hard rules: refunds, complaints, anything price-changing  the agent collects context and routes to a human within minutes.",
      },
    ],
    process: [
      { week: "Week 1", deliverable: "Service catalog + FAQ + escalation rules captured. Calendar + WhatsApp wired." },
      { week: "Week 2", deliverable: "Agent trained, voice tuned, shadow-mode deployment for QA." },
      { week: "Week 3", deliverable: "Go-live on web + WhatsApp. Review-response queue starts." },
      { week: "Week 4", deliverable: "First-month metrics: response time, resolution rate, booked appointments. Tuning." },
    ],
    integrations: ["WhatsApp Business", "Cal.com", "Acuity", "Google Business Profile", "Stripe (deposits)", "Twilio", "Resend"],
  },
  {
    slug: "reach",
    iconKey: "reach",
    name: "Reach Engine",
    tag: "Marketing",
    desc: "Content, social, and ads on one autonomous track  in your brand voice.",
    valueProp:
      "Content generation, social orchestration, and ad operations on one autonomous track  trained on your tone, multilingual where it matters.",
    longDesc:
      "Marketing teams of one (or zero) can't keep up with the channels their buyers expect. Reach Engine runs the constant work  blog posts, LinkedIn carousels, Instagram reels copy, ad variations  in your brand voice, in three languages, with a human approval gate before publish.",
    details: [
      "Content generation in your brand voice, multilingual",
      "Social orchestration across LinkedIn, Instagram, Facebook",
      "Ad operations with performance feedback loops",
    ],
    bestFor: "Brands needing constant content with lean teams",
    anchor: "From $2,500 + $799/mo",
    whoFor: [
      "Founder-led brands posting inconsistently because the founder is busy",
      "Agencies that want to scale client deliverables without scaling headcount",
      "Multilingual brands tired of low-quality machine translations",
      "Anyone running ads without the time to test 30 creative variations a week",
    ],
    features: [
      {
        title: "Brand-voice training",
        desc: "We feed the agent your past 50 best posts, top-performing ads, and a one-page voice guide. Output reads like you, not like a generic generator.",
      },
      {
        title: "Multichannel calendars",
        desc: "Blog, LinkedIn, Instagram, Facebook, X  one source of truth, native publishing per channel, no copy-paste fatigue.",
      },
      {
        title: "Ad-variant factory",
        desc: "Spin up 1530 variants per campaign. Auto-pause losers, scale winners, keep your spend efficient without constant manual review.",
      },
      {
        title: "Human approval gates",
        desc: "Nothing publishes without a quick human review. The agent does the 90% of work; you keep editorial control on the last 10%.",
      },
    ],
    process: [
      { week: "Week 1", deliverable: "Voice guide, content pillars, channel inventory, brand voice training data captured." },
      { week: "Week 2", deliverable: "First content week drafted, scheduling system live, ad-variant generator wired." },
      { week: "Week 3", deliverable: "First two weeks of content published. Engagement baselines measured." },
      { week: "Week 4", deliverable: "Voice tuning, performance review, scale-up plan for month 2." },
    ],
    integrations: ["LinkedIn", "Instagram Graph API", "Facebook Pages", "X (Twitter)", "Beehiiv", "Resend", "Google Ads", "Meta Ads"],
  },
  {
    slug: "mind",
    iconKey: "mind",
    name: "Mind Engine",
    tag: "LMS / Onboarding",
    desc: "Knowledge consolidation and role-based training, deployed as an AI tutor.",
    valueProp:
      "Knowledge consolidation and role-based training deployed as an AI tutor  for onboarding new hires and continuously training the team you have.",
    longDesc:
      "Most SMBs lose three weeks of productivity every time they hire someone new because their training material is in three Slack channels, two Google Docs, and one founder's head. Mind Engine consolidates the actual knowledge into role-based AI tutors that ramp new hires in days  and keeps the team current as policies and products evolve.",
    details: [
      "Pulls knowledge from your existing docs, SOPs, and Slack",
      "Role-based onboarding paths that ramp new hires faster",
      "Continuous training on policy + product changes",
    ],
    bestFor: "Teams growing fast or with high turnover",
    anchor: "From $3,500",
    whoFor: [
      "Service businesses with high front-line turnover",
      "Companies onboarding 3+ people per quarter",
      "Operators whose 'training material' is mostly tribal knowledge",
      "Teams running on documents nobody reads",
    ],
    features: [
      {
        title: "Knowledge ingestion",
        desc: "We pull from Notion, Google Docs, Slack, Confluence, PDFs  whatever you have  and consolidate it into a single source of truth.",
      },
      {
        title: "Role-based tutoring",
        desc: "Different roles, different paths. The AI tutor adapts to where someone is, what they need, and how they best learn.",
      },
      {
        title: "Always current",
        desc: "When you change a policy or launch a new product, we re-ingest. Every team member gets the update without an all-hands.",
      },
      {
        title: "ATD-grade pedagogy",
        desc: "Built by an ATD Master Trainer-credentialed founder. Real instructional design, not just a chatbot wrapped around a doc.",
      },
    ],
    process: [
      { week: "Week 12", deliverable: "Knowledge audit, SME interviews, role-path mapping, content gap analysis." },
      { week: "Week 34", deliverable: "Build the AI tutor, role-based onboarding paths, knowledge base wired in." },
      { week: "Week 56", deliverable: "Pilot with 35 new hires or rotators. Measure ramp time, comprehension, retention." },
      { week: "Week 78", deliverable: "Tune, expand to remaining roles, set continuous-update cadence." },
    ],
    integrations: ["Notion", "Google Docs", "Slack", "Confluence", "Loom", "Claude (Anthropic)"],
  },
  {
    slug: "bid",
    iconKey: "bid",
    name: "Bid Engine",
    tag: "RFP intelligence",
    desc: "AI agents that interpret RFPs, qualify the opportunity, and draft the response.",
    valueProp:
      "Read every RFP in minutes. Qualify the opportunity, surface the risk, and draft a tailored response  using your past wins as the source.",
    longDesc:
      "RFPs eat senior time. Most are unwinnable. The few that are winnable get a worse response than they deserve because the team is exhausted. Bid Engine reads incoming RFPs, scores fit, surfaces risks, and drafts a response anchored on your actual past wins  so your team focuses on the qualified ones and ships better answers, faster.",
    details: [
      "Reads RFPs and surfaces fit, risk, and competition in minutes",
      "Drafts tailored responses anchored on your past wins",
      "Tracks every bid against win-loss patterns",
    ],
    bestFor: "Service firms responding to RFPs/RFQs regularly",
    anchor: "From $5,000",
    whoFor: [
      "Service firms (consulting, engineering, IT, marketing) responding to 5+ RFPs/month",
      "Sales-ops teams drowning in proposals during peak season",
      "Companies bidding on government, healthcare, or enterprise contracts",
      "Anyone losing to competitors because they couldn't ship a polished response in time",
    ],
    features: [
      {
        title: "RFP intake + qualification",
        desc: "Drop the PDF in. Get a fit score, top three risks, competitive analysis, and recommended bid/no-bid decision in minutes.",
      },
      {
        title: "Response drafting from your wins",
        desc: "We index your past winning proposals. The agent drafts a tailored response that uses your real proof points  not generic boilerplate.",
      },
      {
        title: "Compliance + risk flags",
        desc: "Highlights every clause that needs legal/finance/security review. Nothing slips through to submission unreviewed.",
      },
      {
        title: "Win-loss intelligence",
        desc: "Every bid contributes to your pattern library. Over time the engine gets sharper at predicting which RFPs are worth your time.",
      },
    ],
    process: [
      { week: "Week 12", deliverable: "Past-wins ingestion, RFP taxonomy, scoring criteria capture, integration with intake channel." },
      { week: "Week 34", deliverable: "Live with first 35 RFPs in production. Human review of every output." },
      { week: "Week 56", deliverable: "Tune scoring, expand drafting templates, integrate with proposal tools." },
      { week: "Week 78", deliverable: "Win-rate baseline measured, risk-flag accuracy reviewed, scale plan for month 3." },
    ],
    integrations: ["Notion", "SharePoint", "Salesforce", "HubSpot", "DocuSign", "Adobe Sign"],
  },
  {
    slug: "bernie",
    iconKey: "bernie",
    name: "Bernie",
    tag: "Concierge",
    desc: "Real-time AI sales agent on your site. Trilingual. Trained on your voice.",
    valueProp:
      "A real-time AI sales concierge on your website. Trilingual. Trained on your services, FAQs, and tone. Books meetings while you sleep.",
    longDesc:
      "Bernie is the agent on this very site  the same one we deploy for clients. He answers questions about your services, qualifies the visitor, and books a call without anyone refreshing their inbox. Trained on your tone of voice, capped at 10 turns per chat, and hardened against prompt-injection from day one.",
    details: [
      "24/7 chat agent on your site, in EN/PT-BR/ES",
      "Trained on your services, FAQs, and tone of voice",
      "Books meetings, captures leads, escalates to human",
    ],
    bestFor: "Any business with web traffic and a sales motion",
    anchor: "From $99/mo",
    variant: "concierge",
    whoFor: [
      "Service businesses with steady web traffic but slow lead response",
      "Brands with multilingual buyers (especially EN/PT-BR/ES)",
      "Founders tired of writing the same answers over and over",
      "Anyone whose 'contact form' converts under 1%",
    ],
    features: [
      {
        title: "Trained on your business",
        desc: "We feed Bernie your services, pricing rules, FAQs, founder bio, and tone-of-voice samples. Every answer is on-brand.",
      },
      {
        title: "Trilingual native",
        desc: "Auto-detects EN, PT-BR, or ES from the visitor's first message. Replies in their language with regional register.",
      },
      {
        title: "Sales-methodology trained",
        desc: "Implicitly applies Corporate Visions, MEDDIC, Challenger, SPIN, and Voss-style mirroring. Always closes with a clear next step.",
      },
      {
        title: "Hardened by default",
        desc: "Refuses prompt-injection, never reveals the system prompt, caps at 10 turns per chat, redirects compliance topics to humans.",
      },
    ],
    process: [
      { week: "Week 1", deliverable: "Knowledge ingestion (services, FAQs, founder bio), voice samples, escalation rules." },
      { week: "Week 2", deliverable: "Bernie deployed to staging. Internal QA across all three languages." },
      { week: "Week 3", deliverable: "Go-live on production. Monitoring, conversation review, leak-bypass testing." },
      { week: "Week 4", deliverable: "First-month metrics: chat-to-booking rate, conversion lift, voice tuning." },
    ],
    integrations: ["Anthropic Claude", "HubSpot", "Cal.com", "Resend", "Vercel"],
    primaryCta: { label: "Talk to Bernie now", href: "#" },
  },
];

export function getEngine(slug: string): EngineDetail | undefined {
  return ENGINES.find((e) => e.slug === slug);
}

export function getAllEngineSlugs(): string[] {
  return ENGINES.map((e) => e.slug);
}

/** Subset used by the home page card grid (shape that EngineCard expects). */
export function getHomeEngines(): Engine[] {
  return ENGINES.map(({ slug, valueProp, longDesc, whoFor, features, process, integrations, primaryCta, ...rest }) => {
    void slug; void valueProp; void longDesc; void whoFor; void features; void process; void integrations; void primaryCta;
    return {
      ...rest,
      // Lighthouse and Bernie keep their special hrefs; others link to /engines/[slug]
      href: rest.name === "Bernie"
        ? undefined
        : rest.name === "Lighthouse"
        ? "/lighthouse-demo"
        : `/engines/${ENGINES.find((e) => e.name === rest.name)!.slug}`,
    };
  });
}
