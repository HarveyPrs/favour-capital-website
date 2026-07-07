import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { Capabilities } from "@/components/Capabilities";
import { ClosingCta } from "@/components/ClosingCta";
import { Differentiation } from "@/components/Differentiation";
import { InvestorNetwork } from "@/components/InvestorNetwork";
import { PageHero } from "@/components/PageHero";
import { RepresentativeDeals } from "@/components/RepresentativeDeals";

export const metadata: Metadata = {
  title: "Services & Clients — Favour Capital",
  description:
    "Capital raising and M&A advisory run end to end — connecting Asia's industry leaders in tech and consumer to a global network of institutional and strategic investors.",
};

/**
 * Services & Clients (FAV-20). The page is composed almost entirely from the
 * shared Phase 2 sections, which already migrated the current Services copy:
 * the comprehensive-advisory intro + capabilities, the differentiation modules,
 * the investor-network map and the representative deals/clients showcase. Only
 * the interior `PageHero` is page-specific. Reusing the homepage sections keeps
 * a single implementation of each (no duplicate blocks), and the dark → light
 * tone alternation drives the header tone-swap exactly as on the homepage.
 */
export default function ServicesAndClientsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services & Clients"
        title={
          <>
            Capital raising and M&amp;A advisory,{" "}
            <span className="grad-headline">run end to end</span>
          </>
        }
        lead="From growth-stage capital raises to cross-border mergers and acquisitions, we run the entire transaction — connecting Asia's founders in tech and consumer to a global network of institutional and strategic investors."
        actions={
          <>
            <Button href="/get-in-touch" variant="primary">
              Get in touch
            </Button>
            <Button href="#representative-deals" variant="secondary">
              See our track record
            </Button>
          </>
        }
      />
      <Capabilities />
      <Differentiation />
      <InvestorNetwork />
      <div id="representative-deals" className="scroll-mt-24">
        <RepresentativeDeals />
      </div>
      <ClosingCta />
    </main>
  );
}
