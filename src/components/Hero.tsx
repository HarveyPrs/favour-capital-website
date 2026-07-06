import { BackgroundLayers } from "@/components/BackgroundLayers";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DealCard } from "@/components/DealCard";
import { Eyebrow } from "@/components/Eyebrow";
import { RevealGroup, RevealItem } from "@/components/Reveal";

/** Representative deals (SCOPE.md) — real, confirmed tombstones. */
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

/**
 * Homepage hero — approved concept "v5" (FAV-14, DESIGN_SYSTEM.md §9). A full
 * viewport section over the layered background system (Singapore skyline →
 * glow → grid → scrim → folded-corner accent), with the display headline and
 * white lift-on-hover CTAs on the left, floating glass DealCards on the right,
 * and an animated StatBlock strip pinned to the bottom. Everything reveals in a
 * stagger on load and honors reduced motion through the shared primitives.
 *
 * Composed entirely from design-system primitives; the global `<SiteHeader>`
 * (fixed, transparent over this hero) supplies the nav, so the section starts
 * below it via top padding rather than declaring its own bar.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-ink">
      {/* Background layer system — LCP image loads eagerly, no CLS (fill). */}
      <BackgroundLayers image="/singapore.webp" priority />

      {/* Hero body — headline + CTAs beside the floating deal tombstones. */}
      <div className="relative z-10 flex flex-1 items-center pt-24 md:pt-28">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <RevealGroup>
            <RevealItem>
              <Eyebrow pulse>Boutique investment bank · Singapore</Eyebrow>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-6 max-w-[14ch] font-display text-display-xl font-extrabold text-text-primary">
                Capital raising and M&amp;A advisory for{" "}
                <span className="grad-headline">Asia&apos;s industry leaders</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 max-w-[46ch] text-body-lg text-text-secondary">
                We help founders in tech and consumer scale regionally and
                globally — onboarding the right institutional and strategic
                investors, and running the entire transaction.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Button href="/get-in-touch" variant="primary">
                  Get in touch
                </Button>
                <Button href="/services-and-clients" variant="secondary">
                  View our deals →
                </Button>
              </div>
            </RevealItem>
          </RevealGroup>

          <RevealGroup className="flex flex-col gap-3.5">
            {deals.map((deal, i) => (
              <RevealItem key={deal.company}>
                <DealCard bob bobDelay={i * 0.55} {...deal} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </div>
    </section>
  );
}
