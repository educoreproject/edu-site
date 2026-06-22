import {defineField, defineType} from 'sanity'

export const eduHistory = defineType({
	name: 'eduHistory',
	title: 'EDU history',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the EDU history page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'entries',
			title: 'Entries',
			description:
				'Adds the timeline entries shown on the EDU history page. The order here controls the order visitors read the history.',
			type: 'array',
			of: [{type: 'timelineEntry'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the EDU history page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'EDU history'
		})
	}
})
