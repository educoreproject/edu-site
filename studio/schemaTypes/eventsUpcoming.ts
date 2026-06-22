import {defineField, defineType} from 'sanity'

export const eventsUpcoming = defineType({
	name: 'eventsUpcoming',
	title: 'Events upcoming',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the Upcoming events page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'events',
			title: 'Events',
			description:
				'Adds the upcoming event cards shown on the Events page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'eventItem'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'counterLabel',
			title: 'Counter label',
			description:
				'Controls the small label paired with the upcoming events count, for example the word that describes what is being counted.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the Upcoming events page. The order here is the order visitors see.',
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
