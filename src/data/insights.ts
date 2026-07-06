/**
 * Insights data source (FAV-19). The single source of truth for insight
 * articles, consumed by the homepage teaser today and by the `/insights-news`
 * index + article pages in Phase 4. Keeping it here (rather than inline in the
 * teaser) satisfies the FAV-19 acceptance criterion that the teaser cards pull
 * from the same source as the index, and means the full migration lands in one
 * place.
 *
 * NOTE: these are seed entries, grounded in the confirmed deals + the live-site
 * insight categories (SCOPE.md) so nothing is invented beyond light framing.
 * They will be replaced wholesale by the ~70+ migrated articles in Phase 4.
 */

/** Live-site insight categories (SCOPE.md). */
export const INSIGHT_CATEGORIES = [
  "FC Deals",
  "FC Market Outlook",
  "FC Industry Highlights",
  "FC Insights",
  "FC Event Recap",
  "FC Collaborative Report",
  "Webinar Reviews",
] as const;

export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number];

export interface Insight {
  /** URL slug — the article lives at `/insights-news/{slug}` in Phase 4. */
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  /** ISO 8601 publish date (`YYYY-MM-DD`). */
  date: string;
  /** Estimated read length, e.g. "4 min read". */
  readingTime: string;
}

/**
 * Seed insights, newest first. The teaser surfaces the first three; the index
 * will paginate/filter the full set.
 */
export const insights: Insight[] = [
  {
    slug: "dtcpay-series-a-vertex-ventures",
    title: "dtcpay closes US$10.0M Series A led by Vertex Ventures",
    excerpt:
      "Favour Capital advised Singapore digital-payments platform dtcpay on its Series A round, onboarding Vertex Ventures SEA & India to power its next stage of growth.",
    category: "FC Deals",
    date: "2026-05-28",
    readingTime: "4 min read",
  },
  {
    slug: "southeast-asia-capital-markets-outlook",
    title: "Southeast Asia's capital markets: where growth capital flows next",
    excerpt:
      "Our read on how institutional and strategic investors are repositioning across the region's tech and consumer sectors — and what it means for founders raising in 2026.",
    category: "FC Market Outlook",
    date: "2026-04-15",
    readingTime: "6 min read",
  },
  {
    slug: "logistics-fintech-cross-border-momentum",
    title: "Why logistics and fintech are driving cross-border deal momentum",
    excerpt:
      "From Buymed to Inteluck, a look at the industry dynamics pulling regional capital into the infrastructure that moves goods and money across Southeast Asia.",
    category: "FC Industry Highlights",
    date: "2026-03-20",
    readingTime: "5 min read",
  },
  {
    slug: "buymed-series-b-uob-venture",
    title: "Buymed raises US$51.5M Series B with UOB Venture, DFC and Smilegate",
    excerpt:
      "Favour Capital led the Series B for Vietnam's B2B pharmaceutical marketplace Buymed, assembling a syndicate of institutional and strategic backers.",
    category: "FC Deals",
    date: "2026-02-18",
    readingTime: "4 min read",
  },
  {
    slug: "running-a-cross-border-raise",
    title: "What it takes to run a cross-border capital raise",
    excerpt:
      "The strategy alignment, investor targeting and execution discipline behind a successful regional round — the way we approach a mandate from first call to close.",
    category: "FC Insights",
    date: "2026-01-22",
    readingTime: "7 min read",
  },
  {
    slug: "inteluck-series-c-navegar-east-ventures",
    title: "Inteluck secures US$34M Series C from Navegar and East Ventures",
    excerpt:
      "A milestone raise for the smart-logistics platform, extending its footprint across Southeast Asia with support from returning and new institutional investors.",
    category: "FC Deals",
    date: "2025-12-10",
    readingTime: "3 min read",
  },
];

/** The three cards surfaced by the homepage teaser (FAV-19). */
export const featuredInsights: Insight[] = insights.slice(0, 3);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/**
 * Format an insight's ISO date as e.g. "28 May 2026". Uses UTC parts so server
 * and client render identically regardless of timezone (no hydration drift).
 */
export function formatInsightDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
