import {defineField} from 'sanity'

// Shared per-page header-logo override field. Added to page document types so an
// individual page can override its section's logo and the global default.
// Resolution order in the front end: page.headerLogo -> section (sitePage) -> siteChrome.logo.
export const headerLogoField = defineField({
	name: 'headerLogo',
	title: 'Header logo (this page)',
	description:
		'Optional. Overrides the section and default logo for just this page. Leave blank to inherit the section or default logo.',
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
})
