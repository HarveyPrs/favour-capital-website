"use client";

import { useCountUp } from "@/hooks/useCountUp";

type CountUpProps = {
  /** Final value to count to. */
  to: number;
  /** Rendered before the number, e.g. "$" or "US$". */
  prefix?: string;
  /** Rendered after the number, e.g. "M", "+", "%". */
  suffix?: string;
  className?: string;
};

/**
 * Thin wrapper over `useCountUp` (§5) for the common case of displaying an
 * animating number with an optional prefix/suffix. Formats with locale
 * grouping (1,200) and respects reduced motion via the hook.
 */
export function CountUp({ to, prefix, suffix, className }: CountUpProps) {
  const { ref, value } = useCountUp<HTMLSpanElement>(to);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
