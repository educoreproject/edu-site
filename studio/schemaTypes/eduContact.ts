import {defineField, defineType} from 'sanity'

export const eduContact = defineType({
	name: 'eduContact',
	title: 'Contact page',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'contact'},
			options: {
				source: () => 'contact'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'activeSection',
			title: 'Active section',
			type: 'string',
			initialValue: 'Contact',
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
		})
	],
	preview: {
		prepare: () => ({
			title: 'Contact page'
		})
	}
})
