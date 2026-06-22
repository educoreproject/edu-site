import {defineField, defineType} from 'sanity'

export const resourcesNewsletter = defineType({
	name: 'resourcesNewsletter',
	title: 'Resources newsletter',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the Newsletter archive page, including the label, headline, optional summary, and hero buttons.',
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
			description:
				'Adds the newsletter files shown in the archive. Each item includes its month/year category, title, document type, description, and uploaded file.',
			type: 'array',
			of: [{type: 'newsletterDocument'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the Newsletter archive page. The order here is the order visitors see.',
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
