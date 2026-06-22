import type { RoutePageKey, SiteSectionKey } from './route-metadata';

export type LinkDestinationKind = 'internalPage' | 'externalUrl' | 'download' | 'anchor';

export type LinkDestination = {
	type: LinkDestinationKind;
	pageKey?: RoutePageKey;
	href?: string;
	anchorId?: string;
	file?: {
		url?: string;
		filename?: string;
		mimeType?: string;
		size?: number;
	};
};

export type ResolvedLink = {
	href?: string;
	target?: '_blank';
	rel?: 'noopener noreferrer';
	download?: string | boolean;
	mimeType?: string;
	size?: number;
};

export type LinkItem = ResolvedLink & {
	label: string;
	disabled?: boolean;
	hidden?: boolean;
	pageKey?: RoutePageKey;
};

export type Cta = ResolvedLink & {
	label: string;
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

export type RichTextSpan = {
	_type: 'span';
	text: string;
	marks?: string[];
};

export type RichTextBlock = {
	_type: 'block';
	style?: 'normal';
	children?: RichTextSpan[];
};

export type SectionHeader = {
	eyebrow?: string;
	heading?: string;
	body?: RichTextBlock[];
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

export type ImageAsset = {
	url: string;
	alt?: string;
};

export type MemberOrganization = {
	name: string;
	url: string;
	logoImage?: ImageAsset;
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
	title: string;
	category?: string;
	href: string;
	logoImage?: ImageAsset;
};

export type ResourceCard = {
	meta: string;
	title: string;
	description: string;
	cta: Cta;
};

export type ResourceDocumentItem = {
	category: 'White papers' | 'Reports';
	title: string;
	documentType: string;
	description?: string;
	document: {
		url: string;
		filename?: string;
		mimeType?: string;
		size?: number;
	};
};

export type PressDocumentItem = {
	category: 'Press releases' | 'Charters';
	title: string;
	documentType: string;
	description?: string;
	document: {
		url: string;
		filename?: string;
		mimeType?: string;
		size?: number;
	};
};

export type NewsletterDocumentItem = {
	category: string;
	title: string;
	documentType: string;
	description?: string;
	document: {
		url: string;
		filename?: string;
		mimeType?: string;
		size?: number;
	};
};

export type SharedCtaKind = 'generic' | 'newsletter';

export type NewsletterSignupMode = 'externalLink' | 'directEmailSignup';

export type GenericSharedCtaContent = {
	type: 'generic';
	eyebrow?: string;
	heading: string;
	description: string;
	background?: 'navy' | 'teal';
	cta: Cta;
};

export type NewsletterBandContent = {
	type: 'newsletter';
	heading: string;
	description: string;
	signupMode: NewsletterSignupMode;
	cta: Cta;
	note?: string;
	background?: 'navy' | 'teal';
};

export type SharedCtaContent = GenericSharedCtaContent | NewsletterBandContent;

export type EventItem = {
	image?: ImageAsset;
	tag: string;
	date: string;
	title: string;
	description: string;
	href: string;
};

export type EventArchiveGroup = {
	year: string;
	events: EventItem[];
};

export type GlossaryTerm = {
	term: string;
	definition: string;
	category: string;
};

export type GlossaryArtifact = {
	label: string;
	url?: string;
	filename?: string;
	mimeType?: string;
	size?: number;
};

export type FaqItem = {
	question: string;
	answer: string;
	category?: string;
};

export type EduSection = 'About EDU';

export type EducoreSection = 'EDUcore';

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

export type EducoreFeatureCard = {
	icon: string;
	title: string;
	description: string;
};

export type EducoreDemo = {
	title: string;
	presenter: string;
	organization?: string;
	description: string;
	thumbnailImage?: ImageAsset;
	videoUrl: string;
	linkLabel: string;
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

export type SiteNavSection = LinkItem & {
	key: SiteSectionKey;
	pageKey: RoutePageKey;
	children: LinkItem[];
};

export type SiteChrome = {
	primaryNav: LinkItem[];
	sections: SiteNavSection[];
	footerColumns: FooterColumn[];
};

export type DsuHomePage = {
	slug: 'dsu-home';
	activeSection: 'DSU';
	subNav: LinkItem[];
	hero: HeroContent;
	pillarsHeader: SectionHeader;
	pillars: TextBlock[];
	valuesHeader: SectionHeader;
	values: NumberedValue[];
	initiative: {
		header: SectionHeader;
		items: string[];
	};
	voicesHeader: SectionHeader;
	voices: Quote[];
	ctas: SharedCtaContent[];
};

export type DsuMembersPage = {
	slug: 'dsu-members';
	activeSection: 'DSU';
	subNav: LinkItem[];
	hero: HeroContent;
	videosHeader: SectionHeader;
	videos: VideoTestimonial[];
	signatoryMembersHeader: SectionHeader;
	signatoryMembers: MemberOrganization[];
	affiliateMembersHeader: SectionHeader;
	affiliateMembers: MemberOrganization[];
	affiliateIntro: string;
	ctas: SharedCtaContent[];
};

export type DsuJoinPage = {
	slug: 'dsu-joining';
	activeSection: 'DSU';
	subNav: LinkItem[];
	hero: HeroContent;
	membershipHeader: SectionHeader;
	membershipTypes: MembershipType[];
	process: {
		header: SectionHeader;
		steps: ProcessStep[];
	};
	contact: ContactPrompt;
	submissionChecklist: Checklist;
	ctas: SharedCtaContent[];
};

export type DsuProjectsPage = {
	slug: 'dsu-projects';
	activeSection: 'DSU';
	subNav: LinkItem[];
	hero: HeroContent;
	projectsHeader: SectionHeader;
	projects: DsuProject[];
	ctas: SharedCtaContent[];
};

export type CedsOverviewPage = {
	slug: 'ceds';
	activeSection: 'CEDS';
	subNav: LinkItem[];
	hero: HeroContent;
	logoImage?: ImageAsset;
	overview: SectionHeader;
	reasons: TextBlock[];
	dataModels: TextBlock[];
	community: SectionHeader;
	learningLinks: ResourceCard[];
	exchange: SectionHeader;
	ctas: SharedCtaContent[];
};

export type ResourcesHubPage = {
	slug: 'resources-library';
	activeSection: 'Resources';
	subNav: LinkItem[];
	hero: HeroContent;
	eyebrow: string;
	heading: string;
	cards: ResourceCard[];
	ctas: SharedCtaContent[];
};

export type ResourcesLibraryPage = {
	slug: 'resources-library';
	activeSection: 'Resources';
	subNav: LinkItem[];
	hero: HeroContent;
	categories: ResourceDocumentItem['category'][];
	items: ResourceDocumentItem[];
	ctas: SharedCtaContent[];
};

export type ResourcesPressPage = {
	slug: 'resources-press';
	activeSection: 'Resources';
	subNav: LinkItem[];
	hero: HeroContent;
	categories: PressDocumentItem['category'][];
	items: PressDocumentItem[];
	ctas: SharedCtaContent[];
};

export type ResourcesNewsletterPage = {
	slug: 'resources-newsletter';
	activeSection: 'Resources';
	subNav: LinkItem[];
	hero: HeroContent;
	categories: NewsletterDocumentItem['category'][];
	items: NewsletterDocumentItem[];
	ctas: SharedCtaContent[];
};

export type ResourcesGlossaryPage = {
	slug: 'resources-glossary';
	activeSection: 'Resources';
	subNav: LinkItem[];
	hero: HeroContent;
	categories: string[];
	terms: GlossaryTerm[];
	artifact?: GlossaryArtifact;
	ctas: SharedCtaContent[];
};

export type ResourcesFaqPage = {
	slug: 'resources-faq';
	activeSection: 'Resources';
	subNav: LinkItem[];
	hero: HeroContent;
	categories: string[];
	items: FaqItem[];
	ctas: SharedCtaContent[];
};

export type EventsUpcomingPage = {
	slug: 'events-upcoming';
	activeSection: 'Events';
	subNav: LinkItem[];
	hero: HeroContent;
	events: EventItem[];
	counterLabel: string;
	ctas: SharedCtaContent[];
};

export type EventsPastPage = {
	slug: 'events-past';
	activeSection: 'Events';
	subNav: LinkItem[];
	hero: HeroContent;
	archive: EventArchiveGroup[];
	ctas: SharedCtaContent[];
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
	ctas: SharedCtaContent[];
};

export type EduBoardPage = {
	slug: 'edu-board';
	activeSection: EduSection;
	subNav: LinkItem[];
	hero: HeroContent;
	members: BoardMember[];
	ctas: SharedCtaContent[];
};

export type EduHistoryPage = {
	slug: 'edu-history';
	activeSection: EduSection;
	subNav: LinkItem[];
	hero: HeroContent;
	entries: TimelineEntry[];
	ctas: SharedCtaContent[];
};

export type ContactPage = {
	slug: 'contact' | 'edu-contact';
	activeSection: 'Contact';
	subNav: LinkItem[];
	hero: HeroContent;
	fields: ContactField[];
	directCard: InfoCard;
	collaborativeCard: InfoCard;
	ctas: SharedCtaContent[];
};

export type EducoreOverviewPage = {
	slug: 'educore-overview';
	activeSection: EducoreSection;
	subNav: LinkItem[];
	hero: HeroContent;
	useCasesHeader: SectionHeader;
	useCases: EducoreFeatureCard[];
	why: SectionHeader;
	workingTowardHeading: string;
	workingTowardItems: TextBlock[];
	phaseOneHeader: SectionHeader;
	phaseOneDeliverables: TextBlock[];
	standardsAlignment: SectionHeader;
	aiBakeoffHeader: SectionHeader;
	aiBakeoffDemos: EducoreDemo[];
	ctas: SharedCtaContent[];
};
