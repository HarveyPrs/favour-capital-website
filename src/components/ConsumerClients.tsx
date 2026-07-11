import { BackgroundLayers } from "@/components/BackgroundLayers";
import { Eyebrow } from "@/components/Eyebrow";
import { GlassCard } from "@/components/GlassCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";

/* Representative consumer clients (content parity with the homepage client
   strip — SCOPE.md). Unlike the Tech page's `TechClients`, no confirmed round
   / amount / investor figures exist yet for these mandates, so the cards carry
   the company name only rather than inventing deal terms (the hard rule
   against invented figures). Swap for full tombstones once the data lands. */
const consumerClients = ["Dekoruma", "Desty", "GFG", "Fore Coffee"] as const;

/**
 * Representative consumer clients (FAV-23). A dark section (so the glass
 * tiles read as designed and the page steps light → dark after the coverage
 * grid, mirroring the Tech page's `TechClients` position): a 4-up showcase of
 * the consumer-sector leaders we've advised. Heading + lead reveal on scroll
 * and the tiles stagger in and lift on hover, all via the shared reveal +
 * `motion-safe:` primitives (§8).
 */
export function ConsumerClients() {
  return (
    <Section
      id="consumer-clients"
      tone="dark"
      bg={<BackgroundLayers layers={["glow", "grid"]} intensity="subtle" />}
      className="scroll-mt-24"
    >
      <Reveal className="max-w-2xl">
        <Eyebrow>Representative clients</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          Trusted by consumer leaders across the region
        </h2>
        <p className="mt-4 text-body-lg text-text-secondary">
          Assisting the consumer sector&apos;s industry leaders through their
          expansion journey — onboarding institutional and strategic investors
          and running the whole transaction end to end.
        </p>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-4">
        {consumerClients.map((client) => (
          <RevealItem key={client} className="h-full">
            <GlassCard
              className={cn(
                "flex h-full items-center justify-center p-6 text-center md:p-7",
                "transition-[transform,box-shadow,border-color] duration-(--dur-fast) ease-out",
                "hover:border-hairline-2 hover:shadow-lg motion-safe:hover:-translate-y-[3px]",
              )}
            >
              <span className="font-display text-h3 font-bold text-text-primary">
                {client}
              </span>
            </GlassCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
