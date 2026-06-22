import {defineField, defineType} from 'sanity'

export const dsuJoin = defineType({
	name: 'dsuJoin',
	title: 'DSU joining',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the Joining DSU page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'membershipTypes',
			title: 'Membership types',
			description:
				'Adds the membership option cards on the Joining DSU page. Each item explains one membership path and its action button.',
			type: 'array',
			of: [{type: 'membershipType'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'membershipHeader',
			title: 'Membership header',
			description:
				'Controls the eyebrow, heading, and intro text above the membership type cards.',
			type: 'sectionHeader'
		}),
		defineField({
			name: 'process',
			title: 'Process',
			description:
				'Controls the section that explains how to join DSU, including its heading and the ordered process steps.',
			type: 'object',
			fields: [
				defineField({
					name: 'header',
					title: 'Header',
					description:
						'Controls the eyebrow, heading, and body text above the process steps.',
					type: 'sectionHeader'
				}),
				defineField({
					name: 'steps',
					title: 'Steps',
					description:
						'Adds the process steps visitors follow to join DSU. Keep the order here aligned with the real joining workflow.',
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
			description:
				'Controls the contact prompt shown on the Joining DSU page for visitors who need help or have membership questions.',
			type: 'contactPrompt',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'submissionChecklist',
			title: 'Submission checklist',
			description:
				'Controls the checklist of materials or information visitors should prepare before submitting their joining request.',
			type: 'checklist',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the Joining DSU page. The order here is the order visitors see.',
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
