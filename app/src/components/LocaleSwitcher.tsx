"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] p-1 text-xs font-bold"
      role="group"
      aria-label="Language selector"
    >
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          disabled={isPending}
          aria-current={locale === code ? "true" : undefined}
          className={
            locale === code
              ? "rounded px-2.5 py-1 bg-[var(--color-ink)] text-[var(--color-cream)]"
              : "rounded px-2.5 py-1 text-[var(--color-ink-500)] transition-colors hover:text-[var(--color-ink)] cursor-pointer disabled:cursor-not-allowed"
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}
