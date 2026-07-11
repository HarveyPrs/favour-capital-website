/**
 * Career & Team data source (FAV-24). The single source of truth for the two
 * careers programs, the six core values and the team roster surfaced on
 * `/career-and-team`.
 *
 * Program routes, the six values and the sole team profile (Fang Ye, Eric —
 * Founding Partner) are lifted verbatim from SCOPE.md and the live site — copy
 * is lightly framed, not invented. The team array is intentionally a list so
 * the grid scales gracefully from one profile to many as bios/photos land.
 */

/** Careers pathway — one of the two entry programs, routing to its sub-page. */
export interface CareerProgram {
  /** Program name — card title. */
  name: string;
  /** Route to the program's sub-page (FAV-35 / FAV-36). */
  href: string;
  /** Who the track is for — overline pill on the card. */
  audience: string;
  /** One-paragraph framing of the program. */
  description: string;
  /** A few concrete highlights, rendered as a checklist. */
  highlights: string[];
  /** Accent used for the icon tile + hover border (meaning never rests on
   *  color alone — each card also carries a distinct icon, §8). */
  accent: "orange" | "blue";
}

/** A single team profile. Optional links keep the card graceful when a member
 *  has no public LinkedIn or contact yet. */
export interface TeamMember {
  /** Full name as displayed. */
  name: string;
  /** Role / title. */
  role: string;
  /** Initials for the placeholder avatar (photos pending — open question). */
  initials: string;
  /** Short bio line under the role. */
  bio?: string;
  /** Public LinkedIn profile URL. */
  linkedin?: string;
  /** Contact email — the card's "Message" affordance. */
  email?: string;
}

/** A firm core value. */
export interface CoreValue {
  /** Value name. */
  name: string;
  /** One-line framing of what the value means in practice. */
  description: string;
}

export const careerPrograms: CareerProgram[] = [
  {
    name: "IB Elite Program",
    href: "/ib-elite-program",
    audience: "Students & graduates",
    description:
      "Our flagship early-careers track for students and recent graduates — hands-on exposure to live capital raising and M&A mandates alongside the deal team, with the mentorship to build an investment-banking career from the ground up.",
    highlights: [
      "Live deal exposure across tech and consumer",
      "Direct mentorship from the deal team",
      "Cross-border transaction experience",
    ],
    accent: "orange",
  },
  {
    name: "Experienced Professionals",
    href: "/ib-experienced-professionals",
    audience: "Experienced hires",
    description:
      "For seasoned bankers and advisors ready to own mandates end to end. Join a lean, senior team running cross-border capital raising and M&A for Asia's leading tech and consumer companies — with the autonomy to shape how we grow.",
    highlights: [
      "End-to-end mandate ownership",
      "A lean, senior deal team",
      "A platform scaling across Asia",
    ],
    accent: "blue",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Fang Ye, Eric",
    role: "Founding Partner",
    initials: "FE",
    bio: "Founder of Favour Capital, leading cross-border capital raising and M&A for Asia's tech and consumer companies.",
    linkedin: "https://www.linkedin.com/company/favour-capital/",
    email: "admin@favour-capital.com",
  },
];

export const coreValues: CoreValue[] = [
  {
    name: "Self-Driven",
    description:
      "We take ownership, move with initiative, and hold ourselves to the outcome — not the effort.",
  },
  {
    name: "Integrity",
    description:
      "We do what is right for our clients and partners, especially when no one is watching.",
  },
  {
    name: "Clients First",
    description:
      "Every mandate starts with our client's goals; their success is the measure of ours.",
  },
  {
    name: "Diversity",
    description:
      "We bring together perspectives across markets and disciplines to see what others miss.",
  },
  {
    name: "Pursuit of Excellence",
    description:
      "We hold a high bar on every detail, from first analysis to final close.",
  },
  {
    name: "Altruism",
    description:
      "We give generously — to our teams, our communities and the founders we back.",
  },
];
