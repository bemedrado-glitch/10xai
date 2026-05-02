"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Phone,
  Globe,
  Star,
  Mail,
  ExternalLink,
  User,
  Plus,
  Trash2,
  ArrowUpDown,
} from "lucide-react";
import type { Lead } from "@/lib/database.types";
import { categoryLabel } from "@/lib/business-categories";
import EnrollLeadModal from "@/components/EnrollLeadModal";

type SortKey = "best" | "rating" | "reviews" | "recent" | "added";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "best", label: "Best (rating × reviews)" },
  { key: "rating", label: "Highest rating" },
  { key: "reviews", label: "Most reviews" },
  { key: "recent", label: "Recently added" },
];

function bestScore(l: Lead): number {
  const rating = l.rating ?? 0;
  const reviews = l.review_count ?? 0;
  return rating * Math.log(reviews + 1);
}

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
  const [sort, setSort] = useState<SortKey>("best");
  const [minRating, setMinRating] = useState<string>("0");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const visibleLeads = useMemo(() => {
    const minR = parseFloat(minRating);
    const arr = leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (minR > 0 && (l.rating ?? 0) < minR) return false;
      return true;
    });
    arr.sort((a, b) => {
      switch (sort) {
        case "best":
          return bestScore(b) - bestScore(a);
        case "rating": {
          const dr = (b.rating ?? 0) - (a.rating ?? 0);
          if (dr !== 0) return dr;
          return (b.review_count ?? 0) - (a.review_count ?? 0);
        }
        case "reviews":
          return (b.review_count ?? 0) - (a.review_count ?? 0);
        case "recent":
        case "added":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    return arr;
  }, [leads, sort, minRating, statusFilter]);

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
    <div className="mx-auto w-full px-6 py-8 2xl:max-w-[1700px]">
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

      {/* Status summary — clickable filter chips */}
      {Object.keys(counts).length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
              statusFilter === "all"
                ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                : "border-[var(--color-ink-700)] bg-[var(--color-ink-900)] text-[var(--color-cream)] hover:border-[var(--color-gold)]/50"
            }`}
          >
            All · {leads.length}
          </button>
          {Object.entries(counts).map(([status, count]) => {
            const active = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(active ? "all" : status)}
                className={`rounded-full border px-3 py-1 text-xs font-bold capitalize transition-colors ${
                  active
                    ? STATUS_COLORS[status]?.replace("bg-", "border-").replace("text-", "border-") +
                      " " +
                      STATUS_COLORS[status]
                    : `border-[var(--color-ink-700)] ${
                        STATUS_COLORS[status] ?? "bg-[var(--color-ink-900)] text-[var(--color-cream)]"
                      } hover:border-[var(--color-gold)]/50`
                }`}
              >
                {status} · {count}
              </button>
            );
          })}
        </div>
      )}

      {/* Sort + rating filter row */}
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)]/50 p-3">
        <div className="flex items-center gap-2">
          <ArrowUpDown size={12} className="text-[var(--color-cream)]/60" />
          <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-cream)]/70">
            Sort
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-2 py-1.5 text-xs font-medium text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Star size={12} className="text-[var(--color-gold)]" />
          <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-cream)]/70">
            Min rating
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="rounded-md border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-2 py-1.5 text-xs font-medium text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
          >
            <option value="0">Any</option>
            <option value="3.5">3.5+</option>
            <option value="4.0">4.0+</option>
            <option value="4.5">4.5+</option>
            <option value="4.8">4.8+</option>
            <option value="5.0">5.0</option>
          </select>
        </div>
        <span className="ml-auto text-[11px] text-[var(--color-cream)]/60">
          Showing {visibleLeads.length} of {leads.length}
        </span>
      </div>

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
            {visibleLeads.map((lead) => (
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
                <td className="px-3 py-3 min-w-[230px]">
                  <EditableCell
                    initial={lead.email ?? ""}
                    type="email"
                    placeholder="email@business.com"
                    icon={Mail}
                    iconColor="text-[var(--color-gold)]"
                    minWidth="220px"
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
            {visibleLeads.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-10 text-center text-sm text-[var(--color-cream)]/70"
                >
                  {leads.length === 0
                    ? "No leads yet — use Find Leads to discover and save businesses."
                    : "No leads match the current filters — try lowering the rating threshold or clicking 'All'."}
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
