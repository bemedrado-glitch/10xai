import { createClient } from "@/lib/supabase-server";
import LeadsClient from "./LeadsClient";

export const revalidate = 0;

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return <LeadsClient initialLeads={leads ?? []} />;
}
