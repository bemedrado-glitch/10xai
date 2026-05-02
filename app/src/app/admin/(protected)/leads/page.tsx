import { createClient } from "@/lib/supabase-server";
import LeadsClient from "./LeadsClient";

export const revalidate = 0;

export default async function LeadsPage() {
  const supabase = await createClient();
  // Only qualified leads — must have at least email or phone.
  // Anything else is an orphan from older Find Leads searches and is
  // counted out of analytics too. Use the "Clean orphans" action in
  // Find Leads to permanently delete them.
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .or("email.not.is.null,phone.not.is.null")
    .order("created_at", { ascending: false })
    .limit(2000);

  return <LeadsClient initialLeads={leads ?? []} />;
}
