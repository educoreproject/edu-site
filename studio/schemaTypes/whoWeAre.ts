import {defineArrayMember, defineField, defineType} from 'sanity'
import {seoField} from './seo'
import {headerLogoField} from './headerLogo'

export const whoWeAre = defineType({
	name: 'whoWeAre',
	title: 'Who We Are',
	type: 'document',
	fields: [
		headerLogoField,
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the Who We Are page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'members',
			title: 'Team members',
			description: 'The people shown on the Who We Are page. Drag to reorder.',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'teamMember',
					fields: [
						defineField({
							name: 'name',
							title: 'Name',
							type: 'string',
							validation: (rule) => rule.required()
						}),
						defineField({
							name: 'role',
							title: 'Role / title',
							description: 'Optional. Shown in teal caps under the name, e.g. "Project Director".',
							type: 'string'
						}),
						defineField({
							name: 'affiliation',
							title: 'Affiliation',
							description: 'Optional. Shown under the role, e.g. "Founder and CEO, AcademyOne".',
							type: 'string'
						}),
						defineField({
							name: 'photo',
							title: 'Photo',
							description:
								'Optional headshot. When blank, the card shows the person’s initials instead.',
							type: 'image',
							options: {hotspot: true},
							fields: [
								defineField({
									name: 'alt',
									title: 'Alternative text',
									type: 'string',
									description: 'Describes the photo for screen reader users. Defaults to the name.'
								})
							]
						}),
						defineField({
							name: 'bio',
							title: 'Bio',
							description: 'Optional. One or more paragraphs about this person.',
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
						select: {title: 'name', subtitle: 'role', media: 'photo'}
					}
				})
			]
		}),
		seoField
	],
	preview: {
		prepare: () => ({
			title: 'Who We Are'
		})
	}
})
