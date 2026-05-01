"use client";

/**
 * Hero background — video with CSS fallback.
 *
 * Drop a video file at /public/videos/hero-bg.mp4 to enable.
 * The CSS-only fallback (animated gold spotlight on ink) renders
 * if no video is available, so the hero looks premium either way.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--color-ink)]">
      {/* Video layer — graceful fail if file missing */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
        poster="/brand/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* CSS overlay: dark vignette + gold spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(202, 138, 4, 0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(202, 138, 4, 0.12) 0%, transparent 55%), linear-gradient(180deg, rgba(12, 10, 9, 0.65) 0%, rgba(12, 10, 9, 0.85) 100%)",
          animation: "heroSpotlight 12s ease-in-out infinite",
        }}
      />

      {/* Subtle dot grid pattern for depth */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FAFAF9 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes heroSpotlight {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="heroSpotlight"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
