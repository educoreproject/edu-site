import {defineField, defineType} from 'sanity'

export const eduOverview = defineType({
	name: 'eduOverview',
	title: 'EDU overview',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the EDU overview page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'mission',
			title: 'Mission',
			description:
				'Controls the mission section on the EDU overview page, including its eyebrow, heading, and paragraphs.',
			type: 'eduOverviewSection',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'organization',
			title: 'Organization',
			description:
				'Controls the organization section that explains how EDU is structured or how the work is organized.',
			type: 'eduOverviewSection',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'willDo',
			title: 'Things EDU will do',
			description:
				'Controls the list group that tells visitors what EDU will take on. Each item appears as a visible list entry.',
			type: 'eduListGroup',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'willNotDo',
			title: 'Things EDU will not do',
			description:
				'Controls the list group that clarifies what EDU will not take on. Each item appears as a visible list entry.',
			type: 'eduListGroup',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'unification',
			title: 'Unification',
			description:
				'Controls the unification section on the EDU overview page, including its heading and explanatory paragraphs.',
			type: 'eduOverviewSection',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'incorporation',
			title: 'Incorporation',
			description:
				'Controls the incorporation section on the EDU overview page, including its heading and explanatory paragraphs.',
			type: 'eduOverviewSection',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the EDU overview page. The order here is the order visitors see.',
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
