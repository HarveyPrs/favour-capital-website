import type { ReactNode } from "react";

import { CapabilityCard } from "@/components/CapabilityCard";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { StatBlock } from "@/components/StatBlock";

/* Line icons (24px, `currentColor` stroke) — brand-neutral so the accent tile
   supplies the color. Kept inline; the project has no icon dependency. */
const TrendingUpIcon = (
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
    <path d="M3 17 9 11l4 4 8-8" />
    <path d="M15 5h6v6" />
  </svg>
);

const MergerIcon = (
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
    <circle cx="9" cy="12" r="6.25" />
    <circle cx="15" cy="12" r="6.25" />
  </svg>
);

/**
 * Homepage capabilities ("what we do") — content parity with the current
 * Services messaging (FAV-15). Two refined capability cards on a light content
 * surface: Capital Raising (orange) and Merger & Acquisition (blue), each with
 * a line icon per §6. Heading + lead reveal on scroll, then the 2-up grid
 * staggers in (reflowing to 1-up on mobile); cards lift on hover. All motion
 * honors reduced motion through the shared reveal + `motion-safe:` primitives.
 */
const capabilities: {
  accent: "orange" | "blue";
  icon: ReactNode;
  title: string;
  description: string;
}[] = [
  {
    accent: "orange",
    icon: TrendingUpIcon,
    title: "Capital Raising",
    description:
      "We primarily assist founders through their capital raising process as they reach the growth stage — the phase where companies scale regionally and globally.",
  },
  {
    accent: "blue",
    icon: MergerIcon,
    title: "Merger & Acquisition",
    description:
      "We support industry leaders seeking to acquire or be acquired for strategic synergies or financial objectives, and manage the entire process end to end.",
  },
];

/**
 * Track record strip (moved from the hero) — leads the services description
 * with proof. Figures marked `placeholder` keep the trailing `*` until real
 * numbers are confirmed (§6, SCOPE.md decisions-you-owe).
 */
const stats = [
  { value: 850, prefix: "$", suffix: "M+", label: "Capital raised", placeholder: true },
  { value: 40, suffix: "+", label: "Transactions", placeholder: true },
  { value: 15, suffix: "+", label: "Markets covered" },
  { value: 500, suffix: "+", label: "Investor network", placeholder: true },
] as const;

export function Capabilities() {
  return (
    <Section tone="light">
      <Reveal className="max-w-2xl">
        <Eyebrow>Our capabilities</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          Comprehensive financial advisory
        </h2>
      </Reveal>

      {/* Track record — reflows 4 → 2 columns on mobile. */}
      <RevealGroup className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-hairline py-8 md:mt-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label}>
            <StatBlock {...stat} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-8 max-w-2xl md:mt-10">
        <p className="text-body-lg text-text-secondary">
          We partner with industry leaders across tech and consumer to execute
          successful capital raising and M&amp;A transactions — onboarding the
          right institutional and strategic investors so our clients can scale
          and expand across markets.
        </p>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
        {capabilities.map((capability) => (
          <RevealItem key={capability.title} className="h-full">
            <CapabilityCard
              icon={capability.icon}
              title={capability.title}
              accent={capability.accent}
            >
              {capability.description}
            </CapabilityCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
