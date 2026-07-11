import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { InsightCard } from "@/components/InsightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { insights } from "@/data/insights";

/* The shared `insights` source isn't partitioned by sector; most seed entries
   are tech-deal specific (dtcpay, Buymed, Inteluck — already featured on the
   Tech page). These two are the sector-agnostic reads that genuinely apply to
   a consumer audience, so the grid stays honest rather than shoehorning a
   tech deal under a "consumer" heading. */
const consumerInsightSlugs = [
  "southeast-asia-capital-markets-outlook",
  "running-a-cross-border-raise",
] as const;

const consumerInsights = insights.filter((insight) =>
  consumerInsightSlugs.includes(
    insight.slug as (typeof consumerInsightSlugs)[number],
  ),
);

/**
 * Consumer insights (FAV-23) — the page's "related insights" surface,
 * mirroring the Tech page's `TechInsights`. A light section that drives to the
 * Insights index, pulling from the shared `insights` source (so it never
 * drifts from the homepage teaser or the future `/insights-news` index).
 * Heading + "view all" secondary CTA, then a 2-up `InsightCard` grid that
 * staggers in and lifts on hover; motion collapses cleanly under reduced
 * motion via the shared primitives (§8).
 */
export function ConsumerInsights() {
  return (
    <Section tone="light">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>Insights &amp; news</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
            Our perspective on consumer
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Market outlooks and industry perspectives from the team advising
            Asia&apos;s consumer founders on capital raising and M&amp;A.
          </p>
        </div>
        <Button
          href="/insights-news"
          variant="secondary"
          className="shrink-0 self-start md:self-auto"
        >
          More insights &amp; news →
        </Button>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 md:gap-6">
        {consumerInsights.map((insight) => (
          <RevealItem key={insight.slug} className="h-full">
            <InsightCard insight={insight} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
