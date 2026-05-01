import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { BernieChat } from "@/components/BernieChat";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://10xai.us";
const SITE_NAME = "10XAI";
const SITE_TITLE = "10XAI  Custom AI Operating Systems for SMBs";
const SITE_DESCRIPTION =
  "Custom AI agents that run your sales, support, and operations. Built around your business, not a generic template. Trilingual: English, Portugus, Espaol.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0C0A09" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0A09" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s  10XAI",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "AI agency",
    "AI agents",
    "AI Operating Systems",
    "SMB AI",
    "AI SDR",
    "AI customer service",
    "AI for small business",
    "Lighthouse",
    "AI consulting",
    "Bernardo Medrado",
    "Brazil",
    "Latin America",
    "trilingual AI",
  ],
  authors: [{ name: "Bernardo Medrado" }],
  creator: "Bernardo Medrado",
  publisher: "10XAI",
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/logo-monogram.svg",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      // PT/ES paths reserved for when i18n routes ship
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_MX"],
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "10XAI  Custom AI agents that run your business.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@bernardomedrado",
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Technology",
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "10XAI",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/logo-monogram.svg`,
        width: 128,
        height: 128,
      },
      description: SITE_DESCRIPTION,
      foundingDate: "2023",
      founder: {
        "@type": "Person",
        name: "Bernardo Medrado",
        url: "https://www.linkedin.com/in/bernardo-medrado-05369a21/",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Apex",
        addressRegion: "NC",
        addressCountry: "US",
      },
      email: "contato10xai@gmail.com",
      sameAs: [
        "https://www.linkedin.com/company/10xaiconsultoria/",
      ],
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Brazil" },
        { "@type": "Country", name: "Mexico" },
        { "@type": "Country", name: "Colombia" },
        { "@type": "Country", name: "Argentina" },
        { "@type": "Country", name: "Chile" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en-US", "pt-BR", "es-MX"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "10XAI  Custom AI Operating Systems",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ["United States", "Brazil", "Mexico", "Latin America"],
      serviceType: [
        "AI agent development",
        "AI sales automation",
        "AI customer service",
        "AI marketing automation",
        "AI training and onboarding",
        "RFP intelligence",
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Small and medium businesses (SMBs)",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <BernieChat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </body>
    </html>
  );
}
