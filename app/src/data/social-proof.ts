/**
 * Social proof data  logos and testimonials.
 *
 * IMPORTANT: Until Bernardo has real, verified case studies to publish,
 * the entries below are clearly flagged as examples or sample-format
 * placeholders so the site stays honest. The pattern matches the
 * original 10xai.us footer disclosure: "Examples of the operators we
 * serve, not current 10XAI clients."
 *
 * To go live with real social proof:
 *   1. Replace `LOGOS` with verified clients (require written consent)
 *   2. Replace `TESTIMONIALS` with quotes from real engagements
 *   3. Set `LOGOS_ARE_EXAMPLES = false` and `TESTIMONIALS_ARE_PLACEHOLDER = false`
 *   4. The disclosure bands disappear automatically.
 */

export type Logo = {
  name: string;
  src?: string;
  alt?: string;
  href?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  location?: string;
  /** 25 stars; omit if not applicable. */
  rating?: number;
};

// ---------------------------------------------------------------------------
// Logos  text-wordmark fallback when no image is provided.
// These are public businesses cited in the original 10xai.us as examples
// of the kind of operator 10XAI serves. NOT current 10XAI clients.
// ---------------------------------------------------------------------------
export const LOGOS: Logo[] = [
  { name: "Dental Depot" },
  { name: "Contsimples" },
  { name: "Contabiliza Brasil" },
  { name: "MIMARCA" },
  { name: "PyeM Mensajera" },
  { name: "Small Marketing Agency" },
];
export const LOGOS_ARE_EXAMPLES = true;

// ---------------------------------------------------------------------------
// Testimonials  sample-format placeholders. Replace with real quotes from
// signed clients before launch. Setting `TESTIMONIALS_ARE_PLACEHOLDER` to
// false will hide the disclosure band.
// ---------------------------------------------------------------------------
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Sample format  this is where a real client quote will appear. The structure is ready. The first case studies launch Q2 2026.",
    name: "[Real client name]",
    role: "[Real role]",
    company: "[Real company]",
    location: "[City, Country]",
    rating: 5,
  },
  {
    quote:
      "Sample format  the second carousel slot. The 10XAI engagement template includes a written-consent step before any quote goes here.",
    name: "[Real client name]",
    role: "[Real role]",
    company: "[Real company]",
    location: "[City, Country]",
    rating: 5,
  },
  {
    quote:
      "Sample format  the third carousel slot. Empty entries are hidden automatically, so launching with one real testimonial is fine.",
    name: "[Real client name]",
    role: "[Real role]",
    company: "[Real company]",
    location: "[City, Country]",
    rating: 5,
  },
];
export const TESTIMONIALS_ARE_PLACEHOLDER = true;
