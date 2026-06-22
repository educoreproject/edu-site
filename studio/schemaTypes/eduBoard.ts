import {defineField, defineType} from 'sanity'

export const eduBoard = defineType({
	name: 'eduBoard',
	title: 'EDU board',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'members',
			title: 'Members',
			type: 'array',
			of: [{type: 'boardMember'}],
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
			title: 'EDU board'
		})
	}
})
