import {defineField, defineType} from 'sanity'

export const resourcesPress = defineType({
	name: 'resourcesPress',
	title: 'Resources press & charter',
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
			type: 'array',
			of: [{type: 'pressDocument'}],
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
			title: 'Resources press & charter'
		})
	}
})
