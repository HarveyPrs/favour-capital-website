"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

import { BackgroundLayers } from "@/components/BackgroundLayers";
import { Eyebrow } from "@/components/Eyebrow";
import {
  MAP_DOTS,
  MAP_VIEWBOX,
  project,
} from "@/components/investorNetworkDots";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { StatBlock } from "@/components/StatBlock";
import { cn } from "@/lib/cn";

/**
 * Homepage investor network (FAV-17) — visualizes Favour Capital's global
 * reach. A crisp, vector "halftone" world map (dots sampled from Natural Earth
 * land, see investorNetworkDots.ts) carries glowing nodes for each investor
 * geography, with animated arcs drawn from the Singapore hub to every market.
 *
 * The SVG is decorative (`aria-hidden`); the real data lives in the
 * region-grouped legend below, which doubles as the accessible text
 * alternative and the interactive control: hovering/focusing a market there
 * (or hovering a node) lights up the matching node, arc and floating label.
 * Arc draw-in reveals on scroll and collapses to a static map under
 * `prefers-reduced-motion` (§8); every other cue is a non-motion state change.
 */

type Group = "Asia" | "Middle East" | "Europe" | "Oceania" | "Americas";

type Market = {
  id: string;
  /** Display name (also the legend chip + floating label). */
  name: string;
  group: Group;
  lon: number;
  lat: number;
  /** Optional sub-line shown in the legend (e.g. the SEA cluster's members). */
  detail?: string;
  /** The Singapore home base — rendered larger, pulsing, with no arc to self. */
  hub?: boolean;
};

/* Geographies from SCOPE.md / the issue. The Southeast Asia cluster stands in
   for Indonesia, Vietnam, Malaysia, Thailand and the Philippines (named in its
   detail line) so the map stays readable while the data stays complete. */
const MARKETS: Market[] = [
  { id: "sg", name: "Singapore", group: "Asia", lon: 103.8, lat: 1.35, detail: "Global headquarters", hub: true },
  { id: "sea", name: "Southeast Asia", group: "Asia", lon: 113, lat: 0, detail: "Indonesia · Vietnam · Malaysia · Thailand · Philippines" },
  { id: "cn", name: "China", group: "Asia", lon: 108, lat: 35 },
  { id: "kr", name: "South Korea", group: "Asia", lon: 127.8, lat: 36.5 },
  { id: "jp", name: "Japan", group: "Asia", lon: 138, lat: 37 },
  { id: "in", name: "India", group: "Asia", lon: 78, lat: 22 },
  { id: "sa", name: "Saudi Arabia", group: "Middle East", lon: 45, lat: 24 },
  { id: "ae", name: "United Arab Emirates", group: "Middle East", lon: 54, lat: 24 },
  { id: "uk", name: "United Kingdom", group: "Europe", lon: -2, lat: 53 },
  { id: "de", name: "Germany", group: "Europe", lon: 10.4, lat: 51.2 },
  { id: "fr", name: "France", group: "Europe", lon: 2.3, lat: 46.8 },
  { id: "au", name: "Australia", group: "Oceania", lon: 134, lat: -25 },
  { id: "nz", name: "New Zealand", group: "Oceania", lon: 172, lat: -41 },
  { id: "us", name: "United States", group: "Americas", lon: -98, lat: 39 },
];

/* Legend column order (Asia-first, mirroring the firm's centre of gravity). */
const GROUP_ORDER: Group[] = ["Asia", "Middle East", "Europe", "Oceania", "Americas"];

/** Precomputed screen positions so the map and legend share one projection. */
const NODES = MARKETS.map((m) => {
  const [x, y] = project(m.lon, m.lat);
  return { ...m, x, y };
});
type Node = (typeof NODES)[number];

const HUB = NODES.find((n) => n.hub)!;

/* Quadratic arc from the hub to a market, bowed toward the top for a subtle
   great-circle feel. */
function arcPath(a: Node, b: Node): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  let nx = -dy / dist;
  let ny = dx / dist;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const k = dist * 0.22;
  return `M${a.x},${a.y} Q${mx + nx * k},${my + ny * k} ${b.x},${b.y}`;
}

const { w: VB_W, h: VB_H } = MAP_VIEWBOX;

/* Floating label horizontal anchoring — keep edge labels inside the frame. */
function labelTransform(xPct: number): string {
  if (xPct > 82) return "translate(-88%, -142%)";
  if (xPct < 14) return "translate(-12%, -142%)";
  return "translate(-50%, -142%)";
}

export function InvestorNetwork() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const gradientId = useId();

  const spokes = NODES.filter((n) => !n.hub);
  const activeNode = NODES.find((n) => n.id === activeId) ?? null;
  const hasActive = activeNode !== null;

  return (
    <Section
      tone="dark"
      bg={<BackgroundLayers layers={["glow", "grid", "scrim"]} intensity="subtle" />}
    >
      <Reveal className="max-w-2xl">
        <Eyebrow>Global reach</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          An investor network without borders
        </h2>
        <p className="mt-4 text-body-lg text-text-secondary">
          From our Singapore base we connect Asia&apos;s industry leaders to the
          right capital across 18 markets — spanning Asia, the Middle East,
          Europe, Oceania and North America.
        </p>
      </Reveal>

      <Reveal className="mt-10 md:mt-14">
        {/* Map frame — the SVG is decorative; the legend below carries the data. */}
        <figure className="relative overflow-hidden rounded-lg border border-hairline bg-surface-1/40 p-3 sm:p-5">
          <div className="relative">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="block w-full"
              role="presentation"
              aria-hidden
            >
              <defs>
                <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" className="[stop-color:var(--color-brand-orange)]" />
                  <stop offset="100%" className="[stop-color:var(--color-brand-orange)]" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Halftone land */}
              <g className="fill-white" opacity={0.12}>
                {MAP_DOTS.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={1.6} />
                ))}
              </g>

              {/* Arcs: hub → each market. pathLength reveals on scroll. */}
              <g fill="none" strokeLinecap="round">
                {spokes.map((n, i) => {
                  const isActive = n.id === activeId;
                  return (
                    <motion.path
                      key={n.id}
                      d={arcPath(HUB, n)}
                      className={cn(
                        // Stroke opacity + width live in the class (not `style`)
                        // because framer-motion snapshots `style` and won't
                        // reapply non-animated props on state change.
                        "transition-[stroke,stroke-width] duration-(--dur-base) ease-out motion-reduce:transition-none",
                        isActive
                          ? "stroke-brand-orange/90 [stroke-width:1.6]"
                          : hasActive
                            ? "stroke-blue-400/10 [stroke-width:1]"
                            : "stroke-blue-400/30 [stroke-width:1]",
                      )}
                      initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 1.1,
                        ease: "easeOut",
                        delay: prefersReducedMotion ? 0 : 0.15 + i * 0.06,
                      }}
                    />
                  );
                })}
              </g>

              {/* Nodes */}
              {NODES.map((n) => {
                const isActive = n.id === activeId;
                const lit = isActive || n.hub;
                return (
                  <g
                    key={n.id}
                    className="cursor-pointer transition-transform duration-(--dur-fast) ease-out motion-reduce:transition-none [transform-box:fill-box] [transform-origin:center]"
                    style={{ transform: isActive ? "scale(1.4)" : "scale(1)" }}
                    onMouseEnter={() => setActiveId(n.id)}
                    onMouseLeave={() => setActiveId(null)}
                  >
                    {/* generous invisible hit target */}
                    <circle cx={n.x} cy={n.y} r={12} fill="transparent" />
                    {n.hub && (
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={7}
                        fill={`url(#${gradientId})`}
                        className="motion-safe:animate-ping [transform-box:fill-box] [transform-origin:center]"
                      />
                    )}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.hub ? 8 : 6}
                      className={cn(
                        "transition-colors duration-(--dur-base) motion-reduce:transition-none",
                        lit ? "fill-brand-orange" : "fill-brand-blue",
                      )}
                      opacity={lit ? 0.28 : 0.22}
                    />
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.hub ? 3.4 : 2.6}
                      className={cn(
                        "transition-colors duration-(--dur-base) motion-reduce:transition-none",
                        lit ? "fill-orange-300" : "fill-blue-300",
                      )}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Floating labels (HTML overlay so text stays crisp at any width) */}
            {NODES.map((n) => {
              const xPct = (n.x / VB_W) * 100;
              const yPct = (n.y / VB_H) * 100;
              const shown = n.id === activeId || n.hub;
              return (
                <span
                  key={n.id}
                  className={cn(
                    "pointer-events-none absolute z-10 whitespace-nowrap rounded-pill border px-2.5 py-1 text-label font-semibold transition-opacity duration-(--dur-fast) motion-reduce:transition-none",
                    n.id === activeId
                      ? "border-brand-orange/50 bg-ink/85 text-text-primary"
                      : "border-hairline bg-ink/80 text-text-secondary",
                    shown ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    left: `${xPct}%`,
                    top: `${yPct}%`,
                    transform: labelTransform(xPct),
                  }}
                >
                  {n.name}
                </span>
              );
            })}
          </div>
        </figure>
      </Reveal>

      {/* Stats + the region-grouped legend (the accessible data table). */}
      <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14">
        <Reveal className="flex flex-row gap-10 md:flex-col md:gap-8">
          <StatBlock value={500} suffix="+" label="Investors in our network" placeholder />
          <StatBlock value={18} suffix="+" label="Markets across five regions" />
        </Reveal>

        <Reveal>
          <h3 className="text-overline font-semibold uppercase text-text-muted">
            Where our investors are
          </h3>
          <dl className="mt-5 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {GROUP_ORDER.map((group) => (
              <div key={group}>
                <dt className="mb-3 font-display text-h3 font-semibold text-text-primary">
                  {group}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {NODES.filter((n) => n.group === group).map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onMouseEnter={() => setActiveId(n.id)}
                      onMouseLeave={() => setActiveId(null)}
                      onFocus={() => setActiveId(n.id)}
                      onBlur={() => setActiveId(null)}
                      aria-pressed={n.id === activeId}
                      title={n.detail}
                      className={cn(
                        "rounded-pill border px-3 py-1.5 text-body-sm transition-colors duration-(--dur-fast) motion-reduce:transition-none",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60",
                        n.id === activeId
                          ? "border-brand-orange/50 bg-brand-orange/13 text-text-primary"
                          : "border-hairline bg-white/[0.03] text-text-secondary hover:border-hairline-2 hover:text-text-primary",
                      )}
                    >
                      {n.name}
                      {n.hub && (
                        <span className="ml-1.5 text-text-accent">· HQ</span>
                      )}
                    </button>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-body-sm text-text-muted">
            Southeast Asia spans Indonesia, Vietnam, Malaysia, Thailand and the
            Philippines.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
