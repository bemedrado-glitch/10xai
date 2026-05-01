import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

interface SiteNavProps {
  activePage?: "lighthouse" | "engines" | "about" | "methodology";
}

export function SiteNav({ activePage }: SiteNavProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-cream)]"
      >
        {tCommon("skipToContent")}
      </a>
      <header className="sticky top-0 z-30 w-full border-b border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center" aria-label="10XAI home">
            <Image
              src="/brand/logo-wordmark-light.svg"
              alt="10XAI"
              width={150}
              height={42}
              priority
            />
          </Link>
          <nav
            className="hidden items-center gap-8 text-sm font-medium md:flex"
            aria-label={t("primary")}
          >
            <Link
              href="/lighthouse-demo"
              aria-current={activePage === "lighthouse" ? "page" : undefined}
              className={
                activePage === "lighthouse"
                  ? "font-bold text-[var(--color-ink)]"
                  : "text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]"
              }
            >
              {t("lighthouse")}
            </Link>
            <Link
              href="/engines"
              aria-current={activePage === "engines" ? "page" : undefined}
              className={
                activePage === "engines"
                  ? "font-bold text-[var(--color-ink)]"
                  : "text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]"
              }
            >
              {t("engines")}
            </Link>
            <Link
              href="/about"
              aria-current={activePage === "about" ? "page" : undefined}
              className={
                activePage === "about"
                  ? "font-bold text-[var(--color-ink)]"
                  : "text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]"
              }
            >
              {t("about")}
            </Link>
            <Link
              href="/methodology"
              aria-current={activePage === "methodology" ? "page" : undefined}
              className={
                activePage === "methodology"
                  ? "font-bold text-[var(--color-ink)]"
                  : "text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]"
              }
            >
              {t("methodology")}
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <Link
              href="/contact"
              className="hidden rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)] sm:inline-flex"
            >
              {tCommon("ctaBookCallShort")}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
