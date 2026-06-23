import {defineField, defineType} from 'sanity'

export const resourcesPress = defineType({
	name: 'resourcesPress',
	title: 'Resources press & charter',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the Press & charter page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			description:
				'Controls the Press & charter filter labels. These should match the categories used by the press and charter documents below.',
			type: 'array',
			of: [
				{
					type: 'string',
					options: {
						list: [
							{title: 'Press releases', value: 'Press releases'},
							{title: 'Charters', value: 'Charters'}
						]
					}
				}
			],
			initialValue: ['Press releases', 'Charters'],
			validation: (rule) => rule.required().min(2)
		}),
		defineField({
			name: 'items',
			title: 'Items',
			description:
				'Adds the downloadable press releases and charters shown on the page. Each item includes its category, DSU/EDU/EDUcore type, format, title, description, and uploaded file.',
			type: 'array',
			of: [{type: 'pressDocument'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the Press & charter page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'Resources press & charter'
		})
	}
})
