# CLAUDE.md — Favour Capital Website Rebuild

Rules for every Claude Code session in this project. The operator is non-technical: work autonomously, verify your own work, and never hand back technical decisions unless the PLAYBOOK's "decisions you owe" list applies (stats figures, team bios, analytics choice, DNS access).

## Project

Rebuild of favour-capital.com (boutique investment bank, Singapore) with a checkout.com-grade aesthetic. Stack: **Next.js (App Router) + TypeScript + Tailwind + Framer Motion**, Vercel. Source of truth: `DESIGN_SYSTEM.md` (tokens, type, motion, components) and `SCOPE.md` (pages, content, phases). The approved homepage hero concept ("v5") is described in DESIGN_SYSTEM.md §9.

## Session protocol

1. You were given one Linear issue ID (FAV-XX). Fetch **that one issue only** via the Linear MCP — do not browse the project, other issues, or documents unless the issue explicitly links them.
2. Build exactly what the issue's tasks + acceptance criteria say. Verify in the browser/dev server before claiming done.
3. On completion: set the issue state (In Review if it needs the phase gate, else Done) and leave **one short comment**: what shipped, what's left (if anything), any decision made. This comment is the handoff to the next session.
4. If you cannot finish: commit what works, comment honestly with what's left and why, set state In Progress, and stop. Never leave the repo broken.
5. Do not start work on any other issue, even if you notice problems — instead note them in your closing comment.

## Hard rules (consistency)

- **Token-only styling.** No new colors, font sizes, spacing values, easings, or durations outside the Tailwind theme / DESIGN_SYSTEM.md. If something seems missing from the system, add it to the theme + document it in DESIGN_SYSTEM.md in the same PR — never inline a magic value.
- Primary buttons: **white by default**, navy text, lift −3px on hover. One primary CTA per view.
- Every animation honors `prefers-reduced-motion`.
- Placeholder stats stay marked with `*` until real figures are provided.
- Content parity: page copy comes from SCOPE.md / the issue — do not re-crawl the old site, do not invent copy beyond light editing.
- Match existing file structure and component patterns; compose from primitives (`Section`, `Container`, `Button`, `Eyebrow`, `GlassCard`, `DealCard`, `StatBlock`) rather than re-implementing.

## Token discipline (efficiency)

- Don't re-read DESIGN_SYSTEM.md/SCOPE.md wholesale if the tokens are already in code — the Tailwind theme and `/styleguide` are the fast reference.
- Don't re-derive history: read the previous session's issue comment, not the whole board.
- Mechanical sub-tasks inside an Opus session (bulk file generation, data entry, repetitive markup) may be delegated to a Sonnet subagent; taste calls stay in the main session.
- Keep the session scoped to its one issue; if scope grows, note it and stop rather than sprawling.
- Pixel-level polish (spacing nudges, alignment, hover jank) is NOT your job — write a punch list in the issue comment tagged "for Antigravity".

## Definition of done (every issue)

- Acceptance criteria met and verified in the running app.
- `pnpm lint` + typecheck + build pass.
- Responsive at mobile/tablet/desktop; keyboard accessible; reduced-motion respected.
- Linear issue updated (state + handoff comment).
