import {getCliClient} from 'sanity/cli'

// Seeds the EDUcore "Impact / Milestones" timeline document (_id: timeline) from the
// finalized Drive draft, and links it into the EDUcore nav. Idempotent: safe to re-run.
//
//   npx sanity exec migrations/seed-timeline.ts --with-user-token
//
// Run AFTER the timeline schema is deployed (npm run studio:deploy).

const client = getCliClient({apiVersion: '2026-06-01'})

type Span = {_type: 'span'; _key: string; text: string; marks: string[]}
type Block = {
	_type: 'block'
	_key: string
	style: 'normal'
	markDefs: never[]
	children: Span[]
}

type Milestone = {
	_key: string
	_type: 'milestone'
	group: string
	displayDate?: string
	sortOrder: number
	heading: string
	body: Block[]
}

// Build a single plain paragraph block with deterministic keys (for idempotent re-runs).
function paragraph(key: string, text: string): Block {
	return {
		_type: 'block',
		_key: `${key}-b`,
		style: 'normal',
		markDefs: [],
		children: [{_type: 'span', _key: `${key}-s`, text, marks: []}]
	}
}

type MilestoneSeed = {
	group: string
	displayDate?: string
	heading: string
	body: string
}

const milestoneSeeds: MilestoneSeed[] = [
	{
		group: '2021',
		displayDate: '2021',
		heading: 'The problem we set out to solve',
		body: `Education runs on data, but the specifications behind every exchange don't map cleanly. A coalition formed around a simple idea: align the standards already in use rather than replace them.`
	},
	{
		group: '2021',
		displayDate: 'June 2021',
		heading: 'Data Standards United (DSU) convenes',
		body: `A neutral, open collaborative of standards development organizations comes together to coordinate and align disparate data standards across education, employment, and training — while respecting each organization's independence.`
	},
	{
		group: '2021',
		displayDate: '2021–2024',
		heading: 'The coalition grows',
		body: `Leading bodies join the effort — 1EdTech, Access 4 Learning (A4L), Credential Engine, Dublin Core, ED3, the Groningen Declaration Network, HR Open Standards, MedBiquitous, and PESC — uniting the field's key players behind a shared goal.`
	},
	{
		group: '2025',
		displayDate: '2025',
		heading: 'A permanent home: Education Data Unlimited (EDU)',
		body: `EDU is established as a 501(c)(3) nonprofit to serve as a stable, long-term home for interoperability initiatives — a neutral convening force with a Board of Directors drawn from across the sector.`
	},
	{
		group: '2026',
		displayDate: 'Early 2026',
		heading: 'EDUcore launches',
		body: `The initiative to build an AI-ready "source of truth" for interoperability — a shared semantic backbone and practical mapping layer that lets organizations keep their current systems while achieving governed interoperability.`
	},
	{
		group: '2026',
		displayDate: 'Early 2026',
		heading: 'A common semantic backbone: the CEDS Ontology',
		body: `A machine-readable, AI-ready representation of the Common Education Data Standards (in RDF/OWL) becomes the anchor for cross-standard mapping — the foundation everything else maps to.`
	},
	{
		group: '2026',
		displayDate: 'April 2026',
		heading: 'The Reference Library opens',
		body: `A searchable, structured resource for implementers: canonical definitions, mappings, implementation notes, openness status, and governance metadata — lowering adoption costs for under-resourced districts, colleges, workforce boards, and employers.`
	},
	{
		group: '2026',
		displayDate: 'Spring 2026',
		heading: 'The Standards Registry maps the landscape',
		body: `A cross-referenced map of the education data standards world — spanning 13 standards organizations with plain-language descriptions and category overviews, so anyone can understand who does what and how the pieces fit.`
	},
	{
		group: '2026',
		displayDate: 'Spring 2026',
		heading: 'The AI Bakeoff: the ecosystem builds on EDUcore',
		body: `Eight community demonstrations show real tools built on shared standards — from AI-driven equity-gap analysis on CEDS data to living competency profiles and a nine-standard data-model explorer — proof the backbone works.`
	},
	{
		group: `What's next`,
		heading: `What's next`,
		body: `Deepening cross-standard mappings, expanding the registry, and growing the coalition — building universal interoperability with targeted adoption pathways across the PK20W+ lifelong-learning continuum.`
	}
]

const milestones: Milestone[] = milestoneSeeds.map((seed, index) => {
	const key = `m${index + 1}`
	return {
		_key: key,
		_type: 'milestone',
		group: seed.group,
		...(seed.displayDate ? {displayDate: seed.displayDate} : {}),
		sortOrder: index + 1,
		heading: seed.heading,
		body: [paragraph(key, seed.body)]
	}
})

const timelineDocument = {
	_id: 'timeline',
	_type: 'timeline',
	hero: {
		_type: 'heroContent',
		chip: 'EDUcore',
		title: 'Our Journey So Far',
		description: `AI is reshaping education and workforce systems, but fragmented data standards hold the ecosystem back. Here's how we've been building the shared foundation to fix that.`,
		ctas: []
	},
	milestones
}

// 1. Seed the timeline content document.
await client.createOrReplace(timelineDocument)
console.log(`Seeded timeline document with ${milestones.length} milestones.`)

// 2. Link it into the EDUcore nav (idempotent — only appends if not already present).
const educoreNav = await client.getDocument('sitePageEducore')

if (!educoreNav) {
	console.warn('sitePageEducore not found — skipping nav item. Add the "Milestones" nav item manually.')
} else {
	const items = (educoreNav.navigationItems as {destination?: {pageKey?: string}}[]) ?? []
	const alreadyLinked = items.some((item) => item.destination?.pageKey === 'educoreMilestones')

	if (alreadyLinked) {
		console.log('EDUcore nav already links to the milestones page — no change.')
	} else {
		await client
			.patch('sitePageEducore')
			.setIfMissing({navigationItems: []})
			.append('navigationItems', [
				{
					_key: 'milestones',
					_type: 'navItem',
					label: 'Milestones',
					disabled: false,
					hidden: false,
					destination: {
						_type: 'linkDestination',
						type: 'internalPage',
						pageKey: 'educoreMilestones'
					}
				}
			])
			.commit()
		console.log('Added "Milestones" nav item to the EDUcore navigation.')
	}
}
