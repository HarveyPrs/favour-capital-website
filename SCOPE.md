# Favour Capital Website Revision — Project Scope

> Version 0.2 (finalized against live site https://favour-capital.com) · Reference: [checkout.com](https://www.checkout.com/) · See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
> Stack: **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion** · Host: Vercel

## Goal

Full revision: rebuild the Favour Capital marketing site from scratch with a Checkout.com-grade aesthetic — deep indigo + brand orange, rich motion, generous space, proof-forward — while preserving brand equity (navy/orange, logo, deal credibility) and migrating all existing content and the full information architecture.

## Objectives / success criteria

- 1:1 with the design system; consistent tokens/motion across all pages.
- Hero and key sections match the approved concept quality.
- Fully responsive (mobile-first), accessible (WCAG AA).
- Lighthouse ≥ 90 across Performance / Accessibility / Best Practices / SEO.
- **Full content parity** — all ~70+ insights articles, 4 office locations, team + careers, legal — migrated with old→new redirects.
- A codebase any developer or coding AI can extend from the design system alone.

## Out of scope (this phase)

- Rebrand / new logo. · Deep copy rewrite (content migrates ~as-is; light editing only). · Backend/CRM beyond a contact-form handler. · i18n / multi-language.

---

## Information architecture (finalized from live site)

| Route                                        | Page                                | Notes                                                                                 |
| -------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------- |
| `/`                                          | Home                                | Hero, investors network, industry coverage, services, insights teaser, careers teaser |
| `/services-and-clients/`                     | Services & Clients                  | Capabilities, differentiation, network, representative clients                        |
| `/industry-sector/industry-and-sector-tech/` | Industry & Sector — Tech            | 11 sub-verticals                                                                      |
| `/industry-sector/industry-sector-consumer/` | Industry & Sector — Consumer        | 6 sub-verticals                                                                       |
| _(new)_ `/industry-sector/`                  | Industry & Sector — landing         | Optional new hub (currently dropdown-only)                                            |
| `/insights-news/` + `/insights-news-hub/`    | Insights & News                     | Index/hub + **~70+ article detail pages**                                             |
| `/career-and-team/`                          | Career & Team                       | Team profiles + 6 core values + program teasers                                       |
| `/ib-elite-program/`                         | Careers — IB Elite Program          | Students & graduates                                                                  |
| `/ib-experienced-professionals/`             | Careers — Experienced Professionals | Experienced hires (note legacy `-2` duplicate → redirect)                             |
| `/get-in-touch/`                             | Get in Touch                        | 4 offices + 2 emails + LinkedIn (**+ new contact form**)                              |
| `/terms-of-use/`                             | Terms of Use                        | Legal                                                                                 |
| _(footer)_ `/privacy-policy/`                | Privacy Policy                      | Legal                                                                                 |

Global: header/nav (Industry dropdown: Tech/Consumer), footer, 404, favicon/meta/OG, **cookie-consent banner** (Essential + Analytics).

### Content specifics captured from live site

- **Industry — Tech sub-verticals:** E-commerce, Logistics, Fintech, AI, Enterprise Software, Healthtech, EdTech, Crypto, Robotics, Advanced Manufacturing, Cybersecurity.
- **Industry — Consumer sub-verticals:** Apparel, Food & Beverage, Retail, Beauty, Healthcare & Wellness, Consumer Electronics.
- **Investor geographies:** Singapore, China, South Korea, Japan, Indonesia, Vietnam, Malaysia, Thailand, Philippines, India, UAE, Saudi Arabia + US, France, UK, Germany, Australia, New Zealand.
- **Deals (tombstones):** dtcpay (Series A, US$10.0M, Vertex Ventures SEA & India), Buymed (Series B, US$51.5M, UOB Venture · DFC · Smilegate), Inteluck (Series C, US$34M, Navegar · East Ventures), + Dekoruma, Desty, Inteluck Series B in archive.
- **Insight categories:** FC Deals, FC Market Outlook, FC Industry Highlights, FC Insights, FC Event Recap, FC Collaborative Report, Webinar Reviews.
- **Core values (Careers):** Self-Driven, Integrity, Clients First, Diversity, Pursuit of Excellence, Altruism.
- **Team (today):** one profile — Fang Ye, Eric (Founding Partner). Expansion pending content.
- **Offices:** Singapore (Level 43, 8 Marina View, Asia Square Tower 1); Shanghai (Level 38, Park Place, 1601 Nanjing West Rd); Jakarta (Level 11, One Pacific Place); Ho Chi Minh City (Level 56, Bitexco Financial Tower).
- **Emails:** admin@favour-capital.com (services/partnerships), hr.recruitment@favour-capital.com (recruitment).

---

## Phases (→ Linear milestones)

### Phase 0 — Foundations

Next.js+TS+Tailwind+Framer scaffold; Tailwind theme = design tokens; fonts (Sora/Manrope); base primitives + motion utilities; reduced-motion.

### Phase 1 — Global shell & core components

SiteHeader (Industry dropdown, logo swap, mobile menu), SiteFooter, GlassCard, DealCard, StatBlock, background-layer system, asset pipeline, **cookie-consent banner**.

### Phase 2 — Homepage

Hero (rebuild v5), capabilities, differentiation, investor-network map, industry coverage, representative deals/clients, insights teaser, careers teaser, closing CTA.

### Phase 3 — Interior pages

Services & Clients; Industry & Sector (Tech + Consumer + optional landing); **Career & Team**; **IB Elite Program**; **Experienced Professionals**; **Get in Touch** (offices + form); Terms of Use; **Privacy Policy**.

### Phase 4 — Insights & News (large content workstream)

Content-model decision (MDX vs CMS — leaning CMS given ~70+ articles + non-dev publishing); index/hub with category filtering; article detail template; **migration of all ~70+ existing articles** with images and metadata.

### Phase 5 — Polish, QA & launch

Responsive/cross-browser; accessibility (AA); performance (Lighthouse ≥ 90); SEO/meta/OG/sitemap/JSON-LD; analytics + consent; content proofing; **301 redirects for every old URL** (incl. legacy duplicates); domain cutover; launch.

---

## Key decisions / open questions

- **Insights content model** — MDX vs headless CMS. Recommendation: **lean CMS (Sanity)** given ~70+ articles and non-developer publishing cadence.
- **Real figures** for stat blocks (capital raised, # transactions, investor count) — placeholders marked `*`.
- **Team expansion** — only the founder is public today; add more profiles/photos?
- **Contact form** — confirm we add one (offices + emails only today); pick handler (Resend/Formspree).
- **Analytics** — GA4 / Plausible; must integrate with the cookie-consent Essential/Analytics toggles.
- **Domain / hosting** — confirm Vercel + DNS access for cutover.

## Progress

- ✅ Aesthetic direction approved (hero concept v5).
- ✅ Design system drafted (`DESIGN_SYSTEM.md`).
- ✅ Scope finalized against live site (this doc, v0.2).
- ⬜ Everything below Phase 0 — see Linear (project "Website Revision — Checkout-inspired", FAV).
