"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/lighthouse-demo" as const, label: t("lighthouse"), key: "lighthouse" },
    { href: "/engines" as const, label: t("engines"), key: "engines" },
    { href: "/about" as const, label: t("about"), key: "about" },
    { href: "/methodology" as const, label: t("methodology"), key: "methodology" },
  ] as const;

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
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="10XAI home">
            <Image
              src="/brand/logo-wordmark-light.svg"
              alt="10XAI"
              width={150}
              height={42}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-8 text-sm font-medium md:flex"
            aria-label={t("primary")}
          >
            {navLinks.map(({ href, label, key }) => (
              <Link
                key={key}
                href={href}
                aria-current={activePage === key ? "page" : undefined}
                className={
                  activePage === key
                    ? "font-bold text-[var(--color-ink)]"
                    : "text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]"
                }
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden items-center gap-3 md:flex">
            <LocaleSwitcher />
            <a
              href="https://cal.com/bernardomedrado/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)]"
            >
              {tCommon("ctaBookCallShort")}
            </a>
          </div>

          {/* Mobile: locale + burger */}
          <div className="flex items-center gap-2 md:hidden">
            <LocaleSwitcher />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink-100)]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <nav
            id="mobile-nav"
            aria-label={t("primary")}
            className="border-t border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] px-4 pb-5 pt-3 md:hidden"
          >
            <ul className="space-y-1">
              {navLinks.map(({ href, label, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    aria-current={activePage === key ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={
                      activePage === key
                        ? "block rounded-lg bg-[var(--color-ink-100)] px-4 py-3 text-sm font-bold text-[var(--color-ink)]"
                        : "block rounded-lg px-4 py-3 text-sm font-medium text-[var(--color-ink-700)] transition-colors hover:bg-[var(--color-ink-100)] hover:text-[var(--color-ink)]"
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-[var(--color-ink-300)]/40 pt-4">
              <a
                href="https://cal.com/bernardomedrado/15min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block w-full rounded-lg bg-[var(--color-gold)] px-4 py-3 text-center text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)]"
              >
                {tCommon("ctaBookCallShort")}
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
