import { BackgroundLayers } from "@/components/BackgroundLayers";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

/**
 * Closing CTA band (FAV-19) — the page's final, full-width call to contact.
 * A dark section over the gradient-lit background system (glow blobs + masked
 * grid at `bold` intensity, so the brand light reads strongly with only a thin
 * veil), with centred copy and the one primary CTA of the view (white pill,
 * navy text, −3px lift — §6). A muted email link offers a low-key alternative
 * without competing for the primary action. Content reveals on scroll and
 * honors reduced motion through the shared primitives (§8).
 */
export function ClosingCta() {
  return (
    <Section
      tone="dark"
      bg={<BackgroundLayers layers={["glow", "grid"]} intensity="bold" />}
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow>Get in touch</Eyebrow>
        <h2 className="mt-6 font-display text-display-lg font-extrabold text-text-primary md:text-display-xl">
          Ready to raise capital or explore a transaction?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-body-lg text-text-secondary">
          Tell us about your business and where you want to take it. Our team
          will get back to you to discuss how we can help you scale across
          markets.
        </p>
        <div className="mt-9 flex flex-col items-center gap-5">
          <Button href="/get-in-touch" variant="primary">
            Get in touch
          </Button>
          <a
            href="mailto:admin@favour-capital.com"
            className="text-body-sm text-text-muted underline-offset-4 transition-colors duration-(--dur-fast) ease-out hover:text-text-primary hover:underline focus-visible:text-text-primary focus-visible:underline focus-visible:outline-none"
          >
            Or email admin@favour-capital.com
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
