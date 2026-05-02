import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import LeadDetailClient from "./LeadDetailClient";
import type { Persona, Cadence } from "@/lib/database.types";

export const revalidate = 0;

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: lead } = await supabase.from("leads").select("*").eq("id", id).single();
  if (!lead) notFound();

  const { data: personas } = await supabase
    .from("personas")
    .select("*")
    .order("name");

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, cadence_id, current_step, status, next_send_at, created_at")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

  const { data: cadences } = await supabase.from("cadences").select("*");

  const { data: sends } = await supabase
    .from("email_sends")
    .select("id, sent_at, subject, status, opened_at, replied_at")
    .eq("lead_id", id)
    .order("sent_at", { ascending: false });

  return (
    <LeadDetailClient
      lead={lead}
      personas={(personas as Persona[]) ?? []}
      cadences={(cadences as Cadence[]) ?? []}
      initialEnrollments={enrollments ?? []}
      sends={sends ?? []}
    />
  );
}
