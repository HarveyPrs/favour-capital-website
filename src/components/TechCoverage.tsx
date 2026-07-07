import type { ReactNode } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { technologySector } from "@/data/industrySectors";

/* Line icons (24px, `currentColor` stroke) — one per tech sub-vertical so each
   tile carries a distinct mark and meaning never rests on the accent alone
   (§8). Kept inline; the project has no icon dependency. Keyed by the canonical
   sub-vertical name from `industrySectors` so the grid stays in lockstep with
   the source of truth. */
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
  // E-commerce — shopping cart.
  "E-commerce": (
    <svg {...iconProps}>
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M2.5 3h2l2.2 11a1 1 0 0 0 1 .8h9a1 1 0 0 0 1-.8L20 7H6" />
    </svg>
  ),
  // Logistics — delivery truck.
  Logistics: (
    <svg {...iconProps}>
      <path d="M2.5 6.5h10v9h-10z" />
      <path d="M12.5 9.5H17l3.5 3v3h-8z" />
      <circle cx="6.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </svg>
  ),
  // Fintech — payment card.
  Fintech: (
    <svg {...iconProps}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 9.5h19M6 14.5h4" />
    </svg>
  ),
  // AI — spark / intelligence.
  AI: (
    <svg {...iconProps}>
      <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" />
      <path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </svg>
  ),
  // Enterprise Software — stacked windows.
  "Enterprise Software": (
    <svg {...iconProps}>
      <rect x="3" y="3.5" width="18" height="13" rx="2" />
      <path d="M3 7.5h18M7 20.5h10M12 16.5v4" />
    </svg>
  ),
  // Healthtech — heartbeat / pulse.
  Healthtech: (
    <svg {...iconProps}>
      <path d="M3 12h4l2-4 3 8 2-4h7" />
    </svg>
  ),
  // EdTech — graduation cap.
  EdTech: (
    <svg {...iconProps}>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5z" />
      <path d="M6.5 10.5V15c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.5M21.5 8.5v5" />
    </svg>
  ),
  // Crypto — coin.
  Crypto: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 8.5h4a2 2 0 0 1 0 4h-4M9.5 12.5h4.5a2 2 0 0 1 0 4h-4.5M9.5 8.5v8M11.5 6.5v2M11.5 16.5v1.5" />
    </svg>
  ),
  // Robotics — robot head.
  Robotics: (
    <svg {...iconProps}>
      <rect x="4.5" y="7.5" width="15" height="11" rx="2" />
      <path d="M12 4.5v3M9 12h.01M15 12h.01M9.5 15.5h5M2.5 11.5v3M21.5 11.5v3" />
    </svg>
  ),
  // Advanced Manufacturing — factory.
  "Advanced Manufacturing": (
    <svg {...iconProps}>
      <path d="M3 20.5V9.5l6 4v-4l6 4V6.5h3v14z" />
      <path d="M3 20.5h18" />
    </svg>
  ),
  // Cybersecurity — shield.
  Cybersecurity: (
    <svg {...iconProps}>
      <path d="M12 3l7 2.5V11c0 4.6-3 8-7 9.5C8 19 5 15.6 5 11V5.5z" />
      <path d="M9 12l2 2 4-4" />
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
 * Tech industry coverage (FAV-22) — the page's core block. All eleven tech
 * sub-verticals render as a single responsive grid (no carousel), each an
 * accent-tiled tile with a distinct line icon, drawn from the canonical
 * `technologySector` list so the grid and the landing-hub pill grid never
 * drift. On a light content surface; heading + lead reveal on scroll and the
 * tiles stagger in, all honoring reduced motion via the shared primitives (§8).
 */
export function TechCoverage() {
  return (
    <Section tone="light">
      <Reveal className="max-w-2xl">
        <Eyebrow>Tech industry coverage</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          Specialist coverage across the tech landscape
        </h2>
        <p className="mt-5 text-body-lg text-text-secondary">
          We serve innovative, high-growth companies across specialised tech
          sub-verticals — bringing deep transaction experience to the product
          moats, scalability and fundamentals behind sustainable long-term
          growth.
        </p>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-12 md:gap-5 lg:grid-cols-4">
        {technologySector.subVerticals.map((vertical) => (
          <RevealItem key={vertical} className="h-full">
            <div className="group flex h-full flex-col items-start gap-4 rounded-md border border-hairline bg-surface-light-2 p-5 transition-[border-color] duration-(--dur-fast) ease-out hover:border-brand-orange/35 md:p-6">
              <span className="inline-flex size-12 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange">
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
          complexity of advanced products and evolving business models — the
          insight behind our advisory work and published industry reports.
        </p>
      </Reveal>
    </Section>
  );
}
