import {defineField, defineType} from 'sanity'

export const resourcesHub = defineType({
	name: 'resourcesHub',
	title: 'Resources hub',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the Resources hub page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			description:
				'Controls the small label above the Resources hub card section heading.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			description:
				'Controls the main heading above the Resources hub cards.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'cards',
			title: 'Cards',
			description:
				'Adds the resource cards that send visitors to library, glossary, FAQ, press, newsletter, or external resources.',
			type: 'array',
			of: [{type: 'resourceCard'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the Resources hub page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'Resources hub'
		})
	}
})
