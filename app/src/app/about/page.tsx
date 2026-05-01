import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { GraduationCap, Award, BookOpen, Globe, Mail } from "lucide-react";

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.22.79 24 1.77 24h20.45C23.2 24 24 23.22 24 22.27V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About  Bernardo Medrado, founder of 10XAI",
  description:
    "20+ years in revenue technology. ATD Master Trainer, AA-ISP Accredited, FGV. Trilingual native (EN, PT-BR, ES). Why 10XAI exists, and who's behind it.",
};

const CREDENTIALS = [
  {
    icon: GraduationCap,
    title: "ATD Master Trainer",
    detail: "Association for Talent Development  the gold standard for instructional design and training methodology.",
    year: "2021",
  },
  {
    icon: BookOpen,
    title: "ATD Instructional Design Certificate",
    detail: "Advanced certification in role-based learning architecture and adult-learning theory.",
    year: "2021",
  },
  {
    icon: Award,
    title: "AA-ISP Accredited Inside Sales Management",
    detail: "American Association of Inside Sales Professionals  modern revenue-team operating practices.",
    year: "2023",
  },
  {
    icon: GraduationCap,
    title: "FGV  Fundao Getulio Vargas",
    detail: "Brazil's #1 business school. Foundational training in management and operations.",
    year: "20012002",
  },
  {
    icon: Award,
    title: "Top 100 Most Influential in Healthcare",
    detail: "Public recognition in Brazilian healthcare sector  external validation that pre-dates 10XAI.",
    year: "2015",
  },
  {
    icon: Award,
    title: "LinkedIn Sales Navigator certifications",
    detail: "Modern social-selling and prospecting credentials.",
    year: "20232024",
  },
];

const LANGUAGES = [
  { code: "EN", name: "English", level: "Native / bilingual" },
  { code: "PT-BR", name: "Portugus (Brasil)", level: "Native / bilingual" },
  { code: "ES", name: "Espaol", level: "Full professional" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--color-cream)]">
      {/* Skip-to-content */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-cream)]">
        Skip to content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center" aria-label="10XAI home">
            <Image src="/brand/logo-wordmark-light.svg" alt="10XAI" width={144} height={40} priority />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Primary">
            <Link href="/lighthouse-demo" className="text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]">Lighthouse</Link>
            <Link href="/engines" className="text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]">Engines</Link>
            <Link href="/about" aria-current="page" className="font-bold text-[var(--color-ink)]">About</Link>
            <Link href="/methodology" className="text-[var(--color-ink-700)] transition-colors hover:text-[var(--color-ink)]">Methodology</Link>
          </nav>
          <Link href="/contact" className="hidden rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)] sm:inline-flex">
            Book a Call
          </Link>
        </div>
      </header>

      <main id="main">
        {/* Hero  founder studio portrait + headline overlay */}
        <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="grid lg:grid-cols-2">
            {/* Copy column */}
            <div className="relative z-10 px-4 py-20 md:px-6 md:py-32 lg:px-8 lg:py-40">
              <div className="mx-auto max-w-xl lg:ml-auto lg:mr-0">
                <Reveal>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">About the founder</p>
                  <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                    I spent 20 years inside revenue technology
                    <span className="text-[var(--color-gold)]"> so my SMB clients don&rsquo;t have to.</span>
                  </h1>
                  <p className="mt-8 text-lg text-[var(--color-ink-300)] md:text-xl">
                    Bernardo Medrado  founder of 10XAI. Operator. Trainer. Trilingual native. Two decades in B2B SaaS, healthcare, and medtech, now building AI Operating Systems for businesses that can&rsquo;t afford a 12-person team.
                  </p>
                </Reveal>
              </div>
            </div>
            {/* Photo column */}
            <div className="relative aspect-[4/5] w-full lg:aspect-auto">
              <Image
                src="/images/founder-studio.png"
                alt="Bernardo Medrado, founder of 10XAI"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Gradient blend into the dark column on lg+ */}
              <div
                className="absolute inset-0 lg:bg-gradient-to-r lg:from-[var(--color-ink)] lg:via-transparent lg:to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        {/* Story  with environmental founder photo */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-32">
                  <div className="overflow-hidden rounded-2xl border border-[var(--color-ink-300)] shadow-sm">
                    <Image
                      src="/images/founder-cafe.png"
                      alt="Bernardo Medrado at a caf in Apex, North Carolina"
                      width={1024}
                      height={576}
                      className="h-auto w-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <p className="mt-3 text-xs text-[var(--color-ink-500)]">
                    Apex, NC  most discovery weeks start over coffee.
                  </p>
                </div>
              </Reveal>
              <div>
                <Reveal>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">My story</p>
                  <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                    Why 10XAI exists.
                  </h2>
                </Reveal>
                <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--color-ink-700)]">
                  <Reveal delay={100}>
                    <p>
                      I spent two decades building and scaling revenue teams across healthcare, medtech, and B2B technology. I led inside-sales orgs, designed enablement programs that shipped to thousands of reps, and watched what happens when great strategy meets bad operational follow-through.
                    </p>
                  </Reveal>
                  <Reveal delay={200}>
                    <p>
                      Then AI showed up  and suddenly every SMB on the planet was being sold a chatbot, a copilot, a productivity tool. Most of them bought one. <strong className="text-[var(--color-ink)]">77% abandon AI tools within six months.</strong> Not because the AI is bad. Because the tools were never wired into how the business actually runs.
                    </p>
                  </Reveal>
                  <Reveal delay={300}>
                    <p>
                      10XAI exists for the operators stuck in pilot purgatory. We don&rsquo;t sell tools. We sit with you, learn what&rsquo;s actually slowing you down, and ship the AI Operating System that runs it for you  in English, Portuguese, or Spanish, depending on who&rsquo;s using it.
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Credentials</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                Trust signals that don&rsquo;t need an employer name.
              </h2>
              <p className="mt-6 max-w-2xl text-[var(--color-ink-700)]">
                Every credential here is independent of any specific company  earned, accredited, and verifiable. The standard for trust in a 10XAI engagement.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CREDENTIALS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.title} delay={i * 80}>
                    <article className="group flex h-full flex-col rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)] p-6 transition-all hover:border-[var(--color-ink)] hover:shadow-md">
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-ink)] text-[var(--color-cream)] transition-all duration-500 group-hover:bg-[var(--color-gold)] group-hover:rotate-[8deg]">
                          <Icon size={20} strokeWidth={2.25} />
                        </span>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">{c.year}</p>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold leading-tight text-[var(--color-ink)]">{c.title}</h3>
                      <p className="mt-2 text-sm text-[var(--color-ink-700)]">{c.detail}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Languages */}
        <section className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24 lg:px-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Languages</p>
              <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
                Trilingual native. Not translated.
              </h2>
              <p className="mt-6 max-w-2xl text-[var(--color-ink-700)]">
                Discovery conversations, deliverables, founder presence  all happen in the language your business actually thinks in.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {LANGUAGES.map((lang, i) => (
                <Reveal key={lang.code} delay={i * 100}>
                  <div className="flex items-center gap-4 rounded-xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--color-gold)] font-display text-sm font-black text-[var(--color-cream)]">
                      {lang.code}
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold text-[var(--color-ink)]">{lang.name}</p>
                      <p className="text-sm text-[var(--color-ink-700)]">{lang.level}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Connect */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Connect</p>
                <h2 className="mt-3 font-display text-4xl font-black tracking-tight md:text-5xl">
                  Let&rsquo;s skip the marketing copy.
                </h2>
                <p className="mt-6 text-lg text-[var(--color-ink-300)]">
                  Book a 15-minute call. We&rsquo;ll talk about what&rsquo;s actually slowing you down, and whether one of the engines fits  or doesn&rsquo;t.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href="/contact" className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-base font-bold text-[var(--color-cream)] shadow-lg shadow-[var(--color-gold)]/30 transition-all hover:bg-[var(--color-gold-600)]">
                    Book a Call &rarr;
                  </Link>
                  <a href="https://www.linkedin.com/in/bernardo-medrado-05369a21/" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] transition-colors hover:border-[var(--color-ink-300)] hover:bg-[var(--color-ink-900)]">
                    <LinkedinIcon size={18} /> LinkedIn
                  </a>
                  <a href="mailto:contato10xai@gmail.com" className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-[var(--color-ink-700)] px-8 text-base font-bold text-[var(--color-cream)] transition-colors hover:border-[var(--color-ink-300)] hover:bg-[var(--color-ink-900)]">
                    <Mail size={18} /> Email
                  </a>
                </div>
                <p className="mt-10 flex items-center gap-2 text-sm text-[var(--color-ink-300)]">
                  <Globe size={16} className="text-[var(--color-gold)]" />
                  Apex / Raleigh, North Carolina &middot; Serving US + Brasil + Latin America
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
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
    </div>
  );
}
