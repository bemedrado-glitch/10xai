import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tCommon = useTranslations("common");

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <SiteNav />
      <main id="main" className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="max-w-lg text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-5xl">
            {t("headline")}
          </h1>
          <p className="mt-4 text-[var(--color-ink-700)]">{t("subhead")}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[var(--color-gold)] px-7 text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)]"
            >
              {t("ctaHome")}
            </Link>
            <button
              type="button"
              data-talk-to-bernie
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--color-ink-300)] px-7 text-sm font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
            >
              {t("ctaBernie")}
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
