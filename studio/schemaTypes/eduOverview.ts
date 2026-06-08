import {defineField, defineType} from 'sanity'

export const eduOverview = defineType({
	name: 'eduOverview',
	title: 'EDU overview',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'edu-overview'},
			options: {
				source: () => 'edu-overview'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'activeSection',
			title: 'Active section',
			type: 'string',
			initialValue: 'About EDU',
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
			name: 'mission',
			title: 'Mission',
			type: 'eduOverviewSection',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'organization',
			title: 'Organization',
			type: 'eduOverviewSection',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'willDo',
			title: 'Things EDU will do',
			type: 'eduListGroup',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'willNotDo',
			title: 'Things EDU will not do',
			type: 'eduListGroup',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'unification',
			title: 'Unification',
			type: 'eduOverviewSection',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'incorporation',
			title: 'Incorporation',
			type: 'eduOverviewSection',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		prepare: () => ({
			title: 'EDU overview'
		})
	}
})
