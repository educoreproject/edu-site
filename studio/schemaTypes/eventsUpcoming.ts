import {defineField, defineType} from 'sanity'

export const eventsUpcoming = defineType({
	name: 'eventsUpcoming',
	title: 'Events upcoming',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'events-upcoming'},
			options: {
				source: () => 'events-upcoming'
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
			name: 'events',
			title: 'Events',
			type: 'array',
			of: [{type: 'eventItem'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'counterLabel',
			title: 'Counter label',
			type: 'string',
			validation: (rule) => rule.required()
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
			title: 'Events upcoming'
		})
	}
})
