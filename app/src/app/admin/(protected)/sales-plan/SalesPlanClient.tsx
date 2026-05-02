"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SalesPlanClient({ markdown }: { markdown: string }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          10XAI · Strategy
        </p>
        <h1 className="mt-1 font-display text-2xl font-black text-[var(--color-cream)]">
          Sales Plan
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-400)]">
          3-year strategic sales &amp; marketing plan with Van Westendorf pricing across 100 simulated personas.
        </p>
      </div>

      <article className="prose-research">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>

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
