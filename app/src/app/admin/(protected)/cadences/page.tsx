import { createClient } from "@/lib/supabase-server";
import CadencesClient from "./CadencesClient";
import type { CadenceStep } from "@/lib/database.types";

export const revalidate = 0;

export default async function CadencesPage() {
  const supabase = await createClient();

  const { data: cadences } = await supabase
    .from("cadences")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: steps } = await supabase
    .from("cadence_steps")
    .select("*")
    .order("step_number");

  const stepsByC: Record<string, CadenceStep[]> = {};
  for (const s of steps ?? []) {
    (stepsByC[s.cadence_id] ??= []).push(s);
  }

  const cadencesWithSteps = (cadences ?? []).map((c) => ({
    ...c,
    cadence_steps: stepsByC[c.id] ?? [],
  }));

  return <CadencesClient initialCadences={cadencesWithSteps} />;
}
