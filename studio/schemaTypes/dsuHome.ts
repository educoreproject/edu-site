import {defineField, defineType} from 'sanity'

export const dsuHome = defineType({
	name: 'dsuHome',
	title: 'DSU home',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'dsu-home'},
			options: {
				source: () => 'dsu-home'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'activeSection',
			title: 'Active section',
			type: 'string',
			initialValue: 'DSU',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'subNav',
			title: 'Sub navigation',
			type: 'array',
			of: [{type: 'linkItem'}]
		}),
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'pillars',
			title: 'Pillars',
			type: 'array',
			of: [{type: 'textBlock'}]
		}),
		defineField({
			name: 'pillarsHeader',
			title: 'Pillars header',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'valuesHeader',
			title: 'Values header',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'values',
			title: 'Values',
			type: 'array',
			of: [{type: 'numberedValue'}]
		}),
		defineField({
			name: 'initiative',
			title: 'Initiative',
			type: 'object',
			fields: [
				defineField({
					name: 'header',
					title: 'Header',
					type: 'sectionHeader'
				}),
				defineField({
					name: 'items',
					title: 'Items',
					type: 'array',
					of: [{type: 'string'}],
					validation: (rule) => rule.required().min(1)
				})
			],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'voicesHeader',
			title: 'Voices header',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'voices',
			title: 'Voices',
			type: 'array',
			of: [{type: 'quote'}]
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
			title: 'DSU home'
		})
	}
})
