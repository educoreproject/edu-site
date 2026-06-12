const linkItemProjection = `{
	label,
	href,
	disabled
}`;

const ctaProjection = `{
	label,
	href,
	variant
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

const platformToolProjection = `{
	name,
	tag,
	description,
	href
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

export const dsuHomeQuery = `*[_type == "dsuHome" && slug.current == "dsu-home"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
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

export const dsuMembersQuery = `*[_type == "dsuMembers" && slug.current == "dsu-members"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
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

export const dsuJoinQuery = `*[_type == "dsuJoin" && slug.current == "dsu-joining"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
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

export const dsuProjectsQuery = `*[_type == "dsuProjects" && slug.current == "dsu-projects"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
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

export const resourcesHubQuery = `*[_type == "resourcesHub" && slug.current == "resources-library"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero${heroProjection},
	eyebrow,
	heading,
	"cards": coalesce(cards[]${resourceCardProjection}, []),
	${pageCtasProjection}
}`;

export const resourcesGlossaryQuery = `*[_type == "resourcesGlossary" && slug.current == "resources-glossary"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero${heroProjection},
	"categories": coalesce(categories, []),
	"terms": coalesce(terms[]{
		term,
		definition,
		category
	}, []),
	artifact${fileArtifactProjection},
	${pageCtasProjection}
}`;

export const resourcesFaqQuery = `*[_type == "resourcesFaq" && slug.current == "resources-faq"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero${heroProjection},
	"categories": coalesce(categories, []),
	"items": coalesce(items[]{
		question,
		answer,
		category
	}, []),
	${pageCtasProjection}
}`;

export const eventsUpcomingQuery = `*[_type == "eventsUpcoming" && slug.current == "events-upcoming"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero${heroProjection},
	"events": coalesce(events[]${eventItemProjection}, []),
	counterLabel,
	${pageCtasProjection}
}`;

export const eventsPastQuery = `*[_type == "eventsPast" && slug.current == "events-past"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero${heroProjection},
	"archive": coalesce(archive[]{
		year,
		"events": coalesce(events[]${eventItemProjection}, [])
	}, []),
	${pageCtasProjection}
}`;

export const eduOverviewQuery = `*[_type == "eduOverview" && slug.current == "edu-overview"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero${heroProjection},
	mission${eduOverviewSectionProjection},
	organization${eduOverviewSectionProjection},
	willDo${eduListGroupProjection},
	willNotDo${eduListGroupProjection},
	unification${eduOverviewSectionProjection},
	incorporation${eduOverviewSectionProjection},
	${pageCtasProjection}
}`;

export const eduBoardQuery = `*[_type == "eduBoard" && slug.current == "edu-board"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero${heroProjection},
	"members": coalesce(members[]{
		role,
		name,
		organization,
		email
	}, []),
	${pageCtasProjection}
}`;

export const eduHistoryQuery = `*[_type == "eduHistory" && slug.current == "edu-history"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero${heroProjection},
	"entries": coalesce(entries[]{
		year,
		title,
		text
	}, []),
	${pageCtasProjection}
}`;

export const contactPageQuery = `*[_type == "eduContact" && slug.current in ["contact", "edu-contact"]] | order(slug.current asc)[0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero${heroProjection},
	"fields": coalesce(fields[]{
		label,
		placeholder,
		name,
		type,
		required,
		full
	}, []),
	directCard${infoCardProjection},
	collaborativeCard${infoCardProjection},
	${pageCtasProjection}
}`;

export const educoreOverviewQuery = `*[_type == "educoreOverview" && slug.current == "educore-overview"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero${heroProjection},
	platform{
		eyebrow,
		heading,
		description,
		"tools": coalesce(tools[]${platformToolProjection}, [])
	},
	${pageCtasProjection}
}`;

export const chromeQuery = `*[_type == "siteChrome"][0]{
	"primaryNav": coalesce(primaryNav[]${linkItemProjection}, []),
	"footerColumns": coalesce(footerColumns[]{
		heading,
		"links": coalesce(links[]${linkItemProjection}, [])
	}, [])
}`;
