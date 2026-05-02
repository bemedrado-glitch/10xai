import { createClient } from "@/lib/supabase-server";
import TasksClient from "./TasksClient";
import type { Lead, Task } from "@/lib/database.types";

export const revalidate = 0;

export default async function TasksPage() {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .order("status", { ascending: true })
    .order("due_at", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  const leadIds = Array.from(
    new Set((tasks ?? []).map((t) => t.lead_id).filter((id): id is string => Boolean(id)))
  );

  const { data: leads } = leadIds.length
    ? await supabase.from("leads").select("id, business_name, email, phone, website").in("id", leadIds)
    : { data: [] as Pick<Lead, "id" | "business_name" | "email" | "phone" | "website">[] };

  return (
    <TasksClient
      initialTasks={(tasks as Task[]) ?? []}
      leadsLite={(leads as Pick<Lead, "id" | "business_name" | "email" | "phone" | "website">[]) ?? []}
    />
  );
}
