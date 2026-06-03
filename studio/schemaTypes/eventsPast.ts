import {defineField, defineType} from 'sanity'

export const eventsPast = defineType({
	name: 'eventsPast',
	title: 'Events past',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'events-past'},
			options: {
				source: () => 'events-past'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'activeSection',
			title: 'Active section',
			type: 'string',
			initialValue: 'Events',
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
			name: 'archive',
			title: 'Archive',
			type: 'array',
			of: [{type: 'eventArchiveGroup'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'newsletter',
			title: 'Newsletter',
			type: 'newsletterBand',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		prepare: () => ({
			title: 'Events past'
		})
	}
})
