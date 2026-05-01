import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt", "es"],
  defaultLocale: "en",
  // English at /, Portuguese at /pt, Spanish at /es. No prefix on default.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
