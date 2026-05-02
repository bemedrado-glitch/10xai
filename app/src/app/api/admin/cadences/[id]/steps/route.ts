import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: cadenceId } = await ctx.params;
  const body = (await req.json()) as {
    subject?: string | null;
    body?: string;
    delay_days?: number;
  };

  // Find the next step_number
  const { data: existing } = await supabase
    .from("cadence_steps")
    .select("step_number")
    .eq("cadence_id", cadenceId)
    .order("step_number", { ascending: false })
    .limit(1);

  const nextStepNumber = (existing?.[0]?.step_number ?? 0) + 1;

  const { data, error } = await supabase
    .from("cadence_steps")
    .insert({
      cadence_id: cadenceId,
      step_number: nextStepNumber,
      delay_days: body.delay_days ?? 3,
      subject: body.subject ?? "Following up — {business_name}",
      body:
        body.body ??
        "Hi {contact_name},\n\nQuick follow-up.\n\n— Bernardo\nBook 15 min: https://cal.com/10xai",
      type: "email",
      active: true,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ step: data });
}
