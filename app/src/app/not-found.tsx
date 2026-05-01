import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", background: "#FAFAF9", display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#CA8A04" }}>404</p>
        <h1 style={{ marginTop: "0.75rem", fontSize: "2.5rem", fontWeight: 900, color: "#1C1917" }}>Page not found.</h1>
        <p style={{ marginTop: "1rem", color: "#57534E" }}>This page doesn&apos;t exist or was moved.</p>
        <Link href="/" style={{ marginTop: "2rem", display: "inline-flex", alignItems: "center", padding: "0.625rem 1.75rem", borderRadius: "0.5rem", background: "#CA8A04", color: "#FAFAF9", fontWeight: 700, textDecoration: "none" }}>
          Back to home
        </Link>
      </body>
    </html>
  );
}
