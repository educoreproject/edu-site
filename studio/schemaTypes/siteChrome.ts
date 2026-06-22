import {defineField, defineType} from 'sanity'

export const siteChrome = defineType({
	name: 'siteChrome',
	title: 'Site chrome',
	type: 'document',
	fields: [
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
