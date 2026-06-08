import type {
	DsuHomePage,
	DsuJoinPage,
	DsuMembersPage,
	DsuProjectsPage,
	EduBoardPage,
	EduContactPage,
	EduHistoryPage,
	EduOverviewPage,
	EducoreOverviewPage,
	EventsPastPage,
	EventsUpcomingPage,
	LinkItem,
	ResourcesFaqPage,
	ResourcesGlossaryPage,
	ResourcesHubPage,
	SiteChrome
} from './types';

const fallbackDsuSubNav = [
	{ label: 'Home', href: '/' },
	{ label: 'Members', href: '/dsu/members' },
	{ label: 'Joining DSU', href: '/dsu/joining' },
	{ label: 'Projects', href: '/dsu/projects' }
] satisfies LinkItem[];

const fallbackEduSubNav = [
	{ label: 'Overview', href: '/edu' },
	{ label: 'Board', href: '/edu/board' },
	{ label: 'History', href: '/edu/history' },
	{ label: 'Contact', href: '/edu/contact' }
] satisfies LinkItem[];

const fallbackResourcesSubNav = [
	{ label: 'Library', href: '/resources' },
	{ label: 'Newsletter', href: '/resources#newsletter' },
	{ label: 'Glossary', href: '/resources/glossary' },
	{ label: 'FAQ', href: '/resources/faq' },
	{ label: 'Standards matrix', href: '/resources/standards-matrix', disabled: true },
	{ label: 'Press & charter', href: '/resources/press-charter', disabled: true }
] satisfies LinkItem[];

const fallbackEventsSubNav = [
	{ label: 'Upcoming', href: '/events' },
	{ label: 'Past events', href: '/events/past' }
] satisfies LinkItem[];

const fallbackEducoreSubNav = [
	{ label: 'Overview', href: '/educore' },
	{ label: 'Reference Library', href: '/educore/reference-library', disabled: true },
	{ label: 'Graphinator', href: '/educore/graphinator', disabled: true },
	{ label: 'Standards Partner', href: '/educore/standards-partner', disabled: true },
	{ label: 'Prospectus', href: '/educore/prospectus', disabled: true }
] satisfies LinkItem[];

export const fallbackChrome = {
	primaryNav: [
		{ label: 'DSU', href: '/' },
		{ label: 'About EDU', href: '/edu' },
		{ label: 'CEDS', href: '/ceds', disabled: true },
		{ label: 'EDUcore', href: '/educore' },
		{ label: 'Resources', href: '/resources' },
		{ label: 'Events', href: '/events' },
		{ label: 'Contact', href: '/edu/contact' }
	],
	footerColumns: [
		{
			heading: 'DSU',
			links: [
				{ label: 'Overview', href: '/' },
				{ label: 'Signatory members', href: '/dsu/members' },
				{ label: 'Affiliate members', href: '/dsu/members' },
				{ label: 'Joining DSU', href: '/dsu/joining' },
				{ label: 'Projects', href: '/dsu/projects' }
			]
		},
		{
			heading: 'EDU',
			links: [
				{ label: 'Board', href: '/edu/board' },
				{ label: 'History', href: '/edu/history' },
				{ label: 'Contact', href: '/edu/contact' }
			]
		},
		{
			heading: 'CEDS',
			links: [
				{ label: 'CEDS sustainability', href: '/ceds/sustainability', disabled: true },
				{ label: 'A4L Unity project', href: '/ceds/a4l-unity-project', disabled: true },
				{ label: 'Tiger Team', href: '/ceds/tiger-team', disabled: true },
				{ label: 'CEDS-SEDM', href: '/ceds/ceds-sedm', disabled: true }
			]
		},
		{
			heading: 'EDUcore',
			links: [
				{ label: 'Project prospectus', href: '/educore/prospectus' },
				{ label: 'Reference library', href: '/educore/reference-library' },
				{ label: 'Graphinator', href: '/educore/graphinator' },
				{ label: 'Standards partner', href: '/educore/standards-partner' }
			]
		},
		{
			heading: 'Resources',
			links: [
				{ label: 'White papers', href: '/resources/white-papers' },
				{ label: 'Glossary', href: '/resources/glossary' },
				{ label: 'FAQ', href: '/resources/faq' },
				{ label: 'Standards matrix', href: '/resources/standards-matrix' },
				{ label: 'Press & charter', href: '/resources/press-charter' }
			]
		},
		{
			heading: 'Events',
			links: [
				{ label: 'Calendar', href: '/events' },
				{ label: 'Past events', href: '/events/past' }
			]
		}
	]
} satisfies SiteChrome;

export const fallbackDsuHome = {
	slug: 'dsu-home',
	activeSection: 'DSU',
	subNav: fallbackDsuSubNav,
	hero: {
		chip: 'DATA STANDARDS UNITED',
		title: 'The coordinating body for global education data standards.',
		description:
			'DSU is a standards collaborative operating on the principle that education, employment, and training data must speak the same language - openly, transparently, and across institutional boundaries.',
		ctas: [
			{ label: 'Become a member', href: '/dsu/joining', variant: 'primary' },
			{ label: 'View our projects', href: '/dsu/projects', variant: 'outline' }
		]
	},
	pillars: [
		{
			label: 'Our Charter',
			text: 'Establish a "common ground" mechanism to coordinate and align disparate global data standards while respecting each organization\'s independence across systems, platforms, networks, sectors, and industries - produced or supported by the respective standards bodies.'
		},
		{
			label: 'Our Vision',
			text: 'Collaborate and align standards to support the global education and workforce digital ecosystem.'
		},
		{
			label: 'Our Mission',
			text: 'Establish a sustainable collaborative of Data Standards Development Organizations (SDOs) and their stakeholders across education, employment, and training sectors.'
		}
	],
	values: [
		{
			number: '1',
			title: 'Free Access',
			description:
				'Open, barrier-free access to data standards for all organizations and institutions, regardless of size or resources.'
		},
		{
			number: '2',
			title: 'Transparent Process',
			description:
				'Voluntary, consensus-based standards development, approval, and maintenance - visible and accountable to all members.'
		},
		{
			number: '3',
			title: 'Public Commitment',
			description:
				'Active public support of the Data Standards United collaborative and lifelong learning and employment standards.'
		}
	],
	initiative: {
		heading: 'Data Standards United for Lifelong Learning and Employment',
		items: [
			'Support a seamless, lifelong learning infrastructure and sustainable standards.',
			'Provide an open forum for emerging and innovative technologies and business applications wishing to work within a standards environment.',
			'Promote existing standards-based solutions while not disrupting current investments in technology and systems.',
			'Foster an understanding of each stakeholder\'s role across education, employment, and training sectors.'
		]
	},
	voices: [
		{
			quote:
				'By embracing our unique strengths and differences, DSU will enable us to create and evolve a roadmap for a more harmonious journey of growth, innovation and progress - as we leverage the past, serve the now and steer toward a better future together.',
			name: 'David K Moldoff',
			organization: 'CEO and Founder, AcademyOne, Inc.'
		},
		{
			quote:
				'The time for data standards bodies to work together to support lifelong learning PK20W+ is long overdue. Through open collaboration and sharing we can all work towards a world where data is seamlessly shared appropriately while ensuring privacy, security and learner agency.',
			name: 'Steve Smith',
			organization: 'Executive Director, Access 4 Learning'
		},
		{
			quote:
				'Innovation thrives on collaboration. Data Standards United brings standards organizations together, creating a fertile ground to craft a future where skills and opportunities connect effortlessly.',
			name: 'Jim Ireland',
			organization: 'Executive Director, HR Open Standards'
		}
	]
} satisfies DsuHomePage;

export const fallbackDsuMembers = {
	slug: 'dsu-members',
	activeSection: 'DSU',
	subNav: fallbackDsuSubNav,
	hero: {
		chip: 'DATA STANDARDS UNITED',
		title: 'Our members.'
	},
	videos: [
		{
			name: 'Jason Tyszko',
			title: 'Sr. Vice President',
			organization: 'US Chamber of Commerce Foundation',
			provider: 'Vimeo'
		},
		{
			name: 'Nancy Copa',
			title: 'CEDS Project Director',
			organization: 'Education Data Unlimited',
			provider: 'Vimeo'
		},
		{
			name: 'Duane Brown',
			title: 'Senior Business Analyst',
			organization: 'AEM Education Data Standards',
			provider: 'Vimeo'
		}
	],
	signatoryMembers: [
		{
			name: 'Access 4 Learning (A4L)',
			url: 'a4l.org',
			logoLabel: 'A4L',
			logoColor: '#002B70'
		},
		{
			name: 'Dublin Core Metadata Initiative (DCMI)',
			url: 'dublincore.org',
			logoLabel: 'DCMI',
			logoColor: '#002B70'
		},
		{
			name: 'HR Open Standards Consortium',
			url: 'hropenstandards.org',
			logoLabel: 'HR',
			logoColor: '#002B70'
		},
		{
			name: 'IMS Global Learning Consortium',
			url: 'imsglobal.org',
			logoLabel: 'IMS',
			logoColor: '#002B70'
		},
		{
			name: 'Medbiquitous',
			url: 'medbiq.org',
			logoLabel: 'MED',
			logoColor: '#002B70'
		},
		{
			name: 'Postsecondary Electronic Standards Council (PESC)',
			url: 'pesc.org',
			logoLabel: 'PESC',
			logoColor: '#002B70'
		},
		{
			name: 'Credential Engine',
			url: 'credentialengine.org',
			logoLabel: 'CE',
			logoColor: '#002B70'
		},
		{
			name: 'Ed3',
			url: 'ed3.org',
			logoLabel: 'ED3',
			logoColor: '#002B70'
		},
		{
			name: 'Groningen Declaration Network',
			url: 'groningendeclaration.org',
			logoLabel: 'GDN',
			logoColor: '#002B70'
		}
	],
	affiliateMembers: [
		{
			name: 'Advanced Digital Learning (ADL) Initiative',
			url: 'adlnet.gov',
			logoLabel: 'ADL',
			logoColor: '#5b3fb8'
		},
		{
			name: 'Common Education Data Standards (CEDS)',
			url: 'ceds.ed.gov',
			logoLabel: 'CEDS',
			logoColor: '#5b3fb8'
		},
		{
			name: 'IEEE Learning Technology Standards Committee (LTSC)',
			url: 'ieee.org',
			logoLabel: 'IEEE',
			logoColor: '#5b3fb8'
		},
		{
			name: 'Loop Data',
			url: 'loopdataservices.com',
			logoLabel: 'LOOP',
			logoColor: '#5b3fb8'
		}
	],
	affiliateIntro:
		"Affiliate members support DSU's mission in an advisory capacity - typically organizations that are not standards development bodies, or whose governance does not allow full signatory commitment.",
	joinCta: {
		heading: 'Ready to join the collaborative?',
		description:
			'DSU membership is open to all SDOs and stakeholders committed to open, interoperable education data standards.',
		cta: {
			label: 'View joining information',
			href: '/dsu/joining',
			variant: 'primary'
		}
	}
} satisfies DsuMembersPage;

export const fallbackDsuJoin = {
	slug: 'dsu-joining',
	activeSection: 'DSU',
	subNav: fallbackDsuSubNav,
	hero: {
		chip: 'DATA STANDARDS UNITED',
		title: 'Joining DSU',
		description:
			'We welcome participation from everyone. DSU is committed to building a global community dedicated to free, open standards that support lifelong learning, interoperability, and portability.'
	},
	membershipTypes: [
		{
			kind: 'Signatory Member',
			kindColor: '#00797A',
			title: 'Full organizational commitment',
			description:
				"For Standards Development Organizations and data standards bodies. Signatory members formally commit their organization to DSU's core values and actively participate in shaping the collaborative's direction.",
			bullets: [
				'Vote on DSU initiatives and governance',
				'Co-lead working groups and projects',
				'Listed as a signatory member organization',
				'Full participation in all meetings and events'
			],
			cta: {
				label: 'Download signatory agreement PDF',
				href: '#',
				variant: 'teal'
			},
			featured: true
		},
		{
			kind: 'Affiliate Member',
			kindColor: '#002B70',
			title: 'Advisory participation',
			description:
				"For organizations that support DSU's mission but are not standards development bodies, or whose governance doesn't allow full organizational commitment. Affiliate members participate in an advisory capacity.",
			bullets: [
				'Participate in working groups and discussions',
				'Attend all DSU meetings and events',
				'Listed as an affiliate supporter',
				'Advisory voice in DSU initiatives'
			],
			cta: {
				label: 'Download affiliate agreement PDF',
				href: '#',
				variant: 'outline'
			}
		}
	],
	process: {
		eyebrow: 'Process',
		heading: 'How to join',
		steps: [
			{
				title: 'Choose your membership type',
				description:
					"Signatory membership is for standards development organizations. Affiliate membership is for other stakeholders or organizations whose governance doesn't permit full signatory commitment. Both are equally welcome."
			},
			{
				title: 'Download the agreement',
				description:
					"Each membership type has its own agreement PDF. Download the one that fits your organization's situation - both can be signed digitally."
			},
			{
				title: 'Sign and submit',
				description:
					"Complete the agreement and send it to alex@bardicsystems.com along with your organization's logo and a brief note on why you're joining DSU."
			},
			{
				title: 'Welcome to DSU',
				description:
					'The DSU team will confirm receipt, add your organization to the member directory, and connect you with upcoming working groups and meetings.'
			}
		]
	},
	contact: {
		eyebrow: 'Questions?',
		heading: 'Get in touch',
		description:
			"Not sure which membership type is right for your organization? Reach out and we'll help you figure it out.",
		email: 'alex@bardicsystems.com'
	},
	submissionChecklist: {
		heading: 'When submitting your agreement, please include:',
		items: [
			'Your completed and signed agreement PDF',
			"Your organization's logo (PNG or SVG preferred)",
			'A brief note on why your organization is joining DSU',
			'A contact name and email for follow-up'
		]
	}
} satisfies DsuJoinPage;

export const fallbackDsuProjects = {
	slug: 'dsu-projects',
	activeSection: 'DSU',
	subNav: fallbackDsuSubNav,
	hero: {
		chip: 'DATA STANDARDS UNITED',
		title: 'DSU supported projects',
		description:
			'Active working groups and initiatives across the DSU network - coordinating the technical, governance, and alignment work that makes standards interoperability real.'
	},
	projects: [
		{
			tag: 'A4L Unity',
			title: 'Personal Privacy Balance',
			category: 'Working Group · Free & Open',
			href: '#',
			logoLabel: 'UNITY',
			logoColor: '#002B70'
		},
		{
			tag: 'A4L Unity',
			title: 'JSON-LD Transcript',
			category: 'Development Workgroup · Free & Open',
			href: '#',
			logoLabel: 'UNITY',
			logoColor: '#002B70'
		},
		{
			tag: 'A4L Unity',
			title: 'Gender Identity',
			category: 'Task Force · Free & Open',
			href: '#',
			logoLabel: 'UNITY',
			logoColor: '#002B70'
		},
		{
			tag: 'CEDS',
			title: 'CEDS Sustainability',
			category: 'Stewardship · Active',
			href: '#',
			logoLabel: 'UNITY',
			logoColor: '#002B70'
		},
		{
			tag: 'CEDS',
			title: 'A4L Unity CEDS Project',
			category: 'Alignment · Active',
			href: '#',
			logoLabel: 'UNITY',
			logoColor: '#002B70'
		},
		{
			tag: 'CEDS',
			title: 'CEDS-SEDM',
			category: 'State Adoption · Active',
			href: '#',
			logoLabel: 'UNITY',
			logoColor: '#002B70'
		}
	],
	joinCta: {
		heading: 'Ready to join the collaborative?',
		description:
			'DSU membership is open to all SDOs and stakeholders committed to open, interoperable education data standards.',
		cta: {
			label: 'View joining information',
			href: '/dsu/joining',
			variant: 'primary'
		}
	}
} satisfies DsuProjectsPage;

const fallbackNewsletterBand = {
	heading: 'Stay connected to the standards community',
	description:
		'Monthly updates on DSU activities, CEDS developments, EDUcore progress, and upcoming events.',
	emailPlaceholder: 'Email address',
	ctaLabel: 'Sign up',
	note: 'We will only send standards community updates.'
};

const fallbackUpcomingEvents = [
	{
		poster: '2026 1EdTech Learning Impact Conference',
		tag: 'DSU',
		date: 'June 1st - 3rd, 2026',
		title: '2026 1EdTech Learning Impact Conference',
		description:
			"Join us at 1EdTech's premier event, the Learning Impact Conference, where global education and technology leaders unite to drive innovation, champion interoperability, and shape the future of teaching and learning.",
		href: '#'
	},
	{
		poster: 'DSU Annual Convening 2026',
		tag: 'DSU',
		date: 'July 15 - 17, 2026',
		title: 'DSU Annual Convening 2026',
		description:
			'The yearly gathering of DSU signatory and affiliate members - working sessions on CEDS sustainability, the A4L Unity project, and the EDUcore roadmap.',
		href: '#'
	},
	{
		poster: 'EDUcore Open Beta Launch',
		tag: 'EDUcore',
		date: 'September 2026',
		title: 'EDUcore Open Beta Launch',
		description:
			'The reference library, Graphinator, and Standards Partner tools open to the wider standards community - with live demos and an onboarding workshop.',
		href: '#'
	}
];

const fallbackPastConferenceEvent = {
	poster: '2026 1EdTech Learning Impact Conference',
	tag: 'DSU',
	date: 'June 1st - 3rd, 2026',
	title: '2026 1EdTech Learning Impact Conference',
	description:
		"Join us at 1EdTech's premier event, the Learning Impact Conference, where global education and technology leaders unite to drive innovation, champion interoperability, and shape the future of teaching and learning.",
	href: '#'
};

export const fallbackResourcesHub = {
	slug: 'resources-library',
	activeSection: 'Resources',
	subNav: fallbackResourcesSubNav,
	hero: {
		chip: 'RESOURCES',
		title: 'Resource library',
		description:
			'White papers, newsletters, glossaries, and governance documents from Education Data Unlimited and the DSU community.'
	},
	eyebrow: 'Browse by type',
	heading: 'All resources',
	cards: [
		{
			meta: '12 documents',
			title: 'White Papers & Reports',
			description:
				'Peer-reviewed research, policy briefs, and technical reports from the EDU and DSU communities.',
			cta: {
				label: 'Browse white papers',
				href: '#',
				variant: 'outline'
			}
		},
		{
			meta: 'Current + archive',
			title: 'Newsletter',
			description:
				'Monthly updates on DSU activities, CEDS developments, EDUcore progress, and upcoming events.',
			cta: {
				label: 'View newsletter',
				href: '#newsletter',
				variant: 'outline'
			}
		},
		{
			meta: '200+ terms',
			title: 'Glossary',
			description:
				'Authoritative definitions for education data standards terminology - drawn from CEDS and DSU member organizations.',
			cta: {
				label: 'Browse glossary',
				href: '/resources/glossary',
				variant: 'outline'
			}
		},
		{
			meta: '30+ questions',
			title: 'FAQ',
			description:
				'Answers to the most common questions about EDU, DSU, CEDS, and the EDUcore platform.',
			cta: {
				label: 'View FAQ',
				href: '/resources/faq',
				variant: 'outline'
			}
		},
		{
			meta: 'External resource',
			title: 'Standards Matrix',
			description:
				'The EdMatrix - a comprehensive crosswalk of education data standards by domain, sector, and organization.',
			cta: {
				label: 'Open EdMatrix',
				href: '#',
				variant: 'outline'
			}
		},
		{
			meta: 'Charter + releases',
			title: 'Press & Charter',
			description:
				'Press releases, the DSU charter document, and organizational governance materials.',
			cta: {
				label: 'View documents',
				href: '#',
				variant: 'outline'
			}
		}
	],
	newsletter: {
		...fallbackNewsletterBand,
		background: 'navy'
	}
} satisfies ResourcesHubPage;

export const fallbackResourcesGlossary = {
	slug: 'resources-glossary',
	activeSection: 'Resources',
	subNav: fallbackResourcesSubNav,
	hero: {
		chip: 'RESOURCES',
		title: 'Glossary'
	},
	categories: ['All terms', 'Education', 'Skills/Talent/Workforce', 'Technology'],
	terms: [
		{
			term: '504 Plan',
			definition:
				'A plan developed to ensure a student with a disability receives accommodations under Section 504 of the Rehabilitation Act.',
			category: 'Education'
		},
		{
			term: 'AACRAO',
			definition:
				'American Association of Collegiate Registrars and Admissions Officers - a DSU signatory member organization.',
			category: 'Education'
		},
		{
			term: 'A4L',
			definition:
				'Access 4 Learning Community - a non-profit that manages the SIF data standard for K-12 interoperability.',
			category: 'Technology'
		},
		{
			term: 'CEDS',
			definition:
				'Common Education Data Standards - a national, voluntary effort to standardize key education data elements.',
			category: 'Education'
		},
		{
			term: 'Credential Engine',
			definition:
				'An organization maintaining the Credential Transparency Description Language (CTDL) registry.',
			category: 'Skills/Talent/Workforce'
		},
		{
			term: 'Interoperability',
			definition:
				'The ability of different information systems to exchange data and use the information that has been exchanged.',
			category: 'Technology'
		},
		{
			term: 'LER',
			definition:
				"Learning and Employment Record - a digital record of an individual's learning and work history across providers.",
			category: 'Skills/Talent/Workforce'
		},
		{
			term: 'Ontology',
			definition:
				'A formal specification of the concepts and relationships within a domain - the backbone of harmonized standards.',
			category: 'Technology'
		},
		{
			term: 'PESC',
			definition:
				'Postsecondary Electronic Standards Council - a DSU signatory maintaining standards for postsecondary data exchange.',
			category: 'Education'
		},
		{
			term: 'SEDM',
			definition:
				'Special Education Data Management - a cross-standard model for special education data across PK20W+ environments.',
			category: 'Education'
		},
		{
			term: 'SIF',
			definition:
				"Schools Interoperability Framework - A4L's data model and integration specification for education software.",
			category: 'Technology'
		}
	],
	newsletter: {
		...fallbackNewsletterBand,
		background: 'teal'
	}
} satisfies ResourcesGlossaryPage;

export const fallbackResourcesFaq = {
	slug: 'resources-faq',
	activeSection: 'Resources',
	subNav: fallbackResourcesSubNav,
	hero: {
		chip: 'RESOURCES',
		title: 'Frequently asked questions'
	},
	categories: ['About DSU', 'About EDU', 'About EDUcore'],
	items: [
		{
			question: 'Ontological Modeling (including Person, Organizations and Events)',
			answer:
				'A project to support the work to create core data objects needed by most education applications and services in almost all horizontals and verticals. This work is in partnership with the CEDS and CTDL work and includes cross-standard cooperation with all the DSU standards.'
		},
		{
			question: 'Special Education Data Management (SEDM) and IDEA Compliance',
			answer:
				'A cross-standard (CEDS, A4L, and ed-fi) effort to create a universal special education data model that can be used in any PK20W+ environment.'
		},
		{
			question: 'P20W+ Learning and Employment Record (LER) Management',
			answer:
				'A project to harmonize all the efforts to create and define the LER - including the work being done in IEEE, HROS, T3, ADL, CEDS, 1EdTech, PESC, W3C, the INFUSE project, and many vendors in the wallet, credential, and employment space.'
		},
		{
			question: 'Standards Library',
			answer:
				'A web site and reference application that contains linked data to all the standards people need for the ecosystem regardless of who publishes them. It provides smart navigation, best practices, and links to useful reference implementations all under one roof.'
		},
		{
			question: 'Working with the Open Source Community (OSC) to create a sustainable home for CEDS',
			answer:
				'Setting up all the resources needed to sustain CEDS - available and either primarily housed or duplicated in an open location in case the ceds.ed.gov site goes down.'
		},
		{
			question: 'Structuring for Data Analytics and AI',
			answer:
				'Standardizing the way data needs to be stored, presented, and accessed so it is optimized to support the use of AI and analytics, and standardizing the outputs of AI so it can be used to positively impact learning.'
		},
		{
			question: 'Data Governance Modernization',
			answer:
				'Addressing privacy, access, ownership, longevity, and accuracy of data so learners control and own their data, and systems have the minimum they need to support self-sovereignty, learner mobility, and data portability.'
		}
	],
	newsletter: {
		...fallbackNewsletterBand,
		background: 'teal'
	}
} satisfies ResourcesFaqPage;

export const fallbackEventsUpcoming = {
	slug: 'events-upcoming',
	activeSection: 'Events',
	subNav: fallbackEventsSubNav,
	hero: {
		chip: 'EVENTS',
		title: 'Upcoming Events',
		description:
			'Convenings, working group sessions, and platform launches across the EDU, DSU, CEDS, and EDUcore communities.'
	},
	events: fallbackUpcomingEvents,
	counterLabel: 'Upcoming events',
	newsletter: {
		heading: 'Get event updates in your inbox',
		description:
			'Receive invitations, agenda releases, and community updates for EDU, DSU, CEDS, and EDUcore events.',
		emailPlaceholder: 'Email address',
		ctaLabel: 'Subscribe',
		note: 'No spam. Just timely event and community updates.',
		background: 'navy'
	}
} satisfies EventsUpcomingPage;

export const fallbackEventsPast = {
	slug: 'events-past',
	activeSection: 'Events',
	subNav: fallbackEventsSubNav,
	hero: {
		chip: 'EVENTS',
		title: 'Event Archive',
		description:
			'Past convenings, working sessions, and launches from the EDU, DSU, CEDS, and EDUcore communities.'
	},
	archive: [
		{
			year: '2026',
			events: [
				fallbackPastConferenceEvent,
				fallbackPastConferenceEvent,
				fallbackPastConferenceEvent,
				fallbackPastConferenceEvent
			]
		},
		{
			year: '2025',
			events: [fallbackPastConferenceEvent, fallbackPastConferenceEvent, fallbackPastConferenceEvent]
		}
	],
	newsletter: {
		heading: 'Get event updates in your inbox',
		description:
			'Receive invitations, agenda releases, and community updates for EDU, DSU, CEDS, and EDUcore events.',
		emailPlaceholder: 'Email address',
		ctaLabel: 'Subscribe',
		note: 'No spam. Just timely event and community updates.',
		background: 'teal'
	}
} satisfies EventsPastPage;

export const fallbackEduOverview = {
	slug: 'edu-overview',
	activeSection: 'About EDU',
	subNav: fallbackEduSubNav,
	hero: {
		chip: 'EDUCATION DATA UNLIMITED',
		title: 'One infrastructure. Endless possibility.',
		description:
			'Education Data Unlimited is the collaborative network and AI-powered platform that makes interoperable education, training, and workforce data a reality - advancing equity for every learner.'
	},
	mission: {
		eyebrow: 'Overview',
		heading: 'Mission Statement',
		paragraphs: [
			'At Education Data Unlimited (EDU), we are building the foundation for a world where data seamlessly connects learning to opportunity. By uniting agencies, organizations, and industries across the entire education and workforce continuum, we eliminate fragmentation, harmonize data standards, and enable lifelong learning to be accurately recognized and valued. Through collaboration and sustainability, we create a future-proof ecosystem where data flows without barriers - supporting students, workers, and employers in an ever-evolving global economy.'
		]
	},
	organization: {
		heading: 'Organization Description',
		paragraphs: [
			'Education Data Unlimited (EDU) is a non-profit catalyst for data collaboration across the entire education and workforce spectrum. We bridge horizontal sectors - from Pre-K to graduate education and workforce development - and vertical industries spanning government, military, healthcare, HR, and upskilling initiatives. Our goal is to unify standards, streamline interoperability, and reduce inefficiencies that hinder progress in learning, credentialing, and employment.',
			'EDU serves as a strategic convening force, providing a stable, long-term home for initiatives and frameworks that drive data interoperability. We champion an approach that is market-responsive yet mission-driven, ensuring that evolving technologies - including AI, digital credentials, and lifelong learning records - are built on a strong, sustainable foundation.',
			'By fostering open collaboration among key stakeholders and reducing redundant efforts, EDU advances a data standards ecosystem that is future-proof, cost-effective, and impactful. Our work empowers organizations to shift from proprietary silos to a shared digital infrastructure that supports innovation, accelerates workforce mobility, and unlocks new economic opportunities for individuals and communities worldwide.'
		]
	},
	willDo: {
		heading: 'Things EDU will do',
		description: 'The scope of activity Education Data Unlimited takes on as a convening body.',
		items: [
			'Act as a convening and organizing system for data standards',
			"Operate as a project home for initiatives and data standards work that don't have another home",
			'Act as a unifying force to reduce the confusion and proliferation of data standards',
			'Conduct research and educate the public on issues related to developing and encouraging the adoption of data interoperability standards, specifically designed to meet the needs of the education and workforce markets',
			'Include testing and validating interoperability systems',
			'Sponsor conferences, forums and collaborative events',
			'Perform other activities designed to meet the needs of the education and workforce market as they emerge'
		]
	},
	willNotDo: {
		heading: 'Things EDU will not do',
		description: 'Boundaries set by our 501(c)(3) charter.',
		items: [
			'No substantial part of the activities of which is carrying on propaganda, or otherwise attempting to influence legislation, except as is otherwise provided by section 501(h) of the Internal Revenue Code.',
			'No part of any activities of the organization will include participating in or intervening in any political campaign on behalf of or in opposition to any candidate for public office.'
		]
	},
	unification: {
		heading: 'An Opportunity For Unification',
		paragraphs: [
			'Education Data Unlimited (EDU), in partnership with funders, leading organizations, and the signatories of Data Standards United (DSU), offers a groundbreaking opportunity to reduce the fragmentation of data standards that has long plagued education and workforce systems. The current landscape is filled with competing, overlapping, and disconnected standards, making it difficult for learners, educators, employers, and policymakers to navigate and exchange data effectively. By uniting key players - including 1EdTech, Access4Learning (A4L), Credential Engine, DublinCore, ED3, the Groningen Declaration Network, HR Open Standards (HROS), Medbiquitous, and the Postsecondary Education Standards Council (PESC) - EDU is spearheading an effort to consolidate and harmonize critical data frameworks.',
			'Through its role as a fully open, neutral convening force, EDU fosters collaboration among standards organizations, industry leaders, and government entities, creating a unified approach to data governance. This model aligns the ontologies, vocabularies, and technical frameworks that underpin existing standards, allowing organizations to integrate their data more efficiently while preserving the specificity needed for different domains.',
			'This partnership-driven strategy is the only scalable, sustainable way to ensure a future-proof data ecosystem. EDU and its DSU partners are building a shared digital infrastructure, much like the electrical grid or the internet, where stakeholders can plug in and operate efficiently without reinventing the wheel.'
		]
	},
	incorporation: {
		heading: 'Incorporation Information',
		paragraphs: [
			'This corporation is organized exclusively for charitable and educational purposes within the meaning of section 501(c)(3) in the District of Columbia. The organization will engage in activities permissible under section 501(c)(3).'
		]
	}
} satisfies EduOverviewPage;

export const fallbackEduBoard = {
	slug: 'edu-board',
	activeSection: 'About EDU',
	subNav: fallbackEduSubNav,
	hero: {
		chip: 'EDU',
		title: 'Board of Directors'
	},
	members: [
		{
			role: 'Chair',
			name: 'Alex Jackl',
			organization: 'CEO of Bardic Systems, Chair of DSU',
			email: 'alex@bardicsystems.com'
		},
		{
			role: 'Co-Chair',
			name: 'Open'
		},
		{
			role: 'Vice-Chair',
			name: 'Francisco Valines',
			organization: 'Director of Financial Aid, Florida International University',
			email: 'valinesf@fiu.edu'
		},
		{
			role: 'Treasurer',
			name: 'George Gatsis',
			organization: 'CTO 95 Percent Group',
			email: 'ggatsis@95percentgroup.com'
		},
		{
			role: 'Secretary',
			name: 'Jeff Simons',
			organization: 'CIO Washington School Information Processing Cooperative (WSIPC)',
			email: 'jsimons@wsipc.org'
		},
		{
			role: 'Member',
			name: 'Ben Silberglitt',
			organization: 'VP of Standards and Data, Level Data',
			email: 'Ben.Silberglitt@leveldata.com'
		},
		{
			role: 'Member',
			name: 'Mark Cohen',
			organization: 'CA Community Colleges Technology Center',
			email: 'mcohen@ccctechcenter.org'
		},
		{
			role: 'Member',
			name: 'Jay Pennington',
			organization: 'Bureau Chief, Iowa Dept of Education',
			email: 'jay.pennington@iowa.gov'
		},
		{
			role: 'Member',
			name: 'John Kraman',
			organization: 'CIO Mississippi Dept of Education',
			email: 'jkraman@mdek12.org'
		},
		{
			role: 'Member',
			name: 'Kathy Warren',
			organization: 'Director of Education Data, Maine Dept of Education',
			email: 'katherine.warren@maine.gov'
		},
		{
			role: 'Member',
			name: 'Robert Mcgough',
			organization: 'Chief Data Officer, Arkansas Department of Information Services',
			email: 'robert.mcgough@arkansas.gov'
		}
	]
} satisfies EduBoardPage;

export const fallbackEduHistory = {
	slug: 'edu-history',
	activeSection: 'About EDU',
	subNav: fallbackEduSubNav,
	hero: {
		chip: 'EDU',
		title: 'Our history',
		description:
			'From an informal conversation among standards bodies to a chartered non-profit building shared data infrastructure for education and the workforce.'
	},
	entries: [
		{
			year: '2019',
			title: 'The conversation begins',
			text: 'Standards development organizations across education and workforce data recognize the growing cost of fragmentation and begin informal coordination on shared vocabularies.'
		},
		{
			year: '2021',
			title: 'Data Standards United forms',
			text: 'A coalition of SDOs, agencies, and practitioners signs on to a common-ground charter - committing to free, open, consensus-based standards across the PK-20W continuum.'
		},
		{
			year: '2023',
			title: 'CEDS sustainability work',
			text: 'DSU takes on stewardship initiatives for the Common Education Data Standards, convening the Tiger Team and launching the A4L Unity alignment project.'
		},
		{
			year: '2025',
			title: 'Education Data Unlimited launches',
			text: 'EDU is incorporated as a 501(c)(3) to serve as the neutral, long-term home for data interoperability initiatives - and to build EDUcore, the AI-native standards platform.'
		},
		{
			year: '2026',
			title: 'EDUcore open beta',
			text: 'The reference library, Graphinator, and Standards Partner tools enter open beta, giving practitioners AI-assisted access to harmonized education data standards.'
		}
	]
} satisfies EduHistoryPage;

export const fallbackEduContact = {
	slug: 'edu-contact',
	activeSection: 'Contact',
	subNav: fallbackEduSubNav,
	hero: {
		chip: 'EDU',
		title: 'Contact EDU',
		description:
			'Questions about membership, the standards work, or EDUcore? Reach out and the team will point you in the right direction.'
	},
	fields: [
		{
			label: 'Name',
			placeholder: 'Your name',
			name: 'name',
			type: 'text',
			required: true
		},
		{
			label: 'Organization',
			placeholder: 'Your organization',
			name: 'organization',
			type: 'text'
		},
		{
			label: 'Email',
			placeholder: 'you@example.org',
			name: 'email',
			type: 'email',
			required: true,
			full: true
		},
		{
			label: 'How can we help?',
			placeholder: 'Tell us a little about your question...',
			name: 'message',
			type: 'textarea',
			required: true,
			full: true
		}
	],
	directCard: {
		eyebrow: 'Direct',
		heading: 'General inquiries',
		email: 'alex@bardicsystems.com'
	},
	collaborativeCard: {
		heading: 'Join the collaborative',
		text: 'Interested in becoming a DSU signatory or affiliate member?',
		cta: {
			label: 'View joining information',
			href: '/dsu/joining',
			variant: 'teal'
		}
	}
} satisfies EduContactPage;

export const fallbackEducoreOverview = {
	slug: 'educore-overview',
	activeSection: 'EDUcore',
	subNav: fallbackEducoreSubNav,
	hero: {
		chip: 'EDUCORE',
		title: 'AI-powered tools for education data standards.',
		description:
			'Establishing a unified, AI-sustained data infrastructure that enables secure, standards-based interoperability of assessments and credentials across the entire U.S. education-to-employment ecosystem.'
	},
	platform: {
		eyebrow: 'The platform',
		heading: 'One platform, four ways in',
		description:
			'EDUcore brings the harmonized standards work of DSU and CEDS into a set of AI-native tools - so practitioners can discover, understand, and apply education data standards without the manual overhead.',
		tools: [
			{
				name: 'Reference Library',
				tag: 'Linked standards data',
				description:
					'A web reference application with linked data to every standard practitioners need - smart navigation, best practices, and links to reference implementations, all under one roof.',
				href: '#'
			},
			{
				name: 'Graphinator',
				tag: 'AI mapping engine',
				description:
					'AI-assisted crosswalking that maps elements across CEDS, A4L, PESC, and other frameworks - turning manual mapping work that took months into an interactive graph.',
				href: '#'
			},
			{
				name: 'Standards Partner',
				tag: 'Conversational guidance',
				description:
					'A conversational assistant trained on harmonized education data standards - answering implementation questions and pointing to authoritative sources in plain language.',
				href: '#'
			},
			{
				name: 'Project Prospectus',
				tag: 'Initiative home',
				description:
					'A living catalog of the data-standards initiatives EDUcore hosts - scope, status, and how to get involved with each working group and project.',
				href: '#'
			}
		]
	},
	ctaBand: {
		heading: 'EDUcore is in open beta',
		description:
			'Try the reference library, Graphinator, and Standards Partner - and tell us what the standards community needs next.',
		cta: {
			label: 'Request beta access',
			href: '#',
			variant: 'teal'
		}
	}
} satisfies EducoreOverviewPage;
