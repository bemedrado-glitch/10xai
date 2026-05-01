import { createClient } from "@/lib/supabase-server";
import { Phone, Globe, Star, Mail } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-[var(--color-ink-800)] text-[var(--color-ink-400)]",
  enriched: "bg-blue-900/40 text-blue-300",
  enrolled: "bg-[var(--color-gold)]/15 text-[var(--color-gold)]",
  replied: "bg-emerald-900/30 text-emerald-400",
  booked: "bg-emerald-900/50 text-emerald-300",
  disqualified: "bg-red-900/30 text-red-400",
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
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Lighthouse
          </p>
          <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
            Leads
          </h1>
        </div>
        <p className="text-sm text-[var(--color-ink-500)]">
          {leads?.length ?? 0} total
        </p>
      </div>

      {/* Status summary */}
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(counts).map(([status, count]) => (
          <span
            key={status}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_COLORS[status] ?? ""}`}
          >
            {status} · {count}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-ink-700)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-ink-700)] bg-[var(--color-ink)]">
              {["Business", "Location", "Rating", "Contact", "Status", "Added"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium text-[var(--color-ink-500)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-ink-800)]">
            {(leads ?? []).map((lead) => (
              <tr
                key={lead.id}
                className="bg-[var(--color-ink-900)] transition-colors hover:bg-[var(--color-ink-800)]"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-[var(--color-cream)]">
                    {lead.business_name}
                  </div>
                  {lead.category && (
                    <div className="text-xs text-[var(--color-ink-500)]">
                      {lead.category.replace(/_/g, " ")}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-[var(--color-ink-400)]">
                  {[lead.city, lead.state].filter(Boolean).join(", ")}
                </td>
                <td className="px-4 py-3">
                  {lead.rating != null && (
                    <span className="flex items-center gap-1 text-xs text-[var(--color-ink-400)]">
                      <Star size={11} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />
                      {lead.rating}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    {lead.phone && (
                      <span className="flex items-center gap-1 text-xs text-[var(--color-ink-400)]">
                        <Phone size={10} /> {lead.phone}
                      </span>
                    )}
                    {lead.email && (
                      <span className="flex items-center gap-1 text-xs text-[var(--color-gold)]">
                        <Mail size={10} /> {lead.email}
                      </span>
                    )}
                    {lead.website && (
                      <span className="flex items-center gap-1 text-xs text-[var(--color-ink-500)]">
                        <Globe size={10} />{" "}
                        {lead.website.replace(/^https?:\/\//, "").slice(0, 25)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium capitalize ${STATUS_COLORS[lead.status] ?? ""}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[var(--color-ink-500)]">
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
                  colSpan={6}
                  className="bg-[var(--color-ink-900)] px-4 py-10 text-center text-sm text-[var(--color-ink-500)]"
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
