"use client";

import type { Lead } from "@/lib/database.types";
import { categoryLabel } from "@/lib/business-categories";

export type ExportableLead = Lead;

const COLUMNS: { key: string; label: string; pick: (l: Lead) => string }[] = [
  { key: "business_name", label: "Business", pick: (l) => l.business_name ?? "" },
  { key: "category", label: "Category", pick: (l) => categoryLabel(l.category) },
  { key: "city", label: "City", pick: (l) => l.city ?? "" },
  { key: "state", label: "State", pick: (l) => l.state ?? "" },
  { key: "rating", label: "Rating", pick: (l) => (l.rating != null ? l.rating.toFixed(1) : "") },
  {
    key: "review_count",
    label: "Reviews",
    pick: (l) => (l.review_count != null ? l.review_count.toLocaleString() : ""),
  },
  { key: "contact_name", label: "Contact", pick: (l) => l.contact_name ?? "" },
  { key: "email", label: "Email", pick: (l) => l.email ?? "" },
  { key: "phone", label: "Phone", pick: (l) => l.phone ?? "" },
  { key: "website", label: "Website", pick: (l) => l.website ?? "" },
  { key: "status", label: "Status", pick: (l) => l.status ?? "" },
  {
    key: "created_at",
    label: "Added",
    pick: (l) =>
      new Date(l.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
];

function csvEscape(v: string): string {
  if (v.includes(",") || v.includes('"') || v.includes("\n") || v.includes("\r")) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

function timestampSlug(): string {
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function exportLeadsCsv(leads: Lead[], filenameHint = "leads"): void {
  const headerRow = COLUMNS.map((c) => csvEscape(c.label)).join(",");
  const dataRows = leads.map((l) =>
    COLUMNS.map((c) => csvEscape(c.pick(l))).join(",")
  );
  // Prefix with UTF-8 BOM so Excel opens it with proper encoding (handles ã, é, etc.)
  const csv = "﻿" + [headerRow, ...dataRows].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `10xai_${filenameHint}_${timestampSlug()}.csv`);
}

export async function exportLeadsPdf(leads: Lead[], filenameHint = "leads"): Promise<void> {
  // Lazy-load jsPDF so it's not in the main bundle
  const [{ jsPDF }, autoTableMod] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  const autoTable = (autoTableMod as { default: (doc: unknown, opts: unknown) => void }).default;

  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(28, 25, 23); // ink
  doc.text("10XAI · Lighthouse", 32, 36);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(115, 115, 115); // ink-500
  doc.text(
    `Leads export · ${leads.length} records · ${new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    32,
    52
  );

  // Gold rule under header
  doc.setDrawColor(202, 138, 4); // gold
  doc.setLineWidth(1);
  doc.line(32, 60, pageWidth - 32, 60);

  // Slim down columns for landscape PDF — drop a couple to keep readable
  const pdfColumns = COLUMNS.filter(
    (c) => c.key !== "category" && c.key !== "state"
  );

  autoTable(doc, {
    startY: 72,
    head: [pdfColumns.map((c) => c.label)],
    body: leads.map((l) => pdfColumns.map((c) => c.pick(l))),
    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: 5,
      textColor: [28, 25, 23],
      lineColor: [231, 229, 228],
      lineWidth: 0.5,
    },
    headStyles: {
      fillColor: [28, 25, 23],
      textColor: [250, 250, 249],
      fontStyle: "bold",
      fontSize: 8,
    },
    alternateRowStyles: {
      fillColor: [250, 250, 249],
    },
    columnStyles: {
      0: { cellWidth: 110 }, // Business
      4: { cellWidth: 90 }, // Contact
      5: { cellWidth: 130 }, // Email
      6: { cellWidth: 90 }, // Phone
      7: { cellWidth: 110 }, // Website
    },
    margin: { left: 32, right: 32 },
    didDrawPage: () => {
      const pageNumber = doc.getNumberOfPages();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setFontSize(8);
      doc.setTextColor(168, 162, 158);
      doc.text(
        `Page ${pageNumber} · 10xai.us · Confidential`,
        pageWidth - 32,
        pageHeight - 16,
        { align: "right" }
      );
    },
  });

  doc.save(`10xai_${filenameHint}_${timestampSlug()}.pdf`);
}
