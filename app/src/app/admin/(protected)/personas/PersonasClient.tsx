"use client";

import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import type { Persona } from "@/lib/database.types";

export default function PersonasClient({
  initialPersonas,
}: {
  initialPersonas: Persona[];
}) {
  const [personas, setPersonas] = useState(initialPersonas);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [minRating, setMinRating] = useState("4.5");
  const [minReviews, setMinReviews] = useState("20");
  const [noWebsite, setNoWebsite] = useState(true);
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/personas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        filters: {
          rating_min: parseFloat(minRating),
          min_reviews: parseInt(minReviews),
          no_website: noWebsite,
        },
      }),
    });
    const data = await res.json();
    if (data.persona) {
      setPersonas([data.persona, ...personas]);
      setCreating(false);
      setName("");
      setDescription("");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/personas?id=${id}`, { method: "DELETE" });
    setPersonas(personas.filter((p) => p.id !== id));
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Lighthouse
          </p>
          <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
            Personas
          </h1>
          <p className="mt-1 text-sm text-[var(--color-ink-400)]">
            Define ICP filters to segment your leads.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-4 py-2.5 text-sm font-bold text-[var(--color-cream)] hover:opacity-90"
        >
          <Plus size={14} />
          New Persona
        </button>
      </div>

      {creating && (
        <form
          onSubmit={handleCreate}
          className="mb-6 rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-ink)] p-5"
        >
          <h2 className="mb-4 text-sm font-bold text-[var(--color-cream)]">
            New Persona
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Persona name"
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              rows={2}
              className="w-full resize-none rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-[var(--color-ink-400)]">
                  Min Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
                >
                  <option value="4.0">4.0+</option>
                  <option value="4.5">4.5+</option>
                  <option value="5.0">5.0</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-[var(--color-ink-400)]">
                  Min Reviews
                </label>
                <input
                  type="number"
                  value={minReviews}
                  onChange={(e) => setMinReviews(e.target.value)}
                  min="0"
                  className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
                />
              </div>
            </div>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={noWebsite}
                onChange={(e) => setNoWebsite(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-gold)]"
              />
              <span className="text-sm text-[var(--color-cream)]">
                No website filter
              </span>
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setCreating(false)}
              className="flex-1 rounded-lg border border-[var(--color-ink-700)] py-2 text-sm text-[var(--color-ink-400)] hover:text-[var(--color-cream)]"
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
        {personas.map((p) => {
          const filters = p.filters as Record<string, unknown>;
          return (
            <div
              key={p.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Users size={14} className="shrink-0 text-[var(--color-gold)]" />
                  <span className="font-medium text-[var(--color-cream)]">{p.name}</span>
                  {!p.active && (
                    <span className="text-xs text-[var(--color-ink-500)]">(inactive)</span>
                  )}
                </div>
                {p.description && (
                  <p className="mt-1 text-xs text-[var(--color-ink-500)]">{p.description}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {filters.rating_min != null && (
                    <span className="rounded-full bg-[var(--color-ink-800)] px-2 py-0.5 text-[10px] text-[var(--color-ink-400)]">
                      ★ {String(filters.rating_min as number)}+
                    </span>
                  )}
                  {filters.min_reviews != null && (
                    <span className="rounded-full bg-[var(--color-ink-800)] px-2 py-0.5 text-[10px] text-[var(--color-ink-400)]">
                      {String(filters.min_reviews as number)}+ reviews
                    </span>
                  )}
                  {(filters.no_website as boolean) && (
                    <span className="rounded-full bg-[var(--color-gold)]/10 px-2 py-0.5 text-[10px] text-[var(--color-gold)]">
                      No website
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(p.id)}
                className="shrink-0 rounded-lg p-2 text-[var(--color-ink-600)] transition-colors hover:bg-red-900/30 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
        {personas.length === 0 && !creating && (
          <div className="rounded-xl border border-dashed border-[var(--color-ink-700)] px-6 py-10 text-center text-sm text-[var(--color-ink-500)]">
            No personas yet. Create one to start segmenting leads.
          </div>
        )}
      </div>
    </div>
  );
}
