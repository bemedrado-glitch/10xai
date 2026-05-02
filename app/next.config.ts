import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/admin/research": ["./content/**/*"],
    "/admin/sales-plan": ["./content/**/*"],
  },
};

export default withNextIntl(nextConfig);
