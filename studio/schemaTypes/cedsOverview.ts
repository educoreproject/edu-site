import {defineField, defineType} from 'sanity'

export const cedsOverview = defineType({
	name: 'cedsOverview',
	title: 'CEDS overview',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'logoImage',
			title: 'Logo image',
			type: 'image',
			options: {
				hotspot: false
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description: 'Defaults to Common Education Data Standards when left blank.'
				})
			]
		}),
		defineField({
			name: 'overview',
			title: 'Overview',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'reasons',
			title: 'Reasons to use CEDS',
			type: 'array',
			of: [{type: 'textBlock'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'dataModels',
			title: 'Data models',
			type: 'array',
			of: [{type: 'textBlock'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'community',
			title: 'Open source community',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'learningLinks',
			title: 'Learning links',
			type: 'array',
			of: [{type: 'resourceCard'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'exchange',
			title: 'Collaborative exchange',
			type: 'sectionHeader',
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
			title: 'CEDS overview'
		})
	}
})
