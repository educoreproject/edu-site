import {defineField, defineType} from 'sanity'

export const dsuBoard = defineType({
	name: 'dsuBoard',
	title: 'DSU Board',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the DSU board page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'members',
			title: 'Members',
			description:
				'Adds the board member entries shown on the DSU board page. Each item includes the role, person name, and optional contact details.',
			type: 'array',
			of: [{type: 'boardMember'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the DSU board page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'DSU Board'
		})
	}
})
