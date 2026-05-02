"use client";

import { useMemo, useState } from "react";
import {
  Brain,
  Heart,
  AlertTriangle,
  Frown,
  HelpCircle,
  MessageCircle,
  Mail,
  Save,
  Trash2,
  Plus,
  Loader2,
  Clock,
  ExternalLink,
  Eye,
  Globe2,
} from "lucide-react";
import type { Cadence, CadenceStep, Persona } from "@/lib/database.types";
import { PLAYBOOK, type PlaybookEntry } from "@/data/sales-playbook";
import EmailPreviewModal from "@/components/EmailPreviewModal";

const SECTION_TABS = [
  { key: "insight", label: "Audience Insight", icon: Eye },
  { key: "spin", label: "SPIN Questions", icon: HelpCircle },
  { key: "objections", label: "Objections", icon: MessageCircle },
  { key: "emails", label: "Cadence Emails", icon: Mail },
] as const;

type SectionKey = (typeof SECTION_TABS)[number]["key"];

const SPIN_LABELS: Record<string, { label: string; tone: string }> = {
  situation: { label: "Situation", tone: "bg-blue-900/40 text-blue-300" },
  problem: { label: "Problem", tone: "bg-amber-900/40 text-amber-300" },
  implication: { label: "Implication", tone: "bg-orange-900/40 text-orange-300" },
  "need-payoff": { label: "Need-Payoff", tone: "bg-emerald-900/40 text-emerald-300" },
};

export default function SalesPlaybookClient({
  personas,
  cadences: initialCadences,
  steps: initialSteps,
}: {
  personas: Persona[];
  cadences: Cadence[];
  steps: CadenceStep[];
}) {
  const playbookPersonas = personas.filter((p) => PLAYBOOK[p.name]);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(
    playbookPersonas[0]?.id ?? personas[0]?.id ?? ""
  );
  const [section, setSection] = useState<SectionKey>("insight");
  const [steps, setSteps] = useState(initialSteps);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);

  const selectedPersona = useMemo(
    () => personas.find((p) => p.id === selectedPersonaId) ?? null,
    [personas, selectedPersonaId]
  );

  const playbook: PlaybookEntry | null = selectedPersona
    ? PLAYBOOK[selectedPersona.name] ?? null
    : null;

  const personaCadences = useMemo(
    () => initialCadences.filter((c) => c.persona_id === selectedPersonaId),
    [initialCadences, selectedPersonaId]
  );

  async function saveStep(stepId: string, updates: Partial<CadenceStep>) {
    const res = await fetch(`/api/admin/cadence-steps/${stepId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) return false;
    const data = await res.json();
    setSteps((prev) => prev.map((s) => (s.id === stepId ? data.step : s)));
    return true;
  }

  async function deleteStep(stepId: string) {
    if (!confirm("Delete this email?")) return;
    const res = await fetch(`/api/admin/cadence-steps/${stepId}`, { method: "DELETE" });
    if (res.ok) setSteps((prev) => prev.filter((s) => s.id !== stepId));
  }

  async function addStep(cadenceId: string) {
    const res = await fetch(`/api/admin/cadences/${cadenceId}/steps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (!res.ok) return;
    const data = await res.json();
    setSteps((prev) => [...prev, data.step]);
    setEditingStepId(data.step.id);
  }

  function gmailUrl(subject: string | null, body: string): string {
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      su: subject ?? "",
      body,
    });
    return `https://mail.google.com/mail/?${params.toString()}`;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          10XAI · Strategy
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
          Sales Playbook
        </h1>
        <p className="mt-1 text-sm text-[var(--color-cream)]/80">
          Pick a persona — see their worldview, motivations, the four SPIN questions that move them,
          and the top objections you&apos;ll hear with mirror + positive responses. Cadence emails for
          this persona are also editable here with a one-click Gmail send.
        </p>
      </div>

      {/* Persona selector */}
      <div className="mb-5 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-cream)]/70">
            Persona
          </p>
          {playbookPersonas.length < personas.length && (
            <p className="text-[10px] text-[var(--color-cream)]/50">
              {personas.length - playbookPersonas.length} persona
              {personas.length - playbookPersonas.length !== 1 ? "s" : ""} have no playbook content yet
            </p>
          )}
        </div>
        <select
          value={selectedPersonaId}
          onChange={(e) => {
            setSelectedPersonaId(e.target.value);
            setEditingStepId(null);
          }}
          className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2.5 text-sm font-semibold text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
        >
          {personas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
              {!PLAYBOOK[p.name] ? " (no playbook)" : ""}
            </option>
          ))}
        </select>
        {selectedPersona?.description && (
          <p className="mt-2 text-xs text-[var(--color-cream)]/75">{selectedPersona.description}</p>
        )}
      </div>

      {!selectedPersona ? (
        <div className="rounded-xl border border-dashed border-[var(--color-ink-700)] px-6 py-12 text-center text-sm text-[var(--color-cream)]/70">
          No personas yet. Run the seed SQL on the Research tab.
        </div>
      ) : !playbook ? (
        <div className="rounded-xl border border-dashed border-amber-900/50 bg-amber-900/10 px-6 py-12 text-center text-sm text-amber-200">
          No playbook content for this persona yet. Add an entry to{" "}
          <code className="rounded bg-[var(--color-ink-900)] px-1.5 py-0.5 text-amber-300">
            src/data/sales-playbook.ts
          </code>{" "}
          keyed by &quot;{selectedPersona.name}&quot;.
        </div>
      ) : (
        <>
          {/* Section tabs */}
          <div className="mb-4 flex flex-wrap gap-2">
            {SECTION_TABS.map((t) => {
              const Icon = t.icon;
              const active = section === t.key;
              const count =
                t.key === "emails"
                  ? steps.filter((s) =>
                      personaCadences.some((c) => c.id === s.cadence_id)
                    ).length
                  : t.key === "insight"
                    ? playbook.needs.length +
                      playbook.desires.length +
                      playbook.pains.length +
                      playbook.fears.length
                    : t.key === "spin"
                      ? playbook.spin_questions.length
                      : playbook.objections.length;
              return (
                <button
                  key={t.key}
                  onClick={() => setSection(t.key)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                    active
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                      : "border-[var(--color-ink-700)] bg-[var(--color-ink-900)] text-[var(--color-cream)] hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-ink-800)]"
                  }`}
                >
                  <Icon size={12} />
                  {t.label}
                  <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {section === "insight" && <InsightSection playbook={playbook} />}

          {section === "spin" && <SpinSection playbook={playbook} />}

          {section === "objections" && <ObjectionsSection playbook={playbook} />}

          {section === "emails" && (
            <EmailsSection
              cadences={personaCadences}
              steps={steps.filter((s) =>
                personaCadences.some((c) => c.id === s.cadence_id)
              )}
              editingStepId={editingStepId}
              setEditingStepId={setEditingStepId}
              saveStep={saveStep}
              deleteStep={deleteStep}
              addStep={addStep}
              gmailUrl={gmailUrl}
            />
          )}
        </>
      )}
    </div>
  );
}

function InsightSection({ playbook }: { playbook: PlaybookEntry }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-5">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-gold)]">
          <Globe2 size={12} />
          Their worldview
        </div>
        <p className="text-sm leading-relaxed text-[var(--color-cream)]">{playbook.worldview}</p>
        <p className="mt-2 text-[11px] text-[var(--color-cream)]/60">{playbook.persona}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <InsightList
          title="Top Needs"
          subtitle="What this persona must have"
          items={playbook.needs}
          icon={Brain}
          tone="text-blue-300"
          dot="bg-blue-400"
        />
        <InsightList
          title="Top Desires"
          subtitle="What they aspire to"
          items={playbook.desires}
          icon={Heart}
          tone="text-emerald-300"
          dot="bg-emerald-400"
        />
        <InsightList
          title="Top Pains"
          subtitle="What hurts them today"
          items={playbook.pains}
          icon={AlertTriangle}
          tone="text-amber-300"
          dot="bg-amber-400"
        />
        <InsightList
          title="Top Fears"
          subtitle="What keeps them from saying yes"
          items={playbook.fears}
          icon={Frown}
          tone="text-red-300"
          dot="bg-red-400"
        />
      </div>
    </div>
  );
}

function InsightList({
  title,
  subtitle,
  items,
  icon: Icon,
  tone,
  dot,
}: {
  title: string;
  subtitle: string;
  items: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tone: string;
  dot: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5">
      <div className="mb-3 flex items-start gap-2">
        <Icon size={16} className={tone} />
        <div>
          <h3 className="text-sm font-bold text-[var(--color-cream)]">{title}</h3>
          <p className="text-[11px] text-[var(--color-cream)]/60">{subtitle}</p>
        </div>
      </div>
      <ol className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--color-cream)]/90">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`}
              aria-hidden
            />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SpinSection({ playbook }: { playbook: PlaybookEntry }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--color-cream)]/70">
        Sequenced across the conversation: Situation → Problem → Implication → Need-Payoff. Use one
        per touch, not all in one call.
      </p>
      {playbook.spin_questions.map((q, i) => {
        const meta = SPIN_LABELS[q.type];
        return (
          <div
            key={i}
            className="rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5"
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.tone}`}
              >
                {meta.label}
              </span>
              <span className="text-[10px] text-[var(--color-cream)]/50">
                Question {i + 1} of {playbook.spin_questions.length}
              </span>
            </div>
            <p className="text-base font-semibold leading-relaxed text-[var(--color-cream)]">
              &ldquo;{q.question}&rdquo;
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ObjectionsSection({ playbook }: { playbook: PlaybookEntry }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--color-cream)]/70">
        Three patterns: prospect raises objection → you mirror back the last few words (Chris Voss
        style) → then deliver the positive response. The mirror buys you 2 seconds and a softer
        prospect.
      </p>
      {playbook.objections.map((o, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)]"
        >
          <div className="border-b border-[var(--color-ink-700)] bg-red-900/15 px-5 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-300">
              Objection {i + 1}
            </p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-cream)]">
              &ldquo;{o.objection}&rdquo;
            </p>
          </div>
          <div className="space-y-3 p-5">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Mirror (repeat the last few words)
              </p>
              <p className="rounded-lg border border-amber-900/30 bg-amber-900/10 px-3 py-2 text-sm italic text-amber-100">
                &ldquo;{o.mirror}&rdquo;
              </p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                Positive response
              </p>
              <p className="rounded-lg border border-emerald-900/30 bg-emerald-900/10 px-3 py-2 text-sm leading-relaxed text-[var(--color-cream)]">
                {o.positive_response}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmailsSection({
  cadences,
  steps,
  editingStepId,
  setEditingStepId,
  saveStep,
  deleteStep,
  addStep,
  gmailUrl,
}: {
  cadences: Cadence[];
  steps: CadenceStep[];
  editingStepId: string | null;
  setEditingStepId: (id: string | null) => void;
  saveStep: (id: string, updates: Partial<CadenceStep>) => Promise<boolean>;
  deleteStep: (id: string) => Promise<void>;
  addStep: (cadenceId: string) => Promise<void>;
  gmailUrl: (subject: string | null, body: string) => string;
}) {
  if (cadences.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-ink-700)] px-6 py-12 text-center text-sm text-[var(--color-cream)]/70">
        No cadences linked to this persona. Create one in the Cadences tab and set its persona, or
        run the seed SQL.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cadences.map((c) => {
        const cadenceSteps = steps
          .filter((s) => s.cadence_id === c.id)
          .sort((a, b) => a.step_number - b.step_number);
        return (
          <div
            key={c.id}
            className="rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[var(--color-cream)]">{c.name}</h3>
                {c.description && (
                  <p className="text-[11px] text-[var(--color-cream)]/65">{c.description}</p>
                )}
              </div>
              <span className="text-[11px] text-[var(--color-cream)]/60">
                {cadenceSteps.length} email{cadenceSteps.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-2.5">
              {cadenceSteps.map((step) => (
                <StepCard
                  key={step.id}
                  step={step}
                  editing={editingStepId === step.id}
                  onEdit={() => setEditingStepId(step.id)}
                  onCancel={() => setEditingStepId(null)}
                  onSave={async (updates) => {
                    const ok = await saveStep(step.id, updates);
                    if (ok) setEditingStepId(null);
                  }}
                  onDelete={() => deleteStep(step.id)}
                  gmailUrl={gmailUrl}
                />
              ))}
              {cadenceSteps.length === 0 && (
                <p className="text-xs text-[var(--color-cream)]/60">No emails yet.</p>
              )}
            </div>
            <button
              onClick={() => addStep(c.id)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-ink-700)] py-2 text-xs font-medium text-[var(--color-cream)] hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)]"
            >
              <Plus size={12} />
              Add email
            </button>
          </div>
        );
      })}
    </div>
  );
}

function StepCard({
  step,
  editing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
  gmailUrl,
}: {
  step: CadenceStep;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (updates: Partial<CadenceStep>) => Promise<void>;
  onDelete: () => void;
  gmailUrl: (subject: string | null, body: string) => string;
}) {
  const [subject, setSubject] = useState(step.subject ?? "");
  const [body, setBody] = useState(step.body);
  const [delayDays, setDelayDays] = useState(step.delay_days);
  const [busy, setBusy] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

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
              onClick={() => setPreviewOpen(true)}
              className="flex items-center justify-center gap-1 rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20"
              title="Preview rendered email"
            >
              <Eye size={11} />
              Preview
            </button>
            <button
              onClick={startEdit}
              className="rounded-md border border-[var(--color-ink-700)] bg-[var(--color-ink)] px-2.5 py-1 text-[11px] font-bold text-[var(--color-cream)] hover:border-[var(--color-gold)]/40"
            >
              Edit
            </button>
            <a
              href={gmailUrl(step.subject, step.body)}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in Gmail compose"
              className="flex items-center justify-center gap-1 rounded-md border border-[var(--color-ink-700)] bg-[var(--color-ink)] px-2.5 py-1 text-[11px] font-bold text-[var(--color-cream)] hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
            >
              <ExternalLink size={11} />
              Gmail
            </a>
            <button
              onClick={onDelete}
              className="rounded-md p-1.5 text-[var(--color-cream)]/60 hover:bg-red-900/30 hover:text-red-400"
              title="Delete email"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
        {previewOpen && (
          <EmailPreviewModal
            subject={step.subject ?? ""}
            body={step.body}
            onClose={() => setPreviewOpen(false)}
          />
        )}
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
        Variables:{" "}
        <code className="text-[var(--color-gold)]">{"{business_name}"}</code>{" "}
        <code className="text-[var(--color-gold)]">{"{contact_name}"}</code>{" "}
        <code className="text-[var(--color-gold)]">{"{city}"}</code>{" "}
        <code className="text-[var(--color-gold)]">{"{rating}"}</code>{" "}
        <code className="text-[var(--color-gold)]">{"{phone}"}</code>
      </p>
      {!hasCta && (
        <button
          onClick={() =>
            setBody((b) => b.trimEnd() + `\n\nBook 15 min: https://cal.com/10xai`)
          }
          className="mt-2 rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-2.5 py-1 text-[10px] font-bold text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20"
        >
          + Add booking CTA
        </button>
      )}
      <div className="mt-4 flex flex-wrap justify-between gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1.5 text-xs font-bold text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20"
            title="See the rendered HTML email"
          >
            <Eye size={11} />
            Preview
          </button>
          <a
            href={gmailUrl(subject, body)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink)] px-3 py-1.5 text-xs font-bold text-[var(--color-cream)] hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]"
            title="Preview this draft in Gmail compose"
          >
            <ExternalLink size={11} />
            Open in Gmail
          </a>
        </div>
        <div className="flex gap-2">
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
      {previewOpen && (
        <EmailPreviewModal
          subject={subject}
          body={body}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}
