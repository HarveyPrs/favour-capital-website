"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide Framer Motion config. `reducedMotion="user"` makes every motion
 * component honor `prefers-reduced-motion` automatically (§8) — transform and
 * layout animations are skipped for those users while opacity fades are kept,
 * so components can declare a single set of variants without branching on the
 * preference (which would otherwise mismatch between server and client render).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
