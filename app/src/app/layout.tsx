import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "10XAI  AI Operating Systems for SMBs",
  description:
    "We find your demand. We build the systems that turn it into bookings, sales, and answered customers. English. Portugus. Espaol.",
  metadataBase: new URL("https://10xai.us"),
  openGraph: {
    title: "10XAI  AI Operating Systems for SMBs",
    description:
      "From pilot purgatory to production AI in 4 weeks. Trilingual. Operator-led.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_MX"],
  },
  icons: {
    icon: "/brand/favicon.svg",
  },
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
      </body>
    </html>
  );
}
