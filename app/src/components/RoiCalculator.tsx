"use client";

import { useState, useMemo } from "react";
import type { RoiInput, RoiOutput } from "@/data/engines";
import { ROI_FORMULAS } from "@/data/roi-formulas";

function formatValue(value: number, format: RoiOutput["format"]): string {
  if (!isFinite(value) || isNaN(value)) return "—";
  switch (format) {
    case "usd":
      return value >= 10000
        ? `$${(value / 1000).toFixed(0)}k`
        : `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    case "hours":
      return `${Math.round(value)} hrs`;
    case "months":
      return value <= 1 ? "< 1 month" : `${Math.round(value)} months`;
    case "count":
      return String(Math.round(value));
  }
}

function formatInputDisplay(value: number, unit: RoiInput["unit"]): string {
  switch (unit) {
    case "usd":
      return value >= 1000
        ? `$${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`
        : `$${value}`;
    case "percent":
      return `${value}%`;
    case "hours":
      return `${value}h`;
    default:
      return String(value);
  }
}

export function RoiCalculator({
  slug,
  inputs,
  outputs,
}: {
  slug: string;
  inputs: RoiInput[];
  outputs: RoiOutput[];
}) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(inputs.map((i) => [i.key, i.default]))
  );

  const results = useMemo(() => {
    const formula = ROI_FORMULAS[slug];
    if (!formula) return {} as Record<string, number>;
    return formula(values);
  }, [slug, values]);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-ink-200)] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[var(--color-ink-100)] bg-[var(--color-ink)] px-6 py-5 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          ROI Calculator
        </p>
        <h3 className="mt-1 font-display text-xl font-black text-[var(--color-cream)] md:text-2xl">
          Estimate your return
        </h3>
        <p className="mt-1 text-sm text-[var(--color-ink-300)]">
          Adjust the sliders to match your situation.
        </p>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Inputs */}
        <div className="border-b border-[var(--color-ink-100)] p-6 md:border-b-0 md:border-r md:p-8">
          <div className="space-y-7">
            {inputs.map((input) => (
              <div key={input.key}>
                <div className="flex items-baseline justify-between gap-2">
                  <label
                    htmlFor={`roi-${input.key}`}
                    className="text-sm font-medium text-[var(--color-ink-700)]"
                  >
                    {input.label}
                  </label>
                  <span className="shrink-0 rounded-md bg-[var(--color-gold)]/10 px-2.5 py-0.5 text-sm font-bold text-[var(--color-gold)]">
                    {formatInputDisplay(values[input.key], input.unit)}
                  </span>
                </div>
                <input
                  id={`roi-${input.key}`}
                  type="range"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={values[input.key]}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [input.key]: Number(e.target.value),
                    }))
                  }
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-ink-200)] accent-[var(--color-gold)]"
                  aria-label={input.label}
                />
                <div className="mt-1 flex justify-between text-[10px] text-[var(--color-ink-400)]">
                  <span>{formatInputDisplay(input.min, input.unit)}</span>
                  <span>{formatInputDisplay(input.max, input.unit)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outputs */}
        <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
          {outputs.map((output, i) => {
            const val = results[output.key] ?? 0;
            const isPayback = output.format === "months";
            return (
              <div
                key={output.key}
                className={`rounded-xl p-5 ${
                  i === 0
                    ? "bg-[var(--color-gold)]/8 border border-[var(--color-gold)]/20"
                    : isPayback
                    ? "border border-[var(--color-ink-200)] bg-[var(--color-cream)]"
                    : "border border-[var(--color-ink-200)] bg-[var(--color-cream)]"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-500)]">
                  {output.label}
                </p>
                <p
                  className={`mt-1 font-display text-3xl font-black ${
                    i === 0
                      ? "text-[var(--color-gold)]"
                      : "text-[var(--color-ink)]"
                  }`}
                >
                  {formatValue(val, output.format)}
                </p>
              </div>
            );
          })}

          <p className="mt-2 text-[10px] leading-relaxed text-[var(--color-ink-400)]">
            Estimates based on industry averages. Actual results depend on your ICP, stack, and team. Not a guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
