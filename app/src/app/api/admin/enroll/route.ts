import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import type { PlacesResult } from "@/app/admin/(protected)/find-leads/page";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json() as {
    place: PlacesResult;
    cadenceId: string;
    personaId: string | null;
    email: string | null;
  };

  const { place, cadenceId, personaId, email } = body;

  // Upsert lead
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .upsert(
      {
        place_id: place.place_id,
        business_name: place.business_name,
        address: place.address,
        city: place.city,
        state: place.state,
        phone: place.phone,
        website: place.website,
        rating: place.rating,
        review_count: place.review_count,
        category: place.category,
        email: email ?? null,
        persona_id: personaId ?? null,
        status: "enrolled",
      },
      { onConflict: "place_id" }
    )
    .select()
    .single();

  if (leadError) {
    return NextResponse.json({ error: leadError.message }, { status: 500 });
  }

  // Get first step to set next_send_at
  const { data: firstStep } = await supabase
    .from("cadence_steps")
    .select("delay_days")
    .eq("cadence_id", cadenceId)
    .order("step_number")
    .limit(1)
    .single();

  const nextSendAt = new Date();
  nextSendAt.setDate(nextSendAt.getDate() + (firstStep?.delay_days ?? 0));

  // Create enrollment
  const { data: enrollment, error: enrollError } = await supabase
    .from("enrollments")
    .upsert(
      {
        lead_id: lead.id,
        cadence_id: cadenceId,
        current_step: 0,
        status: "active",
        next_send_at: nextSendAt.toISOString(),
      },
      { onConflict: "lead_id,cadence_id" }
    )
    .select()
    .single();

  if (enrollError) {
    return NextResponse.json({ error: enrollError.message }, { status: 500 });
  }

  return NextResponse.json({ lead, enrollment });
}
