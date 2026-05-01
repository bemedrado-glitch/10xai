import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lighthouse Live Demo  10XAI",
  description:
    "Paste any local business URL. Watch us build them a website in 60 seconds. The same Lighthouse pipeline we run on prospects every week.",
  openGraph: {
    title: "Lighthouse Live Demo  10XAI",
    description:
      "Find local businesses with proven demand. Ship them a website. Reach out  and close.",
    images: [
      {
        url: "/images/og-lighthouse.png",
        width: 1200,
        height: 630,
        alt: "10XAI Lighthouse  We find local businesses with great reviews. We ship them websites.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lighthouse Live Demo  10XAI",
    description:
      "Find local businesses with proven demand. Ship them a website. Reach out  and close.",
    images: ["/images/og-lighthouse.png"],
  },
};

export default function LighthouseDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
