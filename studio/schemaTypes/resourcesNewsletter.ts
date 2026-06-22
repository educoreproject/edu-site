import {defineField, defineType} from 'sanity'

export const resourcesNewsletter = defineType({
	name: 'resourcesNewsletter',
	title: 'Resources newsletter',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			description: 'Use month and year labels such as January 2026 or December 2025.',
			type: 'array',
			of: [{type: 'string'}],
			initialValue: ['January 2026', 'December 2025'],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'items',
			title: 'Items',
			type: 'array',
			of: [{type: 'newsletterDocument'}],
			validation: (rule) => rule.required().min(1)
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
			title: 'Resources newsletter'
		})
	}
})
