import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import type { Database } from "@/lib/database.types";

type TaskUpdate = Database["public"]["Tables"]["tasks"]["Update"];

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const body = (await req.json()) as {
    title?: string;
    description?: string | null;
    type?: string;
    status?: string;
    due_at?: string | null;
  };

  const update: TaskUpdate = {};
  if (typeof body.title === "string") update.title = body.title;
  if ("description" in body) update.description = body.description ?? null;
  if (typeof body.type === "string") update.type = body.type;
  if (typeof body.status === "string") {
    update.status = body.status;
    if (body.status === "done") {
      update.completed_at = new Date().toISOString();
    }
  }
  if ("due_at" in body) update.due_at = body.due_at ?? null;

  const { data, error } = await supabase
    .from("tasks")
    .update(update)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ task: data });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
