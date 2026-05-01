import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <SiteNav />

      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-32 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 font-display text-4xl font-black leading-tight tracking-tight md:text-6xl">
              {t("headlineLine1")}
              <br />
              <span className="text-[var(--color-gold)]">{t("headlineLine2")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-ink-300)] md:text-xl">
              {t("subhead")}
            </p>
          </div>
        </section>

        {/* Booking section */}
        <section className="bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <div className="space-y-10">
              {/* Primary CTA card */}
              <div className="rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-8 text-center md:p-12">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-gold)]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--color-cream)]"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <p className="mt-5 font-display text-xl font-bold text-[var(--color-ink)]">
                  {t("calLabel")}
                </p>
                <a
                  href="https://cal.com/bernardomedrado/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)]"
                >
                  {tCommon("ctaBookCall")}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>

              {/* Direct contact */}
              <div>
                <p className="mb-6 text-center text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-ink-500)]">
                  {t("orLabel")}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href="mailto:contato10xai@gmail.com"
                    className="flex items-center gap-4 rounded-xl border border-[var(--color-ink-300)] bg-[var(--color-cream)] px-6 py-5 transition-all hover:border-[var(--color-ink)] hover:shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink-100)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-ink)]" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink-500)]">{t("emailLabel")}</p>
                      <p className="mt-0.5 text-sm font-medium text-[var(--color-ink)]">contato10xai@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/bernardo-medrado-05369a21/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-[var(--color-ink-300)] bg-[var(--color-cream)] px-6 py-5 transition-all hover:border-[var(--color-ink)] hover:shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink-100)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-ink)]" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink-500)]">{t("linkedinLabel")}</p>
                      <p className="mt-0.5 text-sm font-medium text-[var(--color-ink)]">Bernardo Medrado</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Bernie CTA */}
              <div className="rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-6 text-center">
                <p className="font-display text-base font-bold text-[var(--color-ink)]">{t("bernieLabel")}</p>
                <p className="mt-2 text-sm text-[var(--color-ink-500)]">{t("bernieSubhead")}</p>
                <button
                  type="button"
                  data-talk-to-bernie
                  className="mt-4 inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[var(--color-ink-300)] px-5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
                >
                  {tCommon("ctaTalkToBernie")}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
