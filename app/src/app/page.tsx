import Image from "next/image";
import Link from "next/link";
import { HeroBackground } from "@/components/HeroBackground";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--color-cream)]">
      {/* Top nav */}
      <header className="sticky top-0 z-30 w-full border-b border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center" aria-label="10XAI home">
            <Image
              src="/brand/logo-wordmark-light.svg"
              alt="10XAI"
              width={144}
              height={40}
              priority
            />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/lighthouse-demo" className="text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]">
              Lighthouse
            </Link>
            <Link href="/engines" className="text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]">
              Engines
            </Link>
            <Link href="/about" className="text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]">
              About
            </Link>
            <Link href="/methodology" className="text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]">
              Methodology
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* Locale bar */}
            <div className="flex items-center gap-1 rounded-lg border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] p-1 text-xs font-bold">
              <button
                type="button"
                aria-current="true"
                className="rounded px-2.5 py-1 bg-[var(--color-ink)] text-[var(--color-cream)]"
              >
                EN
              </button>
              <button
                type="button"
                disabled
                className="rounded px-2.5 py-1 text-[var(--color-ink-500)] cursor-not-allowed"
                title="Coming soon"
              >
                PT
              </button>
              <button
                type="button"
                disabled
                className="rounded px-2.5 py-1 text-[var(--color-ink-500)] cursor-not-allowed"
                title="Coming soon"
              >
                ES
              </button>
            </div>
            <Link
              href="/contact"
              className="hidden rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)] sm:inline-flex"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </header>

      {/* Hero (dark, video-backed) */}
      <section className="relative overflow-hidden text-[var(--color-cream)]">
        <HeroBackground />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-32 md:px-6 md:py-40 lg:px-8 lg:py-48">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
              AI Operating Systems  US  Brasil  LatAm
            </p>
            <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              While your competitors deploy AI,
              <br className="hidden md:block" />
              <span className="text-[var(--color-gold)]"> you&rsquo;re still researching it.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-300)] md:text-xl">
              We build AI Operating Systems for the businesses that can&rsquo;t afford a 12-person team. From kickoff to running operations in four weeks  in English, Portuguese, or Spanish.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/lighthouse-demo"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] transition-all hover:bg-[var(--color-gold-600)]"
              >
                Try Lighthouse  Live Demo
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
              <button
                type="button"
                data-talk-to-bernie
                className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-cream)]/30 bg-[var(--color-cream)]/5 px-8 text-base font-bold text-[var(--color-cream)] backdrop-blur transition-colors hover:border-[var(--color-cream)] hover:bg-[var(--color-cream)]/10"
              >
                Talk to Bernie
              </button>
            </div>
            <p className="mt-12 max-w-2xl text-sm font-medium text-[var(--color-cream)]/80">
              Developed by industry veterans with <span className="text-[var(--color-gold)]">20+ years</span> in revenue technology and frontier AI experts.
            </p>
            <p className="mt-2 max-w-2xl text-xs uppercase tracking-[0.18em] text-[var(--color-ink-300)]">
              Most SMBs will choose their AI partner in the next 18 months. Choose right the first time.
            </p>
          </div>
        </div>
      </section>

      {/* Three principles */}
      <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <p className="font-display text-5xl font-black text-[var(--color-gold)]">01</p>
              <h3 className="mt-4 font-display text-2xl font-bold text-[var(--color-ink)]">One priority.</h3>
              <p className="mt-3 text-[var(--color-ink-700)]">
                We pick the single workflow whose AI lift will compound the fastest. Not six pilots. One running system.
              </p>
            </div>
            <div>
              <p className="font-display text-5xl font-black text-[var(--color-gold)]">02</p>
              <h3 className="mt-4 font-display text-2xl font-bold text-[var(--color-ink)]">Four weeks to production.</h3>
              <p className="mt-3 text-[var(--color-ink-700)]">
                From kickoff to running operations in 28 days. We measure the baseline week 1 and the lift week 4.
              </p>
            </div>
            <div>
              <p className="font-display text-5xl font-black text-[var(--color-gold)]">03</p>
              <h3 className="mt-4 font-display text-2xl font-bold text-[var(--color-ink)]">One aligned team.</h3>
              <p className="mt-3 text-[var(--color-ink-700)]">
                You get an operator, not a vendor. A single founder leading the work in EN, PT-BR, or ES  your call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engines preview */}
      <section className="bg-[var(--color-cream)]">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-ink-700)]">The 10XAI Stack</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-5xl">
              Six engines. One operating system.
            </h2>
            <p className="mt-6 text-lg text-[var(--color-ink-700)]">
              Each engine ships running, not as a tool you have to learn. Pick the one your business is feeling friction in. Stack them when you&rsquo;re ready.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Lighthouse", tag: "Lead engine", desc: "We find local businesses with proven demand and ship them a website. Then we reach out.", anchor: "From $497 + $49/mo", href: "/lighthouse-demo" },
              { name: "Sales Engine", tag: "AI SDR", desc: "Autonomous outbound across email + LinkedIn + WhatsApp. Books meetings while you sleep.", anchor: "From $1,500 + $499/mo" },
              { name: "Care Engine", tag: "Customer Success", desc: "Real-time AI customer service + booking automation + AI-powered review responses.", anchor: "From $1,500 + $499/mo" },
              { name: "Reach Engine", tag: "Marketing", desc: "Content generation, social orchestration, and ad operations on one autonomous track.", anchor: "From $2,500 + $799/mo" },
              { name: "Mind Engine", tag: "LMS / Onboarding", desc: "Knowledge consolidation and role-based training, deployed as an AI tutor.", anchor: "From $3,500" },
              { name: "Bid Engine", tag: "RFP intelligence", desc: "AI agents that interpret RFPs, qualify the opportunity, and draft the response.", anchor: "From $5,000" },
            ].map((engine) => {
              const Wrapper = (engine.href ? Link : "article") as React.ElementType;
              const wrapperProps = engine.href ? { href: engine.href } : {};
              return (
                <Wrapper
                  key={engine.name}
                  {...wrapperProps}
                  className="group flex flex-col rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)] p-6 transition-all hover:border-[var(--color-ink-700)] hover:shadow-md md:p-8"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                    {engine.tag}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-[var(--color-ink)]">{engine.name}</h3>
                  <p className="mt-3 flex-1 text-[var(--color-ink-700)]">{engine.desc}</p>
                  <p className="mt-6 text-sm font-medium text-[var(--color-ink-500)]">{engine.anchor}</p>
                </Wrapper>
              );
            })}
            <article className="group flex flex-col rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold-100)]/40 p-6 transition-all hover:border-[var(--color-gold)] md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Concierge</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-[var(--color-ink)]">Bernie</h3>
              <p className="mt-3 flex-1 text-[var(--color-ink-700)]">
                Real-time AI sales agent on your site. Chat first; voice and avatar later. Trilingual.
              </p>
              <p className="mt-6 text-sm font-medium text-[var(--color-ink-500)]">From $99/mo</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
        <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Pilot purgatory ends here.
            </h2>
            <p className="mt-6 text-lg text-[var(--color-ink-300)] md:text-xl">
              77% of SMBs that buy AI tools abandon them in six months. We don&rsquo;t sell tools. We deliver running operating systems that survive year two.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] transition-all hover:bg-[var(--color-gold-600)]"
              >
                Book a Call &rarr;
              </Link>
              <button
                type="button"
                data-talk-to-bernie
                className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] transition-colors hover:border-[var(--color-ink-300)] hover:bg-[var(--color-ink-900)]"
              >
                Talk to Bernie
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <Image
              src="/brand/logo-wordmark-light.svg"
              alt="10XAI"
              width={120}
              height={32}
            />
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-ink-700)]">
              <Link href="/lighthouse-demo" className="hover:text-[var(--color-ink)]">Lighthouse</Link>
              <Link href="/engines" className="hover:text-[var(--color-ink)]">Engines</Link>
              <Link href="/about" className="hover:text-[var(--color-ink)]">About</Link>
              <Link href="/methodology" className="hover:text-[var(--color-ink)]">Methodology</Link>
              <Link href="/trust" className="hover:text-[var(--color-ink)]">Trust</Link>
              <Link href="/contact" className="hover:text-[var(--color-ink)]">Contact</Link>
            </nav>
          </div>
          <p className="mt-8 text-xs text-[var(--color-ink-500)]">
            &copy; 2026 10XAI  Apex / Raleigh, NC  contato10xai@gmail.com
          </p>
        </div>
      </footer>

      {/* Wire data-talk-to-bernie buttons to the BernieChat global event */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.addEventListener('click',function(e){var b=e.target.closest('[data-talk-to-bernie]');if(b){e.preventDefault();window.dispatchEvent(new Event('talk-to-bernie'));}});`,
        }}
      />
    </div>
  );
}
