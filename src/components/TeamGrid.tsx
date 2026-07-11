import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { type TeamMember, teamMembers } from "@/data/careerTeam";

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden
    >
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.5h3.1V21H3.4V8.5Zm5.06 0h2.97v1.71h.04c.41-.78 1.43-1.6 2.94-1.6 3.14 0 3.72 2.07 3.72 4.76V21h-3.1v-5.47c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.89V21h-3.1V8.5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 5 8-5" />
    </svg>
  );
}

const actionClass =
  "inline-flex items-center gap-2 rounded-pill border border-hairline bg-surface-light px-3.5 py-2 text-label font-semibold text-text-secondary transition-[color,border-color] duration-(--dur-fast) ease-out hover:border-brand-orange/40 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

/**
 * Team profile card — placeholder initials avatar (photos pending, per the
 * issue's open question), name, role, an optional bio and up to two contact
 * affordances (LinkedIn + Message). Links render only when present, so a
 * profile without a public LinkedIn or email stays graceful.
 */
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex h-full flex-col rounded-md border border-hairline bg-surface-light-2 p-6 md:p-7">
      <span
        aria-hidden
        className="inline-flex size-16 items-center justify-center rounded-full bg-brand-navy/5 font-display text-h3 font-semibold text-brand-navy"
      >
        {member.initials}
      </span>
      <h3 className="mt-5 font-display text-h2 font-semibold text-text-primary">
        {member.name}
      </h3>
      <p className="mt-1 text-label font-semibold uppercase tracking-wide text-text-accent">
        {member.role}
      </p>
      {member.bio && (
        <p className="mt-3 text-body-sm text-text-secondary">{member.bio}</p>
      )}

      {(member.linkedin || member.email) && (
        <div className="mt-6 flex flex-wrap gap-2.5 pt-2">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className={actionClass}
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Message ${member.name}`}
              className={actionClass}
            >
              <MailIcon />
              Message
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Team grid (FAV-24) — the firm's profiles on a light content surface. Built as
 * a `flex-wrap` of fixed-width cards so it reads intentionally with a single
 * profile today (Fang Ye, Eric) and scales cleanly to a full roster as bios and
 * photos land, without a lone card stretching a full grid column. Heading +
 * lead reveal on scroll and the cards stagger in, honoring reduced motion via
 * the shared primitives (§8).
 */
export function TeamGrid() {
  return (
    <Section tone="light">
      <Reveal className="max-w-2xl">
        <Eyebrow>Our team</Eyebrow>
        <h2 className="mt-5 font-display text-display-lg font-extrabold text-text-primary">
          The people behind the mandates
        </h2>
        <p className="mt-5 text-body-lg text-text-secondary">
          A lean, senior team with deep transaction experience across Asia&apos;s
          tech and consumer markets — and growing.
        </p>
      </Reveal>

      <RevealGroup className="mt-10 flex flex-wrap gap-5 md:mt-12 md:gap-6">
        {teamMembers.map((member) => (
          <RevealItem key={member.name} className="w-full sm:w-80">
            <TeamCard member={member} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
