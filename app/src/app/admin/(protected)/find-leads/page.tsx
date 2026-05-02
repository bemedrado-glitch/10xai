"use client";

import { useEffect, useState } from "react";
import { Search, Globe, Phone, Star, MapPin, Plus, CheckCircle, Filter } from "lucide-react";
import EnrollModal from "@/components/EnrollModal";
import { COUNTRIES, US_STATES } from "@/lib/locations";
import { BUSINESS_CATEGORY_GROUPS, categoryLabel } from "@/lib/business-categories";
import type { Persona } from "@/lib/database.types";

export type PlacesResult = {
  place_id: string;
  business_name: string;
  address: string;
  city: string;
  state: string;
  phone: string | null;
  website: string | null;
  rating: number;
  review_count: number;
  category: string | null;
};

type PersonaFilters = {
  rating_min?: number;
  min_reviews?: number;
  no_website?: boolean;
  category?: string;
  country?: string;
};

export default function FindLeadsPage() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [activePersonaId, setActivePersonaId] = useState<string>("");

  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("US");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [noWebsite, setNoWebsite] = useState(false);
  const [minRating, setMinRating] = useState("4.5");
  const [minReviews, setMinReviews] = useState("0");

  const [results, setResults] = useState<PlacesResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const [enrollTarget, setEnrollTarget] = useState<PlacesResult | null>(null);
  const [enrolled, setEnrolled] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/admin/personas")
      .then((r) => r.json())
      .then((d) => setPersonas(d.personas ?? []))
      .catch(() => setPersonas([]));
  }, []);

  function applyPersona(p: Persona) {
    setActivePersonaId(p.id);
    const f = (p.filters ?? {}) as PersonaFilters;
    if (f.rating_min != null) setMinRating(String(f.rating_min));
    if (f.min_reviews != null) setMinReviews(String(f.min_reviews));
    if (typeof f.no_website === "boolean") setNoWebsite(f.no_website);
    if (f.category) setCategory(f.category);
    if (f.country) setCountry(f.country);
  }

  function clearPersona() {
    setActivePersonaId("");
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const params = new URLSearchParams({
        q: query,
        country,
        city,
        state,
        category,
        noWebsite: noWebsite ? "1" : "0",
        minRating,
        minReviews,
      });
      const res = await fetch(`/api/admin/places?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Search failed");
      setResults(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function handleEnrolled(placeId: string) {
    setEnrolled((prev) => new Set(prev).add(placeId));
    setEnrollTarget(null);
  }

  const showStateDropdown = country === "US";

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Lighthouse
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
          Find Leads
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-400)]">
          Search local businesses by region and category, then enroll them in a cadence.
        </p>
      </div>

      {/* Persona quick-apply */}
      {personas.length > 0 && (
        <div className="mb-5 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)]/40 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[var(--color-ink-400)]">
            <Filter size={12} />
            Apply persona filters
          </div>
          <div className="flex flex-wrap gap-2">
            {personas.map((p) => {
              const active = p.id === activePersonaId;
              return (
                <button
                  key={p.id}
                  onClick={() => applyPersona(p)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                      : "border-[var(--color-ink-700)] text-[var(--color-ink-400)] hover:text-[var(--color-cream)]"
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
            {activePersonaId && (
              <button
                onClick={clearPersona}
                className="rounded-full border border-[var(--color-ink-700)] px-3 py-1.5 text-xs text-[var(--color-ink-500)] hover:text-[var(--color-cream)]"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className="mb-8 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
              Search keywords (optional)
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. boutique hair salons with great reviews"
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
            <p className="mt-1 text-[11px] text-[var(--color-ink-600)]">
              Leave blank to search by category + city automatically.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                if (e.target.value !== "US") setState("");
              }}
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {showStateDropdown ? (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
              >
                <option value="">Any state</option>
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
                Region / State (optional)
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. São Paulo"
                className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
              City *
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Austin"
              required
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
              Business type
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
            >
              <option value="">Any type</option>
              {BUSINESS_CATEGORY_GROUPS.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.items.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
              Min rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
            >
              <option value="0">Any</option>
              <option value="3.5">3.5+</option>
              <option value="4.0">4.0+</option>
              <option value="4.5">4.5+</option>
              <option value="4.8">4.8+</option>
              <option value="5.0">5.0</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
              Min reviews
            </label>
            <select
              value={minReviews}
              onChange={(e) => setMinReviews(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
            >
              <option value="0">Any</option>
              <option value="10">10+</option>
              <option value="20">20+</option>
              <option value="50">50+</option>
              <option value="100">100+</option>
              <option value="250">250+</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2">
              <input
                type="checkbox"
                checked={noWebsite}
                onChange={(e) => setNoWebsite(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-gold)]"
              />
              <span className="text-sm text-[var(--color-cream)]">No website only</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !city}
          className="mt-4 flex items-center gap-2 rounded-lg bg-[var(--color-gold)] px-5 py-2.5 text-sm font-bold text-[var(--color-cream)] transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Search size={14} />
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && (
        <div className="mb-4 rounded-lg bg-red-900/30 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {searched && !loading && (
        <div>
          <p className="mb-4 text-xs text-[var(--color-ink-500)]">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </p>
          <div className="space-y-3">
            {results.map((r) => {
              const done = enrolled.has(r.place_id);
              return (
                <div
                  key={r.place_id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-[var(--color-cream)]">{r.business_name}</h3>
                      {r.category && (
                        <span className="rounded-full bg-[var(--color-ink-800)] px-2 py-0.5 text-[10px] text-[var(--color-ink-400)]">
                          {categoryLabel(r.category)}
                        </span>
                      )}
                      {!r.website && (
                        <span className="rounded-full bg-[var(--color-gold)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold)]">
                          No website
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-[var(--color-ink-500)]">
                      {r.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star size={11} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />
                          {r.rating.toFixed(1)} ({r.review_count?.toLocaleString()})
                        </span>
                      )}
                      {r.address && (
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {r.address}
                        </span>
                      )}
                      {r.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={11} />
                          {r.phone}
                        </span>
                      )}
                      {r.website && (
                        <span className="flex max-w-[180px] items-center gap-1 truncate">
                          <Globe size={11} />
                          {r.website.replace(/^https?:\/\//, "")}
                        </span>
                      )}
                    </div>
                  </div>
                  {done ? (
                    <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-emerald-400">
                      <CheckCircle size={14} />
                      Enrolled
                    </div>
                  ) : (
                    <button
                      onClick={() => setEnrollTarget(r)}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-3 py-1.5 text-xs font-medium text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)]/20"
                    >
                      <Plus size={13} />
                      Enroll
                    </button>
                  )}
                </div>
              );
            })}
            {results.length === 0 && (
              <div className="rounded-xl border border-dashed border-[var(--color-ink-700)] px-6 py-10 text-center text-sm text-[var(--color-ink-500)]">
                No results. Try a different city, type, or relax the rating filter.
              </div>
            )}
          </div>
        </div>
      )}

      {enrollTarget && (
        <EnrollModal
          place={enrollTarget}
          defaultPersonaId={activePersonaId || null}
          onClose={() => setEnrollTarget(null)}
          onEnrolled={() => handleEnrolled(enrollTarget.place_id)}
        />
      )}
    </div>
  );
}
