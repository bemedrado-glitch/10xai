"use client";

import { useState } from "react";
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
} from "lucide-react";
import type { Lead, Persona, Cadence } from "@/lib/database.types";
import { categoryLabel } from "@/lib/business-categories";

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

      {/* Contact enrichment */}
      <div className="mb-6 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5">
        <h2 className="mb-4 text-sm font-bold text-[var(--color-cream)]">Contact</h2>
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
