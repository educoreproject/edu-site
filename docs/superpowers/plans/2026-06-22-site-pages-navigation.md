# Site Pages Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace duplicated page-local nav fields with one controlled site page/navigation model that also powers hero and CTA destinations, while moving EDU to `/` and DSU to `/dsu`.

**Architecture:** Add a route metadata registry in Svelte, a reusable link destination model in Sanity and frontend types, and a normalized `SiteChrome` tree returned by `getSiteChrome()`. Route components render shared chrome from route metadata instead of hard-coded active section labels, while content page queries resolve CTAs and hero links through one destination path.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, Sanity Studio 5, GROQ, Node 24 `node:test`, TypeScript.

---

## Scope Check

This is one cohesive implementation because the site page model, shared destination model, route swap, and footer parity all touch the same route metadata and chrome contract. Do not split these into separate independent launches; partial delivery would leave duplicate editor-facing nav sources.

## File Structure

- Create `src/lib/content/route-metadata.ts`: code-owned route/page registry, section registry, and helpers for section-scoped route lookups.
- Create `src/lib/content/destinations.ts`: frontend link destination types and resolver from raw Sanity destination to component-friendly link data.
- Modify `src/lib/content/types.ts`: add normalized chrome, destination-aware CTA, and remove page-local `slug`, `activeSection`, and `subNav` fields from page types.
- Modify `src/lib/content/queries.ts`: query singleton docs by `_id`, project raw destinations for CTAs/cards, and fetch raw site page nav documents.
- Modify `src/lib/content/site.ts`: fetch raw Sanity documents, normalize page links, normalize site chrome, and keep missing required docs loud.
- Modify `src/lib/components/site/PrimaryNav.svelte`, `SubNav.svelte`, `PageFooter.svelte`: consume normalized section tree instead of separate `primaryNav`, `subNav`, and `footerColumns`.
- Create `src/lib/components/site/SectionChrome.svelte`: renders primary nav plus section subnav for a route key.
- Create `src/lib/components/pages/DsuOverviewPage.svelte` and `src/lib/components/pages/EduOverviewPage.svelte`: preserve existing page templates while supporting the EDU/DSU route swap cleanly.
- Modify all page routes under `src/routes/**`: loaders return `routeKey`; Svelte pages render `SectionChrome`.
- Create `studio/schemaTypes/siteNavigation.ts`: Sanity `linkDestination`, `navItem`, and `sitePage` schema types.
- Create `studio/schemaTypes/routePageOptions.ts`: Studio-side controlled route/page option lists matching the frontend registry.
- Modify page schemas in `studio/schemaTypes/*.ts`: remove editor-facing `slug`, `activeSection`, and `subNav` fields.
- Modify `studio/schemaTypes/objects.ts`: make CTA/resource-card/hero button schemas use `linkDestination`.
- Modify `studio/schemaTypes/index.ts`: register new schema types and remove old `siteChrome` from the editor-facing schema list.
- Create `studio/structure.ts` and modify `studio/sanity.config.ts`: present a "Site pages" singleton tree.
- Create `studio/migrations/seed-site-pages-navigation.ts`: create new `sitePage` docs and migrate old `href` values into destinations.
- Add focused tests in `test/site-pages-navigation.test.mjs`, `test/shared-link-destinations.test.mjs`, and `test/edu-dsu-route-swap.test.mjs`.

---

### Task 1: Add Route Metadata Registry

**Files:**
- Create: `src/lib/content/route-metadata.ts`
- Test: `test/site-pages-navigation.test.mjs`

- [ ] **Step 1: Write the failing route metadata test**

Create `test/site-pages-navigation.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('route metadata declares the fixed site tree and EDU root route', () => {
	const source = readFileSync('src/lib/content/route-metadata.ts', 'utf8');

	for (const key of [
		'eduHome',
		'eduBoard',
		'eduHistory',
		'dsuHome',
		'dsuMembers',
		'dsuJoin',
		'dsuProjects',
		'cedsOverview',
		'educoreOverview',
		'resourcesHub',
		'resourcesLibrary',
		'resourcesNewsletter',
		'resourcesGlossary',
		'resourcesFaq',
		'resourcesPress',
		'eventsUpcoming',
		'eventsPast',
		'contact'
	]) {
		assert.match(source, new RegExp(`${key}:\\\\s*\\\\{`), `${key} route page is registered`);
	}

	assert.match(source, /eduHome:[\s\S]*?path:\s*'\/'/);
	assert.match(source, /dsuHome:[\s\S]*?path:\s*'\/dsu'/);
	assert.match(source, /eduBoard:[\s\S]*?path:\s*'\/edu\/board'/);
	assert.match(source, /eduHistory:[\s\S]*?path:\s*'\/edu\/history'/);
	assert.match(source, /sectionKey:\s*'edu'/);
	assert.match(source, /sectionKey:\s*'dsu'/);
	assert.match(source, /export function getRoutePage/);
	assert.match(source, /export function getSectionRoutePages/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
node --test test/site-pages-navigation.test.mjs
```

Expected: FAIL because `src/lib/content/route-metadata.ts` does not exist.

- [ ] **Step 3: Create the route metadata implementation**

Create `src/lib/content/route-metadata.ts`:

```ts
export type SiteSectionKey =
	| 'edu'
	| 'dsu'
	| 'ceds'
	| 'educore'
	| 'resources'
	| 'events'
	| 'contact';

export type RoutePageKey =
	| 'eduHome'
	| 'eduBoard'
	| 'eduHistory'
	| 'dsuHome'
	| 'dsuMembers'
	| 'dsuJoin'
	| 'dsuProjects'
	| 'cedsOverview'
	| 'educoreOverview'
	| 'resourcesHub'
	| 'resourcesLibrary'
	| 'resourcesNewsletter'
	| 'resourcesGlossary'
	| 'resourcesFaq'
	| 'resourcesPress'
	| 'eventsUpcoming'
	| 'eventsPast'
	| 'contact';

export type SiteSectionMeta = {
	key: SiteSectionKey;
	label: string;
	homePageKey: RoutePageKey;
	defaultOrder: number;
};

export type RoutePageMeta = {
	key: RoutePageKey;
	sectionKey: SiteSectionKey;
	label: string;
	path: string;
	parentPath: string;
	isSectionHome?: boolean;
};

export const siteSections: Record<SiteSectionKey, SiteSectionMeta> = {
	edu: { key: 'edu', label: 'EDU', homePageKey: 'eduHome', defaultOrder: 10 },
	dsu: { key: 'dsu', label: 'DSU', homePageKey: 'dsuHome', defaultOrder: 20 },
	ceds: { key: 'ceds', label: 'CEDS', homePageKey: 'cedsOverview', defaultOrder: 30 },
	educore: { key: 'educore', label: 'EDUcore', homePageKey: 'educoreOverview', defaultOrder: 40 },
	resources: { key: 'resources', label: 'Resources', homePageKey: 'resourcesHub', defaultOrder: 50 },
	events: { key: 'events', label: 'Events', homePageKey: 'eventsUpcoming', defaultOrder: 60 },
	contact: { key: 'contact', label: 'Contact', homePageKey: 'contact', defaultOrder: 70 }
};

export const routePages: Record<RoutePageKey, RoutePageMeta> = {
	eduHome: {
		key: 'eduHome',
		sectionKey: 'edu',
		label: 'Overview',
		path: '/',
		parentPath: '/',
		isSectionHome: true
	},
	eduBoard: {
		key: 'eduBoard',
		sectionKey: 'edu',
		label: 'Board',
		path: '/edu/board',
		parentPath: '/'
	},
	eduHistory: {
		key: 'eduHistory',
		sectionKey: 'edu',
		label: 'History',
		path: '/edu/history',
		parentPath: '/'
	},
	dsuHome: {
		key: 'dsuHome',
		sectionKey: 'dsu',
		label: 'Home',
		path: '/dsu',
		parentPath: '/dsu',
		isSectionHome: true
	},
	dsuMembers: {
		key: 'dsuMembers',
		sectionKey: 'dsu',
		label: 'Members',
		path: '/dsu/members',
		parentPath: '/dsu'
	},
	dsuJoin: {
		key: 'dsuJoin',
		sectionKey: 'dsu',
		label: 'Joining DSU',
		path: '/dsu/joining',
		parentPath: '/dsu'
	},
	dsuProjects: {
		key: 'dsuProjects',
		sectionKey: 'dsu',
		label: 'Projects',
		path: '/dsu/projects',
		parentPath: '/dsu'
	},
	cedsOverview: {
		key: 'cedsOverview',
		sectionKey: 'ceds',
		label: 'Overview',
		path: '/ceds',
		parentPath: '/ceds',
		isSectionHome: true
	},
	educoreOverview: {
		key: 'educoreOverview',
		sectionKey: 'educore',
		label: 'Overview',
		path: '/educore',
		parentPath: '/educore',
		isSectionHome: true
	},
	resourcesHub: {
		key: 'resourcesHub',
		sectionKey: 'resources',
		label: 'Hub',
		path: '/resources',
		parentPath: '/resources',
		isSectionHome: true
	},
	resourcesLibrary: {
		key: 'resourcesLibrary',
		sectionKey: 'resources',
		label: 'Library',
		path: '/resources/library',
		parentPath: '/resources'
	},
	resourcesNewsletter: {
		key: 'resourcesNewsletter',
		sectionKey: 'resources',
		label: 'Newsletter',
		path: '/resources/newsletter',
		parentPath: '/resources'
	},
	resourcesGlossary: {
		key: 'resourcesGlossary',
		sectionKey: 'resources',
		label: 'Glossary',
		path: '/resources/glossary',
		parentPath: '/resources'
	},
	resourcesFaq: {
		key: 'resourcesFaq',
		sectionKey: 'resources',
		label: 'FAQ',
		path: '/resources/faq',
		parentPath: '/resources'
	},
	resourcesPress: {
		key: 'resourcesPress',
		sectionKey: 'resources',
		label: 'Press & charter',
		path: '/resources/press',
		parentPath: '/resources'
	},
	eventsUpcoming: {
		key: 'eventsUpcoming',
		sectionKey: 'events',
		label: 'Upcoming',
		path: '/events',
		parentPath: '/events',
		isSectionHome: true
	},
	eventsPast: {
		key: 'eventsPast',
		sectionKey: 'events',
		label: 'Past events',
		path: '/events/past',
		parentPath: '/events'
	},
	contact: {
		key: 'contact',
		sectionKey: 'contact',
		label: 'Contact',
		path: '/contact',
		parentPath: '/contact',
		isSectionHome: true
	}
};

export function getRoutePage(key: RoutePageKey) {
	return routePages[key];
}

export function getSection(key: SiteSectionKey) {
	return siteSections[key];
}

export function getSectionRoutePages(sectionKey: SiteSectionKey) {
	return Object.values(routePages).filter((page) => page.sectionKey === sectionKey);
}

export function getSectionHomeRoute(sectionKey: SiteSectionKey) {
	return routePages[siteSections[sectionKey].homePageKey];
}
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```bash
node --test test/site-pages-navigation.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/route-metadata.ts test/site-pages-navigation.test.mjs
git commit -m "feat: add route metadata registry"
```

---

### Task 2: Add Shared Destination Resolution

**Files:**
- Create: `src/lib/content/destinations.ts`
- Modify: `src/lib/content/types.ts`
- Test: `test/shared-link-destinations.test.mjs`

- [ ] **Step 1: Write the failing shared destination test**

Create `test/shared-link-destinations.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('frontend destination resolver supports internal, external, download, and anchor links', () => {
	const source = readFileSync('src/lib/content/destinations.ts', 'utf8');
	const types = readFileSync('src/lib/content/types.ts', 'utf8');

	assert.match(source, /export function resolveDestination/);
	assert.match(source, /case 'internalPage'/);
	assert.match(source, /case 'externalUrl'/);
	assert.match(source, /case 'download'/);
	assert.match(source, /case 'anchor'/);
	assert.match(source, /getRoutePage\(destination\.pageKey\)/);
	assert.match(source, /download:\s*destination\.file\.filename \?\? true/);
	assert.match(types, /export type LinkDestinationKind = 'internalPage' \| 'externalUrl' \| 'download' \| 'anchor';/);
	assert.match(types, /export type ResolvedLink/);
	assert.match(types, /target\?:\s*'_blank'/);
	assert.match(types, /download\?:\s*string \| boolean/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
node --test test/shared-link-destinations.test.mjs
```

Expected: FAIL because `src/lib/content/destinations.ts` does not exist.

- [ ] **Step 3: Update shared frontend types**

In `src/lib/content/types.ts`, replace the existing `LinkItem` and `Cta` definitions with:

```ts
import type { RoutePageKey, SiteSectionKey } from './route-metadata';

export type LinkDestinationKind = 'internalPage' | 'externalUrl' | 'download' | 'anchor';

export type LinkDestination = {
	type: LinkDestinationKind;
	pageKey?: RoutePageKey;
	href?: string;
	anchorId?: string;
	file?: {
		url?: string;
		filename?: string;
		mimeType?: string;
		size?: number;
	};
};

export type ResolvedLink = {
	href?: string;
	target?: '_blank';
	rel?: 'noopener noreferrer';
	download?: string | boolean;
	mimeType?: string;
	size?: number;
};

export type LinkItem = ResolvedLink & {
	label: string;
	disabled?: boolean;
	hidden?: boolean;
	pageKey?: RoutePageKey;
};

export type Cta = ResolvedLink & {
	label: string;
	variant: 'primary' | 'outline' | 'teal' | 'gold';
};

export type SiteNavSection = LinkItem & {
	key: SiteSectionKey;
	pageKey: RoutePageKey;
	children: LinkItem[];
};

export type SiteChrome = {
	primaryNav: LinkItem[];
	sections: SiteNavSection[];
};
```

Keep the rest of `types.ts` in place for now; page-local `slug`, `activeSection`, and `subNav` are removed in Task 5.

- [ ] **Step 4: Create destination resolver**

Create `src/lib/content/destinations.ts`:

```ts
import { getRoutePage } from './route-metadata';
import type { LinkDestination, ResolvedLink } from './types';

function withAnchor(href: string, anchorId?: string) {
	if (!anchorId?.trim()) {
		return href;
	}

	return `${href}#${anchorId.replace(/^#/, '')}`;
}

export function resolveDestination(destination?: LinkDestination): ResolvedLink {
	if (!destination) {
		return {};
	}

	switch (destination.type) {
		case 'internalPage': {
			if (!destination.pageKey) {
				return {};
			}

			const page = getRoutePage(destination.pageKey);
			return {
				href: withAnchor(page.path, destination.anchorId)
			};
		}
		case 'externalUrl':
			return destination.href
				? {
						href: destination.href,
						target: '_blank',
						rel: 'noopener noreferrer'
					}
				: {};
		case 'download':
			return destination.file?.url
				? {
						href: destination.file.url,
						download: destination.file.filename ?? true,
						mimeType: destination.file.mimeType,
						size: destination.file.size
					}
				: {};
		case 'anchor': {
			if (destination.pageKey) {
				return {
					href: withAnchor(getRoutePage(destination.pageKey).path, destination.anchorId)
				};
			}

			return destination.anchorId ? { href: `#${destination.anchorId.replace(/^#/, '')}` } : {};
		}
		default:
			return {};
	}
}
```

- [ ] **Step 5: Run the focused test and verify it passes**

Run:

```bash
node --test test/shared-link-destinations.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/content/types.ts src/lib/content/destinations.ts test/shared-link-destinations.test.mjs
git commit -m "feat: add shared link destination resolver"
```

---

### Task 3: Add Sanity Destination And Site Page Schemas

**Files:**
- Create: `studio/schemaTypes/routePageOptions.ts`
- Create: `studio/schemaTypes/siteNavigation.ts`
- Modify: `studio/schemaTypes/index.ts`
- Test: `test/site-pages-navigation.test.mjs`

- [ ] **Step 1: Extend the schema test**

Append this test to `test/site-pages-navigation.test.mjs`:

```js
test('Sanity exposes site page navigation and shared link destination schemas', () => {
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');
	const siteNavigationSource = readFileSync('studio/schemaTypes/siteNavigation.ts', 'utf8');
	const optionsSource = readFileSync('studio/schemaTypes/routePageOptions.ts', 'utf8');

	assert.match(siteNavigationSource, /export const linkDestination = defineType\(\{/);
	assert.match(siteNavigationSource, /name:\s*'linkDestination'/);
	assert.match(siteNavigationSource, /value:\s*'internalPage'/);
	assert.match(siteNavigationSource, /value:\s*'externalUrl'/);
	assert.match(siteNavigationSource, /value:\s*'download'/);
	assert.match(siteNavigationSource, /value:\s*'anchor'/);
	assert.match(siteNavigationSource, /export const navItem = defineType\(\{/);
	assert.match(siteNavigationSource, /name:\s*'navItem'/);
	assert.match(siteNavigationSource, /name:\s*'hidden'/);
	assert.match(siteNavigationSource, /name:\s*'disabled'/);
	assert.match(siteNavigationSource, /export const sitePage = defineType\(\{/);
	assert.match(siteNavigationSource, /name:\s*'sitePage'/);
	assert.match(siteNavigationSource, /name:\s*'sectionKey'/);
	assert.match(siteNavigationSource, /name:\s*'navigationItems'/);
	assert.match(optionsSource, /export const routePageOptions/);
	assert.match(optionsSource, /value:\s*'eduHome'/);
	assert.match(optionsSource, /value:\s*'dsuHome'/);
	assert.match(optionsSource, /export function getRoutePageOptionsForSection/);
	assert.match(indexSource, /linkDestination/);
	assert.match(indexSource, /navItem/);
	assert.match(indexSource, /sitePage/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
node --test test/site-pages-navigation.test.mjs
```

Expected: FAIL because the Sanity schema files do not exist.

- [ ] **Step 3: Create Studio route page options**

Create `studio/schemaTypes/routePageOptions.ts`:

```ts
export type StudioSectionKey = 'edu' | 'dsu' | 'ceds' | 'educore' | 'resources' | 'events' | 'contact'

export const routePageOptions = [
	{title: 'EDU home', value: 'eduHome', section: 'edu', path: '/'},
	{title: 'EDU board', value: 'eduBoard', section: 'edu', path: '/edu/board'},
	{title: 'EDU history', value: 'eduHistory', section: 'edu', path: '/edu/history'},
	{title: 'DSU overview', value: 'dsuHome', section: 'dsu', path: '/dsu'},
	{title: 'DSU members', value: 'dsuMembers', section: 'dsu', path: '/dsu/members'},
	{title: 'Joining DSU', value: 'dsuJoin', section: 'dsu', path: '/dsu/joining'},
	{title: 'DSU projects', value: 'dsuProjects', section: 'dsu', path: '/dsu/projects'},
	{title: 'CEDS overview', value: 'cedsOverview', section: 'ceds', path: '/ceds'},
	{title: 'EDUcore overview', value: 'educoreOverview', section: 'educore', path: '/educore'},
	{title: 'Resources hub', value: 'resourcesHub', section: 'resources', path: '/resources'},
	{title: 'Resources library', value: 'resourcesLibrary', section: 'resources', path: '/resources/library'},
	{title: 'Newsletter', value: 'resourcesNewsletter', section: 'resources', path: '/resources/newsletter'},
	{title: 'Glossary', value: 'resourcesGlossary', section: 'resources', path: '/resources/glossary'},
	{title: 'FAQ', value: 'resourcesFaq', section: 'resources', path: '/resources/faq'},
	{title: 'Press & charter', value: 'resourcesPress', section: 'resources', path: '/resources/press'},
	{title: 'Upcoming events', value: 'eventsUpcoming', section: 'events', path: '/events'},
	{title: 'Past events', value: 'eventsPast', section: 'events', path: '/events/past'},
	{title: 'Contact', value: 'contact', section: 'contact', path: '/contact'}
] as const

export const sectionOptions = [
	{title: 'EDU', value: 'edu'},
	{title: 'DSU', value: 'dsu'},
	{title: 'CEDS', value: 'ceds'},
	{title: 'EDUcore', value: 'educore'},
	{title: 'Resources', value: 'resources'},
	{title: 'Events', value: 'events'},
	{title: 'Contact', value: 'contact'}
] as const

export function getRoutePageOptionsForSection(section: StudioSectionKey) {
	return routePageOptions.filter((option) => option.section === section)
}
```

- [ ] **Step 4: Create Sanity navigation schema types**

Create `studio/schemaTypes/siteNavigation.ts`:

```ts
import {defineField, defineType} from 'sanity'
import {routePageOptions, sectionOptions} from './routePageOptions'

export const linkDestination = defineType({
	name: 'linkDestination',
	title: 'Link destination',
	type: 'object',
	fields: [
		defineField({
			name: 'type',
			title: 'Destination type',
			type: 'string',
			options: {
				list: [
					{title: 'Internal page', value: 'internalPage'},
					{title: 'External URL', value: 'externalUrl'},
					{title: 'Download', value: 'download'},
					{title: 'Anchor link', value: 'anchor'}
				],
				layout: 'radio'
			},
			initialValue: 'internalPage',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'pageKey',
			title: 'Internal page',
			type: 'string',
			options: {
				list: routePageOptions.map(({title, value}) => ({title, value}))
			},
			hidden: ({parent}) => !['internalPage', 'anchor'].includes(parent?.type)
		}),
		defineField({
			name: 'href',
			title: 'External URL',
			type: 'url',
			hidden: ({parent}) => parent?.type !== 'externalUrl'
		}),
		defineField({
			name: 'file',
			title: 'Download file',
			type: 'file',
			hidden: ({parent}) => parent?.type !== 'download'
		}),
		defineField({
			name: 'anchorId',
			title: 'Anchor ID',
			type: 'string',
			description: 'Enter the anchor without the # symbol.',
			hidden: ({parent}) => parent?.type !== 'anchor'
		})
	],
	preview: {
		select: {
			type: 'type',
			pageKey: 'pageKey',
			href: 'href',
			anchorId: 'anchorId'
		},
		prepare: ({type, pageKey, href, anchorId}) => ({
			title: type === 'externalUrl' ? href : pageKey || anchorId || 'Link destination',
			subtitle: type
		})
	}
})

export const navItem = defineType({
	name: 'navItem',
	title: 'Navigation item',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'destination',
			title: 'Destination',
			type: 'linkDestination',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'disabled',
			title: 'Disabled',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'hidden',
			title: 'Hide from navigation',
			type: 'boolean',
			initialValue: false
		})
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'destination.type'
		}
	}
})

export const sitePage = defineType({
	name: 'sitePage',
	title: 'Site page',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Editor title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'sectionKey',
			title: 'Section',
			type: 'string',
			options: {
				list: sectionOptions
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'routePageKey',
			title: 'Primary internal page',
			type: 'string',
			options: {
				list: routePageOptions.map(({title, value}) => ({title, value}))
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'navLabel',
			title: 'Primary navigation label',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'sortOrder',
			title: 'Navigation order',
			type: 'number',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'disabled',
			title: 'Disabled',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'hidden',
			title: 'Hide from primary navigation and footer',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'navigationItems',
			title: 'Subnav and footer items',
			type: 'array',
			of: [{type: 'navItem'}]
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'sectionKey'
		}
	}
})
```

- [ ] **Step 5: Register schema types**

Modify `studio/schemaTypes/index.ts`:

```ts
import {linkDestination, navItem, sitePage} from './siteNavigation'
```

Add `linkDestination`, `navItem`, and `sitePage` near `linkItem` in `schemaTypes`. Keep `siteChrome` import and registration until Task 8 so existing content remains inspectable while the frontend migrates.

- [ ] **Step 6: Run the focused test and verify it passes**

Run:

```bash
node --test test/site-pages-navigation.test.mjs
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add studio/schemaTypes/routePageOptions.ts studio/schemaTypes/siteNavigation.ts studio/schemaTypes/index.ts test/site-pages-navigation.test.mjs
git commit -m "feat: add site page navigation schemas"
```

---

### Task 4: Move CTAs, Hero Buttons, And Resource Cards To Destinations

**Files:**
- Modify: `studio/schemaTypes/objects.ts`
- Modify: `src/lib/content/queries.ts`
- Modify: `src/lib/content/site.ts`
- Modify: `src/lib/content/types.ts`
- Test: `test/shared-link-destinations.test.mjs`
- Test: `test/shared-cta-content.test.mjs`

- [ ] **Step 1: Extend tests for destination-backed CTAs**

Append this test to `test/shared-link-destinations.test.mjs`:

```js
test('CTA, hero, and resource card schemas use linkDestination instead of freeform href', () => {
	const objectsSource = readFileSync('studio/schemaTypes/objects.ts', 'utf8');
	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const siteSource = readFileSync('src/lib/content/site.ts', 'utf8');

	assert.match(objectsSource, /name:\s*'destination'[\s\S]*type:\s*'linkDestination'/);
	assert.doesNotMatch(objectsSource, /name:\s*'href'[\s\S]*title:\s*'Href'/);
	assert.match(queriesSource, /const linkDestinationProjection = `\{/);
	assert.match(queriesSource, /destination\$\{linkDestinationProjection\}/);
	assert.match(siteSource, /resolveCta/);
	assert.match(siteSource, /resolveHero/);
	assert.match(siteSource, /resolveResourceCard/);
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run:

```bash
node --test test/shared-link-destinations.test.mjs test/shared-cta-content.test.mjs
```

Expected: FAIL because schemas and projections still use `href`.

- [ ] **Step 3: Update CTA schema**

In `studio/schemaTypes/objects.ts`, replace the `cta` fields with:

```ts
export const cta = defineType({
	name: 'cta',
	title: 'CTA',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (rule) => rule.custom((value, context) => requireCtaValue(value, context, 'CTA label'))
		}),
		defineField({
			name: 'destination',
			title: 'Destination',
			type: 'linkDestination',
			validation: (rule) => rule.custom((value, context) => requireCtaValue(value, context, 'CTA destination'))
		}),
		defineField({
			name: 'variant',
			title: 'Variant',
			type: 'string',
			options: {
				list: [
					{title: 'Primary', value: 'primary'},
					{title: 'Outline', value: 'outline'},
					{title: 'Teal', value: 'teal'},
					{title: 'Gold', value: 'gold'}
				]
			},
			initialValue: 'primary',
			validation: (rule) => rule.custom((value, context) => requireCtaValue(value, context, 'CTA variant'))
		})
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'destination.type'
		}
	}
})
```

Update shared CTA validation in the same file so it checks `cta.destination` instead of `cta.href`:

```ts
const cta = value as {label?: string; destination?: unknown} | undefined
```

and:

```ts
return parent.signupMode !== 'directEmailSignup' && !cta.destination
	? 'External newsletter signups need a CTA destination.'
	: true
```

- [ ] **Step 4: Add link destination projection and raw CTA projection**

In `src/lib/content/queries.ts`, replace `ctaProjection` with:

```ts
const linkDestinationProjection = `{
	type,
	pageKey,
	href,
	anchorId,
	"file": select(
		defined(file.asset) => {
			"url": file.asset->url,
			"filename": file.asset->originalFilename,
			"mimeType": file.asset->mimeType,
			"size": file.asset->size
		},
		null
	)
}`;

const ctaProjection = `{
	label,
	variant,
	destination${linkDestinationProjection}
}`;
```

Keep all existing `hero${heroProjection}`, `resourceCardProjection`, and shared CTA projection call sites using `cta${ctaProjection}`.

- [ ] **Step 5: Add raw types and resolvers in `site.ts`**

In `src/lib/content/site.ts`, import `resolveDestination` and add these helpers below `fetchFromSanity`:

```ts
import { resolveDestination } from './destinations';
import type { Cta, HeroContent, ResourceCard, SharedCtaContent } from './types';

type RawCta = Omit<Cta, keyof ReturnType<typeof resolveDestination>> & {
	destination?: Parameters<typeof resolveDestination>[0];
};

type RawHeroContent = Omit<HeroContent, 'ctas'> & {
	ctas?: RawCta[];
};

type RawResourceCard = Omit<ResourceCard, 'cta'> & {
	cta: RawCta;
};

type RawSharedCtaContent = Omit<SharedCtaContent, 'cta'> & {
	cta: RawCta;
};

function resolveCta(cta: RawCta): Cta {
	return {
		label: cta.label,
		variant: cta.variant,
		...resolveDestination(cta.destination)
	};
}

function resolveHero(hero: RawHeroContent): HeroContent {
	return {
		...hero,
		ctas: hero.ctas?.map(resolveCta) ?? []
	};
}

function resolveResourceCard(card: RawResourceCard): ResourceCard {
	return {
		...card,
		cta: resolveCta(card.cta)
	};
}

function resolveSharedCta(cta: RawSharedCtaContent): SharedCtaContent {
	return {
		...cta,
		cta: resolveCta(cta.cta)
	} as SharedCtaContent;
}
```

For each page getter, resolve `hero`, `ctas`, and any resource-card arrays before returning. Use explicit transforms, for example:

```ts
export async function getResourcesHubPage(): Promise<ResourcesHubPage> {
	const page = await fetchFromSanity<ResourcesHubPage & {cards: RawResourceCard[]; hero: RawHeroContent; ctas: RawSharedCtaContent[]}>(
		resourcesHubQuery,
		'Resources hub page'
	);

	return {
		...page,
		hero: resolveHero(page.hero),
		cards: page.cards.map(resolveResourceCard),
		ctas: page.ctas.map(resolveSharedCta)
	};
}
```

For every remaining page getter, return an explicit object that spreads `page`, replaces `hero` with `resolveHero(page.hero)`, and replaces `ctas` with `page.ctas.map(resolveSharedCta)`. For `getCedsOverviewPage()` also map `learningLinks` through `resolveResourceCard`; for `getResourcesHubPage()` also map `cards` through `resolveResourceCard`.

- [ ] **Step 6: Update tests that expected raw `href`**

Modify `test/shared-cta-content.test.mjs`:

```js
assert.match(queriesSource, /destination\$\{linkDestinationProjection\}/);
assert.doesNotMatch(queriesSource, /href,\s*\n\s*variant/);
assert.match(typesSource, /cta:\s*Cta;/);
```

Keep the rest of the shared CTA test assertions that verify route rendering through `PageCtas`.

- [ ] **Step 7: Run focused tests**

Run:

```bash
node --test test/shared-link-destinations.test.mjs test/shared-cta-content.test.mjs
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add studio/schemaTypes/objects.ts src/lib/content/queries.ts src/lib/content/site.ts src/lib/content/types.ts test/shared-link-destinations.test.mjs test/shared-cta-content.test.mjs
git commit -m "feat: use shared destinations for CTAs"
```

---

### Task 5: Replace Site Chrome Query With Normalized Site Page Tree

**Files:**
- Modify: `src/lib/content/queries.ts`
- Modify: `src/lib/content/site.ts`
- Modify: `src/lib/content/types.ts`
- Test: `test/site-pages-navigation.test.mjs`
- Test: `test/external-nav-links.test.mjs`

- [ ] **Step 1: Extend chrome normalization tests**

Append this test to `test/site-pages-navigation.test.mjs`:

```js
test('site chrome query reads sitePage documents and normalizes footer from sections', () => {
	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const siteSource = readFileSync('src/lib/content/site.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');

	assert.match(queriesSource, /export const chromeQuery = `\*\[_type == "sitePage"\]/);
	assert.match(queriesSource, /order\(sortOrder asc\)/);
	assert.match(queriesSource, /navigationItems\[\]/);
	assert.doesNotMatch(queriesSource, /\*_type == "siteChrome"/);
	assert.match(siteSource, /function normalizeSiteChrome/);
	assert.doesNotMatch(siteSource, /footerColumns/);
	assert.match(siteSource, /primaryNav:\s*sections\.map/);
	assert.match(typesSource, /export type SiteNavSection/);
	assert.match(typesSource, /sections:\s*SiteNavSection\[\]/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
node --test test/site-pages-navigation.test.mjs
```

Expected: FAIL because `chromeQuery` still reads `siteChrome`.

- [ ] **Step 3: Replace `chromeQuery`**

In `src/lib/content/queries.ts`, replace the current `chromeQuery` with:

```ts
export const chromeQuery = `*[_type == "sitePage"] | order(sortOrder asc){
	sectionKey,
	routePageKey,
	navLabel,
	disabled,
	hidden,
	sortOrder,
	"navigationItems": coalesce(navigationItems[]{
		label,
		disabled,
		hidden,
		destination${linkDestinationProjection}
	}, [])
}`;
```

- [ ] **Step 4: Add raw chrome normalization**

In `src/lib/content/site.ts`, import route metadata and add:

```ts
import { getRoutePage, getSection } from './route-metadata';
import type { RoutePageKey, SiteSectionKey } from './route-metadata';
import type { LinkItem, SiteChrome, SiteNavSection } from './types';

type RawNavItem = {
	label: string;
	disabled?: boolean;
	hidden?: boolean;
	destination?: Parameters<typeof resolveDestination>[0];
};

type RawSitePage = {
	sectionKey: SiteSectionKey;
	routePageKey: RoutePageKey;
	navLabel: string;
	disabled?: boolean;
	hidden?: boolean;
	sortOrder?: number;
	navigationItems?: RawNavItem[];
};

function normalizeNavItem(item: RawNavItem): LinkItem | null {
	if (item.hidden) {
		return null;
	}

	const resolved = resolveDestination(item.destination);

	if (!resolved.href && !item.disabled) {
		return null;
	}

	return {
		label: item.label,
		disabled: item.disabled,
		pageKey: item.destination?.pageKey,
		...resolved
	};
}

function normalizeSiteChrome(rawPages: RawSitePage[]): SiteChrome {
	const sections = rawPages
		.filter((page) => !page.hidden)
		.map((page): SiteNavSection => {
			const route = getRoutePage(page.routePageKey);
			const section = getSection(page.sectionKey);
			const children = (page.navigationItems ?? [])
				.map(normalizeNavItem)
				.filter((item): item is LinkItem => Boolean(item));

			return {
				key: page.sectionKey,
				pageKey: page.routePageKey,
				label: page.navLabel || section.label,
				disabled: page.disabled,
				href: route.path,
				children
			};
		});

	return {
		primaryNav: sections.map(({children, key, pageKey, ...section}) => section),
		sections
	};
}
```

Update `getSiteChrome()`:

```ts
export async function getSiteChrome(): Promise<SiteChrome> {
	const rawPages = await fetchFromSanity<RawSitePage[]>(chromeQuery, 'site pages navigation');
	return normalizeSiteChrome(rawPages);
}
```

- [ ] **Step 5: Update external nav tests to target the section tree**

Modify `test/external-nav-links.test.mjs` so assertions reference `chrome.sections` and `section.children` instead of `chrome.footerColumns` where component code changes in Task 6. Keep the external-link behavior assertions.

- [ ] **Step 6: Run focused tests**

Run:

```bash
node --test test/site-pages-navigation.test.mjs test/external-nav-links.test.mjs
```

Expected: PASS after Task 6 updates components. If this task is executed before component changes, `external-nav-links` may still fail; commit only after both this task and Task 6 are green.

- [ ] **Step 7: Commit after Task 6 passes**

Use Task 6's commit once components and chrome are migrated together.

---

### Task 6: Update Shared Nav Components To Consume Normalized Chrome

**Files:**
- Create: `src/lib/components/site/SectionChrome.svelte`
- Modify: `src/lib/components/site/PrimaryNav.svelte`
- Modify: `src/lib/components/site/SubNav.svelte`
- Modify: `src/lib/components/site/PageFooter.svelte`
- Test: `test/site-pages-navigation.test.mjs`
- Test: `test/external-nav-links.test.mjs`

- [ ] **Step 1: Extend component tests**

Append to `test/site-pages-navigation.test.mjs`:

```js
test('shared chrome components consume normalized SiteChrome sections', () => {
	const sectionChrome = readFileSync('src/lib/components/site/SectionChrome.svelte', 'utf8');
	const primaryNav = readFileSync('src/lib/components/site/PrimaryNav.svelte', 'utf8');
	const footer = readFileSync('src/lib/components/site/PageFooter.svelte', 'utf8');

	assert.match(sectionChrome, /routeKey:\s*RoutePageKey/);
	assert.match(sectionChrome, /getRoutePage\(routeKey\)/);
	assert.match(sectionChrome, /activeSection = \$derived/);
	assert.match(sectionChrome, /<PrimaryNav[\s\S]*chrome=\{chrome\}/);
	assert.match(sectionChrome, /<SubNav[\s\S]*section=\{activeSection\}/);
	assert.match(primaryNav, /chrome:\s*SiteChrome/);
	assert.match(primaryNav, /chrome\.sections/);
	assert.doesNotMatch(primaryNav, /footerColumns/);
	assert.match(footer, /chrome\.sections/);
	assert.doesNotMatch(footer, /chrome\.footerColumns/);
});
```

- [ ] **Step 2: Run focused tests and verify they fail**

Run:

```bash
node --test test/site-pages-navigation.test.mjs test/external-nav-links.test.mjs
```

Expected: FAIL because components still use old props.

- [ ] **Step 3: Create `SectionChrome.svelte`**

Create `src/lib/components/site/SectionChrome.svelte`:

```svelte
<script lang="ts">
	import type { RoutePageKey } from '$lib/content/route-metadata';
	import { getRoutePage } from '$lib/content/route-metadata';
	import type { SiteChrome } from '$lib/content/types';
	import PrimaryNav from './PrimaryNav.svelte';
	import SubNav from './SubNav.svelte';

	type Props = {
		chrome: SiteChrome;
		routeKey: RoutePageKey;
		logoHref?: string;
	};

	let { chrome, routeKey, logoHref = '/' }: Props = $props();
	let route = $derived(getRoutePage(routeKey));
	let activeSection = $derived(chrome.sections.find((section) => section.key === route.sectionKey));
	let activeChild = $derived(activeSection?.children.find((link) => link.pageKey === routeKey || link.href === route.path));
</script>

<PrimaryNav {chrome} activeSectionKey={route.sectionKey} activePageKey={routeKey} {logoHref} />

{#if activeSection?.children.length}
	<SubNav section={activeSection} activeHref={route.path} activeLabel={activeChild?.label ?? route.label} />
{/if}
```

- [ ] **Step 4: Update `PrimaryNav.svelte` props and loops**

Modify `src/lib/components/site/PrimaryNav.svelte`:

```svelte
<script lang="ts">
  import { isExternalLink } from "$lib/content/links";
  import type { RoutePageKey, SiteSectionKey } from "$lib/content/route-metadata";
  import type { SiteChrome } from "$lib/content/types";
  import Container from "./Container.svelte";

  type Props = {
    chrome: SiteChrome;
    activeSectionKey?: SiteSectionKey;
    activePageKey?: RoutePageKey;
    logoHref?: string;
  };

  const uid = $props.id();
  let { chrome, activeSectionKey, activePageKey, logoHref = "/" }: Props = $props();

  let menuOpen = $state(false);
  const panelId = `${uid}-mobile-menu`;
  let navSections = $derived(chrome.sections);
```

In the desktop loop, use:

```svelte
{#each chrome.sections as section}
	{@const active = section.key === activeSectionKey}
	{@const isExternal = isExternalLink(section.href)}
```

In the drawer child loop, use:

```svelte
{@const childActive = sectionActive && (child.pageKey === activePageKey || child.href === activePage?.path)}
```

Define `activePage`:

```ts
import { getRoutePage } from "$lib/content/route-metadata";
let activePage = $derived(activePageKey ? getRoutePage(activePageKey) : undefined);
```

- [ ] **Step 5: Update `SubNav.svelte` props**

Replace props in `src/lib/components/site/SubNav.svelte`:

```svelte
<script lang="ts">
  import { isExternalLink } from "$lib/content/links";
  import type { SiteNavSection } from "$lib/content/types";
  import Container from "./Container.svelte";

  type Props = {
    section: SiteNavSection;
    activeHref: string;
    activeLabel?: string;
  };

  let { section, activeHref, activeLabel }: Props = $props();
</script>
```

Replace crumb and link references:

```svelte
<nav aria-label="{section.label} navigation">
...
<a class="crumb-link" href={section.href}>{section.label}</a>
...
{#if activeLabel}
	<span class="current">{activeLabel}</span>
{/if}
...
{#each section.children as link}
	{@const isActive = link.href === activeHref}
```

- [ ] **Step 6: Update `PageFooter.svelte`**

Replace footer columns loop with:

```svelte
{#each chrome.sections as section}
	<section aria-labelledby={`footer-${section.key}`}>
		<h2 id={`footer-${section.key}`}>{section.label}</h2>
		<ul>
			{#each section.children as link}
```

Keep existing external link and disabled rendering behavior.

- [ ] **Step 7: Run focused tests**

Run:

```bash
node --test test/site-pages-navigation.test.mjs test/external-nav-links.test.mjs
```

Expected: PASS.

- [ ] **Step 8: Commit Tasks 5 and 6 together**

```bash
git add src/lib/content/queries.ts src/lib/content/site.ts src/lib/content/types.ts src/lib/components/site/SectionChrome.svelte src/lib/components/site/PrimaryNav.svelte src/lib/components/site/SubNav.svelte src/lib/components/site/PageFooter.svelte test/site-pages-navigation.test.mjs test/external-nav-links.test.mjs
git commit -m "feat: normalize site navigation chrome"
```

---

### Task 7: Remove Page-Local Nav Fields From Schemas, Queries, And Types

**Files:**
- Modify: `studio/schemaTypes/cedsOverview.ts`
- Modify: `studio/schemaTypes/dsuHome.ts`
- Modify: `studio/schemaTypes/dsuMembers.ts`
- Modify: `studio/schemaTypes/dsuJoin.ts`
- Modify: `studio/schemaTypes/dsuProjects.ts`
- Modify: `studio/schemaTypes/eduOverview.ts`
- Modify: `studio/schemaTypes/eduBoard.ts`
- Modify: `studio/schemaTypes/eduHistory.ts`
- Modify: `studio/schemaTypes/eduContact.ts`
- Modify: `studio/schemaTypes/educoreOverview.ts`
- Modify: `studio/schemaTypes/eventsUpcoming.ts`
- Modify: `studio/schemaTypes/eventsPast.ts`
- Modify: `studio/schemaTypes/resourcesHub.ts`
- Modify: `studio/schemaTypes/resourcesLibrary.ts`
- Modify: `studio/schemaTypes/resourcesNewsletter.ts`
- Modify: `studio/schemaTypes/resourcesGlossary.ts`
- Modify: `studio/schemaTypes/resourcesFaq.ts`
- Modify: `studio/schemaTypes/resourcesPress.ts`
- Modify: `src/lib/content/queries.ts`
- Modify: `src/lib/content/types.ts`
- Test: `test/site-pages-navigation.test.mjs`

- [ ] **Step 1: Add the legacy-field removal test**

Append to `test/site-pages-navigation.test.mjs`:

```js
test('page schemas and content queries no longer expose legacy nav fields', () => {
	const pageSchemas = [
		'studio/schemaTypes/cedsOverview.ts',
		'studio/schemaTypes/dsuHome.ts',
		'studio/schemaTypes/dsuMembers.ts',
		'studio/schemaTypes/dsuJoin.ts',
		'studio/schemaTypes/dsuProjects.ts',
		'studio/schemaTypes/eduOverview.ts',
		'studio/schemaTypes/eduBoard.ts',
		'studio/schemaTypes/eduHistory.ts',
		'studio/schemaTypes/eduContact.ts',
		'studio/schemaTypes/educoreOverview.ts',
		'studio/schemaTypes/eventsUpcoming.ts',
		'studio/schemaTypes/eventsPast.ts',
		'studio/schemaTypes/resourcesHub.ts',
		'studio/schemaTypes/resourcesLibrary.ts',
		'studio/schemaTypes/resourcesNewsletter.ts',
		'studio/schemaTypes/resourcesGlossary.ts',
		'studio/schemaTypes/resourcesFaq.ts',
		'studio/schemaTypes/resourcesPress.ts'
	];

	for (const schemaPath of pageSchemas) {
		const source = readFileSync(schemaPath, 'utf8');
		assert.doesNotMatch(source, /name:\s*'slug'/, `${schemaPath} does not expose slug`);
		assert.doesNotMatch(source, /name:\s*'activeSection'/, `${schemaPath} does not expose activeSection`);
		assert.doesNotMatch(source, /name:\s*'subNav'/, `${schemaPath} does not expose subNav`);
	}

	const queriesSource = readFileSync('src/lib/content/queries.ts', 'utf8');
	const typesSource = readFileSync('src/lib/content/types.ts', 'utf8');
	assert.doesNotMatch(queriesSource, /"slug":\s*slug\.current/);
	assert.doesNotMatch(queriesSource, /\bactiveSection,/);
	assert.doesNotMatch(queriesSource, /"subNav":\s*coalesce/);
	assert.doesNotMatch(typesSource, /slug:\s*'/);
	assert.doesNotMatch(typesSource, /activeSection:/);
	assert.doesNotMatch(typesSource, /subNav:\s*LinkItem\[\]/);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
node --test test/site-pages-navigation.test.mjs
```

Expected: FAIL because legacy fields are still present.

- [ ] **Step 3: Remove legacy fields from page schemas**

In every listed page schema, delete the first three `defineField` blocks for:

```ts
name: 'slug'
name: 'activeSection'
name: 'subNav'
```

Do not remove content fields such as `hero`, `ctas`, `items`, `members`, `entries`, or page-specific sections.

- [ ] **Step 4: Query singleton documents by `_id`**

In `src/lib/content/queries.ts`, change page query selectors:

```ts
export const dsuHomeQuery = `*[_id == "dsuHome"][0]{`
export const dsuMembersQuery = `*[_id == "dsuMembers"][0]{`
export const dsuJoinQuery = `*[_id == "dsuJoin"][0]{`
export const dsuProjectsQuery = `*[_id == "dsuProjects"][0]{`
export const cedsOverviewQuery = `*[_id == "cedsOverview"][0]{`
export const resourcesHubQuery = `*[_id == "resourcesHub"][0]{`
export const resourcesLibraryQuery = `*[_id == "resourcesLibrary"][0]{`
export const resourcesPressQuery = `*[_id == "resourcesPress"][0]{`
export const resourcesNewsletterQuery = `*[_id == "resourcesNewsletter"][0]{`
export const resourcesGlossaryQuery = `*[_id == "resourcesGlossary"][0]{`
export const resourcesFaqQuery = `*[_id == "resourcesFaq"][0]{`
export const eventsUpcomingQuery = `*[_id == "eventsUpcoming"][0]{`
export const eventsPastQuery = `*[_id == "eventsPast"][0]{`
export const eduOverviewQuery = `*[_id == "eduOverview"][0]{`
export const eduBoardQuery = `*[_id == "eduBoard"][0]{`
export const eduHistoryQuery = `*[_id == "eduHistory"][0]{`
export const contactPageQuery = `*[_id == "eduContact"][0]{`
export const educoreOverviewQuery = `*[_id == "educoreOverview"][0]{`
```

Remove these projection lines from every page query:

```groq
"slug": slug.current,
activeSection,
"subNav": coalesce(subNav[]${linkItemProjection}, []),
```

- [ ] **Step 5: Remove fields from page TypeScript types**

In every page type in `src/lib/content/types.ts`, delete:

```ts
slug: ...
activeSection: ...
subNav: LinkItem[];
```

- [ ] **Step 6: Run focused tests**

Run:

```bash
node --test test/site-pages-navigation.test.mjs test/shared-cta-content.test.mjs test/resources-library-documents.test.mjs test/ceds-page.test.mjs
```

Expected: update older tests that explicitly expected `subNav`, `slug.current`, or `activeSection` so they assert the new site page model instead. After updates, PASS.

- [ ] **Step 7: Commit**

```bash
git add studio/schemaTypes src/lib/content/queries.ts src/lib/content/types.ts test/site-pages-navigation.test.mjs test/shared-cta-content.test.mjs test/resources-library-documents.test.mjs test/ceds-page.test.mjs
git commit -m "feat: remove page-local navigation fields"
```

---

### Task 8: Swap EDU And DSU Routes

**Files:**
- Create: `src/lib/components/pages/DsuOverviewPage.svelte`
- Create: `src/lib/components/pages/EduOverviewPage.svelte`
- Modify: `src/routes/+page.ts`
- Modify: `src/routes/+page.svelte`
- Modify: `src/routes/dsu/+page.ts`
- Modify: `src/routes/dsu/+page.svelte`
- Modify: `src/routes/edu/+page.ts`
- Modify: `src/routes/edu/+page.svelte`
- Modify: `src/routes/edu/board/+page.svelte`
- Modify: `src/routes/edu/history/+page.svelte`
- Modify: `src/routes/dsu/members/+page.svelte`
- Modify: `src/routes/dsu/joining/+page.svelte`
- Modify: `src/routes/dsu/projects/+page.svelte`
- Test: `test/edu-dsu-route-swap.test.mjs`

- [ ] **Step 1: Write the failing route swap test**

Create `test/edu-dsu-route-swap.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('root route loads EDU and DSU overview lives at /dsu', () => {
	const rootLoad = readFileSync('src/routes/+page.ts', 'utf8');
	const rootPage = readFileSync('src/routes/+page.svelte', 'utf8');
	const dsuLoad = readFileSync('src/routes/dsu/+page.ts', 'utf8');
	const dsuPage = readFileSync('src/routes/dsu/+page.svelte', 'utf8');

	assert.match(rootLoad, /getEduOverviewPage/);
	assert.doesNotMatch(rootLoad, /getDsuHomePage/);
	assert.match(rootPage, /EduOverviewPage/);
	assert.match(rootPage, /routeKey="eduHome"/);
	assert.match(dsuLoad, /getDsuHomePage/);
	assert.match(dsuPage, /DsuOverviewPage/);
	assert.match(dsuPage, /routeKey="dsuHome"/);
});

test('/edu redirects to root while EDU child pages stay nested', () => {
	const eduLoad = readFileSync('src/routes/edu/+page.ts', 'utf8');
	const boardPage = readFileSync('src/routes/edu/board/+page.svelte', 'utf8');
	const historyPage = readFileSync('src/routes/edu/history/+page.svelte', 'utf8');

	assert.match(eduLoad, /redirect\(308,\s*'\/'\)/);
	assert.match(boardPage, /routeKey="eduBoard"/);
	assert.match(historyPage, /routeKey="eduHistory"/);
});

test('DSU subpages use DSU route metadata keys', () => {
	for (const [path, routeKey] of [
		['src/routes/dsu/members/+page.svelte', 'dsuMembers'],
		['src/routes/dsu/joining/+page.svelte', 'dsuJoin'],
		['src/routes/dsu/projects/+page.svelte', 'dsuProjects']
	]) {
		const source = readFileSync(path, 'utf8');
		assert.match(source, new RegExp(`routeKey="${routeKey}"`), `${path} uses ${routeKey}`);
	}
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
node --test test/edu-dsu-route-swap.test.mjs
```

Expected: FAIL because root still loads DSU.

- [ ] **Step 3: Extract current page templates**

Move the current root page template into `src/lib/components/pages/DsuOverviewPage.svelte` and replace its chrome calls with:

```svelte
<SectionChrome {chrome} routeKey="dsuHome" />
```

Move the current `src/routes/edu/+page.svelte` template into `src/lib/components/pages/EduOverviewPage.svelte` and replace its chrome calls with:

```svelte
<SectionChrome {chrome} routeKey="eduHome" />
```

Both new components should import:

```svelte
import SectionChrome from '$lib/components/site/SectionChrome.svelte';
```

and should remove imports of `PrimaryNav` and `SubNav`.

- [ ] **Step 4: Update root route to EDU**

Update `src/routes/+page.ts`:

```ts
import { getEduOverviewPage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getEduOverviewPage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'eduHome' as const };
}
```

Replace `src/routes/+page.svelte` with:

```svelte
<script lang="ts">
	import EduOverviewPage from '$lib/components/pages/EduOverviewPage.svelte';
	import type { EduOverviewPage as EduOverviewPageContent, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: EduOverviewPageContent;
			chrome: SiteChrome;
			routeKey: 'eduHome';
		};
	};

	let { data }: Props = $props();
</script>

<EduOverviewPage {data} />
```

- [ ] **Step 5: Update `/dsu` route**

Update `src/routes/dsu/+page.ts`:

```ts
import { getDsuHomePage, getSiteChrome } from '$lib/content/site';

export async function load() {
	const [page, chrome] = await Promise.all([getDsuHomePage(), getSiteChrome()]);

	return { page, chrome, routeKey: 'dsuHome' as const };
}
```

Replace `src/routes/dsu/+page.svelte` with:

```svelte
<script lang="ts">
	import DsuOverviewPage from '$lib/components/pages/DsuOverviewPage.svelte';
	import type { DsuHomePage as DsuHomePageContent, SiteChrome } from '$lib/content/types';

	type Props = {
		data: {
			page: DsuHomePageContent;
			chrome: SiteChrome;
			routeKey: 'dsuHome';
		};
	};

	let { data }: Props = $props();
</script>

<DsuOverviewPage {data} />
```

- [ ] **Step 6: Redirect `/edu` to `/`**

Update `src/routes/edu/+page.ts`:

```ts
import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(308, '/');
}
```

Replace `src/routes/edu/+page.svelte` with:

```svelte
<script lang="ts">
</script>
```

- [ ] **Step 7: Add route keys and SectionChrome to remaining pages**

For each route loader, add the route key to the returned object:

```ts
return { page, chrome, routeKey: 'eduBoard' as const };
```

Use these keys:

- `src/routes/edu/board/+page.ts`: `eduBoard`
- `src/routes/edu/history/+page.ts`: `eduHistory`
- `src/routes/dsu/members/+page.ts`: `dsuMembers`
- `src/routes/dsu/joining/+page.ts`: `dsuJoin`
- `src/routes/dsu/projects/+page.ts`: `dsuProjects`
- `src/routes/ceds/+page.ts`: `cedsOverview`
- `src/routes/educore/+page.ts`: `educoreOverview`
- `src/routes/resources/+page.ts`: `resourcesHub`
- `src/routes/resources/library/+page.server.ts`: `resourcesLibrary`
- `src/routes/resources/newsletter/+page.server.ts`: `resourcesNewsletter`
- `src/routes/resources/glossary/+page.server.ts`: `resourcesGlossary`
- `src/routes/resources/faq/+page.server.ts`: `resourcesFaq`
- `src/routes/resources/press/+page.server.ts`: `resourcesPress`
- `src/routes/events/+page.ts`: `eventsUpcoming`
- `src/routes/events/past/+page.ts`: `eventsPast`
- `src/routes/contact/+page.ts`: `contact`

In each corresponding Svelte page, import `SectionChrome`, remove `PrimaryNav` and `SubNav`, and replace the old chrome markup with:

```svelte
<SectionChrome {chrome} routeKey="ROUTE_KEY_FROM_LIST" />
```

- [ ] **Step 8: Run focused route swap tests**

Run:

```bash
node --test test/edu-dsu-route-swap.test.mjs test/site-pages-navigation.test.mjs
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/lib/components/pages src/routes test/edu-dsu-route-swap.test.mjs test/site-pages-navigation.test.mjs
git commit -m "feat: make EDU root and move DSU to dsu route"
```

---

### Task 9: Add Studio Structure And Migration Script

**Files:**
- Create: `studio/structure.ts`
- Modify: `studio/sanity.config.ts`
- Create: `studio/migrations/seed-site-pages-navigation.ts`
- Modify: `studio/schemaTypes/index.ts`
- Test: `test/site-pages-navigation.test.mjs`

- [ ] **Step 1: Extend Studio structure and migration tests**

Append to `test/site-pages-navigation.test.mjs`:

```js
test('Studio exposes Site pages structure and migration seeds new nav model', () => {
	const configSource = readFileSync('studio/sanity.config.ts', 'utf8');
	const structureSource = readFileSync('studio/structure.ts', 'utf8');
	const migrationSource = readFileSync('studio/migrations/seed-site-pages-navigation.ts', 'utf8');
	const indexSource = readFileSync('studio/schemaTypes/index.ts', 'utf8');

	assert.match(configSource, /structureTool\(\{structure\}\)/);
	assert.match(structureSource, /title\('Site pages'\)/);
	assert.match(structureSource, /documentId\('sitePageEdu'\)/);
	assert.match(structureSource, /documentId\('sitePageDsu'\)/);
	assert.match(structureSource, /documentId\('eduOverview'\)/);
	assert.match(structureSource, /documentId\('dsuHome'\)/);
	assert.match(migrationSource, /_id:\s*'sitePageEdu'/);
	assert.match(migrationSource, /routePageKey:\s*'eduHome'/);
	assert.match(migrationSource, /_id:\s*'sitePageDsu'/);
	assert.match(migrationSource, /routePageKey:\s*'dsuHome'/);
	assert.match(migrationSource, /function destinationFromHref/);
	assert.match(migrationSource, /unset\(\['slug', 'activeSection', 'subNav'\]\)/);
	assert.doesNotMatch(indexSource, /\bsiteChrome,/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
node --test test/site-pages-navigation.test.mjs
```

Expected: FAIL because Studio structure and migration are not present.

- [ ] **Step 3: Create Studio structure**

Create `studio/structure.ts`:

```ts
import type {StructureResolver} from 'sanity/structure'

function singleton(S: Parameters<StructureResolver>[0], title: string, schemaType: string, documentId: string) {
	return S.listItem()
		.title(title)
		.child(S.document().schemaType(schemaType).documentId(documentId).title(title))
}

function contentItem(S: Parameters<StructureResolver>[0], title: string, schemaType: string, documentId: string) {
	return S.listItem()
		.title(title)
		.child(S.document().schemaType(schemaType).documentId(documentId).title(title))
}

export const structure: StructureResolver = (S) =>
	S.list()
		.title('Content')
		.items([
			S.listItem()
				.title('Site pages')
				.child(
					S.list()
						.title('Site pages')
						.items([
							S.listItem()
								.title('EDU')
								.child(
									S.list()
										.title('EDU')
										.items([
											singleton(S, 'EDU navigation', 'sitePage', 'sitePageEdu'),
											contentItem(S, 'EDU home content', 'eduOverview', 'eduOverview'),
											contentItem(S, 'Board content', 'eduBoard', 'eduBoard'),
											contentItem(S, 'History content', 'eduHistory', 'eduHistory')
										])
								),
							S.listItem()
								.title('DSU')
								.child(
									S.list()
										.title('DSU')
										.items([
											singleton(S, 'DSU navigation', 'sitePage', 'sitePageDsu'),
											contentItem(S, 'DSU overview content', 'dsuHome', 'dsuHome'),
											contentItem(S, 'Members content', 'dsuMembers', 'dsuMembers'),
											contentItem(S, 'Joining DSU content', 'dsuJoin', 'dsuJoin'),
											contentItem(S, 'Projects content', 'dsuProjects', 'dsuProjects')
										])
								),
							S.listItem()
								.title('CEDS')
								.child(
									S.list()
										.title('CEDS')
										.items([
											singleton(S, 'CEDS navigation', 'sitePage', 'sitePageCeds'),
											contentItem(S, 'CEDS overview content', 'cedsOverview', 'cedsOverview')
										])
								),
							S.listItem()
								.title('EDUcore')
								.child(
									S.list()
										.title('EDUcore')
										.items([
											singleton(S, 'EDUcore navigation', 'sitePage', 'sitePageEducore'),
											contentItem(S, 'EDUcore overview content', 'educoreOverview', 'educoreOverview')
										])
								),
							S.listItem()
								.title('Resources')
								.child(
									S.list()
										.title('Resources')
										.items([
											singleton(S, 'Resources navigation', 'sitePage', 'sitePageResources'),
											contentItem(S, 'Resources hub content', 'resourcesHub', 'resourcesHub'),
											contentItem(S, 'Library content', 'resourcesLibrary', 'resourcesLibrary'),
											contentItem(S, 'Newsletter content', 'resourcesNewsletter', 'resourcesNewsletter'),
											contentItem(S, 'Glossary content', 'resourcesGlossary', 'resourcesGlossary'),
											contentItem(S, 'FAQ content', 'resourcesFaq', 'resourcesFaq'),
											contentItem(S, 'Press & charter content', 'resourcesPress', 'resourcesPress')
										])
								),
							S.listItem()
								.title('Events')
								.child(
									S.list()
										.title('Events')
										.items([
											singleton(S, 'Events navigation', 'sitePage', 'sitePageEvents'),
											contentItem(S, 'Upcoming events content', 'eventsUpcoming', 'eventsUpcoming'),
											contentItem(S, 'Past events content', 'eventsPast', 'eventsPast')
										])
								),
							S.listItem()
								.title('Contact')
								.child(
									S.list()
										.title('Contact')
										.items([
											singleton(S, 'Contact navigation', 'sitePage', 'sitePageContact'),
											contentItem(S, 'Contact page content', 'eduContact', 'eduContact')
										])
								)
						])
				),
			S.divider(),
			...S.documentTypeListItems().filter((item) => !['sitePage', 'siteChrome'].includes(item.getId() ?? ''))
		])
```

- [ ] **Step 4: Wire structure into Studio**

Modify `studio/sanity.config.ts`:

```ts
import {structure} from './structure'
```

and:

```ts
plugins: [structureTool({structure}), visionTool()],
```

- [ ] **Step 5: Create migration script**

Create `studio/migrations/seed-site-pages-navigation.ts` with:

```ts
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})

type LegacyLink = {
	_key?: string
	label?: string
	href?: string
	disabled?: boolean
}

function destinationFromHref(href?: string) {
	if (!href) {
		return {_type: 'linkDestination', type: 'externalUrl', href: '#'}
	}

	const internalPageByPath: Record<string, string> = {
		'/': 'eduHome',
		'/edu': 'eduHome',
		'/edu/board': 'eduBoard',
		'/edu/history': 'eduHistory',
		'/dsu': 'dsuHome',
		'/dsu/members': 'dsuMembers',
		'/dsu/joining': 'dsuJoin',
		'/dsu/projects': 'dsuProjects',
		'/ceds': 'cedsOverview',
		'/educore': 'educoreOverview',
		'/resources': 'resourcesHub',
		'/resources/library': 'resourcesLibrary',
		'/resources/newsletter': 'resourcesNewsletter',
		'/resources/glossary': 'resourcesGlossary',
		'/resources/faq': 'resourcesFaq',
		'/resources/press': 'resourcesPress',
		'/events': 'eventsUpcoming',
		'/events/past': 'eventsPast',
		'/contact': 'contact'
	}

	const [path, anchor] = href.split('#')
	const pageKey = internalPageByPath[path]

	if (pageKey && anchor) {
		return {_type: 'linkDestination', type: 'anchor', pageKey, anchorId: anchor}
	}

	if (pageKey) {
		return {_type: 'linkDestination', type: 'internalPage', pageKey}
	}

	if (href.startsWith('#')) {
		return {_type: 'linkDestination', type: 'anchor', anchorId: href.slice(1)}
	}

	return {_type: 'linkDestination', type: 'externalUrl', href}
}

function navItem(key: string, label: string, href: string, disabled = false) {
	return {
		_key: key,
		_type: 'navItem',
		label,
		disabled,
		hidden: false,
		destination: destinationFromHref(href)
	}
}

const sitePages = [
	{
		_id: 'sitePageEdu',
		_type: 'sitePage',
		title: 'EDU',
		sectionKey: 'edu',
		routePageKey: 'eduHome',
		navLabel: 'EDU',
		sortOrder: 10,
		navigationItems: [
			navItem('overview', 'Overview', '/'),
			navItem('board', 'Board', '/edu/board'),
			navItem('history', 'History', '/edu/history')
		]
	},
	{
		_id: 'sitePageDsu',
		_type: 'sitePage',
		title: 'DSU',
		sectionKey: 'dsu',
		routePageKey: 'dsuHome',
		navLabel: 'DSU',
		sortOrder: 20,
		navigationItems: [
			navItem('home', 'Home', '/dsu'),
			navItem('members', 'Members', '/dsu/members'),
			navItem('joining-dsu', 'Joining DSU', '/dsu/joining'),
			navItem('projects', 'Projects', '/dsu/projects')
		]
	},
	{
		_id: 'sitePageCeds',
		_type: 'sitePage',
		title: 'CEDS',
		sectionKey: 'ceds',
		routePageKey: 'cedsOverview',
		navLabel: 'CEDS',
		sortOrder: 30,
		navigationItems: [
			navItem('overview', 'Overview', '/ceds'),
			navItem('gitbook', 'CEDS GitBook', 'https://cedstandards.gitbook.io/ceds-gitbook')
		]
	},
	{
		_id: 'sitePageEducore',
		_type: 'sitePage',
		title: 'EDUcore',
		sectionKey: 'educore',
		routePageKey: 'educoreOverview',
		navLabel: 'EDUcore',
		sortOrder: 40,
		navigationItems: [
			navItem('overview', 'Overview', '/educore'),
			navItem('reference-library', 'Reference library', 'https://educore.dev/explore/use-cases'),
			navItem('ai-bakeoff', 'AI Bakeoff', '/educore#bakeoff')
		]
	},
	{
		_id: 'sitePageResources',
		_type: 'sitePage',
		title: 'Resources',
		sectionKey: 'resources',
		routePageKey: 'resourcesHub',
		navLabel: 'Resources',
		sortOrder: 50,
		navigationItems: [
			navItem('hub', 'Hub', '/resources'),
			navItem('library', 'Library', '/resources/library'),
			navItem('newsletter', 'Newsletter', '/resources/newsletter'),
			navItem('glossary', 'Glossary', '/resources/glossary'),
			navItem('faq', 'FAQ', '/resources/faq'),
			navItem('press-charter', 'Press & charter', '/resources/press')
		]
	},
	{
		_id: 'sitePageEvents',
		_type: 'sitePage',
		title: 'Events',
		sectionKey: 'events',
		routePageKey: 'eventsUpcoming',
		navLabel: 'Events',
		sortOrder: 60,
		navigationItems: [
			navItem('upcoming', 'Upcoming', '/events'),
			navItem('past-events', 'Past events', '/events/past')
		]
	},
	{
		_id: 'sitePageContact',
		_type: 'sitePage',
		title: 'Contact',
		sectionKey: 'contact',
		routePageKey: 'contact',
		navLabel: 'Contact',
		sortOrder: 70,
		navigationItems: []
	}
]

for (const sitePage of sitePages) {
	await client.createOrReplace(sitePage)
}

const legacyDocumentIds = [
	'cedsOverview',
	'dsuHome',
	'dsuMembers',
	'dsuJoin',
	'dsuProjects',
	'eduOverview',
	'eduBoard',
	'eduHistory',
	'eduContact',
	'educoreOverview',
	'eventsUpcoming',
	'eventsPast',
	'resourcesHub',
	'resourcesLibrary',
	'resourcesNewsletter',
	'resourcesGlossary',
	'resourcesFaq',
	'resourcesPress'
]

for (const documentId of legacyDocumentIds) {
	const document = await client.getDocument(documentId)

	if (!document) {
		continue
	}

	await client.patch(documentId).unset(['slug', 'activeSection', 'subNav']).commit()
}

console.log('Seeded site page navigation documents and removed legacy page nav fields.')
```

- [ ] **Step 6: Remove `siteChrome` registration from schema index**

In `studio/schemaTypes/index.ts`, remove `siteChrome` from `schemaTypes`. Keep the file on disk until no migration references it.

- [ ] **Step 7: Run focused tests**

Run:

```bash
node --test test/site-pages-navigation.test.mjs
```

Expected: PASS.

- [ ] **Step 8: Run Studio build**

Run:

```bash
npm run studio:build
```

Expected: build succeeds. If it fails for missing local Sanity env, verify `.env` includes `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`; do not edit unrelated env files in this task.

- [ ] **Step 9: Commit**

```bash
git add studio/structure.ts studio/sanity.config.ts studio/migrations/seed-site-pages-navigation.ts studio/schemaTypes/index.ts test/site-pages-navigation.test.mjs
git commit -m "feat: add site pages studio structure"
```

---

### Task 10: Full Regression And Cleanup

**Files:**
- Modify tests only if previous tasks changed source-string expectations.
- No product code changes unless verification reveals a specific defect.

- [ ] **Step 1: Run all focused Node tests**

Run:

```bash
node --test test/*.mjs
```

Expected: PASS. If failures are source-string expectations for removed legacy nav fields, update those assertions to check route metadata or `sitePage` schema instead.

- [ ] **Step 2: Run Svelte type check**

Run:

```bash
npm run check
```

Expected: PASS.

- [ ] **Step 3: Run frontend build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 4: Run Studio build**

Run:

```bash
npm run studio:build
```

Expected: PASS.

- [ ] **Step 5: Inspect remaining legacy nav references**

Run:

```bash
rg -n "activeSection|subNav|slug\\.current|siteChrome|footerColumns|activeSubSection" src studio test
```

Expected: no product-code references to page-local `activeSection`, `subNav`, `slug.current`, `siteChrome`, `footerColumns`, or hard-coded `activeSubSection`. Migration files may mention old fields only when unsetting or translating legacy data.

- [ ] **Step 6: Inspect git status**

Run:

```bash
git status --short
```

Expected: only intentional changes are present. Pre-existing unrelated changes to `package.json` and `studio/sanity.cli.ts` may still appear if they were not part of this implementation; do not revert them.

- [ ] **Step 7: Commit verification fixes if any were required**

If Step 1 through Step 5 required source or test updates, commit them:

```bash
git add src studio test
git commit -m "test: align navigation model regression coverage"
```

If no files changed after the previous task commits, do not create an empty commit.
