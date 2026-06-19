import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})
const THUMBNAIL_BASE_URL = 'https://educoreproject.github.io/thumbnails/'

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

function paragraphWithStrong(key: string, before: string, strong: string, after: string) {
	return {
		_key: key,
		_type: 'block',
		style: 'normal',
		markDefs: [],
		children: [
			{
				_key: `${key}-before`,
				_type: 'span',
				text: before,
				marks: []
			},
			{
				_key: `${key}-strong`,
				_type: 'span',
				text: strong,
				marks: ['strong']
			},
			{
				_key: `${key}-after`,
				_type: 'span',
				text: after,
				marks: []
			}
		]
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

function cta(
	key: string,
	label: string,
	href: string,
	variant: 'primary' | 'outline' | 'teal' | 'gold' = 'gold'
) {
	return {
		_key: key,
		_type: 'cta',
		label,
		href,
		variant
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

function featureCard(key: string, icon: string, title: string, description: string) {
	return {
		_key: key,
		_type: 'educoreFeatureCard',
		icon,
		title,
		description
	}
}

async function remoteImage(thumbnailPath: string, filename: string, alt: string) {
	const existingAssetId = await client.fetch<string | null>(
		'*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id',
		{filename}
	)

	const thumbnailUrl = encodeURI(`${THUMBNAIL_BASE_URL}${thumbnailPath}`)
	const response = existingAssetId ? null : await fetch(thumbnailUrl)

	if (response && (!response.ok || !response.headers.get('content-type')?.startsWith('image/'))) {
		throw new Error(
			`Unable to fetch EDUcore thumbnail ${thumbnailUrl}: ${response.status} ${response.headers.get(
				'content-type'
			)}`
		)
	}

	const assetId =
		existingAssetId ??
		(
			await client.assets.upload('image', Buffer.from(await response!.arrayBuffer()), {
				filename,
				contentType: response!.headers.get('content-type') ?? 'image/jpeg'
			})
		)._id

	return {
		_type: 'image',
		asset: {
			_type: 'reference',
			_ref: assetId
		},
		alt
	}
}

async function demo(
	key: string,
	title: string,
	presenter: string,
	organization: string,
	description: string,
	thumbnailPath: string,
	filename: string,
	alt: string,
	videoUrl: string
) {
	return {
		_key: key,
		_type: 'educoreDemo',
		title,
		presenter,
		organization,
		description,
		thumbnailImage: await remoteImage(thumbnailPath, filename, alt),
		videoUrl,
		linkLabel: 'Watch on Drive'
	}
}

const educoreReferenceLibraryCta = {
	_id: 'sharedCtaEducoreReferenceLibrary',
	_type: 'sharedCta',
	title: 'EDUcore reference library CTA',
	type: 'generic',
	eyebrow: 'Reference Library',
	heading: 'Explore EDUcore use cases and standards resources',
	description:
		'Browse use cases, standards references, implementation notes, and AI-assisted discovery tools from the EDUcore project.',
	background: 'violet',
	cta: {
		_type: 'cta',
		label: 'Open reference library',
		href: 'https://educore.dev/explore/use-cases',
		variant: 'gold'
	}
}

const educoreOverview = {
	_id: 'educoreOverview',
	_type: 'educoreOverview',
	slug: {
		_type: 'slug',
		current: 'educore-overview'
	},
	activeSection: 'EDUcore',
	subNav: [
		linkItem('overview', 'Overview', '/educore'),
		linkItem('reference-library', 'Reference library', 'https://educore.dev/explore/use-cases'),
		linkItem('ai-bakeoff', 'AI Bakeoff', '/educore#bakeoff')
	],
	hero: {
		_type: 'heroContent',
		chip: 'EDUcore',
		title: 'Harmonizing Interoperability Specs for AI',
		description:
			'AI is reshaping education and workforce systems, but fragmented data standards hold the ecosystem back. EDUcore is building the shared semantic backbone that makes existing standards easier to understand, implement, and connect without replacing them.',
		ctas: [
			cta(
				'reference-library',
				'Explore reference library',
				'https://educore.dev/explore/use-cases',
				'gold'
			),
			cta('ai-bakeoff', 'View AI Bakeoff demos', '/educore#bakeoff', 'outline')
		]
	},
	useCasesHeader: {
		_type: 'sectionHeader',
		eyebrow: 'Use Cases',
		heading: 'Real-world scenarios driving EDUcore design and priorities'
	},
	useCases: [
		featureCard(
			'ai-integration',
			'robot',
			'AI Integration with Integrity',
			'Enable AI systems to work with education and workforce data using consistent, governed semantics, ensuring interoperable standards underpin AI-driven tools rather than proprietary data silos. A shared semantic backbone enables portable AI memory: learner context that travels with the individual across institutions, platforms, and life stages with full provenance and human oversight.'
		),
		featureCard(
			'adult-learner-ler',
			'school',
			'Adult Learner LER Assembly',
			'Help adult learners assemble a comprehensive Learning and Employment Record from fragmented sources, including community colleges, workforce programs, employer training, and professional certifications, into a single, portable, standards-based credential profile.'
		),
		featureCard(
			'accommodations-record-sharing',
			'lock',
			'Disability Accommodations-Aware Record Sharing',
			'Support the secure exchange of learner records that include disability accommodation information, with fine-grained privacy controls ensuring sensitive data is only shared with authorized parties on a need-to-know basis.'
		),
		featureCard(
			'small-district-reporting',
			'building-community',
			'Small District Reporting and Interoperability',
			'Enable small and rural districts to meet state and federal reporting requirements using existing systems. EDUcore provides standards-aligned mappings so districts can share and report data without adopting new platforms or infrastructure.'
		)
	],
	why: {
		_type: 'sectionHeader',
		eyebrow: 'Why EDUcore?',
		heading: 'Education runs on data, but interoperability standards are fragmented',
		body: [
			paragraph(
				'why-1',
				'Institutions need to exchange learner, program, credential, and outcomes data across systems, but the specifications behind those exchanges do not always map cleanly. EDUcore aligns existing standards into a shared semantic backbone so organizations can reduce duplicated integration work, preserve consistent meaning, and support governed AI use without replacing the systems they already depend on.'
			)
		]
	},
	workingTowardHeading: "What We're Working Toward",
	workingTowardItems: [
		textBlock(
			'semantic-backbone',
			'A common semantic backbone',
			'A baseline linked-data model (RDF/JSON-LD) grounded in the CEDS ontology and informed by credential transparency work, with governed extensions where gaps exist.'
		),
		textBlock(
			'use-case-mappings',
			'Use-case-driven mappings',
			'Cross-sector use cases with the highest-value standards mapped to the baseline model. Crosswalks are explicit, versioned, and auditable so AI tools can assist implementation without inventing meaning.'
		),
		textBlock(
			'reference-library',
			'A practical reference library',
			'Searchable and structured for implementers: canonical definitions, mappings, implementation notes, openness status, and governance metadata. EDUcore lowers adoption costs for under-resourced districts, colleges, workforce boards, and employers.'
		),
		textBlock(
			'safe-enablement',
			'Future-proofed, safe-by-design enablement',
			'Architecture that supports modern AI workflows while embedding guardrails for privacy, provenance, auditability, and human oversight in high-stakes contexts. Targeted universalism: universal interoperability outcomes with targeted adoption pathways.'
		)
	],
	phaseOneHeader: {
		_type: 'sectionHeader',
		eyebrow: 'Phase 1 Deliverables',
		heading: 'Targeted outputs for the initial project phase'
	},
	phaseOneDeliverables: [
		textBlock(
			'outreach-partnerships',
			'Outreach and Partnerships',
			'Stakeholder letters, signatories, and engagement with standards bodies and technology partners.'
		),
		textBlock(
			'advisory-council',
			'Advisory Council',
			'Vertical-specific demos followed by business alignment sessions with stakeholder leadership.'
		),
		textBlock(
			'reference-library',
			'Reference Library',
			"User's guide, stakeholder registry, use case registry, resource catalog, and standards registry."
		),
		textBlock(
			'ceds-ontology-rdf',
			'CEDS Ontology and RDF',
			'RDF foundation with mappings to all specifications, starting with CEDS and SIF, the Special Education Data Model (SEDM), and other high-impact areas.'
		)
	],
	standardsAlignment: {
		_type: 'sectionHeader',
		eyebrow: 'Standards Alignment',
		heading: 'EDUcore seeks alignment with leading education data standards and initiatives',
		body: [
			paragraphWithStrong(
				'standards-alignment-1',
				"EDUcore's mission is to establish an ",
				'AI-ready "source of truth" for interoperability',
				' built by aligning existing standards rather than replacing them. Through active participation from standards bodies, combined resources, and a broad coalition of stakeholders, EDUcore provides a shared semantic backbone and a practical mapping layer so organizations can continue using current systems while achieving consistent, governed interoperability.'
			),
			paragraph(
				'standards-alignment-2',
				'We are not creating one new standard to rule them all. We are building shared infrastructure that makes the standards already in use easier to understand, implement, and connect across the PK20W+ ecosystem: lifelong learning ranging from early childhood through workforce.'
			)
		]
	},
	aiBakeoffHeader: {
		_type: 'sectionHeader',
		eyebrow: 'EDUcore AI Bakeoff',
		heading: 'Community demonstrations built on education data standards',
		body: [
			paragraph(
				'ai-bakeoff-intro',
				'Community demonstrations showcasing AI-powered tools built on education data standards.'
			)
		]
	},
	aiBakeoffDemos: [
		await demo(
			'reference-library-ai-search',
			'EDUcore Reference Library and AI Search',
			'Brandon Dorman',
			'',
			'Demonstrates the EDUcore Reference Library with an AI-powered search engine grounded in a CEDS-based RDF/JSON-LD ontology. Users can query natural-language questions and receive standards-aligned implementation roadmaps. Also features a Needs Explorer for tag-based spec discovery without AI.',
			'1 - Brandon - Exploring the EduCore Reference Library and AI Search Features \u{1F4DA}.jpg',
			'educore-reference-library-ai-search.jpg',
			'EDUcore Reference Library demo',
			'https://drive.google.com/file/d/1mLKKuhzBl3BdV67DMMqmYvkU9xKMaVF3/view?usp=drive_link'
		),
		await demo(
			'skill-nexus-ai',
			'Skill Nexus AI',
			'Robert Bajor',
			'Micro Credential Multiverse',
			'AI-driven labor market intelligence tool covering 1,016 O*NET occupations. Provides three tailored views: job seekers get portfolio guidance and AI-disruption exposure; hiring managers get assessment rubrics and 30/60/90-day plans; education providers get curriculum alignment and capstone ideas.',
			'2 - Robert Bajor - 5 Minute Skill Nexus AI Demo - microcredential multiverse.jpg',
			'skill-nexus-ai-demo.jpg',
			'Skill Nexus AI demo',
			'https://drive.google.com/file/d/1DoXBwQvCg6Ekk2BH_iNqB7O5jIUf0n1F/view?usp=drive_link'
		),
		await demo(
			'ceds-mcp-equity-gap',
			'CEDS-MCP: AI-Driven Equity Gap Analysis',
			'Jackson Smith',
			'Learning Economy Foundation',
			'An MCP server that connects Claude directly to a CEDS database, letting AI autonomously discover schemas, identify populated tables, and write analytical SQL. Demonstrated on a 50,000-student synthetic dataset, the tool surfaces equity gaps in assessment proficiency across racial and income groups.',
			'3 - Jackson Smith - LEF_s CEDS-MCP Tool_ Exploring Equity Gaps in Education with AI-Driven Data Analysis.jpg',
			'ceds-mcp-equity-gap-analysis.jpg',
			'CEDS MCP Tool demo',
			'https://drive.google.com/file/d/1FSh0PeW9YJw7XypU_fGbbKeKkCz4HO9Z/view?usp=drive_link'
		),
		await demo(
			'ksaworks-goldcheck',
			'KSAWorks GoldCheck',
			'David Moldoff',
			'Academy One',
			"Shows how EDUcore's semantic backbone transforms static transcripts into actionable, linked data. GoldCheck is a free AI-enabled tool that plugs into institutional web catalogs, revealing transfer credit pathways, remaining coursework, and competency mappings.",
			'4 - David M - Big Vid - KSAWorks Goldcheck.jpg',
			'ksaworks-goldcheck.jpg',
			'KSAWorks GoldCheck demo',
			'https://drive.google.com/file/d/152Jj07PxSrsK8BIA_pgEBO4UoZB2gUIf/view?usp=drive_link'
		),
		await demo(
			'ksaworks-transcript-selfie',
			'KSAWorks: From Transcript to Selfie',
			'David Moldoff',
			'Academy One',
			'A real implementation of EDUcore concepts showing how RDF endpoints and CEDS mapping turn static academic records into living competency profiles. Courses map to CIP codes, then to knowledge, skills, and abilities via SOC classifications, creating a continuous thread from learning to career.',
			'David M - EDUCORE KSWORKS-P.jpg',
			'ksaworks-transcript-to-selfie.jpg',
			'KSAWorks Selfie demo',
			'https://drive.google.com/file/d/152Jj07PxSrsK8BIA_pgEBO4UoZB2gUIf/view?usp=drive_link'
		),
		await demo(
			'access-4-learning',
			'A4L (Access 4 Learning)',
			'John Lovell',
			'',
			"A visual presentation on Access 4 Learning's role in the EDUcore ecosystem, highlighting how A4L's data standards and community efforts connect with the broader initiative to improve education data interoperability.",
			'John Lovell - A4L.jpg',
			'access-4-learning-demo.jpg',
			'A4L demo',
			'https://drive.google.com/file/d/1CsDI_fF9ESHI9KNtWOYey_kOGd5OuQgN/view?usp=drive_link'
		),
		await demo(
			'multi-standard-data-model-explorer',
			'Multi-Standard Data Model Explorer',
			'TQ White II',
			'',
			'Live knowledge graph integrating nine education and workforce data standards at full field depth: CEDS, SIF, Ed-Fi, PESC, CTDL, SEDM, JEDx, EdMatrix, and CIP, with cross-standard mappings anchored to CEDS throughout. Features tree-based data model navigation, AI-powered cross-standard mapping, natural-language search, and visual graph diagrams. The implementation includes SEDM, linking IDEA special education data to the broader PK20W interoperability stack.',
			'TQ_WHITE_II - AI_BAKEOFF.jpg',
			'multi-standard-data-model-explorer.jpg',
			'Data Model Explorer demo',
			'https://drive.google.com/file/d/1wl_vVaAmUo-cn6WWahFTwH48SSsqJzvW/view?usp=drive_link'
		),
		await demo(
			'ceds-assessment-ontology-query',
			'CEDS Assessment Ontology Query',
			'Vince Paredes',
			'',
			'A one-take ChatGPT session demonstrating how AI can read the CEDS assessment ontology web page, construct SPARQL queries, locate the official RDF file on GitHub, and execute queries against real data.',
			'Vince Paredes - CEDS Assessment Query.jpg',
			'ceds-assessment-ontology-query.jpg',
			'CEDS Assessment Query demo',
			'https://drive.google.com/file/d/1xI6b6K-06SBUxXmX-tM3CATkh1mJWVqW/view?usp=drive_link'
		)
	],
	ctas: [
		{
			_key: 'educore-reference-library-cta',
			_type: 'reference',
			_ref: 'sharedCtaEducoreReferenceLibrary'
		}
	]
}

await client.createOrReplace(educoreReferenceLibraryCta)
await client.createOrReplace(educoreOverview)
await client.createOrReplace({
	...educoreOverview,
	_id: 'drafts.educoreOverview'
})

console.log('Seeded EDUcore overview page.')
