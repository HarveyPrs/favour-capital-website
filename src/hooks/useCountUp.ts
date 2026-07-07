"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { duration } from "@/lib/motion";

/** Cubic ease-out (§5) — matches the CSS `ease-out` house curve's feel. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Count-up hook (§5): animates 0 → `target` over `dur-count` with a cubic
 * ease-out, triggered once the element scrolls into view. Attach the returned
 * `ref` to the element you want to watch and render `value` (always rounded).
 *
 * Reduced motion (§8): when the user prefers reduced motion we skip the
 * animation and set `value` to `target` immediately.
 */
export function useCountUp<T extends Element = HTMLElement>(target: number) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Reduced motion (§8): a zero-length "animation" lands on the target on
    // the first frame. Keeping the rAF path (rather than a synchronous
    // setState in the effect body) avoids cascading-render churn.
    const durationMs = prefersReducedMotion ? 0 : duration.count * 1000;
    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress =
        durationMs === 0 ? 1 : Math.min((now - start) / durationMs, 1);
      setValue(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, prefersReducedMotion]);

  return { ref, value };
}
