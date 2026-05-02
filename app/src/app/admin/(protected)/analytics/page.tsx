import { createClient } from "@/lib/supabase-server";
import { Mail, MousePointerClick, Reply, TrendingUp, Users, Activity } from "lucide-react";

export const revalidate = 0;

// "Qualified" = has at least one way to reach them (email OR phone).
// Leads with neither are excluded from every count on this page so the
// numbers match what's visible in /admin/leads.
const QUALIFIED_FILTER = "email.not.is.null,phone.not.is.null";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const [
    { count: totalLeads },
    { count: orphanLeads },
    { count: enrolledLeads },
    { count: totalSends },
    { count: opens },
    { count: clicks },
    { count: replies },
    { data: recentSends },
    { data: statusBreakdown },
  ] = await Promise.all([
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .or(QUALIFIED_FILTER),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .is("email", null)
      .is("phone", null),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .or(QUALIFIED_FILTER)
      .in("status", ["enrolled", "replied", "booked"]),
    supabase.from("email_sends").select("*", { count: "exact", head: true }),
    supabase
      .from("email_sends")
      .select("*", { count: "exact", head: true })
      .not("opened_at", "is", null),
    supabase
      .from("email_sends")
      .select("*", { count: "exact", head: true })
      .not("clicked_at", "is", null),
    supabase
      .from("email_sends")
      .select("*", { count: "exact", head: true })
      .not("replied_at", "is", null),
    supabase
      .from("email_sends")
      .select("to_email, subject, status, sent_at")
      .order("sent_at", { ascending: false })
      .limit(20),
    supabase
      .from("leads")
      .select("status")
      .or(QUALIFIED_FILTER)
      .order("created_at", { ascending: false }),
  ]);

  const openRate = totalSends ? Math.round(((opens ?? 0) / totalSends) * 100) : 0;
  const clickRate = totalSends ? Math.round(((clicks ?? 0) / totalSends) * 100) : 0;
  const replyRate = totalSends ? Math.round(((replies ?? 0) / totalSends) * 100) : 0;

  const statusCounts = (statusBreakdown ?? []).reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  const metrics = [
    { label: "Total Leads", value: totalLeads ?? 0, icon: Users, gold: false },
    { label: "In Pipeline", value: enrolledLeads ?? 0, icon: Activity, gold: true },
    { label: "Emails Sent", value: totalSends ?? 0, icon: Mail, gold: false },
    { label: "Open Rate", value: `${openRate}%`, icon: TrendingUp, gold: false },
    { label: "Click Rate", value: `${clickRate}%`, icon: MousePointerClick, gold: false },
    { label: "Reply Rate", value: `${replyRate}%`, icon: Reply, gold: replyRate > 5 },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Lighthouse
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-[var(--color-cream)]/80">
          Counts only qualified leads — those with at least an email or phone.
          {(orphanLeads ?? 0) > 0 && (
            <span className="ml-2 text-amber-300">
              {orphanLeads} orphan lead{orphanLeads !== 1 ? "s" : ""} hidden (no contact info).
            </span>
          )}
        </p>
      </div>

      {/* KPI grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map(({ label, value, icon: Icon, gold }) => (
          <div
            key={label}
            className={`rounded-xl border p-5 ${
              gold
                ? "border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8"
                : "border-[var(--color-ink-700)] bg-[var(--color-ink)]"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-[var(--color-ink-500)]">{label}</p>
              <Icon
                size={14}
                className={gold ? "text-[var(--color-gold)]" : "text-[var(--color-ink-600)]"}
              />
            </div>
            <p
              className={`mt-2 font-display text-3xl font-black ${
                gold ? "text-[var(--color-gold)]" : "text-[var(--color-cream)]"
              }`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status breakdown */}
        <div className="rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5">
          <h2 className="mb-4 text-sm font-bold text-[var(--color-cream)]">Lead Status</h2>
          <div className="space-y-2">
            {Object.entries(statusCounts).map(([status, count]) => {
              const pct = totalLeads ? Math.round((count / totalLeads) * 100) : 0;
              return (
                <div key={status}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="capitalize text-[var(--color-ink-400)]">{status}</span>
                    <span className="text-[var(--color-cream)]">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-ink-800)]">
                    <div
                      className="h-full rounded-full bg-[var(--color-gold)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(statusCounts).length === 0 && (
              <p className="text-xs text-[var(--color-ink-600)]">No data yet.</p>
            )}
          </div>
        </div>

        {/* Recent sends */}
        <div className="rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] p-5">
          <h2 className="mb-4 text-sm font-bold text-[var(--color-cream)]">Recent Sends</h2>
          <div className="space-y-2">
            {(recentSends ?? []).map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 rounded-lg bg-[var(--color-ink-900)] px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs text-[var(--color-cream)]">{s.to_email}</p>
                  {s.subject && (
                    <p className="truncate text-[10px] text-[var(--color-ink-500)]">{s.subject}</p>
                  )}
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                    s.status === "opened"
                      ? "bg-emerald-900/30 text-emerald-400"
                      : s.status === "bounced" || s.status === "failed"
                      ? "bg-red-900/30 text-red-400"
                      : "bg-[var(--color-ink-800)] text-[var(--color-ink-400)]"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))}
            {(recentSends ?? []).length === 0 && (
              <p className="text-xs text-[var(--color-ink-600)]">No sends yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
