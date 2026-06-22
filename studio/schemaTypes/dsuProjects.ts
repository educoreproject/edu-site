import {defineField, defineType} from 'sanity'

export const dsuProjects = defineType({
	name: 'dsuProjects',
	title: 'DSU projects',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the DSU projects page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'projects',
			title: 'Projects',
			description:
				'Adds the project cards or logo links shown on the DSU projects page. Each item represents one project visitors can open.',
			type: 'array',
			of: [{type: 'dsuProject'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'projectsHeader',
			title: 'Projects header',
			description:
				'Controls the eyebrow, heading, and intro text above the project list.',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the DSU projects page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'DSU projects'
		})
	}
})
