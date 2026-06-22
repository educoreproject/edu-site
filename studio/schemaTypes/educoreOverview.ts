import {defineField, defineType} from 'sanity'

export const educoreOverview = defineType({
	name: 'educoreOverview',
	title: 'EDUcore overview',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the EDUcore page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'useCasesHeader',
			title: 'Use cases header',
			description:
				'Controls the eyebrow, heading, and intro text above the EDUcore use case cards.',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'useCases',
			title: 'Use cases',
			description:
				'Adds the use case cards on the EDUcore page. Each card explains one audience need or scenario the product supports.',
			type: 'array',
			of: [{type: 'educoreFeatureCard'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'why',
			title: 'Why EDUcore',
			description:
				'Controls the section that explains why EDUcore matters, including the heading and supporting body copy.',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'workingTowardHeading',
			title: 'Working toward heading',
			description:
				'Controls the visible heading above the list of things EDUcore is working toward.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'workingTowardItems',
			title: 'Working toward items',
			description:
				'Adds the text blocks under the working toward heading. Each item explains one goal or capability in progress.',
			type: 'array',
			of: [{type: 'textBlock'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'phaseOneHeader',
			title: 'Phase 1 header',
			description:
				'Controls the heading and intro copy for the Phase 1 deliverables section.',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'phaseOneDeliverables',
			title: 'Phase 1 deliverables',
			description:
				'Adds the Phase 1 deliverable blocks shown on the EDUcore page. Each item explains one expected deliverable.',
			type: 'array',
			of: [{type: 'textBlock'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'standardsAlignment',
			title: 'Standards alignment',
			description:
				'Controls the section that explains how EDUcore aligns with data standards and related efforts.',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'aiBakeoffHeader',
			title: 'AI bakeoff header',
			description:
				'Controls the heading and intro copy above the AI bakeoff demo list.',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'aiBakeoffDemos',
			title: 'AI bakeoff demos',
			description:
				'Adds the AI bakeoff demo cards, including presenter details, thumbnail images, descriptions, and video links.',
			type: 'array',
			of: [{type: 'educoreDemo'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the EDUcore page. The order here is the order visitors see.',
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
