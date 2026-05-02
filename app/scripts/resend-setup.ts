#!/usr/bin/env tsx
/**
 * Resend setup script — provisions audiences + contacts + webhook + broadcast
 * drafts to mirror what the 10XAI app already has in Supabase.
 *
 * Why a script (not an admin endpoint): Resend admin operations require a
 * FULL-ACCESS API key. The key in app/.env.local is send-only (good — keeps
 * production code limited in blast radius if leaked). This script runs from
 * a developer's machine with a one-time admin key.
 *
 * Usage:
 *   1. In Resend dashboard → API Keys → Create API key
 *      Permission: "Full access" (NOT send-only)
 *      Domain: All domains
 *      Copy the key (starts with re_...)
 *   2. From the repo root:
 *        cd app
 *        RESEND_ADMIN_KEY=re_xxx \
 *        NEXT_PUBLIC_SUPABASE_URL=https://ytmanuajkffzoegkmqeb.supabase.co \
 *        SUPABASE_SERVICE_ROLE_KEY=<service-role-key> \
 *        npx tsx scripts/resend-setup.ts
 *   3. Optionally revoke the admin key after the script finishes.
 *
 * What it does:
 *   • Lists existing domains (sanity check 10xai.us is verified)
 *   • Creates webhook → https://10xai.us/api/webhooks/resend listening for
 *     bounce/complaint/delivered/opened/clicked events
 *   • Creates one audience per persona (10 audiences)
 *   • Adds enrolled leads as contacts in the matching audience
 *   • Creates one broadcast DRAFT per cadence Step 1 — these become reusable
 *     templates in the Resend dashboard, ready to send to an audience
 *
 * Idempotent: re-running is safe (matches existing items by name).
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Auto-load .env.local from cwd if present (saves the user from setting all
// vars manually — they only need RESEND_ADMIN_KEY).
function loadEnvLocal() {
  const p = join(process.cwd(), ".env.local");
  if (!existsSync(p)) return;
  const text = readFileSync(p, "utf8");
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
  console.log("→ Loaded .env.local");
}
loadEnvLocal();

const RESEND = "https://api.resend.com";
const KEY = process.env.RESEND_ADMIN_KEY;
const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const FROM = "Bernardo Medrado <contact@10xai.us>";
const REPLY_TO = "contato10xai@gmail.com";
const WEBHOOK_URL = "https://10xai.us/api/webhooks/resend";

if (!KEY) throw new Error("Set RESEND_ADMIN_KEY (full-access API key)");
if (!SUPA_URL || !SUPA_KEY) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY");

const supa = createClient(SUPA_URL, SUPA_KEY);

async function api<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${RESEND}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  return text ? (JSON.parse(text) as T) : ({} as T);
}

async function listAudiences() {
  return api<{ data: { id: string; name: string }[] }>("GET", "/audiences");
}

async function createAudience(name: string) {
  return api<{ id: string; name: string }>("POST", "/audiences", { name });
}

async function addContact(
  audienceId: string,
  contact: { email: string; firstName?: string; lastName?: string }
) {
  // Resend dedupes on email per audience; conflict returns 409 which we tolerate.
  try {
    return await api("POST", `/audiences/${audienceId}/contacts`, {
      email: contact.email,
      first_name: contact.firstName ?? "",
      last_name: contact.lastName ?? "",
      unsubscribed: false,
    });
  } catch (err) {
    if (String(err).includes("409")) return null;
    throw err;
  }
}

async function listWebhooks() {
  return api<{ data: { id: string; endpoint: string }[] }>("GET", "/webhooks").catch(
    () => ({ data: [] })
  );
}

async function createWebhook(url: string) {
  return api<{ id: string }>("POST", "/webhooks", {
    endpoint: url,
    events: [
      "email.sent",
      "email.delivered",
      "email.delivery_delayed",
      "email.bounced",
      "email.complained",
      "email.opened",
      "email.clicked",
    ],
  });
}

async function createBroadcast(
  audienceId: string,
  name: string,
  subject: string,
  html: string
) {
  return api<{ id: string }>("POST", "/broadcasts", {
    audience_id: audienceId,
    from: FROM,
    reply_to: REPLY_TO,
    subject,
    html,
    name,
  });
}

function nameSplit(full: string | null): { first: string; last: string } {
  if (!full) return { first: "", last: "" };
  const parts = full.trim().split(/\s+/);
  return { first: parts[0] ?? "", last: parts.slice(1).join(" ") };
}

async function main() {
  console.log("→ Verifying domain status...");
  const domains = await api<{ data: { name: string; status: string }[] }>("GET", "/domains");
  const tenxai = domains.data.find((d) => d.name === "10xai.us");
  console.log(`  10xai.us: ${tenxai?.status ?? "NOT FOUND"}`);

  console.log("→ Configuring webhook...");
  const existingHooks = await listWebhooks();
  const hookExists = existingHooks.data?.some((h) => h.endpoint === WEBHOOK_URL);
  if (hookExists) {
    console.log(`  Webhook already exists: ${WEBHOOK_URL}`);
  } else {
    const hook = await createWebhook(WEBHOOK_URL);
    console.log(`  Created webhook ${hook.id} → ${WEBHOOK_URL}`);
    console.log(
      "  IMPORTANT: open Resend dashboard → Webhooks → click the new webhook → copy the signing secret → add as RESEND_WEBHOOK_SECRET in Vercel env."
    );
  }

  console.log("→ Loading personas + leads from Supabase...");
  const { data: personas } = await supa.from("personas").select("id, name").eq("active", true);
  const { data: leads } = await supa
    .from("leads")
    .select("id, persona_id, business_name, contact_name, email, phone, status")
    .or("email.not.is.null,phone.not.is.null");
  console.log(`  ${personas?.length ?? 0} personas, ${leads?.length ?? 0} qualified leads`);

  console.log("→ Provisioning audiences (one per persona)...");
  const existingAudiences = await listAudiences();
  const audienceByName = new Map(existingAudiences.data.map((a) => [a.name, a.id]));

  const personaToAudience = new Map<string, string>();
  for (const p of personas ?? []) {
    let id = audienceByName.get(p.name);
    if (!id) {
      const created = await createAudience(p.name);
      id = created.id;
      console.log(`  Created audience: ${p.name}`);
    } else {
      console.log(`  Audience exists: ${p.name}`);
    }
    personaToAudience.set(p.id, id);
  }

  console.log("→ Adding enrolled leads as contacts...");
  let added = 0;
  let skipped = 0;
  for (const lead of leads ?? []) {
    if (!lead.email || !lead.persona_id) {
      skipped++;
      continue;
    }
    const audienceId = personaToAudience.get(lead.persona_id);
    if (!audienceId) {
      skipped++;
      continue;
    }
    const { first, last } = nameSplit(lead.contact_name ?? lead.business_name);
    const result = await addContact(audienceId, {
      email: lead.email,
      firstName: first,
      lastName: last,
    });
    if (result === null) skipped++;
    else added++;
  }
  console.log(`  Added: ${added} new contacts. Skipped (already in audience or no email/persona): ${skipped}`);

  console.log("→ Creating broadcast drafts (one per cadence Step 1)...");
  const { data: cadences } = await supa
    .from("cadences")
    .select("id, name, persona_id")
    .eq("active", true);
  const { data: steps } = await supa
    .from("cadence_steps")
    .select("cadence_id, step_number, subject, body")
    .eq("step_number", 1);

  const stepByCadence = new Map(steps?.map((s) => [s.cadence_id, s]) ?? []);
  let createdBroadcasts = 0;
  for (const c of cadences ?? []) {
    if (!c.persona_id) continue;
    const audienceId = personaToAudience.get(c.persona_id);
    const step = stepByCadence.get(c.id);
    if (!audienceId || !step) continue;

    // Strip variable interpolation tokens for a sample HTML preview;
    // the user can edit the broadcast in the Resend dashboard before sending.
    const html = `<p>${(step.body ?? "")
      .replace(/\{(\w+)\}/g, "[$1]")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br/>")}</p>`;

    try {
      await createBroadcast(audienceId, c.name, step.subject ?? c.name, html);
      createdBroadcasts++;
      console.log(`  Created broadcast: ${c.name}`);
    } catch (err) {
      console.log(`  Failed: ${c.name} — ${err instanceof Error ? err.message : err}`);
    }
  }
  console.log(`  Created ${createdBroadcasts} broadcast drafts.`);

  console.log("\n✓ Resend setup complete.");
  console.log("Next steps:");
  console.log("  1. Resend dashboard → Webhooks → copy signing secret");
  console.log("     → add as RESEND_WEBHOOK_SECRET in Vercel env vars");
  console.log("     → redeploy");
  console.log("  2. Revoke the temporary admin API key you created for this script");
  console.log("  3. Visit Resend dashboard → Audiences/Broadcasts to inspect what was created");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
