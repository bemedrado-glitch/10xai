import { createClient } from "@/lib/supabase-server";
import EnrollmentsClient from "./EnrollmentsClient";
import type { Cadence, CadenceStep, Lead } from "@/lib/database.types";

export const revalidate = 0;

export default async function EnrollmentsPage() {
  const supabase = await createClient();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, lead_id, cadence_id, current_step, status, next_send_at, created_at")
    .order("created_at", { ascending: false });

  const leadIds = Array.from(new Set((enrollments ?? []).map((e) => e.lead_id)));
  const cadenceIds = Array.from(new Set((enrollments ?? []).map((e) => e.cadence_id)));

  const [{ data: leads }, { data: cadences }, { data: steps }] = await Promise.all([
    leadIds.length
      ? supabase.from("leads").select("*").in("id", leadIds)
      : Promise.resolve({ data: [] as Lead[] }),
    cadenceIds.length
      ? supabase.from("cadences").select("*").in("id", cadenceIds)
      : Promise.resolve({ data: [] as Cadence[] }),
    cadenceIds.length
      ? supabase
          .from("cadence_steps")
          .select("id, cadence_id, step_number, subject, delay_days")
          .in("cadence_id", cadenceIds)
      : Promise.resolve({ data: [] as CadenceStep[] }),
  ]);

  return (
    <EnrollmentsClient
      initialEnrollments={enrollments ?? []}
      leads={(leads as Lead[]) ?? []}
      cadences={(cadences as Cadence[]) ?? []}
      steps={(steps as CadenceStep[]) ?? []}
    />
  );
}
