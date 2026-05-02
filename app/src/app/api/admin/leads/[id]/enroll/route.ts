import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: leadId } = await ctx.params;
  const body = (await req.json()) as {
    cadenceId: string;
    personaId?: string | null;
  };

  if (!body.cadenceId) {
    return NextResponse.json({ error: "cadenceId required" }, { status: 400 });
  }

  // Compute next_send_at from first cadence step
  const { data: firstStep } = await supabase
    .from("cadence_steps")
    .select("delay_days")
    .eq("cadence_id", body.cadenceId)
    .order("step_number")
    .limit(1)
    .single();

  const nextSendAt = new Date();
  nextSendAt.setDate(nextSendAt.getDate() + (firstStep?.delay_days ?? 0));

  const { data: enrollment, error } = await supabase
    .from("enrollments")
    .upsert(
      {
        lead_id: leadId,
        cadence_id: body.cadenceId,
        current_step: 0,
        status: "active",
        next_send_at: nextSendAt.toISOString(),
      },
      { onConflict: "lead_id,cadence_id" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (body.personaId) {
    await supabase
      .from("leads")
      .update({ persona_id: body.personaId, status: "enrolled" })
      .eq("id", leadId);
  } else {
    await supabase.from("leads").update({ status: "enrolled" }).eq("id", leadId);
  }

  return NextResponse.json({ enrollment });
}
