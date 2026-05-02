import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, cadence_id, current_step, status, next_send_at, created_at")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

  const { data: sends } = await supabase
    .from("email_sends")
    .select("id, sent_at, subject, status, opened_at, replied_at")
    .eq("lead_id", id)
    .order("sent_at", { ascending: false });

  return NextResponse.json({ lead, enrollments: enrollments ?? [], sends: sends ?? [] });
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const body = (await req.json()) as {
    email?: string | null;
    phone?: string | null;
    contact_name?: string | null;
    contact_title?: string | null;
    linkedin_url?: string | null;
    notes?: string | null;
    status?: string;
    persona_id?: string | null;
  };

  const { data: lead, error } = await supabase
    .from("leads")
    .update(body)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  // Enrollments + email_sends cascade-delete via FK ON DELETE CASCADE
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
