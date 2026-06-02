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
