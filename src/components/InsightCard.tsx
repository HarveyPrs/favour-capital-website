import { formatInsightDate, type Insight } from "@/data/insights";
import { cn } from "@/lib/cn";

type InsightCardProps = {
  insight: Insight;
  /** Where the card links. Defaults to the Insights index (FAV-19). */
  href?: string;
  className?: string;
};

/**
 * Insight card (§6): a light-surface article teaser — neutral category tag,
 * title, excerpt, then a date + reading-time meta row. The whole card is a
 * link; it shares the house hover-lift (−3px + deeper shadow on `dur-fast`,
 * dropped under reduced motion via `motion-safe:`) and the title warms to
 * orange on hover/focus. Pure CSS so it renders in server components; wrap in
 * `RevealItem` for the staggered scroll reveal. Drives the homepage insights
 * teaser and will back the `/insights-news` index in Phase 4.
 */
export function InsightCard({
  insight,
  href = "/insights-news",
  className,
}: InsightCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-md border border-hairline bg-surface-light-2 p-6 md:p-7",
        "transition-[transform,box-shadow,border-color] duration-(--dur-fast) ease-out",
        "hover:border-brand-orange/35 hover:shadow-lg motion-safe:hover:-translate-y-[3px]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
        className,
      )}
    >
      <span className="inline-flex w-fit items-center rounded-pill border border-hairline bg-surface-light px-3 py-1 text-overline font-semibold uppercase text-text-muted">
        {insight.category}
      </span>

      <h3 className="mt-5 font-display text-h3 font-semibold text-text-primary transition-colors duration-(--dur-fast) ease-out group-hover:text-brand-orange group-focus-visible:text-brand-orange">
        {insight.title}
      </h3>

      <p className="mt-2.5 flex-1 text-body text-text-secondary">
        {insight.excerpt}
      </p>

      <div className="mt-6 flex items-center gap-2.5 text-body-sm text-text-muted">
        <time dateTime={insight.date}>{formatInsightDate(insight.date)}</time>
        <span aria-hidden>·</span>
        <span>{insight.readingTime}</span>
      </div>
    </a>
  );
}
