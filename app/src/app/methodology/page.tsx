import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Search, Hammer, Rocket, Activity, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Methodology  How 10XAI delivers running AI systems",
  description:
    "From pilot purgatory to production AI. Discovery-led, week-by-week deliverables, measurement on day one. The 10XAI 4-week protocol.",
};

const PROTOCOL = [
  {
    icon: Search,
    week: "Week 1",
    title: "Discover",
    body: "We sit with the operator. Watch the workflow. Find the friction. Capture the baseline metrics so week 4 has something to measure against.",
    deliverables: [
      "Operator interviews and workflow shadowing",
      "Baseline metrics captured (response time, conversion, throughput  whatever matters)",
      "ICP, brand voice, and integration map confirmed",
      "Engagement scope locked, milestones agreed",
    ],
  },
  {
    icon: Hammer,
    week: "Week 2",
    title: "Build",
    body: "We build the AI agents around your actual operations. Your tone of voice. Your CRM. Your stack. Not a generic template. Iterate fast with you in the loop.",
    deliverables: [
      "AI agent(s) trained on your knowledge base",
      "Integrations wired (CRM, calendar, WhatsApp, email)",
      "Compliance + escalation rules captured in code",
      "Internal QA across all three languages where relevant",
    ],
  },
  {
    icon: Rocket,
    week: "Week 3",
    title: "Ship",
    body: "Launch the system into production with monitoring on day one. Operator dashboards live. Real conversations, real bookings, real outputs  not a demo.",
    deliverables: [
      "Production deployment with monitoring in place",
      "Operator training on the live system (1:1, recorded)",
      "Real-time alerting on quality, drift, escalation",
      "First-week conversation review and tuning",
    ],
  },
  {
    icon: Activity,
    week: "Week 4",
    title: "Measure & adopt",
    body: "Compare week 1 baseline to week 4 lift. Tune what's not landing. Hand the operator the keys with documentation and a 30-day support window.",
    deliverables: [
      "Lift measurement vs. week-1 baseline",
      "Documentation handoff + admin training",
      "30-day post-launch tuning window",
      "Roadmap for month 23 if expanding to other engines",
    ],
  },
];

const SHIPS = [
  "Running systems  not slide decks",
  "Measurable lift on a metric you defined",
  "Documentation an operator can hand to their successor",
  "Brand-voice consistency across every output",
  "Compliance baked in from day one",
  "Single-founder accountability",
];

const SKIPS = [
  "Generic AI strategy decks",
  "30-page best-practices PDFs",
  "Tools you have to learn before they help",
  "Per-seat pricing on a chatbot",
  "Hand-offs that vanish at launch",
  "Whatever else is wasting your time",
];

export default function MethodologyPage() {
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
            <Link href="/engines" className="text-[var(--color-ink-700)] hover:text-[var(--color-ink)]">Engines</Link>
            <Link href="/about" className="text-[var(--color-ink-700)] hover:text-[var(--color-ink)]">About</Link>
            <Link href="/methodology" aria-current="page" className="font-bold text-[var(--color-ink)]">Methodology</Link>
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
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Methodology</p>
              <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                From pilot purgatory
                <br className="hidden md:block" />
                <span className="text-[var(--color-gold)]"> to production AI.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-[var(--color-ink-300)] md:text-xl">
                The 4-week protocol that gets your operators out of strategy decks and into running systems. Measured on day one. Tuned on day twenty-eight. Yours from day twenty-nine.
              </p>
            </Reveal>
          </div>
        </section>

        {/* The protocol */}
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">The protocol</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-5xl">
                Four weeks. Four deliverables.
                <br />
                <span className="text-[var(--color-gold)]">No surprises.</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {PROTOCOL.map((step, i) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.week} delay={i * 100}>
                    <article className="flex h-full flex-col rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)] p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--color-ink)] text-[var(--color-cream)]">
                          <Icon size={22} strokeWidth={2.25} />
                        </span>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">{step.week}</p>
                          <h3 className="mt-1 font-display text-2xl font-bold text-[var(--color-ink)]">{step.title}</h3>
                        </div>
                      </div>
                      <p className="mt-4 text-[var(--color-ink-700)]">{step.body}</p>
                      <ul className="mt-5 space-y-2">
                        {step.deliverables.map((d, di) => (
                          <li key={di} className="flex items-start gap-2 text-sm text-[var(--color-ink-700)]">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* What we ship vs. don't */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Quality bar</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                What we ship. What we don&rsquo;t.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Reveal delay={100}>
                <div className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold-100)]/40 p-6 md:p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">Yes</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[var(--color-ink)]">We ship this.</h3>
                  <ul className="mt-5 space-y-3">
                    {SHIPS.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-[var(--color-ink-700)]">
                        <Check size={18} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="rounded-xl border border-[var(--color-ink-300)] bg-[var(--color-cream)] p-6 md:p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-500)]">No</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[var(--color-ink)]">We skip this.</h3>
                  <ul className="mt-5 space-y-3">
                    {SKIPS.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-[var(--color-ink-500)]">
                        <X size={18} className="mt-0.5 shrink-0 text-[var(--color-ink-300)]" />
                        <span className="line-through decoration-[var(--color-ink-300)]/60">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
                  Ready to start week 1?
                </h2>
                <p className="mt-6 text-lg text-[var(--color-ink-300)] md:text-xl">
                  15 minutes on the phone tells us whether one of the engines fits  or doesn&rsquo;t. No deck. No commitment. Honest answer either way.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href="/contact" className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 hover:bg-[var(--color-gold-600)]">
                    Book a 15-min call &rarr;
                  </Link>
                  <button type="button" data-talk-to-bernie className="inline-flex h-14 items-center justify-center rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] hover:border-[var(--color-ink-300)] hover:bg-[var(--color-ink-900)]">
                    Talk to Bernie first
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
