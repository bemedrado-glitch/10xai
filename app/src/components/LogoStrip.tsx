import Image from "next/image";
import { LOGOS, LOGOS_ARE_EXAMPLES, type Logo } from "@/data/social-proof";

/**
 * Infinite horizontal-scroll logo strip.
 * - Pure CSS animation (no JS / no layout thrash)
 * - Hover pauses
 * - Honors prefers-reduced-motion (animation off, list stays visible)
 * - Falls back to bold wordmark when a logo has no src yet
 */
export function LogoStrip({
  title = "Operators we serve",
  caption,
}: {
  title?: string;
  caption?: string;
}) {
  if (!LOGOS.length) return null;

  // Duplicate the list so the loop is visually seamless.
  const items: Logo[] = [...LOGOS, ...LOGOS];

  const defaultCaption = LOGOS_ARE_EXAMPLES
    ? "Public examples of the kind of operator 10XAI serves. First named clients launching Q2 2026."
    : undefined;

  return (
    <section
      aria-label={title}
      className="border-y border-[var(--color-ink-300)]/60 bg-[var(--color-cream-50)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-ink-700)]">
          {title}
        </p>

        <div className="logo-strip mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="logo-strip__track flex w-max gap-12 md:gap-16">
            {items.map((logo, i) => (
              <li
                key={`${logo.name}-${i}`}
                className="flex h-10 shrink-0 items-center justify-center md:h-12"
                aria-hidden={i >= LOGOS.length}
              >
                {logo.src ? (
                  <Image
                    src={logo.src}
                    alt={logo.alt ?? logo.name}
                    width={140}
                    height={40}
                    className="h-full w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
                  />
                ) : (
                  <span className="font-display text-xl font-black uppercase tracking-tight text-[var(--color-ink-700)] opacity-70 transition-opacity hover:opacity-100 md:text-2xl">
                    {logo.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {(caption ?? defaultCaption) && (
          <p className="mt-6 text-center text-xs text-[var(--color-ink-500)]">
            {caption ?? defaultCaption}
          </p>
        )}
      </div>

      <style>{`
        .logo-strip__track {
          animation: logo-strip-scroll 40s linear infinite;
        }
        .logo-strip:hover .logo-strip__track {
          animation-play-state: paused;
        }
        @keyframes logo-strip-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-strip__track {
            animation: none !important;
            justify-content: center;
            flex-wrap: wrap;
            row-gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
