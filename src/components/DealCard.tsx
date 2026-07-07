import { GlassCard } from "@/components/GlassCard";

type DealCardProps = {
  /** Company name — Sora 700, white. */
  company: string;
  /** Round label (e.g. "Series A") — rendered in the blue-tinted tag pill. */
  round: string;
  /** Pre-formatted amount string (e.g. "US$10.0M") — orange accent. */
  amount: string;
  /** Investor line (e.g. "Vertex Ventures SEA & India"). */
  investors: string;
  /** Ambient float loop for hero placement (§6) — see `GlassCard`. */
  bob?: boolean;
  /** Stagger the bob loop by N seconds. */
  bobDelay?: number;
  className?: string;
};

/**
 * Deal tombstone (§6): a glass card carrying company + round tag, the raised
 * amount in the orange `text-accent`, and the investor sub-line. Renders
 * entirely from props — the "representative deals" proof throughout the site.
 */
export function DealCard({
  company,
  round,
  amount,
  investors,
  bob,
  bobDelay,
  className,
}: DealCardProps) {
  return (
    <GlassCard bob={bob} bobDelay={bobDelay} className={className}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-body font-bold text-text-primary">
          {company}
        </span>
        <span className="rounded-sm bg-blue-400/20 px-2 py-1 text-overline font-semibold tracking-normal text-blue-100">
          {round}
        </span>
      </div>
      <p className="mt-2 font-display text-h3 font-bold text-text-accent">
        {amount}
      </p>
      <p className="mt-1 text-body-sm text-text-muted">{investors}</p>
    </GlassCard>
  );
}
