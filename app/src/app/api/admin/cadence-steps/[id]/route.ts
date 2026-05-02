import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import type { Database } from "@/lib/database.types";

type StepUpdate = Database["public"]["Tables"]["cadence_steps"]["Update"];

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const body = (await req.json()) as {
    subject?: string | null;
    body?: string;
    delay_days?: number;
    active?: boolean;
    step_number?: number;
  };

  const update: StepUpdate = {};
  if ("subject" in body) update.subject = body.subject || null;
  if ("body" in body && typeof body.body === "string") update.body = body.body;
  if ("delay_days" in body && typeof body.delay_days === "number") update.delay_days = body.delay_days;
  if ("active" in body && typeof body.active === "boolean") update.active = body.active;
  if ("step_number" in body && typeof body.step_number === "number") update.step_number = body.step_number;

  const { data, error } = await supabase
    .from("cadence_steps")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ step: data });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const { error } = await supabase.from("cadence_steps").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
