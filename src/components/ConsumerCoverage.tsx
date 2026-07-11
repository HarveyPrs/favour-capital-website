import type { ReactNode } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { consumerSector } from "@/data/industrySectors";

/* Line icons (24px, `currentColor` stroke) — one per consumer sub-vertical, so
   each tile carries a distinct mark and meaning never rests on the accent
   alone (§8). Kept inline; the project has no icon dependency. Keyed by the
   canonical sub-vertical name from `industrySectors` so the grid stays in
   lockstep with the source of truth. */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-6",
  "aria-hidden": true,
} as const;

const subVerticalIcons: Record<string, ReactNode> = {
  // Apparel — t-shirt.
  Apparel: (
    <svg {...iconProps}>
      <path d="M8.5 3.5 4 6.5l2 3 2-1.3V20h7.5V8.2l2 1.3 2-3-4.5-3-1.5 1.5h-3.5z" />
    </svg>
  ),
  // Food & Beverage — cup with steam.
  "Food & Beverage": (
    <svg {...iconProps}>
      <path d="M4.5 8h13v6a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5z" />
      <path d="M17.5 9.5h1.5a2.5 2.5 0 0 1 0 5h-1.5" />
      <path d="M8.5 3.5c-.8.8-.8 1.7 0 2.5M12.5 3.5c-.8.8-.8 1.7 0 2.5" />
    </svg>
  ),
  // Retail — storefront.
  Retail: (
    <svg {...iconProps}>
      <path d="M3.5 9.5 4.5 4h15l1 5.5" />
      <path d="M4 9.5V20h16V9.5" />
      <path d="M9.5 20v-5.5a2.5 2.5 0 0 1 5 0V20" />
    </svg>
  ),
  // Beauty — lipstick.
  Beauty: (
    <svg {...iconProps}>
      <path d="M9.5 20.5h5v-8.5l-1-6.5h-3l-1 6.5z" />
      <path d="M9.5 12h5" />
    </svg>
  ),
  // Healthcare & Wellness — heart.
  "Healthcare & Wellness": (
    <svg {...iconProps}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    </svg>
  ),
  // Consumer Electronics — smartphone.
  "Consumer Electronics": (
    <svg {...iconProps}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 19h2" />
    </svg>
  ),
};

/* Fallback for any sub-vertical without a bespoke mark — a neutral node glyph,
   so the canonical list can grow without breaking the render. */
const fallbackIcon: ReactNode = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
  </svg>
);

/**
 * Consumer industry coverage (FAV-23) — the page's core block. All six
 * consumer sub-verticals render as a single responsive grid (mirrors the Tech
 * page's `TechCoverage`), each an accent-tiled tile with a distinct line icon,
 * drawn from the canonical `consumerSector` list so the grid and the
 * landing-hub pill grid never drift. On a light content surface; heading +
 * lead reveal on scroll and the tiles stagger in, all honoring reduced motion
 * via the shared primitives (§8).
 */
export function ConsumerCoverage() {
  return (
    <Section tone="light">
      <Reveal className="max-w-2xl">
        <Eyebrow>Consumer industry coverage</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          Specialist coverage across the consumer landscape
        </h2>
        <p className="mt-5 text-body-lg text-text-secondary">
          We partner with the consumer brands defining how the region shops,
          eats and lives — across apparel, food &amp; beverage, retail, beauty
          and wellness — bringing deep transaction experience to the brand
          equity and unit economics behind sustainable long-term growth.
        </p>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-12 md:gap-5 lg:grid-cols-4">
        {consumerSector.subVerticals.map((vertical) => (
          <RevealItem key={vertical} className="h-full">
            <div className="group flex h-full flex-col items-start gap-4 rounded-md border border-hairline bg-surface-light-2 p-5 transition-[border-color] duration-(--dur-fast) ease-out hover:border-brand-blue/35 md:p-6">
              <span className="inline-flex size-12 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue">
                {subVerticalIcons[vertical] ?? fallbackIcon}
              </span>
              <span className="font-display text-h3 font-semibold text-text-primary">
                {vertical}
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-10 max-w-3xl md:mt-12">
        <p className="text-body text-text-secondary">
          Leveraging robust research capabilities, we navigate the inherent
          complexity of consumer brand-building and category dynamics — the
          insight behind our advisory work and published industry reports.
        </p>
      </Reveal>
    </Section>
  );
}
