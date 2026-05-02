"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PauseCircle, PlayCircle, XCircle, ExternalLink, Globe } from "lucide-react";
import type { Cadence, CadenceStep, Lead } from "@/lib/database.types";

type Enrollment = {
  id: string;
  lead_id: string;
  cadence_id: string;
  current_step: number;
  status: string;
  next_send_at: string | null;
  created_at: string;
};

type Filter = "all" | "active" | "paused" | "completed" | "cancelled";

export default function EnrollmentsClient({
  initialEnrollments,
  leads: initialLeads,
  cadences,
  steps,
}: {
  initialEnrollments: Enrollment[];
  leads: Lead[];
  cadences: Cadence[];
  steps: CadenceStep[];
}) {
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState<Filter>("all");

  const leadById = useMemo(() => new Map(leads.map((l) => [l.id, l])), [leads]);
  const cadenceById = useMemo(() => new Map(cadences.map((c) => [c.id, c])), [cadences]);
  const stepsByCadence = useMemo(() => {
    const map = new Map<string, CadenceStep[]>();
    for (const s of steps) {
      const list = map.get(s.cadence_id) ?? [];
      list.push(s);
      map.set(s.cadence_id, list);
    }
    map.forEach((v) => v.sort((a, b) => a.step_number - b.step_number));
    return map;
  }, [steps]);

  const filtered = useMemo(() => {
    if (filter === "all") return enrollments;
    return enrollments.filter((e) => e.status === filter);
  }, [enrollments, filter]);

  const counts = useMemo(() => {
    const c = { all: enrollments.length, active: 0, paused: 0, completed: 0, cancelled: 0 };
    for (const e of enrollments) {
      if (e.status in c) (c as Record<string, number>)[e.status]++;
    }
    return c;
  }, [enrollments]);

  async function changeStatus(id: string, status: "active" | "paused" | "cancelled") {
    const res = await fetch(`/api/admin/enrollments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setEnrollments((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    }
  }

  async function saveContactName(leadId: string, contactName: string) {
    await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact_name: contactName || null }),
    });
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, contact_name: contactName || null } : l))
    );
  }

  const filterTabs: { key: Filter; label: string }[] = [
    { key: "active", label: "Active" },
    { key: "paused", label: "Paused" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Opted out" },
    { key: "all", label: "All" },
  ];

  return (
    <div className="mx-auto w-full px-6 py-8 2xl:max-w-[1700px]">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Lighthouse
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
          Enrollments
        </h1>
        <p className="mt-1 text-sm text-[var(--color-cream)]/80">
          Everyone currently in a cadence — see exactly which step, and pause or opt them out.
        </p>
      </div>

      {/* Filters */}
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

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--color-ink-700)] px-6 py-12 text-center text-sm text-[var(--color-cream)]/70">
          Nothing to show in this view.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)]">
          <table className="min-w-full divide-y divide-[var(--color-ink-800)] text-sm">
            <thead className="bg-[var(--color-ink-900)]">
              <tr className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-cream)]">
                <th className="px-4 py-3.5 text-left">Business</th>
                <th className="px-4 py-3.5 text-left">Contact name</th>
                <th className="px-4 py-3.5 text-left">Email</th>
                <th className="px-4 py-3.5 text-left">Phone</th>
                <th className="px-4 py-3.5 text-left">Website</th>
                <th className="px-4 py-3.5 text-left">Cadence</th>
                <th className="px-4 py-3.5 text-left">Progress</th>
                <th className="px-4 py-3.5 text-left">Next send</th>
                <th className="px-4 py-3.5 text-left">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-ink-800)]">
              {filtered.map((e) => {
                const lead = leadById.get(e.lead_id);
                const cadence = cadenceById.get(e.cadence_id);
                const cadenceSteps = stepsByCadence.get(e.cadence_id) ?? [];
                const totalSteps = cadenceSteps.length;
                const progressPct =
                  totalSteps > 0 ? Math.min(100, Math.round((e.current_step / totalSteps) * 100)) : 0;

                return (
                  <tr
                    key={e.id}
                    className="text-[var(--color-cream)] transition-colors hover:bg-[var(--color-ink-900)]/60"
                  >
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/leads/${e.lead_id}`}
                        className="flex items-center gap-1.5 font-medium hover:text-[var(--color-gold)]"
                      >
                        <span className="max-w-[180px] truncate">{lead?.business_name ?? "—"}</span>
                        <ExternalLink size={10} className="shrink-0" />
                      </Link>
                    </td>
                    <td className="px-4 py-3.5">
                      <ContactNameInput
                        initial={lead?.contact_name ?? ""}
                        onSave={(v) => lead && saveContactName(lead.id, v)}
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      {lead?.email ? (
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-xs text-[var(--color-cream)] hover:text-[var(--color-gold)]"
                        >
                          {lead.email}
                        </a>
                      ) : (
                        <span className="text-xs text-[var(--color-cream)]/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      {lead?.phone ? (
                        <a
                          href={`tel:${lead.phone}`}
                          className="whitespace-nowrap text-xs text-[var(--color-cream)] hover:text-[var(--color-gold)]"
                        >
                          {lead.phone}
                        </a>
                      ) : (
                        <span className="text-xs text-[var(--color-cream)]/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      {lead?.website ? (
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex max-w-[160px] items-center gap-1 truncate text-xs text-[var(--color-cream)] hover:text-[var(--color-gold)]"
                        >
                          <Globe size={10} className="shrink-0" />
                          {lead.website.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        <span className="text-xs text-[var(--color-cream)]/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs">{cadence?.name ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs tabular-nums text-[var(--color-cream)]/70">
                          {e.current_step}/{totalSteps || "?"}
                        </span>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--color-ink-800)]">
                          <div
                            className="h-full bg-[var(--color-gold)] transition-all"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-[var(--color-cream)]/85">
                      {e.status === "active" && e.next_send_at
                        ? new Date(e.next_send_at).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={e.status} />
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="inline-flex gap-1">
                        {e.status === "active" && (
                          <button
                            onClick={() => changeStatus(e.id, "paused")}
                            title="Pause"
                            className="rounded-md p-1.5 text-[var(--color-cream)]/70 hover:bg-[var(--color-ink-800)] hover:text-[var(--color-cream)]"
                          >
                            <PauseCircle size={14} />
                          </button>
                        )}
                        {e.status === "paused" && (
                          <button
                            onClick={() => changeStatus(e.id, "active")}
                            title="Resume"
                            className="rounded-md p-1.5 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10"
                          >
                            <PlayCircle size={14} />
                          </button>
                        )}
                        {e.status !== "cancelled" && e.status !== "completed" && (
                          <button
                            onClick={() => changeStatus(e.id, "cancelled")}
                            title="Opt out"
                            className="rounded-md p-1.5 text-[var(--color-cream)]/70 hover:bg-red-900/30 hover:text-red-400"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ContactNameInput({
  initial,
  onSave,
}: {
  initial: string;
  onSave: (value: string) => void | Promise<void>;
}) {
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  async function commit() {
    if (value === initial) return;
    setSaving(true);
    await onSave(value.trim());
    setSaving(false);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1200);
  }

  return (
    <input
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
      onBlur={commit}
      onKeyDown={(ev) => {
        if (ev.key === "Enter") (ev.target as HTMLInputElement).blur();
      }}
      placeholder="First Last"
      disabled={saving}
      className={`w-full rounded-md border bg-[var(--color-ink-900)] px-2 py-1 text-xs text-[var(--color-cream)] placeholder-[var(--color-cream)]/30 outline-none transition-colors ${
        savedFlash
          ? "border-emerald-700/60"
          : "border-[var(--color-ink-700)] focus:border-[var(--color-gold)]"
      }`}
    />
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-900/40 text-emerald-300",
    paused: "bg-amber-900/40 text-amber-300",
    completed: "bg-blue-900/40 text-blue-300",
    cancelled: "bg-red-900/40 text-red-300",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
        styles[status] ?? "bg-[var(--color-ink-800)] text-[var(--color-ink-400)]"
      }`}
    >
      {status === "cancelled" ? "Opted out" : status}
    </span>
  );
}
