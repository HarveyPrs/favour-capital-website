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
 * Per-intensity opacity for the ambient (photo + glow) layers. The scrim,
 * grid and diagonal are unaffected so legibility (§8) is constant regardless
 * of intensity — turning the ambience up never weakens the contrast guarantee.
 */
const INTENSITY: Record<
  Intensity,
  { photo: number; glowBlue: number; glowOrange: number }
> = {
  subtle: { photo: 0.5, glowBlue: 0.34, glowOrange: 0.26 },
  normal: { photo: 0.62, glowBlue: 0.5, glowOrange: 0.4 },
  bold: { photo: 0.72, glowBlue: 0.62, glowOrange: 0.5 },
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
        // Folded-corner motif (§6): a brand ribbon that wraps the top-left
        // corner. A subtle brand-tinted glass wedge (depth) + a soft light
        // bloom along the fold (glow) + two crisp lines that fade out at both
        // tips where they meet the edges, so it reads as part of the poster
        // rather than applied bars. Fixed-size corner ornament, clipped.
        <div className="absolute top-0 left-0 z-[4] h-[190px] w-[190px] overflow-hidden">
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{
              clipPath: "polygon(0 0, 0 100%, 100% 0)",
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--color-brand-orange) 22%, transparent), color-mix(in srgb, var(--color-brand-blue) 18%, transparent) 65%, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 h-2.5 w-[300px] origin-bottom-left -rotate-45 blur-md mix-blend-screen"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-brand-orange) 60%, transparent) 25%, color-mix(in srgb, var(--color-brand-blue) 55%, transparent) 60%, transparent 90%)",
            }}
          />
          <span
            className="absolute bottom-2 -left-2 h-[2px] w-[269px] origin-bottom-left -rotate-45"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-brand-blue) 14%, var(--color-brand-blue) 86%, transparent)",
              boxShadow:
                "0 0 8px 0 color-mix(in srgb, var(--color-brand-blue) 55%, transparent)",
            }}
          />
          <span
            className="absolute bottom-0 left-0 h-[2px] w-[269px] origin-bottom-left -rotate-45"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-brand-orange) 12%, var(--color-brand-orange) 88%, transparent)",
              boxShadow:
                "0 0 10px 0 color-mix(in srgb, var(--color-brand-orange) 60%, transparent)",
            }}
          />
        </div>
      )}
    </div>
  );
}
