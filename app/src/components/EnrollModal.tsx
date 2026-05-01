"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { PlacesResult } from "@/app/admin/(protected)/find-leads/page";
import type { Cadence, Persona } from "@/lib/database.types";

export default function EnrollModal({
  place,
  onClose,
  onEnrolled,
}: {
  place: PlacesResult;
  onClose: () => void;
  onEnrolled: () => void;
}) {
  const [cadences, setCadences] = useState<Cadence[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedCadence, setSelectedCadence] = useState("");
  const [selectedPersona, setSelectedPersona] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [cRes, pRes] = await Promise.all([
        fetch("/api/admin/cadences"),
        fetch("/api/admin/personas"),
      ]);
      const [cData, pData] = await Promise.all([cRes.json(), pRes.json()]);
      setCadences(cData.cadences ?? []);
      setPersonas(pData.personas ?? []);
      if (cData.cadences?.length) setSelectedCadence(cData.cadences[0].id);
      if (pData.personas?.length) setSelectedPersona(pData.personas[0].id);
      setFetching(false);
    }
    load();
  }, []);

  async function handleEnroll() {
    if (!selectedCadence) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          place,
          cadenceId: selectedCadence,
          personaId: selectedPersona || null,
          email: email || null,
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
              Enroll Lead
            </h2>
            <p className="mt-0.5 text-sm text-[var(--color-ink-400)]">
              {place.business_name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[var(--color-ink-500)] hover:text-[var(--color-cream)]"
          >
            <X size={16} />
          </button>
        </div>

        {fetching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-[var(--color-gold)]" />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
                Contact Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@business.com (optional)"
                className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
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
              <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
                Cadence *
              </label>
              <select
                value={selectedCadence}
                onChange={(e) => setSelectedCadence(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
              >
                <option value="">Select cadence…</option>
                {cadences.map((c) => (
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
              <p className="rounded-lg bg-red-900/30 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-[var(--color-ink-700)] py-2.5 text-sm font-medium text-[var(--color-ink-400)] transition-colors hover:text-[var(--color-cream)]"
              >
                Cancel
              </button>
              <button
                onClick={handleEnroll}
                disabled={loading || !selectedCadence}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-gold)] py-2.5 text-sm font-bold text-[var(--color-cream)] transition-opacity hover:opacity-90 disabled:opacity-40"
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
