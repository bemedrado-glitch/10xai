import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabase } from "@supabase/supabase-js";
import { Resend } from "resend";
import type { Database } from "@/lib/database.types";
import { buildVars, renderCadenceEmail } from "@/lib/email-template";

const REPLY_TO = "contato10xai@gmail.com";
const FROM = "Bernardo Medrado <contact@10xai.us>";
const UNSUBSCRIBE_MAILTO = `mailto:${REPLY_TO}?subject=Unsubscribe`;

// Hourly cron — processes all active enrollments due to send.
export async function GET(req: NextRequest) {
  const secret = req.headers.get("authorization");
  if (secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const resend = new Resend(process.env.RESEND_API_KEY);

  const now = new Date().toISOString();

  const { data: enrollments, error } = await supabase
    .from("enrollments")
    .select("id, current_step, cadence_id, lead_id")
    .eq("status", "active")
    .lte("next_send_at", now);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let sent = 0;
  let completed = 0;
  let skipped = 0;

  for (const enrollment of enrollments ?? []) {
    // Fetch lead
    const { data: lead } = await supabase
      .from("leads")
      .select("*")
      .eq("id", enrollment.lead_id)
      .single();

    if (!lead?.email) {
      await supabase
        .from("enrollments")
        .update({ status: "paused" })
        .eq("id", enrollment.id);
      skipped++;
      continue;
    }

    const nextStepNumber = enrollment.current_step + 1;

    const { data: step } = await supabase
      .from("cadence_steps")
      .select("*")
      .eq("cadence_id", enrollment.cadence_id)
      .eq("step_number", nextStepNumber)
      .eq("active", true)
      .single();

    if (!step) {
      await supabase
        .from("enrollments")
        .update({ status: "completed" })
        .eq("id", enrollment.id);
      completed++;
      continue;
    }

    // Render the email — interpolates ALL variables, builds rich HTML + plain text
    const rendered = renderCadenceEmail({
      subject: step.subject ?? `Following up — ${lead.business_name}`,
      body: step.body,
      vars: buildVars(lead),
      unsubscribeMailto: UNSUBSCRIBE_MAILTO,
    });

    let resendId: string | null = null;
    let sendStatus: string = "sent";

    try {
      const result = await resend.emails.send({
        from: FROM,
        to: lead.email,
        replyTo: REPLY_TO,
        subject: rendered.subject,
        html: rendered.html,
        text: rendered.text,
        headers: {
          "List-Unsubscribe": `<${UNSUBSCRIBE_MAILTO}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
      resendId = result.data?.id ?? null;
    } catch {
      sendStatus = "failed";
    }

    await supabase.from("email_sends").insert({
      enrollment_id: enrollment.id,
      step_id: step.id,
      lead_id: lead.id,
      to_email: lead.email,
      subject: rendered.subject,
      resend_id: resendId,
      status: sendStatus,
    });

    const { data: followingStep } = await supabase
      .from("cadence_steps")
      .select("delay_days")
      .eq("cadence_id", enrollment.cadence_id)
      .eq("step_number", nextStepNumber + 1)
      .eq("active", true)
      .single();

    if (followingStep) {
      const nextSend = new Date();
      nextSend.setDate(nextSend.getDate() + followingStep.delay_days);
      await supabase
        .from("enrollments")
        .update({ current_step: nextStepNumber, next_send_at: nextSend.toISOString() })
        .eq("id", enrollment.id);
    } else {
      await supabase
        .from("enrollments")
        .update({ current_step: nextStepNumber, status: "completed" })
        .eq("id", enrollment.id);
      completed++;
    }

    if (sendStatus === "sent") sent++;
  }

  return NextResponse.json({ sent, completed, skipped, total: enrollments?.length ?? 0 });
}
