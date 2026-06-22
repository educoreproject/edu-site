import {defineField, defineType} from 'sanity'

export const dsuProjects = defineType({
	name: 'dsuProjects',
	title: 'DSU projects',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'projects',
			title: 'Projects',
			type: 'array',
			of: [{type: 'dsuProject'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'projectsHeader',
			title: 'Projects header',
			type: 'sectionHeader'
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
			title: 'DSU projects'
		})
	}
})
