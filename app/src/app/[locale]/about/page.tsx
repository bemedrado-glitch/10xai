import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { GraduationCap, Award, BookOpen, Globe, Mail } from "lucide-react";

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.22.79 24 1.77 24h20.45C23.2 24 24 23.22 24 22.27V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.metadata" });
  return { title: t("title"), description: t("description") };
}

const CREDENTIAL_ICONS = [GraduationCap, BookOpen, Award, GraduationCap, Award, Award];

const LANGUAGE_CODES = [
  { code: "EN", key: "en" },
  { code: "PT-BR", key: "pt" },
  { code: "ES", key: "es" },
] as const;

export default function AboutPage() {
  const t = useTranslations("about");

  const credentialKeys = ["atdMaster", "atdInstructional", "aaIsp", "fgv", "top100", "linkedin"] as const;

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-cream)]">
      <SiteNav activePage="about" />

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="grid lg:grid-cols-2">
            <div className="relative z-10 px-4 py-20 md:px-6 md:py-32 lg:px-8 lg:py-40">
              <div className="mx-auto max-w-xl lg:ml-auto lg:mr-0">
                <Reveal>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                    {t("eyebrow")}
                  </p>
                  <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                    {t("headlineLine1")}
                    <span className="text-[var(--color-gold)]"> {t("headlineLine2")}</span>
                  </h1>
                  <p className="mt-8 text-lg text-[var(--color-ink-300)] md:text-xl">
                    {t("subhead")}
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="relative aspect-[4/5] w-full lg:aspect-auto">
              <Image
                src="/images/founder-studio.jpg"
                alt="Bernardo Medrado, founder of 10XAI"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 lg:bg-gradient-to-r lg:from-[var(--color-ink)] lg:via-transparent lg:to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-32">
                  <div className="overflow-hidden rounded-2xl border border-[var(--color-ink-300)] shadow-sm">
                    <Image
                      src="/images/founder-cafe.jpg"
                      alt="Bernardo Medrado at a café in Apex, North Carolina"
                      width={1024}
                      height={576}
                      className="h-auto w-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <p className="mt-3 text-xs text-[var(--color-ink-500)]">
                    Apex, NC – most discovery weeks start over coffee.
                  </p>
                </div>
              </Reveal>
              <div>
                <Reveal>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                    {t("story.eyebrow")}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                    {t("story.title")}
                  </h2>
                </Reveal>
                <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--color-ink-700)]">
                  <Reveal delay={100}><p>{t("story.p1")}</p></Reveal>
                  <Reveal delay={200}>
                    <p>
                      {t("story.p2start")}{" "}
                      <strong className="text-[var(--color-ink)]">{t("story.p2bold")}</strong>{" "}
                      {t("story.p2end")}
                    </p>
                  </Reveal>
                  <Reveal delay={300}><p>{t("story.p3")}</p></Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("credentials.eyebrow")}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                {t("credentials.title")}
              </h2>
              <p className="mt-6 max-w-2xl text-[var(--color-ink-700)]">
                {t("credentials.subhead")}
              </p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {credentialKeys.map((key, i) => {
                const Icon = CREDENTIAL_ICONS[i];
                return (
                  <Reveal key={key} delay={i * 80}>
                    <article className="group flex h-full flex-col rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)] p-6 transition-all hover:border-[var(--color-ink)] hover:shadow-md">
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-ink)] text-[var(--color-cream)] transition-all duration-500 group-hover:bg-[var(--color-gold)] group-hover:rotate-[8deg]">
                          <Icon size={20} strokeWidth={2.25} />
                        </span>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                          {t(`credentials.items.${key}.year`)}
                        </p>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold leading-tight text-[var(--color-ink)]">
                        {t(`credentials.items.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--color-ink-700)]">
                        {t(`credentials.items.${key}.detail`)}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Languages */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("languages.eyebrow")}
              </p>
              <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                {t("languages.title")}
              </h2>
              <p className="mt-6 max-w-2xl text-[var(--color-ink-700)]">
                {t("languages.subhead")}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {LANGUAGE_CODES.map(({ code, key }, i) => (
                <Reveal key={code} delay={i * 100}>
                  <div className="flex items-center gap-4 rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--color-gold)] font-display text-sm font-black text-[var(--color-cream)]">
                      {code}
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold text-[var(--color-ink)]">
                        {t(`languages.items.${key}.name`)}
                      </p>
                      <p className="text-sm text-[var(--color-ink-700)]">
                        {t(`languages.items.${key}.level`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Connect */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  {t("connect.eyebrow")}
                </p>
                <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
                  {t("connect.title")}
                </h2>
                <p className="mt-6 text-lg text-[var(--color-ink-300)]">{t("connect.subhead")}</p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 transition-all hover:bg-[var(--color-gold-600)]"
                  >
                    {t("connect.ctaBook")}
                  </Link>
                  <a
                    href="https://www.linkedin.com/in/bernardo-medrado-05369a21/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] transition-colors hover:border-[var(--color-ink-300)] hover:bg-[var(--color-ink-900)]"
                  >
                    <LinkedinIcon size={18} /> {t("connect.ctaLinkedin")}
                  </a>
                  <a
                    href="mailto:contato10xai@gmail.com"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] transition-colors hover:border-[var(--color-ink-300)] hover:bg-[var(--color-ink-900)]"
                  >
                    <Mail size={18} /> {t("connect.ctaEmail")}
                  </a>
                </div>
                <p className="mt-10 flex items-center gap-2 text-sm text-[var(--color-ink-300)]">
                  <Globe size={16} className="text-[var(--color-gold)]" />
                  {t("connect.location")}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
