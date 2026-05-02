// Curated Google Places primary types, grouped for SMB outreach.
// Each entry: { value: Places primaryType, label: human-friendly name }
export type BusinessCategory = { value: string; label: string };

export const BUSINESS_CATEGORY_GROUPS: { group: string; items: BusinessCategory[] }[] = [
  {
    group: "Food & Beverage",
    items: [
      { value: "restaurant", label: "Restaurant" },
      { value: "cafe", label: "Café" },
      { value: "bakery", label: "Bakery" },
      { value: "bar", label: "Bar" },
      { value: "coffee_shop", label: "Coffee Shop" },
      { value: "ice_cream_shop", label: "Ice Cream Shop" },
      { value: "pizza_restaurant", label: "Pizzeria" },
      { value: "fast_food_restaurant", label: "Fast Food" },
    ],
  },
  {
    group: "Beauty & Wellness",
    items: [
      { value: "beauty_salon", label: "Beauty Salon" },
      { value: "hair_salon", label: "Hair Salon" },
      { value: "barber_shop", label: "Barber Shop" },
      { value: "nail_salon", label: "Nail Salon" },
      { value: "spa", label: "Spa" },
      { value: "massage", label: "Massage Therapist" },
      { value: "tattoo_parlor", label: "Tattoo Parlor" },
    ],
  },
  {
    group: "Health & Fitness",
    items: [
      { value: "gym", label: "Gym" },
      { value: "yoga_studio", label: "Yoga Studio" },
      { value: "fitness_center", label: "Fitness Center" },
      { value: "personal_trainer", label: "Personal Trainer" },
      { value: "physiotherapist", label: "Physiotherapist" },
      { value: "chiropractor", label: "Chiropractor" },
    ],
  },
  {
    group: "Medical",
    items: [
      { value: "dentist", label: "Dentist" },
      { value: "doctor", label: "Doctor" },
      { value: "veterinary_care", label: "Veterinarian" },
      { value: "pharmacy", label: "Pharmacy" },
      { value: "optometrist", label: "Optometrist" },
    ],
  },
  {
    group: "Professional Services",
    items: [
      { value: "lawyer", label: "Lawyer" },
      { value: "accountant", label: "Accountant" },
      { value: "real_estate_agency", label: "Real Estate Agency" },
      { value: "insurance_agency", label: "Insurance Agency" },
      { value: "financial_planner", label: "Financial Planner" },
      { value: "consultant", label: "Consultant" },
    ],
  },
  {
    group: "Home & Trades",
    items: [
      { value: "plumber", label: "Plumber" },
      { value: "electrician", label: "Electrician" },
      { value: "general_contractor", label: "General Contractor" },
      { value: "roofing_contractor", label: "Roofing Contractor" },
      { value: "hvac_contractor", label: "HVAC Contractor" },
      { value: "landscaper", label: "Landscaper" },
      { value: "house_cleaning_service", label: "House Cleaning" },
      { value: "moving_company", label: "Moving Company" },
      { value: "pest_control_service", label: "Pest Control" },
    ],
  },
  {
    group: "Auto",
    items: [
      { value: "car_repair", label: "Auto Repair" },
      { value: "car_dealer", label: "Car Dealer" },
      { value: "car_wash", label: "Car Wash" },
      { value: "tire_shop", label: "Tire Shop" },
    ],
  },
  {
    group: "Retail & Other",
    items: [
      { value: "florist", label: "Florist" },
      { value: "pet_store", label: "Pet Store" },
      { value: "clothing_store", label: "Clothing Store" },
      { value: "jewelry_store", label: "Jewelry Store" },
      { value: "furniture_store", label: "Furniture Store" },
      { value: "photographer", label: "Photographer" },
      { value: "wedding_venue", label: "Wedding Venue" },
      { value: "event_planner", label: "Event Planner" },
    ],
  },
];

export const ALL_BUSINESS_CATEGORIES: BusinessCategory[] =
  BUSINESS_CATEGORY_GROUPS.flatMap((g) => g.items);

export function categoryLabel(value: string | null | undefined): string {
  if (!value) return "";
  const found = ALL_BUSINESS_CATEGORIES.find((c) => c.value === value);
  if (found) return found.label;
  return value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
