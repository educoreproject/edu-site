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
