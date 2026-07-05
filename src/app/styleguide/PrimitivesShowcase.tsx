"use client";

import { Button } from "@/components/Button";
import { CountUp } from "@/components/CountUp";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

/**
 * Live demos of the FAV-8 primitives + motion utilities. Kept as a client
 * island so the styleguide page stays a server component; the interactive
 * bits (hover-lift, count-up, scroll reveal) need the browser.
 */
export function PrimitivesShowcase() {
  return (
    <div className="flex flex-col gap-12">
      {/* Buttons */}
      <div>
        <h3 className="mb-4 text-h3 font-display font-semibold text-text-secondary">
          Buttons — white by default, −3px lift on hover / −1px on press
        </h3>
        <div className="flex flex-wrap items-center gap-4 rounded-md border border-hairline bg-surface-1 p-6">
          <Button variant="primary">Get in touch</Button>
          <Button variant="secondary">Our services</Button>
          <Button variant="ghost">Learn more</Button>
          <Button variant="primary" href="#buttons">
            As a link
          </Button>
        </div>
        <p className="mt-3 text-body-sm text-text-muted">
          On <code className="text-text-accent">.tone-light</code> sections
          primary inverts to navy:
        </p>
        <div className="tone-light mt-3 flex flex-wrap items-center gap-4 rounded-md border border-hairline bg-white p-6">
          <Button variant="primary">Get in touch</Button>
          <Button variant="secondary">Our services</Button>
          <Button variant="ghost">Learn more</Button>
        </div>
      </div>

      {/* Eyebrow */}
      <div>
        <h3 className="mb-4 text-h3 font-display font-semibold text-text-secondary">
          Eyebrow
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <Eyebrow>Design system</Eyebrow>
          <Eyebrow pulse>Now live</Eyebrow>
        </div>
      </div>

      {/* Count-up */}
      <div>
        <h3 className="mb-4 text-h3 font-display font-semibold text-text-secondary">
          Count-up (on scroll into view, `dur-count`)
        </h3>
        <div className="grid grid-cols-2 gap-6 rounded-md border border-hairline bg-surface-1 p-6 sm:grid-cols-3">
          <div>
            <p className="text-display-lg font-display font-extrabold text-text-primary">
              <CountUp to={1200} prefix="US$" suffix="M+" />
            </p>
            <p className="mt-1 text-overline font-semibold uppercase text-text-muted">
              Capital raised*
            </p>
          </div>
          <div>
            <p className="text-display-lg font-display font-extrabold text-text-primary">
              <CountUp to={40} suffix="+" />
            </p>
            <p className="mt-1 text-overline font-semibold uppercase text-text-muted">
              Transactions*
            </p>
          </div>
          <div>
            <p className="text-display-lg font-display font-extrabold text-text-primary">
              <CountUp to={15} />
            </p>
            <p className="mt-1 text-overline font-semibold uppercase text-text-muted">
              Years*
            </p>
          </div>
        </div>
      </div>

      {/* Reveal */}
      <div>
        <h3 className="mb-4 text-h3 font-display font-semibold text-text-secondary">
          Reveal — single block fades + rises on scroll
        </h3>
        <Reveal className="rounded-md border border-hairline bg-surface-1 p-6 text-body text-text-secondary">
          This block fades in and rises 16px the first time it enters the
          viewport, over `dur-slow` on the house `ease-out` curve.
        </Reveal>

        <h3 className="mt-8 mb-4 text-h3 font-display font-semibold text-text-secondary">
          RevealGroup / RevealItem — staggered children (0.1s)
        </h3>
        <RevealGroup className="grid gap-4 sm:grid-cols-3">
          {["First", "Second", "Third"].map((label) => (
            <RevealItem
              key={label}
              className="rounded-md border border-hairline bg-surface-1 p-6 text-body text-text-secondary"
            >
              {label}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
