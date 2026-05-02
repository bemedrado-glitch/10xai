"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { Cadence, Lead, Persona } from "@/lib/database.types";

export default function EnrollLeadModal({
  lead,
  onClose,
  onEnrolled,
}: {
  lead: Lead;
  onClose: () => void;
  onEnrolled: () => void;
}) {
  const [cadences, setCadences] = useState<Cadence[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedCadence, setSelectedCadence] = useState("");
  const [selectedPersona, setSelectedPersona] = useState(lead.persona_id ?? "");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [c, p] = await Promise.all([
        fetch("/api/admin/cadences").then((r) => r.json()),
        fetch("/api/admin/personas").then((r) => r.json()),
      ]);
      setCadences(c.cadences ?? []);
      setPersonas(p.personas ?? []);
      setFetching(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!selectedPersona) return cadences;
    const matching = cadences.filter((c) => c.persona_id === selectedPersona);
    return matching.length > 0 ? matching : cadences;
  }, [cadences, selectedPersona]);

  useEffect(() => {
    if (filtered.length > 0 && !filtered.find((c) => c.id === selectedCadence)) {
      setSelectedCadence(filtered[0].id);
    }
  }, [filtered, selectedCadence]);

  async function handleEnroll() {
    if (!selectedCadence) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cadenceId: selectedCadence,
          personaId: selectedPersona || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Enrollment failed");
      onEnrolled();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-[var(--color-cream)]">
              Enroll in cadence
            </h2>
            <p className="mt-0.5 text-sm text-[var(--color-cream)]/70">{lead.business_name}</p>
            <p className="text-[11px] text-[var(--color-cream)]/50">
              {lead.email ?? lead.phone ?? "no contact yet"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[var(--color-cream)]/60 hover:text-[var(--color-cream)]"
          >
            <X size={16} />
          </button>
        </div>

        {fetching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-[var(--color-gold)]" />
          </div>
        ) : !lead.email && !lead.phone ? (
          <div className="rounded-lg bg-amber-900/30 px-3 py-3 text-xs text-amber-200">
            This lead has neither email nor phone. Add at least one before enrolling.
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--color-cream)]/80">
                Persona (ICP)
              </label>
              <select
                value={selectedPersona}
                onChange={(e) => setSelectedPersona(e.target.value)}
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

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--color-cream)]/80">
                Cadence *
              </label>
              <select
                value={selectedCadence}
                onChange={(e) => setSelectedCadence(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
              >
                <option value="">Select cadence…</option>
                {filtered.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {cadences.length === 0 && (
                <p className="mt-1 text-xs text-amber-400">
                  No cadences yet — create one in the Cadences tab.
                </p>
              )}
            </div>

            {error && (
              <p className="rounded-lg bg-red-900/30 px-3 py-2 text-xs text-red-300">{error}</p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-[var(--color-ink-700)] py-2.5 text-sm font-medium text-[var(--color-cream)] hover:border-[var(--color-gold)]/40"
              >
                Cancel
              </button>
              <button
                onClick={handleEnroll}
                disabled={loading || !selectedCadence}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] py-2.5 text-sm font-bold text-[var(--color-cream)] hover:opacity-90 disabled:opacity-40"
              >
                {loading && <Loader2 size={13} className="animate-spin" />}
                {loading ? "Enrolling…" : "Enroll"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
