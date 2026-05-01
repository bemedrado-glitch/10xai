"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fade-up on scroll. Uses IntersectionObserver, fires once.
 * Respects prefers-reduced-motion (no transform / instant visible).
 *
 * Wrap any block:
 *   <Reveal delay={100}>
 *     <h2>Big headline</h2>
 *   </Reveal>
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current || shown) return;

    if (typeof window !== "undefined") {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        setShown(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, shown]);

  return (
    <Tag
      ref={ref}
      className={[
        "transition-all duration-[700ms] ease-out will-change-transform",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
