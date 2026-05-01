import { createClient } from "@/lib/supabase-server";
import PersonasClient from "./PersonasClient";

export const revalidate = 0;

export default async function PersonasPage() {
  const supabase = await createClient();
  const { data: personas } = await supabase
    .from("personas")
    .select("*")
    .order("created_at", { ascending: false });

  return <PersonasClient initialPersonas={personas ?? []} />;
}
