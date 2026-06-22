import {defineField, defineType} from 'sanity'

export const cedsOverview = defineType({
	name: 'cedsOverview',
	title: 'CEDS overview',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large page introduction at the top of the CEDS page, including the label, headline, optional summary, and any hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'logoImage',
			title: 'Logo image',
			description:
				'Displays the CEDS logo or mark in the overview area of the live page. Use the official asset so the brand treatment stays consistent.',
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
			description:
				'Controls the first explanatory content block after the hero. This is the main overview copy visitors read before the supporting sections.',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'reasons',
			title: 'Reasons to use CEDS',
			description:
				'Adds the reason cards that explain why visitors should use CEDS. Each item becomes a visible card or text block in this section.',
			type: 'array',
			of: [{type: 'textBlock'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'dataModels',
			title: 'Data models',
			description:
				'Adds the data model explanation blocks on the CEDS page. Use these to describe the model types or resources visitors can explore.',
			type: 'array',
			of: [{type: 'textBlock'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'community',
			title: 'Open source community',
			description:
				'Controls the section that introduces the open source community around CEDS, including its heading and body text.',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'learningLinks',
			title: 'Learning links',
			description:
				'Adds the resource cards that point visitors to CEDS learning materials. Each card includes its own label, copy, and link.',
			type: 'array',
			of: [{type: 'resourceCard'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'exchange',
			title: 'Collaborative exchange',
			description:
				'Controls the final explanatory section about collaborative exchange on the CEDS page.',
			type: 'sectionHeader',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the CEDS page. The order here is the order visitors see.',
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
