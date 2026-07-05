import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /**
   * Gentle float loop (§6) for hero tombstones / floating UI. Pure CSS
   * animation gated behind `motion-safe:` so it's dropped entirely under
   * `prefers-reduced-motion` (§8).
   */
  bob?: boolean;
  /**
   * Stagger the bob loop by N seconds so a stack of cards drifts out of
   * phase (the hero uses 0 / 0.55 / 1.1). Ignored when `bob` is false.
   */
  bobDelay?: number;
};

/**
 * Glass card (§6): `--glass` fill, hairline border, `backdrop-blur(8px)`,
 * radius `md`. The base surface for `DealCard` and floating hero UI — pure
 * CSS so it renders in server components. Pass `bob` for the ambient float.
 */
export function GlassCard({
  children,
  className,
  bob = false,
  bobDelay,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-md border border-hairline p-5",
        bob && "motion-safe:animate-bob",
        className,
      )}
      style={bob && bobDelay ? { animationDelay: `${bobDelay}s` } : undefined}
    >
      {children}
    </div>
  );
}
