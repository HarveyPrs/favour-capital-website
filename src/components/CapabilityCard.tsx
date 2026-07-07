import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Accent = "orange" | "blue";

type CapabilityCardProps = {
  /** Line icon (24px, `currentColor` stroke) sitting in the accent tile. */
  icon: ReactNode;
  /** Capability name — Sora 600, `h3`. */
  title: string;
  /** Capability description. */
  children: ReactNode;
  /** Icon-tile + hover-border tint. Pairs with a distinct icon so meaning
   *  never rests on color alone (§8). */
  accent?: Accent;
  className?: string;
};

/* Accent tint for the icon tile — brand color at 10% over the light surface. */
const accentTile: Record<Accent, string> = {
  orange: "bg-brand-orange/10 text-brand-orange",
  blue: "bg-brand-blue/10 text-brand-blue",
};

/* Border warms toward the accent on hover, alongside the shared lift. */
const accentHoverBorder: Record<Accent, string> = {
  orange: "hover:border-brand-orange/35",
  blue: "hover:border-brand-blue/35",
};

/**
 * Capability card (§6): an accent-tinted icon tile over a title + description
 * on a light content surface. Shares the house hover-lift (−3px + deeper
 * shadow on `dur-fast`, dropped under reduced motion via `motion-safe:`). Pure
 * CSS so it renders in server components; wrap in `RevealItem` for the
 * staggered scroll reveal. Drives the homepage "what we do" capabilities grid.
 */
export function CapabilityCard({
  icon,
  title,
  children,
  accent = "orange",
  className,
}: CapabilityCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-md border border-hairline bg-surface-light-2 p-6 md:p-8",
        "transition-[transform,box-shadow,border-color] duration-(--dur-fast) ease-out",
        "hover:shadow-lg motion-safe:hover:-translate-y-[3px]",
        accentHoverBorder[accent],
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-md",
          accentTile[accent],
        )}
      >
        {icon}
      </span>
      <h3 className="mt-5 font-display text-h3 font-semibold text-text-primary">
        {title}
      </h3>
      <p className="mt-2.5 text-body text-text-secondary">{children}</p>
    </div>
  );
}
