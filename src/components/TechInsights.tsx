import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { InsightCard } from "@/components/InsightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { featuredInsights } from "@/data/insights";

/**
 * Tech insights (FAV-22) — the page's "related insights" surface. A light
 * section that drives to the Insights index, pulling from the shared `insights`
 * source (so it never drifts from the homepage teaser or the future
 * `/insights-news` index) — the featured set is tech-led: a fintech deal, the
 * regional capital-markets outlook and the logistics/fintech industry read.
 * Heading + "view all" secondary CTA, then a 3-up `InsightCard` grid that
 * staggers in and lifts on hover; motion collapses cleanly under reduced motion
 * via the shared primitives (§8).
 */
export function TechInsights() {
  return (
    <Section tone="light">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>Insights &amp; news</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
            Our perspective on tech
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Deal announcements, market outlooks and industry perspectives from
            the team advising Asia&apos;s technology founders on capital raising
            and M&amp;A.
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

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
        {featuredInsights.map((insight) => (
          <RevealItem key={insight.slug} className="h-full">
            <InsightCard insight={insight} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
