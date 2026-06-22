import {defineField, defineType} from 'sanity'

export const eventsPast = defineType({
	name: 'eventsPast',
	title: 'Events past',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the Past events page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'archive',
			title: 'Archive',
			description:
				'Adds the year-grouped past event lists shown on the Past events page. Each archive group contains the events for one year.',
			type: 'array',
			of: [{type: 'eventArchiveGroup'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the Past events page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'Events past'
		})
	}
})
