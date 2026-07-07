import { CountUp } from "@/components/CountUp";
import { cn } from "@/lib/cn";

type StatBlockProps = {
  /** Final figure — counts up 0 → `value` on scroll into view. */
  value: number;
  /** Overline label beneath the number. */
  label: string;
  /** Rendered before the number, e.g. "US$". */
  prefix?: string;
  /** Rendered after the number, e.g. "M", "+", "%". */
  suffix?: string;
  /**
   * Placeholder figure (§6) — appends a `*` to the label until a real number
   * is confirmed. Keeps the asterisk convention out of caller strings.
   */
  placeholder?: boolean;
  className?: string;
};

/**
 * Stat block (§6): a large count-up number over an overline label, tone-aware
 * (white on dark, navy on light) via `text-text-primary`. The count-up rounds
 * its value and respects reduced motion through `CountUp`/`useCountUp`.
 */
export function StatBlock({
  value,
  label,
  prefix,
  suffix,
  placeholder = false,
  className,
}: StatBlockProps) {
  return (
    <div className={cn(className)}>
      <p className="font-display text-display-lg font-extrabold text-text-primary">
        <CountUp to={value} prefix={prefix} suffix={suffix} />
      </p>
      <p className="mt-2 text-overline font-semibold uppercase text-text-muted">
        {label}
        {placeholder && "*"}
      </p>
    </div>
  );
}
