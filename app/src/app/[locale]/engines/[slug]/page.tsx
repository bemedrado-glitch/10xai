import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ENGINES, getAllEngineSlugs, getEngine } from "@/data/engines";
import { Reveal } from "@/components/Reveal";
import { RoiCalculator } from "@/components/RoiCalculator";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Check, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return getAllEngineSlugs().map((slug) => ({ slug }));
}

const ENGINE_OG: Record<string, string> = {
  lighthouse: "/images/og-lighthouse.jpg",
  bernie: "/images/og-bernie.jpg",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const engine = getEngine(slug);
  if (!engine) return { title: "Engine not found" };
  const ogImage = ENGINE_OG[slug];
  return {
    title: `${engine.name} – ${engine.tag}`,
    description: engine.valueProp,
    ...(ogImage && {
      openGraph: {
        title: `${engine.name} – 10XAI`,
        description: engine.valueProp,
        images: [{ url: ogImage, width: 1200, height: 630, alt: `${engine.name} – 10XAI` }],
      },
      twitter: {
        card: "summary_large_image" as const,
        title: `${engine.name} – 10XAI`,
        description: engine.valueProp,
        images: [ogImage],
      },
    }),
  };
}

export default async function EngineDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const engine = getEngine(slug);
  if (!engine) notFound();

  const t = await getTranslations({ locale, namespace: "engineDetail" });

  const others = ENGINES.filter((e) => e.slug !== engine.slug).slice(0, 3);
  const primaryCtaIsBernieChat = engine.slug === "bernie";
  const primaryCta = engine.primaryCta ?? { label: t("ctaBook"), href: "/contact" };

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-cream)]">
      <SiteNav activePage="engines" />

      <main id="main">
        {/* Hero */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <Link
                href="/engines"
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)] hover:text-[var(--color-cream)]"
              >
                {t("backLink")}
              </Link>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-cream)]/60">
                {engine.tag}
              </p>
              <h1 className="mt-2 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                {engine.name}
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-[var(--color-ink-300)] md:text-xl">
                {engine.valueProp}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-4 py-1.5 font-bold text-[var(--color-gold)]">
                  {engine.anchor}
                </span>
                <span className="text-[var(--color-ink-300)]">
                  {t("anchorLabel", { bestFor: engine.bestFor })}
                </span>
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                {primaryCtaIsBernieChat ? (
                  <button
                    type="button"
                    data-talk-to-bernie
                    className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 hover:bg-[var(--color-gold-600)]"
                  >
                    {primaryCta.label}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <Link
                    href={primaryCta.href as "/contact" | "/lighthouse-demo"}
                    className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 hover:bg-[var(--color-gold-600)]"
                  >
                    {primaryCta.label}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] hover:border-[var(--color-ink-300)]"
                >
                  {t("ctaBook")}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Long description + Who for */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <Reveal>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                    {t("longDescEyebrow")}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                    {t("longDescTitle", { name: engine.name })}
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink-700)]">
                    {engine.longDesc}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div className="rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-6 md:p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                    {t("whoForEyebrow")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-[var(--color-ink)]">
                    {t("whoForTitle")}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {engine.whoFor.map((w, i) => (
                      <li key={i} className="flex items-start gap-3 text-[var(--color-ink-700)]">
                        <Check size={18} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("featuresEyebrow")}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                {t("featuresTitle")}
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {engine.features.map((f, i) => (
                <Reveal key={f.title} delay={i * 80}>
                  <article className="h-full rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)] p-6 transition-all hover:border-[var(--color-ink)] hover:shadow-md md:p-8">
                    <h3 className="font-display text-xl font-bold text-[var(--color-ink)]">{f.title}</h3>
                    <p className="mt-3 text-[var(--color-ink-700)]">{f.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Narrative — Why Change */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                The case for change
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight md:text-4xl">
                Why change? Why now? Why 10XAI?
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "The problem", body: engine.narrative.problem },
                { label: "The challenge", body: engine.narrative.challenge },
                { label: "The long-term consequence", body: engine.narrative.consequence },
                { label: "Why change", body: engine.narrative.whyChange },
                { label: "Why now", body: engine.narrative.whyNow },
                { label: "Why 10XAI", body: engine.narrative.why10xai },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 60}>
                  <div className="flex h-full flex-col rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)]/60 p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      {item.label}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-300)]">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                Return on investment
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                What could this be worth to you?
              </h2>
              <p className="mt-4 max-w-2xl text-[var(--color-ink-700)]">
                Adjust the inputs below to your current situation and see a rough estimate of the impact.
              </p>
            </Reveal>
            <div className="mt-10">
              <RoiCalculator
                slug={engine.slug}
                inputs={engine.roi.inputs}
                outputs={engine.roi.outputs}
              />
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="border-t border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                Use cases by industry
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                Built to work across verticals.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {engine.industries.map((ind, i) => (
                <Reveal key={ind.name} delay={i * 70}>
                  <div className="flex h-full flex-col rounded-xl border border-[var(--color-ink-200)] bg-[var(--color-cream-50)] p-6 md:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      {ind.name}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-700)]">
                      {ind.useCase}
                    </p>
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-[var(--color-gold)]/8 px-3 py-2">
                      <Check size={14} className="shrink-0 text-[var(--color-gold)]" />
                      <p className="text-xs font-medium text-[var(--color-ink-700)]">{ind.impact}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("processEyebrow")}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                {t("processTitle")}
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {engine.process.map((p, i) => (
                <Reveal key={p.week} delay={i * 80}>
                  <li className="flex h-full flex-col rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-5 md:p-6">
                    <p className="font-display text-3xl font-black text-[var(--color-gold)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-ink-700)]">
                      {p.week}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">
                      {p.deliverable}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Integrations */}
        {engine.integrations && engine.integrations.length > 0 && (
          <section className="bg-[var(--color-cream)]">
            <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  {t("integrationsEyebrow")}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold text-[var(--color-ink)] md:text-3xl">
                  {t("integrationsTitle")}
                </h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  {engine.integrations.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] px-4 py-2 text-sm font-medium text-[var(--color-ink-700)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Other engines */}
        <section className="border-t border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("otherEnginesEyebrow")}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-[var(--color-ink)] md:text-3xl">
                {t("otherEnginesTitle")}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o, i) => (
                <Reveal key={o.slug} delay={i * 80}>
                  <Link
                    href={o.name === "Lighthouse" ? "/lighthouse-demo" : (`/engines/${o.slug}` as `/engines/${string}`)}
                    className="group flex h-full flex-col rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-5 transition-all hover:border-[var(--color-ink)] hover:shadow-md md:p-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">{o.tag}</p>
                    <h3 className="mt-2 font-display text-lg font-bold text-[var(--color-ink)]">{o.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-[var(--color-ink-700)]">{o.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--color-ink)] opacity-0 transition-opacity group-hover:opacity-100">
                      {t("otherEnginesLearnMore")}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
                  {t("ctaTitle", { name: engine.name })}
                </h2>
                <p className="mt-6 text-lg text-[var(--color-ink-300)] md:text-xl">
                  {t("ctaSubhead")}
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 hover:bg-[var(--color-gold-600)]"
                  >
                    {t("ctaBook")}
                  </Link>
                  <button
                    type="button"
                    data-talk-to-bernie
                    className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] hover:border-[var(--color-ink-300)]"
                  >
                    {t("ctaTalk")}
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
