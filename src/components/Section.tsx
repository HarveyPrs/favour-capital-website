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
  /**
   * Optional layered backdrop (§6) — pass a `<BackgroundLayers />`. The section
   * becomes a positioned, clipped stacking context and its content is lifted
   * above the layers (`relative z-10`). Content-only sections omit this.
   */
  bg?: ReactNode;
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
  bg,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      // Light sections claim the fixed header while they straddle its baseline
      // (§6, §2.7): `<SiteHeader>` watches `[data-header-light]` and flips the
      // bar to `.tone-light` (navy wordmark + white glass) over them.
      data-header-light={tone === "light" ? "" : undefined}
      className={cn(
        "py-16 md:py-24",
        Boolean(bg) && "relative isolate overflow-hidden",
        tone === "light"
          ? "tone-light bg-surface-light text-text-primary"
          : "bg-ink text-text-primary",
        className,
      )}
    >
      {bg}
      {container ? (
        <Container className={cn(Boolean(bg) && "relative z-10", containerClassName)}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}
