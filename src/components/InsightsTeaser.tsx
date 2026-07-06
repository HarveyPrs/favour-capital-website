import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { InsightCard } from "@/components/InsightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { featuredInsights } from "@/data/insights";

/**
 * Homepage insights teaser (FAV-19) — a light section that drives to the
 * Insights index. A heading + lead with a "view all" secondary CTA aligned to
 * the baseline on desktop, then a 3-up grid of `InsightCard`s pulled from the
 * shared `insights` data source (so the teaser and the future `/insights-news`
 * index never drift). Heading reveals on scroll, the cards stagger in and lift
 * on hover — all via the shared reveal + `motion-safe:` primitives, so motion
 * collapses cleanly under reduced motion (§8). The single primary CTA on this
 * view lives in the closing band below, so "view all" stays secondary (§ one
 * primary per view).
 */
export function InsightsTeaser() {
  return (
    <Section tone="light">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>Insights &amp; news</Eyebrow>
          <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
            Ideas that move markets
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Deal announcements, market outlooks and industry perspectives from
            the team advising Asia&apos;s founders on capital raising and M&amp;A.
          </p>
        </div>
        <Button
          href="/insights-news"
          variant="secondary"
          className="shrink-0 self-start md:self-auto"
        >
          View all insights →
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
