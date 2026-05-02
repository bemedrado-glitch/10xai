import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

type PlacePayload = {
  place_id: string;
  business_name: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string | null;
  website?: string | null;
  rating?: number | null;
  review_count?: number | null;
  category?: string | null;
};

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as {
    place: PlacePayload;
    email?: string | null;
    phone?: string | null;
    contact_name?: string | null;
    persona_id?: string | null;
  };

  const email = body.email ?? null;
  const phone = body.phone ?? body.place.phone ?? null;

  if (!email && !phone) {
    return NextResponse.json(
      { error: "Lead must have email or phone before saving." },
      { status: 400 }
    );
  }

  const { data: lead, error } = await supabase
    .from("leads")
    .upsert(
      {
        place_id: body.place.place_id,
        business_name: body.place.business_name,
        address: body.place.address ?? null,
        city: body.place.city ?? null,
        state: body.place.state ?? null,
        phone,
        website: body.place.website ?? null,
        rating: body.place.rating ?? null,
        review_count: body.place.review_count ?? null,
        category: body.place.category ?? null,
        email,
        contact_name: body.contact_name ?? null,
        persona_id: body.persona_id ?? null,
        status: "new",
      },
      { onConflict: "place_id" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead });
}

// Delete orphan leads (no email, no phone, not enrolled anywhere)
export async function DELETE(_req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: enrolled } = await supabase
    .from("enrollments")
    .select("lead_id");
  const enrolledIds = new Set((enrolled ?? []).map((e) => e.lead_id));

  const { data: candidates } = await supabase
    .from("leads")
    .select("id")
    .is("email", null)
    .is("phone", null);

  const orphans = (candidates ?? []).map((l) => l.id).filter((id) => !enrolledIds.has(id));
  if (orphans.length === 0) return NextResponse.json({ deleted: 0 });

  const { error } = await supabase.from("leads").delete().in("id", orphans);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: orphans.length });
}

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const status = req.nextUrl.searchParams.get("status");
  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);

  const { data: leads } = await query;
  return NextResponse.json({ leads });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const body = await req.json();
  const { data: lead, error } = await supabase
    .from("leads")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead });
}
