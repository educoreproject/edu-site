import {defineField, defineType} from 'sanity'

export const resourcesFaq = defineType({
	name: 'resourcesFaq',
	title: 'Resources FAQ',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the FAQ page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			description:
				'Controls the FAQ category filters shown in the left-side selector. Category names should match the category entered on FAQ items.',
			type: 'array',
			of: [{type: 'string'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'items',
			title: 'Items',
			description:
				'Adds the FAQ questions and answers shown on the page. Each item can be assigned to a category for filtering.',
			type: 'array',
			of: [{type: 'faqItem'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the FAQ page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'Resources FAQ'
		})
	}
})
