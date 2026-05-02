"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Star,
  MapPin,
  Phone,
  Globe,
  Mail,
  ExternalLink,
  PauseCircle,
  PlayCircle,
  XCircle,
  Sparkles,
  Loader2,
  Plus,
  Calendar,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import type { Lead, Persona, Cadence } from "@/lib/database.types";
import { categoryLabel } from "@/lib/business-categories";
import { buildCalUrl, bookMeetingNotes } from "@/lib/cal";

type Enrollment = {
  id: string;
  cadence_id: string;
  current_step: number;
  status: string;
  next_send_at: string | null;
  created_at: string;
};

type Send = {
  id: string;
  sent_at: string;
  subject: string | null;
  status: string;
  opened_at: string | null;
  replied_at: string | null;
};

export default function LeadDetailClient({
  lead,
  personas,
  cadences,
  initialEnrollments,
  sends,
}: {
  lead: Lead;
  personas: Persona[];
  cadences: Cadence[];
  initialEnrollments: Enrollment[];
  sends: Send[];
}) {
  const router = useRouter();
  const [email, setEmail] = useState(lead.email ?? "");
  const [phone, setPhone] = useState(lead.phone ?? "");
  const [contactName, setContactName] = useState(lead.contact_name ?? "");
  const [contactTitle, setContactTitle] = useState(lead.contact_title ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(lead.linkedin_url ?? "");
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [personaId, setPersonaId] = useState(lead.persona_id ?? "");
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Enrichment state
  const [enriching, setEnriching] = useState(false);
  const [enrichError, setEnrichError] = useState<string | null>(null);
  const [enrichResult, setEnrichResult] = useState<{
    domain: string;
    emails: string[];
    phones: string[];
    people: { name: string; email: string; position: string; confidence: number }[];
    sources: { hunter: boolean; scrape: boolean };
  } | null>(null);

  // Tasks state
  type TaskRow = {
    id: string;
    title: string;
    description: string | null;
    type: string;
    status: string;
    due_at: string | null;
    completed_at: string | null;
    created_at: string;
  };
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [callOutcomeMsg, setCallOutcomeMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/tasks?lead_id=${lead.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) {
          setTasks(d.tasks ?? []);
          setTasksLoading(false);
        }
      })
      .catch(() => setTasksLoading(false));
    return () => {
      cancelled = true;
    };
  }, [lead.id]);

  async function createFollowUpTask(daysFromNow: 30 | 60) {
    const res = await fetch("/api/admin/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `Follow up with ${lead.business_name}`,
        description: `Post-${daysFromNow} follow-up after negative call response.`,
        type: daysFromNow === 30 ? "follow_up_30" : "follow_up_60",
        days_from_now: daysFromNow,
        lead_id: lead.id,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setTasks((prev) => [data.task, ...prev]);
      setCallOutcomeMsg(`Follow-up scheduled in ${daysFromNow} days.`);
      setTimeout(() => setCallOutcomeMsg(null), 3000);
    }
  }

  async function toggleTask(t: TaskRow) {
    const newStatus = t.status === "done" ? "open" : "done";
    const res = await fetch(`/api/admin/tasks/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const data = await res.json();
      setTasks((prev) => prev.map((x) => (x.id === t.id ? data.task : x)));
    }
  }

  async function deleteTask(t: TaskRow) {
    if (!confirm(`Delete task: "${t.title}"?`)) return;
    const res = await fetch(`/api/admin/tasks/${t.id}`, { method: "DELETE" });
    if (res.ok) setTasks((prev) => prev.filter((x) => x.id !== t.id));
  }

  const calUrl = buildCalUrl({
    name: lead.contact_name ?? lead.business_name,
    email: lead.email,
    notes: bookMeetingNotes(lead.business_name),
  });

  async function enrich() {
    if (!lead.website) {
      setEnrichError("This lead has no website on file. Add one first.");
      return;
    }
    setEnriching(true);
    setEnrichError(null);
    setEnrichResult(null);
    try {
      const res = await fetch("/api/admin/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: lead.website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Enrichment failed");
      setEnrichResult(data);
    } catch (err) {
      setEnrichError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setEnriching(false);
    }
  }

  async function save() {
    setSaving(true);
    setSaved(false);
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email || null,
        phone: phone || null,
        contact_name: contactName || null,
        contact_title: contactTitle || null,
        linkedin_url: linkedinUrl || null,
        notes: notes || null,
        persona_id: personaId || null,
      }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    }
    setSaving(false);
  }

  async function changeEnrollmentStatus(id: string, status: "active" | "paused" | "cancelled") {
    const res = await fetch(`/api/admin/enrollments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setEnrollments((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    }
  }

  const cadenceById = (id: string) => cadences.find((c) => c.id === id);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <Link
        href="/admin/leads"
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-[var(--color-ink-500)] hover:text-[var(--color-cream)]"
      >
        <ArrowLeft size={12} />
        All leads
      </Link>

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Lead
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
          {lead.business_name}
        </h1>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--color-ink-500)]">
          {lead.category && (
            <span className="rounded-full bg-[var(--color-ink-800)] px-2 py-0.5 text-[10px]">
              {categoryLabel(lead.category)}
            </span>
          )}
          {(lead.rating ?? 0) > 0 && (
            <span className="flex items-center gap-1">
              <Star size={11} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />
              {lead.rating?.toFixed(1)} ({lead.review_count?.toLocaleString()})
            </span>
          )}
          {lead.address && (
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {lead.address}
            </span>
          )}
          {lead.website && (
            <a
              href={lead.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[var(--color-gold)]"
            >
              <Globe size={11} />
              {lead.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      </div>

      {/* Call outcome — quick actions for after a phone call */}
      <div className="mb-6 rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-5">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-bold text-[var(--color-cream)]">After the call</h2>
            <p className="text-xs text-[var(--color-cream)]/70">
              Quick log the outcome — book a meeting on a positive, schedule a follow-up on a no.
            </p>
          </div>
          {callOutcomeMsg && (
            <span className="rounded-full bg-emerald-900/40 px-3 py-1 text-[11px] font-medium text-emerald-300">
              {callOutcomeMsg}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] px-3 py-2.5 text-sm font-bold text-[var(--color-cream)] hover:opacity-90"
          >
            <Calendar size={14} />
            Positive · Book meeting
          </a>
          <button
            onClick={() => createFollowUpTask(30)}
            className="flex items-center justify-center gap-2 rounded-lg border border-amber-700/50 bg-amber-900/20 px-3 py-2.5 text-sm font-bold text-amber-300 hover:bg-amber-900/30"
          >
            <Calendar size={14} />
            Negative · Follow up post 30
          </button>
          <button
            onClick={() => createFollowUpTask(60)}
            className="flex items-center justify-center gap-2 rounded-lg border border-orange-700/50 bg-orange-900/20 px-3 py-2.5 text-sm font-bold text-orange-300 hover:bg-orange-900/30"
          >
            <Calendar size={14} />
            Negative · Follow up post 60
          </button>
        </div>
      </div>

      {/* Tasks for this lead */}
      <div className="mb-6 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--color-cream)]">Tasks for this lead</h2>
          <Link
            href="/admin/tasks"
            className="text-[11px] text-[var(--color-gold)] hover:underline"
          >
            All tasks →
          </Link>
        </div>
        {tasksLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 size={16} className="animate-spin text-[var(--color-gold)]" />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-xs text-[var(--color-cream)]/60">
            No tasks yet. Use the buttons above to log a call outcome.
          </p>
        ) : (
          <div className="space-y-2">
            {tasks.map((t) => {
              const isDone = t.status === "done";
              const due = t.due_at ? new Date(t.due_at) : null;
              const overdue = due && !isDone && due < new Date();
              return (
                <div
                  key={t.id}
                  className={`flex items-start gap-3 rounded-lg border px-3 py-2 ${
                    isDone
                      ? "border-[var(--color-ink-800)] opacity-60"
                      : overdue
                        ? "border-red-900/50 bg-red-900/10"
                        : "border-[var(--color-ink-800)] bg-[var(--color-ink-900)]"
                  }`}
                >
                  <button
                    onClick={() => toggleTask(t)}
                    className="mt-0.5 shrink-0 text-[var(--color-cream)]/70 hover:text-[var(--color-gold)]"
                  >
                    {isDone ? (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : (
                      <Calendar size={16} />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm text-[var(--color-cream)] ${isDone ? "line-through" : ""}`}
                    >
                      {t.title}
                    </p>
                    {due && (
                      <p
                        className={`text-[11px] ${
                          overdue ? "text-red-400" : "text-[var(--color-cream)]/60"
                        }`}
                      >
                        Due{" "}
                        {due.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year:
                            due.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
                        })}
                        {overdue && " · overdue"}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteTask(t)}
                    className="rounded-md p-1 text-[var(--color-cream)]/60 hover:bg-red-900/30 hover:text-red-400"
                    title="Delete task"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Contact enrichment */}
      <div className="mb-6 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--color-cream)]">Contact</h2>
          <button
            onClick={enrich}
            disabled={enriching || !lead.website}
            title={!lead.website ? "Add a website first" : "Find emails + phones from the website"}
            className="flex items-center gap-2 rounded-lg border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1.5 text-xs font-bold text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)]/20 disabled:opacity-40"
          >
            {enriching ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            {enriching ? "Enriching…" : "Enrich"}
          </button>
        </div>

        {enrichError && (
          <div className="mb-3 rounded-lg bg-red-900/30 px-3 py-2 text-xs text-red-400">
            {enrichError}
          </div>
        )}

        {enrichResult && (
          <div className="mb-4 rounded-lg border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-gold)]">
                Suggestions for {enrichResult.domain}
              </p>
              <p className="text-[10px] text-[var(--color-ink-500)]">
                {enrichResult.sources.hunter ? "Hunter + scrape" : "Scrape only"}
              </p>
            </div>

            {enrichResult.people.length > 0 && (
              <div className="mb-3">
                <p className="mb-1.5 text-[10px] uppercase tracking-wider text-[var(--color-ink-500)]">
                  People found
                </p>
                <div className="space-y-1.5">
                  {enrichResult.people.slice(0, 5).map((p) => (
                    <div
                      key={p.email}
                      className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-ink-800)] bg-[var(--color-ink-900)] px-2.5 py-1.5"
                    >
                      <div className="min-w-0">
                        <p className="text-xs text-[var(--color-cream)]">
                          {p.name}{" "}
                          {p.position && (
                            <span className="text-[var(--color-ink-500)]">· {p.position}</span>
                          )}
                        </p>
                        <p className="text-[11px] text-[var(--color-ink-400)]">{p.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setEmail(p.email);
                          if (p.name && !contactName) setContactName(p.name);
                          if (p.position && !contactTitle) setContactTitle(p.position);
                        }}
                        className="flex shrink-0 items-center gap-1 rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-2 py-1 text-[10px] font-bold text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20"
                      >
                        <Plus size={10} />
                        Use
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {enrichResult.emails.length > 0 && (
              <div className="mb-3">
                <p className="mb-1.5 text-[10px] uppercase tracking-wider text-[var(--color-ink-500)]">
                  Emails
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {enrichResult.emails.slice(0, 12).map((e) => (
                    <button
                      key={e}
                      onClick={() => setEmail(e)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        email === e
                          ? "border-[var(--color-gold)] bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                          : "border-[var(--color-ink-700)] bg-[var(--color-ink-900)] text-[var(--color-cream)] hover:border-[var(--color-gold)]/40"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {enrichResult.phones.length > 0 && (
              <div>
                <p className="mb-1.5 text-[10px] uppercase tracking-wider text-[var(--color-ink-500)]">
                  Phones
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {enrichResult.phones.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPhone(p)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        phone === p
                          ? "border-[var(--color-gold)] bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                          : "border-[var(--color-ink-700)] bg-[var(--color-ink-900)] text-[var(--color-cream)] hover:border-[var(--color-gold)]/40"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {enrichResult.emails.length === 0 &&
              enrichResult.phones.length === 0 &&
              enrichResult.people.length === 0 && (
                <p className="text-xs text-[var(--color-ink-500)]">
                  Nothing found on the website. Try Hunter.io setup, or add a different URL.
                </p>
              )}

            <p className="mt-3 text-[10px] text-[var(--color-ink-600)]">
              Click any suggestion to fill the field above. Don&apos;t forget to <strong>Save</strong>.
            </p>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-[var(--color-ink-500)]">
              Contact name
            </label>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Owner / decision maker"
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium text-[var(--color-ink-500)]">
              Title
            </label>
            <input
              value={contactTitle}
              onChange={(e) => setContactTitle(e.target.value)}
              placeholder="Owner, Manager…"
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-ink-500)]">
              <Mail size={11} /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@business.com"
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-ink-500)]">
              <Phone size={11} /> Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 555 123 4567"
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-ink-500)]">
              <ExternalLink size={11} /> LinkedIn URL
            </label>
            <input
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/…"
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium text-[var(--color-ink-500)]">
              Persona
            </label>
            <select
              value={personaId}
              onChange={(e) => setPersonaId(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
            >
              <option value="">None</option>
              {personas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-[11px] font-medium text-[var(--color-ink-500)]">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-4 py-2 text-sm font-bold text-[var(--color-cream)] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Save size={13} />
            {saving ? "Saving…" : "Save"}
          </button>
          {saved && <span className="text-xs text-emerald-400">Saved ✓</span>}
        </div>
      </div>

      {/* Enrollments */}
      <div className="mb-6 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5">
        <h2 className="mb-4 text-sm font-bold text-[var(--color-cream)]">Cadence enrollments</h2>
        {enrollments.length === 0 ? (
          <p className="text-xs text-[var(--color-ink-500)]">Not enrolled in any cadence.</p>
        ) : (
          <div className="space-y-2">
            {enrollments.map((e) => {
              const c = cadenceById(e.cadence_id);
              return (
                <div
                  key={e.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--color-ink-800)] bg-[var(--color-ink-900)] px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--color-cream)]">
                      {c?.name ?? "Cadence"}
                    </p>
                    <p className="text-[11px] text-[var(--color-ink-500)]">
                      Step {e.current_step} · {e.status}
                      {e.next_send_at && e.status === "active" && (
                        <> · next {new Date(e.next_send_at).toLocaleDateString()}</>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {e.status === "active" && (
                      <button
                        onClick={() => changeEnrollmentStatus(e.id, "paused")}
                        className="flex items-center gap-1 rounded-md border border-[var(--color-ink-700)] px-2 py-1 text-[11px] text-[var(--color-ink-400)] hover:text-[var(--color-cream)]"
                      >
                        <PauseCircle size={11} />
                        Pause
                      </button>
                    )}
                    {e.status === "paused" && (
                      <button
                        onClick={() => changeEnrollmentStatus(e.id, "active")}
                        className="flex items-center gap-1 rounded-md border border-[var(--color-gold)]/40 px-2 py-1 text-[11px] text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10"
                      >
                        <PlayCircle size={11} />
                        Resume
                      </button>
                    )}
                    {e.status !== "cancelled" && (
                      <button
                        onClick={() => changeEnrollmentStatus(e.id, "cancelled")}
                        className="flex items-center gap-1 rounded-md border border-red-900/50 px-2 py-1 text-[11px] text-red-400 hover:bg-red-900/30"
                      >
                        <XCircle size={11} />
                        Opt out
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Email history */}
      <div className="rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5">
        <h2 className="mb-4 text-sm font-bold text-[var(--color-cream)]">Email history</h2>
        {sends.length === 0 ? (
          <p className="text-xs text-[var(--color-ink-500)]">No emails sent yet.</p>
        ) : (
          <div className="space-y-1.5">
            {sends.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-lg border border-[var(--color-ink-800)] px-3 py-2 text-xs"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[var(--color-cream)]">{s.subject ?? "(no subject)"}</p>
                  <p className="text-[10px] text-[var(--color-ink-500)]">
                    {new Date(s.sent_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      s.status === "sent"
                        ? "bg-emerald-900/40 text-emerald-300"
                        : "bg-red-900/40 text-red-300"
                    }`}
                  >
                    {s.status}
                  </span>
                  {s.opened_at && (
                    <span className="rounded-full bg-blue-900/40 px-2 py-0.5 text-[10px] text-blue-300">
                      opened
                    </span>
                  )}
                  {s.replied_at && (
                    <span className="rounded-full bg-[var(--color-gold)]/20 px-2 py-0.5 text-[10px] text-[var(--color-gold)]">
                      replied
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
