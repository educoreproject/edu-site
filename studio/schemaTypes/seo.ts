import {defineField, defineType} from 'sanity'

// Reusable per-page SEO / social-sharing settings. Added to every public page
// document type via `seoField`. All fields are optional; the front end falls back
// to the page hero and site defaults when they are blank.
export const seo = defineType({
	name: 'seo',
	title: 'SEO & sharing',
	type: 'object',
	options: {collapsible: true, collapsed: true},
	fields: [
		defineField({
			name: 'metaTitle',
			title: 'Meta title',
			type: 'string',
			description:
				'Overrides the browser/tab title and search result title. Falls back to the page hero title if blank. ~60 chars.',
			validation: (rule) => rule.max(70).warning('Aim for about 60 characters.')
		}),
		defineField({
			name: 'metaDescription',
			title: 'Meta description',
			type: 'text',
			rows: 3,
			description:
				'Search result and social preview summary. Falls back to the hero description if blank. ~155 chars.',
			validation: (rule) => rule.max(180).warning('Aim for about 155 characters.')
		}),
		defineField({
			name: 'ogImage',
			title: 'Social share image',
			type: 'image',
			options: {hotspot: true},
			description:
				'Image shown when the page is shared on social, Slack, or email. Falls back to the site default if blank. 1200×630 ideal.'
		}),
		defineField({
			name: 'noIndex',
			title: 'Hide from search engines',
			type: 'boolean',
			initialValue: false,
			description: 'When enabled, asks search engines not to index this page.'
		})
	]
})

// Shared field definition added to each page document type (placed last).
export const seoField = defineField({
	name: 'seo',
	title: 'SEO & sharing',
	type: 'seo'
})
