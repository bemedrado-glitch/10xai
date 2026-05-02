// Cal.com booking helpers — used by the "Book meeting" button on the lead detail page.
// 10XAI's Cal.com URL is `cal.com/10xai`. Cal.com supports prefilling fields via query params.

const CAL_BASE = "https://cal.com/10xai";

export function buildCalUrl(opts: {
  name?: string | null;
  email?: string | null;
  notes?: string | null;
}): string {
  const params = new URLSearchParams();
  if (opts.name) params.set("name", opts.name);
  if (opts.email) params.set("email", opts.email);
  if (opts.notes) params.set("notes", opts.notes);
  const qs = params.toString();
  return qs ? `${CAL_BASE}?${qs}` : CAL_BASE;
}

export function bookMeetingNotes(business: string | null | undefined): string {
  return business ? `Discovery call — ${business}` : "Discovery call";
}
