import type { RoutePageKey, SiteSectionKey } from './route-metadata';
import type { ResourceType } from './document-filters';

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
	listItem?: 'bullet';
	level?: number;
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

export type ContactRecipient = {
	label: string;
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
	resourceType?: ResourceType;
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
	resourceType?: ResourceType;
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
	category?: ResourceType;
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
	definition: RichTextBlock[];
	category: string;
	anchor?: string;
};

export type CategoryIntro = {
	category: string;
	heading?: string;
	body?: RichTextBlock[];
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
	hero: HeroContent;
	projectsHeader: SectionHeader;
	projects: DsuProject[];
	ctas: SharedCtaContent[];
};

export type CedsOverviewPage = {
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
	hero: HeroContent;
	eyebrow: string;
	heading: string;
	cards: ResourceCard[];
	ctas: SharedCtaContent[];
};

export type ResourcesLibraryPage = {
	hero: HeroContent;
	categories: ResourceDocumentItem['category'][];
	items: ResourceDocumentItem[];
	ctas: SharedCtaContent[];
};

export type ResourcesPressPage = {
	hero: HeroContent;
	categories: PressDocumentItem['category'][];
	items: PressDocumentItem[];
	ctas: SharedCtaContent[];
};

export type ResourcesNewsletterPage = {
	hero: HeroContent;
	categories: NewsletterDocumentItem['category'][];
	items: NewsletterDocumentItem[];
	ctas: SharedCtaContent[];
};

export type ResourcesGlossaryPage = {
	hero: HeroContent;
	categories: string[];
	terms: GlossaryTerm[];
	categoryIntros?: CategoryIntro[];
	artifact?: GlossaryArtifact;
	ctas: SharedCtaContent[];
};

export type ResourcesFaqPage = {
	hero: HeroContent;
	categories: string[];
	items: FaqItem[];
	ctas: SharedCtaContent[];
};

export type EventsUpcomingPage = {
	hero: HeroContent;
	events: EventItem[];
	counterLabel: string;
	ctas: SharedCtaContent[];
};

export type EventsPastPage = {
	hero: HeroContent;
	archive: EventArchiveGroup[];
	ctas: SharedCtaContent[];
};

export type EduOverviewPage = {
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
	hero: HeroContent;
	members: BoardMember[];
	ctas: SharedCtaContent[];
};

export type EduHistoryPage = {
	hero: HeroContent;
	entries: TimelineEntry[];
	ctas: SharedCtaContent[];
};

export type ContactPage = {
	hero: HeroContent;
	fields: ContactField[];
	recipientOptions: ContactRecipient[];
	directCard: InfoCard;
	collaborativeCard: InfoCard;
	ctas: SharedCtaContent[];
};

export type EducoreOverviewPage = {
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
