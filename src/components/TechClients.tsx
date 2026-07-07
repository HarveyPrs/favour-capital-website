import { BackgroundLayers } from "@/components/BackgroundLayers";
import { Eyebrow } from "@/components/Eyebrow";
import { GlassCard } from "@/components/GlassCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";

/* Representative tech clients (content parity with the live Tech page) paired
   with the confirmed deal facts already shown across the site. All three are
   tech mandates, so this doubles as the page's "related deals" proof — real,
   closed transactions, no placeholders. */
const techClients = [
  {
    company: "Inteluck",
    sectors: ["Logistics", "Supply Chain", "Technology"],
    round: "Series C",
    amount: "US$34M",
    investors: "Navegar · East Ventures",
  },
  {
    company: "Buymed",
    sectors: ["Pharmaceuticals", "Supply Chain", "Platform"],
    round: "Series B",
    amount: "US$51.5M",
    investors: "UOB Venture · DFC · Smilegate",
  },
  {
    company: "dtcpay",
    sectors: ["Digital Payment", "Blockchain", "Platform"],
    round: "Series A",
    amount: "US$10.0M",
    investors: "Vertex Ventures SEA & India",
  },
] as const;

/**
 * Representative tech clients & deals (FAV-22). A dark section (so the glass
 * tombstones read as designed and the page steps light → dark after the
 * coverage grid): a 3-up showcase of the tech-sector leaders we've advised,
 * each carrying its sub-sector tags plus the confirmed round, amount and
 * investors. Heading + lead reveal on scroll and the cards stagger in and lift
 * on hover, all via the shared reveal + `motion-safe:` primitives (§8).
 */
export function TechClients() {
  return (
    <Section
      id="tech-deals"
      tone="dark"
      bg={<BackgroundLayers layers={["glow", "grid"]} intensity="subtle" />}
      className="scroll-mt-24"
    >
      <Reveal className="max-w-2xl">
        <Eyebrow>Representative clients</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          Trusted by tech leaders across the region
        </h2>
        <p className="mt-4 text-body-lg text-text-secondary">
          Assisting the tech sector&apos;s industry leaders through their
          expansion journey — onboarding institutional and strategic investors
          and running the whole transaction end to end.
        </p>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
        {techClients.map((client) => (
          <RevealItem key={client.company} className="h-full">
            <GlassCard
              className={cn(
                "flex h-full flex-col p-6 md:p-7",
                "transition-[transform,box-shadow,border-color] duration-(--dur-fast) ease-out",
                "hover:border-hairline-2 hover:shadow-lg motion-safe:hover:-translate-y-[3px]",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-h3 font-bold text-text-primary">
                  {client.company}
                </span>
                <span className="rounded-sm bg-blue-400/20 px-2 py-1 text-overline font-semibold tracking-normal text-blue-100">
                  {client.round}
                </span>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {client.sectors.map((sector) => (
                  <li
                    key={sector}
                    className="rounded-pill border border-hairline px-2.5 py-1 text-body-sm text-text-muted"
                  >
                    {sector}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <p className="font-display text-h3 font-bold text-text-accent">
                  {client.amount}
                </p>
                <p className="mt-1 text-body-sm text-text-muted">
                  {client.investors}
                </p>
              </div>
            </GlassCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
