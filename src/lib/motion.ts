/**
 * Motion tokens (DESIGN_SYSTEM.md §5) as JS constants for Framer Motion,
 * which needs numeric seconds/easing arrays rather than CSS vars. Keep
 * these values in lockstep with the `--dur-*` / `--ease-*` vars in
 * globals.css — one is for CSS transitions, this is for `motion.*` props.
 *
 * `prefers-reduced-motion` is handled twice: the CSS media query in
 * globals.css collapses CSS transitions/animations, but Framer Motion
 * drives transforms via JS and never sees that media query — components
 * must call `useReducedMotion()` and pass it into `getRevealVariants` to
 * drop the transform while keeping the opacity fade.
 */

export { useReducedMotion } from "framer-motion";

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

/**
 * Shared Framer `transition` presets bound to the motion tokens (§5). Reach
 * for these instead of hand-writing `{ duration, ease }` so every enter,
 * hover and reveal pulls from the same curves.
 */
export const transition = {
  fast: { duration: duration.fast, ease: ease.out },
  base: { duration: duration.base, ease: ease.out },
  slow: { duration: duration.slow, ease: ease.out },
} as const;

/**
 * Reveal-on-scroll (§5): fade + rise, once, staggered children. Pass the
 * result of `useReducedMotion()` so the rise collapses to a plain fade
 * when the user has reduced motion enabled.
 */
export function getRevealVariants(prefersReducedMotion: boolean | null) {
  return {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0 },
  } as const;
}

/** Default reveal variants for callers that haven't checked the preference. */
export const revealVariants = getRevealVariants(false);

export const revealTransition = transition.slow;

export const staggerChildren = 0.1;

/**
 * Hover-lift interaction (§5) for Framer motion components (buttons, cards):
 * rise 3px on hover, settle to 1px while pressed, over `dur-fast`. Pass the
 * result of `useReducedMotion()` — when reduced motion is on we drop the
 * transform entirely (returning no interaction props) rather than snapping it.
 */
export function getHoverLift(prefersReducedMotion: boolean | null) {
  if (prefersReducedMotion) return {} as const;
  return {
    whileHover: { y: -3 },
    whileTap: { y: -1 },
    transition: transition.fast,
  } as const;
}
