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

export const dsuHomeQuery = `*[_type == "dsuHome" && slug.current == "dsu-home"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero{
		chip,
		title,
		description,
		"ctas": coalesce(ctas[]${ctaProjection}, [])
	},
	"pillars": coalesce(pillars[]{
		label,
		text
	}, []),
	"values": coalesce(values[]{
		number,
		title,
		description
	}, []),
	initiative{
		heading,
		"items": coalesce(items, [])
	},
	"voices": coalesce(voices[]{
		quote,
		name,
		organization
	}, [])
}`;

export const dsuMembersQuery = `*[_type == "dsuMembers" && slug.current == "dsu-members"][0]{
	"slug": slug.current,
	activeSection,
	"subNav": coalesce(subNav[]${linkItemProjection}, []),
	hero{
		chip,
		title,
		description,
		"ctas": coalesce(ctas[]${ctaProjection}, [])
	},
	"videos": coalesce(videos[]{
		name,
		title,
		organization,
		provider,
		url
	}, []),
	"signatoryMembers": coalesce(signatoryMembers[]{
		name,
		url,
		logoLabel,
		logoColor
	}, []),
	"affiliateMembers": coalesce(affiliateMembers[]{
		name,
		url,
		logoLabel,
		logoColor
	}, []),
	affiliateIntro,
	joinCta{
		heading,
		description,
		cta${ctaProjection}
	}
}`;

export const chromeQuery = `*[_type == "siteChrome"][0]{
	"primaryNav": coalesce(primaryNav[]${linkItemProjection}, []),
	"footerColumns": coalesce(footerColumns[]{
		heading,
		"links": coalesce(links[]${linkItemProjection}, [])
	}, [])
}`;
