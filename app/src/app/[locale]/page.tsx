import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroBackground } from "@/components/HeroBackground";
import { Reveal } from "@/components/Reveal";
import { EngineCard, type Engine } from "@/components/EngineCard";
import { LogoStrip } from "@/components/LogoStrip";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.metadata" });
  return { title: t("title"), description: t("description") };
}

const ENGINES: Engine[] = [
  {
    iconKey: "lighthouse",
    name: "Lighthouse",
    tag: "Lead engine",
    desc: "Find local businesses with proven demand. Ship them a website. Reach out – and close.",
    details: [
      "Find local SMBs with great Google reviews and no website",
      "Generate a tailored 5-section site from their data in 60 seconds",
      "Personalized outreach across email, WhatsApp, Instagram",
    ],
    bestFor: "Local service businesses – dental, home services, beauty, food",
    anchor: "From $497 + $49/mo",
    href: "/lighthouse-demo",
  },
  {
    iconKey: "sales",
    name: "Sales Engine",
    tag: "AI SDR",
    desc: "Autonomous outbound that books meetings while you sleep.",
    details: [
      "Multichannel cadences across email, LinkedIn, and WhatsApp",
      "Daily-fresh prospect lists from real-time intent signals",
      "Books qualified meetings directly into your calendar",
    ],
    bestFor: "B2B SaaS, agencies, consulting firms with sales gaps",
    anchor: "From $1,500 + $499/mo",
  },
  {
    iconKey: "care",
    name: "Care Engine",
    tag: "Customer Success",
    desc: "Real-time AI customer service, booking, and AI-powered review responses.",
    details: [
      "24/7 AI agent handles tier-1 support across web + WhatsApp + email",
      "Booking automation tied to your calendar and team availability",
      "AI review responses that protect and grow your reputation",
    ],
    bestFor: "Service businesses with customer-volume pressure",
    anchor: "From $1,500 + $499/mo",
  },
  {
    iconKey: "reach",
    name: "Reach Engine",
    tag: "Marketing",
    desc: "Content, social, and ads on one autonomous track – in your brand voice.",
    details: [
      "Content generation in your brand voice, multilingual",
      "Social orchestration across LinkedIn, Instagram, Facebook",
      "Ad operations with performance feedback loops",
    ],
    bestFor: "Brands needing constant content with lean teams",
    anchor: "From $2,500 + $799/mo",
  },
  {
    iconKey: "mind",
    name: "Mind Engine",
    tag: "LMS / Onboarding",
    desc: "Knowledge consolidation and role-based training, deployed as an AI tutor.",
    details: [
      "Pulls knowledge from your existing docs, SOPs, and Slack",
      "Role-based onboarding paths that ramp new hires faster",
      "Continuous training on policy + product changes",
    ],
    bestFor: "Teams growing fast or with high turnover",
    anchor: "From $3,500",
  },
  {
    iconKey: "bid",
    name: "Bid Engine",
    tag: "RFP intelligence",
    desc: "AI agents that interpret RFPs, qualify the opportunity, and draft the response.",
    details: [
      "Reads RFPs and surfaces fit, risk, and competition in minutes",
      "Drafts tailored responses anchored on your past wins",
      "Tracks every bid against win-loss patterns",
    ],
    bestFor: "Service firms responding to RFPs/RFQs regularly",
    anchor: "From $5,000",
  },
  {
    iconKey: "bernie",
    name: "Bernie",
    tag: "Concierge",
    desc: "Real-time AI sales agent on your site. Trilingual. Trained on your voice.",
    details: [
      "24/7 chat agent on your site, in EN/PT-BR/ES",
      "Trained on your services, FAQs, and tone of voice",
      "Books meetings, captures leads, escalates to human",
    ],
    bestFor: "Any business with web traffic and a sales motion",
    anchor: "From $99/mo",
    variant: "concierge",
  },
];

export default function HomePage() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const stats = [
    { stat: "77%", label: t("stats.abandonRate") },
    { stat: "3M+", label: t("stats.businessesWithoutSites") },
    { stat: "3", label: t("stats.languages") },
    { stat: "20+", label: t("stats.experience") },
  ];

  const principles = [
    { num: "01", title: t("principles.items.01.title"), body: t("principles.items.01.body") },
    { num: "02", title: t("principles.items.02.title"), body: t("principles.items.02.body") },
    { num: "03", title: t("principles.items.03.title"), body: t("principles.items.03.body") },
  ];

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-cream)]">
      <SiteNav />

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden text-[var(--color-cream)]">
          <HeroBackground />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-32 md:px-6 md:py-40 lg:px-8 lg:py-52">
            <div className="max-w-5xl">
              <Reveal>
                <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] backdrop-blur md:text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-gold)]" />
                  </span>
                  {t("eyebrow")}
                </p>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="font-display font-black leading-[0.95] tracking-tight text-[2.75rem] md:text-7xl lg:text-[6.25rem]">
                  {t("headline.line1")}
                  <br />
                  {t("headline.line2start")}{" "}
                  <span className="text-[var(--color-gold)]">{t("headline.line2gold")}</span>
                </h1>
              </Reveal>
              <Reveal delay={260}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-300)] md:text-xl">
                  {t("subhead")}
                </p>
              </Reveal>
              <Reveal delay={400}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/lighthouse-demo"
                    className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 transition-all hover:bg-[var(--color-gold-600)] hover:shadow-[var(--color-gold)]/50"
                  >
                    {t("ctaPrimary")}
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                  <button
                    type="button"
                    data-talk-to-bernie
                    className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-cream)]/30 bg-[var(--color-cream)]/5 px-8 text-base font-bold text-[var(--color-cream)] backdrop-blur transition-colors hover:border-[var(--color-cream)] hover:bg-[var(--color-cream)]/10"
                  >
                    {tCommon("ctaTalkToBernie")}
                  </button>
                </div>
              </Reveal>
              <Reveal delay={540}>
                <div className="mt-14 max-w-3xl border-l-2 border-[var(--color-gold)]/40 pl-5">
                  <p className="text-sm font-medium leading-relaxed text-[var(--color-cream)]/90 md:text-base">
                    {t("credentialsLine")}{" "}
                    <span className="font-bold text-[var(--color-gold)]">{t("credentialsLineYears")}</span>{" "}
                    {t("credentialsLineEnd")}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--color-ink-300)]">
                    {t("fomoLine")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[var(--color-cream)]/40" aria-hidden="true">
            <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
              <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="2.5" fill="currentColor">
                <animate attributeName="cy" from="10" to="22" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>

        <LogoStrip />

        {/* Three principles */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("principles.eyebrow")}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                {t("principles.title")}
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-12 md:grid-cols-3">
              {principles.map((p, i) => (
                <Reveal key={p.num} delay={i * 120}>
                  <div>
                    <p className="font-display text-6xl font-black text-[var(--color-gold)]">{p.num}</p>
                    <h3 className="mt-4 font-display text-2xl font-bold text-[var(--color-ink)]">{p.title}</h3>
                    <p className="mt-3 text-[var(--color-ink-700)]">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
            <div className="grid gap-10 md:grid-cols-4">
              {stats.map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="border-l-2 border-[var(--color-gold)] pl-5">
                    <p className="font-display text-5xl font-black text-[var(--color-gold)] md:text-6xl">{item.stat}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-300)]">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Engines */}
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("enginesPreview.eyebrow")}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-5xl lg:text-6xl">
                {t("enginesPreview.title1")}
                <br />
                <span className="text-[var(--color-gold)]">{t("enginesPreview.title2")}</span>
              </h2>
              <p className="mt-6 max-w-3xl text-lg text-[var(--color-ink-700)]">
                {t("enginesPreview.subhead")}
              </p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ENGINES.map((engine, i) => (
                <Reveal key={engine.name} delay={i * 60}>
                  <EngineCard engine={engine} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <TestimonialCarousel />

        {/* CTA band */}
        <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(202, 138, 4, 0.4) 0%, transparent 60%)" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
                  {t("ctaBand.title")}
                </h2>
                <p className="mt-6 text-lg text-[var(--color-ink-300)] md:text-xl">
                  {t("ctaBand.subhead")}
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 transition-all hover:bg-[var(--color-gold-600)]"
                  >
                    {t("ctaBand.ctaBook")}
                  </Link>
                  <button
                    type="button"
                    data-talk-to-bernie
                    className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] transition-colors hover:border-[var(--color-ink-300)] hover:bg-[var(--color-ink-900)]"
                  >
                    {t("ctaBand.ctaTalk")}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
