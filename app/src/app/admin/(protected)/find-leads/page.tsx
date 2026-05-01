"use client";

import { useState } from "react";
import { Search, Globe, Phone, Star, MapPin, Plus, CheckCircle } from "lucide-react";
import EnrollModal from "@/components/EnrollModal";

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

const CATEGORIES = [
  "restaurant", "cafe", "bakery", "bar", "beauty_salon", "hair_salon",
  "spa", "gym", "dentist", "doctor", "lawyer", "accountant",
  "real_estate_agency", "auto_repair", "plumber", "electrician",
  "contractor", "florist", "pet_store", "veterinary_care",
];

export default function FindLeadsPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [noWebsite, setNoWebsite] = useState(false);
  const [minRating, setMinRating] = useState("4.5");

  const [results, setResults] = useState<PlacesResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const [enrollTarget, setEnrollTarget] = useState<PlacesResult | null>(null);
  const [enrolled, setEnrolled] = useState<Set<string>>(new Set());

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const params = new URLSearchParams({
        q: query || (category ? `${category} in ${city} ${state}` : `businesses in ${city} ${state}`),
        city,
        state,
        category,
        noWebsite: noWebsite ? "1" : "0",
        minRating,
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
          Discover local businesses via Google Places, then enroll them in an outreach cadence.
        </p>
      </div>

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className="mb-8 rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
              Search (optional)
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. pizza places with great reviews"
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>

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

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
              State
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="TX"
              maxLength={2}
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-600)] outline-none focus:border-[var(--color-gold)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-gold)]"
            >
              <option value="">Any category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-400)]">
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

          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-2 w-full">
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

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-900/30 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Results */}
      {searched && !loading && (
        <div>
          <p className="mb-4 text-xs text-[var(--color-ink-500)]">
            {results.length} result{results.length !== 1 ? "s" : ""}
            {noWebsite ? " (no website filter applied)" : ""}
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
                      <h3 className="font-semibold text-[var(--color-cream)]">
                        {r.business_name}
                      </h3>
                      {r.category && (
                        <span className="rounded-full bg-[var(--color-ink-800)] px-2 py-0.5 text-[10px] text-[var(--color-ink-400)]">
                          {r.category.replace(/_/g, " ")}
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
                        <span className="flex items-center gap-1 truncate max-w-[180px]">
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
                No results found. Try a different city or category.
              </div>
            )}
          </div>
        </div>
      )}

      {enrollTarget && (
        <EnrollModal
          place={enrollTarget}
          onClose={() => setEnrollTarget(null)}
          onEnrolled={() => handleEnrolled(enrollTarget.place_id)}
        />
      )}
    </div>
  );
}
