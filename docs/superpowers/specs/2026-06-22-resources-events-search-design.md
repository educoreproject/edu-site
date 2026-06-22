# Resources And Events Search

Date: 2026-06-22
Status: Design approved for spec review

## Context

The site needs a global search entry point that helps visitors find Resources and Events content.
The requested interaction model follows IDEA Data Center: a search icon button in the header opens a
search modal, the modal submits a keyword search, and visitors land on a results page with clearly
typed results and links.

This first pass is intentionally limited to Resources and Events. It does not search DSU, EDU, CEDS,
EDUcore, Contact, or generic site pages.

## Goals

- Add a search icon button to the shared site header.
- Open a modal dialog with a labeled keyword input and a Search button.
- Submit searches to `/search?keyword=<term>`.
- Render a `/search` results page with a repeated keyword form, result count text, clear result
  types, excerpts, metadata, and links.
- Search only existing Resources and Events content.
- Use the existing SvelteKit and Sanity content patterns without adding a third-party search
  service.
- Keep the feature accessible, keyboard usable, and consistent with current navigation chrome.

## Non-Goals

- No sitewide search across main informational pages in this pass.
- No editor-managed search page document.
- No dedicated search service such as Algolia or Meilisearch.
- No per-item detail routes for FAQ or glossary entries.
- No content highlighting inside result excerpts unless it can be added without making the UI noisy.

## Recommended Model

Use a server-side SvelteKit search helper that fetches the existing Resources and Events singleton
documents, normalizes their searchable items into one shared result shape, filters by keyword, and
returns sorted results to `/search`.

The shared result shape should include:

- `id`: stable enough for keyed rendering.
- `type`: user-facing type label such as `Event`, `Past event`, `Library resource`, `Newsletter`,
  `FAQ`, `Glossary`, or `Press & charter`.
- `title`: linked result title.
- `description`: short excerpt or answer/definition preview.
- `href`: destination for the result.
- `linkLabel`: action text such as `Learn more`, `Download file`, or `View resource`.
- `metadata`: optional secondary labels such as date, category, or document type.
- `score`: internal value for sorting stronger matches first.

The helper should search case-insensitively across titles, descriptions, categories, document types,
event tags, event dates, FAQ answers, glossary definitions, and newsletter/archive labels. Title
matches should rank higher than body, category, or metadata matches.

## Search Coverage

Searchable content sources:

- Resources library documents from `resourcesLibrary`.
- Press and charter documents from `resourcesPress`.
- Newsletter documents from `resourcesNewsletter`.
- Glossary terms from `resourcesGlossary`.
- FAQ items from `resourcesFaq`.
- Upcoming events from `eventsUpcoming`.
- Past events from `eventsPast`.

Result destinations:

- Downloadable resource documents link directly to the Sanity file asset.
- Upcoming events link to `event.href` when present.
- Past events link to `event.href` when present.
- FAQ results link to `/resources/faq`.
- Glossary results link to `/resources/glossary`.
- Results with no usable link should show a disabled action label rather than pretending to be
  clickable.

## Header And Modal UX

`PrimaryNav.svelte` should own the header search entry point because it already owns desktop
navigation and the mobile drawer trigger. Add an icon-only search button to the desktop navigation
area and the mobile header controls, using the existing Tabler icon font.

The button should:

- Use a visible search icon.
- Have an accessible label such as `Open search`.
- Use the same hover, active, and focus behavior expected of header controls.
- Not interfere with existing primary navigation or mobile menu behavior.

When opened, the search modal should:

- Use `role="dialog"` and `aria-modal="true"`.
- Have a clear accessible title.
- Include a labeled keyword input with placeholder text such as `Search resources and events`.
- Focus the input on open.
- Close on Escape and when the close button or scrim is activated.
- Submit to `/search` with a `keyword` query parameter.
- Preserve keyboard access and visible focus treatment.

The modal is a navigation aid, not an in-place live search UI. It should stay compact and avoid
preview result lists.

## Results Page UX

Create `/search` as a normal route with site chrome and footer. The page should not need a Sanity
singleton document. It should use a simple page header section with the title `Search` and enough
context to orient the visitor.

The results content should include:

- A keyword form at the top that submits with method `GET`.
- A result summary such as `Displaying 6 results for "data"`.
- An empty initial state when no keyword has been entered.
- A helpful no-results state when a keyword has no matches.
- One-column result cards using the existing document/event visual language.
- A visible result type label before or above the linked title.
- Secondary metadata such as date, category, or document type.
- A clear link or disabled action state for each item.

Pagination is not required for the first pass unless the result set proves too large. If needed
later, the existing `Pagination.svelte` component can be reused.

## Data Flow

The `/search/+page.server.ts` loader should read `url.searchParams.get('keyword')`, normalize
whitespace, and fetch site chrome plus search results. Empty keyword searches should avoid
presenting all items as results.

The content helper can live near existing content functions, for example in
`src/lib/content/search.ts`, while reusing the existing page getters from `src/lib/content/site.ts`.
It should keep normalization and scoring testable without requiring a live Sanity client.

The route should receive:

```ts
{
  chrome,
  keyword,
  results,
  hasSearched: Boolean(keyword)
}
```

## Error Handling

Search should follow the current Sanity-required content contract. If required singleton documents
are missing, the route can fail loudly like the rest of the site. Individual result links that are
empty or set to `#` should become disabled actions in the UI rather than broken links.

Empty and no-results states must not leave the page blank:

- Empty keyword: invite the visitor to search resources and events.
- No matches: say no results were found and keep the search form available.

## Testing

Implementation should include focused tests for:

- Search result normalization covers resources library, press, newsletter, glossary, FAQ, upcoming
  events, and past events.
- Keyword filtering is case-insensitive and checks title, description/body, category/type, date, and
  event tag fields.
- Title matches sort ahead of lower-strength metadata matches.
- Empty keywords return no results.
- `/search` has a server loader that reads the `keyword` query parameter, fetches site chrome, and
  returns the expected route data.
- `PrimaryNav.svelte` includes an accessible search icon button and modal form that submits to
  `/search` with the `keyword` parameter.
- `npm run check` and a focused `node --test` command pass.
