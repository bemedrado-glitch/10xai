"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  TESTIMONIALS,
  TESTIMONIALS_ARE_PLACEHOLDER,
} from "@/data/social-proof";

const AUTO_ADVANCE_MS = 7000;

export function TestimonialCarousel({
  title = "What operators say",
  caption,
}: {
  title?: string;
  caption?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const liveRegionRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
      const handler = () => setReducedMotion(mq.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || TESTIMONIALS.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, reducedMotion]);

  if (!TESTIMONIALS.length) return null;

  const current = TESTIMONIALS[index];

  function next() {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const defaultCaption = TESTIMONIALS_ARE_PLACEHOLDER
    ? "Sample format. First real client testimonials launch with the first published case studies (Q2 2026)."
    : undefined;

  return (
    <section
      aria-label={title}
      className="bg-[var(--color-cream-50)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-5xl px-4 py-20 md:px-6 md:py-28 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
            {title}
          </p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[var(--color-ink)] md:text-4xl">
            Voices from the front office.
          </h2>
        </div>

        <div className="relative mt-12">
          {/* Slide */}
          <article
            key={index}
            className="testimonial-slide rounded-2xl border border-[var(--color-ink-300)]/60 bg-[var(--color-cream)] p-8 shadow-sm md:p-12"
            aria-live="polite"
          >
            {/* Big gold opening quote */}
            <span
              aria-hidden="true"
              className="font-display text-7xl font-black leading-none text-[var(--color-gold)]"
            >
              &ldquo;
            </span>

            <p className="mt-2 font-display text-xl font-medium leading-relaxed text-[var(--color-ink)] md:text-2xl">
              {current.quote}
            </p>

            <footer className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-base font-bold text-[var(--color-ink)]">
                  {current.name}
                </p>
                <p className="text-sm text-[var(--color-ink-700)]">
                  {current.role}
                  {current.company ? ` • ${current.company}` : ""}
                  {current.location ? ` • ${current.location}` : ""}
                </p>
              </div>
              {typeof current.rating === "number" && current.rating > 0 && (
                <div
                  className="flex items-center gap-1 text-[var(--color-gold)]"
                  aria-label={`${current.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      strokeWidth={2}
                      className={i < (current.rating ?? 0) ? "fill-[var(--color-gold)]" : "fill-none opacity-30"}
                    />
                  ))}
                </div>
              )}
            </footer>
          </article>

          {/* Live region for screen readers */}
          <p ref={liveRegionRef} className="sr-only" aria-live="polite">
            Showing testimonial {index + 1} of {TESTIMONIALS.length}.
          </p>

          {/* Controls */}
          {TESTIMONIALS.length > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-ink-300)] bg-[var(--color-cream)] text-[var(--color-ink-700)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
              >
                <ChevronLeft size={18} />
              </button>

              <ul className="flex items-center gap-2" role="tablist" aria-label="Testimonial selector">
                {TESTIMONIALS.map((_, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Show testimonial ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === index
                          ? "w-8 bg-[var(--color-gold)]"
                          : "w-2 bg-[var(--color-ink-300)] hover:bg-[var(--color-ink-500)]"
                      }`}
                    />
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-ink-300)] bg-[var(--color-cream)] text-[var(--color-ink-700)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {(caption ?? defaultCaption) && (
          <p className="mt-8 text-center text-xs text-[var(--color-ink-500)]">
            {caption ?? defaultCaption}
          </p>
        )}
      </div>
    </section>
  );
}
