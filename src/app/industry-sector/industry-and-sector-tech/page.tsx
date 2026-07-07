import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { ClosingCta } from "@/components/ClosingCta";
import { PageHero } from "@/components/PageHero";
import { TechClients } from "@/components/TechClients";
import { TechCoverage } from "@/components/TechCoverage";
import { TechInsights } from "@/components/TechInsights";

export const metadata: Metadata = {
  title: "Technology — Industry & Sector — Favour Capital",
  description:
    "Deep specialisation across the tech landscape — from e-commerce, logistics and fintech to AI, crypto, robotics and cybersecurity. See the sub-verticals, clients and deals where Favour Capital runs capital raising and M&A mandates.",
};

/**
 * Industry & Sector — Technology sub-page (FAV-22). Content migrates from the
 * live Tech page. A dark interior hero introduces the coverage, then the
 * `TechCoverage` grid presents all eleven tech sub-verticals at once (no
 * carousel — the FAV-22 acceptance criterion), the `TechClients` block proves
 * it with representative tech clients + confirmed deals, and `TechInsights`
 * surfaces related reads. The dark → light → dark → light → dark tone
 * alternation drives the header tone-swap exactly as on the other Phase 3
 * pages; the only page-specific piece is the hero copy.
 */
export default function IndustryAndSectorTechPage() {
  return (
    <main>
      <PageHero
        eyebrow="Technology"
        title={
          <>
            Empowering global-minded founders{" "}
            <span className="grad-headline">in tech</span>
          </>
        }
        lead="We serve innovative, high-growth companies across specialised tech sub-verticals — from e-commerce and logistics to AI, crypto and cybersecurity — pairing deep sector fluency with cross-border execution."
        actions={
          <>
            <Button href="/get-in-touch" variant="primary">
              Get in touch
            </Button>
            <Button href="#tech-deals" variant="secondary">
              See tech transactions
            </Button>
          </>
        }
      />
      <TechCoverage />
      <TechClients />
      <TechInsights />
      <ClosingCta />
    </main>
  );
}
