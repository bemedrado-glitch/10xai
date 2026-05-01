export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      {/* Nav skeleton */}
      <div className="sticky top-0 z-30 w-full border-b border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <div className="h-8 w-32 animate-pulse rounded bg-[var(--color-ink-200)]" />
          <div className="hidden items-center gap-6 md:flex">
            {[80, 64, 48, 88].map((w) => (
              <div key={w} className="h-4 animate-pulse rounded bg-[var(--color-ink-200)]" style={{ width: w }} />
            ))}
          </div>
          <div className="h-9 w-28 animate-pulse rounded-lg bg-[var(--color-ink-200)]" />
        </div>
      </div>

      {/* Hero skeleton */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-20 md:px-6 md:py-28 lg:px-8">
        <div className="h-3 w-32 animate-pulse rounded bg-[var(--color-ink-200)]" />
        <div className="mt-4 h-12 w-3/4 animate-pulse rounded-lg bg-[var(--color-ink-200)] md:h-16" />
        <div className="mt-3 h-12 w-1/2 animate-pulse rounded-lg bg-[var(--color-ink-200)] md:h-16" />
        <div className="mt-6 h-5 w-full max-w-xl animate-pulse rounded bg-[var(--color-ink-200)]" />
        <div className="mt-2 h-5 w-2/3 max-w-xl animate-pulse rounded bg-[var(--color-ink-200)]" />
        <div className="mt-8 flex gap-3">
          <div className="h-11 w-48 animate-pulse rounded-lg bg-[var(--color-gold)]/30" />
          <div className="h-11 w-36 animate-pulse rounded-lg bg-[var(--color-ink-200)]" />
        </div>
      </main>
    </div>
  );
}
