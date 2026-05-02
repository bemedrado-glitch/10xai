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

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  BR: "Brazil",
  MX: "Mexico",
  CO: "Colombia",
  AR: "Argentina",
  CL: "Chile",
  PE: "Peru",
  PR: "Puerto Rico",
};

// When the user picks a country with no state/city, fan out across these metros
// and aggregate. This works around the Places API limit of ~20 results per query
// for over-broad textSearch queries like "bakery in United States".
const COUNTRY_FAN_OUT_CITIES: Record<string, string[]> = {
  US: [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Dallas, TX",
    "Atlanta, GA",
    "Miami, FL",
    "Charlotte, NC",
    "Austin, TX",
    "Seattle, WA",
    "Denver, CO",
    "Boston, MA",
    "San Diego, CA",
    "Tampa, FL",
  ],
  BR: [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Brasília",
    "Curitiba",
    "Porto Alegre",
    "Salvador",
    "Fortaleza",
    "Recife",
    "Florianópolis",
  ],
  MX: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Querétaro"],
  CO: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"],
  AR: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"],
  CL: ["Santiago", "Valparaíso", "Concepción", "Viña del Mar"],
  PE: ["Lima", "Arequipa", "Trujillo"],
  PR: ["San Juan", "Bayamón", "Ponce"],
};

type RawPlace = Record<string, unknown>;

async function searchOnePlacesQuery(
  query: string,
  options: { country: string; category: string }
): Promise<RawPlace[]> {
  const body: Record<string, unknown> = {
    textQuery: query,
    maxResultCount: 20,
    languageCode: "en",
    regionCode: options.country,
  };
  if (options.category) body.includedType = options.category;

  const res = await fetch(PLACES_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY!,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) return [];
  const data = await res.json();
  return (data.places ?? []) as RawPlace[];
}

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q") ?? "";
  const country = searchParams.get("country") ?? "US";
  const city = searchParams.get("city") ?? "";
  const state = searchParams.get("state") ?? "";
  const category = searchParams.get("category") ?? "";
  const noWebsite = searchParams.get("noWebsite") === "1";
  const minRating = parseFloat(searchParams.get("minRating") ?? "4.5");
  const minReviews = parseInt(searchParams.get("minReviews") ?? "0", 10);

  const categoryWord = category ? category.replace(/_/g, " ") : "businesses";
  const fanOutMode = !city && !state;

  let aggregated: RawPlace[] = [];

  if (fanOutMode) {
    // Country-only search: hit major metros in parallel and aggregate.
    const cities = COUNTRY_FAN_OUT_CITIES[country] ?? [];
    const queries = cities.length > 0
      ? cities.map((c) => q || `${categoryWord} in ${c}`)
      : [q || `${categoryWord} in ${COUNTRY_NAMES[country] ?? country}`];

    const batches = await Promise.all(
      queries.map((query) => searchOnePlacesQuery(query, { country, category }))
    );
    aggregated = batches.flat();
  } else {
    // Specific city/state — single query as before.
    const locationBits = [city, state].filter(Boolean).join(", ");
    const query = q || `${categoryWord} in ${locationBits}`;
    aggregated = await searchOnePlacesQuery(query, { country, category });
  }

  // Dedupe by place id
  const seen = new Set<string>();
  const unique = aggregated.filter((p) => {
    const id = (p.id as string) ?? "";
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  // Apply user filters
  const results = unique
    .filter((p) => {
      const rating = (p.rating as number) ?? 0;
      const reviews = (p.userRatingCount as number) ?? 0;
      const hasWebsite = Boolean(p.websiteUri);
      if (rating < minRating) return false;
      if (reviews < minReviews) return false;
      if (noWebsite && hasWebsite) return false;
      return p.businessStatus === "OPERATIONAL" || !p.businessStatus;
    })
    // Highest rating × log(review count) first — surfaces high-quality matches before
    // we truncate to the user-visible ceiling.
    .sort((a, b) => {
      const score = (p: RawPlace) =>
        ((p.rating as number) ?? 0) * Math.log(((p.userRatingCount as number) ?? 0) + 1);
      return score(b) - score(a);
    })
    .slice(0, 60)
    .map((p) => {
      const address = (p.formattedAddress as string) ?? "";
      const components =
        (p.addressComponents as Array<{ longText: string; types: string[] }>) ?? [];
      const cityComp = components.find((c) => c.types.includes("locality"));
      const stateComp = components.find((c) => c.types.includes("administrative_area_level_1"));

      return {
        place_id: (p.id as string) ?? "",
        business_name: ((p.displayName as { text: string })?.text) ?? "",
        address,
        city: cityComp?.longText ?? city,
        state: stateComp?.longText ?? state,
        phone:
          (p.nationalPhoneNumber as string) ?? (p.internationalPhoneNumber as string) ?? null,
        website: (p.websiteUri as string) ?? null,
        rating: (p.rating as number) ?? 0,
        review_count: (p.userRatingCount as number) ?? 0,
        category: (p.primaryType as string) ?? null,
      };
    });

  return NextResponse.json({
    results,
    debug: {
      mode: fanOutMode ? "fan-out" : "single",
      raw_count: aggregated.length,
      unique_count: unique.length,
      filtered_count: results.length,
    },
  });
}
