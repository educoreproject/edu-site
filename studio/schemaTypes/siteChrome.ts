import {defineField, defineType} from 'sanity'

export const siteChrome = defineType({
	name: 'siteChrome',
	title: 'Site chrome',
	type: 'document',
	fields: [
		defineField({
			name: 'primaryNav',
			title: 'Primary navigation',
			type: 'array',
			of: [{type: 'linkItem'}]
		}),
		defineField({
			name: 'footerColumns',
			title: 'Footer columns',
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
