import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { EngineCard } from "@/components/EngineCard";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { getHomeEngines } from "@/data/engines";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "enginesIndex.metadata" });
  return { title: t("title"), description: t("description") };
}

export default function EnginesIndexPage() {
  const t = useTranslations("enginesIndex");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const engines = getHomeEngines(locale);

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-cream)]">
      <SiteNav activePage="engines" />

      <main id="main">
        {/* Hero */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-32 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("eyebrow")}
              </p>
              <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                {t("headlineLine1")}
                <br />
                <span className="text-[var(--color-gold)]">{t("headlineLine2")}</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-[var(--color-ink-300)] md:text-xl">
                {t("subhead")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Engine grid */}
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {engines.map((engine, i) => (
                <Reveal key={engine.name} delay={i * 60}>
                  <EngineCard engine={engine} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-4 text-lg text-[var(--color-ink-700)]">{t("cta.subhead")}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    data-talk-to-bernie
                    className="inline-flex h-14 items-center justify-center rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)]"
                  >
                    {t("cta.ctaTalk")}
                  </button>
                  <Link
                    href="/methodology"
                    className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-ink-300)] px-8 text-base font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-cream-50)]"
                  >
                    {t("cta.ctaMethodology")}
                  </Link>
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
