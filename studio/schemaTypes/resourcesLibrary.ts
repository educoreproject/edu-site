import {defineField, defineType} from 'sanity'

export const resourcesLibrary = defineType({
	name: 'resourcesLibrary',
	title: 'Resources library',
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
			type: 'array',
			of: [{type: 'resourceDocument'}],
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
			title: 'Resources library'
		})
	}
})
