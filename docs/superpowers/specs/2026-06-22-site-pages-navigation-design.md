# Site Pages And Navigation Model Redesign

Date: 2026-06-22
Status: Design approved for implementation planning

## Context

The current Sanity model asks editors to maintain site structure in several places. Most page
documents expose `slug`, `activeSection`, and `subNav`, while the Svelte routes still know the
actual route and active subsection labels. Footer columns are also managed separately from primary
and sub navigation. This has made the CMS feel more technical than the client needs.

The site has not launched, so this design intentionally avoids backward compatibility layers. The
goal is a cleaner editor experience for updating existing pages, adding resources, adding events,
and curating navigation without allowing editors to create new Svelte routes from Sanity.

## Goals

- Create a top-level "Site pages" editorial model for EDU, DSU, CEDS, EDUcore, Resources, Events,
  and Contact.
- Make one navigation tree drive primary nav, section subnav, mobile drawer child links, and footer
  links.
- Let editors reorder, relabel, disable, hide, and add non-route links without creating new app
  routes.
- Use the same controlled destination model for navigation links, hero buttons, and CTA links.
- Keep page content in focused singleton documents rather than embedding every subpage into one
  large parent document.
- Move EDU to the root route and DSU to `/dsu` as part of the same route/nav pass.
- Remove editor-facing legacy fields that duplicate app-owned structure.

## Non-Goals

- No dynamic route creation from Sanity.
- No generic page builder or arbitrary layout system.
- No compatibility layer for the old per-page `subNav`, `activeSection`, or public route semantics.
- No major redesign of page templates or visual chrome beyond what the data model requires.

## Recommended Model

Use a folder-like top-level page document for each site section. The parent document owns section
identity and navigation relationships. Route-backed content remains in specialized singleton content
documents such as `eduOverview`, `dsuMembers`, `resourcesLibrary`, and `eventsUpcoming`.

Define a reusable link destination object for anything that sends a visitor somewhere:

- `Internal page`: selected from a code-controlled allowlist of existing route-backed pages.
- `External link`: editor-controlled URL.
- `Download`: Sanity file asset.
- `Anchor`: controlled same-page or routed hash link when needed.

Navigation items, hero buttons, CTA banners, CTA cards, and resource-style links should all use
that destination object instead of freeform `href` fields. Navigation items wrap the destination
with navigation-specific controls such as order, disabled state, hidden state, and section-aware
internal page limits. Hero and CTA links wrap the destination with button-specific controls such as
label and variant.

Internal navigation items may be reordered, relabeled, disabled, or hidden, but their route is not
editable. Sanity stores the chosen page key; Svelte maps that key to the public route. Hero buttons
and CTAs should not be section-limited when choosing internal pages, because a CTA in one section
may intentionally send visitors to a different section.

## Exact Site Tree

The Studio "Site pages" structure should present the full site tree explicitly:

```text
Site pages
  EDU
    EDU home content -> /
    Board content -> /edu/board
    History content -> /edu/history
  DSU
    DSU overview content -> /dsu
    Members content -> /dsu/members
    Joining DSU content -> /dsu/joining
    Projects content -> /dsu/projects
  CEDS
    CEDS overview content -> /ceds
    External/docs links as nav items
  EDUcore
    EDUcore overview content -> /educore
    Reference library external link
    AI Bakeoff anchor/download/link item
  Resources
    Resources hub content -> /resources
    Library content -> /resources/library
    Newsletter content -> /resources/newsletter
    Glossary content -> /resources/glossary
    FAQ content -> /resources/faq
    Press & charter content -> /resources/press
    External/download items as needed
  Events
    Upcoming events content -> /events
    Past events content -> /events/past
  Contact
    Contact page content -> /contact
```

Each top-level page has one child navigation list. That list drives desktop section subnav, mobile
drawer child links, and footer child links. Top-level page order drives primary nav and footer
column order.

## EDU And DSU Route Role Swap

EDU becomes the parent organization in the route model:

- `/` loads EDU overview content.
- `/edu` performs a lightweight redirect to `/`.
- `/edu/board` and `/edu/history` remain nested under EDU.
- `/dsu` loads DSU overview content.
- `/dsu/members`, `/dsu/joining`, and `/dsu/projects` remain nested under DSU.
- EDU subpage breadcrumbs point to `/`.
- DSU subpage breadcrumbs point to `/dsu`.

Document type names do not have to mirror public route names. Editor-facing titles can be updated
to "EDU home" and "DSU overview" without requiring risky document type renames.

## Studio Editor Experience

The Studio should stop exposing the relevant page types as a flat technical list. Editors should
work primarily from a "Site pages" structure where each section behaves like a folder:

- Section settings: editor-facing title, section key, known route, primary nav label, and enabled
  state.
- Navigation items: the controlled nav item list for that section.
- Content shortcuts: direct entries for each route-backed content document in that section.

For internal nav items, the picker should be section-aware. For example, DSU subnav can choose DSU
overview, Members, Joining DSU, and Projects; Resources subnav can choose Resources hub, Library,
Newsletter, Glossary, FAQ, and Press & charter. Once an internal page is selected, Studio should
show the computed route as read-only helper text.

Hero buttons and CTA links should use the same destination picker, but without section limiting.
Their editor experience should still show computed internal routes as read-only helper text and
should use file or URL fields only for download and external destinations.

Remove or hide editor-facing `slug`, `activeSection`, and per-page `subNav` fields from content page
schemas after the new model is in place.

## Svelte Data Flow

Introduce a route metadata map in code. It defines every route-backed page key, public route path,
section key, parent route, default label, and content getter. Sanity can curate known keys and add
non-route nav items, but the app remains the source of truth for route existence.

`getSiteChrome()` should fetch the site page/navigation documents and normalize them into a single
tree, for example:

```ts
{
  primaryNav: [...],
  sections: [
    {
      key: 'edu',
      label: 'EDU',
      href: '/',
      children: [...]
    }
  ]
}
```

`PrimaryNav`, `SubNav`, the mobile drawer, and `PageFooter` should consume this same normalized
tree. Individual route files should derive their active top-level section, active child item, crumb
label, and crumb href from route metadata and normalized chrome instead of hard-coded active labels.

Page content queries should stop projecting `slug`, `activeSection`, and `subNav` from individual
content documents. Hero and CTA projections should normalize the shared destination object into the
current component-friendly link shape so existing button components can receive resolved `href`,
target, download, and file metadata without duplicating link-resolution logic in route templates.

## Migration And Validation

Because the site has not launched, migration should be clean and direct:

- Create the new top-level site page/navigation documents.
- Seed the navigation tree from the current primary nav, subnav, and footer data.
- Set EDU as the root section and DSU as `/dsu`.
- Preserve existing specialized content documents and their content fields.
- Remove editor-facing reliance on the old page-local nav fields.
- Migrate existing CTA and hero button `href` values into the shared destination object.

Missing required site page/navigation documents should fail loudly, matching the existing
Sanity-required content contract. Optional external, download, and anchor nav items can be filtered
or disabled if incomplete. Internal route-backed items should validate against the code allowlist so
broken internal navigation is caught early.

## Testing

Implementation should include focused tests for:

- `/` loads EDU overview content.
- `/edu` redirects to `/`.
- `/dsu` loads DSU overview content.
- Existing subpages remain at `/edu/board`, `/edu/history`, `/dsu/members`, `/dsu/joining`, and
  `/dsu/projects`.
- Page schemas no longer expose editor-facing `slug`, `activeSection`, or `subNav`.
- `getSiteChrome()` returns one normalized navigation tree for primary nav, section subnav, mobile
  drawer, and footer.
- Hero buttons and CTA links can resolve internal pages, external URLs, downloads, and anchors from
  the shared destination model.
- Route components no longer hard-code active subnav labels when route metadata can provide them.
- `npm run check` and `npm run build` pass with the required Sanity content contract.
