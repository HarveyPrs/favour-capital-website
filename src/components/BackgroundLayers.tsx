import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/cn";

/** The composable layers, in stack order (§6). */
export type BackgroundLayer = "photo" | "glow" | "grid" | "scrim" | "diagonal";

const ALL_LAYERS: readonly BackgroundLayer[] = [
  "photo",
  "glow",
  "grid",
  "scrim",
  "diagonal",
];

type Intensity = "subtle" | "normal" | "bold";

/**
 * Per-intensity opacity for the ambient layers. Dark is the default (§2.7,
 * §6): a full-bleed ink `veil` sits over the photo + glow so the backdrop
 * reads as a moody dark surface with the image popping through, rather than a
 * lit photo. `normal` is the house default; `subtle` sinks the photo further
 * into the dark, `bold` pulls it forward (lighter veil). The scrim + grid ride
 * underneath, so the AA legibility guarantee (§8) only ever strengthens as the
 * veil deepens — never the other way. Light surfaces stay opt-in via the
 * `.tone-light` scope (they don't use this backdrop).
 */
const INTENSITY: Record<
  Intensity,
  { photo: number; glowBlue: number; glowOrange: number; veil: number }
> = {
  subtle: { photo: 0.42, glowBlue: 0.28, glowOrange: 0.22, veil: 0.42 },
  normal: { photo: 0.6, glowBlue: 0.36, glowOrange: 0.28, veil: 0.26 },
  bold: { photo: 0.64, glowBlue: 0.52, glowOrange: 0.42, veil: 0.14 },
};

type BackgroundLayersProps = {
  /**
   * Which layers to render, in any order (they always paint in the fixed
   * stack order regardless). Defaults to the full stack. The `photo` layer is
   * skipped automatically when no `image` is given.
   */
  layers?: BackgroundLayer[];
  /** Photo source (served through `next/image`). Required for the photo layer. */
  image?: ImageProps["src"];
  /** Alt text — leave empty for a purely decorative background. */
  imageAlt?: string;
  /** `object-position` for the photo (default frames the skyline). */
  imagePosition?: string;
  /** Eager-load the photo (set for an above-the-fold hero). */
  priority?: boolean;
  /** Scales photo + glow opacity; never touches the scrim (§8). */
  intensity?: Intensity;
  className?: string;
};

/**
 * Background layer system (§6): a reusable layered backdrop for dark immersive
 * sections. Fills its nearest positioned ancestor (`absolute inset-0`) and
 * paints, bottom to top, an optional Ken-Burns photo → drifting glow blobs →
 * masked hairline grid → dual-gradient scrim → diagonal brand accent. It is
 * `aria-hidden` and non-interactive; place the section's content in a sibling
 * with `relative z-10` (the `<Section bg>` slot wires this up).
 *
 * Pure CSS + `next/image`, so it stays a server component. Ambient loops are
 * `motion-safe:` utilities that pause under `prefers-reduced-motion` (§8).
 */
export function BackgroundLayers({
  layers = [...ALL_LAYERS],
  image,
  imageAlt = "",
  imagePosition = "center 34%",
  priority = false,
  intensity = "normal",
  className,
}: BackgroundLayersProps) {
  const has = (layer: BackgroundLayer) => layers.includes(layer);
  const opacity = INTENSITY[intensity];
  const showPhoto = has("photo") && Boolean(image);

  return (
    <div
      aria-hidden
      className={cn(
        // `isolate` scopes the blobs' `screen` blend to the backdrop so it
        // never bleeds onto page content behind the section.
        "pointer-events-none absolute inset-0 isolate overflow-hidden",
        className,
      )}
    >
      {showPhoto && (
        <div
          className="absolute inset-0 z-0 motion-safe:animate-ken-burns"
          style={{ opacity: opacity.photo }}
        >
          <Image
            src={image!}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
        </div>
      )}

      {has("glow") && (
        <>
          <div
            className="glow-blue fx-blob top-[-14vw] left-[-8vw] h-[36vw] w-[36vw] motion-safe:animate-drift-slow"
            style={{ opacity: opacity.glowBlue }}
          />
          <div
            className="glow-orange fx-blob top-[2vw] right-[-12vw] h-[44vw] w-[44vw] motion-safe:animate-drift-slower"
            style={{ opacity: opacity.glowOrange }}
          />
        </>
      )}

      {has("grid") && <div className="fx-grid absolute inset-0" />}

      {has("scrim") && <div className="fx-scrim absolute inset-0" />}

      {has("diagonal") && (
        // Folded / paper-cut corner (§6): a brand-tinted glass flap in the
        // top-left with a crisp diagonal cut edge (lit orange+blue lips over a
        // shadow for paper depth) and a slow light that glides along the cut.
        // Everything rides a rotated "fold axis" so it stays a true 45°; the
        // axis is masked so the cut fades out at both tips. Clipped, fixed size.
        <div className="absolute top-0 left-0 z-[4] h-[240px] w-[240px] overflow-hidden">
          {/* folded flap — subtle brand glass wedge */}
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{
              clipPath: "polygon(0 0, 0 100%, 100% 0)",
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--color-brand-orange) 24%, transparent), color-mix(in srgb, var(--color-brand-blue) 20%, transparent) 62%, transparent)",
            }}
          />
          {/* fold axis: bottom edge sits on the diagonal; tips fade out */}
          <div
            className="absolute bottom-0 left-0 h-4 w-[340px] origin-bottom-left -rotate-45"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
              maskImage:
                "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
            }}
          >
            {/* soft bloom under the cut */}
            <div
              className="absolute bottom-0 left-0 h-3 w-full blur-md mix-blend-screen"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in srgb, var(--color-brand-orange) 50%, transparent), color-mix(in srgb, var(--color-brand-blue) 45%, transparent))",
              }}
            />
            {/* the cut: two lit brand lips over a drop shadow (paper depth) */}
            <div className="absolute bottom-[7px] left-0 h-[2px] w-full bg-brand-blue" />
            <div
              className="absolute bottom-[3px] left-0 h-[2px] w-full bg-brand-orange"
              style={{ boxShadow: "0 2px 3px 0 rgb(0 0 0 / 0.5)" }}
            />
            {/* light that slides along the cut */}
            <div
              className="absolute bottom-[2px] left-0 h-[4px] w-full mix-blend-screen motion-safe:animate-cut-shine"
              style={{
                background:
                  "linear-gradient(90deg, transparent 44%, color-mix(in srgb, white 80%, transparent) 50%, transparent 56%)",
                backgroundSize: "220% 100%",
              }}
            />
          </div>
        </div>
      )}

      {/* Dark veil (§6) — full-bleed ink wash that makes the backdrop read as a
          dark surface with the photo popping through, scaled by intensity. Sits
          above the ambient layers, below the section content (the sibling
          `relative z-10` slot), so it dims the backdrop and never the copy. */}
      {opacity.veil > 0 && (
        <div
          className="absolute inset-0 z-[5] bg-ink"
          style={{ opacity: opacity.veil }}
        />
      )}
    </div>
  );
}
