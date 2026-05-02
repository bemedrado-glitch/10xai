import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// ─────────────────────────────────────────────────────────────────
// Free email enrichment.
// Strategy (best-effort, fail-soft):
//   1. Hunter.io domain-search if HUNTER_API_KEY is set.
//   2. Fetch and parse the homepage + ~15 likely contact pages in parallel.
//   3. Pull emails from:
//      - Plain text matches
//      - mailto: links (explicit)
//      - HTML-entity-encoded emails (&#64; for @, etc.)
//      - Obfuscated text: "info [at] domain [dot] com" / "(at)" / spaced "@"
//      - JSON-LD Schema.org organization data
//   4. Parse sitemap.xml for additional contact-y URLs (team/leadership/locations/etc).
//   5. Generate common-pattern guesses for the lead's domain (info@, owner@, etc),
//      flagged as guessed so the operator chooses.
// ─────────────────────────────────────────────────────────────────

const PATHS = [
  "",
  "/contact",
  "/contact-us",
  "/contacto",
  "/contato",
  "/about",
  "/about-us",
  "/team",
  "/our-team",
  "/staff",
  "/leadership",
  "/locations",
  "/find-us",
  "/imprint",
  "/help",
  "/support",
];

const NOISY_EMAIL_HOSTS = [
  "example.com",
  "sentry.io",
  "wixpress.com",
  "godaddy.com",
  "squarespace.com",
  "googletagmanager.com",
  "google-analytics.com",
  "googleusercontent.com",
  "doubleclick.net",
  "facebook.com",
  "instagram.com",
  "tiktok.com",
  "pinterest.com",
  "twitter.com",
  "x.com",
  "schema.org",
  "w3.org",
  "sentry-next.wixpress.com",
];

const FILE_EXTS = /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|map|json|xml|woff2?)(\?|$)/i;

const PHONE_REGEX =
  /(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{3,4}(?:[\s.-]?\d{2,4})?/g;

// Match plain emails (after de-obfuscation pass)
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Match mailto: explicitly so we don't miss emails wrapped in URI encoding
const MAILTO_REGEX = /mailto:([^"'<>\s?&]+)/gi;

const COMMON_PREFIXES = ["info", "contact", "hello", "owner", "sales", "admin", "office", "team"];

function decodeHtmlEntities(html: string): string {
  // Numeric entities
  let out = html.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
  // Hex entities
  out = out.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
  // Named entities (just the ones that matter for emails)
  out = out
    .replace(/&amp;/g, "&")
    .replace(/&commat;/g, "@")
    .replace(/&period;/g, ".")
    .replace(/&nbsp;/g, " ");
  return out;
}

function deobfuscateEmails(text: string): string {
  // info [at] domain [dot] com → info@domain.com
  let out = text;

  // Spaced @ : "info @ domain.com" → "info@domain.com"
  out = out.replace(/(\S+)\s+@\s+(\S+)/g, "$1@$2");

  // [at] / (at) / {at} / AT (case-sensitive, surrounded by spaces or brackets)
  out = out.replace(/\s*[\[\(\{]\s*(?:at|AT)\s*[\]\)\}]\s*/g, "@");
  out = out.replace(/\s+at\s+(?=[a-zA-Z0-9-]+\.)/g, "@");

  // [dot] / (dot) / {dot}
  out = out.replace(/\s*[\[\(\{]\s*(?:dot|DOT)\s*[\]\)\}]\s*/g, ".");
  out = out.replace(/\s+dot\s+/g, ".");

  return out;
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

async function fetchPage(url: string, timeoutMs = 6000): Promise<string> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; 10XAI-Lighthouse/1.0; +https://10xai.us/about)",
        Accept: "text/html,application/xhtml+xml,application/xml,text/plain",
      },
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  }
}

function isCleanEmail(e: string, leadDomain: string): boolean {
  if (FILE_EXTS.test(e)) return false;
  if (e.length > 100) return false;
  if (NOISY_EMAIL_HOSTS.some((h) => e.endsWith(`@${h}`) || e.includes(`.${h}`))) return false;
  // Skip obviously templated / placeholder emails
  if (/(your|email|sample|placeholder|test|noreply|no-reply|donotreply|do-not-reply|name@|user@|mail@example)/i.test(e)) return false;
  return true;
}

function extractEmails(rawHtml: string, leadDomain: string): { domain: Set<string>; other: Set<string> } {
  const decoded = decodeHtmlEntities(rawHtml);
  const stripped = stripHtml(decoded);
  const deobf = deobfuscateEmails(stripped);

  const found = new Set<string>();

  // Mailto links from raw HTML (before stripping)
  const mailtoMatches = rawHtml.matchAll(MAILTO_REGEX);
  for (const m of mailtoMatches) {
    const e = decodeURIComponent(m[1]).split("?")[0].toLowerCase().trim();
    if (e.includes("@") && isCleanEmail(e, leadDomain)) found.add(e);
  }

  // Decoded HTML matches (catches `&#64;` obfuscation)
  for (const m of decoded.match(EMAIL_REGEX) ?? []) {
    const e = m.toLowerCase().trim();
    if (isCleanEmail(e, leadDomain)) found.add(e);
  }

  // Stripped + de-obfuscated matches
  for (const m of deobf.match(EMAIL_REGEX) ?? []) {
    const e = m.toLowerCase().trim();
    if (isCleanEmail(e, leadDomain)) found.add(e);
  }

  // JSON-LD parsing (Schema.org Organization / LocalBusiness)
  const jsonLdMatches = rawHtml.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  );
  for (const ldMatch of jsonLdMatches) {
    try {
      const parsed = JSON.parse(ldMatch[1].trim());
      walkJsonForEmails(parsed, (e) => {
        if (isCleanEmail(e, leadDomain)) found.add(e);
      });
    } catch {
      // Some sites have multiple JSON-LD blocks or invalid JSON; skip this one
    }
  }

  const all = Array.from(found);
  const domain = new Set(all.filter((e) => e.endsWith(`@${leadDomain}`)));
  const other = new Set(all.filter((e) => !e.endsWith(`@${leadDomain}`)));
  return { domain, other };
}

function walkJsonForEmails(obj: unknown, push: (email: string) => void): void {
  if (!obj) return;
  if (typeof obj === "string") {
    const matches = obj.match(EMAIL_REGEX);
    if (matches) for (const m of matches) push(m.toLowerCase());
    return;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) walkJsonForEmails(item, push);
    return;
  }
  if (typeof obj === "object") {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (key.toLowerCase().includes("email") && typeof value === "string") {
        const e = value.replace(/^mailto:/i, "").toLowerCase().trim();
        if (e.includes("@")) push(e);
      } else {
        walkJsonForEmails(value, push);
      }
    }
  }
}

function extractPhones(rawHtml: string): string[] {
  const stripped = stripHtml(decodeHtmlEntities(rawHtml));
  const matches = stripped.match(PHONE_REGEX) ?? [];
  const cleaned = new Set<string>();
  for (const raw of matches) {
    const p = raw.trim();
    const digits = p.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) continue;
    if (digits.startsWith("00000") || /^(\d)\1+$/.test(digits)) continue;
    cleaned.add(p);
  }
  return Array.from(cleaned).slice(0, 8);
}

async function findSitemapPaths(
  baseUrl: string
): Promise<string[]> {
  const candidates = [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap_index.xml`, `${baseUrl}/sitemap.txt`];
  for (const c of candidates) {
    const text = await fetchPage(c, 4000);
    if (!text) continue;
    // Naive parse — pull all <loc>URL</loc> entries; works for most sitemaps
    const locs = Array.from(text.matchAll(/<loc>([^<]+)<\/loc>/gi)).map((m) => m[1].trim());
    const interesting = locs
      .filter((u) => /(contact|about|team|staff|leadership|location|imprint|help)/i.test(u))
      .slice(0, 8);
    if (interesting.length > 0) return interesting;
  }
  return [];
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
  const norm = normalizeUrl(body.website ?? "");
  if (!norm) {
    return NextResponse.json(
      { error: "Provide a valid website URL to enrich." },
      { status: 400 }
    );
  }
  const { url, domain } = norm;

  // Phase 1: known paths in parallel + Hunter (if configured) + sitemap discovery
  const [hunterResult, sitemapPaths, ...firstBatchResults] = await Promise.all([
    tryHunter(domain),
    findSitemapPaths(url),
    ...PATHS.map((p) => fetchPage(`${url}${p}`)),
  ]);

  // Phase 2: any extra contact-y paths discovered via sitemap (deduped)
  const sitemapBatch = await Promise.all(sitemapPaths.map((u) => fetchPage(u)));

  const allHtml = [...firstBatchResults, ...sitemapBatch].join("\n");

  const scraped = extractEmails(allHtml, domain);
  const phones = extractPhones(allHtml);

  // Phase 3: pattern guesses for the domain (always include — flagged as guessed)
  const guessedEmails = COMMON_PREFIXES.map((prefix) => `${prefix}@${domain}`);
  const verifiedDomainEmails = Array.from(scraped.domain);
  const otherEmails = Array.from(scraped.other).slice(0, 5);

  // Order: Hunter > scraped @domain > scraped @other > guesses
  const seen = new Set<string>();
  const ordered: { email: string; source: "hunter" | "scrape" | "guess" }[] = [];

  for (const e of hunterResult?.emails ?? []) {
    const lower = e.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      ordered.push({ email: lower, source: "hunter" });
    }
  }
  for (const e of verifiedDomainEmails) {
    if (!seen.has(e)) {
      seen.add(e);
      ordered.push({ email: e, source: "scrape" });
    }
  }
  for (const e of otherEmails) {
    if (!seen.has(e)) {
      seen.add(e);
      ordered.push({ email: e, source: "scrape" });
    }
  }
  for (const e of guessedEmails) {
    if (!seen.has(e)) {
      seen.add(e);
      ordered.push({ email: e, source: "guess" });
    }
  }

  return NextResponse.json({
    domain,
    emails: ordered.map((o) => o.email),
    email_sources: ordered, // [{email, source}] — UI can show which are guessed
    phones,
    people: hunterResult?.people ?? [],
    sources: {
      hunter: hunterResult !== null,
      scrape: allHtml.length > 0,
      sitemap_pages_crawled: sitemapPaths.length,
      total_pages_crawled: PATHS.length + sitemapPaths.length,
    },
  });
}
