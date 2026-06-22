import {defineField, defineType} from 'sanity'

export const eventsPast = defineType({
	name: 'eventsPast',
	title: 'Events past',
	type: 'document',
	fields: [
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
			name: 'ctas',
			title: 'CTAs',
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
