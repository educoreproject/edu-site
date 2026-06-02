import {defineField, defineType} from 'sanity'

export const dsuJoin = defineType({
	name: 'dsuJoin',
	title: 'DSU joining',
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			initialValue: {current: 'dsu-joining'},
			options: {
				source: () => 'dsu-joining'
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
			name: 'membershipTypes',
			title: 'Membership types',
			type: 'array',
			of: [{type: 'membershipType'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'process',
			title: 'Process',
			type: 'object',
			fields: [
				defineField({
					name: 'eyebrow',
					title: 'Eyebrow',
					type: 'string',
					validation: (rule) => rule.required()
				}),
				defineField({
					name: 'heading',
					title: 'Heading',
					type: 'string',
					validation: (rule) => rule.required()
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
		})
	],
	preview: {
		prepare: () => ({
			title: 'DSU joining'
		})
	}
})
