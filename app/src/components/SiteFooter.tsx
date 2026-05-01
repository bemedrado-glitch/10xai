import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Image
            src="/brand/logo-wordmark-light.svg"
            alt="10XAI"
            width={120}
            height={32}
          />
          <nav
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-ink-700)]"
            aria-label={tNav("footer")}
          >
            <Link href="/lighthouse-demo" className="hover:text-[var(--color-ink)]">
              {t("links.lighthouse")}
            </Link>
            <Link href="/engines" className="hover:text-[var(--color-ink)]">
              {t("links.engines")}
            </Link>
            <Link href="/about" className="hover:text-[var(--color-ink)]">
              {t("links.about")}
            </Link>
            <Link href="/methodology" className="hover:text-[var(--color-ink)]">
              {t("links.methodology")}
            </Link>
            <Link href="/privacy" className="hover:text-[var(--color-ink)]">
              {t("links.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-[var(--color-ink)]">
              {t("links.terms")}
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-[var(--color-ink-500)]">{t("address")}</p>
      </div>
    </footer>
  );
}
