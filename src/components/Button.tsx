import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonProps =
  | (CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | (CommonProps & {
      href?: undefined;
    } & ButtonHTMLAttributes<HTMLButtonElement>);

/*
 * Base styles are forced against host/reset defaults (§6): explicit
 * `appearance-none`, background and text color so the button can never inherit
 * a UA or reset treatment. The −3px hover lift / −1px press is a `transform`
 * behind `motion-safe:` so it's dropped entirely under reduced motion (§8);
 * the shadow deepens on the same `dur-fast` curve.
 */
const base =
  "inline-flex cursor-pointer select-none appearance-none items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-label font-semibold transition-[transform,box-shadow] duration-(--dur-fast) ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-[3px] motion-safe:active:-translate-y-px";

/*
 * White by default (dark hero context). On light sections the `.tone-light`
 * scope inverts primary → navy solid and keeps secondary/ghost legible.
 */
const byVariant: Record<Variant, string> = {
  primary:
    "bg-white text-brand-navy shadow-lg hover:shadow-xl [.tone-light_&]:bg-brand-navy [.tone-light_&]:text-white",
  secondary:
    "border border-hairline-2 bg-white/90 text-brand-navy shadow-md hover:shadow-lg [.tone-light_&]:border-brand-navy/15 [.tone-light_&]:bg-white",
  ghost:
    "border border-hairline bg-white/11 text-white hover:bg-white/15 [.tone-light_&]:border-brand-navy/15 [.tone-light_&]:bg-brand-navy/5 [.tone-light_&]:text-brand-navy",
};

/**
 * Button (§6). Primary is white-by-default with navy text and a −3px lift on
 * hover / −1px while pressed; secondary and ghost share the lift. Pass `href`
 * to render an anchor with the same treatment. Pure CSS — safe to use in
 * server components and free of hydration cost.
 */
export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(base, byVariant[variant], className);

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
