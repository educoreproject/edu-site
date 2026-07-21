import {defineArrayMember, defineField, defineType} from 'sanity'

export const timeline = defineType({
	name: 'timeline',
	title: 'Impact / Milestones timeline',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the milestones page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'milestones',
			title: 'Milestones',
			description:
				'Each milestone appears on the timeline. Milestones sharing a group value collapse and expand together.',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'milestone',
					fields: [
						defineField({
							name: 'group',
							title: 'Group (collapse bucket)',
							description:
								'Milestones sharing this value collapse/expand together, and it is used as the bucket header. Use a YEAR ("2021", "2026") for coarse grouping, or a MONTH ("June 2021") for finer grouping.',
							type: 'string',
							validation: (rule) => rule.required()
						}),
						defineField({
							name: 'displayDate',
							title: 'Display date',
							description:
								'The date shown on the entry itself, e.g. "June 2021", "2021–2024", "Spring 2026", "What’s next".',
							type: 'string'
						}),
						defineField({
							name: 'sortOrder',
							title: 'Sort order',
							description:
								'Lower numbers appear first (controls order across the whole timeline).',
							type: 'number'
						}),
						defineField({
							name: 'heading',
							title: 'Heading',
							type: 'string',
							validation: (rule) => rule.required()
						}),
						defineField({
							name: 'body',
							title: 'Body',
							type: 'array',
							of: [
								{
									type: 'block',
									styles: [{title: 'Normal', value: 'normal'}],
									lists: [{title: 'Bulleted list', value: 'bullet'}],
									marks: {
										decorators: [
											{title: 'Bold', value: 'strong'},
											{title: 'Italic', value: 'em'}
										],
										annotations: []
									}
								}
							]
						})
					],
					preview: {
						select: {title: 'heading', subtitle: 'displayDate'}
					}
				})
			]
		})
	],
	preview: {
		prepare: () => ({
			title: 'Impact / Milestones timeline'
		})
	}
})
