"use client";

/**
 * Hero background  brand logo animation video with cinematic overlay.
 *
 * The video is the brand mark itself, so we let it dominate the visual:
 *   - Full opacity playback
 *   - Right-biased composition (logo lives in negative space, copy on the left)
 *   - Side gradient ensures hero text stays AAA-readable on the left
 *   - Subtle gold accent + dot-grid for depth
 *   - Reduced-motion users see the static poster + CSS fallback only
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--color-ink)]">
      {/* Brand logo animation  hidden <md to save 1.6MB on slow LatAm 4G */}
      <video
        className="absolute inset-0 hidden h-full w-full object-cover opacity-90 motion-reduce:hidden md:block"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/hero-logo-animation.mp4" type="video/mp4" />
      </video>

      {/* Reading-side gradient  ensures left-aligned copy stays AAA-readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(12, 10, 9, 0.85) 0%, rgba(12, 10, 9, 0.55) 45%, rgba(12, 10, 9, 0.15) 75%, rgba(12, 10, 9, 0.0) 100%), linear-gradient(180deg, rgba(12, 10, 9, 0.0) 0%, rgba(12, 10, 9, 0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Soft gold spotlight echoing the logo's brushed-gold X */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 75% 50%, rgba(202, 138, 4, 0.18) 0%, transparent 60%)",
          animation: "heroSpotlight 12s ease-in-out infinite",
        }}
        aria-hidden="true"
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
