/**
 * Motion tokens (DESIGN_SYSTEM.md §5) as JS constants for Framer Motion,
 * which needs numeric seconds/easing arrays rather than CSS vars. Keep
 * these values in lockstep with the `--dur-*` / `--ease-*` vars in
 * globals.css — one is for CSS transitions, this is for `motion.*` props.
 */

export const duration = {
  fast: 0.18,
  base: 0.3,
  slow: 0.7,
  count: 1.4,
  ambientMin: 15,
  ambientMax: 26,
} as const;

export const ease = {
  out: [0.2, 0.7, 0.2, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

/** Reveal-on-scroll (§5): fade + rise, once, staggered children. */
export const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

export const revealTransition = {
  duration: duration.slow,
  ease: ease.out,
} as const;

export const staggerChildren = 0.1;
