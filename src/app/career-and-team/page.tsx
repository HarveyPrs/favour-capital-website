import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { CareerPathways } from "@/components/CareerPathways";
import { ClosingCta } from "@/components/ClosingCta";
import { CoreValues } from "@/components/CoreValues";
import { CultureTeaser } from "@/components/CultureTeaser";
import { PageHero } from "@/components/PageHero";
import { TeamGrid } from "@/components/TeamGrid";

export const metadata: Metadata = {
  title: "Career & Team — Favour Capital",
  description:
    "Build a career in cross-border capital raising and M&A. Explore our IB Elite Program and Experienced Professionals tracks, meet the team, and see the six values behind every mandate.",
};

/**
 * Career & Team (FAV-24). The hub for the two careers programs, the team and
 * the firm's values. A page-specific `PageHero` opens onto the careers
 * pathways (two program cards routing to their sub-pages), the six core values,
 * the scalable team grid (graceful with today's single profile) and an FC Event
 * Recap culture teaser, closing on the shared CTA. Composed from shared
 * primitives + the new Career sections; the dark → light tone alternation
 * drives the header tone-swap exactly as on the other Phase 3 pages.
 */
export default function CareerAndTeamPage() {
  return (
    <main>
      <PageHero
        eyebrow="Career & Team"
        title={
          <>
            Build the next chapter of{" "}
            <span className="grad-headline">your career</span>
          </>
        }
        lead="We are a lean, senior team running cross-border capital raising and M&A for Asia's leading tech and consumer companies. Join us — or get to know the people and values behind the work."
        actions={
          <>
            <Button href="#careers" variant="primary">
              Explore programs
            </Button>
            <Button href="/get-in-touch" variant="secondary">
              Get in touch
            </Button>
          </>
        }
      />
      <div id="careers" className="scroll-mt-24">
        <CareerPathways />
      </div>
      <CoreValues />
      <TeamGrid />
      <CultureTeaser />
      <ClosingCta />
    </main>
  );
}
