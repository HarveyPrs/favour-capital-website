import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { ClosingCta } from "@/components/ClosingCta";
import { ConsumerClients } from "@/components/ConsumerClients";
import { ConsumerCoverage } from "@/components/ConsumerCoverage";
import { ConsumerInsights } from "@/components/ConsumerInsights";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Consumer — Industry & Sector — Favour Capital",
  description:
    "Deep specialisation across the consumer landscape — from apparel, food & beverage and retail to beauty, healthcare & wellness and consumer electronics. See the sub-verticals and clients where Favour Capital runs capital raising and M&A mandates.",
};

/**
 * Industry & Sector — Consumer sub-page (FAV-23). Mirrors the Tech page's
 * structure (FAV-22): a dark interior hero introduces the coverage, then the
 * `ConsumerCoverage` grid presents all six consumer sub-verticals at once,
 * the `ConsumerClients` block proves it with representative consumer clients,
 * and `ConsumerInsights` surfaces related reads. The dark → light → dark →
 * light → dark tone alternation drives the header tone-swap exactly as on the
 * other Phase 3 pages; the only page-specific piece is the hero copy.
 */
export default function IndustrySectorConsumerPage() {
  return (
    <main>
      <PageHero
        eyebrow="Consumer"
        title={
          <>
            Empowering global-minded founders{" "}
            <span className="grad-headline">in consumer</span>
          </>
        }
        lead="We partner with the consumer brands defining how the region shops, eats and lives — across apparel, food & beverage, retail, beauty and wellness — pairing deep sector fluency with cross-border execution."
        actions={
          <>
            <Button href="/get-in-touch" variant="primary">
              Get in touch
            </Button>
            <Button href="#consumer-clients" variant="secondary">
              See consumer clients
            </Button>
          </>
        }
      />
      <ConsumerCoverage />
      <ConsumerClients />
      <ConsumerInsights />
      <ClosingCta />
    </main>
  );
}
