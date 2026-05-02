import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabase } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import crypto from "node:crypto";

// ─────────────────────────────────────────────────────────────
// Resend webhook receiver.
// Configure in Resend dashboard → Webhooks → Add endpoint:
//   URL:    https://10xai.us/api/webhooks/resend
//   Events: email.sent, email.delivered, email.delivery_delayed,
//           email.bounced, email.complained, email.opened, email.clicked
// Copy the signing secret into Vercel env as RESEND_WEBHOOK_SECRET.
//
// What this handler does:
//   • email.delivered  → email_sends.status = 'delivered'
//   • email.opened     → email_sends.opened_at = now, status = 'opened'
//   • email.clicked    → email_sends.clicked_at = now
//   • email.bounced    → status='bounced', pause enrollment, disqualify lead
//   • email.complained → status='complained' (spam complaint), pause + disqualify
//   • email.delivery_delayed / email.sent → noop (informational)
// ─────────────────────────────────────────────────────────────

type ResendEventType =
  | "email.sent"
  | "email.delivered"
  | "email.delivery_delayed"
  | "email.bounced"
  | "email.complained"
  | "email.opened"
  | "email.clicked";

type ResendEvent = {
  type: ResendEventType;
  created_at: string;
  data: {
    email_id: string;
    to?: string[];
    from?: string;
    subject?: string;
    bounce?: { type?: string; subType?: string; message?: string };
  };
};

function verifySignature(
  secret: string,
  svixId: string,
  svixTimestamp: string,
  body: string,
  svixSignature: string
): boolean {
  // Resend uses Svix. Signature scheme:
  //   message = `${svix_id}.${svix_timestamp}.${body}`
  //   secret format: "whsec_<base64>"
  //   signature header: "v1,<base64-hmac-sha256>" (space-separated for rotation)
  const cleanSecret = secret.replace(/^whsec_/, "");
  const decodedSecret = Buffer.from(cleanSecret, "base64");
  const message = `${svixId}.${svixTimestamp}.${body}`;
  const expected = crypto
    .createHmac("sha256", decodedSecret)
    .update(message)
    .digest("base64");

  return svixSignature.split(" ").some((s) => {
    const parts = s.split(",");
    if (parts.length !== 2) return false;
    return parts[1] === expected;
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  // Verify signature if secret configured. If not, log a warning but accept
  // (so dev/staging works). Production should always have the secret set.
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (secret) {
    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");
    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json({ error: "Missing svix headers" }, { status: 401 });
    }
    if (!verifySignature(secret, svixId, svixTimestamp, body, svixSignature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let event: ResendEvent;
  try {
    event = JSON.parse(body) as ResendEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const resendId = event.data?.email_id;
  if (!resendId) {
    return NextResponse.json({ ok: true, skipped: "no email_id" });
  }

  // Service-role client — webhook is server-to-server, no user auth context
  const supabase = createSupabase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  switch (event.type) {
    case "email.delivered":
      await supabase
        .from("email_sends")
        .update({ status: "delivered" })
        .eq("resend_id", resendId);
      break;

    case "email.opened":
      await supabase
        .from("email_sends")
        .update({ opened_at: new Date().toISOString(), status: "opened" })
        .eq("resend_id", resendId);
      break;

    case "email.clicked":
      await supabase
        .from("email_sends")
        .update({ clicked_at: new Date().toISOString() })
        .eq("resend_id", resendId);
      break;

    case "email.bounced":
    case "email.complained": {
      const { data: send } = await supabase
        .from("email_sends")
        .select("enrollment_id, lead_id")
        .eq("resend_id", resendId)
        .single();

      const newStatus = event.type === "email.bounced" ? "bounced" : "complained";
      await supabase
        .from("email_sends")
        .update({ status: newStatus })
        .eq("resend_id", resendId);

      if (send?.enrollment_id) {
        await supabase
          .from("enrollments")
          .update({ status: "paused" })
          .eq("id", send.enrollment_id);
      }
      if (send?.lead_id) {
        await supabase
          .from("leads")
          .update({ status: "disqualified" })
          .eq("id", send.lead_id);
      }
      break;
    }

    case "email.sent":
    case "email.delivery_delayed":
      // noop
      break;
  }

  return NextResponse.json({ ok: true, type: event.type });
}
