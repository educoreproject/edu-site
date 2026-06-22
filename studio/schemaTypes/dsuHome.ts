import {defineField, defineType} from 'sanity'

export const dsuHome = defineType({
	name: 'dsuHome',
	title: 'DSU home',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the DSU overview page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'pillars',
			title: 'Pillars',
			description:
				'Adds the visible DSU pillar blocks below the hero. Each item should explain one major idea visitors need to understand about DSU.',
			type: 'array',
			of: [{type: 'textBlock'}]
		}),
		defineField({
			name: 'pillarsHeader',
			title: 'Pillars header',
			description:
				'Controls the eyebrow, heading, and optional intro text that appear above the DSU pillars.',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'valuesHeader',
			title: 'Values header',
			description:
				'Controls the heading area for the numbered values section on the DSU overview page.',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'values',
			title: 'Values',
			description:
				'Adds the numbered value cards shown in the DSU values section. The order here controls the numbering order visitors see.',
			type: 'array',
			of: [{type: 'numberedValue'}]
		}),
		defineField({
			name: 'initiative',
			title: 'Initiative',
			description:
				'Controls the initiative section, including its section header and the list of initiative items displayed together on the page.',
			type: 'object',
			fields: [
				defineField({
					name: 'header',
					title: 'Header',
					description:
						'Controls the eyebrow, heading, and body text at the top of the initiative section.',
					type: 'sectionHeader'
				}),
				defineField({
					name: 'items',
					title: 'Items',
					description:
						'Adds the individual initiative statements listed in this section. Each entry appears as a separate item on the live page.',
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
			description:
				'Controls the heading area for the voices or testimonial section on the DSU overview page.',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'voices',
			title: 'Voices',
			description:
				'Adds the quoted testimonials shown in the voices section. Each item includes the quote, person, and organization.',
			type: 'array',
			of: [{type: 'quote'}]
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the DSU overview page. The order here is the order visitors see.',
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
