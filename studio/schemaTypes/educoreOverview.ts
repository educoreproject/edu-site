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
			name: 'useCasesHeader',
			title: 'Use cases header',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'useCases',
			title: 'Use cases',
			type: 'array',
			of: [{type: 'educoreFeatureCard'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'why',
			title: 'Why EDUcore',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'workingTowardHeading',
			title: 'Working toward heading',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'workingTowardItems',
			title: 'Working toward items',
			type: 'array',
			of: [{type: 'textBlock'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'phaseOneHeader',
			title: 'Phase 1 header',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'phaseOneDeliverables',
			title: 'Phase 1 deliverables',
			type: 'array',
			of: [{type: 'textBlock'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'standardsAlignment',
			title: 'Standards alignment',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'aiBakeoffHeader',
			title: 'AI bakeoff header',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'aiBakeoffDemos',
			title: 'AI bakeoff demos',
			type: 'array',
			of: [{type: 'educoreDemo'}],
			validation: (rule) => rule.required().min(1)
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
			title: 'EDUcore overview'
		})
	}
})
