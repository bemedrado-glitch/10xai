import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Search, Hammer, Rocket, Activity, Check, X } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "methodology.metadata" });
  return { title: t("title"), description: t("description") };
}

const STEP_ICONS = [Search, Hammer, Rocket, Activity];
const STEP_KEYS = ["discover", "build", "ship", "measure"] as const;

export default function MethodologyPage() {
  const t = useTranslations("methodology");
  const tCommon = useTranslations("common");

  const ships = t.raw("qualityBar.ships") as string[];
  const skips = t.raw("qualityBar.skips") as string[];

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-cream)]">
      <SiteNav activePage="methodology" />

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
                <br className="hidden md:block" />
                <span className="text-[var(--color-gold)]"> {t("headlineLine2")}</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-[var(--color-ink-300)] md:text-xl">
                {t("subhead")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Protocol */}
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("protocol.eyebrow")}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-5xl">
                {t("protocol.title1")}
                <br />
                <span className="text-[var(--color-gold)]">{t("protocol.title2")}</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {STEP_KEYS.map((key, i) => {
                const Icon = STEP_ICONS[i];
                const deliverables = t.raw(`protocol.items.${key}.deliverables`) as string[];
                return (
                  <Reveal key={key} delay={i * 100}>
                    <article className="flex h-full flex-col rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)] p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--color-ink)] text-[var(--color-cream)]">
                          <Icon size={22} strokeWidth={2.25} />
                        </span>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                            {t(`protocol.items.${key}.week`)}
                          </p>
                          <h3 className="mt-1 font-display text-2xl font-bold text-[var(--color-ink)]">
                            {t(`protocol.items.${key}.title`)}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-4 text-[var(--color-ink-700)]">
                        {t(`protocol.items.${key}.body`)}
                      </p>
                      <ul className="mt-5 space-y-2">
                        {deliverables.map((d, di) => (
                          <li key={di} className="flex items-start gap-2 text-sm text-[var(--color-ink-700)]">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quality bar */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("qualityBar.eyebrow")}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                {t("qualityBar.title")}
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Reveal delay={100}>
                <div className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold-100)]/40 p-6 md:p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
                    {t("qualityBar.shipsLabel")}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[var(--color-ink)]">
                    {t("qualityBar.shipsTitle")}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {ships.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-[var(--color-ink-700)]">
                        <Check size={18} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="rounded-xl border border-[var(--color-ink-300)] bg-[var(--color-cream)] p-6 md:p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-500)]">
                    {t("qualityBar.skipsLabel")}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[var(--color-ink)]">
                    {t("qualityBar.skipsTitle")}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {skips.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-[var(--color-ink-500)]">
                        <X size={18} className="mt-0.5 shrink-0 text-[var(--color-ink-300)]" />
                        <span className="line-through decoration-[var(--color-ink-300)]/60">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-6 text-lg text-[var(--color-ink-300)] md:text-xl">
                  {t("cta.subhead")}
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 hover:bg-[var(--color-gold-600)]"
                  >
                    {t("cta.ctaBook")}
                  </Link>
                  <button
                    type="button"
                    data-talk-to-bernie
                    className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] hover:border-[var(--color-ink-300)] hover:bg-[var(--color-ink-900)]"
                  >
                    {t("cta.ctaTalk")}
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
