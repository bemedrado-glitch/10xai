import { createClient } from "@/lib/supabase-server";
import SalesPlaybookClient from "./SalesPlaybookClient";
import type { Cadence, CadenceStep, Persona } from "@/lib/database.types";

export const revalidate = 0;

export default async function SalesPlaybookPage() {
  const supabase = await createClient();

  const { data: personas } = await supabase
    .from("personas")
    .select("*")
    .eq("active", true)
    .order("name");

  const { data: cadences } = await supabase
    .from("cadences")
    .select("*")
    .eq("active", true);

  const { data: steps } = await supabase
    .from("cadence_steps")
    .select("*")
    .order("step_number");

  return (
    <SalesPlaybookClient
      personas={(personas as Persona[]) ?? []}
      cadences={(cadences as Cadence[]) ?? []}
      steps={(steps as CadenceStep[]) ?? []}
    />
  );
}
