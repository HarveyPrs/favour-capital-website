"use client";

import { type HTMLMotionProps, motion } from "framer-motion";

import { revealTransition, revealVariants, staggerChildren } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div">;

/*
 * Variants are preference-independent so server and client render the same
 * initial state (no hydration mismatch). Reduced-motion users are handled by
 * `<MotionProvider reducedMotion="user">`, which drops the transform while
 * keeping the opacity fade (§8).
 */

/**
 * Reveal on scroll (§5): fade in + rise 16px, once, over `dur-slow`. Use for a
 * single block; for staggered lists wrap `RevealItem`s in `RevealGroup`.
 */
export function Reveal({ children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={revealVariants}
      transition={revealTransition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container that reveals its `RevealItem` children in sequence (§5,
 * `staggerChildren: 0.1`). It only orchestrates timing — the fade + rise lives
 * on each child so items animate individually.
 */
export function RevealGroup({ children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child inside `RevealGroup`. */
export function RevealItem({ children, ...rest }: RevealProps) {
  return (
    <motion.div variants={revealVariants} transition={revealTransition} {...rest}>
      {children}
    </motion.div>
  );
}
