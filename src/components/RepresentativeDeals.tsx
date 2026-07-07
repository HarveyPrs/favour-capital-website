import { BackgroundLayers } from "@/components/BackgroundLayers";
import { DealCard } from "@/components/DealCard";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";

/**
 * Homepage representative deals & clients (FAV-18) — the strongest proof block.
 * A dark section (so the glass `DealCard` tombstones read as designed, and the
 * page steps light → dark after the investor map): a 3-up tombstone showcase of
 * confirmed transactions, then a monochrome client wordmark strip. Heading +
 * lead reveal on scroll, the tombstones stagger in and lift on hover, and the
 * client marks reveal as a group — all via the shared reveal + `motion-safe:`
 * primitives, so everything collapses cleanly under reduced motion (§8).
 */

/* Confirmed tombstones (SCOPE.md · DESIGN_SYSTEM.md §9) — real, closed deals.
   Not placeholders, so no `*`. The hero floats these three; here they get a
   proper showcase grid. Add more as data lands (Dekoruma / Desty amounts + investors). */
const deals = [
  {
    company: "dtcpay",
    round: "Series A",
    amount: "US$10.0M",
    investors: "Vertex Ventures SEA & India",
  },
  {
    company: "Buymed",
    round: "Series B",
    amount: "US$51.5M",
    investors: "UOB Venture · DFC · Smilegate",
  },
  {
    company: "Inteluck",
    round: "Series C",
    amount: "US$34M",
    investors: "Navegar · East Ventures",
  },
] as const;

/* Representative clients (FAV-18 · SCOPE.md). Rendered as typographic wordmarks
   until brand-supplied logo SVGs land — see the handoff note. Names only; no
   figures are invented. */
const clients = [
  "dtcpay",
  "Buymed",
  "Inteluck",
  "Dekoruma",
  "Desty",
  "GFG",
  "Fore Coffee",
] as const;

export function RepresentativeDeals() {
  return (
    <Section
      tone="dark"
      bg={<BackgroundLayers layers={["glow", "grid"]} intensity="subtle" />}
    >
      <Reveal className="max-w-2xl">
        <Eyebrow>Representative deals</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          Transactions that speak for themselves
        </h2>
        <p className="mt-4 text-body-lg text-text-secondary">
          A selection of recent capital raises we&apos;ve led for founders across
          Southeast Asia — onboarding the institutional and strategic investors
          that power their next stage of growth.
        </p>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
        {deals.map((deal) => (
          <RevealItem key={deal.company} className="h-full">
            <DealCard
              {...deal}
              className={cn(
                "h-full p-6 md:p-7",
                "transition-[transform,box-shadow,border-color] duration-(--dur-fast) ease-out",
                "hover:border-hairline-2 hover:shadow-lg motion-safe:hover:-translate-y-[3px]",
              )}
            />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Client wordmark strip — a monochrome logo wall that lifts to white on
          hover. Bordered like the track-record strip for a designed, even row. */}
      <Reveal className="mt-16 md:mt-20">
        <h3 className="text-center text-overline font-semibold uppercase text-text-muted">
          Trusted by industry leaders across tech and consumer
        </h3>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-y border-hairline py-8 sm:gap-x-14 md:mt-8">
          {clients.map((client) => (
            <li
              key={client}
              className="font-display text-h3 font-bold text-text-muted transition-colors duration-(--dur-fast) ease-out hover:text-text-primary"
            >
              {client}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
