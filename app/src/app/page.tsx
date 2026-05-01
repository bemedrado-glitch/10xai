import Image from "next/image";
import Link from "next/link";
import { HeroBackground } from "@/components/HeroBackground";
import { Reveal } from "@/components/Reveal";
import { EngineCard, type Engine } from "@/components/EngineCard";

const ENGINES: Engine[] = [
  {
    iconKey: "lighthouse",
    name: "Lighthouse",
    tag: "Lead engine",
    desc: "Find local businesses with proven demand. Ship them a website. Reach out  and close.",
    details: [
      "Find local SMBs with great Google reviews and no website",
      "Generate a tailored 5-section site from their data in 60 seconds",
      "Personalized outreach across email, WhatsApp, Instagram",
    ],
    bestFor: "Local service businesses  dental, home services, beauty, food",
    anchor: "From $497 + $49/mo",
    href: "/lighthouse-demo",
  },
  {
    iconKey: "sales",
    name: "Sales Engine",
    tag: "AI SDR",
    desc: "Autonomous outbound that books meetings while you sleep.",
    details: [
      "Multichannel cadences across email, LinkedIn, and WhatsApp",
      "Daily-fresh prospect lists from real-time intent signals",
      "Books qualified meetings directly into your calendar",
    ],
    bestFor: "B2B SaaS, agencies, consulting firms with sales gaps",
    anchor: "From $1,500 + $499/mo",
  },
  {
    iconKey: "care",
    name: "Care Engine",
    tag: "Customer Success",
    desc: "Real-time AI customer service, booking, and AI-powered review responses.",
    details: [
      "24/7 AI agent handles tier-1 support across web + WhatsApp + email",
      "Booking automation tied to your calendar and team availability",
      "AI review responses that protect and grow your reputation",
    ],
    bestFor: "Service businesses with customer-volume pressure",
    anchor: "From $1,500 + $499/mo",
  },
  {
    iconKey: "reach",
    name: "Reach Engine",
    tag: "Marketing",
    desc: "Content, social, and ads on one autonomous track  in your brand voice.",
    details: [
      "Content generation in your brand voice, multilingual",
      "Social orchestration across LinkedIn, Instagram, Facebook",
      "Ad operations with performance feedback loops",
    ],
    bestFor: "Brands needing constant content with lean teams",
    anchor: "From $2,500 + $799/mo",
  },
  {
    iconKey: "mind",
    name: "Mind Engine",
    tag: "LMS / Onboarding",
    desc: "Knowledge consolidation and role-based training, deployed as an AI tutor.",
    details: [
      "Pulls knowledge from your existing docs, SOPs, and Slack",
      "Role-based onboarding paths that ramp new hires faster",
      "Continuous training on policy + product changes",
    ],
    bestFor: "Teams growing fast or with high turnover",
    anchor: "From $3,500",
  },
  {
    iconKey: "bid",
    name: "Bid Engine",
    tag: "RFP intelligence",
    desc: "AI agents that interpret RFPs, qualify the opportunity, and draft the response.",
    details: [
      "Reads RFPs and surfaces fit, risk, and competition in minutes",
      "Drafts tailored responses anchored on your past wins",
      "Tracks every bid against win-loss patterns",
    ],
    bestFor: "Service firms responding to RFPs/RFQs regularly",
    anchor: "From $5,000",
  },
  {
    iconKey: "bernie",
    name: "Bernie",
    tag: "Concierge",
    desc: "Real-time AI sales agent on your site. Trilingual. Trained on your voice.",
    details: [
      "24/7 chat agent on your site, in EN/PT-BR/ES",
      "Trained on your services, FAQs, and tone of voice",
      "Books meetings, captures leads, escalates to human",
    ],
    bestFor: "Any business with web traffic and a sales motion",
    anchor: "From $99/mo",
    variant: "concierge",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--color-cream)]">
      {/* Skip to content (a11y) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-cream)]"
      >
        Skip to content
      </a>

      {/* Top nav */}
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
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Primary">
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
            <div className="flex items-center gap-1 rounded-lg border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] p-1 text-xs font-bold" role="group" aria-label="Language selector">
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
                aria-label="Portuguese  coming soon"
              >
                PT
              </button>
              <button
                type="button"
                disabled
                className="rounded px-2.5 py-1 text-[var(--color-ink-500)] cursor-not-allowed"
                title="Coming soon"
                aria-label="Spanish  coming soon"
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

      <main id="main">
        {/* Hero (dark, video-backed) */}
        <section className="relative overflow-hidden text-[var(--color-cream)]">
          <HeroBackground />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-32 md:px-6 md:py-40 lg:px-8 lg:py-52">
            <div className="max-w-5xl">
              <Reveal>
                <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] backdrop-blur md:text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-gold)]" />
                  </span>
                  AI Tailored to Your Business  Built to Run
                </p>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="font-display font-black leading-[0.95] tracking-tight text-[2.75rem] md:text-7xl lg:text-[6.25rem]">
                  Custom AI agents
                  <br />
                  that run{" "}
                  <span className="text-[var(--color-gold)]">your business.</span>
                </h1>
              </Reveal>
              <Reveal delay={260}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-300)] md:text-xl">
                  We sit with you, learn what's actually slowing you down, and ship the AI Operating System that runs it for you  not another tool you have to learn.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/lighthouse-demo"
                    className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 transition-all hover:bg-[var(--color-gold-600)] hover:shadow-[var(--color-gold)]/50"
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
              </Reveal>
              <Reveal delay={540}>
                <div className="mt-14 max-w-3xl border-l-2 border-[var(--color-gold)]/40 pl-5">
                  <p className="text-sm font-medium leading-relaxed text-[var(--color-cream)]/90 md:text-base">
                    Developed by industry veterans with{" "}
                    <span className="font-bold text-[var(--color-gold)]">20+ years</span>{" "}
                    in revenue technology and frontier AI experts.
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--color-ink-300)]">
                    Most SMBs will choose their AI partner in the next 18 months. Choose right the first time.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
          {/* Subtle scroll indicator */}
          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[var(--color-cream)]/40" aria-hidden="true">
            <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
              <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="10" cy="10" r="2.5" fill="currentColor">
                <animate attributeName="cy" from="10" to="22" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>

        {/* Three principles */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">How we work</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                Sit. Learn. Ship.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-12 md:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "Sit with you.",
                  body: "Discovery isn't a slide deck. We sit with the operator, watch the workflow, and find the friction that's eating the most of your week.",
                },
                {
                  num: "02",
                  title: "Build for you.",
                  body: "We design the AI agents around your actual operations, not a generic template. Your tone of voice. Your CRM. Your stack.",
                },
                {
                  num: "03",
                  title: "Ship it running.",
                  body: "We don't hand you a tool you have to learn. We ship the system already running  measured, monitored, and yours to evolve.",
                },
              ].map((p, i) => (
                <Reveal key={p.num} delay={i * 120}>
                  <div>
                    <p className="font-display text-6xl font-black text-[var(--color-gold)]">{p.num}</p>
                    <h3 className="mt-4 font-display text-2xl font-bold text-[var(--color-ink)]">{p.title}</h3>
                    <p className="mt-3 text-[var(--color-ink-700)]">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats / proof band */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
            <div className="grid gap-10 md:grid-cols-4">
              {[
                { stat: "77%", label: "of SMBs abandon AI tools within 6 months" },
                { stat: "3M+", label: "small businesses with no website. Lighthouse finds them." },
                { stat: "3", label: "languages we deliver in natively  EN, PT-BR, ES" },
                { stat: "20+", label: "years of revenue-technology experience behind every build" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="border-l-2 border-[var(--color-gold)] pl-5">
                    <p className="font-display text-5xl font-black text-[var(--color-gold)] md:text-6xl">{item.stat}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-300)]">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Engines */}
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">The 10XAI Stack</p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-5xl lg:text-6xl">
                Six engines.
                <br />
                <span className="text-[var(--color-gold)]">One operating system.</span>
              </h2>
              <p className="mt-6 max-w-3xl text-lg text-[var(--color-ink-700)]">
                Each engine ships running, not as a tool you have to learn. Pick the one your business is feeling friction in. Stack them when you&rsquo;re ready. Hover for details.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ENGINES.map((engine, i) => (
                <Reveal key={engine.name} delay={i * 60}>
                  <EngineCard engine={engine} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(202, 138, 4, 0.4) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32 lg:px-8">
            <Reveal>
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
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 transition-all hover:bg-[var(--color-gold-600)]"
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
            </Reveal>
          </div>
        </section>
      </main>

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
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-ink-700)]" aria-label="Footer">
              <Link href="/lighthouse-demo" className="hover:text-[var(--color-ink)]">Lighthouse</Link>
              <Link href="/engines" className="hover:text-[var(--color-ink)]">Engines</Link>
              <Link href="/about" className="hover:text-[var(--color-ink)]">About</Link>
              <Link href="/methodology" className="hover:text-[var(--color-ink)]">Methodology</Link>
              <Link href="/trust" className="hover:text-[var(--color-ink)]">Trust</Link>
              <Link href="/privacy" className="hover:text-[var(--color-ink)]">Privacy</Link>
              <Link href="/terms" className="hover:text-[var(--color-ink)]">Terms</Link>
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
