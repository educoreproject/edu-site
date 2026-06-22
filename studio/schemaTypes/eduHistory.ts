import {defineField, defineType} from 'sanity'

export const eduHistory = defineType({
	name: 'eduHistory',
	title: 'EDU history',
	type: 'document',
	fields: [
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
			title: 'EDU history'
		})
	}
})
