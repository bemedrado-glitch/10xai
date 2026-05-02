"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Database, Users, Mail, BarChart2, LogOut, Send, BookOpen, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase";

const NAV = [
  { href: "/admin/find-leads", icon: Search, label: "Find Leads" },
  { href: "/admin/leads", icon: Database, label: "Leads" },
  { href: "/admin/enrollments", icon: Send, label: "Enrollments" },
  { href: "/admin/personas", icon: Users, label: "Personas" },
  { href: "/admin/cadences", icon: Mail, label: "Cadences" },
  { href: "/admin/research", icon: BookOpen, label: "Research" },
  { href: "/admin/sales-plan", icon: TrendingUp, label: "Sales Plan" },
  { href: "/admin/analytics", icon: BarChart2, label: "Analytics" },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-56 flex-col border-r border-[var(--color-ink-700)] bg-[var(--color-ink)]">
      {/* Brand */}
      <div className="border-b border-[var(--color-ink-700)] px-5 py-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Lighthouse
        </p>
        <p className="mt-0.5 text-xs font-medium text-[var(--color-cream)]">
          Admin
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "border-[var(--color-gold)]/50 bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                  : "border-transparent bg-[var(--color-ink-900)] text-[var(--color-cream)] hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-ink-800)]"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-[var(--color-ink-700)] p-3">
        <p className="truncate px-3 py-1 text-[10px] text-[var(--color-cream)]/70">
          {userEmail}
        </p>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg border border-transparent bg-[var(--color-ink-900)] px-3 py-2.5 text-sm font-semibold text-[var(--color-cream)] transition-colors hover:border-red-900/50 hover:bg-red-900/20 hover:text-red-300"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
