import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

/* What the campus roadshow recap covers — qualitative framing only, so nothing
   here invents a figure that would need the placeholder `*` convention (§6). */
const recapHighlights = [
  "Campus roadshow across the region's top universities",
  "Live sessions on capital raising and M&A careers",
  "Meet the deal team behind our mandates",
];

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0 text-brand-orange"
      aria-hidden
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m6.5 6.5 2.5 2.5M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />
    </svg>
  );
}

/**
 * Culture teaser (FAV-24) — an "FC Event Recap" band spotlighting the campus
 * roadshow, on a dark surface. A two-column feature: framing copy + a CTA into
 * the Insights hub (where the recap lives) on the left, and a bordered glass
 * panel of qualitative highlights on the right, keeping it distinct from the
 * glow-lit closing CTA that follows. Content reveals on scroll and honors
 * reduced motion via the shared primitives (§8).
 */
export function CultureTeaser() {
  return (
    <Section tone="dark">
      <Reveal>
        <div className="grid items-center gap-8 rounded-lg border border-hairline bg-surface-1 p-6 md:grid-cols-2 md:gap-12 md:p-10 lg:p-12">
          <div>
            <Eyebrow>FC Event Recap</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
              Life at Favour Capital
            </h2>
            <p className="mt-5 text-body-lg text-text-secondary">
              From our campus roadshow to the deal room, we invest in the next
              generation of bankers. See how we bring careers in capital raising
              and M&amp;A to students across the region.
            </p>
            <div className="mt-8">
              <Button href="/insights-news" variant="ghost">
                Read the recap
              </Button>
            </div>
          </div>

          <ul className="flex flex-col gap-4 rounded-md border border-hairline bg-surface-2 p-6 md:p-7">
            {recapHighlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-body text-text-secondary"
              >
                <span className="mt-0.5">
                  <SparkIcon />
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
