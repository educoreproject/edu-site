import {defineField, defineType} from 'sanity'

export const eduHistory = defineType({
	name: 'eduHistory',
	title: 'EDU history',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'edu-history'},
			options: {
				source: () => 'edu-history'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'activeSection',
			title: 'Active section',
			type: 'string',
			initialValue: 'About EDU',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'subNav',
			title: 'Sub navigation',
			type: 'array',
			of: [{type: 'linkItem'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'entries',
			title: 'Entries',
			type: 'array',
			of: [{type: 'timelineEntry'}],
			validation: (rule) => rule.required().min(1)
		})
	],
	preview: {
		prepare: () => ({
			title: 'EDU history'
		})
	}
})
