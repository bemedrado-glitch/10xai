import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ENGINES } from "@/data/engines";
import { EngineCard } from "@/components/EngineCard";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Engines  Six AI Operating Systems for SMBs",
  description:
    "Lighthouse, Sales, Care, Reach, Mind, Bid + Bernie  the seven engines that run AI operations for small and mid-sized businesses.",
};

export default function EnginesIndexPage() {
  // Build cards from the data module, with proper hrefs.
  const cards = ENGINES.map((e) => ({
    iconKey: e.iconKey,
    name: e.name,
    tag: e.tag,
    desc: e.desc,
    details: e.details,
    bestFor: e.bestFor,
    anchor: e.anchor,
    variant: e.variant,
    href:
      e.name === "Bernie"
        ? undefined
        : e.name === "Lighthouse"
        ? "/lighthouse-demo"
        : `/engines/${e.slug}`,
  }));

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-cream)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-cream)]">Skip to content</a>

      <header className="sticky top-0 z-30 w-full border-b border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center" aria-label="10XAI home">
            <Image src="/brand/logo-wordmark-light.svg" alt="10XAI" width={144} height={40} priority />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Primary">
            <Link href="/lighthouse-demo" className="text-[var(--color-ink-700)] hover:text-[var(--color-ink)]">Lighthouse</Link>
            <Link href="/engines" aria-current="page" className="font-bold text-[var(--color-ink)]">Engines</Link>
            <Link href="/about" className="text-[var(--color-ink-700)] hover:text-[var(--color-ink)]">About</Link>
            <Link href="/methodology" className="text-[var(--color-ink-700)] hover:text-[var(--color-ink)]">Methodology</Link>
          </nav>
          <Link href="/contact" className="hidden rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-bold text-[var(--color-cream)] hover:bg-[var(--color-gold-600)] sm:inline-flex">
            Book a Call
          </Link>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-32 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">The 10XAI Stack</p>
              <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                Six engines.
                <br />
                <span className="text-[var(--color-gold)]"> One operating system.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-[var(--color-ink-300)] md:text-xl">
                Each engine ships running, not as a tool you have to learn. Pick the one your business is feeling friction in. Stack them when you&rsquo;re ready. Hover any card for what you get + who it&rsquo;s for.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Cards */}
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((engine, i) => (
                <Reveal key={engine.name} delay={i * 60}>
                  <EngineCard engine={engine} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--color-ink-300)]/60 bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="font-display text-3xl font-black tracking-tight md:text-5xl">
                  Not sure which one fits?
                </h2>
                <p className="mt-6 text-lg text-[var(--color-ink-300)] md:text-xl">
                  Tell Bernie what&rsquo;s eating the most of your week  he&rsquo;ll point you at the right engine and book a 15-minute call to confirm.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button type="button" data-talk-to-bernie className="inline-flex h-14 items-center justify-center rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] hover:bg-[var(--color-gold-600)]">
                    Talk to Bernie
                  </button>
                  <Link href="/methodology" className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] hover:border-[var(--color-ink-300)]">
                    See the methodology
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <Image src="/brand/logo-wordmark-light.svg" alt="10XAI" width={120} height={32} />
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-ink-700)]" aria-label="Footer">
              <Link href="/lighthouse-demo" className="hover:text-[var(--color-ink)]">Lighthouse</Link>
              <Link href="/engines" className="hover:text-[var(--color-ink)]">Engines</Link>
              <Link href="/about" className="hover:text-[var(--color-ink)]">About</Link>
              <Link href="/methodology" className="hover:text-[var(--color-ink)]">Methodology</Link>
              <Link href="/privacy" className="hover:text-[var(--color-ink)]">Privacy</Link>
              <Link href="/terms" className="hover:text-[var(--color-ink)]">Terms</Link>
            </nav>
          </div>
          <p className="mt-8 text-xs text-[var(--color-ink-500)]">&copy; 2026 10XAI &middot; contato10xai@gmail.com</p>
        </div>
      </footer>

      <script
        dangerouslySetInnerHTML={{
          __html: `document.addEventListener('click',function(e){var b=e.target.closest('[data-talk-to-bernie]');if(b){e.preventDefault();window.dispatchEvent(new Event('talk-to-bernie'));}});`,
        }}
      />
    </div>
  );
}
