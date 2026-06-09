import {defineField, defineType} from 'sanity'

export const dsuProjects = defineType({
	name: 'dsuProjects',
	title: 'DSU projects',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'dsu-projects'},
			options: {
				source: () => 'dsu-projects'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'activeSection',
			title: 'Active section',
			type: 'string',
			initialValue: 'DSU',
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
			name: 'joinCta',
			title: 'Join CTA',
			type: 'joinCta',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		prepare: () => ({
			title: 'DSU projects'
		})
	}
})
