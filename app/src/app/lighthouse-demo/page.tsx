"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Step = "input" | "analyzing" | "preview";

const ANALYSIS_STAGES = [
  "Pulling Google Business Profile...",
  "Reading 47 customer reviews...",
  "Extracting brand cues from photos...",
  "Drafting hero copy in Claude...",
  "Generating layout...",
  "Deploying preview...",
];

export default function LighthouseDemoPage() {
  const [url, setUrl] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [stageIdx, setStageIdx] = useState(0);
  const [previewName, setPreviewName] = useState("");
  const [previewLocation, setPreviewLocation] = useState("");

  function start() {
    if (!url.trim()) return;
    setStep("analyzing");
    setStageIdx(0);

    // Simulate the pipeline visually
    const interval = setInterval(() => {
      setStageIdx((i) => {
        if (i >= ANALYSIS_STAGES.length - 1) {
          clearInterval(interval);
          // Extract a "business name" from the URL for the mock
          const guess = url
            .replace(/https?:\/\/(www\.)?/, "")
            .split(/[\/\.\?]/)[0]
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
          setPreviewName(guess || "Your Business");
          setPreviewLocation("Apex, North Carolina");
          setTimeout(() => setStep("preview"), 600);
          return i;
        }
        return i + 1;
      });
    }, 700);
  }

  function reset() {
    setUrl("");
    setStep("input");
    setStageIdx(0);
    setPreviewName("");
    setPreviewLocation("");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <header className="sticky top-0 z-30 w-full border-b border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center" aria-label="10XAI home">
            <Image
              src="/brand/logo-wordmark-light.svg"
              alt="10XAI"
              width={120}
              height={32}
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--color-ink-700)] hover:text-[var(--color-ink)]"
          >
             Back home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Lighthouse  Live Demo
          </p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-5xl">
            Paste any local business URL.
            <br />
            <span className="text-[var(--color-gold)]">Watch us build them a website.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--color-ink-700)]">
            This is the same pipeline we run on prospects every week. Reviews go in. A site goes out. Then we reach out and close it.
          </p>
        </div>

        {step === "input" && (
          <div className="rounded-2xl border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] p-8">
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-ink-700)]">
                Google Business URL or website
              </span>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://goo.gl/maps/...  or  https://example.com"
                className="mt-3 w-full rounded-lg border border-[var(--color-ink-300)] bg-[var(--color-cream)] px-4 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink-500)] focus:border-[var(--color-gold)] focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && start()}
              />
            </label>
            <button
              type="button"
              onClick={start}
              disabled={!url.trim()}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-gold)] px-6 font-bold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)] disabled:opacity-40"
            >
              Generate site preview &rarr;
            </button>
            <p className="mt-4 text-xs text-[var(--color-ink-500)]">
              Demo mode  generates a templated preview. The real Lighthouse pipeline pulls Google Business Profile data, customer reviews, and photos via Claude vision.
            </p>
          </div>
        )}

        {step === "analyzing" && (
          <div className="rounded-2xl border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] p-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
              Working...
            </p>
            <ul className="mt-6 space-y-3">
              {ANALYSIS_STAGES.map((stage, i) => (
                <li
                  key={stage}
                  className={`flex items-center gap-3 transition-opacity ${
                    i <= stageIdx ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      i < stageIdx
                        ? "bg-[var(--color-gold)] text-[var(--color-cream)]"
                        : i === stageIdx
                        ? "bg-[var(--color-ink)] text-[var(--color-cream)]"
                        : "bg-[var(--color-ink-300)] text-[var(--color-ink-700)]"
                    }`}
                  >
                    {i < stageIdx ? "" : i + 1}
                  </span>
                  <span
                    className={`font-medium ${
                      i === stageIdx
                        ? "text-[var(--color-ink)]"
                        : "text-[var(--color-ink-700)]"
                    }`}
                  >
                    {stage}
                    {i === stageIdx && (
                      <span className="ml-2 inline-flex gap-1">
                        <span className="h-1 w-1 animate-bounce rounded-full bg-[var(--color-ink-700)] [animation-delay:-0.3s]" />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-[var(--color-ink-700)] [animation-delay:-0.15s]" />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-[var(--color-ink-700)]" />
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === "preview" && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-gold-100)]/30 p-6">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                Preview generated
              </p>
              <p className="mt-2 text-sm text-[var(--color-ink-700)]">
                Below is the site we'd ship to <strong>{previewName}</strong>. In a real engagement, it goes live on a preview URL within 60 seconds  and we send the owner a personalized loom of it the same hour.
              </p>
            </div>

            {/* Mock generated site preview */}
            <div className="overflow-hidden rounded-2xl border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] shadow-lg">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-[var(--color-ink-300)] bg-[var(--color-cream-100)] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[var(--color-danger)]" />
                <span className="h-3 w-3 rounded-full bg-[var(--color-gold)]" />
                <span className="h-3 w-3 rounded-full bg-[var(--color-success)]" />
                <span className="ml-3 truncate rounded bg-[var(--color-cream)] px-3 py-1 text-xs text-[var(--color-ink-500)]">
                  {previewName.toLowerCase().replace(/\s+/g, "")}.10xai.us
                </span>
              </div>

              {/* Mock site hero */}
              <div className="bg-[var(--color-ink)] px-8 py-16 text-[var(--color-cream)] md:px-16 md:py-24">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  {previewLocation}
                </p>
                <h2 className="mt-4 font-display text-4xl font-black md:text-5xl">
                  {previewName}
                </h2>
                <p className="mt-4 max-w-xl text-lg text-[var(--color-ink-300)]">
                  Trusted by neighbors. Ranked top in {previewLocation.split(",")[0]} on Google with a 4.9-star average across 47 reviews.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-bold text-[var(--color-cream)]">
                    Book an appointment
                  </button>
                  <button className="rounded-lg border border-[var(--color-ink-700)] px-5 py-2.5 text-sm font-bold text-[var(--color-cream)]">
                    Call us
                  </button>
                </div>
              </div>

              {/* Mock site review band */}
              <div className="border-t border-[var(--color-ink-300)] bg-[var(--color-cream-50)] px-8 py-12 md:px-16">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-ink-700)]">
                  What customers say
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      stars: 5,
                      quote: "Best in the area. Wouldn't go anywhere else.",
                      name: "Maria S.",
                    },
                    {
                      stars: 5,
                      quote: "Fast, friendly, and they actually deliver.",
                      name: "James T.",
                    },
                    {
                      stars: 5,
                      quote: "Hidden gem. Everyone needs to know about this place.",
                      name: "Priya K.",
                    },
                  ].map((r) => (
                    <div
                      key={r.name}
                      className="rounded-lg border border-[var(--color-ink-300)] bg-[var(--color-cream)] p-4"
                    >
                      <div className="text-[var(--color-gold)]">
                        {""}
                      </div>
                      <p className="mt-2 text-sm text-[var(--color-ink)]">
                        {r.quote}
                      </p>
                      <p className="mt-3 text-xs text-[var(--color-ink-500)]">
                         {r.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA after preview */}
            <div className="rounded-2xl border border-[var(--color-ink-300)] bg-[var(--color-ink)] p-8 text-[var(--color-cream)]">
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                This is the demo. The real one ships in 60 seconds.
              </h3>
              <p className="mt-3 text-[var(--color-ink-300)]">
                Lighthouse pulls live data, generates the actual site copy from real reviews, and stages a preview URL ready to deploy under your domain. From $497 setup + $49/mo.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-gold)] px-6 font-bold text-[var(--color-cream)] hover:bg-[var(--color-gold-600)]"
                >
                  Book a 15-min call &rarr;
                </Link>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--color-ink-700)] px-6 font-bold text-[var(--color-cream)] hover:border-[var(--color-ink-300)]"
                >
                  Try another URL
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
