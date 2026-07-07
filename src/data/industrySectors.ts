/**
 * Industry & Sector data source (FAV-21). The single source of truth for the
 * two coverage areas — Technology and Consumer — and their sub-verticals,
 * consumed by the `/industry-sector` landing hub today and by the Tech +
 * Consumer sub-pages in a later Phase 3 issue.
 *
 * Sub-verticals and the sub-page routes are lifted verbatim from SCOPE.md and
 * the header IA (SiteHeader `NAV`) so the landing hub stays in content parity
 * with the live site's dropdown — nothing here is invented.
 */

export interface IndustrySector {
  /** Sector name — Sora 600 card title. */
  name: string;
  /** Route to the sector's sub-page (matches the header dropdown). */
  href: string;
  /** Accent used for the icon tile + hover border. Pairs with a distinct icon
   *  so meaning never rests on color alone (§8). */
  accent: "orange" | "blue";
  /** One-line framing of the sector's coverage. */
  description: string;
  /** Sub-verticals rendered as a pill/tag grid (replaces the text wall). */
  subVerticals: string[];
}

export const industrySectors: IndustrySector[] = [
  {
    name: "Technology",
    href: "/industry-sector/industry-and-sector-tech",
    accent: "orange",
    description:
      "From e-commerce and logistics to fintech, AI and deep tech — we advise the founders building the platforms and infrastructure scaling across Asia and beyond.",
    subVerticals: [
      "E-commerce",
      "Logistics",
      "Fintech",
      "AI",
      "Enterprise Software",
      "Healthtech",
      "EdTech",
      "Crypto",
      "Robotics",
      "Advanced Manufacturing",
      "Cybersecurity",
    ],
  },
  {
    name: "Consumer",
    href: "/industry-sector/industry-sector-consumer",
    accent: "blue",
    description:
      "Across apparel, food & beverage, retail, beauty and wellness — we partner with the consumer brands defining how the region shops, eats and lives.",
    subVerticals: [
      "Apparel",
      "Food & Beverage",
      "Retail",
      "Beauty",
      "Healthcare & Wellness",
      "Consumer Electronics",
    ],
  },
];
