import {defineField, defineType} from 'sanity'

export const resourcesGlossary = defineType({
	name: 'resourcesGlossary',
	title: 'Resources glossary',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'resources-glossary'},
			options: {
				source: () => 'resources-glossary'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'activeSection',
			title: 'Active section',
			type: 'string',
			initialValue: 'Resources',
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
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [{type: 'string'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'terms',
			title: 'Terms',
			type: 'array',
			of: [{type: 'glossaryTerm'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'newsletter',
			title: 'Newsletter',
			type: 'newsletterBand',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		prepare: () => ({
			title: 'Resources glossary'
		})
	}
})
