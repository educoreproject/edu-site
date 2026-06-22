import {defineField, defineType} from 'sanity'

export const eventsUpcoming = defineType({
	name: 'eventsUpcoming',
	title: 'Events upcoming',
	type: 'document',
	fields: [
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
			name: 'ctas',
			title: 'CTAs',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'Events upcoming'
		})
	}
})
