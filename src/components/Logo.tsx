import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** Render only the "F" mark (no wordmark) — for favicons / tight spaces. */
  markOnly?: boolean;
};

/**
 * Favour Capital logo lockup (§6, §7) as a tight-cropped inline SVG — not a
 * CSS-cropped padded square. The mark (orange + blue pills, blue dot) keeps its
 * brand colors on every surface; the "FAVOUR CAPITAL" wordmark is drawn with
 * `fill="currentColor"` so it swaps white ↔ navy purely from the ancestor text
 * color (white on dark sections, navy under `.tone-light`). `textLength` locks
 * both wordmark lines to the same width so their edges align like the brand
 * lockup, independent of font metrics.
 *
 * Inline (rather than an <img>) so `currentColor` and the brand-token fills
 * resolve against the live cascade, and there's no extra network request or
 * hydration cost — safe in server components.
 */
export function Logo({ className, markOnly = false }: LogoProps) {
  const mark = (
    <>
      <rect x="0" y="0" width="40" height="9" rx="4.5" fill="var(--color-brand-orange)" />
      <rect x="0" y="13.5" width="33" height="9" rx="4.5" fill="var(--color-brand-blue)" />
      <circle cx="4.5" cy="31.5" r="4.5" fill="var(--color-brand-blue)" />
    </>
  );

  if (markOnly) {
    return (
      <svg
        viewBox="0 0 40 36"
        role="img"
        aria-label="Favour Capital"
        className={cn("block h-9 w-auto", className)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Favour Capital</title>
        {mark}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 146 36"
      role="img"
      aria-label="Favour Capital"
      className={cn("block h-8 w-auto text-text-primary", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Favour Capital</title>
      {mark}
      <text
        x="52"
        y="15.5"
        textLength="92"
        lengthAdjust="spacing"
        fontFamily="var(--font-display)"
        fontSize="16.5"
        fontWeight="700"
        fill="currentColor"
      >
        FAVOUR
      </text>
      <text
        x="52"
        y="32.5"
        textLength="92"
        lengthAdjust="spacing"
        fontFamily="var(--font-display)"
        fontSize="12.5"
        fontWeight="600"
        fill="currentColor"
      >
        CAPITAL
      </text>
    </svg>
  );
}
