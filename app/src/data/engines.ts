import type { Engine } from "@/components/EngineCard";

/**
 * Extended engine record with everything the detail page needs.
 * Home page only uses the core Engine fields; detail page uses the rest.
 */
export type RoiInput = {
  key: string;
  label: string;
  unit: "hours" | "usd" | "percent" | "count";
  min: number;
  max: number;
  step: number;
  default: number;
};

export type RoiOutput = {
  key: string;
  label: string;
  format: "hours" | "usd" | "months" | "count";
};

export type EngineDetail = Engine & {
  slug: string;
  valueProp: string;
  longDesc: string;
  whoFor: string[];
  features: Array<{ title: string; desc: string }>;
  process: Array<{ week: string; deliverable: string }>;
  integrations?: string[];
  primaryCta?: { label: string; href: string };
  /** Corporate Visions-style sales narrative for the detail page. */
  narrative: {
    problem: string;
    challenge: string;
    consequence: string;
    whyChange: string;
    whyNow: string;
    why10xai: string;
  };
  /** Industry use-case cards. */
  industries: Array<{ name: string; useCase: string; impact: string }>;
  /** ROI calculator config (formula lives in roi-formulas.ts). */
  roi: {
    inputs: RoiInput[];
    outputs: RoiOutput[];
  };
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
    narrative: {
      problem: "Finding the right contacts is the most expensive problem in B2B sales. The average SDR spends 40–60% of their time prospecting instead of selling — and most of that time produces nothing billable.",
      challenge: "Manual prospecting tools require constant configuration, data goes stale in weeks, and none of them connect discovery to outreach without a human doing every step in between.",
      consequence: "Your pipeline depends on people showing up every morning and grinding through spreadsheets. When they leave — or get distracted — pipeline dries up. When pipeline dries, everything downstream suffers: hiring freezes, burn climbs, and deals get discounted.",
      whyChange: "AI can do the full prospecting cycle continuously, at scale, without burnout. Every hour your team spends on ICP research is an hour not spent on closing. The math only gets worse as you scale.",
      whyNow: "Contact databases now cover 50M+ verified records. AI enrichment can verify emails and pull LinkedIn context in milliseconds. The cost to build this full stack dropped 90% in 18 months — what required a 3-person team in 2022 runs on one agent today.",
      why10xai: "We build the system once and it runs while you close. You define the ICP, we wire the discovery, enrichment, and cadence, and you wake up to a pipeline that didn't exist the day before — without adding a single headcount.",
    },
    industries: [
      { name: "Restaurants & Hospitality", useCase: "Target GMs and owners of independent restaurants expanding to second locations or catering operations.", impact: "First reply in 3–5 days on average for hospitality ICPs" },
      { name: "Healthcare & Medtech", useCase: "Reach practice administrators and procurement leads at clinics adopting new technology or changing EHR systems.", impact: "High-intent signals from hiring + tech-stack data" },
      { name: "Professional Services", useCase: "Find decision-makers at law firms, accounting practices, and consulting shops with no CRM or outdated outreach.", impact: "Email + LinkedIn enrichment reduces bounce rate below 5%" },
      { name: "Retail & E-commerce", useCase: "Target buyers and operations leads at growing regional retail chains with no centralized vendor outreach process.", impact: "Social signals (hiring, funding) surface warm leads daily" },
    ],
    roi: {
      inputs: [
        { key: "hoursPerWeek", label: "Hours/week spent on manual prospecting", unit: "hours", min: 2, max: 40, step: 1, default: 10 },
        { key: "reps", label: "Number of people prospecting", unit: "count", min: 1, max: 10, step: 1, default: 1 },
        { key: "dealValue", label: "Average deal value", unit: "usd", min: 500, max: 100000, step: 500, default: 5000 },
      ],
      outputs: [
        { key: "hoursSaved", label: "Hours saved per month", format: "hours" },
        { key: "pipelineAdded", label: "Estimated new pipeline / month", format: "usd" },
        { key: "payback", label: "Estimated payback period", format: "months" },
      ],
    },
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
    narrative: {
      problem: "Most SMBs can't close pipeline they don't have. But building and running a real SDR function costs $60–80k/year per rep — plus ramp time, management overhead, and the near-certain turnover within 18 months.",
      challenge: "Hiring one SDR is expensive. Keeping them motivated is harder. Training them to your ICP and tone takes months. And when they leave, you start from zero — again.",
      consequence: "Without a reliable pipeline engine, growth becomes lumpy and referral-dependent. Founders end up doing SDR work themselves at CEO hourly rates, which means they're not closing, not building, and not sleeping.",
      whyChange: "AI SDRs don't call in sick, don't lose motivation, and don't need 90-day ramp time. They run the same cadence quality on Tuesday morning as Friday afternoon — and they get better as you tune them.",
      whyNow: "Multichannel outreach tooling (email + LinkedIn + WhatsApp) is now commoditized. LLMs can personalize at scale with genuine quality. The cost of running an autonomous AI SDR at competitive quality has dropped to a fraction of one human hire.",
      why10xai: "We don't hand you a tool — we run the ICP workshop, train the voice, wire the CRM, and manage the cadences. The first qualified meeting typically lands in week 3. We measure pipeline created, not software licenses deployed.",
    },
    industries: [
      { name: "B2B SaaS", useCase: "Target VP Sales, RevOps, and CTO personas at companies in a defined tech stack or funding stage.", impact: "Intent signal-based targeting cuts noise by 60%+" },
      { name: "Professional Services", useCase: "Agencies and consultancies building outbound into new verticals where referrals aren't enough.", impact: "Multichannel cadences generate 2–4× more replies than email alone" },
      { name: "Healthcare Technology", useCase: "Reach clinical administrators and procurement leads with warm, HIPAA-aware outreach sequences.", impact: "Compliance-ready templates built into every cadence" },
      { name: "Financial Services", useCase: "Connect wealth managers, fintech founders, and CFOs with context-rich, regulation-aware messaging.", impact: "Industry-specific personalization drives higher open rates" },
    ],
    roi: {
      inputs: [
        { key: "meetingsPerMonth", label: "Qualified meetings / month today", unit: "count", min: 0, max: 30, step: 1, default: 5 },
        { key: "dealValue", label: "Average deal value", unit: "usd", min: 1000, max: 250000, step: 1000, default: 10000 },
        { key: "closeRate", label: "Current close rate", unit: "percent", min: 5, max: 60, step: 1, default: 20 },
      ],
      outputs: [
        { key: "additionalMeetings", label: "Additional meetings / month", format: "count" },
        { key: "revenueImpact", label: "Estimated revenue impact / month", format: "usd" },
        { key: "payback", label: "Estimated payback period", format: "months" },
      ],
    },
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
    narrative: {
      problem: "Customer service is the last thing a founder wants to spend evenings on — but the first thing that kills a reputation when it fails. Slow replies mean bad reviews. Bad reviews mean lost customers. Lost customers are permanent.",
      challenge: "Hiring a support team scales cost linearly with volume. Free-tier chatbots can't handle anything beyond a static FAQ. And WhatsApp — the primary customer channel for most SMBs in Latin America and a growing share in the US — is drowning teams who try to manage it manually.",
      consequence: "Every slow response compounds. Customers who wait more than 10 minutes are 40% less likely to buy. Unresponded reviews signal neglect to every future prospect. This gap doesn't close by itself — it grows as volume grows.",
      whyChange: "AI customer service has crossed the quality threshold where most customers can't distinguish it from a human for tier-1 inquiries. The question is no longer whether AI can do this — it's whether you can afford not to have it.",
      whyNow: "WhatsApp Business API, Claude's context window, and real-time booking integrations now combine to make a genuine 24/7 service agent feasible without enterprise infrastructure or enterprise budget.",
      why10xai: "We build the escalation rules, train the agent on your actual service catalog and tone, and wire the human handoff from day one. You don't get a generic chatbot — you get an agent that sounds like your best team member.",
    },
    industries: [
      { name: "Health & Wellness Clinics", useCase: "Handle appointment booking, rescheduling, pre-visit instructions, and review responses — across WhatsApp and web.", impact: "No-show rate reduced by automated 24h reminders" },
      { name: "Beauty & Personal Care", useCase: "Book appointments, answer service questions, and recover abandoned bookings — in any language the customer messages in.", impact: "Response time from hours to seconds on WhatsApp" },
      { name: "E-commerce & Retail", useCase: "Triage order status, returns, and product questions automatically — escalate only billing disputes and exceptions.", impact: "70%+ of tier-1 tickets resolved without human touch" },
      { name: "Home Services", useCase: "Route service requests, confirm appointments, and collect pre-job information — before your crew shows up.", impact: "Same-day booking confirmation via WhatsApp automation" },
    ],
    roi: {
      inputs: [
        { key: "ticketsPerMonth", label: "Customer messages / month", unit: "count", min: 50, max: 5000, step: 50, default: 300 },
        { key: "avgHandleMinutes", label: "Avg. handle time per message (min)", unit: "count", min: 3, max: 30, step: 1, default: 10 },
        { key: "staffCostHour", label: "Staff cost / hour", unit: "usd", min: 12, max: 80, step: 1, default: 20 },
      ],
      outputs: [
        { key: "hoursSaved", label: "Staff hours saved / month", format: "hours" },
        { key: "costSaved", label: "Estimated savings / month", format: "usd" },
        { key: "payback", label: "Estimated payback period", format: "months" },
      ],
    },
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
    narrative: {
      problem: "Marketing requires consistent, high-quality output across multiple channels every single week. But most SMBs have one person (or zero) dedicated to marketing — and that person is already stretched across six other jobs.",
      challenge: "Inconsistent posting loses algorithmic momentum overnight. Generic AI content doesn't just underperform — it actively damages brand trust. And most small teams post in bursts when they have time, go dark for weeks, then wonder why growth stalled.",
      consequence: "Brands that go silent lose search ranking, social followers, and the compound interest of content marketing. Every week without content is a week competitors gain ground. The longer you wait, the more expensive recovery becomes.",
      whyChange: "AI-generated content has crossed brand-quality thresholds when properly trained on voice samples and editorial guidelines. Reach Engine doesn't replace human creativity — it eliminates the 80% of content work that is production, not thinking.",
      whyNow: "LLMs trained on brand voice can now produce on-brand content at near-human quality in seconds. Native social publishing APIs, ad platform integrations, and automated approval flows make a real autonomous content pipeline possible today.",
      why10xai: "We do the voice training, the channel setup, the content calendar, and the human approval workflow. You review one queue per week and publish. We produce the rest — in three languages if your audience spans markets.",
    },
    industries: [
      { name: "B2B Professional Services", useCase: "LinkedIn thought-leadership content, case study posts, and ad creative — consistently, in the founder's voice.", impact: "3× posting frequency with same team headcount" },
      { name: "Healthcare & Wellness", useCase: "Patient education content, provider spotlights, and community-building posts — in multiple languages for diverse markets.", impact: "Compliant, brand-safe content without legal review bottlenecks" },
      { name: "E-commerce & CPG", useCase: "Product launch content, UGC-style creative, and ad variant factories for Meta and Google — refreshed weekly.", impact: "30+ ad variants per campaign at a fraction of agency cost" },
      { name: "Restaurants & Hospitality", useCase: "Menu features, event promotions, and review amplification — across Instagram, Facebook, and Google Business.", impact: "Consistent local brand presence without a marketing hire" },
    ],
    roi: {
      inputs: [
        { key: "contentPiecesPerMonth", label: "Content pieces published / month today", unit: "count", min: 0, max: 60, step: 2, default: 8 },
        { key: "hoursPerPiece", label: "Hours per piece (writing + design + posting)", unit: "hours", min: 1, max: 8, step: 0.5, default: 3 },
        { key: "staffCostHour", label: "Staff cost / hour", unit: "usd", min: 20, max: 200, step: 5, default: 60 },
      ],
      outputs: [
        { key: "hoursSaved", label: "Hours saved / month", format: "hours" },
        { key: "costSaved", label: "Estimated savings / month", format: "usd" },
        { key: "payback", label: "Estimated payback period", format: "months" },
      ],
    },
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
    narrative: {
      problem: "Onboarding is broken at most SMBs. The 'training material' is three Slack messages, two outdated Google Docs, and shadowing someone who is about to quit. New hires learn by making mistakes — on your customers.",
      challenge: "Building proper training content takes weeks of subject-matter expert time that nobody has. And even when it's built, it goes stale the moment you change a product, a policy, or a process — which is constantly.",
      consequence: "New hires take 2–3× longer to ramp than they should. They make avoidable mistakes. They quit. And the cycle repeats — except now you've lost both the training investment and the institutional knowledge they accumulated.",
      whyChange: "AI tutors can deliver personalized, role-specific training at scale without creating a content bottleneck. The answer is no longer in another onboarding document nobody reads — it's in an agent that responds in real time to the actual question the new hire has.",
      whyNow: "LLM context windows now support full SOPs and knowledge bases as live training material. The cost to build a custom AI tutor that knows your entire business dropped 95% in 24 months. The infrastructure is ready. The bottleneck is will.",
      why10xai: "Our founder is an ATD Master Trainer with a formal instructional design credential. Every Mind Engine is built with real pedagogy — not just a chatbot wrapper around your Notion. We measure ramp time reduction, not documents uploaded.",
    },
    industries: [
      { name: "Healthcare & Clinical", useCase: "Role-specific training for nurses, front desk, and billing staff — with HIPAA-aware content controls baked in.", impact: "Ramp time reduced 40–60% in pilot deployments" },
      { name: "Hospitality & Food Service", useCase: "Brand standards, service protocols, and POS training for high-turnover front-line staff — available 24/7 in any language.", impact: "Consistent quality across locations without a training manager" },
      { name: "Professional Services Firms", useCase: "Client onboarding playbooks, methodology training, and compliance updates delivered as interactive AI sessions — not PDFs.", impact: "Senior consultants spend 3h less per new hire on shadowing" },
      { name: "Technology Companies", useCase: "Product training, sales playbooks, and support runbooks that update automatically when the product changes.", impact: "Zero lag between product release and team readiness" },
    ],
    roi: {
      inputs: [
        { key: "hiresPerQuarter", label: "New hires per quarter", unit: "count", min: 1, max: 30, step: 1, default: 4 },
        { key: "rampWeeks", label: "Current ramp time (weeks)", unit: "count", min: 2, max: 20, step: 1, default: 6 },
        { key: "weeklyCost", label: "Cost per employee per week (salary + overhead)", unit: "usd", min: 500, max: 6000, step: 100, default: 1500 },
      ],
      outputs: [
        { key: "weeksSaved", label: "Ramp weeks saved / quarter", format: "count" },
        { key: "costSaved", label: "Estimated savings / quarter", format: "usd" },
        { key: "payback", label: "Estimated payback period", format: "months" },
      ],
    },
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
    narrative: {
      problem: "RFPs eat senior time. Most are unwinnable before you read page two. But you can't know which ones are worth pursuing until someone has read all of them — which means your best people spend weeks on bids that lose.",
      challenge: "No-bid decisions require reading the full document. Proposal quality requires your most experienced writers. Both are expensive resources being pulled away from active clients and real revenue — every bid season.",
      consequence: "Companies respond to everything because they can't afford to miss a winner, and exhaust their best people doing it. Win rates stay low because the effort is spread thin. The team burns out. The next bid season is even harder.",
      whyChange: "AI can read and qualify an RFP in minutes and draft a tailored response anchored on your past wins in hours — freeing your senior people to focus only on deals that actually deserve their time.",
      whyNow: "LLMs can now handle multi-hundred-page RFPs with structured extraction, compliance-flag detection, and competitive analysis. Past-win pattern matching at scale is feasible today in a way it wasn't 18 months ago.",
      why10xai: "We index your past winning proposals, build the scoring model against your actual criteria, and run the first five RFPs end-to-end with your team watching. You see the quality — and the time savings — before you commit.",
    },
    industries: [
      { name: "IT & Technology Services", useCase: "Qualify government and enterprise IT RFPs, surface compliance requirements, and draft responses from your technical wins.", impact: "Proposal drafting time reduced from days to hours" },
      { name: "Engineering & Construction", useCase: "Score RFQs for fit against your capacity, license requirements, and past-project profile — before committing to respond.", impact: "Bid/no-bid decision in under 30 minutes per opportunity" },
      { name: "Healthcare Services", useCase: "Navigate complex healthcare procurement requirements, HIPAA clauses, and insurance contracting language — automatically flagged.", impact: "Zero compliance gaps missed in review" },
      { name: "Marketing & Creative Agencies", useCase: "Draft RFP responses that lead with creative case studies and ROI data matched to the prospect's vertical and stated criteria.", impact: "Win rate improvement through tailored, evidence-based responses" },
    ],
    roi: {
      inputs: [
        { key: "rfpsPerMonth", label: "RFPs received per month", unit: "count", min: 2, max: 50, step: 1, default: 8 },
        { key: "hoursPerRfp", label: "Hours spent per RFP (eval + write)", unit: "hours", min: 5, max: 80, step: 5, default: 20 },
        { key: "staffCostHour", label: "Senior staff cost / hour", unit: "usd", min: 50, max: 400, step: 10, default: 150 },
      ],
      outputs: [
        { key: "hoursSaved", label: "Hours saved / month", format: "hours" },
        { key: "costSaved", label: "Estimated savings / month", format: "usd" },
        { key: "payback", label: "Estimated payback period", format: "months" },
      ],
    },
  },
  {
    slug: "bernie",
    iconKey: "bernie",
    name: "Bernie",
    tag: "AI SDR Agent",
    desc: "An AI sales development rep embedded on your site — qualifies visitors, handles objections, and books calls. Trilingual. Never sleeps.",
    valueProp:
      "A real-time AI sales concierge on your website. Trilingual. Trained on your services, FAQs, and tone. Books meetings while you sleep.",
    longDesc:
      "Bernie is the agent on this very site  the same one we deploy for clients. He answers questions about your services, qualifies the visitor, and books a call without anyone refreshing their inbox. Trained on your tone of voice, capped at 10 turns per chat, and hardened against prompt-injection from day one.",
    details: [
      "Qualifies visitors using MEDDIC + Challenger methodology",
      "Handles objections, books meetings, escalates hot leads to human",
      "Trilingual (EN/PT-BR/ES) — auto-detects visitor language",
    ],
    bestFor: "Any B2B or service business with web traffic and a sales motion",
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
    narrative: {
      problem: "Your website has traffic but most visitors leave without converting. A contact form converts under 1%. No human can staff the chat window 24/7 — and even if they could, they'd be answering the same five questions on repeat.",
      challenge: "Generic chatbots feel generic. They damage trust more than they build it. Truly good sales conversations require knowing your services, your pricing logic, your competitive positioning, and your voice — none of which comes out of the box.",
      consequence: "Every visitor who doesn't convert is pipeline you paid to acquire but never captured. At scale — 1,000 visitors per month, 1% conversion rate — you're losing 990 warm opportunities every single month. The cost compounds silently.",
      whyChange: "AI agents trained on your specific business can now have real qualification conversations, not keyword matching. The quality bar for AI-assisted sales chat has crossed the human threshold for most tier-1 conversations — in any language.",
      whyNow: "LLMs with system-prompt training can hold brand-consistent, multi-turn sales conversations with sub-second response time and genuine sales methodology built in. The infrastructure to deploy this is a week of work, not a quarter.",
      why10xai: "Bernie is the same agent we run on 10xai.us right now. You see it working before you buy it. We train it on your business, test it in staging across all three languages, and go live in week 2. From $99/mo.",
    },
    industries: [
      { name: "B2B Services & Agencies", useCase: "Qualify inbound leads, explain service tiers, handle pricing objections, and book discovery calls — without a sales rep on standby.", impact: "Chat-to-booking rate 3–5× higher than contact form alone" },
      { name: "Healthcare & Wellness", useCase: "Answer patient questions, explain service offerings, and route to booking — in English, Portuguese, or Spanish.", impact: "Immediate response regardless of office hours or timezone" },
      { name: "Real Estate & Finance", useCase: "Pre-qualify prospects, explain product options, and book appointments with advisors — with full compliance guardrails built in.", impact: "No-show rate reduced by pre-qualification step" },
      { name: "E-commerce & Retail", useCase: "Handle product questions, shipping inquiries, and return policies — escalating only complex cases to a human agent.", impact: "70%+ of pre-sale questions resolved instantly" },
    ],
    roi: {
      inputs: [
        { key: "visitorsPerMonth", label: "Monthly website visitors", unit: "count", min: 100, max: 50000, step: 100, default: 1000 },
        { key: "currentConversion", label: "Current conversion rate (%)", unit: "percent", min: 0.1, max: 5, step: 0.1, default: 0.5 },
        { key: "dealValue", label: "Average deal value", unit: "usd", min: 500, max: 50000, step: 500, default: 2500 },
      ],
      outputs: [
        { key: "additionalLeads", label: "Additional leads / month", format: "count" },
        { key: "revenueImpact", label: "Estimated revenue impact / month", format: "usd" },
        { key: "payback", label: "Estimated payback period", format: "months" },
      ],
    },
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
      href: rest.name === "Lighthouse"
        ? "/lighthouse-demo"
        : `/engines/${ENGINES.find((e) => e.name === rest.name)!.slug}`,
    };
  });
}
