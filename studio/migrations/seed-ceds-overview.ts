import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})

function paragraph(key: string, text: string) {
	return {
		_key: key,
		_type: 'block',
		style: 'normal',
		markDefs: [],
		children: [
			{
				_key: `${key}-span`,
				_type: 'span',
				text,
				marks: []
			}
		]
	}
}

function textBlock(key: string, label: string, text: string) {
	return {
		_key: key,
		_type: 'textBlock',
		label,
		text
	}
}

function resourceCard(
	key: string,
	meta: string,
	title: string,
	description: string,
	label: string,
	href: string,
	variant: 'primary' | 'outline' | 'teal' | 'gold' = 'teal'
) {
	return {
		_key: key,
		_type: 'resourceCard',
		meta,
		title,
		description,
		cta: {
			_type: 'cta',
			label,
			href,
			variant
		}
	}
}

function linkItem(key: string, label: string, href: string, disabled = false) {
	return {
		_key: key,
		_type: 'linkItem',
		label,
		href,
		disabled
	}
}

const cedsSubNav = [
	linkItem('overview', 'Overview', '/ceds'),
	linkItem('gitbook', 'CEDS GitBook', 'https://cedstandards.gitbook.io/ceds-gitbook'),
	linkItem('github', 'GitHub assets', 'https://github.com/CEDStandards')
]

const cedsGithubAssetsCta = {
	_id: 'sharedCtaCedsGithubAssets',
	_type: 'sharedCta',
	title: 'CEDS GitHub assets CTA',
	type: 'generic',
	eyebrow: 'CEDS on GitHub',
	heading: 'Explore CEDS on GitHub',
	description:
		'Find the public CEDS repositories for elements, ontology, the Integrated Data Store, the Data Warehouse, Parquet models, and collaborative exchange resources.',
	background: 'teal',
	cta: {
		_type: 'cta',
		label: 'View CEDS on GitHub',
		href: 'https://github.com/CEDStandards',
		variant: 'gold'
	}
}

const cedsOverview = {
	_id: 'cedsOverview',
	_type: 'cedsOverview',
	slug: {
		_type: 'slug',
		current: 'ceds'
	},
	activeSection: 'CEDS',
	subNav: cedsSubNav,
	hero: {
		_type: 'heroContent',
		chip: 'CEDS',
		title: 'Common Education Data Standards',
		description:
			'CEDS is an open-source P-20W education data standard, vocabulary, model set, tooling ecosystem, and community for improving how education data is understood across sectors.',
		ctas: [
			{
				_key: 'open-gitbook',
				_type: 'cta',
				label: 'Open CEDS GitBook',
				href: 'https://cedstandards.gitbook.io/ceds-gitbook',
				variant: 'gold'
			},
			{
				_key: 'view-github-assets',
				_type: 'cta',
				label: 'View GitHub assets',
				href: 'https://github.com/CEDStandards',
				variant: 'outline'
			}
		]
	},
	overview: {
		_type: 'sectionHeader',
		eyebrow: 'Overview',
		heading: 'CEDS streamlines education data understanding',
		body: [
			paragraph(
				'overview-1',
				'CEDS is an education data management initiative whose purpose is to streamline the understanding of data within and across P-20W institutions and sectors.'
			),
			paragraph(
				'overview-2',
				'The initiative includes a common vocabulary, data models that reflect that vocabulary, tools to help education stakeholders understand and use education data, metadata from other education data initiatives, and a community of stakeholders who discuss the uses of CEDS and development of the standard.'
			),
			paragraph(
				'overview-3',
				'CEDS can be used by early learning providers, schools, postsecondary institutions, Local Education Agencies, State Education Agencies, and postsecondary coordinating or governing boards.'
			)
		]
	},
	reasons: [
		textBlock(
			'open-source',
			'Open-source standard',
			'CEDS is open-source, meaning the community drives the standard and helps build out the technology stack associated with it.'
		),
		textBlock(
			'free-resources',
			'Free to use',
			'The data standard and the CEDS technology stack are free resources. The standard is available through the CEDS GitBook and the technology stack is available through GitHub.'
		),
		textBlock(
			'interoperability',
			'Shared meaning across systems',
			'CEDS goes beyond local column names to provide valid, certifiable definitions. Local fields such as STUDENT_FIRST and FIRSTNAME can find each other through CEDS mapping.'
		)
	],
	dataModels: [
		textBlock(
			'domain-entity-schema',
			'Domain Entity Schema',
			'Primarily used for easy understanding of the standard.'
		),
		textBlock(
			'ontology',
			'Ontology',
			'Primarily used to demonstrate the relationship between elements in the standard.'
		),
		textBlock(
			'integrated-data-store',
			'Integrated Data Store',
			'Primarily used for transactional storage of data based on the standard.'
		),
		textBlock(
			'data-warehouse',
			'Data Warehouse',
			'Primarily used for longitudinal storage and efficient reporting.'
		)
	],
	learningLinks: [
		resourceCard(
			'gitbook',
			'Overview',
			'CEDS GitBook',
			'Read the overview content and documentation for the current CEDS standard.',
			'Open GitBook',
			'https://cedstandards.gitbook.io/ceds-gitbook',
			'gold'
		),
		resourceCard(
			'data-models',
			'Guide',
			'Data models',
			'Explore the CEDS model descriptions and links to additional model-specific information.',
			'Open data models',
			'https://cedstandards.gitbook.io/ceds-gitbook/data-models'
		),
		resourceCard(
			'webinars',
			'Learning',
			'Webinars',
			'Review webinars that explain how to use CEDS and the CEDS tools. Some older content may need updating as funding becomes available.',
			'Open webinars',
			'https://cedstandards.gitbook.io/ceds-gitbook/webinars'
		),
		resourceCard(
			'resources',
			'Library',
			'Resources',
			'Find CEDS reports, case studies, toolkits, research papers, and other materials for standards and community development.',
			'Open resources',
			'https://cedstandards.gitbook.io/ceds-gitbook/resources'
		)
	],
	community: {
		_type: 'sectionHeader',
		eyebrow: 'Open Source Community',
		heading: 'CEDS is governed by its community',
		body: [
			paragraph(
				'community-1',
				'The CEDS Community includes anyone interested in education data standards, including developers, program staff, federal, state, and local education staff, and researchers.'
			),
			paragraph(
				'community-2',
				'The standard is expanded and modified based on the needs and input of the Community. CEDS manages those needs and inputs through the Open Source Community on GitHub.'
			),
			paragraph(
				'community-3',
				'With the cancellation of support contracts, CEDS change requests and enhancements are not supported as they were. As funding and future plans are solidified, updates will be shared with the community. Data Standards United has submitted a proposal to house that work, and the Open Source Community has started a CEDS Sustainability Project staffed by State Education Agency leaders.'
			)
		]
	},
	exchange: {
		_type: 'sectionHeader',
		eyebrow: 'CEDS Collaborative Exchange',
		heading: 'A collaborative home for open-source CEDS resources',
		body: [
			paragraph(
				'exchange-1',
				'The CEDS Collaborative Exchange supports projects that require or benefit from collaboration with other projects. It gives contributors who build open-source resources using the CEDS data models a place to distribute and maintain those resources collaboratively.'
			),
			paragraph(
				'exchange-2',
				'DSU will coordinate between the Collaborative Exchange and the DSU Open Projects site, which also includes non-CEDS projects.'
			)
		]
	},
	ctas: [
		{
			_key: 'ceds-github-assets-cta',
			_type: 'reference',
			_ref: 'sharedCtaCedsGithubAssets'
		}
	]
}

function enableLinkByHref(links: unknown[], nextLink: ReturnType<typeof linkItem>) {
	const existing = Array.isArray(links) ? links : []
	let updated = false

	const enabledLinks = existing.map((link) => {
		if (typeof link !== 'object' || link === null || !('href' in link) || link.href !== nextLink.href) {
			return link
		}

		updated = true

		return {
			...link,
			_type: 'linkItem',
			label: nextLink.label,
			href: nextLink.href,
			disabled: false
		}
	})

	return updated ? enabledLinks : [...enabledLinks, nextLink]
}

const siteChrome = await client.getDocument<{
	primaryNav?: unknown[]
	footerColumns?: Array<{heading?: string; links?: unknown[]}>
}>('siteChrome')

await client.createOrReplace(cedsGithubAssetsCta)
await client.createOrReplace(cedsOverview)

if (siteChrome) {
	const primaryNav = enableLinkByHref(siteChrome.primaryNav ?? [], linkItem('ceds', 'CEDS', '/ceds'))
	const footerColumns = [...(siteChrome.footerColumns ?? [])]
	const cedsFooterLink = linkItem('ceds-overview', 'Overview', '/ceds')
	const cedsColumnIndex = footerColumns.findIndex((column) => column.heading === 'CEDS')

	if (cedsColumnIndex >= 0) {
		footerColumns[cedsColumnIndex] = {
			...footerColumns[cedsColumnIndex],
			links: enableLinkByHref(footerColumns[cedsColumnIndex].links ?? [], cedsFooterLink)
		}
	} else {
		footerColumns.push({
			_key: 'ceds',
			_type: 'footerColumn',
			heading: 'CEDS',
			links: [
				cedsFooterLink,
				linkItem('ceds-gitbook', 'CEDS GitBook', 'https://cedstandards.gitbook.io/ceds-gitbook'),
				linkItem('ceds-github', 'GitHub assets', 'https://github.com/CEDStandards')
			]
		})
	}

	await client.patch('siteChrome').set({primaryNav, footerColumns}).commit()
}

console.log('Seeded CEDS overview page.')
