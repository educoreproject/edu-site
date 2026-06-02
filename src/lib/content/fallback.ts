import type {
	DsuHomePage,
	DsuJoinPage,
	DsuMembersPage,
	DsuProjectsPage,
	LinkItem,
	SiteChrome
} from './types';

const fallbackDsuSubNav = [
	{ label: 'Home', href: '/' },
	{ label: 'Members', href: '/dsu/members' },
	{ label: 'Joining DSU', href: '/dsu/joining' },
	{ label: 'Projects', href: '/dsu/projects' }
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
