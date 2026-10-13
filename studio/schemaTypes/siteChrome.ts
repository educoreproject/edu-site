import {defineField, defineType} from 'sanity'

export const siteChrome = defineType({
	name: 'siteChrome',
	title: 'Site chrome',
	type: 'document',
	fields: [
		defineField({
			name: 'logo',
			title: 'Default header logo',
			description:
				'Shown in the site header when a section or page has no logo of its own. This is the site-wide fallback.',
			type: 'image',
			options: {hotspot: true},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description: 'Describes the logo for screen reader users.'
				})
			]
		}),
		defineField({
			name: 'primaryNav',
			title: 'Primary navigation',
			description:
				'Controls the main top-level navigation links shown in the site header. Use this only for global links that should appear across the site.',
			type: 'array',
			of: [{type: 'linkItem'}]
		}),
		defineField({
			name: 'footerColumns',
			title: 'Footer columns',
			description:
				'Controls the grouped footer link columns shown at the bottom of the site. Each column has its own heading and set of links.',
			type: 'array',
			of: [{type: 'footerColumn'}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'Site chrome'
		})
	}
})
