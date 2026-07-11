import type { ReactNode } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { coreValues } from "@/data/careerTeam";

/* Line icons (24px, `currentColor` stroke) — one per value, keyed by the
   canonical value name so a distinct mark carries each and meaning never rests
   on styling alone (§8). Kept inline; the project has no icon dependency. */
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

const valueIcons: Record<string, ReactNode> = {
  // Self-Driven — a rising spark / rocket.
  "Self-Driven": (
    <svg {...iconProps}>
      <path d="M12 3c3 1.5 5 5 5 8.5 0 2.2-1 4-2.5 5.5h-5C8 15.5 7 13.7 7 11.5 7 8 9 4.5 12 3Z" />
      <circle cx="12" cy="10" r="1.6" />
      <path d="M9.5 20.5 12 18l2.5 2.5" />
    </svg>
  ),
  // Integrity — a shield with a check.
  Integrity: (
    <svg {...iconProps}>
      <path d="M12 3 5 6v5.5c0 4 3 7.3 7 9.5 4-2.2 7-5.5 7-9.5V6l-7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  // Clients First — a handshake / clasped hands.
  "Clients First": (
    <svg {...iconProps}>
      <path d="M3 8.5 7 5l4 3-2 2a1.5 1.5 0 0 1-2.2 0L5.5 8.7" />
      <path d="M21 8.5 17 5l-4 3 3.2 3.2a1.5 1.5 0 0 0 2.1 0l1.6-1.6" />
      <path d="M11 10l1.5 1.5a1.5 1.5 0 0 0 2.1 0" />
      <path d="M9 12l1.6 1.6M11 14l1.4 1.4M13 15.6l1.2 1.2" />
    </svg>
  ),
  // Diversity — a circle of people / connected nodes.
  Diversity: (
    <svg {...iconProps}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="16" r="2" />
      <circle cx="19" cy="16" r="2" />
      <path d="M12 7v3M10.5 11.5 6.5 14.5M13.5 11.5l4 3" />
      <path d="M7 16h10" />
    </svg>
  ),
  // Pursuit of Excellence — a star.
  "Pursuit of Excellence": (
    <svg {...iconProps}>
      <path d="M12 3.5 14.6 9l6 .8-4.4 4.2 1.1 6L12 17.8 6.7 20l1.1-6L3.4 9.8 9.4 9 12 3.5Z" />
    </svg>
  ),
  // Altruism — an open hand holding a heart.
  Altruism: (
    <svg {...iconProps}>
      <path d="M12 7.5s-1.2-1.6-3-1.6A2.8 2.8 0 0 0 6.5 9c0 2.4 3 4.3 5.5 6 2.5-1.7 5.5-3.6 5.5-6a2.8 2.8 0 0 0-2.5-3.1c-1.8 0-3 1.6-3 1.6Z" />
      <path d="M4 16l3.5 2.5a3 3 0 0 0 1.8.5H16a2 2 0 0 0 0-4h-3" />
    </svg>
  ),
};

/* Fallback for any value without a bespoke mark — a neutral node glyph, so the
   canonical list can grow without breaking the render. */
const fallbackIcon: ReactNode = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
  </svg>
);

/**
 * Core values grid (FAV-24) — the six values (Self-Driven, Integrity, Clients
 * First, Diversity, Pursuit of Excellence, Altruism) drawn from the canonical
 * `coreValues` list, on a dark surface. Each is an accent-tiled card with a
 * distinct line icon, name and one-line framing. Heading + lead reveal on
 * scroll and the cards stagger in, all honoring reduced motion via the shared
 * primitives (§8).
 */
export function CoreValues() {
  return (
    <Section tone="dark">
      <Reveal className="max-w-2xl">
        <Eyebrow>What we stand for</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          Six values that guide every mandate
        </h2>
        <p className="mt-5 text-body-lg text-text-secondary">
          They shape who we hire, how we advise and the standard we hold
          ourselves to on every deal.
        </p>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 md:gap-5 lg:grid-cols-3">
        {coreValues.map((value) => (
          <RevealItem key={value.name} className="h-full">
            <div className="group flex h-full flex-col rounded-md border border-hairline bg-surface-1 p-6 transition-[border-color] duration-(--dur-fast) ease-out hover:border-hairline-2">
              <span className="inline-flex size-12 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange">
                {valueIcons[value.name] ?? fallbackIcon}
              </span>
              <h3 className="mt-5 font-display text-h3 font-semibold text-text-primary">
                {value.name}
              </h3>
              <p className="mt-2 text-body-sm text-text-secondary">
                {value.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
