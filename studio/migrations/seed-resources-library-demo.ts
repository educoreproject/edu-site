import {Readable} from 'node:stream'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})

type SanityLinkItem = {
	_key?: string
	_type?: 'linkItem'
	label?: string
	href?: string
	disabled?: boolean
}

async function findExistingResourcesLink(key: string) {
	const links = await client.fetch<SanityLinkItem[]>(
		`[
			...*[_id in ["resourcesHub", "resourcesLibrary", "resourcesPress", "resourcesNewsletter", "resourcesGlossary", "resourcesFaq"]].subNav[],
			...*[_id == "siteChrome"][0].footerColumns[heading == "Resources"][0].links[]
		]{
			_key,
			_type,
			label,
			href,
			disabled
		}`
	)

	return (
		links.find((link) => link._key === key && link.disabled === false) ??
		links.find((link) => link._key === key && /^https?:/.test(link.href ?? '')) ??
		links.find((link) => link._key === key)
	)
}

async function getResourcesSubNav() {
	const existingStandardsMatrix = await findExistingResourcesLink('standards-matrix')

	return [
		{_key: 'hub', _type: 'linkItem', label: 'Hub', href: '/resources'},
		{_key: 'library', _type: 'linkItem', label: 'Library', href: '/resources/library'},
		{_key: 'newsletter', _type: 'linkItem', label: 'Newsletter', href: '/resources/newsletter'},
		{_key: 'glossary', _type: 'linkItem', label: 'Glossary', href: '/resources/glossary'},
		{_key: 'faq', _type: 'linkItem', label: 'FAQ', href: '/resources/faq'},
		{
			_key: 'standards-matrix',
			_type: 'linkItem',
			label: existingStandardsMatrix?.label ?? 'EdMatrix',
			href: existingStandardsMatrix?.href ?? '/resources/standards-matrix',
			disabled: existingStandardsMatrix?.disabled ?? true
		},
		{_key: 'press-charter', _type: 'linkItem', label: 'Press & charter', href: '/resources/press'}
	]
}

const demoFiles = [
	{
		key: 'connected-data-standards',
		filename: 'demo-connected-data-standards.pdf',
		contentType: 'application/pdf',
		body: `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 91 >>
stream
BT /F1 18 Tf 72 720 Td (Demo white paper: Connected data standards) Tj 0 -32 Td (For page review only.) Tj ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
trailer
<< /Root 1 0 R >>
%%EOF`
	},
	{
		key: 'implementation-readiness',
		filename: 'demo-implementation-readiness.doc',
		contentType: 'application/msword',
		body: [
			'Demo report: Implementation readiness snapshot',
			'',
			'This lightweight demo document exists so the Resources library page can be reviewed with downloadable report content.'
		].join('\n')
	},
	{
		key: 'dsu-community-update',
		filename: 'demo-dsu-community-update.pdf',
		contentType: 'application/pdf',
		body: `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 87 >>
stream
BT /F1 18 Tf 72 720 Td (Demo press release: DSU community update) Tj 0 -32 Td (For page review only.) Tj ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
trailer
<< /Root 1 0 R >>
%%EOF`
	},
	{
		key: 'data-collaboration-charter',
		filename: 'demo-data-collaboration-charter.doc',
		contentType: 'application/msword',
		body: [
			'Demo charter: Data collaboration charter',
			'',
			'This lightweight demo document exists so the Press & charter page can be reviewed with downloadable charter content.'
		].join('\n')
	},
	{
		key: 'january-2026-newsletter',
		filename: 'demo-january-2026-newsletter.pdf',
		contentType: 'application/pdf',
		body: `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 83 >>
stream
BT /F1 18 Tf 72 720 Td (Demo newsletter: January 2026 update) Tj 0 -32 Td (For page review only.) Tj ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
trailer
<< /Root 1 0 R >>
%%EOF`
	},
	{
		key: 'december-2025-newsletter',
		filename: 'demo-december-2025-newsletter.doc',
		contentType: 'application/msword',
		body: [
			'Demo newsletter: December 2025 digest',
			'',
			'This lightweight demo document exists so the Newsletter archive page can be reviewed with older monthly content.'
		].join('\n')
	}
] as const

const demoItems = [
	{
		_key: 'demo-white-paper-connected-data-standards',
		_type: 'resourceDocument',
		category: 'White papers',
		title: 'Demo white paper: Connected data standards',
		documentType: 'PDF',
		description:
			'A short placeholder white paper for reviewing the library card layout, category filter, and download action.',
		fileKey: 'connected-data-standards'
	},
	{
		_key: 'demo-report-implementation-readiness',
		_type: 'resourceDocument',
		category: 'Reports',
		title: 'Demo report: Implementation readiness snapshot',
		documentType: 'Word doc',
		description:
			'A lightweight demo report for checking how Word documents appear alongside PDFs in the Resources library.',
		fileKey: 'implementation-readiness'
	}
] as const

const demoPressItems = [
	{
		_key: 'demo-press-release-dsu-community-update',
		_type: 'pressDocument',
		category: 'Press releases',
		title: 'Demo press release: DSU community update',
		documentType: 'PDF',
		description:
			'A short placeholder press release for reviewing the Press & charter page layout and download action.',
		fileKey: 'dsu-community-update'
	},
	{
		_key: 'demo-charter-data-collaboration',
		_type: 'pressDocument',
		category: 'Charters',
		title: 'Demo charter: Data collaboration charter',
		documentType: 'Word doc',
		description:
			'A lightweight demo charter for checking how charter documents appear alongside press releases.',
		fileKey: 'data-collaboration-charter'
	}
] as const

const demoNewsletterItems = [
	{
		_key: 'demo-newsletter-january-2026',
		_type: 'newsletterDocument',
		category: 'January 2026',
		title: 'Demo newsletter: January 2026 update',
		documentType: 'PDF',
		description:
			'A short placeholder newsletter for reviewing the archive month filter and download action.',
		fileKey: 'january-2026-newsletter'
	},
	{
		_key: 'demo-newsletter-december-2025',
		_type: 'newsletterDocument',
		category: 'December 2025',
		title: 'Demo newsletter: December 2025 digest',
		documentType: 'Word doc',
		description:
			'A lightweight demo newsletter for checking how previous months appear in the archive.',
		fileKey: 'december-2025-newsletter'
	}
] as const

const documentIds = ['resourcesHub', 'resourcesLibrary', 'resourcesPress', 'resourcesNewsletter', 'resourcesGlossary', 'resourcesFaq']

function toUploadStream(body: string) {
	return Readable.from([Buffer.from(body)])
}

const assets = new Map<string, string>()
const resourcesSubNav = await getResourcesSubNav()

async function getOrUploadAsset(file: (typeof demoFiles)[number]) {
	const existingAssetId = await client.fetch<string | null>(
		'*[_type == "sanity.fileAsset" && originalFilename == $filename][0]._id',
		{filename: file.filename}
	)

	if (existingAssetId) {
		return existingAssetId
	}

	const asset = await client.assets.upload('file', toUploadStream(file.body), {
		filename: file.filename,
		contentType: file.contentType
	})

	return asset._id
}

for (const file of demoFiles) {
	assets.set(file.key, await getOrUploadAsset(file))
}

await client.createIfNotExists({
	_id: 'resourcesLibrary',
	_type: 'resourcesLibrary',
	slug: {_type: 'slug', current: 'resources-library'},
	activeSection: 'Resources',
	subNav: resourcesSubNav,
	hero: {
		_type: 'heroContent',
		chip: 'Resources',
		title: 'White papers and reports',
		description:
			'Browse downloadable white papers and reports from Education Data Unlimited and the DSU community.'
	},
	categories: ['White papers', 'Reports'],
	items: [],
	ctas: []
})

await client
	.patch('resourcesLibrary')
	.set({
		activeSection: 'Resources',
		subNav: resourcesSubNav,
		hero: {
			_type: 'heroContent',
			chip: 'Resources',
			title: 'White papers and reports',
			description:
				'Browse downloadable white papers and reports from Education Data Unlimited and the DSU community.'
		},
		categories: ['White papers', 'Reports'],
		items: demoItems.map(({fileKey, ...item}) => ({
			...item,
			document: {
				_type: 'file',
				asset: {
					_type: 'reference',
					_ref: assets.get(fileKey)
				}
			}
		}))
	})
	.commit()

await client.createIfNotExists({
	_id: 'resourcesPress',
	_type: 'resourcesPress',
	slug: {_type: 'slug', current: 'resources-press'},
	activeSection: 'Resources',
	subNav: resourcesSubNav,
	hero: {
		_type: 'heroContent',
		chip: 'Resources',
		title: 'Press releases and charters',
		description:
			'Browse downloadable press releases and charter documents from Education Data Unlimited.'
	},
	categories: ['Press releases', 'Charters'],
	items: [],
	ctas: []
})

await client
	.patch('resourcesPress')
	.set({
		activeSection: 'Resources',
		subNav: resourcesSubNav,
		hero: {
			_type: 'heroContent',
			chip: 'Resources',
			title: 'Press releases and charters',
			description:
				'Browse downloadable press releases and charter documents from Education Data Unlimited.'
		},
		categories: ['Press releases', 'Charters'],
		items: demoPressItems.map(({fileKey, ...item}) => ({
			...item,
			document: {
				_type: 'file',
				asset: {
					_type: 'reference',
					_ref: assets.get(fileKey)
				}
			}
		}))
	})
	.commit()

await client.createIfNotExists({
	_id: 'resourcesNewsletter',
	_type: 'resourcesNewsletter',
	slug: {_type: 'slug', current: 'resources-newsletter'},
	activeSection: 'Resources',
	subNav: resourcesSubNav,
	hero: {
		_type: 'heroContent',
		chip: 'Resources',
		title: 'Newsletter archive',
		description:
			'Browse downloadable monthly newsletters from Education Data Unlimited and the DSU community.'
	},
	categories: ['January 2026', 'December 2025'],
	items: [],
	ctas: []
})

await client
	.patch('resourcesNewsletter')
	.set({
		activeSection: 'Resources',
		subNav: resourcesSubNav,
		hero: {
			_type: 'heroContent',
			chip: 'Resources',
			title: 'Newsletter archive',
			description:
				'Browse downloadable monthly newsletters from Education Data Unlimited and the DSU community.'
		},
		categories: ['January 2026', 'December 2025'],
		items: demoNewsletterItems.map(({fileKey, ...item}) => ({
			...item,
			document: {
				_type: 'file',
				asset: {
					_type: 'reference',
					_ref: assets.get(fileKey)
				}
			}
		}))
	})
	.commit()

for (const documentId of documentIds) {
	const document = await client.getDocument(documentId)

	if (!document) {
		continue
	}

	await client.patch(documentId).set({subNav: resourcesSubNav}).commit()
}

const siteChrome = await client.getDocument('siteChrome')

if (siteChrome?.footerColumns?.length) {
	await client
		.patch('siteChrome')
		.set({
			footerColumns: siteChrome.footerColumns.map((column: {_key?: string; heading?: string}) =>
				column.heading === 'Resources'
					? {
							...column,
							links: resourcesSubNav
						}
					: column
			)
		})
		.commit()
}

const resourcesHub = await client.getDocument('resourcesHub')
const standardsMatrixLink = resourcesSubNav.find((link) => link._key === 'standards-matrix')

if (resourcesHub?.cards?.length) {
	await client
		.patch('resourcesHub')
		.set({
			cards: resourcesHub.cards.map((card: {_key?: string; title?: string; cta?: {href?: string}}) =>
				card.title?.toLowerCase().includes('white papers') ||
				card.title?.toLowerCase().includes('reports')
					? {
							...card,
							cta: {
								...card.cta,
								href: '/resources/library'
							}
						}
					: card.title?.toLowerCase().includes('press') ||
						  card.title?.toLowerCase().includes('charter')
						? {
								...card,
								cta: {
									...card.cta,
									href: '/resources/press'
								}
							}
						: card.title?.toLowerCase().includes('newsletter')
							? {
									...card,
									cta: {
										...card.cta,
										href: '/resources/newsletter'
									}
								}
						: card.title?.toLowerCase().includes('standards matrix') ||
							  card.title?.toLowerCase().includes('edmatrix')
							? {
									...card,
									cta: {
										...card.cta,
										href: standardsMatrixLink?.href ?? card.cta?.href
									}
							}
					: card
			)
		})
		.commit()
}

console.log('Seeded Resources library, press, and newsletter demo content and updated Resources navigation.')
