import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Element to render as — defaults to `div`. */
  as?: ElementType;
};

/**
 * Centered content column (§4): max-width 1200px, side padding 24px on mobile
 * → 48px on desktop. The horizontal rhythm every section shares.
 */
export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full max-w-page px-6 md:px-12", className)}>
      {children}
    </Component>
  );
}
