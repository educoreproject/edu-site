import {defineField, defineType} from 'sanity'

export const dsuMembers = defineType({
	name: 'dsuMembers',
	title: 'DSU members',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'dsu-members'},
			options: {
				source: () => 'dsu-members'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'activeSection',
			title: 'Active section',
			type: 'string',
			initialValue: 'DSU',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'subNav',
			title: 'Sub navigation',
			type: 'array',
			of: [{type: 'linkItem'}]
		}),
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'videos',
			title: 'Videos',
			type: 'array',
			of: [{type: 'videoTestimonial'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'signatoryMembers',
			title: 'Signatory members',
			type: 'array',
			of: [{type: 'memberOrganization'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'affiliateMembers',
			title: 'Affiliate members',
			type: 'array',
			of: [{type: 'memberOrganization'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'affiliateIntro',
			title: 'Affiliate intro',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'joinCta',
			title: 'Join CTA',
			type: 'joinCta',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		prepare: () => ({
			title: 'DSU members'
		})
	}
})
