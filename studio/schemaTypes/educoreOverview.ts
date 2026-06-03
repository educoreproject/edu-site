import {defineField, defineType} from 'sanity'

export const educoreOverview = defineType({
	name: 'educoreOverview',
	title: 'EDUcore overview',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'educore-overview'},
			options: {
				source: () => 'educore-overview'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'activeSection',
			title: 'Active section',
			type: 'string',
			initialValue: 'EDUcore',
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
			name: 'platform',
			title: 'Platform',
			type: 'object',
			fields: [
				defineField({
					name: 'eyebrow',
					title: 'Eyebrow',
					type: 'string',
					validation: (rule) => rule.required()
				}),
				defineField({
					name: 'heading',
					title: 'Heading',
					type: 'string',
					validation: (rule) => rule.required()
				}),
				defineField({
					name: 'description',
					title: 'Description',
					type: 'text',
					rows: 3,
					validation: (rule) => rule.required()
				}),
				defineField({
					name: 'tools',
					title: 'Tools',
					type: 'array',
					of: [{type: 'platformTool'}],
					validation: (rule) => rule.required().min(4)
				})
			],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'ctaBand',
			title: 'CTA band',
			type: 'ctaBand',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		prepare: () => ({
			title: 'EDUcore overview'
		})
	}
})
