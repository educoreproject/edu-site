# edu-site (Data Standards United / EDU)

SvelteKit frontend + Sanity Studio CMS. Every page fetches its content from Sanity via GROQ and renders it; there is no client-side content authoring outside Studio.

## Adding a new route

A new page touches several places that must stay in sync — there is no single source of truth:

1. `studio/schemaTypes/routePageOptions.ts` — add `{title, value, section, path}` to the `routePageOptions` enum. This is what makes the page selectable as a link destination (nav items, CTAs) in Studio.
2. `src/lib/content/route-metadata.ts` — add the matching `RoutePageKey` union member, `routePageKeys` entry, and `routePages` metadata (`path`, `parentPath`, `label`, `sectionKey`). This is a hand-maintained duplicate of (1) for the app layer — both must be updated together.
3. A GROQ query in `src/lib/content/queries.ts` + a loader function in `src/lib/content/site.ts`.
4. `src/routes/<path>/+page.server.ts` (loader) and `+page.svelte` (template), following the pattern of an existing similar page — most pages are one dedicated route directory each; there is no generic `[slug]` route.
5. If the page needs a Studio content document that isn't itself a document type worth its own schema, it's fine to reuse an existing document type at a *different* fixed `_id` (see "Reused document types" below) rather than create a new schema.

## Studio desk structure (`studio/structure.ts`)

- Nav is organized by section (EDU, DSU, CEDS, EDUcore, Resources, Events, Contact), each with a `sitePage` singleton (e.g. `sitePageDsu`) and a list of content pages.
- **A `sitePage` document represents a whole nav section, not one page.** To add a page's link to the DSU sub-nav/footer, append a `navItem` to the existing `sitePageDsu.navigationItems` array — do not create a new `sitePage` document per page. `routePageKey`/`sectionKey` on `sitePage` describe the section's home page, not the individual nav items.
- To make a content document editable in Studio when it isn't identified by `_id == <schemaType name>` (see "Reused document types"), add a `ContentPage` entry with an explicit `schemaType` override in `structure.ts`'s `contentItem()` — the helper defaults `schemaType` to the entry's `id`, which breaks when the document's `_id` isn't the type name.

## Reused document types (glossary-shaped content)

`resourcesGlossary` is used for more than one page: the main Resources Glossary (`_id: "resourcesGlossary"`) and DSU Standards (`_id: "5dcb5add-6399-4b81-ae19-179fd9ae7129"`, same `_type`). When a new page just needs "hero + filterable terms + optional PDF + CTAs", prefer creating another document of an existing glossary-shaped type at a new fixed `_id` over adding a new schema — the rendering (`CategorySelector`, pagination, `RichText` for definitions) is already generic.

## `glossaryTerm` fields

- `term`, `category` — plain strings.
- `definition` — **Portable Text** (`array of block`, with `bullet` lists and `strong`/`em` marks only, no annotations/links). Render via the shared `src/lib/components/site/RichText.svelte` component, not a raw `<p>`. Anywhere a plain-text version is needed (e.g. search indexing in `src/lib/content/search.ts`), flatten with a `plainTextFromBlocks`-style helper — don't assume `definition` is a string.
- `anchor` — optional string. If set, it's used verbatim as the term's URL fragment (e.g. `#CASE`); if blank, one is generated from `term` via `src/lib/utils/slugify.ts`. Term-listing pages read `location.hash` on mount/`hashchange`, auto-select the matching category, paginate to the right page, scroll the entry into view, and toggle a `.highlighted` class (not CSS `:target` alone — unreliable across navigation types).

## Working with content via the Sanity MCP connection

When an MCP connection to Sanity is available (tools prefixed with the Sanity MCP server ID: `query_documents`, `get_document`, `patch_documents`, `publish_documents`, etc.), use it to read/fix live content directly instead of writing one-off migration scripts for simple edits — it's faster and the user can see the diff before publishing.

- Get the project ID/dataset from `.env` (`PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET`).
- `patch_documents` edits always land in the **draft** first — always `query_documents` (perspective `"raw"`, targeting `drafts.<id>`) to verify the result before calling `publish_documents`.
- For bulk content transforms (e.g. converting many plain-string fields to Portable Text blocks), write the transform as a small Node script against exported JSON rather than hand-authoring the patch JSON — it's error-prone at any real scale and the risk of a malformed block (missing `_key`, wrong `marks` shape) is easy to introduce by hand.
- **Do not use `deploy_schema` / `deploy_studio`** from this MCP server — this repo has a local Sanity Studio project (`studio/`), and those tools explicitly refuse to manage a Studio-deployed workspace (using them would fork the deployed schema from source). Schema/structure changes ship through the normal code path: edit `studio/schemaTypes/*`, commit, merge, then `npm run studio:deploy` (or `npm run studio:dev` for local Studio) to actually publish the new schema/structure to Studio.

## Sanity migrations (`studio/migrations/`)

One-off scripts using `getCliClient()` from `sanity/cli`, run from `studio/`:

```bash
npx sanity login   # once, if not already authenticated
npx sanity exec migrations/<file>.ts --with-user-token
```

Keep migrations idempotent (check before creating/patching) since they may be re-run.

## Git workflow constraints

- `main` is protected and this agent **cannot self-merge PRs** — a permission classifier blocks `gh pr merge` on self-authored PRs even with explicit user confirmation in some cases. Expect to open the PR and hand it to the user to merge, or retry once if the user explicitly confirms — don't loop on it.
- Always create a feature branch off current `main` before committing — check `git log origin/main..<branch>` before assuming a branch is fully merged; PRs opened from this session have been merged out-of-band (via GitHub UI) partway through a multi-commit branch before, leaving later commits stranded on the branch. Verify with `git log origin/main..origin/<branch>` after any merge and cherry-pick/open a follow-up PR for anything left behind.

## Verification

- `npm run check` (svelte-check) after any content-type or route change — it also validates Sanity schema-adjacent app types.
- For anything rendered/interactive, use the browser preview (`edu-site-dev` launch config, port 5173) rather than asserting from the diff alone.
