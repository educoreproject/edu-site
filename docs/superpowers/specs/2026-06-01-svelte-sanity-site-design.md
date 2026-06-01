# Svelte + Sanity EDUcore Site Design

## Context

The repository currently contains the approved `design_handoff_educore_site/` bundle and no application scaffold. The handoff describes a high-fidelity public site for EDU, DSU, EDUcore, Resources, and Events. The first implementation slice will establish the SvelteKit and Sanity foundation, then build the DSU home page plus shared site chrome.

Current package targets confirmed from npm on 2026-06-01:

- Svelte `5.56.0`
- SvelteKit `2.61.1`
- `@sanity/client` `7.22.1`

## Goals

- Create a SvelteKit site using the latest Svelte/SvelteKit versions.
- Keep Sanity Studio in the same repository as the public site.
- Establish CMS boundaries before page work spreads across the app.
- Implement the first public slice: DSU home at `/`, with shared navigation, sub-navigation, hero, footer, button, section, and card primitives.
- Preserve the approved handoff's visual language, content hierarchy, and route structure.

## Non-Goals

- Implement every approved page in the first slice.
- Build the deferred CEDS page, which has no approved layout.
- Require live Sanity credentials for local development.
- Implement production contact/newsletter submission behavior in the first slice.

## Architecture

Use SvelteKit as the public web app. Sanity Studio will live in the same repository, with schema files versioned alongside the frontend. The public app and Studio will have separate commands so each can be deployed independently. Shared content contracts will live in TypeScript modules consumed by the frontend content helpers and mirrored by the Studio schemas where useful.

Top-level shape:

- `src/routes/` for public SvelteKit routes.
- `src/lib/components/` for shared UI primitives and page sections.
- `src/lib/content/` for Sanity queries, fallback content, and content mapping helpers.
- `src/lib/sanity/` for Sanity client configuration.
- `studio/` for the same-repo Sanity Studio workspace.
- `static/` for fonts and approved handoff assets that must be served directly.

## Routes

The initial route map will reflect the handoff, even if only the first route is fully implemented:

- `/` and `/dsu` map to DSU home.
- `/dsu/members`, `/dsu/joining`, `/dsu/projects`
- `/edu`, `/edu/board`, `/edu/history`, `/edu/contact`
- `/educore`
- `/resources`, `/resources/glossary`, `/resources/faq`
- `/events`, `/events/past`

CEDS remains nav-only or disabled until approved layouts exist.

## Content Boundaries

CMS-managed content:

- Page titles, hero descriptions, CTA labels and destinations.
- DSU pillars, values, initiative rows, and member-voice quotes.
- Board members, history entries, member organizations, projects, resources, glossary terms, FAQs, events, videos, and EDUcore tools.
- Footer column labels and links where editors need control.

Hardcoded or code-owned content:

- Route definitions and active-section logic.
- Layout primitives, component variants, design tokens, breakpoints, and accessibility behavior.
- Brand color values, typography scale, spacing scale, and focus styling.
- Fallback data that mirrors the handoff so local development works without Sanity credentials.

The first slice will use Sanity-shaped fallback content. Components will consume normalized content objects rather than importing handoff arrays directly.

## First Slice

Build:

- SvelteKit scaffold and basic project scripts.
- Same-repo Sanity Studio scaffold and schemas needed by DSU home plus shared chrome.
- Sanity client config with environment variables and a safe local fallback path.
- DSU home route at `/`.
- Shared chrome: primary nav, contextual sub-nav, hero, footer.
- Shared primitives: button, container, eyebrow, section, list/card patterns used by DSU home.
- Global styles and font loading based on the handoff tokens.

## Data Flow

SvelteKit route loaders request content through `src/lib/content/` helpers. Helpers attempt Sanity reads when project configuration is present. If Sanity is not configured, they return fallback data. Page components receive normalized page data and render without needing to know whether content came from Sanity or fallback modules.

## Error Handling

Missing Sanity configuration will not break local development. Failed Sanity reads will log enough context for developers and fall back to handoff-derived content during development. Production behavior can be stricter after deployment requirements are known.

## Testing And Verification

Initial verification will include:

- Package install succeeds.
- SvelteKit build succeeds.
- Sanity schema/build checks succeed if provided by the scaffold.
- Local dev server renders `/` and shows the DSU home slice.
- Browser verification confirms the page is nonblank, navigation chrome appears, and the layout responds at desktop and mobile widths.

## Open Decisions

- Exact deployment target is not yet selected.
- Production Sanity project ID, dataset, API version, and auth needs are not yet known.
- Contact and newsletter providers are not yet selected.
