import type { Metadata } from "next";

import { PrimitivesShowcase } from "./PrimitivesShowcase";

export const metadata: Metadata = {
  title: "Styleguide — Favour Capital",
  description: "Token reference for the Favour Capital design system.",
};

// Class names are spelled out literally (not interpolated) so Tailwind's
// scanner can find them — dynamically built class strings aren't detected.
const orangeRamp = [
  { step: "50", bg: "bg-orange-50", text: "text-brand-navy" },
  { step: "100", bg: "bg-orange-100", text: "text-brand-navy" },
  { step: "200", bg: "bg-orange-200", text: "text-brand-navy" },
  { step: "300", bg: "bg-orange-300", text: "text-brand-navy" },
  { step: "400", bg: "bg-orange-400", text: "text-white" },
  { step: "500", bg: "bg-orange-500", text: "text-white" },
  { step: "600", bg: "bg-orange-600", text: "text-white" },
  { step: "700", bg: "bg-orange-700", text: "text-white" },
  { step: "800", bg: "bg-orange-800", text: "text-white" },
  { step: "900", bg: "bg-orange-900", text: "text-white" },
] as const;

const blueRamp = [
  { step: "50", bg: "bg-blue-50", text: "text-brand-navy" },
  { step: "100", bg: "bg-blue-100", text: "text-brand-navy" },
  { step: "200", bg: "bg-blue-200", text: "text-brand-navy" },
  { step: "300", bg: "bg-blue-300", text: "text-white" },
  { step: "400", bg: "bg-blue-400", text: "text-white" },
  { step: "500", bg: "bg-blue-500", text: "text-white" },
  { step: "600", bg: "bg-blue-600", text: "text-white" },
  { step: "700", bg: "bg-blue-700", text: "text-white" },
  { step: "800", bg: "bg-blue-800", text: "text-white" },
  { step: "900", bg: "bg-blue-900", text: "text-white" },
] as const;

const spacingScale = [
  { label: "p-1 / w-1", bar: "w-1", px: 4 },
  { label: "p-2 / w-2", bar: "w-2", px: 8 },
  { label: "p-3 / w-3", bar: "w-3", px: 12 },
  { label: "p-4 / w-4", bar: "w-4", px: 16 },
  { label: "p-5 / w-5", bar: "w-5", px: 20 },
  { label: "p-6 / w-6", bar: "w-6", px: 24 },
  { label: "p-8 / w-8", bar: "w-8", px: 32 },
  { label: "p-10 / w-10", bar: "w-10", px: 40 },
  { label: "p-12 / w-12", bar: "w-12", px: 48 },
  { label: "p-16 / w-16", bar: "w-16", px: 64 },
  { label: "p-20 / w-20", bar: "w-20", px: 80 },
  { label: "p-24 / w-24", bar: "w-24", px: 96 },
  { label: "p-32 / w-32", bar: "w-32", px: 128 },
] as const;

const typeScale = [
  { token: "display-xl", className: "text-display-xl", sample: "Display XL" },
  { token: "display-lg", className: "text-display-lg", sample: "Display LG" },
  { token: "h1", className: "text-h1", sample: "Heading 1" },
  { token: "h2", className: "text-h2", sample: "Heading 2" },
  { token: "h3", className: "text-h3", sample: "Heading 3" },
  {
    token: "body-lg",
    className: "text-body-lg font-body",
    sample: "Body large — the quick brown fox",
  },
  {
    token: "body",
    className: "text-body font-body",
    sample: "Body — the quick brown fox",
  },
  {
    token: "body-sm",
    className: "text-body-sm font-body",
    sample: "Body small — the quick brown fox",
  },
  {
    token: "label",
    className: "text-label font-body font-semibold",
    sample: "Label",
  },
  {
    token: "overline",
    className:
      "text-overline font-body font-semibold uppercase text-brand-orange",
    sample: "Overline",
  },
] as const;

const motionDurations = [
  { token: "dur-fast", value: "180ms", use: "Hover, tap" },
  { token: "dur-base", value: "300ms", use: "Enter/leave, color" },
  { token: "dur-slow", value: "700ms", use: "Scroll reveals" },
  { token: "dur-count", value: "1400ms", use: "Stat count-ups" },
  {
    token: "dur-ambient",
    value: "15000–26000ms",
    use: "Drift, Ken-Burns",
  },
] as const;

const motionEasings = [
  {
    token: "ease-out",
    value: "cubic-bezier(.2,.7,.2,1)",
    use: "Default — the house curve",
  },
  {
    token: "ease-in-out",
    value: "cubic-bezier(.65,0,.35,1)",
    use: "Ambient loops",
  },
] as const;

function SwatchCard({
  name,
  hex,
  className,
  textClassName = "text-white",
}: {
  name: string;
  hex: string;
  className: string;
  textClassName?: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-hairline">
      <div className={`h-16 ${className}`} />
      <div className={`bg-surface-2 p-3 ${textClassName}`}>
        <p className="text-label font-semibold">{name}</p>
        <p className="text-body-sm text-text-muted">{hex}</p>
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main className="mx-auto w-full max-w-page px-6 py-16 md:px-12 md:py-24">
      <header className="mb-16">
        <p className="mb-3 inline-flex items-center gap-2 rounded-pill border border-brand-orange/40 bg-brand-orange/13 px-3.5 py-2 text-overline font-semibold uppercase text-text-accent">
          Design system
        </p>
        <h1 className="max-w-2xl text-display-lg font-display font-extrabold text-text-primary">
          Token reference
        </h1>
        <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">
          Every color, gradient, type size, spacing value, radius and motion
          curve on the site comes from this set. See{" "}
          <code className="text-body-sm text-text-accent">
            src/app/globals.css
          </code>{" "}
          for the source and{" "}
          <code className="text-body-sm text-text-accent">
            DESIGN_SYSTEM.md
          </code>{" "}
          §2–§5 for the spec.
        </p>
      </header>

      {/* Color */}
      <section className="mb-20">
        <h2 className="mb-6 text-h2 font-display font-bold">Color</h2>

        <h3 className="mb-3 text-h3 font-display font-semibold text-text-secondary">
          Brand core
        </h3>
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <SwatchCard name="brand-orange" hex="#F26522" className="bg-brand-orange" />
          <SwatchCard
            name="brand-orange-strong"
            hex="#EC5518"
            className="bg-brand-orange-strong"
          />
          <SwatchCard name="brand-blue" hex="#1D4ED8" className="bg-brand-blue" />
          <SwatchCard name="brand-navy" hex="#0B1E44" className="bg-brand-navy" />
          <SwatchCard name="ink" hex="#080D22" className="bg-ink" />
        </div>

        <h3 className="mb-3 text-h3 font-display font-semibold text-text-secondary">
          Orange ramp
        </h3>
        <div className="mb-10 grid grid-cols-5 gap-4 md:grid-cols-10">
          {orangeRamp.map((swatch) => (
            <SwatchCard
              key={swatch.step}
              name={`orange-${swatch.step}`}
              hex=""
              className={swatch.bg}
              textClassName={swatch.text}
            />
          ))}
        </div>

        <h3 className="mb-3 text-h3 font-display font-semibold text-text-secondary">
          Blue ramp
        </h3>
        <div className="mb-10 grid grid-cols-5 gap-4 md:grid-cols-10">
          {blueRamp.map((swatch) => (
            <SwatchCard
              key={swatch.step}
              name={`blue-${swatch.step}`}
              hex=""
              className={swatch.bg}
              textClassName={swatch.text}
            />
          ))}
        </div>

        <h3 className="mb-3 text-h3 font-display font-semibold text-text-secondary">
          Surfaces (dark)
        </h3>
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <SwatchCard name="ink" hex="#080D22" className="bg-ink" />
          <SwatchCard name="surface-1" hex="#0C1330" className="bg-surface-1" />
          <SwatchCard name="surface-2" hex="#121A3D" className="bg-surface-2" />
          <SwatchCard name="surface-3" hex="#1A2450" className="bg-surface-3" />
        </div>

        <h3 className="mb-3 text-h3 font-display font-semibold text-text-secondary">
          Semantic text — both tone sets resolve from the same class names
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md bg-ink p-6">
            <p className="mb-4 text-label font-semibold text-text-muted">
              tone: dark (default)
            </p>
            <p className="text-h3 font-display text-text-primary">
              text-primary
            </p>
            <p className="text-body text-text-secondary">text-secondary</p>
            <p className="text-body-sm text-text-muted">text-muted</p>
            <p className="text-body-sm text-text-accent">text-accent</p>
          </div>
          <div className="tone-light rounded-md bg-white p-6">
            <p className="mb-4 text-label font-semibold text-text-muted">
              tone: light (.tone-light)
            </p>
            <p className="text-h3 font-display text-text-primary">
              text-primary
            </p>
            <p className="text-body text-text-secondary">text-secondary</p>
            <p className="text-body-sm text-text-muted">text-muted</p>
            <p className="text-body-sm text-text-accent">text-accent</p>
          </div>
        </div>
      </section>

      {/* Gradients */}
      <section className="mb-20">
        <h2 className="mb-6 text-h2 font-display font-bold">
          Signature gradients
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-hairline bg-surface-2 p-6">
            <p className="grad-headline text-h2 font-display font-extrabold">
              Headline
            </p>
            <p className="mt-2 text-body-sm text-text-muted">grad-headline</p>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-md border border-hairline bg-surface-2 p-6">
            <span className="grad-cta rounded-pill px-5 py-3 text-label font-semibold text-white">
              Button
            </span>
            <p className="text-body-sm text-text-muted">grad-cta</p>
          </div>
          <div className="relative overflow-hidden rounded-md border border-hairline bg-surface-2 p-6">
            <div className="glow-orange absolute -top-8 -left-8 h-32 w-32 opacity-70 blur-2xl" />
            <p className="relative text-body-sm text-text-muted">glow-orange</p>
          </div>
          <div className="relative overflow-hidden rounded-md border border-hairline bg-surface-2 p-6">
            <div className="glow-blue absolute -top-8 -right-8 h-32 w-32 opacity-70 blur-2xl" />
            <p className="relative text-body-sm text-text-muted">glow-blue</p>
          </div>
        </div>
        <div className="glass mt-6 max-w-sm rounded-md border border-hairline p-6">
          <p className="text-label font-semibold text-white">glass</p>
          <p className="text-body-sm text-text-muted">
            backdrop-blur(8px) + --glass fill
          </p>
        </div>
      </section>

      {/* Type scale */}
      <section className="mb-20">
        <h2 className="mb-2 text-h2 font-display font-bold">Type scale</h2>
        <p className="mb-6 text-body-sm text-text-muted">
          Sizes shown at current viewport width — display/heading tokens
          resize automatically at the `md` breakpoint (see DESIGN_SYSTEM.md
          §3).
        </p>
        <div className="divide-y divide-hairline border-y border-hairline">
          {typeScale.map((row) => (
            <div key={row.token} className="flex flex-col gap-1 py-5">
              <p className="text-body-sm text-text-muted">{row.token}</p>
              <p className={`font-display text-text-primary ${row.className}`}>
                {row.sample}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section className="mb-20">
        <h2 className="mb-2 text-h2 font-display font-bold">Spacing</h2>
        <p className="mb-6 text-body-sm text-text-muted">
          Base unit 4px — Tailwind&apos;s default spacing scale already lines
          up 1:1 with DESIGN_SYSTEM.md §4, so no override was needed.
        </p>
        <div className="flex flex-col gap-3">
          {spacingScale.map((step) => (
            <div key={step.label} className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-body-sm text-text-muted">
                {step.px}px
              </span>
              <div className={`h-3 rounded-sm bg-brand-orange ${step.bar}`} />
              <span className="text-body-sm text-text-muted">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Radius & hairlines */}
      <section className="mb-20">
        <h2 className="mb-6 text-h2 font-display font-bold">
          Radius &amp; hairlines
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex h-20 items-center justify-center rounded-sm border border-hairline bg-surface-2 text-body-sm text-text-muted">
            rounded-sm
          </div>
          <div className="flex h-20 items-center justify-center rounded-md border border-hairline bg-surface-2 text-body-sm text-text-muted">
            rounded-md
          </div>
          <div className="flex h-20 items-center justify-center rounded-lg border border-hairline bg-surface-2 text-body-sm text-text-muted">
            rounded-lg
          </div>
          <div className="flex h-20 items-center justify-center rounded-pill border border-hairline-2 bg-surface-2 text-body-sm text-text-muted">
            rounded-pill
          </div>
        </div>
      </section>

      {/* Motion */}
      <section>
        <h2 className="mb-6 text-h2 font-display font-bold">Motion</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-h3 font-display font-semibold text-text-secondary">
              Durations
            </h3>
            <table className="w-full text-left text-body-sm">
              <tbody className="divide-y divide-hairline">
                {motionDurations.map((row) => (
                  <tr key={row.token}>
                    <td className="py-2 pr-4 text-text-primary">
                      {row.token}
                    </td>
                    <td className="py-2 pr-4 text-text-muted">{row.value}</td>
                    <td className="py-2 text-text-muted">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="mt-6 mb-3 text-h3 font-display font-semibold text-text-secondary">
              Easings
            </h3>
            <table className="w-full text-left text-body-sm">
              <tbody className="divide-y divide-hairline">
                {motionEasings.map((row) => (
                  <tr key={row.token}>
                    <td className="py-2 pr-4 text-text-primary">
                      {row.token}
                    </td>
                    <td className="py-2 pr-4 text-text-muted">{row.value}</td>
                    <td className="py-2 text-text-muted">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-body-sm text-text-muted">
              Matching Framer Motion constants (seconds, easing arrays) live
              in{" "}
              <code className="text-text-accent">src/lib/motion.ts</code>.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-h3 font-display font-semibold text-text-secondary">
              Hover-lift demo (dur-fast / ease-out)
            </h3>
            <button
              type="button"
              className="rounded-pill bg-white px-6 py-3.5 text-label font-semibold text-brand-navy shadow-lg transition-[transform,box-shadow] duration-(--dur-fast) ease-out hover:-translate-y-[3px] hover:shadow-xl active:-translate-y-px"
            >
              Get in touch
            </button>
            <p className="mt-3 text-body-sm text-text-muted">
              Honors <code className="text-text-accent">prefers-reduced-motion</code>{" "}
              globally (transitions collapse to ~0 — see globals.css).
            </p>
          </div>
        </div>
      </section>

      {/* Primitives & motion utilities (FAV-8) */}
      <section className="mt-20">
        <h2 className="mb-2 text-h2 font-display font-bold">
          Primitives &amp; motion utilities
        </h2>
        <p className="mb-8 text-body-sm text-text-muted">
          The base building blocks every page composes from —{" "}
          <code className="text-text-accent">Section</code>,{" "}
          <code className="text-text-accent">Container</code>,{" "}
          <code className="text-text-accent">Button</code>,{" "}
          <code className="text-text-accent">Eyebrow</code> — plus the{" "}
          <code className="text-text-accent">Reveal</code>,{" "}
          <code className="text-text-accent">useCountUp</code> and hover-lift
          motion helpers. All respect{" "}
          <code className="text-text-accent">prefers-reduced-motion</code>.
        </p>
        <PrimitivesShowcase />
      </section>
    </main>
  );
}
