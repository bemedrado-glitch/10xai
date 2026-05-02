import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX =
  /(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{3,4}(?:[\s.-]?\d{2,4})?/g;

const NOISY_EMAIL_HOSTS = [
  "example.com",
  "sentry.io",
  "wixpress.com",
  "godaddy.com",
  "squarespace.com",
  "googletagmanager.com",
  "google-analytics.com",
  "doubleclick.net",
  "facebook.com",
  "instagram.com",
  "tiktok.com",
  "pinterest.com",
  "twitter.com",
  "schema.org",
  "w3.org",
];

const FILE_EXTS = /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|map|json|xml|woff2?)(\?|$)/i;

const PATHS = ["", "/contact", "/contact-us", "/contato", "/contacto", "/about", "/about-us"];

async function fetchPage(url: string, timeoutMs = 6000): Promise<string> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; 10XAI-Lighthouse/1.0; +https://10xai.us/about)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!res.ok) return "";
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("text/html") && !ct.includes("application/xhtml")) return "";
    return await res.text();
  } catch {
    return "";
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&");
}

function extractEmails(html: string, leadDomain: string): { domain: string[]; other: string[] } {
  const text = `${html} ${stripHtml(html)}`;
  const matches = text.match(EMAIL_REGEX) ?? [];

  const cleaned = new Set<string>();
  for (const raw of matches) {
    const e = raw.toLowerCase().trim();
    if (FILE_EXTS.test(e)) continue;
    if (NOISY_EMAIL_HOSTS.some((h) => e.endsWith(`@${h}`) || e.includes(`.${h}`))) continue;
    if (e.length > 100) continue;
    cleaned.add(e);
  }

  const all = Array.from(cleaned);
  const domain = all.filter((e) => e.endsWith(`@${leadDomain}`));
  const other = all.filter((e) => !e.endsWith(`@${leadDomain}`));
  return { domain, other: other.slice(0, 5) };
}

function extractPhones(html: string): string[] {
  const text = stripHtml(html);
  const matches = text.match(PHONE_REGEX) ?? [];
  const cleaned = new Set<string>();
  for (const raw of matches) {
    const p = raw.trim();
    const digits = p.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) continue;
    if (digits.startsWith("00000") || /^(\d)\1+$/.test(digits)) continue; // dummy/repeated
    cleaned.add(p);
  }
  return Array.from(cleaned).slice(0, 8);
}

type HunterPerson = {
  name: string;
  email: string;
  position: string;
  confidence: number;
};

async function tryHunter(
  domain: string
): Promise<{ emails: string[]; people: HunterPerson[] } | null> {
  const apiKey = process.env.HUNTER_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(
      `https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(
        domain
      )}&api_key=${apiKey}&limit=10`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      data?: {
        emails?: Array<{
          value: string;
          first_name?: string | null;
          last_name?: string | null;
          position?: string | null;
          confidence?: number;
        }>;
      };
    };
    const list = data.data?.emails ?? [];
    const emails = list.map((e) => e.value).filter(Boolean);
    const people: HunterPerson[] = list
      .map((e) => ({
        name: [e.first_name, e.last_name].filter(Boolean).join(" ").trim(),
        email: e.value,
        position: e.position ?? "",
        confidence: e.confidence ?? 0,
      }))
      .filter((p) => p.name)
      .sort((a, b) => b.confidence - a.confidence);
    return { emails, people };
  } catch {
    return null;
  }
}

function normalizeUrl(input: string): { url: string; domain: string } | null {
  let s = input.trim();
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    return { url: u.origin, domain: u.hostname.replace(/^www\./, "") };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as { website?: string | null };
  const website = body.website ?? "";
  const norm = normalizeUrl(website);

  if (!norm) {
    return NextResponse.json(
      { error: "Provide a valid website URL to enrich." },
      { status: 400 }
    );
  }

  const { url, domain } = norm;

  const [hunterResult, ...pageResults] = await Promise.all([
    tryHunter(domain),
    ...PATHS.map((p) => fetchPage(`${url}${p}`)),
  ]);

  const html = pageResults.join("\n");
  const scraped = extractEmails(html, domain);
  const phones = extractPhones(html);

  const allEmails = Array.from(
    new Set(
      [
        ...(hunterResult?.emails ?? []),
        ...scraped.domain,
        ...scraped.other,
      ].map((e) => e.toLowerCase())
    )
  );

  return NextResponse.json({
    domain,
    emails: allEmails,
    phones,
    people: hunterResult?.people ?? [],
    sources: {
      hunter: hunterResult !== null,
      scrape: html.length > 0,
    },
  });
}
