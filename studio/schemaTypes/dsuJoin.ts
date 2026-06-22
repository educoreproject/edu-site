import {defineField, defineType} from 'sanity'

export const dsuJoin = defineType({
	name: 'dsuJoin',
	title: 'DSU joining',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'membershipTypes',
			title: 'Membership types',
			type: 'array',
			of: [{type: 'membershipType'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'membershipHeader',
			title: 'Membership header',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'process',
			title: 'Process',
			type: 'object',
			fields: [
				defineField({
					name: 'header',
					title: 'Header',
					type: 'sectionHeader'
				}),
				defineField({
					name: 'steps',
					title: 'Steps',
					type: 'array',
					of: [{type: 'processStep'}],
					validation: (rule) => rule.required().min(1)
				})
			],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'contact',
			title: 'Contact',
			type: 'contactPrompt',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'submissionChecklist',
			title: 'Submission checklist',
			type: 'checklist',
			validation: (rule) => rule.required()
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
			title: 'DSU joining'
		})
	}
})
