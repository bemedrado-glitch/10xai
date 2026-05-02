"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, Database, FileText, Download, ExternalLink } from "lucide-react";

type Tab = "report" | "sql";

export default function ResearchClient({
  markdown,
  sql,
}: {
  markdown: string;
  sql: string;
}) {
  const [tab, setTab] = useState<Tab>("report");
  const [copied, setCopied] = useState(false);

  async function copySql() {
    await navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadSql() {
    const blob = new Blob([sql], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "002_personas_and_cadences_seed.sql";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Lighthouse
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
          Market Research
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-400)]">
          ICP segmentation, personas, and cadences. Source of truth for the Find Leads filters and the
          Cadence library in Supabase.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-[var(--color-ink-700)]">
        <TabButton active={tab === "report"} onClick={() => setTab("report")} icon={FileText}>
          Report
        </TabButton>
        <TabButton active={tab === "sql"} onClick={() => setTab("sql")} icon={Database}>
          SQL Seed
        </TabButton>
      </div>

      {tab === "report" && (
        <article className="prose-research">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      )}

      {tab === "sql" && (
        <div>
          <div className="mb-4 rounded-xl border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5 p-5">
            <h2 className="mb-2 font-display text-base font-bold text-[var(--color-cream)]">
              How to run this
            </h2>
            <ol className="ml-5 list-decimal space-y-1.5 text-sm text-[var(--color-ink-300)]">
              <li>
                Open the{" "}
                <a
                  href="https://supabase.com/dashboard/project/ytmanuajkffzoegkmqeb/sql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--color-gold)] underline hover:opacity-80"
                >
                  Supabase SQL Editor
                  <ExternalLink size={11} />
                </a>{" "}
                for the 10xai project.
              </li>
              <li>Click Copy below or Download to grab the SQL.</li>
              <li>Paste into the SQL Editor and click Run.</li>
              <li>
                Refresh{" "}
                <a href="/admin/find-leads" className="text-[var(--color-gold)] underline hover:opacity-80">
                  Find Leads
                </a>{" "}
                — the 10 personas appear as quick-apply chips. Re-running the seed is safe (idempotent).
              </li>
            </ol>
          </div>

          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[var(--color-ink-500)]">
              {sql.split("\n").length.toLocaleString()} lines · {(sql.length / 1024).toFixed(1)} KB
            </p>
            <div className="flex gap-2">
              <button
                onClick={copySql}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1.5 text-xs font-bold text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)]/20"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy SQL"}
              </button>
              <button
                onClick={downloadSql}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] px-3 py-1.5 text-xs font-bold text-[var(--color-cream)] transition-colors hover:border-[var(--color-gold)]/40"
              >
                <Download size={13} />
                Download .sql
              </button>
            </div>
          </div>

          <pre className="max-h-[70vh] overflow-auto rounded-xl border border-[var(--color-ink-700)] bg-[var(--color-ink-900)] p-4 text-[11px] leading-relaxed text-[var(--color-ink-300)]">
            <code>{sql}</code>
          </pre>
        </div>
      )}

      <style jsx global>{`
        .prose-research {
          color: var(--color-ink-200);
          font-size: 14px;
          line-height: 1.7;
          max-width: 75ch;
        }
        .prose-research h1 {
          color: var(--color-cream);
          font-size: 1.75rem;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .prose-research h2 {
          color: var(--color-cream);
          font-size: 1.35rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--color-ink-800);
        }
        .prose-research h3 {
          color: var(--color-cream);
          font-size: 1.1rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .prose-research h4 {
          color: var(--color-gold);
          font-size: 0.95rem;
          font-weight: 700;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
        }
        .prose-research p {
          margin: 0.75rem 0;
          color: var(--color-ink-300);
        }
        .prose-research strong {
          color: var(--color-cream);
          font-weight: 600;
        }
        .prose-research em {
          color: var(--color-ink-200);
        }
        .prose-research a {
          color: var(--color-gold);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose-research a:hover {
          opacity: 0.85;
        }
        .prose-research ul,
        .prose-research ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        .prose-research li {
          margin: 0.35rem 0;
          color: var(--color-ink-300);
        }
        .prose-research li > strong {
          color: var(--color-cream);
        }
        .prose-research blockquote {
          border-left: 3px solid var(--color-gold);
          padding: 0.5rem 0 0.5rem 1rem;
          margin: 1rem 0;
          color: var(--color-ink-300);
          background: rgba(202, 138, 4, 0.04);
          border-radius: 0 6px 6px 0;
        }
        .prose-research blockquote strong {
          color: var(--color-gold);
        }
        .prose-research code {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 0.85em;
          padding: 0.15em 0.4em;
          border-radius: 4px;
          background: var(--color-ink-900);
          color: var(--color-gold);
          border: 1px solid var(--color-ink-800);
        }
        .prose-research pre {
          background: var(--color-ink-900);
          border: 1px solid var(--color-ink-700);
          border-radius: 8px;
          padding: 1rem;
          overflow-x: auto;
          font-size: 12px;
          line-height: 1.6;
          margin: 1rem 0;
        }
        .prose-research pre code {
          background: transparent;
          border: 0;
          padding: 0;
          color: var(--color-ink-200);
        }
        .prose-research hr {
          border: 0;
          border-top: 1px solid var(--color-ink-800);
          margin: 2rem 0;
        }
        .prose-research table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 13px;
          border: 1px solid var(--color-ink-800);
          border-radius: 8px;
          overflow: hidden;
        }
        .prose-research thead {
          background: var(--color-ink-900);
        }
        .prose-research th {
          color: var(--color-cream);
          text-align: left;
          padding: 0.6rem 0.8rem;
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--color-ink-700);
        }
        .prose-research td {
          padding: 0.5rem 0.8rem;
          border-bottom: 1px solid var(--color-ink-800);
          color: var(--color-ink-300);
          vertical-align: top;
        }
        .prose-research tbody tr:last-child td {
          border-bottom: 0;
        }
      `}</style>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ComponentType<{ size?: number }>;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "border-[var(--color-gold)] text-[var(--color-cream)]"
          : "border-transparent text-[var(--color-ink-500)] hover:text-[var(--color-cream)]"
      }`}
    >
      <Icon size={14} />
      {children}
    </button>
  );
}
