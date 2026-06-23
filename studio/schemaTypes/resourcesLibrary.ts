import {defineField, defineType} from 'sanity'

export const resourcesLibrary = defineType({
	name: 'resourcesLibrary',
	title: 'Resources library',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the Resources library page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			description:
				'Controls the Resources library filter labels. These should match the categories used by the library documents below.',
			type: 'array',
			of: [
				{
					type: 'string',
					options: {
						list: [
							{title: 'White papers', value: 'White papers'},
							{title: 'Reports', value: 'Reports'}
						]
					}
				}
			],
			initialValue: ['White papers', 'Reports'],
			validation: (rule) => rule.required().min(2)
		}),
		defineField({
			name: 'items',
			title: 'Items',
			description:
				'Adds the downloadable resources shown in the library. Each item includes its category, DSU/EDU/EDUcore type, format, title, description, and uploaded file.',
			type: 'array',
			of: [{type: 'resourceDocument'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the Resources library page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'Resources library'
		})
	}
})
