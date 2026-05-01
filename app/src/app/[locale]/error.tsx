"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const tCommon = useTranslations("common");

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: "#FAFAF9",
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#CA8A04" }}>
        500
      </p>
      <h1 style={{ marginTop: "0.75rem", fontSize: "2rem", fontWeight: 900, color: "#1C1917" }}>
        Something went wrong.
      </h1>
      <p style={{ marginTop: "1rem", color: "#57534E", maxWidth: "28rem" }}>
        An unexpected error occurred. You can try again or go back home.
      </p>
      <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.625rem 1.75rem",
            borderRadius: "0.5rem",
            background: "#CA8A04",
            color: "#FAFAF9",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.625rem 1.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #A8A29E",
            color: "#1C1917",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          {tCommon("ctaBackHome")}
        </Link>
      </div>
      {error.digest && (
        <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#A8A29E" }}>
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
