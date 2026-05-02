// 10XAI cadence email rendering.
// Used by /api/cron/cadences (production sender) and /api/admin/preview-email.
// Produces both an HTML version (rich, table-based, email-client-safe) and a plain
// text fallback. Resend sends both; mail clients pick the best.

import type { Lead } from "@/lib/database.types";

const BRAND = {
  ink: "#1C1917",
  ink_700: "#3F3F46",
  ink_500: "#737373",
  ink_300: "#D4D4D4",
  ink_200: "#E7E5E4",
  cream: "#FAFAF9",
  cream_white: "#FFFFFF",
  gold: "#CA8A04",
  gold_dark: "#A16207",
};

export type EmailVars = {
  business_name?: string | null;
  contact_name?: string | null;
  first_name?: string | null;
  city?: string | null;
  state?: string | null;
  phone?: string | null;
  rating?: string | null;
  review_count?: string | null;
  address?: string | null;
  category?: string | null;
  website?: string | null;
};

export function buildVars(lead: Partial<Lead>): EmailVars {
  const contactName = (lead.contact_name ?? "").trim();
  const firstName = contactName.split(/\s+/)[0] ?? "";
  return {
    business_name: lead.business_name ?? "",
    contact_name: contactName || "there",
    first_name: firstName || "there",
    city: lead.city ?? "",
    state: lead.state ?? "",
    phone: lead.phone ?? "",
    rating: typeof lead.rating === "number" ? lead.rating.toFixed(1) : "",
    review_count:
      typeof lead.review_count === "number" ? lead.review_count.toLocaleString() : "",
    address: lead.address ?? "",
    category: lead.category ?? "",
    website: lead.website ?? "",
  };
}

const SAMPLE_VARS: EmailVars = {
  business_name: "Acme Roofing",
  contact_name: "Sam Patel",
  first_name: "Sam",
  city: "Charlotte",
  state: "NC",
  phone: "(704) 555-0142",
  rating: "4.8",
  review_count: "312",
  address: "1240 Elm St, Charlotte, NC",
  category: "Roofing Contractor",
  website: "https://acmeroofing.example",
};

export function getSampleVars(): EmailVars {
  return { ...SAMPLE_VARS };
}

export function interpolate(text: string, vars: EmailVars): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = (vars as Record<string, string | null | undefined>)[key];
    if (value === undefined || value === null || value === "") return match; // leave un-substituted so issues are visible
    return value;
  });
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Pull a final "Book 15 min: https://..." (or similar) line off the bottom of the
// body so we can render it as a real button in HTML. Plain-text version keeps the
// line as-is.
function extractCta(text: string): {
  body: string;
  cta: { label: string; url: string } | null;
} {
  const trimmed = text.trimEnd();
  const lines = trimmed.split("\n");
  const lastLine = lines[lines.length - 1]?.trim() ?? "";
  const match = lastLine.match(/^(book\s+\d+\s*min[a-z]?)\s*[:\-—]\s*(https?:\/\/\S+)$/i);
  if (match) {
    return {
      body: lines.slice(0, -1).join("\n").trimEnd(),
      cta: { label: match[1], url: match[2] },
    };
  }
  return { body: trimmed, cta: null };
}

function autoLink(escaped: string): string {
  // After escaping, URLs and emails will appear as plain text. Re-add anchors.
  return escaped
    .replace(
      /(https?:\/\/[^\s<&]+)/g,
      `<a href="$1" style="color:${BRAND.gold};text-decoration:underline" target="_blank" rel="noopener noreferrer">$1</a>`
    )
    .replace(
      /([\w.+\-]+@[\w\-]+(?:\.[\w\-]+)+)/g,
      `<a href="mailto:$1" style="color:${BRAND.gold};text-decoration:underline">$1</a>`
    );
}

function bodyToHtml(text: string): string {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return paragraphs
    .map((p) => {
      const linked = autoLink(escapeHtml(p));
      // Convert single newlines into <br/>
      const withBreaks = linked.replace(/\n/g, "<br/>");
      return `<p style="margin:0 0 16px 0;font-size:15px;line-height:1.65;color:${BRAND.ink};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">${withBreaks}</p>`;
    })
    .join("");
}

export type RenderInput = {
  subject: string;
  body: string;
  vars: EmailVars;
  unsubscribeMailto?: string; // e.g. "mailto:contact@10xai.us?subject=Unsubscribe"
};

export type RenderOutput = {
  subject: string;
  text: string;
  html: string;
};

export function renderCadenceEmail(input: RenderInput): RenderOutput {
  const subject = interpolate(input.subject, input.vars);
  const interpolatedBody = interpolate(input.body, input.vars);
  const { body, cta } = extractCta(interpolatedBody);

  // Plain-text version: keep the original body shape (with the CTA line if present)
  const text = interpolatedBody;

  const bodyHtml = bodyToHtml(body);
  const ctaHtml = cta
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px 0">
        <tr>
          <td align="left" style="background:${BRAND.gold};border-radius:6px;padding:0">
            <a href="${cta.url}"
               style="display:inline-block;padding:12px 22px;color:${BRAND.cream_white};font-weight:700;font-size:14px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"
               target="_blank" rel="noopener noreferrer">
              ${escapeHtml(cta.label)} &rarr;
            </a>
          </td>
        </tr>
      </table>
      <p style="margin:-8px 0 16px 0;font-size:12px;color:${BRAND.ink_500};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
        Or paste this into your browser: <a href="${cta.url}" style="color:${BRAND.gold};text-decoration:underline">${cta.url}</a>
      </p>
    `
    : "";

  const unsubscribeFooter = input.unsubscribeMailto
    ? `<a href="${input.unsubscribeMailto}" style="color:${BRAND.ink_500};text-decoration:underline">Unsubscribe</a> · `
    : "";

  const html = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escapeHtml(subject)}</title>
  <!--[if mso]><style type="text/css">body,table,td,a{font-family:Arial,Helvetica,sans-serif !important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background:${BRAND.cream};-webkit-font-smoothing:antialiased;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <!-- Hidden preheader -->
  <div style="display:none;font-size:0;color:transparent;line-height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">
    ${escapeHtml(subject)} — 10XAI
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.cream}">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:${BRAND.cream_white};border:1px solid ${BRAND.ink_200};border-radius:8px">

          <!-- Header -->
          <tr>
            <td style="padding:20px 32px;border-bottom:1px solid ${BRAND.ink_200}">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-family:Georgia,serif;font-size:18px;font-weight:bold;color:${BRAND.ink};letter-spacing:-0.02em">
                    10XAI
                  </td>
                  <td align="right" style="font-size:11px;color:${BRAND.ink_500};letter-spacing:0.08em;text-transform:uppercase">
                    Custom AI for SMBs
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 32px 8px 32px">
              ${bodyHtml}
              ${ctaHtml}
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding:8px 32px 24px 32px;border-top:1px solid ${BRAND.ink_200}">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-top:18px;font-size:14px;line-height:1.6;color:${BRAND.ink};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
                    <strong style="color:${BRAND.ink}">Bernardo Medrado</strong><br/>
                    <span style="color:${BRAND.ink_500}">Founder · 10XAI</span><br/>
                    <a href="https://10xai.us" style="color:${BRAND.gold};text-decoration:none;font-weight:500" target="_blank" rel="noopener noreferrer">10xai.us</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 32px 24px 32px;background:${BRAND.cream};border-top:1px solid ${BRAND.ink_200};border-radius:0 0 8px 8px">
              <p style="margin:0;font-size:11px;line-height:1.5;color:${BRAND.ink_500};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
                Sent because we believe 10XAI's services may benefit your business. ${unsubscribeFooter}10XAI · Apex, NC, USA
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
