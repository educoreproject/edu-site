import {defineField, defineType} from 'sanity'

export const eduOverview = defineType({
	name: 'eduOverview',
	title: 'EDU overview',
	type: 'document',
	fields: [
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
			title: 'EDU overview'
		})
	}
})
