import {defineField, defineType} from 'sanity'

export const eduContact = defineType({
	name: 'eduContact',
	title: 'Contact page',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'fields',
			title: 'Fields',
			type: 'array',
			of: [{type: 'contactField'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'directCard',
			title: 'Direct card',
			type: 'infoCard',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'collaborativeCard',
			title: 'Collaborative card',
			type: 'infoCard',
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
			title: 'Contact page'
		})
	}
})
