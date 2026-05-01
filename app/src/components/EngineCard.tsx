"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lightbulb,
  Zap,
  Headphones,
  Megaphone,
  GraduationCap,
  FileText,
  MessageCircle,
  type LucideIcon,
  ArrowRight,
} from "lucide-react";

type IconKey =
  | "lighthouse"
  | "sales"
  | "care"
  | "reach"
  | "mind"
  | "bid"
  | "bernie";

const ICONS: Record<IconKey, LucideIcon> = {
  lighthouse: Lightbulb,
  sales: Zap,
  care: Headphones,
  reach: Megaphone,
  mind: GraduationCap,
  bid: FileText,
  bernie: MessageCircle,
};

export type Engine = {
  iconKey: IconKey;
  name: string;
  tag: string;
  desc: string;
  details: string[];
  bestFor: string;
  anchor: string;
  href?: string;
  variant?: "default" | "concierge";
};

export function EngineCard({ engine }: { engine: Engine }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICONS[engine.iconKey];
  const isConcierge = engine.variant === "concierge";
  const isLink = !!engine.href;

  const handleClick = (e: React.MouseEvent) => {
    if (!isLink) {
      e.preventDefault();
      setExpanded((s) => !s);
    }
  };

  const Content = (
    <article
      onClick={handleClick}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={[
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border p-6 transition-all duration-300 md:p-8",
        isConcierge
          ? "border-[var(--color-gold)]/40 bg-[var(--color-gold-100)]/40 hover:border-[var(--color-gold)] hover:shadow-lg hover:shadow-[var(--color-gold)]/10"
          : "border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)] hover:border-[var(--color-ink)] hover:shadow-lg hover:shadow-[var(--color-ink)]/10",
      ].join(" ")}
    >
      {/* Gold corner ribbon on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-16 w-16 origin-top-right scale-0 bg-[var(--color-gold)] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />

      <div className="flex items-start gap-4">
        <span
          className={[
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-all duration-500",
            isConcierge
              ? "bg-[var(--color-gold)] text-[var(--color-cream)] group-hover:rotate-[8deg] group-hover:scale-110"
              : "bg-[var(--color-ink)] text-[var(--color-cream)] group-hover:bg-[var(--color-gold)] group-hover:rotate-[8deg] group-hover:scale-110",
          ].join(" ")}
        >
          <Icon size={22} strokeWidth={2.25} />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
            {engine.tag}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-[var(--color-ink)]">
            {engine.name}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-[var(--color-ink-700)]">{engine.desc}</p>

      {/* Expandable details */}
      <div
        className={[
          "grid transition-all duration-500 ease-out",
          expanded
            ? "mt-5 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
        aria-hidden={!expanded}
      >
        <div className="overflow-hidden">
          <div className="rounded-lg border border-[var(--color-ink-300)]/50 bg-[var(--color-cream)]/60 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-700)]">
              What you get
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-[var(--color-ink-700)]">
              {engine.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-gold)]" />
                  {detail}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-700)]">
              Best for
            </p>
            <p className="mt-1 text-sm text-[var(--color-ink-700)]">
              {engine.bestFor}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-2 pt-2">
        <p className="text-sm font-medium text-[var(--color-ink-500)]">
          {engine.anchor}
        </p>
        <span className="flex items-center gap-1 text-sm font-bold text-[var(--color-ink)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {isLink ? "Try it" : "Details"}
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );

  if (isLink) {
    return (
      <Link href={engine.href!} className="block h-full">
        {Content}
      </Link>
    );
  }
  return Content;
}
