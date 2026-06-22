import {defineField, defineType} from 'sanity'

export const resourcesGlossary = defineType({
	name: 'resourcesGlossary',
	title: 'Resources glossary',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the Glossary page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			description:
				'Controls the glossary category filters shown in the left-side selector. Category names should match the category entered on glossary terms.',
			type: 'array',
			of: [{type: 'string'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'terms',
			title: 'Terms',
			description:
				'Adds the glossary terms and definitions shown on the page. Each term can be assigned to a category for filtering.',
			type: 'array',
			of: [{type: 'glossaryTerm'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'artifact',
			title: 'Downloadable artifact',
			description:
				'Controls the optional downloadable PDF link shown on the Glossary page, usually for visitors who want the glossary as a file.',
			type: 'object',
			fields: [
				defineField({
					name: 'label',
					title: 'Link label',
					description:
						'Controls the visible text for the glossary PDF download link.',
					type: 'string',
					validation: (rule) => rule.required()
				}),
				defineField({
					name: 'file',
					title: 'PDF file',
					description:
						'Uploads the PDF visitors download from the Glossary page.',
					type: 'file',
					options: {
						accept: 'application/pdf'
					},
					validation: (rule) => rule.required()
				})
			]
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the Glossary page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'Resources glossary'
		})
	}
})
