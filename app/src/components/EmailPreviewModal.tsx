"use client";

import { useEffect, useState } from "react";
import { X, Loader2, Eye } from "lucide-react";

export default function EmailPreviewModal({
  subject,
  body,
  onClose,
}: {
  subject: string;
  body: string;
  onClose: () => void;
}) {
  const [html, setHtml] = useState<string | null>(null);
  const [renderedSubject, setRenderedSubject] = useState<string>(subject);
  const [error, setError] = useState<string | null>(null);
  const [usingSample, setUsingSample] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/preview-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.error) {
          setError(d.error);
          return;
        }
        setHtml(d.html);
        setRenderedSubject(d.subject);
        setUsingSample(d.using_sample_data ?? true);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Render failed");
      });
    return () => {
      cancelled = true;
    };
  }, [subject, body]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--color-ink-700)] bg-[var(--color-ink)] shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-ink-700)] px-5 py-3">
          <div className="flex items-center gap-2">
            <Eye size={14} className="text-[var(--color-gold)]" />
            <h2 className="text-sm font-bold text-[var(--color-cream)]">Email preview</h2>
            {usingSample && (
              <span className="rounded-full bg-amber-900/40 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                Sample data
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[var(--color-cream)]/60 hover:text-[var(--color-cream)]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="border-b border-[var(--color-ink-800)] bg-[var(--color-ink-900)] px-5 py-2.5 text-xs">
          <p>
            <span className="text-[var(--color-cream)]/50">From:</span>{" "}
            <span className="text-[var(--color-cream)]">Bernardo Medrado &lt;contact@10xai.us&gt;</span>
          </p>
          <p>
            <span className="text-[var(--color-cream)]/50">Reply-To:</span>{" "}
            <span className="text-[var(--color-cream)]">contato10xai@gmail.com</span>
          </p>
          <p>
            <span className="text-[var(--color-cream)]/50">Subject:</span>{" "}
            <span className="font-medium text-[var(--color-cream)]">{renderedSubject}</span>
          </p>
        </div>

        <div className="flex-1 overflow-auto bg-[var(--color-ink-900)] p-4">
          {error ? (
            <div className="rounded-lg bg-red-900/30 px-3 py-2 text-xs text-red-300">{error}</div>
          ) : !html ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={20} className="animate-spin text-[var(--color-gold)]" />
            </div>
          ) : (
            <iframe
              title="Email preview"
              srcDoc={html}
              sandbox="allow-same-origin"
              className="h-[60vh] w-full rounded-md border border-[var(--color-ink-700)] bg-white"
            />
          )}
        </div>

        {usingSample && !error && (
          <div className="border-t border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-5 py-2.5 text-[11px] text-[var(--color-cream)]/70">
            Variables filled with sample lead data: <strong>Acme Roofing</strong>, contact{" "}
            <strong>Sam Patel</strong>, Charlotte NC, 4.8★ (312 reviews). When sent through the
            cron, real lead data is used.
          </div>
        )}
      </div>
    </div>
  );
}
