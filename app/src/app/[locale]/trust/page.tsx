import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about.credentials");
  return {
    title: `${t("eyebrow")} – 10XAI`,
    description: t("subhead"),
    robots: { index: true, follow: true },
  };
}

const credentials = [
  { key: "atdMaster" },
  { key: "atdInstructional" },
  { key: "aaIsp" },
  { key: "fgv" },
  { key: "top100" },
  { key: "linkedin" },
] as const;

export default function TrustPage() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  const tMethod = useTranslations("methodology.qualityBar");

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <SiteNav activePage="about" />

      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 pb-12 pt-20 md:px-6 md:pt-28 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
            {t("credentials.eyebrow")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-5xl lg:text-6xl">
            {t("credentials.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--color-ink-600)]">
            {t("credentials.subhead")}
          </p>
        </section>

        {/* Credentials grid */}
        <section className="border-t border-[var(--color-ink-200)] bg-[var(--color-cream)]">
          <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {credentials.map(({ key }) => (
                <div
                  key={key}
                  className="rounded-xl border border-[var(--color-ink-200)] bg-white p-6"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-gold)]">
                    {t(`credentials.items.${key}.year`)}
                  </p>
                  <h3 className="mt-2 font-display text-base font-bold leading-snug text-[var(--color-ink)]">
                    {t(`credentials.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-600)]">
                    {t(`credentials.items.${key}.detail`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality bar */}
        <section className="border-t border-[var(--color-ink-200)]">
          <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {tMethod("eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
              {tMethod("title")}
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {/* Ships */}
              <div>
                <p className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700">
                  {tMethod("shipsLabel")}
                </p>
                <p className="mb-3 font-display text-lg font-bold text-[var(--color-ink)]">
                  {tMethod("shipsTitle")}
                </p>
                <ul className="space-y-2">
                  {(tMethod.raw("ships") as string[]).map((item: string) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-ink-700)]">
                      <span className="mt-0.5 text-emerald-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skips */}
              <div>
                <p className="mb-4 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-700">
                  {tMethod("skipsLabel")}
                </p>
                <p className="mb-3 font-display text-lg font-bold text-[var(--color-ink)]">
                  {tMethod("skipsTitle")}
                </p>
                <ul className="space-y-2">
                  {(tMethod.raw("skips") as string[]).map((item: string) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-ink-700)]">
                      <span className="mt-0.5 text-red-500">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--color-ink-200)] bg-[var(--color-ink)]">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6 lg:px-8">
            <p className="font-display text-2xl font-black text-[var(--color-cream)] md:text-3xl">
              {t("connect.title")}
            </p>
            <p className="mt-3 text-[var(--color-ink-400)]">{t("connect.subhead")}</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://cal.com/bernardomedrado/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-[var(--color-gold)] px-6 py-3 text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)]"
              >
                {tCommon("ctaBookCall")}
              </a>
              <Link
                href="/about"
                className="rounded-lg border border-[var(--color-ink-600)] px-6 py-3 text-sm font-bold text-[var(--color-cream)] transition-colors hover:border-[var(--color-ink-400)]"
              >
                {tCommon("ctaBack")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
