import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ENGINES, getAllEngineSlugs, getEngine } from "@/data/engines";
import { Reveal } from "@/components/Reveal";
import { Check, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return getAllEngineSlugs().map((slug) => ({ slug }));
}

// Per-engine OG image overrides. Default falls back to /images/og-default.png from root layout.
const ENGINE_OG: Record<string, string> = {
  lighthouse: "/images/og-lighthouse.png",
  bernie: "/images/og-bernie.png",
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const engine = getEngine(slug);
  if (!engine) return { title: "Engine not found" };
  const ogImage = ENGINE_OG[slug];
  return {
    title: `${engine.name}  ${engine.tag}`,
    description: engine.valueProp,
    ...(ogImage && {
      openGraph: {
        title: `${engine.name}  10XAI`,
        description: engine.valueProp,
        images: [{ url: ogImage, width: 1200, height: 630, alt: `${engine.name}  10XAI` }],
      },
      twitter: {
        card: "summary_large_image" as const,
        title: `${engine.name}  10XAI`,
        description: engine.valueProp,
        images: [ogImage],
      },
    }),
  };
}

export default async function EngineDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const engine = getEngine(slug);
  if (!engine) notFound();

  const others = ENGINES.filter((e) => e.slug !== engine.slug).slice(0, 3);

  // Bernie special: clicking the primary CTA opens the chat instead of routing
  const primaryCtaIsBernieChat = engine.slug === "bernie";
  const primaryCta = engine.primaryCta ?? { label: "Book a 15-min call", href: "/contact" };

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
            <Link href="/engines" className="font-bold text-[var(--color-ink)]">Engines</Link>
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
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <Link href="/engines" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)] hover:text-[var(--color-cream)]">
                 All engines
              </Link>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-cream)]/60">{engine.tag}</p>
              <h1 className="mt-2 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                {engine.name}
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-[var(--color-ink-300)] md:text-xl">{engine.valueProp}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-4 py-1.5 font-bold text-[var(--color-gold)]">
                  {engine.anchor}
                </span>
                <span className="text-[var(--color-ink-300)]">Best for: {engine.bestFor}</span>
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                {primaryCtaIsBernieChat ? (
                  <button type="button" data-talk-to-bernie className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 hover:bg-[var(--color-gold-600)]">
                    {primaryCta.label}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <Link href={primaryCta.href} className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 hover:bg-[var(--color-gold-600)]">
                    {primaryCta.label}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
                <Link href="/contact" className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] hover:border-[var(--color-ink-300)]">
                  Book a Call
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Long description + Who for */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <Reveal>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">What it is</p>
                  <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                    The story behind {engine.name}.
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink-700)]">{engine.longDesc}</p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div className="rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-6 md:p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Who this is for</p>
                  <h3 className="mt-3 font-display text-xl font-bold text-[var(--color-ink)]">If this is you, keep reading.</h3>
                  <ul className="mt-5 space-y-3">
                    {engine.whoFor.map((w, i) => (
                      <li key={i} className="flex items-start gap-3 text-[var(--color-ink-700)]">
                        <Check size={18} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">What it does</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                Capabilities that ship in the first month.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {engine.features.map((f, i) => (
                <Reveal key={f.title} delay={i * 80}>
                  <article className="h-full rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)] p-6 transition-all hover:border-[var(--color-ink)] hover:shadow-md md:p-8">
                    <h3 className="font-display text-xl font-bold text-[var(--color-ink)]">{f.title}</h3>
                    <p className="mt-3 text-[var(--color-ink-700)]">{f.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">How we deploy it</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                The week-by-week shape of the engagement.
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {engine.process.map((p, i) => (
                <Reveal key={p.week} delay={i * 80}>
                  <li className="flex h-full flex-col rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-5 md:p-6">
                    <p className="font-display text-3xl font-black text-[var(--color-gold)]">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-ink-700)]">{p.week}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">{p.deliverable}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Integrations */}
        {engine.integrations && engine.integrations.length > 0 && (
          <section className="bg-[var(--color-cream)]">
            <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Wires into</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-[var(--color-ink)] md:text-3xl">
                  Plays nicely with the tools you already run.
                </h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  {engine.integrations.map((tool) => (
                    <span key={tool} className="rounded-full border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] px-4 py-2 text-sm font-medium text-[var(--color-ink-700)]">
                      {tool}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Other engines */}
        <section className="border-t border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Stack with</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-[var(--color-ink)] md:text-3xl">
                Other engines you might pair this with.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o, i) => (
                <Reveal key={o.slug} delay={i * 80}>
                  <Link
                    href={o.name === "Lighthouse" ? "/lighthouse-demo" : `/engines/${o.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-5 transition-all hover:border-[var(--color-ink)] hover:shadow-md md:p-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">{o.tag}</p>
                    <h3 className="mt-2 font-display text-lg font-bold text-[var(--color-ink)]">{o.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-[var(--color-ink-700)]">{o.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--color-ink)] opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
                  Ready to ship {engine.name}?
                </h2>
                <p className="mt-6 text-lg text-[var(--color-ink-300)] md:text-xl">
                  15 minutes on the phone tells us whether it&rsquo;s the right fit  or whether another engine is. Honest answer either way.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href="/contact" className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 hover:bg-[var(--color-gold-600)]">
                    Book a Call &rarr;
                  </Link>
                  <button type="button" data-talk-to-bernie className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] hover:border-[var(--color-ink-300)]">
                    Talk to Bernie
                  </button>
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
