"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/find-leads");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-ink)] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Lighthouse
          </p>
          <h1 className="mt-2 font-display text-2xl font-black text-[var(--color-cream)]">
            Admin Access
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-300)]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-4 py-2.5 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-500)] outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
              placeholder="you@10xai.us"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-300)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-4 py-2.5 text-sm text-[var(--color-cream)] placeholder-[var(--color-ink-500)] outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-900/30 px-4 py-2.5 text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--color-gold)] py-2.5 text-sm font-bold text-[var(--color-cream)] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
