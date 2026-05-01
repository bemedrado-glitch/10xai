"use client";

import { useState } from "react";
import { Plus, ChevronDown, ChevronRight, Trash2, Mail } from "lucide-react";
import type { Cadence, CadenceStep } from "@/lib/database.types";

type CadenceWithSteps = Cadence & { cadence_steps: CadenceStep[] };

const DEFAULT_STEPS = [
  {
    step_number: 1,
    delay_days: 0,
    subject: "Quick question about {business_name}",
    body: "Hi {contact_name},\n\nI noticed {business_name} has {rating} stars on Google — that's impressive for {city}.\n\nMost businesses like yours rely on word-of-mouth but don't have a system to capture those warm leads automatically. That's what we fix.\n\n10XAI's Lighthouse platform turns your Google reviews into a 24/7 lead generation engine. Would you have 15 minutes this week to see how it works?\n\nBernardo\n10XAI",
  },
  {
    step_number: 2,
    delay_days: 3,
    subject: "Re: Quick question about {business_name}",
    body: "Hi {contact_name},\n\nJust circling back — wanted to share that businesses like {business_name} typically see 10-15 new qualified leads/month within the first 30 days of using Lighthouse.\n\nNo website needed. Setup takes one call.\n\nWorth 15 minutes?\n\nBernardo",
  },
  {
    step_number: 3,
    delay_days: 7,
    subject: "Last note — {business_name}",
    body: "Hi {contact_name},\n\nI'll keep this short. If growing {business_name} beyond referrals is a priority this quarter, I'd love to show you how.\n\nIf the timing isn't right, no worries — I'll leave you to it.\n\nBernardo\n10XAI | book a call: cal.com/10xai",
  },
];

export default function CadencesClient({
  initialCadences,
}: {
  initialCadences: CadenceWithSteps[];
}) {
  const [cadences, setCadences] = useState(initialCadences);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/cadences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, steps: DEFAULT_STEPS }),
    });
    const data = await res.json();
    if (data.cadence) {
      setCadences([{ ...data.cadence, cadence_steps: data.steps ?? [] }, ...cadences]);
      setCreating(false);
      setName("");
      setDescription("");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/cadences?id=${id}`, { method: "DELETE" });
    setCadences(cadences.filter((c) => c.id !== id));
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Lighthouse
          </p>
          <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
            Cadences
          </h1>
          <p className="mt-1 text-sm text-[var(--color-ink-400)]">
            Email sequences sent to enrolled leads automatically.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-4 py-2.5 text-sm font-bold text-[var(--color-cream)] hover:opacity-90"
        >
          <Plus size={14} />
          New Cadence
        </button>
      </div>

      {creating && (
        <form
          onSubmit={handleCreate}
          className="mb-6 rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-ink)] p-5"
        >
          <h2 className="mb-4 text-sm font-bold text-[var(--color-cream)]">
            New Cadence
          </h2>
          <p className="mb-3 text-xs text-[var(--color-ink-500)]">
            A 3-step default sequence will be created. Edit steps after saving.
          </p>
          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Cadence name"
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              rows={2}
              className="w-full resize-none rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setCreating(false)}
              className="flex-1 rounded-lg border border-[var(--color-ink-700)] py-2 text-sm text-[var(--color-ink-400)] hover:text-[var(--color-cream)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-[var(--color-gold)] py-2 text-sm font-bold text-[var(--color-cream)] hover:opacity-90 disabled:opacity-40"
            >
              {saving ? "Saving…" : "Create"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {cadences.map((c) => {
          const steps = [...(c.cadence_steps ?? [])].sort(
            (a, b) => a.step_number - b.step_number
          );
          const isExpanded = expanded === c.id;
          return (
            <div
              key={c.id}
              className="rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)]"
            >
              <div className="flex items-center justify-between gap-4 p-4">
                <button
                  onClick={() => setExpanded(isExpanded ? null : c.id)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  {isExpanded ? (
                    <ChevronDown size={14} className="shrink-0 text-[var(--color-gold)]" />
                  ) : (
                    <ChevronRight size={14} className="shrink-0 text-[var(--color-ink-500)]" />
                  )}
                  <div>
                    <span className="font-medium text-[var(--color-cream)]">{c.name}</span>
                    <span className="ml-3 text-xs text-[var(--color-ink-500)]">
                      {steps.length} step{steps.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="rounded-lg p-2 text-[var(--color-ink-600)] hover:bg-red-900/30 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {isExpanded && (
                <div className="border-t border-[var(--color-ink-700)] p-4">
                  {c.description && (
                    <p className="mb-4 text-xs text-[var(--color-ink-500)]">{c.description}</p>
                  )}
                  <div className="space-y-3">
                    {steps.map((step) => (
                      <div
                        key={step.id}
                        className="rounded-lg border border-[var(--color-ink-800)] bg-[var(--color-ink-900)] p-3"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Mail size={12} className="text-[var(--color-gold)]" />
                          <span className="text-xs font-medium text-[var(--color-cream)]">
                            Step {step.step_number}
                          </span>
                          <span className="text-[10px] text-[var(--color-ink-500)]">
                            {step.delay_days === 0
                              ? "Same day"
                              : `+${step.delay_days} day${step.delay_days !== 1 ? "s" : ""}`}
                          </span>
                        </div>
                        {step.subject && (
                          <p className="text-xs font-medium text-[var(--color-ink-300)]">
                            Subject: {step.subject}
                          </p>
                        )}
                        <pre className="mt-1 whitespace-pre-wrap text-[10px] leading-relaxed text-[var(--color-ink-500)]">
                          {step.body.slice(0, 200)}
                          {step.body.length > 200 ? "…" : ""}
                        </pre>
                      </div>
                    ))}
                    {steps.length === 0 && (
                      <p className="text-xs text-[var(--color-ink-600)]">No steps yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {cadences.length === 0 && !creating && (
          <div className="rounded-xl border border-dashed border-[var(--color-ink-700)] px-6 py-10 text-center text-sm text-[var(--color-ink-500)]">
            No cadences yet. Create one to start sending outreach.
          </div>
        )}
      </div>
    </div>
  );
}
