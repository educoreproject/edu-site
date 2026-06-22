import {defineField, defineType} from 'sanity'

export const dsuMembers = defineType({
	name: 'dsuMembers',
	title: 'DSU members',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the DSU members page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'videos',
			title: 'Videos',
			description:
				'Adds the member video testimonials displayed on the DSU members page. Each item should represent one person and video.',
			type: 'array',
			of: [{type: 'videoTestimonial'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'videosHeader',
			title: 'Videos header',
			description:
				'Controls the heading area above the member video testimonials section.',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'signatoryMembers',
			title: 'Signatory members',
			description:
				'Adds the signatory member organizations shown on the page, including names, links, and optional logos.',
			type: 'array',
			of: [{type: 'memberOrganization'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'signatoryMembersHeader',
			title: 'Signatory members header',
			description:
				'Controls the heading and intro copy above the signatory member organization list.',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'affiliateMembers',
			title: 'Affiliate members',
			description:
				'Adds the affiliate member organizations shown on the page, including names, links, and optional logos.',
			type: 'array',
			of: [{type: 'memberOrganization'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'affiliateMembersHeader',
			title: 'Affiliate members header',
			description:
				'Controls the heading and intro copy above the affiliate member organization list.',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'affiliateIntro',
			title: 'Affiliate intro',
			description:
				'Adds the short paragraph that introduces the affiliate members section before the organization list.',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the DSU members page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'DSU members'
		})
	}
})
