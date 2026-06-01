import type { DsuHomePage, SiteChrome } from './types';

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
	subNav: [
		{ label: 'Home', href: '/' },
		{ label: 'Members', href: '/dsu/members' },
		{ label: 'Joining DSU', href: '/dsu/joining' },
		{ label: 'Projects', href: '/dsu/projects' }
	],
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
