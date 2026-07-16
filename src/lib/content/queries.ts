const linkDestinationProjection = `{
	type,
	pageKey,
	href,
	anchorId,
	"file": select(
		defined(file.asset) => {
			"url": file.asset->url,
			"filename": file.asset->originalFilename,
			"mimeType": file.asset->mimeType,
			"size": file.asset->size
		},
		null
	)
}`;

const ctaProjection = `{
	label,
	variant,
	destination${linkDestinationProjection}
}`;

const heroProjection = `{
	chip,
	title,
	description,
	"ctas": coalesce(ctas[]${ctaProjection}, [])
}`;

const eduOverviewSectionProjection = `{
	eyebrow,
	heading,
	"paragraphs": coalesce(paragraphs, [])
}`;

const eduListGroupProjection = `{
	heading,
	description,
	"items": coalesce(items, [])
}`;

const sectionHeaderProjection = `{
	eyebrow,
	heading,
	"body": coalesce(body[]{
		_type,
		style,
		children[]{
			_type,
			text,
			marks
		}
	}, [])
}`;

const educoreFeatureCardProjection = `{
	icon,
	title,
	description
}`;

const educoreDemoProjection = `{
	title,
	presenter,
	organization,
	description,
	"thumbnailImage": select(
		defined(thumbnailImage.asset) => {
			"url": thumbnailImage.asset->url,
			"alt": thumbnailImage.alt
		},
		null
	),
	videoUrl,
	linkLabel
}`;

const sharedCtaProjection = `->{
	"type": type,
	eyebrow,
	heading,
	description,
	signupMode,
	note,
	background,
	cta${ctaProjection}
}`;

const pageCtasProjection = `"ctas": coalesce(ctas[]${sharedCtaProjection}, [])`;

const infoCardProjection = `{
	eyebrow,
	heading,
	text,
	email,
	cta${ctaProjection}
}`;

const resourceCardProjection = `{
	meta,
	title,
	description,
	cta${ctaProjection}
}`;

const fileArtifactProjection = `{
	label,
	"url": file.asset->url,
	"filename": file.asset->originalFilename,
	"mimeType": file.asset->mimeType,
	"size": file.asset->size
}`;

const eventItemProjection = `{
	"image": select(
		defined(image.asset) => {
			"url": image.asset->url,
			"alt": image.alt
		},
		null
	),
	tag,
	category,
	date,
	title,
	description,
	href
}`;

const memberOrganizationProjection = `{
	name,
	url,
	"logoImage": select(
		defined(logoImage.asset) => {
			"url": logoImage.asset->url,
			"alt": logoImage.alt
		},
		null
	)
}`;

export const dsuHomeQuery = `*[_id == "dsuHome"][0]{
	hero${heroProjection},
	"pillarsHeader": coalesce(pillarsHeader${sectionHeaderProjection}, {}),
	"pillars": coalesce(pillars[]{
		label,
		text
	}, []),
	"valuesHeader": coalesce(valuesHeader${sectionHeaderProjection}, {}),
	"values": coalesce(values[]{
		number,
		title,
		description
	}, []),
	initiative{
		"header": coalesce(header${sectionHeaderProjection}, {
			"heading": heading
		}),
		"items": coalesce(items, [])
	},
	"voicesHeader": coalesce(voicesHeader${sectionHeaderProjection}, {}),
	"voices": coalesce(voices[]{
		quote,
		name,
		organization
	}, []),
	${pageCtasProjection}
}`;

export const dsuMembersQuery = `*[_id == "dsuMembers"][0]{
	hero${heroProjection},
	"videosHeader": coalesce(videosHeader${sectionHeaderProjection}, {}),
	"videos": coalesce(videos[]{
		name,
		title,
		organization,
		provider,
		url
	}, []),
	"signatoryMembersHeader": coalesce(signatoryMembersHeader${sectionHeaderProjection}, {}),
	"signatoryMembers": coalesce(signatoryMembers[]${memberOrganizationProjection}, []),
	"affiliateMembersHeader": coalesce(affiliateMembersHeader${sectionHeaderProjection}, {}),
	"affiliateMembers": coalesce(affiliateMembers[]${memberOrganizationProjection}, []),
	affiliateIntro,
	${pageCtasProjection}
}`;

export const dsuJoinQuery = `*[_id == "dsuJoin"][0]{
	hero${heroProjection},
	"membershipHeader": coalesce(membershipHeader${sectionHeaderProjection}, {}),
	"membershipTypes": coalesce(membershipTypes[]{
		kind,
		kindColor,
		title,
		description,
		"bullets": coalesce(bullets, []),
		cta${ctaProjection},
		featured
	}, []),
	process{
		"header": coalesce(header${sectionHeaderProjection}, {
			"eyebrow": eyebrow,
			"heading": heading
		}),
		"steps": coalesce(steps[]{
			title,
			description
		}, [])
	},
	contact{
		eyebrow,
		heading,
		description,
		email
	},
	submissionChecklist{
		heading,
		"items": coalesce(items, [])
	},
	${pageCtasProjection}
}`;

export const dsuProjectsQuery = `*[_id == "dsuProjects"][0]{
	hero${heroProjection},
	"projectsHeader": coalesce(projectsHeader${sectionHeaderProjection}, {}),
	"projects": coalesce(projects[]{
		title,
		category,
		href,
		"logoImage": select(
			defined(logoImage.asset) => {
				"url": logoImage.asset->url,
				"alt": logoImage.alt
			},
			null
		)
	}, []),
	${pageCtasProjection}
}`;

export const cedsOverviewQuery = `*[_id == "cedsOverview"][0]{
	hero${heroProjection},
	"logoImage": select(
		defined(logoImage.asset) => {
			"url": logoImage.asset->url,
			"alt": logoImage.alt
		},
		null
	),
	overview${sectionHeaderProjection},
	"reasons": coalesce(reasons[]{
		label,
		text
	}, []),
	"dataModels": coalesce(dataModels[]{
		label,
		text
	}, []),
	community${sectionHeaderProjection},
	"learningLinks": coalesce(learningLinks[]${resourceCardProjection}, []),
	exchange${sectionHeaderProjection},
	${pageCtasProjection}
}`;

export const resourcesHubQuery = `*[_id == "resourcesHub"][0]{
	hero${heroProjection},
	eyebrow,
	heading,
	"cards": coalesce(cards[]${resourceCardProjection}, []),
	"counts": {
		"libraryDocuments": count(coalesce(*[_id == "resourcesLibrary"][0].items, [])),
		"pressDocuments": count(coalesce(*[_id == "resourcesPress"][0].items, [])),
		"newsletterItems": count(coalesce(*[_id == "resourcesNewsletter"][0].items, [])),
		"glossaryTerms": count(coalesce(*[_id == "resourcesGlossary"][0].terms, [])),
		"faqQuestions": count(coalesce(*[_id == "resourcesFaq"][0].items, []))
	},
	${pageCtasProjection}
}`;

export const resourcesLibraryQuery = `*[_id == "resourcesLibrary"][0]{
	hero${heroProjection},
	"categories": coalesce(categories, []),
	"items": coalesce(items[]{
		category,
		resourceType,
		title,
		documentType,
		description,
		"document": {
			"url": document.asset->url,
			"filename": document.asset->originalFilename,
			"mimeType": document.asset->mimeType,
			"size": document.asset->size
		}
	}, []),
	${pageCtasProjection}
}`;

export const resourcesPressQuery = `*[_id == "resourcesPress"][0]{
	hero${heroProjection},
	"categories": coalesce(categories, []),
	"items": coalesce(items[]{
		category,
		resourceType,
		title,
		documentType,
		description,
		"document": {
			"url": document.asset->url,
			"filename": document.asset->originalFilename,
			"mimeType": document.asset->mimeType,
			"size": document.asset->size
		}
	}, []),
	${pageCtasProjection}
}`;

export const resourcesNewsletterQuery = `*[_id == "resourcesNewsletter"][0]{
	hero${heroProjection},
	"categories": coalesce(categories, []),
	"items": coalesce(items[]{
		category,
		title,
		documentType,
		description,
		"document": {
			"url": document.asset->url,
			"filename": document.asset->originalFilename,
			"mimeType": document.asset->mimeType,
			"size": document.asset->size
		}
	}, []),
	${pageCtasProjection}
}`;

export const resourcesGlossaryQuery = `*[_id == "resourcesGlossary"][0]{
	hero${heroProjection},
	"categories": coalesce(categories, []),
	"terms": coalesce(terms[]{
		term,
		definition,
		category,
		anchor
	}, []),
	artifact${fileArtifactProjection},
	${pageCtasProjection}
}`;

export const dsuStandardsQuery = `*[_type == "resourcesGlossary" && _id == "5dcb5add-6399-4b81-ae19-179fd9ae7129"][0]{
	hero${heroProjection},
	"categories": coalesce(categories, []),
	"terms": coalesce(terms[]{
		term,
		definition,
		category,
		anchor
	}, []),
	"categoryIntros": coalesce(categoryIntros[]{
		category,
		heading,
		body
	}, []),
	artifact${fileArtifactProjection},
	${pageCtasProjection}
}`;

export const resourcesFaqQuery = `*[_id == "resourcesFaq"][0]{
	hero${heroProjection},
	"categories": coalesce(categories, []),
	"items": coalesce(items[]{
		question,
		answer,
		category
	}, []),
	${pageCtasProjection}
}`;

export const eventsUpcomingQuery = `*[_id == "eventsUpcoming"][0]{
	hero${heroProjection},
	"events": coalesce(events[]${eventItemProjection}, []),
	counterLabel,
	${pageCtasProjection}
}`;

export const eventsPastQuery = `*[_id == "eventsPast"][0]{
	hero${heroProjection},
	"archive": coalesce(archive[]{
		year,
		"events": coalesce(events[]${eventItemProjection}, [])
	}, []),
	${pageCtasProjection}
}`;

export const eduOverviewQuery = `*[_id == "eduOverview"][0]{
	hero${heroProjection},
	mission${eduOverviewSectionProjection},
	organization${eduOverviewSectionProjection},
	willDo${eduListGroupProjection},
	willNotDo${eduListGroupProjection},
	unification${eduOverviewSectionProjection},
	incorporation${eduOverviewSectionProjection},
	${pageCtasProjection}
}`;

export const eduBoardQuery = `*[_id == "eduBoard"][0]{
	hero${heroProjection},
	"members": coalesce(members[]{
		role,
		name,
		organization,
		email
	}, []),
	${pageCtasProjection}
}`;

export const dsuBoardQuery = `*[_id == "dsuBoard"][0]{
	hero${heroProjection},
	"members": coalesce(members[]{
		role,
		name,
		organization,
		email
	}, []),
	${pageCtasProjection}
}`;

export const eduHistoryQuery = `*[_id == "eduHistory"][0]{
	hero${heroProjection},
	"entries": coalesce(entries[]{
		year,
		title,
		text
	}, []),
	${pageCtasProjection}
}`;

export const contactPageQuery = `*[_id == "eduContact"][0]{
	hero${heroProjection},
	"fields": coalesce(fields[]{
		label,
		placeholder,
		name,
		type,
		required,
		full
	}, []),
	"recipientOptions": coalesce(recipientOptions[]{
		label,
		email
	}, []),
	directCard${infoCardProjection},
	collaborativeCard${infoCardProjection},
	${pageCtasProjection}
}`;

export const educoreOverviewQuery = `*[_id == "educoreOverview"][0]{
	hero${heroProjection},
	useCasesHeader${sectionHeaderProjection},
	"useCases": coalesce(useCases[]${educoreFeatureCardProjection}, []),
	why${sectionHeaderProjection},
	workingTowardHeading,
	"workingTowardItems": coalesce(workingTowardItems[]{
		label,
		text
	}, []),
	phaseOneHeader${sectionHeaderProjection},
	"phaseOneDeliverables": coalesce(phaseOneDeliverables[]{
		label,
		text
	}, []),
	standardsAlignment${sectionHeaderProjection},
	aiBakeoffHeader${sectionHeaderProjection},
	"aiBakeoffDemos": coalesce(aiBakeoffDemos[]${educoreDemoProjection}, []),
	${pageCtasProjection}
}`;

export const chromeQuery = `*[_type == "sitePage"] | order(sortOrder asc){
	sectionKey,
	routePageKey,
	navLabel,
	disabled,
	hidden,
	sortOrder,
	"navigationItems": coalesce(navigationItems[]{
		label,
		disabled,
		hidden,
		destination${linkDestinationProjection}
	}, [])
}`;
