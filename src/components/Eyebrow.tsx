import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Show a leading orange status dot (pulses when motion is allowed). */
  pulse?: boolean;
};

/**
 * Eyebrow / overline (§6): orange-tinted pill that precedes section headings.
 * Uses the `overline` type token (uppercase, 1.4px tracking) and the
 * tone-aware `text-accent` token so it reads on both dark and light surfaces.
 */
export function Eyebrow({ children, className, pulse = false }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-brand-orange/40 bg-brand-orange/13 px-3.5 py-2 text-overline font-semibold uppercase text-text-accent",
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-pill bg-brand-orange opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-pill bg-brand-orange" />
        </span>
      )}
      {children}
    </span>
  );
}
