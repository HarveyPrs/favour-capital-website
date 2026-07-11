import Link from "next/link";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { type CareerProgram, careerPrograms } from "@/data/careerTeam";
import { cn } from "@/lib/cn";

/* Line icons (24px, `currentColor` stroke) — one per program, so each card
   carries a distinct mark and meaning never rests on the accent alone (§8).
   Kept inline; the project has no icon dependency. */
const programIcons: Record<CareerProgram["accent"], ReactNode> = {
  // IB Elite — a graduation cap (students & graduates).
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
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
      <path d="M6 10.5V15c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5" />
      <path d="M21.5 8.5v5" />
    </svg>
  ),
  // Experienced Professionals — a briefcase.
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
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
    </svg>
  ),
};

/* Accent tint for the icon tile — brand color at 10% over the light surface. */
const accentTile: Record<CareerProgram["accent"], string> = {
  orange: "bg-brand-orange/10 text-brand-orange",
  blue: "bg-brand-blue/10 text-brand-blue",
};

/* Border warms toward the accent on hover, alongside the shared lift. */
const accentHoverBorder: Record<CareerProgram["accent"], string> = {
  orange: "hover:border-brand-orange/35",
  blue: "hover:border-brand-blue/35",
};

/* Checkmark bullet color, matched to the card accent. */
const accentCheck: Record<CareerProgram["accent"], string> = {
  orange: "text-brand-orange",
  blue: "text-brand-blue",
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4 shrink-0", className)}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * Career pathway card — the primary navigation to a program sub-page (FAV-24,
 * routing to FAV-35 / FAV-36). The whole card is a single link: accent icon
 * tile + audience pill, title + framing, a checklist of highlights and a
 * "Explore program" affordance. Shares the house hover-lift (−3px + deeper
 * shadow on `dur-fast`, dropped under reduced motion via `motion-safe:`) and
 * warms its border toward the accent; the arrow nudges on hover via
 * `group-hover`.
 */
function ProgramCard({ program }: { program: CareerProgram }) {
  return (
    <Link
      href={program.href}
      aria-label={`${program.name} — ${program.audience}`}
      className={cn(
        "group flex h-full flex-col rounded-md border border-hairline bg-surface-light-2 p-6 md:p-8",
        "transition-[transform,box-shadow,border-color] duration-(--dur-fast) ease-out",
        "hover:shadow-lg motion-safe:hover:-translate-y-[3px]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
        accentHoverBorder[program.accent],
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-md",
            accentTile[program.accent],
          )}
        >
          {programIcons[program.accent]}
        </span>
        <span className="rounded-pill border border-hairline px-3 py-1.5 text-label font-semibold text-text-muted">
          {program.audience}
        </span>
      </div>

      <h3 className="mt-5 font-display text-h2 font-semibold text-text-primary">
        {program.name}
      </h3>
      <p className="mt-2.5 text-body text-text-secondary">
        {program.description}
      </p>

      <ul className="mt-6 flex flex-col gap-2.5">
        {program.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2.5 text-body-sm text-text-secondary">
            <CheckIcon className={cn("mt-0.5", accentCheck[program.accent])} />
            {highlight}
          </li>
        ))}
      </ul>

      <span className="mt-8 inline-flex items-center gap-2 pt-2 text-label font-semibold text-text-primary">
        Explore program
        <span className="transition-transform duration-(--dur-fast) ease-out motion-safe:group-hover:translate-x-1">
          <ArrowIcon />
        </span>
      </span>
    </Link>
  );
}

/**
 * Career pathways grid (FAV-24) — the two entry programs (IB Elite Program,
 * Experienced Professionals) that route to their sub-pages, on a light content
 * surface. Heading + lead reveal on scroll, then the 2-up grid staggers in
 * (reflowing to 1-up on mobile). All motion honors reduced motion through the
 * shared reveal + `motion-safe:` primitives (§8).
 */
export function CareerPathways() {
  return (
    <Section tone="light">
      <Reveal className="max-w-2xl">
        <Eyebrow>Careers</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          Two ways to build a career with us
        </h2>
        <p className="mt-5 text-body-lg text-text-secondary">
          Whether you are starting out or already running deals, we hire people
          who want ownership from day one. Explore the track that fits where you
          are.
        </p>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
        {careerPrograms.map((program) => (
          <RevealItem key={program.href} className="h-full">
            <ProgramCard program={program} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
