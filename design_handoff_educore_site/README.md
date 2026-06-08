# Handoff: EDUcore Website — Approved Figma Parity

## Overview
This package documents the EDUcore / Education Data Unlimited (EDU) website design, brought
to parity with the stakeholder-approved Figma file (`DSU.fig`). It covers the public marketing
and informational site across five sections — **About EDU, DSU, EDUcore, Resources, Events** —
plus shared chrome (navigation, hero, footer) and the full design-token set.

EDU is a non-profit convening body for education and workforce data standards. DSU (Data
Standards United) is its standards collaborative; EDUcore is its AI-native standards platform.
The site is calm, editorial, and federal-adjacent in tone (it descends from the U.S. Web Design
System), with section-themed hero bands and restrained, document-like content pages.

## About the Design Files
The files in this bundle are **design references created in HTML/React (via in-browser Babel)** —
prototypes showing the intended look, structure, copy, and behavior. **They are not production
code to copy directly.** The task is to **recreate these designs in the target codebase's existing
environment** (e.g. Next.js/React, Vue, a CMS theme, etc.) using its established component
patterns, routing, and styling approach. If no front-end environment exists yet, choose an
appropriate framework and implement there.

The prototype renders every page as an artboard on a pan/zoom "design canvas" (`design-canvas.jsx`)
purely for review — that canvas chrome is **not** part of the product and should be ignored when
implementing. Each page component (e.g. `EDUHome`, `DSUMembers`) is the real deliverable.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, copy, and component structure are final and
sampled directly from the approved Figma. Recreate the UI faithfully. Exact hex values, font
families, and measurements are listed below and in the source files.

> Note on completeness: **CEDS** appears in the primary nav but has **no approved layout yet** —
> it is intentionally deferred and has no page in this handoff. The **EDUcore** section had only
> an approved hero in Figma; the tools grid below the hero is a reasonable, clearly-scoped
> addition pending stakeholder review.

---

## Global Chrome (every page)

### Primary navigation — `PrimaryNav` (sticky, top)
- Full-width bar, height **61px**, background `#FDFDFD`, 1px bottom border `#E4E5E6`. `position: sticky; top: 0; z-index: 50`.
- **Left:** flush-left **61×61px** square, background navy `#002B70`, containing the EDU logo (white, ~22px tall).
- **Right:** right-aligned row of nav items (gap 8px, right padding 128px). Items: **DSU · About EDU · CEDS · EDUcore · Resources · Events · Contact**.
- Each item is a pill button: font Public Sans 14px, padding 7px 13px, radius 4px. Inactive = weight 500, color `#002B70`, transparent background. **Active** = weight 700, white text, navy `#002B70` fill.

### Contextual sub-nav — `SubNav` (navy bar under primary nav)
- Height **49px**, background `#0D3B66`. Content inset to the 1024px container (128px side margins).
- **Left:** breadcrumb — section crumb (e.g. "EDU", "DSU") in `#6DA2FF` weight 700, then a `›` separator in `rgba(255,255,255,0.5)`. Font: Atkinson Hyperlegible 14px.
- **Right:** the section's page links (gap 24px), Atkinson Hyperlegible 14px. Inactive = `rgba(255,255,255,0.72)` weight 400; **active** = white weight 700 with a 2px white bottom-border.

### Hero band — `Hero`
- Full-width band, `background` set per section (see Theming), `overflow: hidden`, min-height varies (167px compact inner pages, 200px, up to 300px for landing pages).
- **Faint globe** line-art SVG (`Globe`) bleeding off the left edge, vertically centered, stroke `rgba(255,255,255,0.07)`. Decorative only.
- Content inset to 1024px container, vertically centered, gap 16px:
  - **Brand chip** (`BrandChip`): inline pill, background `#0C171D`, radius 6px, padding 4px 10px — an 8px teal `#00B9BB` dot + label text in `#5FBEBF`, Public Sans 13px weight 600. Label is the section name (e.g. "EDUCATION DATA UNLIMITED", "DATA STANDARDS UNITED", "EDUCORE", "RESOURCES", "EVENTS").
  - **H1**: Public Sans **700, 48px**, line-height 1.15, letter-spacing **-0.02em**, color `#FDFDFD`. Optional second line (`title2`) is the same size but **weight 400 at opacity 0.75** (used for the "Endless possibility." / "education data standards." second lines).
  - Optional **description**: Public Sans **300**, 16px, line-height 1.5, `rgba(255,255,255,0.92)`, max-width 720px.
  - Optional children (CTA buttons, the Events counter box).

### Footer — `PageFooter` (light)
- Background `#FDFDFD`, 1px top border `#CCD0D6`, padding 48px top / 40px bottom. Content inset to 1024px container, flex row, gap 48px, wraps.
- **Brand block** (240px): 48×48 navy logo square (radius 4) → blurb "Connecting the ecosystem of education data standards." (Public Sans 13px, `#5b6670`) → hairline divider → "Data Standards United" (weight 600, navy) + "All rights reserved · © 2026".
- **Six link columns** (gap 40px, min-width 120px each): headings in `#CCD0D6` Public Sans 14px weight 700; links in `#0F62FE` 14px. Columns & links:
  - **DSU** — Overview, Signatory members, Affiliate members, Joining DSU, Projects
  - **EDU** — Board, History, Contact
  - **CEDS** — CEDS sustainability, A4L Unity project, Tiger Team, CEDS-SEDM
  - **EDUcore** — Project prospectus, Reference library, Graphinator, Standards partner
  - **Resources** — White papers, Glossary, FAQ, Standards matrix, Press & charter
  - **Events** — Calendar, Past events

### Section theming (hero + accent + newsletter band color)
| Section / page | Hero background | Notes |
| --- | --- | --- |
| About EDU (all pages) | navy `#002B70` | |
| DSU (all pages) | navy `#002B70` | teal `#00797A` for CTA bands |
| EDUcore | **violet `#3E4DED`** | violet accents/CTA |
| Resources — Library | navy `#002B70` | newsletter band navy |
| Resources — Glossary, FAQ | **teal `#004747`** | newsletter band teal |
| Events — Upcoming, Past | **teal `#004747`** | newsletter band teal |

### Container & grid
- Page width **1280px**; content is inset **128px** each side → **1024px** content column (`ECContainer`, `max-width: 1280`, `padding: 0 128px`). Some text-heavy sections cap inner width at ~880–1024px for readability.
- Standard vertical section padding: **72px** (some 56–64px).

---

## Pages

### DSU — `/dsu` or `/` (source: `ec-dsu.jsx`) — the site landing page.

**Home** (`DSUOverview`) — hero (min-height 300, chip "DATA STANDARDS UNITED") with H1 "The coordinating body for global education data standards.", description, and two CTAs ("Become a member" primary, "View our projects" outline-on-dark). Sections: **Charter / Vision / Mission** (3-col, eyebrow + paragraph); **Core Values "How we operate"** (`300px / 1fr`, numbered cards using Roboto Condensed numerals); **Our Initiative** (`360px / 1fr`, 4 numbered rows with hairline dividers); **Member Voices "Why organizations join DSU"** (3-col quote cards on `#F4F5F6`, gold `#FBB244` open-quote glyph). Data: `DSU_PILLARS`, `DSU_VALUES`, `DSU_INITIATIVE`, `DSU_VOICES`.

**Members** (`DSUMembers`) — hero "Our members". **Video testimonials** (dark `#0C171D` section, 3 cards with play button + "Vimeo" badge, names Jason Tyszko / Nancy Copa / Duane Brown); **Signatory members** (3-col cards, **2px gold `#FBB244` border**, soft shadow, name + url + logo mark — 9 orgs in `SIGNATORY`); **Affiliate members** (4-col, same gold-bordered card — 4 orgs in `AFFILIATE`); **Join CTA band** (`JoinCTA`, teal `#00797A`).

**Joining DSU** (`DSUJoin`) — hero "Joining DSU". **Two ways to join** (`TypeCard` ×2: "Signatory Member" filled/teal-bordered, "Affiliate Member" outline — each with checkmark bullet list + download button); **How to join** (`#F4F5F6`, max-width 860, 4 stacked step cards with navy numbered circles — data `JOIN_STEPS`); **Questions** (`1fr/1fr`: get-in-touch + "When submitting your agreement" checklist).

**Projects** (`DSUProjects`) — hero "DSU supported projects". 3-col grid of **project cards** (2px gold border, shadow, min-height 240): tag eyebrow (`#00797A`) → title (20px/700) → category line → "Learn more →" link → centered "UNITY" logo mark. Data `DSU_PROJECTS`. Followed by the teal Join CTA band.

DSU sub-nav links: **Home · Members · Joining DSU · Projects** (crumb "DSU").

### About EDU — `/edu`

**Overview / Home** (`EDUHome`) 
- Hero (min-height 300): H1 "One infrastructure." + second line "Endless possibility." + description.
- **Mission Statement** + **Organization Description**: eyebrow "Overview" (`#00797A`), section headings Public Sans 700 **31.5px** (`#000`), body Public Sans 16px / line-height 1.6, max-width 1024.
- **Things EDU will do / will not do** (surface `#F4F5F6`, top+bottom 1px borders `#CCD0D6`): two `320px / 1fr` rows. Left = heading (24px/700) + sub-copy. Right = stacked **list cards** (`ListCard`): white, 1px border `#CCD0D6`, radius 6, padding 16/20, navy 5px bullet dot + 15px text. 7 "will do" items, 2 "will not do" items (verbatim copy in `ec-edu.jsx` → `EDU_DO`, `EDU_DONT`).
- **An Opportunity For Unification** + **Incorporation Information**: heading 31.5px + body paragraphs (copy in `UNIFICATION`).

**Board of Directors** (`AboutBoard`) — `/edu/board`
- Compact hero "Board of Directors".
- 3-column grid (gap 16) of **board cards** (`BoardCard`): white, 1px border `#CCD0D6`, radius 6, padding 22/24, min-height 150. Role eyebrow (navy, 14px/700/uppercase, 0.04em) → name (Public Sans **22px/700**, `#000`) → org (14px, `#5b6670`) → email link (`#0F62FE`, mailto). 11 members; data in `BOARD`.

**History** (`AboutHistory`) — `/edu/history`
- Hero "Our history" + description.
- Vertical timeline, max-width 880, `120px / 1fr` rows: year in **Roboto Condensed 700, 40px** navy; right column has a 2px left border `#CCD0D6` with a teal `#00B9BB` 12px node dot, title (20px/700), body (16px). 5 entries; data in `HISTORY`.

**Contact** (`AboutContact`) — `/edu/contact`
- Hero "Contact EDU" + description.
- `1fr / 360px` layout. Left = form: 2-col grid (gap 18) of labeled fields (`Field` — label Public Sans 14px/600 navy; input/textarea 15px, 11/14 padding, 1px border `#CCD0D6`, radius 4), "Send message" primary button. Right = a surface info card (General inquiries → mailto `alex@bardicsystems.com`) + a navy "Join the collaborative" card with a teal button.

### EDUcore — `/educore` (source: `ec-educore.jsx`)
**Overview** (`EDUcoreOverview`) — **violet `#3E4DED`** hero (chip "EDUCORE", min-height 300): H1 "AI-powered tools for" + "education data standards." + description. **Platform tools** section: intro (eyebrow violet, heading 31.5px) + **2×2 grid** of tool cards (`ECoreCard`: white, 1px border, radius 8, soft violet-tinted shadow; 44px violet-tint icon chip, uppercase violet tag, 21px title, body, "Explore … →" link). Tools: Reference Library, Graphinator, Standards Partner, Project Prospectus (`ECORE_TOOLS`). Closes with a **violet CTA band** ("EDUcore is in open beta" → teal "Request beta access"). Sub-nav: Overview · Reference Library · Graphinator · Standards Partner · Prospectus.

### Resources — `/resources` (source: `ec-resources.jsx`)
**Library** (`ResourcesHub`) — navy hero "Resource library" + description. Eyebrow "Browse by type" + "All resources", then **3-col grid of 6 cards** (`RES_CARDS`): 2px gold border, radius 8, min-height 220 — uppercase amber `#FBB244` meta label, 20px title, body, link. Closes with a **navy newsletter band**. Cards: White Papers & Reports, Newsletter, Glossary, FAQ, Standards Matrix, Press & Charter.

**Glossary** (`ResourcesGlossary`) — **teal `#004747`** hero "Glossary". `200px / 1fr` layout: left category sidebar (All terms / Education / Skills,Talent,Workforce / Technology); right alphabetical term list — each entry hairline-separated, bold 18px term + small teal category chip + 15.5px definition. Data `GLOSSARY`. Teal newsletter band.

**FAQ** (`ResourcesFAQ`) — **teal `#004747`** hero "Frequently asked questions". Same `200px / 1fr` layout: left categories (About DSU / About EDU / About EDUcore); right Q&A list (bold 18px question + 15.5px answer, hairline-separated). Data `FAQ`. Teal newsletter band.

Resources sub-nav: Library · Newsletter · Glossary · FAQ · Standards matrix · Press & charter.

### Events — `/events` (source: `ec-events.jsx`)
**Upcoming** (`EventsUpcoming`) — **teal `#004747`** hero "Upcoming Events" + description, with an absolute-positioned **counter box** at right (Roboto Condensed 44px count + "UPCOMING EVENTS" label). Stacked horizontal **event cards** (`EventCard`, `230px / 1fr`): a gradient **poster** placeholder (sky→bridge silhouette, title in Roboto Condensed) + content (uppercase tag, date, 20px title, body, "Learn more →"). 1px navy card border. Teal newsletter band. Data `UPCOMING`.

**Event Archive / Past** (`EventsPast`) — teal hero "Event Archive". Events **grouped by year** (year label in Roboto Condensed 24px + rule + "N EVENTS"), each group a stack of shorter event cards. Data `ARCHIVE`. Teal newsletter band.

Events sub-nav: Upcoming · Past events.

---

## Interactions & Behavior
- **Primary nav** is sticky; the current section's item is shown active (navy fill, white text). Nav/footer/breadcrumb links are presentational in the prototype — wire them to real routes in implementation.
- **Buttons** (`Btn`): primary = `#0F62FE` fill / white; teal = `#00B9BB` fill / `#0C171D`; gold = `#FBB244` / `#0C171D`; outline = transparent with `#0F62FE` (or white-on-dark) 2px border; unstyled = underlined link. Transition `background .12s, color .12s`. Per USWDS, hover should step to the next-darker stop; focus uses a 4px `#2491ff` outline (do not remove focus rings).
- **Footer links** turn from `#0F62FE` toward navy/underline on hover (USWDS link convention).
- **Forms** (Contact, Newsletter) are non-functional placeholders; implement submission + validation per codebase conventions. Newsletter = email capture.
- **Video cards** (DSU Members) are static thumbnails with a play affordance; intended to embed Vimeo (`player.vimeo.com`).
- No page-level animation, carousels, or scroll-driven motion — the system biases toward stillness.

## State Management
The prototype is essentially static; the only live state is local UI (e.g. nav hover/active). For implementation you'll likely need:
- Current route / active section (drives nav + sub-nav active states + breadcrumb).
- Data-driven lists for: board members, signatory/affiliate orgs, projects, glossary terms, FAQ entries, events (upcoming + archived-by-year), resource cards. All are simple arrays today (see the named `const`s in each source file) and are good candidates for CMS or JSON sources.
- Newsletter/contact form state + submission status.

## Design Tokens
Defined in `ec-foundation.jsx` (`EC` object) and the USWDS+ stylesheet `colors_and_type.css`.

**Colors**
- Navy (primary / hero) `#002B70`; sub-nav navy `#0D3B66`; brand-chip near-black `#0C171D`; mid navy `#0D538C`
- Teal (brand dot/accent) `#00B9BB`; teal soft (eyebrow on dark) `#5FBEBF`; teal dark `#00797A`; teal 900 (Glossary/FAQ/Events hero) `#004747`
- Violet (EDUcore) `#3E4DED` (dark `#2B33B5`)
- Gold (card stroke/accent) `#FBB244`; cream `#FFF3EA`
- Link blue `#0F62FE`; breadcrumb link `#6DA2FF`
- Ink `#2E2E2E`; ink-soft `#5B6670`; white `#FDFDFD`; surface `#F4F5F6`; border `#CCD0D6`; border-soft `#E4E5E6`

**Typography**
- Display / headings / body: **Public Sans** (weights 300/400/500/600/700). Headings letter-spacing **-0.02em** (hero) / **-0.01em** (section). Local web-font in `fonts/public-sans/`.
- Breadcrumb & sub-nav labels: **Atkinson Hyperlegible** (400/700) — loaded from Google Fonts.
- Large display numerals (timeline years, step/value numbers, event counters): **Roboto Condensed** (400/500/700) — loaded from Google Fonts.
- Sizes used: H1 48px; section heading 31.5px; sub-heading 24px; card title 18–22px; body 15–16px; labels 14px; eyebrows 11.5–14px (uppercase, 0.04–0.06em).
- Line-heights: hero 1.15; body 1.5–1.6.

**Spacing** — USWDS half-rem scale (4/8/12/16/20/24/32/40/48/72px). Section padding 72px; container side inset 128px; content column 1024px (text blocks ~880–1024).

**Radius** — 4px (buttons/inputs), 6px (cards/list cards/chip), 8px (larger cards), 12px (membership type cards). **Borders** — 1px hairlines `#CCD0D6`/`#E4E5E6`; **2px gold** `#FBB244` on member/project/resource cards. **Shadow** — soft long shadows, e.g. `2px 4px 20px rgba(0,0,0,0.06–0.1)`; EDUcore cards `0 8px 28px rgba(43,51,181,0.06)`.

## Assets
- `assets/educore-logo.png` — EDU/EDUcore logo. Rendered white in nav/footer via `filter: brightness(0) invert(1)`. Replace with the production logo (SVG preferred).
- The hero **globe** is a generated SVG (`Globe` in `ec-foundation.jsx`) — reproducible in code, no asset needed.
- Event **posters** are CSS-gradient placeholders — swap for real event imagery.
- Member/affiliate/project **logo marks** are typographic placeholders ("A4L", "ADL", "UNITY") — swap for real org logos (the approved Figma used the actual A4L/SIF/ADL marks).
- Fonts: Public Sans bundled in `fonts/`; Atkinson Hyperlegible & Roboto Condensed via Google Fonts.

## Files
Approved design (recreate these):
- `EDUcore Home.html` — entry point; loads the foundation + section files into the review canvas.
- `ec-foundation.jsx` — **tokens, fonts, nav, sub-nav, hero, footer, buttons, globe, newsletter band** (start here).
- `ec-edu.jsx` — About EDU: `EDUHome`, `AboutBoard`, `AboutHistory`, `AboutContact`.
- `ec-dsu.jsx` — DSU: `DSUOverview`, `DSUMembers`, `DSUJoin`, `DSUProjects`.
- `ec-educore.jsx` — `EDUcoreOverview`.
- `ec-resources.jsx` — `ResourcesHub`, `ResourcesGlossary`, `ResourcesFAQ`.
- `ec-events.jsx` — `EventsUpcoming`, `EventsPast`.
- `colors_and_type.css` — USWDS+ design-system foundation (palette, semantic tokens, type ramp, spacing). The site descends from this system.
- `design-canvas.jsx` — **review harness only; not part of the product.**

Not included / out of scope: CEDS (no approved layout yet); the pre-Figma homepage explorations (A/B/B2/C) that live in the prototype's reference section.
