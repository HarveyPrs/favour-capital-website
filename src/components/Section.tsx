import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  /**
   * Surface + text treatment (§2.7). `dark` uses the `ink` base with
   * white-on-dark text tokens; `light` flips to a white surface and the
   * navy-on-light text tokens via the `.tone-light` scope.
   */
  tone?: "dark" | "light";
  className?: string;
  /** Extra classes for the inner `<Container>`. */
  containerClassName?: string;
  /**
   * Set `false` for full-bleed sections (hero background layers, edge-to-edge
   * media) that manage their own inner layout instead of the shared column.
   */
  container?: boolean;
  id?: string;
};

/**
 * Section shell (§6): vertical rhythm (64px mobile → 96px desktop) plus the
 * dark/light tone treatment and the shared content column. Compose page
 * sections from this rather than re-declaring padding + background per block.
 */
export function Section({
  children,
  tone = "dark",
  className,
  containerClassName,
  container = true,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        tone === "light"
          ? "tone-light bg-surface-light text-text-primary"
          : "bg-ink text-text-primary",
        className,
      )}
    >
      {container ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
