"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Globe, Star, Mail, ExternalLink, User, Plus, Trash2 } from "lucide-react";
import type { Lead } from "@/lib/database.types";
import { categoryLabel } from "@/lib/business-categories";
import EnrollLeadModal from "@/components/EnrollLeadModal";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-[var(--color-ink-700)] text-[var(--color-cream)]",
  enriched: "bg-blue-900/40 text-blue-300",
  enrolled: "bg-[var(--color-gold)]/20 text-[var(--color-gold)]",
  replied: "bg-emerald-900/40 text-emerald-300",
  booked: "bg-emerald-900/60 text-emerald-200",
  disqualified: "bg-red-900/40 text-red-300",
};

export default function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [enrollTarget, setEnrollTarget] = useState<Lead | null>(null);

  async function patchLead(id: string, patch: Partial<Lead>) {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
      return true;
    }
    return false;
  }

  async function deleteLead(lead: Lead) {
    const ok = window.confirm(
      `Permanently delete ${lead.business_name}? This also deletes all enrollments and email history for this lead. Cannot be undone.`
    );
    if (!ok) return;
    const res = await fetch(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
    }
  }

  function handleEnrolled() {
    if (enrollTarget) {
      setLeads((prev) =>
        prev.map((l) => (l.id === enrollTarget.id ? { ...l, status: "enrolled" } : l))
      );
    }
    setEnrollTarget(null);
  }

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Lighthouse
          </p>
          <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">Leads</h1>
          <p className="mt-1 text-sm text-[var(--color-cream)]/80">
            Click any cell to edit. Saves automatically when you tab away.
          </p>
        </div>
        <p className="text-sm font-medium text-[var(--color-cream)]">{leads.length} total</p>
      </div>

      {/* Status summary */}
      {Object.keys(counts).length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {Object.entries(counts).map(([status, count]) => (
            <span
              key={status}
              className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                STATUS_COLORS[status] ?? "bg-[var(--color-ink-700)] text-[var(--color-cream)]"
              }`}
            >
              {status} · {count}
            </span>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-ink-700)] bg-[var(--color-ink-900)] text-[10px] font-bold uppercase tracking-wider text-[var(--color-cream)]">
              {[
                "Business",
                "Location",
                "Rating",
                "Contact name",
                "Email",
                "Phone",
                "Website",
                "Status",
                "Added",
              ].map((h) => (
                <th key={h} className="px-3 py-3 text-left">
                  {h}
                </th>
              ))}
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-ink-800)]">
            {leads.map((lead) => (
              <tr key={lead.id} className="transition-colors hover:bg-[var(--color-ink-900)]">
                <td className="px-3 py-3">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="flex items-center gap-1 font-medium text-[var(--color-cream)] hover:text-[var(--color-gold)]"
                  >
                    <span className="max-w-[160px] truncate">{lead.business_name}</span>
                    <ExternalLink size={10} className="shrink-0 opacity-60" />
                  </Link>
                  {lead.category && (
                    <div className="text-[11px] text-[var(--color-cream)]/65">
                      {categoryLabel(lead.category)}
                    </div>
                  )}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-xs text-[var(--color-cream)]">
                  {[lead.city, lead.state].filter(Boolean).join(", ") || (
                    <span className="text-[var(--color-cream)]/40">—</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  {lead.rating != null ? (
                    <span className="flex items-center gap-1 whitespace-nowrap text-xs text-[var(--color-cream)]">
                      <Star
                        size={11}
                        className="fill-[var(--color-gold)] text-[var(--color-gold)]"
                      />
                      {lead.rating.toFixed(1)}
                      <span className="text-[var(--color-cream)]/60">
                        ({lead.review_count?.toLocaleString() ?? 0})
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs text-[var(--color-cream)]/40">—</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <EditableCell
                    initial={lead.contact_name ?? ""}
                    placeholder="First Last"
                    icon={User}
                    onSave={(v) => patchLead(lead.id, { contact_name: v || null })}
                  />
                </td>
                <td className="px-3 py-3">
                  <EditableCell
                    initial={lead.email ?? ""}
                    type="email"
                    placeholder="email@business.com"
                    icon={Mail}
                    iconColor="text-[var(--color-gold)]"
                    onSave={(v) => patchLead(lead.id, { email: v || null })}
                  />
                </td>
                <td className="px-3 py-3">
                  <EditableCell
                    initial={lead.phone ?? ""}
                    type="tel"
                    placeholder="+1 555…"
                    icon={Phone}
                    onSave={(v) => patchLead(lead.id, { phone: v || null })}
                  />
                </td>
                <td className="px-3 py-3">
                  <EditableCell
                    initial={lead.website ?? ""}
                    type="url"
                    placeholder="https://…"
                    icon={Globe}
                    minWidth="180px"
                    onSave={(v) => patchLead(lead.id, { website: v || null })}
                  />
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${
                      STATUS_COLORS[lead.status] ?? "bg-[var(--color-ink-700)] text-[var(--color-cream)]"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-xs text-[var(--color-cream)]">
                  {new Date(lead.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-3 py-3 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      onClick={() => setEnrollTarget(lead)}
                      disabled={!lead.email && !lead.phone}
                      title={
                        !lead.email && !lead.phone
                          ? "Add email or phone first"
                          : "Enroll in cadence"
                      }
                      className="flex items-center gap-1 rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)]/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={11} />
                      Enroll
                    </button>
                    <button
                      onClick={() => deleteLead(lead)}
                      title="Permanently delete this lead"
                      className="rounded-md p-1.5 text-[var(--color-cream)]/60 transition-colors hover:bg-red-900/30 hover:text-red-400"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-10 text-center text-sm text-[var(--color-cream)]/70"
                >
                  No leads yet — use Find Leads to discover and save businesses.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {enrollTarget && (
        <EnrollLeadModal
          lead={enrollTarget}
          onClose={() => setEnrollTarget(null)}
          onEnrolled={handleEnrolled}
        />
      )}
    </div>
  );
}

function EditableCell({
  initial,
  type = "text",
  placeholder,
  icon: Icon,
  iconColor,
  minWidth,
  onSave,
}: {
  initial: string;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  iconColor?: string;
  minWidth?: string;
  onSave: (value: string) => Promise<boolean>;
}) {
  const [value, setValue] = useState(initial);
  const [savedFlash, setSavedFlash] = useState(false);
  const [busy, setBusy] = useState(false);

  async function commit() {
    if (value.trim() === initial.trim()) return;
    setBusy(true);
    const ok = await onSave(value.trim());
    setBusy(false);
    if (ok) {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1200);
    }
  }

  return (
    <div className="flex items-center gap-1.5" style={minWidth ? { minWidth } : undefined}>
      {Icon && (
        <Icon
          size={11}
          className={`shrink-0 ${
            value
              ? iconColor ?? "text-[var(--color-cream)]/70"
              : "text-[var(--color-cream)]/30"
          }`}
        />
      )}
      <input
        type={type}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        onBlur={commit}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") (ev.target as HTMLInputElement).blur();
        }}
        placeholder={placeholder}
        disabled={busy}
        className={`w-full rounded-md border bg-transparent px-1.5 py-0.5 text-xs outline-none transition-colors ${
          savedFlash
            ? "border-emerald-700/60 text-[var(--color-cream)]"
            : value
              ? "border-transparent text-[var(--color-cream)] hover:border-[var(--color-ink-700)] focus:border-[var(--color-gold)] focus:bg-[var(--color-ink-900)]"
              : "border-transparent text-[var(--color-cream)]/40 hover:border-[var(--color-ink-700)] focus:border-[var(--color-gold)] focus:bg-[var(--color-ink-900)] focus:text-[var(--color-cream)]"
        }`}
      />
    </div>
  );
}
