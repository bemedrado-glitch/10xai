"use client";

import { useState } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Trash2,
  Mail,
  Save,
  Loader2,
  Clock,
} from "lucide-react";
import type { Cadence, CadenceStep } from "@/lib/database.types";

type CadenceWithSteps = Cadence & { cadence_steps: CadenceStep[] };

const BOOKING_URL = "https://cal.com/10xai";

const DEFAULT_STEPS = [
  {
    step_number: 1,
    delay_days: 0,
    subject: "Quick question about {business_name}",
    body: `Hi {contact_name},

I noticed {business_name} has {rating} stars on Google — that's impressive for {city}.

Most businesses like yours rely on word-of-mouth but don't have a system to capture those warm leads automatically. That's what we fix.

Would you have 15 minutes this week to see how it works?

— Bernardo
Book 15 min: ${BOOKING_URL}`,
  },
  {
    step_number: 2,
    delay_days: 3,
    subject: "Re: Quick question about {business_name}",
    body: `Hi {contact_name},

Just circling back. Businesses like {business_name} typically see 10-15 new qualified leads/month within 30 days of going live with us.

Worth 15 minutes?

— Bernardo
Book 15 min: ${BOOKING_URL}`,
  },
  {
    step_number: 3,
    delay_days: 7,
    subject: "Last note — {business_name}",
    body: `Hi {contact_name},

I'll keep this short. If growing {business_name} beyond referrals is a priority this quarter, I'd love to show you how.

If timing isn't right, no worries — I'll close the file.

— Bernardo
Book 15 min: ${BOOKING_URL}`,
  },
];

export default function CadencesClient({
  initialCadences,
}: {
  initialCadences: CadenceWithSteps[];
}) {
  const [cadences, setCadences] = useState(initialCadences);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
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

  async function handleDeleteCadence(id: string) {
    if (!confirm("Delete this cadence and all its emails?")) return;
    await fetch(`/api/admin/cadences?id=${id}`, { method: "DELETE" });
    setCadences(cadences.filter((c) => c.id !== id));
  }

  async function saveStep(stepId: string, updates: Partial<CadenceStep>) {
    const res = await fetch(`/api/admin/cadence-steps/${stepId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) return false;
    const data = await res.json();
    setCadences((prev) =>
      prev.map((c) => ({
        ...c,
        cadence_steps: c.cadence_steps.map((s) => (s.id === stepId ? data.step : s)),
      }))
    );
    return true;
  }

  async function deleteStep(cadenceId: string, stepId: string) {
    if (!confirm("Delete this email?")) return;
    const res = await fetch(`/api/admin/cadence-steps/${stepId}`, { method: "DELETE" });
    if (!res.ok) return;
    setCadences((prev) =>
      prev.map((c) =>
        c.id === cadenceId
          ? { ...c, cadence_steps: c.cadence_steps.filter((s) => s.id !== stepId) }
          : c
      )
    );
  }

  async function addStep(cadenceId: string) {
    const res = await fetch(`/api/admin/cadences/${cadenceId}/steps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (!res.ok) return;
    const data = await res.json();
    setCadences((prev) =>
      prev.map((c) =>
        c.id === cadenceId
          ? { ...c, cadence_steps: [...c.cadence_steps, data.step] }
          : c
      )
    );
    setEditingStepId(data.step.id);
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Lighthouse
          </p>
          <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
            Cadences
          </h1>
          <p className="mt-1 text-sm text-[var(--color-ink-400)]">
            Email sequences sent to enrolled leads. Click a cadence to view and edit each email.
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
          <h2 className="mb-4 text-sm font-bold text-[var(--color-cream)]">New Cadence</h2>
          <p className="mb-3 text-xs text-[var(--color-ink-500)]">
            A 3-step default sequence with booking CTAs will be created. Edit each email after saving.
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
              className="flex-1 rounded-lg border border-[var(--color-ink-700)] py-2 text-sm font-medium text-[var(--color-cream)] hover:border-[var(--color-gold)]/40"
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
                    <ChevronRight size={14} className="shrink-0 text-[var(--color-cream)]" />
                  )}
                  <div className="min-w-0">
                    <span className="font-semibold text-[var(--color-cream)]">{c.name}</span>
                    <span className="ml-3 text-xs text-[var(--color-ink-400)]">
                      {steps.length} email{steps.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => handleDeleteCadence(c.id)}
                  className="rounded-lg p-2 text-[var(--color-ink-500)] hover:bg-red-900/30 hover:text-red-400"
                  title="Delete cadence"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {isExpanded && (
                <div className="border-t border-[var(--color-ink-700)] p-4">
                  {c.description && (
                    <p className="mb-4 text-xs text-[var(--color-ink-400)]">{c.description}</p>
                  )}
                  <div className="space-y-3">
                    {steps.map((step) => (
                      <StepEditor
                        key={step.id}
                        step={step}
                        editing={editingStepId === step.id}
                        onEdit={() => setEditingStepId(step.id)}
                        onCancel={() => setEditingStepId(null)}
                        onSave={async (updates) => {
                          const ok = await saveStep(step.id, updates);
                          if (ok) setEditingStepId(null);
                        }}
                        onDelete={() => deleteStep(c.id, step.id)}
                      />
                    ))}
                    {steps.length === 0 && (
                      <p className="text-xs text-[var(--color-ink-500)]">No emails in this cadence yet.</p>
                    )}
                  </div>
                  <button
                    onClick={() => addStep(c.id)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-ink-700)] py-2 text-xs font-medium text-[var(--color-cream)] transition-colors hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)]"
                  >
                    <Plus size={12} />
                    Add email
                  </button>
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

function StepEditor({
  step,
  editing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: {
  step: CadenceStep;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (updates: Partial<CadenceStep>) => Promise<void>;
  onDelete: () => void;
}) {
  const [subject, setSubject] = useState(step.subject ?? "");
  const [body, setBody] = useState(step.body);
  const [delayDays, setDelayDays] = useState(step.delay_days);
  const [busy, setBusy] = useState(false);

  // Reset local state when step changes externally or edit toggles
  function startEdit() {
    setSubject(step.subject ?? "");
    setBody(step.body);
    setDelayDays(step.delay_days);
    onEdit();
  }

  async function handleSave() {
    setBusy(true);
    await onSave({ subject, body, delay_days: delayDays });
    setBusy(false);
  }

  const hasCta = /cal\.com\/10xai/i.test(body);

  if (!editing) {
    return (
      <div className="rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)]">
        <div className="flex items-start justify-between gap-3 p-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--color-gold)]/15 px-2 py-0.5 text-[10px] font-bold text-[var(--color-gold)]">
                Step {step.step_number}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[var(--color-cream)]/70">
                <Clock size={10} />
                {step.delay_days === 0 ? "Same day" : `+${step.delay_days} days`}
              </span>
              {!hasCta && (
                <span className="rounded-full bg-amber-900/40 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                  No booking CTA
                </span>
              )}
            </div>
            {step.subject && (
              <p className="mb-2 text-sm font-semibold text-[var(--color-cream)]">{step.subject}</p>
            )}
            <pre className="whitespace-pre-wrap break-words font-sans text-xs leading-relaxed text-[var(--color-cream)]/85">
              {step.body}
            </pre>
          </div>
          <div className="flex shrink-0 flex-col gap-1">
            <button
              onClick={startEdit}
              className="rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="rounded-md p-1.5 text-[var(--color-ink-500)] hover:bg-red-900/30 hover:text-red-400"
              title="Delete email"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--color-gold)]/40 bg-[var(--color-ink-900)] p-3">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--color-gold)]/15 px-2 py-0.5 text-[10px] font-bold text-[var(--color-gold)]">
          <Mail size={10} className="mr-1 inline" />
          Step {step.step_number}
        </span>
        <label className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--color-cream)]/70">
          Send after
          <input
            type="number"
            value={delayDays}
            onChange={(e) => setDelayDays(parseInt(e.target.value, 10) || 0)}
            min={0}
            max={365}
            className="w-14 rounded border border-[var(--color-ink-700)] bg-[var(--color-ink)] px-1.5 py-0.5 text-center text-xs text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
          />
          days
        </label>
      </div>

      <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[var(--color-cream)]/70">
        Subject
      </label>
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Email subject"
        className="mb-3 w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
      />

      <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-[var(--color-cream)]/70">
        Body
      </label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={Math.max(8, Math.min(24, body.split("\n").length + 1))}
        className="w-full resize-y rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink)] px-3 py-2 font-mono text-xs leading-relaxed text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
      />
      <p className="mt-1.5 text-[10px] text-[var(--color-cream)]/60">
        Variables: <code className="text-[var(--color-gold)]">{"{business_name}"}</code>{" "}
        <code className="text-[var(--color-gold)]">{"{contact_name}"}</code>{" "}
        <code className="text-[var(--color-gold)]">{"{city}"}</code>{" "}
        <code className="text-[var(--color-gold)]">{"{rating}"}</code>{" "}
        <code className="text-[var(--color-gold)]">{"{phone}"}</code>
      </p>
      {!/cal\.com\/10xai/i.test(body) && (
        <button
          onClick={() =>
            setBody((b) =>
              b.trimEnd() + `\n\nBook 15 min: ${BOOKING_URL}`
            )
          }
          className="mt-2 rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-2.5 py-1 text-[10px] font-bold text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20"
        >
          + Add booking CTA
        </button>
      )}

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-lg border border-[var(--color-ink-700)] px-3 py-1.5 text-xs font-medium text-[var(--color-cream)] hover:border-[var(--color-gold)]/40"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={busy}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--color-gold)] px-3 py-1.5 text-xs font-bold text-[var(--color-cream)] hover:opacity-90 disabled:opacity-40"
        >
          {busy ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
          {busy ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
