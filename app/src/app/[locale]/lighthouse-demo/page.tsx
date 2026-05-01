"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

// ─── Static demo data (always English — this is mock pipeline output) ────────

const INDUSTRIES = [
  "Restaurant", "Retail", "Healthcare", "Legal",
  "Real Estate", "Home Services", "Beauty & Wellness",
  "Fitness", "Financial Services", "E-commerce",
];

const TITLES = [
  "Owner", "General Manager", "VP of Sales", "CEO",
  "COO", "Director of Operations", "Head of Growth", "Sales Director",
];

const DEMO_CONTACTS = [
  {
    id: 1, initials: "MS", name: "Maria Santos",
    title: "Owner", company: "Café Brickell",
    email: "m.s***@cafebrickell.com", location: "Miami, FL",
    signal: "Actively hiring front-of-house",
  },
  {
    id: 2, initials: "CR", name: "Carlos Rivera",
    title: "General Manager", company: "El Rincón",
    email: "c.r***@elrincon.com", location: "Miami, FL",
    signal: "Opened 2nd location last month",
  },
  {
    id: 3, initials: "AK", name: "Ana Kim",
    title: "Owner", company: "Kimchi House MIA",
    email: "a.k***@kimchihouse.com", location: "Coral Gables, FL",
    signal: "Posted about new lunch menu",
  },
  {
    id: 4, initials: "RV", name: "Roberto Vega",
    title: "Owner", company: "Taste of Cuba",
    email: "r.v***@tasteofcuba.com", location: "Hialeah, FL",
    signal: "Replied to 3 reviews this week",
  },
  {
    id: 5, initials: "SM", name: "Sofia Mendez",
    title: "GM", company: "Sunset Bistro",
    email: "s.m***@sunsetbistro.com", location: "Brickell, FL",
    signal: "LinkedIn active — shared job post",
  },
];

const SCANNING_STAGES = [
  "Scanning 50M+ verified contacts...",
  "Filtering by ICP...",
  "Verifying email deliverability...",
  "Pulling LinkedIn enrichment...",
  "Scoring by intent signals...",
  "Building your list...",
];

const CADENCES = [
  {
    id: "restaurant",
    name: "Restaurant Owner — Intro",
    days: 7,
    touches: 4,
    steps: [
      { day: 1, channel: "Email", label: "Personalized intro" },
      { day: 3, channel: "LinkedIn", label: "Connection + note" },
      { day: 5, channel: "Email", label: "Follow-up with proof" },
      { day: 7, channel: "Email", label: "Final check-in" },
    ],
  },
  {
    id: "smb",
    name: "SMB Decision Maker — Cold",
    days: 5,
    touches: 3,
    steps: [
      { day: 1, channel: "Email", label: "Problem-focused intro" },
      { day: 3, channel: "LinkedIn", label: "Connection request" },
      { day: 5, channel: "Email", label: "Value + case study" },
    ],
  },
];

const LAUNCHING_STAGES = [
  "Personalizing 5 intro emails...",
  "Day 1 emails delivered ✓",
  "LinkedIn requests queued ✓",
];

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = "icp" | "scanning" | "leads" | "cadence" | "launching" | "reply";

// ─── Component ───────────────────────────────────────────────────────────────

export default function LighthouseDemoPage() {
  const t = useTranslations("lighthouseDemo");

  const [step, setStep] = useState<Step>("icp");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [targetTitle, setTargetTitle] = useState(TITLES[0]);
  const [location, setLocation] = useState("");
  const [scanIdx, setScanIdx] = useState(0);
  const [selectedCadence, setSelectedCadence] = useState(CADENCES[0].id);
  const [launchIdx, setLaunchIdx] = useState(0);
  const [replyVisible, setReplyVisible] = useState(false);

  // Scanning animation
  useEffect(() => {
    if (step !== "scanning") return;
    setScanIdx(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i >= SCANNING_STAGES.length) {
        clearInterval(iv);
        setTimeout(() => setStep("leads"), 400);
        return;
      }
      setScanIdx(i);
    }, 480);
    return () => clearInterval(iv);
  }, [step]);

  // Launching animation
  useEffect(() => {
    if (step !== "launching") return;
    setLaunchIdx(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i >= LAUNCHING_STAGES.length) {
        clearInterval(iv);
        setTimeout(() => {
          setStep("reply");
          setTimeout(() => setReplyVisible(true), 900);
        }, 400);
        return;
      }
      setLaunchIdx(i);
    }, 650);
    return () => clearInterval(iv);
  }, [step]);

  function reset() {
    setStep("icp");
    setScanIdx(0);
    setLaunchIdx(0);
    setReplyVisible(false);
    setLocation("");
  }

  const effectiveLocation = location.trim() || "Miami, FL";
  const activeCadence = CADENCES.find((c) => c.id === selectedCadence)!;

  // ── Shared animated checklist ──────────────────────────────────────────────

  function Checklist({ stages, activeIdx }: { stages: string[]; activeIdx: number }) {
    return (
      <div className="space-y-3">
        {stages.map((stage, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 text-sm transition-all duration-300 ${
              i < activeIdx
                ? "text-[var(--color-gold)]"
                : i === activeIdx
                ? "font-bold text-[var(--color-ink)]"
                : "text-[var(--color-ink-300)]"
            }`}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
              {i < activeIdx ? (
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : i === activeIdx ? (
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold)] opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--color-gold)]" />
                </span>
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink-300)]" />
              )}
            </span>
            {stage}
          </div>
        ))}
      </div>
    );
  }

  // ── Step progress bar ──────────────────────────────────────────────────────

  const STEPS: Step[] = ["icp", "scanning", "leads", "cadence", "launching", "reply"];
  const VISIBLE_STEPS = ["icp", "leads", "cadence", "reply"] as const;
  const currentVisible = VISIBLE_STEPS.indexOf(step as typeof VISIBLE_STEPS[number]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <SiteNav activePage="lighthouse" />

      <main id="main">
        {/* Hero */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6 md:py-24 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-cream)]"
            >
              {t("backHome")}
            </Link>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              {t("headlineLine1")}
              <br />
              <span className="text-[var(--color-gold)]">{t("headlineLine2")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-ink-300)] md:text-xl">
              {t("subhead")}
            </p>
          </div>
        </section>

        {/* Progress dots */}
        <div className="border-b border-[var(--color-ink-200)] bg-white">
          <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 px-4 py-4">
            {(["icp", "leads", "cadence", "reply"] as const).map((s, i) => {
              const isActive = step === s || (step === "scanning" && s === "icp") || (step === "launching" && s === "cadence");
              const isDone = currentVisible > i;
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full transition-all duration-300 ${isDone ? "bg-[var(--color-gold)]" : isActive ? "h-2.5 w-2.5 bg-[var(--color-gold)]" : "bg-[var(--color-ink-200)]"}`} />
                  {i < 3 && <div className={`h-px w-8 transition-all duration-300 ${isDone ? "bg-[var(--color-gold)]" : "bg-[var(--color-ink-200)]"}`} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive section */}
        <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20 lg:px-8">

          {/* ── Step 1: ICP builder ──────────────────────────────────────── */}
          {step === "icp" && (
            <div className="rounded-2xl border border-[var(--color-ink-200)] bg-white p-8 shadow-sm md:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("icp.eyebrow")}
              </p>
              <h2 className="mt-2 font-display text-2xl font-black text-[var(--color-ink)] md:text-3xl">
                {t("icp.title")}
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink-500)]">
                    {t("icp.industryLabel")}
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="mt-2 w-full cursor-pointer rounded-lg border border-[var(--color-ink-300)] bg-[var(--color-cream)] px-4 py-3 text-sm text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/20"
                  >
                    {INDUSTRIES.map((ind) => <option key={ind}>{ind}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink-500)]">
                    {t("icp.titleLabel")}
                  </label>
                  <select
                    value={targetTitle}
                    onChange={(e) => setTargetTitle(e.target.value)}
                    className="mt-2 w-full cursor-pointer rounded-lg border border-[var(--color-ink-300)] bg-[var(--color-cream)] px-4 py-3 text-sm text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/20"
                  >
                    {TITLES.map((ttl) => <option key={ttl}>{ttl}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-ink-500)]">
                    {t("icp.locationLabel")}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setStep("scanning")}
                    placeholder="Miami, FL"
                    className="mt-2 w-full rounded-lg border border-[var(--color-ink-300)] bg-[var(--color-cream)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-400)] focus:border-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/20"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setStep("scanning")}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)] sm:w-auto"
                >
                  {t("icp.cta")}
                </button>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-[var(--color-ink-400)]">
                {t("icp.disclaimer")}
              </p>
            </div>
          )}

          {/* ── Step 2: Scanning ─────────────────────────────────────────── */}
          {step === "scanning" && (
            <div className="rounded-2xl border border-[var(--color-ink-200)] bg-white p-8 md:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("scanning.eyebrow")}
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink-500)]">
                {industry} · {targetTitle} · {effectiveLocation}
              </p>
              <div className="mt-8">
                <Checklist stages={SCANNING_STAGES} activeIdx={scanIdx} />
              </div>
            </div>
          )}

          {/* ── Step 3: Lead list ─────────────────────────────────────────── */}
          {step === "leads" && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  {t("leads.eyebrow")}
                </p>
                <h2 className="mt-1 font-display text-2xl font-black text-[var(--color-ink)]">
                  {t("leads.title")}
                </h2>
                <p className="mt-1 text-sm text-[var(--color-ink-500)]">
                  {industry} · {targetTitle} · {effectiveLocation}
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[var(--color-ink-200)] bg-white">
                {DEMO_CONTACTS.map((contact, idx) => (
                  <div
                    key={contact.id}
                    className={`flex items-start gap-4 p-4 ${idx < DEMO_CONTACTS.length - 1 ? "border-b border-[var(--color-ink-100)]" : ""}`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-sm font-bold text-[var(--color-gold)]">
                      {contact.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-bold text-[var(--color-ink)]">{contact.name}</span>
                        <span className="text-xs text-[var(--color-ink-500)]">
                          {contact.title} · {contact.company}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-3 text-xs text-[var(--color-ink-400)]">
                        <span>{contact.location}</span>
                        <span className="font-mono">{contact.email}</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                          ↑ {contact.signal}
                        </span>
                      </div>
                    </div>

                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep("cadence")}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)]"
              >
                {t("leads.enrollCta", { count: DEMO_CONTACTS.length })}
              </button>
            </div>
          )}

          {/* ── Step 4: Cadence selector ──────────────────────────────────── */}
          {step === "cadence" && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  {t("cadence.eyebrow")}
                </p>
                <h2 className="mt-1 font-display text-2xl font-black text-[var(--color-ink)]">
                  {t("cadence.title")}
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {CADENCES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCadence(c.id)}
                    className={`rounded-xl border p-5 text-left transition-all ${
                      selectedCadence === c.id
                        ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5 shadow-sm"
                        : "border-[var(--color-ink-200)] bg-white hover:border-[var(--color-ink-400)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-bold leading-snug text-[var(--color-ink)]">{c.name}</p>
                      <div
                        className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 transition-colors ${
                          selectedCadence === c.id
                            ? "border-[var(--color-gold)] bg-[var(--color-gold)]"
                            : "border-[var(--color-ink-300)]"
                        }`}
                      />
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-ink-500)]">
                      {c.days} days · {c.touches} touchpoints
                    </p>
                  </button>
                ))}
              </div>

              {/* Sequence preview */}
              <div className="rounded-xl border border-[var(--color-ink-200)] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-500)]">
                  {t("cadence.previewLabel")}
                </p>
                <div className="mt-4 space-y-3">
                  {activeCadence.steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="flex h-8 w-14 shrink-0 items-center justify-center rounded-lg bg-[var(--color-ink-100)] text-xs font-bold text-[var(--color-ink)]">
                        Day {s.day}
                      </span>
                      <span
                        className={`shrink-0 rounded px-2 py-0.5 text-xs font-bold ${
                          s.channel === "Email"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-sky-50 text-sky-700"
                        }`}
                      >
                        {s.channel}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-ink-700)]">
                        {s.label}
                      </span>
                      <span className="shrink-0 text-xs text-emerald-600">✓ Ready</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep("launching")}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)]"
              >
                {t("cadence.launchCta")}
              </button>
            </div>
          )}

          {/* ── Step 5: Launching ─────────────────────────────────────────── */}
          {step === "launching" && (
            <div className="rounded-2xl border border-[var(--color-ink-200)] bg-white p-8 md:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t("launching.eyebrow")}
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink-500)]">
                {activeCadence.name} · {DEMO_CONTACTS.length} leads
              </p>
              <div className="mt-8">
                <Checklist stages={LAUNCHING_STAGES} activeIdx={launchIdx} />
              </div>
            </div>
          )}

          {/* ── Step 6: Reply — the wow moment ────────────────────────────── */}
          {step === "reply" && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  {t("reply.eyebrow")}
                </p>
                <h2 className="mt-1 font-display text-2xl font-black text-[var(--color-ink)]">
                  {t("reply.title")}
                </h2>
              </div>

              {/* Waiting pulse */}
              <div
                className={`flex items-center gap-3 rounded-xl border border-[var(--color-ink-200)] bg-white p-5 transition-all duration-300 ${
                  replyVisible ? "pointer-events-none h-0 overflow-hidden border-0 p-0 opacity-0" : "opacity-100"
                }`}
              >
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold)] opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--color-gold)]" />
                </span>
                <p className="text-sm text-[var(--color-ink-500)]">{t("reply.waiting")}</p>
              </div>

              {/* Reply card — slides in */}
              <div
                className={`overflow-hidden rounded-2xl border-2 border-[var(--color-gold)] bg-white shadow-xl transition-all duration-500 ease-out ${
                  replyVisible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-6"
                }`}
              >
                {/* Email header */}
                <div className="border-b border-[var(--color-ink-100)] bg-[var(--color-cream-50)] px-6 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/15 text-sm font-bold text-[var(--color-gold)]">
                        MS
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--color-ink)]">Maria Santos</p>
                        <p className="text-xs text-[var(--color-ink-500)]">Owner · Café Brickell</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                      {t("reply.badge")}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--color-ink-400)]">
                    Re: Quick question about Café Brickell
                  </p>
                </div>

                {/* Body */}
                <div className="px-6 py-6">
                  <p className="text-sm leading-relaxed text-[var(--color-ink-700)]">
                    Hey! This actually caught my attention — we&apos;ve been struggling with follow-up after busy weekends. Are you open to a quick 15-min call this week?
                  </p>
                  <p className="mt-3 text-sm text-[var(--color-ink-400)]">— Maria</p>
                </div>
              </div>

              {/* CTAs */}
              <div
                className={`flex flex-col gap-3 transition-all duration-500 sm:flex-row ${
                  replyVisible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
                }`}
              >
                <a
                  href="https://cal.com/bernardomedrado/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-8 text-sm font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)] sm:w-auto"
                >
                  {t("reply.ctaBook")}
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-[var(--color-ink-200)] px-8 text-sm font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] sm:w-auto"
                >
                  {t("reply.ctaRestart")}
                </button>
              </div>

              {replyVisible && (
                <p className="text-xs text-[var(--color-ink-400)]">
                  {t("reply.disclaimer")}
                </p>
              )}
            </div>
          )}

        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
