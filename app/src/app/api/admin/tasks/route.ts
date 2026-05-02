import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status");
  const leadId = searchParams.get("lead_id");

  let query = supabase
    .from("tasks")
    .select("*")
    .order("due_at", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);
  if (leadId) query = query.eq("lead_id", leadId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tasks: data ?? [] });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as {
    title: string;
    description?: string | null;
    type?: string;
    lead_id?: string | null;
    due_at?: string | null;
    days_from_now?: number;
  };

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }

  let dueAt: string | null = body.due_at ?? null;
  if (!dueAt && typeof body.days_from_now === "number") {
    const d = new Date();
    d.setDate(d.getDate() + body.days_from_now);
    dueAt = d.toISOString();
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: body.title.trim(),
      description: body.description ?? null,
      type: body.type ?? "general",
      lead_id: body.lead_id ?? null,
      due_at: dueAt,
      status: "open",
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ task: data });
}
