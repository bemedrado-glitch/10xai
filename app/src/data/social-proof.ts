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
/**
 * Sample-format testimonials  realistic voice, clearly-placeholder
 * attribution. The structure is exactly what a real client quote will
 * look like once the disclosure flag is flipped to false.
 *
 * IMPORTANT: Names are intentionally written as role-and-vertical
 * placeholders (e.g., "Owner, Dental Group  4 locations  NC, US")
 * so visitors can immediately tell they aren't named endorsements.
 * This stays compliant with FTC endorsement rules, LGPD, and
 * equivalent consumer-protection laws across LatAm.
 *
 * Replace with real client quotes (with written consent) when first
 * case studies sign  same shape, just real names.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We&apos;d burned cash on three AI vendors and had nothing running. 10XAI shipped the booking + customer-service agent in four weeks. WhatsApp response time went from three hours to under two minutes  no extra hires.",
    name: "Owner",
    role: "Dental Group  4 locations",
    company: "Raleigh-Durham, NC",
    rating: 5,
  },
  {
    quote:
      "Our SDRs were spending 60% of their day on research and follow-ups. The Sales Engine took that work over and now books 1012 qualified meetings a week into our calendar  while the team focuses on closing.",
    name: "Head of Sales",
    role: "B2B SaaS  series A",
    company: "Austin, TX",
    rating: 5,
  },
  {
    quote:
      "Bernardo&apos;s team replaced four SaaS subscriptions and our outsourced answering service with one Care Engine. We cut $1,800/month in tooling and stopped losing leads after-hours.",
    name: "Founder",
    role: "Beauty Studio  3 locations",
    company: "So Paulo, Brasil",
    rating: 5,
  },
  {
    quote:
      "I&apos;ve sat through every AI consultancy pitch in Mexico City. 10XAI was the only one that actually delivered a working system instead of a 30-page deck. The fact that Bernardo runs it in Spanish made the discovery weeks honest, not translated.",
    name: "Managing Partner",
    role: "Accounting Firm  midsize",
    company: "CDMX, Mxico",
    rating: 5,
  },
  {
    quote:
      "Our RFP response cycle dropped from 11 days to 3. The Bid Engine surfaces the risk and competition in minutes, drafts a real first response from our past wins, and our senior people only step in to refine. Win rate up 22% so far this quarter.",
    name: "Director of Proposals",
    role: "IT Services Firm",
    company: "Miami, FL",
    rating: 5,
  },
  {
    quote:
      "We&apos;d been hiring slowly because onboarding ate three weeks per new rep. Mind Engine consolidated everything in our Notion + Slack into a single AI tutor. New hires are productive in week 1.",
    name: "COO",
    role: "Marketing Agency  20+ team",
    company: "Bogot, Colombia",
    rating: 5,
  },
];
export const TESTIMONIALS_ARE_PLACEHOLDER = true;
