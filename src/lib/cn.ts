/**
 * Tiny class-name joiner — filters falsy values so components can compose a
 * base class string with optional/conditional classes without pulling in a
 * dependency. Prettier's Tailwind plugin still sorts the literal strings.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
