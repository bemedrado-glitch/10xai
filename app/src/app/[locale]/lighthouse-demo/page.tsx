"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

type Step = "input" | "analyzing" | "preview";

export default function LighthouseDemoPage() {
  const t = useTranslations("lighthouseDemo");
  const tCommon = useTranslations("common");

  const [url, setUrl] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [stageIdx, setStageIdx] = useState(0);
  const [previewName, setPreviewName] = useState("");
  const [previewLocation, setPreviewLocation] = useState("");

  const analysisStages = t.raw("analyzing.stages") as string[];

  function start() {
    if (!url.trim()) return;
    setStep("analyzing");
    setStageIdx(0);

    const interval = setInterval(() => {
      setStageIdx((i) => {
        if (i >= analysisStages.length - 1) {
          clearInterval(interval);
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

  const city = previewLocation.split(",")[0];

  return (
    <div className="flex flex-1 flex-col bg-[var(--color-cream)]">
      <SiteNav activePage="lighthouse" />

      <main id="main">
        {/* Back link */}
        <div className="border-b border-[var(--color-ink-300)]/40 bg-[var(--color-ink)]">
          <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] hover:text-[var(--color-cream)]"
            >
              {t("backHome")}
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-[var(--color-ink)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6 md:py-32 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
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

        {/* Interactive section */}
        <section className="bg-[var(--color-cream-50)]">
          <div className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-28 lg:px-8">

            {/* Input step */}
            {step === "input" && (
              <div className="rounded-2xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-8 shadow-sm md:p-12">
                <label
                  htmlFor="biz-url"
                  className="block text-sm font-bold text-[var(--color-ink)]"
                >
                  {t("input.label")}
                </label>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="biz-url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && start()}
                    placeholder={t("input.placeholder")}
                    className="flex-1 rounded-lg border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-500)] focus:border-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/20"
                  />
                  <button
                    type="button"
                    onClick={start}
                    disabled={!url.trim()}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-7 text-sm font-bold text-[var(--color-cream)] transition-all hover:bg-[var(--color-gold-600)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t("input.cta")}
                  </button>
                </div>
                <p className="mt-4 text-xs text-[var(--color-ink-500)]">{t("input.disclaimer")}</p>
              </div>
            )}

            {/* Analyzing step */}
            {step === "analyzing" && (
              <div className="rounded-2xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-8 md:p-12">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  {t("analyzing.eyebrow")}
                </p>
                <div className="mt-6 space-y-3">
                  {analysisStages.map((stage, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                        i < stageIdx
                          ? "text-[var(--color-gold)]"
                          : i === stageIdx
                          ? "font-bold text-[var(--color-ink)]"
                          : "text-[var(--color-ink-300)]"
                      }`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                        {i < stageIdx ? (
                          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : i === stageIdx ? (
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
              </div>
            )}

            {/* Preview step */}
            {step === "preview" && (
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                    {t("preview.eyebrow")}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-ink-700)]">
                    {t("preview.preamble")}{" "}
                    <strong className="text-[var(--color-ink)]">{previewName}</strong>
                    {t("preview.preambleEnd")}
                  </p>
                </div>

                {/* Mock site preview */}
                <div className="overflow-hidden rounded-2xl border border-[var(--color-ink-300)]/60 shadow-lg">
                  {/* Mock browser chrome */}
                  <div className="flex items-center gap-2 border-b border-[var(--color-ink-300)]/40 bg-[var(--color-cream-50)] px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                    <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                    <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                    <span className="ml-3 flex-1 truncate rounded bg-white px-3 py-1 text-xs text-[var(--color-ink-500)]">
                      {previewName.toLowerCase().replace(/\s/g, "")}.preview.10xai.us
                    </span>
                  </div>

                  {/* Mock hero section */}
                  <div className="bg-[var(--color-ink)] px-8 py-16 text-center text-[var(--color-cream)]">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                      {t("preview.mockHeroEyebrow", { location: previewLocation })}
                    </p>
                    <h2 className="mt-4 font-display text-3xl font-black tracking-tight md:text-5xl">
                      {previewName}
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-300)]">
                      {t("preview.mockHeroSubhead", { city })}
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                      <span className="inline-flex h-11 items-center rounded-lg bg-[var(--color-gold)] px-6 text-sm font-bold text-[var(--color-cream)]">
                        {t("preview.mockBookBtn")}
                      </span>
                      <span className="inline-flex h-11 items-center rounded-lg border border-[var(--color-cream)]/30 px-6 text-sm font-bold text-[var(--color-cream)]">
                        {t("preview.mockCallBtn")}
                      </span>
                    </div>
                  </div>

                  {/* Mock reviews */}
                  <div className="bg-[var(--color-cream)] px-8 py-8">
                    <h3 className="font-display text-xl font-bold text-[var(--color-ink)]">
                      {t("preview.mockReviewsTitle")}
                    </h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      {["★★★★★", "★★★★★", "★★★★★"].map((stars, i) => (
                        <div key={i} className="rounded-lg border border-[var(--color-ink-300)]/40 bg-[var(--color-cream-50)] p-4">
                          <p className="text-sm text-[var(--color-gold)]">{stars}</p>
                          <p className="mt-2 text-xs text-[var(--color-ink-700)]">
                            {["Outstanding service!", "Highly recommend to anyone looking for quality.", "Best in the area, no question."][i]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA after preview */}
                <div className="rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-8">
                  <h3 className="font-display text-2xl font-bold text-[var(--color-ink)]">
                    {t("preview.ctaTitle")}
                  </h3>
                  <p className="mt-3 text-[var(--color-ink-700)]">{t("preview.ctaSubhead")}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-7 text-sm font-bold text-[var(--color-cream)] hover:bg-[var(--color-gold-600)]"
                    >
                      {t("preview.ctaBook")}
                    </Link>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--color-ink-300)] px-7 text-sm font-bold text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                    >
                      {t("preview.ctaAnother")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
