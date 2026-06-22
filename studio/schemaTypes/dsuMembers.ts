import {defineField, defineType} from 'sanity'

export const dsuMembers = defineType({
	name: 'dsuMembers',
	title: 'DSU members',
	type: 'document',
	fields: [
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
			name: 'videosHeader',
			title: 'Videos header',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'signatoryMembers',
			title: 'Signatory members',
			type: 'array',
			of: [{type: 'memberOrganization'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'signatoryMembersHeader',
			title: 'Signatory members header',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'affiliateMembers',
			title: 'Affiliate members',
			type: 'array',
			of: [{type: 'memberOrganization'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'affiliateMembersHeader',
			title: 'Affiliate members header',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'affiliateIntro',
			title: 'Affiliate intro',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
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
