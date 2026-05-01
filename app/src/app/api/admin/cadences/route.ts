import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: cadences } = await supabase
    .from("cadences")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  return NextResponse.json({ cadences });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const { data: cadence, error: cadenceError } = await supabase
    .from("cadences")
    .insert({ name: body.name, description: body.description ?? null })
    .select()
    .single();

  if (cadenceError) return NextResponse.json({ error: cadenceError.message }, { status: 500 });

  const steps = (body.steps ?? []).map(
    (s: { step_number: number; delay_days: number; subject?: string; body: string }) => ({
      cadence_id: cadence.id,
      step_number: s.step_number,
      delay_days: s.delay_days,
      subject: s.subject ?? null,
      body: s.body,
    })
  );

  const { data: stepsData, error: stepsError } = steps.length
    ? await supabase.from("cadence_steps").insert(steps).select()
    : { data: [], error: null };

  if (stepsError) return NextResponse.json({ error: stepsError.message }, { status: 500 });

  return NextResponse.json({ cadence, steps: stepsData });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase.from("cadences").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
