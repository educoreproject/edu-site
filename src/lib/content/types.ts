export type LinkItem = {
	label: string;
	href: string;
	disabled?: boolean;
};

export type Cta = {
	label: string;
	href: string;
	variant: 'primary' | 'outline' | 'teal' | 'gold';
};

export type HeroContent = {
	chip: string;
	title: string;
	description?: string;
	ctas?: Cta[];
};

export type TextBlock = {
	label: string;
	text: string;
};

export type NumberedValue = {
	number: string;
	title: string;
	description: string;
};

export type Quote = {
	quote: string;
	name: string;
	organization: string;
};

export type VideoTestimonial = {
	name: string;
	title: string;
	organization: string;
	provider?: string;
	url?: string;
};

export type MemberOrganization = {
	name: string;
	url: string;
	logoLabel?: string;
	logoColor?: string;
};

export type MembershipType = {
	kind: string;
	kindColor?: string;
	title: string;
	description: string;
	bullets: string[];
	cta: Cta;
	featured?: boolean;
};

export type ProcessStep = {
	title: string;
	description: string;
};

export type Checklist = {
	heading: string;
	items: string[];
};

export type ContactPrompt = {
	eyebrow: string;
	heading: string;
	description: string;
	email: string;
};

export type DsuProject = {
	tag: string;
	title: string;
	category: string;
	href: string;
	logoLabel?: string;
	logoColor?: string;
};

export type EduSection = 'About EDU';

export type EduOverviewSection = {
	eyebrow?: string;
	heading: string;
	paragraphs: string[];
};

export type EduListGroup = {
	heading: string;
	description: string;
	items: string[];
};

export type BoardMember = {
	role: string;
	name: string;
	organization?: string;
	email?: string;
};

export type TimelineEntry = {
	year: string;
	title: string;
	text: string;
};

export type ContactField = {
	label: string;
	placeholder: string;
	name: string;
	type?: 'text' | 'email' | 'textarea';
	required?: boolean;
	full?: boolean;
};

export type InfoCard = {
	eyebrow?: string;
	heading: string;
	text?: string;
	email?: string;
	cta?: Cta;
};

export type FooterColumn = {
	heading: string;
	links: LinkItem[];
};

export type SiteChrome = {
	primaryNav: LinkItem[];
	footerColumns: FooterColumn[];
};

export type DsuHomePage = {
	slug: 'dsu-home';
	activeSection: 'DSU';
	subNav: LinkItem[];
	hero: HeroContent;
	pillars: TextBlock[];
	values: NumberedValue[];
	initiative: {
		heading: string;
		items: string[];
	};
	voices: Quote[];
};

export type DsuMembersPage = {
	slug: 'dsu-members';
	activeSection: 'DSU';
	subNav: LinkItem[];
	hero: HeroContent;
	videos: VideoTestimonial[];
	signatoryMembers: MemberOrganization[];
	affiliateMembers: MemberOrganization[];
	affiliateIntro: string;
	joinCta: {
		heading: string;
		description: string;
		cta: Cta;
	};
};

export type DsuJoinPage = {
	slug: 'dsu-joining';
	activeSection: 'DSU';
	subNav: LinkItem[];
	hero: HeroContent;
	membershipTypes: MembershipType[];
	process: {
		eyebrow: string;
		heading: string;
		steps: ProcessStep[];
	};
	contact: ContactPrompt;
	submissionChecklist: Checklist;
};

export type DsuProjectsPage = {
	slug: 'dsu-projects';
	activeSection: 'DSU';
	subNav: LinkItem[];
	hero: HeroContent;
	projects: DsuProject[];
	joinCta: {
		heading: string;
		description: string;
		cta: Cta;
	};
};

export type EduOverviewPage = {
	slug: 'edu-overview';
	activeSection: EduSection;
	subNav: LinkItem[];
	hero: HeroContent;
	mission: EduOverviewSection;
	organization: EduOverviewSection;
	willDo: EduListGroup;
	willNotDo: EduListGroup;
	unification: EduOverviewSection;
	incorporation: EduOverviewSection;
};

export type EduBoardPage = {
	slug: 'edu-board';
	activeSection: EduSection;
	subNav: LinkItem[];
	hero: HeroContent;
	members: BoardMember[];
};

export type EduHistoryPage = {
	slug: 'edu-history';
	activeSection: EduSection;
	subNav: LinkItem[];
	hero: HeroContent;
	entries: TimelineEntry[];
};

export type EduContactPage = {
	slug: 'edu-contact';
	activeSection: 'Contact';
	subNav: LinkItem[];
	hero: HeroContent;
	fields: ContactField[];
	directCard: InfoCard;
	collaborativeCard: InfoCard;
};
