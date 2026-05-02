"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Calendar,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  Loader2,
  X,
} from "lucide-react";
import type { Lead, Task } from "@/lib/database.types";
import { buildCalUrl, bookMeetingNotes } from "@/lib/cal";

type LeadLite = Pick<Lead, "id" | "business_name" | "email" | "phone" | "website">;

const TYPE_LABELS: Record<string, string> = {
  general: "General",
  call: "Call",
  email: "Email",
  meeting: "Meeting",
  follow_up_30: "Follow-up · 30 days",
  follow_up_60: "Follow-up · 60 days",
  research: "Research",
};

const TYPE_COLORS: Record<string, string> = {
  general: "bg-[var(--color-ink-700)] text-[var(--color-cream)]",
  call: "bg-blue-900/40 text-blue-300",
  email: "bg-emerald-900/40 text-emerald-300",
  meeting: "bg-[var(--color-gold)]/20 text-[var(--color-gold)]",
  follow_up_30: "bg-amber-900/40 text-amber-300",
  follow_up_60: "bg-orange-900/40 text-orange-300",
  research: "bg-purple-900/40 text-purple-300",
};

type FilterKey = "open" | "today" | "overdue" | "done" | "all";

export default function TasksClient({
  initialTasks,
  leadsLite,
}: {
  initialTasks: Task[];
  leadsLite: LeadLite[];
}) {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<FilterKey>("open");
  const [creating, setCreating] = useState(false);

  const leadById = useMemo(() => new Map(leadsLite.map((l) => [l.id, l])), [leadsLite]);

  const now = new Date();
  const todayEnd = new Date(now);
  todayEnd.setHours(23, 59, 59, 999);

  const counts = useMemo(() => {
    const c = { open: 0, today: 0, overdue: 0, done: 0, all: tasks.length };
    for (const t of tasks) {
      if (t.status === "open") {
        c.open++;
        if (t.due_at) {
          const d = new Date(t.due_at);
          if (d < now) c.overdue++;
          else if (d <= todayEnd) c.today++;
        }
      } else if (t.status === "done") {
        c.done++;
      }
    }
    return c;
  }, [tasks, now, todayEnd]);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === "all") return true;
      if (filter === "done") return t.status === "done";
      if (filter === "open") return t.status === "open";
      if (t.status !== "open" || !t.due_at) return false;
      const d = new Date(t.due_at);
      if (filter === "overdue") return d < now;
      if (filter === "today") return d >= now && d <= todayEnd;
      return false;
    });
  }, [tasks, filter, now, todayEnd]);

  async function toggleDone(t: Task) {
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

  async function deleteTask(t: Task) {
    if (!confirm(`Delete task: "${t.title}"?`)) return;
    const res = await fetch(`/api/admin/tasks/${t.id}`, { method: "DELETE" });
    if (res.ok) setTasks((prev) => prev.filter((x) => x.id !== t.id));
  }

  async function createTask(payload: {
    title: string;
    description?: string;
    type: string;
    days_from_now?: number;
    lead_id?: string | null;
  }) {
    const res = await fetch("/api/admin/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      setTasks((prev) => [data.task, ...prev]);
      setCreating(false);
    }
  }

  const filterTabs: { key: FilterKey; label: string }[] = [
    { key: "open", label: "Open" },
    { key: "today", label: "Due today" },
    { key: "overdue", label: "Overdue" },
    { key: "done", label: "Done" },
    { key: "all", label: "All" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Lighthouse
          </p>
          <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-[var(--color-cream)]/80">
            Next steps for your leads — call follow-ups, post-30 / post-60 reminders, and anything else
            you need to track.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-4 py-2.5 text-sm font-bold text-[var(--color-cream)] hover:opacity-90"
        >
          <Plus size={14} />
          New Task
        </button>
      </div>

      {/* Filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {filterTabs.map((t) => {
          const active = filter === t.key;
          const count = counts[t.key];
          return (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                active
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                  : "border-[var(--color-ink-700)] bg-[var(--color-ink-900)] text-[var(--color-cream)] hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-ink-800)]"
              }`}
            >
              {t.label} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {creating && (
        <NewTaskForm
          leads={leadsLite}
          onCancel={() => setCreating(false)}
          onCreate={createTask}
        />
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-ink-700)] px-6 py-12 text-center text-sm text-[var(--color-cream)]/70">
          Nothing to show in this view.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              lead={task.lead_id ? leadById.get(task.lead_id) : undefined}
              onToggle={() => toggleDone(task)}
              onDelete={() => deleteTask(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TaskRow({
  task,
  lead,
  onToggle,
  onDelete,
}: {
  task: Task;
  lead?: LeadLite;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const isDone = task.status === "done";
  const due = task.due_at ? new Date(task.due_at) : null;
  const overdue = due && !isDone && due < new Date();
  const calUrl = buildCalUrl({
    name: lead?.business_name,
    email: lead?.email,
    notes: bookMeetingNotes(lead?.business_name),
  });
  const isFollowUp = task.type === "follow_up_30" || task.type === "follow_up_60";

  return (
    <div
      className={`flex flex-wrap items-start gap-3 rounded-lg border p-3 transition-colors ${
        isDone
          ? "border-[var(--color-ink-800)] bg-[var(--color-ink)]/40 opacity-60"
          : overdue
            ? "border-red-900/50 bg-red-900/10"
            : "border-[var(--color-ink-700)] bg-[var(--color-ink)]"
      }`}
    >
      <button
        onClick={onToggle}
        className="mt-0.5 shrink-0 text-[var(--color-cream)]/70 transition-colors hover:text-[var(--color-gold)]"
        title={isDone ? "Mark as open" : "Mark as done"}
      >
        {isDone ? (
          <CheckCircle2 size={18} className="text-emerald-400" />
        ) : (
          <Circle size={18} />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-sm font-semibold text-[var(--color-cream)] ${
              isDone ? "line-through" : ""
            }`}
          >
            {task.title}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              TYPE_COLORS[task.type] ?? "bg-[var(--color-ink-800)] text-[var(--color-cream)]"
            }`}
          >
            {TYPE_LABELS[task.type] ?? task.type}
          </span>
          {due && (
            <span
              className={`flex items-center gap-1 text-[11px] ${
                overdue ? "text-red-400" : "text-[var(--color-cream)]/70"
              }`}
            >
              <Calendar size={10} />
              {due.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: due.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
              })}
              {overdue && " · overdue"}
            </span>
          )}
        </div>

        {task.description && (
          <p className="mt-1 text-xs text-[var(--color-cream)]/75">{task.description}</p>
        )}

        {lead && (
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-[var(--color-cream)]/70">
            <Link
              href={`/admin/leads/${lead.id}`}
              className="flex items-center gap-1 font-medium text-[var(--color-cream)] hover:text-[var(--color-gold)]"
            >
              {lead.business_name}
              <ExternalLink size={9} />
            </Link>
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center gap-1 hover:text-[var(--color-gold)]"
              >
                <Phone size={10} />
                {lead.phone}
              </a>
            )}
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-1 hover:text-[var(--color-gold)]"
              >
                <Mail size={10} />
                {lead.email}
              </a>
            )}
            {lead.website && (
              <a
                href={lead.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[var(--color-gold)]"
              >
                <Globe size={10} />
                site
              </a>
            )}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {isFollowUp && lead && (
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20"
            title="Book meeting via Cal.com"
          >
            <Calendar size={11} />
            Book meeting
          </a>
        )}
        <button
          onClick={onDelete}
          title="Delete task"
          className="rounded-md p-1.5 text-[var(--color-cream)]/60 transition-colors hover:bg-red-900/30 hover:text-red-400"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

function NewTaskForm({
  leads,
  onCreate,
  onCancel,
}: {
  leads: LeadLite[];
  onCreate: (p: {
    title: string;
    description?: string;
    type: string;
    days_from_now?: number;
    lead_id?: string | null;
  }) => Promise<void>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("general");
  const [daysFromNow, setDaysFromNow] = useState<string>("");
  const [leadId, setLeadId] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    await onCreate({
      title,
      description: description || undefined,
      type,
      days_from_now: daysFromNow ? parseInt(daysFromNow, 10) : undefined,
      lead_id: leadId || null,
    });
    setBusy(false);
  }

  return (
    <form
      onSubmit={submit}
      className="mb-4 rounded-xl border border-[var(--color-gold)]/40 bg-[var(--color-ink)] p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--color-cream)]">New task</h2>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md p-1 text-[var(--color-cream)]/60 hover:text-[var(--color-cream)]"
        >
          <X size={14} />
        </button>
      </div>

      <div className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="What needs to happen? (e.g. Call John about the demo follow-up)"
          className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-cream)]/40 outline-none focus:border-[var(--color-gold)]"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Notes (optional)"
          rows={2}
          className="w-full resize-none rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-cream)]/40 outline-none focus:border-[var(--color-gold)]"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[var(--color-cream)]/70">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
            >
              {Object.entries(TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[var(--color-cream)]/70">
              Due in (days)
            </label>
            <input
              type="number"
              value={daysFromNow}
              onChange={(e) => setDaysFromNow(e.target.value)}
              placeholder="0 = today"
              min={0}
              max={365}
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-cream)]/40 outline-none focus:border-[var(--color-gold)]"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[var(--color-cream)]/70">
              Linked lead (optional)
            </label>
            <select
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
            >
              <option value="">None</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.business_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[var(--color-ink-700)] px-3 py-1.5 text-xs font-medium text-[var(--color-cream)] hover:border-[var(--color-gold)]/40"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy || !title.trim()}
            className="flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-4 py-1.5 text-xs font-bold text-[var(--color-cream)] hover:opacity-90 disabled:opacity-40"
          >
            {busy && <Loader2 size={11} className="animate-spin" />}
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
