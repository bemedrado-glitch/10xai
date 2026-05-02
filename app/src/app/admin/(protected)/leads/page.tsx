import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Phone, Globe, Star, Mail } from "lucide-react";
import { categoryLabel } from "@/lib/business-categories";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-[var(--color-ink-700)] text-[var(--color-cream)]",
  enriched: "bg-blue-900/40 text-blue-300",
  enrolled: "bg-[var(--color-gold)]/20 text-[var(--color-gold)]",
  replied: "bg-emerald-900/40 text-emerald-300",
  booked: "bg-emerald-900/60 text-emerald-200",
  disqualified: "bg-red-900/40 text-red-300",
};

export const revalidate = 0;

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const counts = (leads ?? []).reduce<Record<string, number>>((acc, l) => {
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
        </div>
        <p className="text-sm font-medium text-[var(--color-cream)]">
          {leads?.length ?? 0} total
        </p>
      </div>

      {/* Status summary */}
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(counts).map(([status, count]) => (
          <span
            key={status}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_COLORS[status] ?? "bg-[var(--color-ink-700)] text-[var(--color-cream)]"}`}
          >
            {status} · {count}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-ink-700)] bg-[var(--color-ink-900)] text-[10px] font-bold uppercase tracking-wider text-[var(--color-cream)]">
              {["Business", "Location", "Rating", "Email", "Phone", "Website", "Status", "Added"].map((h) => (
                <th key={h} className="px-3 py-3 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-ink-800)]">
            {(leads ?? []).map((lead) => (
              <tr key={lead.id} className="transition-colors hover:bg-[var(--color-ink-900)]">
                <td className="px-3 py-3">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="font-medium text-[var(--color-cream)] hover:text-[var(--color-gold)]"
                  >
                    {lead.business_name}
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
                      <Star size={11} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />
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
                  {lead.email ? (
                    <a
                      href={`mailto:${lead.email}`}
                      className="flex items-center gap-1 text-xs text-[var(--color-cream)] hover:text-[var(--color-gold)]"
                    >
                      <Mail size={10} className="shrink-0 text-[var(--color-gold)]" />
                      {lead.email}
                    </a>
                  ) : (
                    <span className="text-xs text-[var(--color-cream)]/40">—</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  {lead.phone ? (
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-1 whitespace-nowrap text-xs text-[var(--color-cream)] hover:text-[var(--color-gold)]"
                    >
                      <Phone size={10} className="shrink-0" />
                      {lead.phone}
                    </a>
                  ) : (
                    <span className="text-xs text-[var(--color-cream)]/40">—</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  {lead.website ? (
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex max-w-[180px] items-center gap-1 truncate text-xs text-[var(--color-cream)] hover:text-[var(--color-gold)]"
                    >
                      <Globe size={10} className="shrink-0" />
                      {lead.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <span className="text-xs text-[var(--color-cream)]/40">—</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${STATUS_COLORS[lead.status] ?? "bg-[var(--color-ink-700)] text-[var(--color-cream)]"}`}
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
              </tr>
            ))}
            {(leads?.length ?? 0) === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-sm text-[var(--color-cream)]/70"
                >
                  No leads yet — use Find Leads to discover and enroll businesses.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
