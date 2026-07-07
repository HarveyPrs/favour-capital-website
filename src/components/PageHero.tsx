import type { ImageProps } from "next/image";
import type { ReactNode } from "react";

import { type BackgroundLayer,BackgroundLayers } from "@/components/BackgroundLayers";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

type PageHeroProps = {
  /** Overline label above the headline. */
  eyebrow: string;
  /** Page headline — pass rich content to tint a phrase with `grad-headline`. */
  title: ReactNode;
  /** Supporting lead paragraph. */
  lead?: string;
  /** Optional backdrop photo (served through the layer system). */
  image?: ImageProps["src"];
  /** Optional CTA row (e.g. `<Button />`s) rendered under the lead. */
  actions?: ReactNode;
};

/**
 * Interior page hero (§6) — the compact, dark counterpart to the homepage v5
 * hero, shared across the Phase 3 pages. A single ink section over the layered
 * background system (glow → grid → scrim → folded-corner accent, with an
 * optional Ken-Burns photo), clearing the fixed header with top padding. The
 * eyebrow, headline, lead and CTAs reveal in a stagger and honor reduced motion
 * through the shared primitives (§8). Composed entirely from design-system
 * primitives, so it stays a server component.
 */
export function PageHero({ eyebrow, title, lead, image, actions }: PageHeroProps) {
  const layers: BackgroundLayer[] = image
    ? ["photo", "glow", "grid", "scrim", "diagonal"]
    : ["glow", "grid", "scrim", "diagonal"];

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <BackgroundLayers
        layers={layers}
        image={image}
        priority
        intensity="subtle"
      />

      <Container className="relative z-10 pt-36 pb-16 md:pt-44 md:pb-24">
        <RevealGroup className="max-w-3xl">
          <RevealItem>
            <Eyebrow>{eyebrow}</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h1 className="mt-6 font-display text-display-xl font-extrabold text-text-primary">
              {title}
            </h1>
          </RevealItem>
          {lead && (
            <RevealItem>
              <p className="mt-6 max-w-2xl text-body-lg text-text-secondary">
                {lead}
              </p>
            </RevealItem>
          )}
        </RevealGroup>

        {actions && (
          <Reveal className="mt-9 flex flex-wrap gap-3.5">{actions}</Reveal>
        )}
      </Container>
    </section>
  );
}
