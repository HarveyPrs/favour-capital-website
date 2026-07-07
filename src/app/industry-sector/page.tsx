import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { ClosingCta } from "@/components/ClosingCta";
import { IndustrySectors } from "@/components/IndustrySectors";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Industry & Sector — Favour Capital",
  description:
    "Deep specialisation across technology and consumer — from e-commerce, logistics and fintech to apparel, food & beverage and retail. Explore the sectors where Favour Capital runs capital raising and M&A mandates.",
};

/**
 * Industry & Sector landing hub (FAV-21). A compact interior hero introduces
 * the two coverage areas, then the `IndustrySectors` grid presents Technology
 * and Consumer as entry cards routing to their sub-pages — each surfacing its
 * sub-verticals as a pill grid rather than a text wall. The dark hero → light
 * grid → dark closing CTA tone alternation drives the header tone-swap exactly
 * as on the other Phase 3 pages. Composed from shared sections, so the only
 * page-specific piece is the hero copy.
 */
export default function IndustrySectorPage() {
  return (
    <main>
      <PageHero
        eyebrow="Industry & Sector"
        title={
          <>
            Deep specialisation across{" "}
            <span className="grad-headline">tech and consumer</span>
          </>
        }
        lead="We concentrate on the two sectors driving Asia's growth — technology and consumer — pairing sector fluency with cross-border execution so founders raise and transact with investors who understand their market."
        actions={
          <>
            <Button href="/industry-sector/industry-and-sector-tech" variant="primary">
              Explore Technology
            </Button>
            <Button href="/industry-sector/industry-sector-consumer" variant="secondary">
              Explore Consumer
            </Button>
          </>
        }
      />
      <IndustrySectors />
      <ClosingCta />
    </main>
  );
}
