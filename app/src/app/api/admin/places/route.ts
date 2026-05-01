import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

const PLACES_API = "https://places.googleapis.com/v1/places:searchText";
const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.rating",
  "places.userRatingCount",
  "places.websiteUri",
  "places.businessStatus",
  "places.primaryType",
  "places.addressComponents",
].join(",");

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q") ?? "";
  const city = searchParams.get("city") ?? "";
  const state = searchParams.get("state") ?? "";
  const category = searchParams.get("category") ?? "";
  const noWebsite = searchParams.get("noWebsite") === "1";
  const minRating = parseFloat(searchParams.get("minRating") ?? "4.5");

  const query = q || [category.replace(/_/g, " "), "in", city, state]
    .filter(Boolean)
    .join(" ");

  const body: Record<string, unknown> = {
    textQuery: query,
    maxResultCount: 20,
    languageCode: "en",
  };
  if (category) body.includedType = category;

  const res = await fetch(PLACES_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY!,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err.error?.message ?? "Places API error" }, { status: 502 });
  }

  const data = await res.json();
  const places = (data.places ?? []) as Record<string, unknown>[];

  const results = places
    .filter((p) => {
      const rating = (p.rating as number) ?? 0;
      const hasWebsite = Boolean(p.websiteUri);
      if (rating < minRating) return false;
      if (noWebsite && hasWebsite) return false;
      return p.businessStatus === "OPERATIONAL" || !p.businessStatus;
    })
    .map((p) => {
      const address = p.formattedAddress as string ?? "";
      const components = (p.addressComponents as Array<{longText: string; types: string[]}>) ?? [];
      const cityComp = components.find((c) => c.types.includes("locality"));
      const stateComp = components.find((c) => c.types.includes("administrative_area_level_1"));

      return {
        place_id: (p.id as string) ?? "",
        business_name: ((p.displayName as { text: string })?.text) ?? "",
        address,
        city: cityComp?.longText ?? city,
        state: stateComp?.longText ?? state,
        phone: (p.nationalPhoneNumber as string) ?? (p.internationalPhoneNumber as string) ?? null,
        website: (p.websiteUri as string) ?? null,
        rating: (p.rating as number) ?? 0,
        review_count: (p.userRatingCount as number) ?? 0,
        category: (p.primaryType as string) ?? null,
      };
    });

  return NextResponse.json({ results });
}
