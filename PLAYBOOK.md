# Your Playbook — Favour Capital Website Rebuild

_For Hung. No tech knowledge needed. Keep this open next to Linear._

---

## Your routine (every work session)

1. **Open Linear** → project "Website Revision — Checkout-inspired" → the current phase (work phases in order: 0 → 1 → 2 → 3 → 4 → 5).
2. **Pick the top unfinished issue** in that phase. Look at its colored label:
   - 🟠 **Claude: Opus 4.8** → use Opus in Claude Code
   - 🔵 **Claude: Sonnet 5** → use Sonnet in Claude Code
   - 🟢 **Antigravity** → do it in the Antigravity IDE instead (step 5 below)
3. **Open Claude Code** in this folder, type `/model`, pick the model the label named. **Effort dial:** 🔵 blue card → leave effort at default; 🟠 orange card → set effort to **High**; **Ultra** → never, except when rerunning a card that already failed twice.
4. **Paste this one sentence** (change the number):

   > Work on FAV-XX. Follow CLAUDE.md.

   Then let it run. It will build, check its work, update the Linear card, and leave a short note there. When it stops, you're done — **close that session** (start fresh next time, never continue old sessions).

5. **Antigravity cards:** open this project in the Antigravity IDE and paste the punch list / instructions written on the Linear card. Let it iterate on its own.

**Issues marked ✅ are review gates** — run them **last** in each phase, same routine (the card contains the exact text to paste). Don't start the next phase until the gate is Done.

---

## The 6 rules that protect your token budget

1. **One card = one session.** Never ask a session to "do the whole phase."
2. **Never continue yesterday's session.** Fresh session every time — the Linear card + CLAUDE.md carry all the memory needed.
3. **If a session runs very long** (you see it "compacting" or slowing), tell it: _"Wrap up: commit what works, update the Linear card with what's left, and stop."_ Then start a fresh session on the same card.
4. **Pixel complaints go to Antigravity, not Claude.** "This looks 3px off / spacing feels wrong / hover is janky" — collect these into a list and give it to Antigravity. Don't burn Claude turns on them.
5. **Blue (Sonnet) cards stay blue.** If a Sonnet session's result looks bad, don't argue with it — just rerun the same card once with Opus 4.8. If a card keeps needing Opus, tell the next Opus session to update the label.
6. **Effort follows the label — never higher.** Blue = default effort, orange = High, Ultra only for a rescue rerun after two failures. Why: all the thinking (design system, scope, acceptance criteria) is already written down — sessions execute, they don't philosophize. Extra effort on a clearly-specified card is pure token burn.
7. **Decisions you owe the project** (answer these once, on the Linear card, when asked): real stat figures, team bios/photos, analytics choice, domain/DNS access. Everything else is pre-decided.

---

## What's what

| Thing                           | What it's for                                                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Linear**                      | Your to-do board. Cards, labels, progress. The only thing you need to read.                                                       |
| **CLAUDE.md** (this folder)     | The agents' rulebook. You never need to open it.                                                                                  |
| **DESIGN_SYSTEM.md / SCOPE.md** | The design bible + project scope. Agents read these; you can too.                                                                 |
| **Claude Code**                 | Where 🟠/🔵 cards get built.                                                                                                      |
| **Antigravity IDE**             | Where 🟢 polish cards get done.                                                                                                   |
| **Vercel preview link**         | Where you _look at the site_ after each session (the Phase 0 scaffold sets this up; the link will be posted on FAV-5 when ready). |

## Phase order & what "done" looks like

- **Phase 0 — Foundations** → a styleguide page showing your colors/type/buttons.
- **Phase 1 — Shell & components** → header, footer, cards, cookie banner exist.
- **Phase 2 — Homepage** → the homepage matches the approved hero concept.
- **Phase 3 — Interior pages** → every page of the site exists.
- **Phase 4 — Insights** → insights section works with a few seed articles (full 70-article migration is deferred).
- **Phase 5 — QA & launch** → polish, checks, and the domain switchover.
