import { BackgroundLayers } from "@/components/BackgroundLayers";
import { Eyebrow } from "@/components/Eyebrow";
import { GlassCard } from "@/components/GlassCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";

type Accent = "orange" | "blue";

/**
 * Homepage differentiation ("what sets us apart") — content parity with the
 * old Services "Our differentiation" section (FAV-16), which stacked the three
 * themes as hard-to-read white-on-photo modules. Here each theme becomes a
 * designed module on the dark surface: a numbered theme header in the left rail
 * beside a 2-up grid of glass point cards. The header + lead reveal on scroll,
 * then each module's cards stagger in; cards lift on hover. The accent alternates
 * orange → blue → orange, but meaning never rests on color (§8) — every point
 * carries its own title. All motion honors reduced motion via the shared reveal
 * + `motion-safe:` primitives.
 */
const groups: {
  accent: Accent;
  theme: string;
  points: { title: string; description: string }[];
}[] = [
  {
    accent: "orange",
    theme: "Investors network",
    points: [
      {
        title: "Established investors network",
        description:
          "We accumulate a network of investors from the Asian market and global investors who are focusing on the emerging Asian markets.",
      },
      {
        title: "High-efficiency investor targeting",
        description:
          "We leverage our comprehensive knowledge database of investors’ focus, appetite, expertise, and decision-making process.",
      },
    ],
  },
  {
    accent: "blue",
    theme: "Managing the entire transaction",
    points: [
      {
        title: "Strategy and storyline alignment",
        description:
          "We maximize our proprietary know-how to refine capital raising and M&A materials to align with investors’ expectations.",
      },
      {
        title: "Professional execution",
        description:
          "We are hands-on and proactively involved in the entire process of due diligence and legal documents negotiation.",
      },
    ],
  },
  {
    accent: "orange",
    theme: "Navigating cross-border transactions",
    points: [
      {
        title: "Cross-border execution experience",
        description:
          "We utilize our diverse cross-border team to manage different cultural dynamics and complex regulatory requirements.",
      },
      {
        title: "Deal structure orchestration",
        description:
          "We work alongside our clients to design deal structures that meet the best interests of every stakeholder.",
      },
    ],
  },
];

/* Numeral tint — a legible lighter step of each brand accent on the dark
   surface (§2.2/§2.3), paired with a short accent rule on the cards below. */
const accentNumeral: Record<Accent, string> = {
  orange: "text-orange-300",
  blue: "text-blue-300",
};

/* Short accent rule atop each point card — decorative, so color is never the
   sole carrier of meaning (§8). */
const accentRule: Record<Accent, string> = {
  orange: "bg-brand-orange",
  blue: "bg-brand-blue",
};

export function Differentiation() {
  return (
    <Section
      tone="dark"
      bg={
        <BackgroundLayers
          image="/singapore.webp"
          layers={["photo", "glow", "grid", "scrim"]}
          intensity="subtle"
        />
      }
    >
      <Reveal className="max-w-2xl">
        <Eyebrow>Our differentiation</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          What sets us apart
        </h2>
        <p className="mt-4 text-body-lg text-text-secondary">
          From the investors we know to the way we run a deal, three things make
          Favour Capital the partner emerging-market leaders trust to raise
          capital and cross borders.
        </p>
      </Reveal>

      <div className="mt-12 flex flex-col gap-12 md:mt-16 md:gap-16">
        {groups.map((group, index) => (
          <div
            key={group.theme}
            className="grid gap-6 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-10 lg:gap-14"
          >
            <Reveal>
              <span
                className={cn(
                  "block font-display text-h1 font-extrabold leading-none tabular-nums",
                  accentNumeral[group.accent],
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-h2 font-bold text-text-primary">
                {group.theme}
              </h3>
            </Reveal>

            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {group.points.map((point) => (
                <RevealItem key={point.title} className="h-full">
                  <GlassCard
                    className={cn(
                      "flex h-full flex-col p-6 md:p-7",
                      "transition-[transform,box-shadow,border-color] duration-(--dur-fast) ease-out",
                      "hover:border-hairline-2 hover:shadow-lg motion-safe:hover:-translate-y-[3px]",
                    )}
                  >
                    <span
                      className={cn(
                        "block h-0.5 w-8 rounded-pill",
                        accentRule[group.accent],
                      )}
                    />
                    <h4 className="mt-5 font-display text-h3 font-semibold text-text-primary">
                      {point.title}
                    </h4>
                    <p className="mt-2.5 text-body text-text-secondary">
                      {point.description}
                    </p>
                  </GlassCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </Section>
  );
}
