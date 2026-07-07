import Link from "next/link";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { type IndustrySector, industrySectors } from "@/data/industrySectors";
import { cn } from "@/lib/cn";

/* Line icons (24px, `currentColor` stroke) — brand-neutral so the accent tile
   supplies the color. Kept inline; the project has no icon dependency. */
const sectorIcons: Record<IndustrySector["accent"], ReactNode> = {
  // Technology — a chip / processor.
  orange: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden
    >
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9.5 2.5v3M14.5 2.5v3M9.5 18.5v3M14.5 18.5v3M2.5 9.5h3M2.5 14.5h3M18.5 9.5h3M18.5 14.5h3" />
    </svg>
  ),
  // Consumer — a shopping bag.
  blue: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden
    >
      <path d="M5 7h14l-1 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 7Z" />
      <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
    </svg>
  ),
};

/* Accent tint for the icon tile — brand color at 10% over the light surface. */
const accentTile: Record<IndustrySector["accent"], string> = {
  orange: "bg-brand-orange/10 text-brand-orange",
  blue: "bg-brand-blue/10 text-brand-blue",
};

/* Border warms toward the accent on hover, alongside the shared lift. */
const accentHoverBorder: Record<IndustrySector["accent"], string> = {
  orange: "hover:border-brand-orange/35",
  blue: "hover:border-brand-blue/35",
};

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Sector entry card — the primary navigation to a sub-page (FAV-21). The whole
 * card is a single link (icon tile + title + framing + sub-vertical pill grid +
 * a "View sector" affordance), so the sub-verticals read as a tag grid rather
 * than a text wall. Shares the house hover-lift (−3px + deeper shadow on
 * `dur-fast`, dropped under reduced motion via `motion-safe:`) and warms its
 * border toward the accent; the arrow nudges on hover through `group-hover`.
 */
function SectorCard({ sector }: { sector: IndustrySector }) {
  return (
    <Link
      href={sector.href}
      aria-label={`${sector.name} — explore our coverage`}
      className={cn(
        "group flex h-full flex-col rounded-md border border-hairline bg-surface-light-2 p-6 md:p-8",
        "transition-[transform,box-shadow,border-color] duration-(--dur-fast) ease-out",
        "hover:shadow-lg motion-safe:hover:-translate-y-[3px]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
        accentHoverBorder[sector.accent],
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-md",
            accentTile[sector.accent],
          )}
        >
          {sectorIcons[sector.accent]}
        </span>
        <span className="rounded-pill border border-hairline px-3 py-1.5 text-label font-semibold text-text-muted">
          {sector.subVerticals.length} sub-verticals
        </span>
      </div>

      <h3 className="mt-5 font-display text-h2 font-semibold text-text-primary">
        {sector.name}
      </h3>
      <p className="mt-2.5 text-body text-text-secondary">
        {sector.description}
      </p>

      {/* Sub-vertical overview as a pill/tag grid (replaces the text wall). */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {sector.subVerticals.map((vertical) => (
          <li
            key={vertical}
            className="rounded-pill border border-hairline bg-surface-light px-3 py-1.5 text-body-sm text-text-secondary"
          >
            {vertical}
          </li>
        ))}
      </ul>

      <span className="mt-8 inline-flex items-center gap-2 pt-2 text-label font-semibold text-text-primary">
        Explore {sector.name}
        <span className="transition-transform duration-(--dur-fast) ease-out motion-safe:group-hover:translate-x-1">
          <ArrowIcon />
        </span>
      </span>
    </Link>
  );
}

/**
 * Industry & Sector coverage grid (FAV-21) — the two entry cards (Technology,
 * Consumer) that route to their sub-pages, on a light content surface. Heading
 * + lead reveal on scroll, then the 2-up grid staggers in (reflowing to 1-up on
 * mobile). All motion honors reduced motion through the shared reveal +
 * `motion-safe:` primitives (§8).
 */
export function IndustrySectors() {
  return (
    <Section tone="light">
      <Reveal className="max-w-2xl">
        <Eyebrow>Where we focus</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          Two sectors, deep specialisation
        </h2>
        <p className="mt-5 text-body-lg text-text-secondary">
          Our coverage spans the technology and consumer companies driving
          Asia&apos;s growth. Explore each sector to see the sub-verticals where
          we run capital raising and M&amp;A mandates.
        </p>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
        {industrySectors.map((sector) => (
          <RevealItem key={sector.href} className="h-full">
            <SectorCard sector={sector} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
