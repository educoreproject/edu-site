import {defineField, defineType} from 'sanity'
import {routePageOptions, sectionOptions} from './routePageOptions'

type LinkDestinationValue = {
	type?: 'internalPage' | 'externalUrl' | 'download' | 'anchor'
	pageKey?: string
	href?: string
	file?: unknown
	anchorId?: string
}

type SitePageValue = {
	sectionKey?: string
	routePageKey?: string
}

export function isValidExternalHref(href?: string) {
	const value = href?.trim()

	if (!value) {
		return false
	}

	if (value !== href || /[\s\x00-\x1F\x7F]/.test(value)) {
		return false
	}

	if (value === '#') {
		return true
	}

	if (value.startsWith('//')) {
		if (!/^\/\/[^/?#]+/.test(value)) {
			return false
		}

		try {
			const url = new URL(value, 'https://example.invalid')
			return Boolean(url.hostname)
		} catch {
			return false
		}
	}

	if (value.startsWith('mailto:') || value.startsWith('tel:')) {
		const [, destination = ''] = value.split(':')
		return destination.length > 0
	}

	try {
		const url = new URL(value)
		return ['http:', 'https:'].includes(url.protocol) && Boolean(url.hostname)
	} catch {
		return false
	}
}

function validateLinkDestination(value?: LinkDestinationValue) {
	if (!value?.type) {
		return 'Choose a destination type.'
	}

	if (value.type === 'internalPage' && !value.pageKey) {
		return 'Choose the internal page this link should use.'
	}

	if (value.type === 'externalUrl' && !isValidExternalHref(value.href)) {
		return 'Enter # or a valid external URL.'
	}

	if (value.type === 'download' && !value.file) {
		return 'Choose the file this link should download.'
	}

	if (value.type === 'anchor' && !value.anchorId?.trim()) {
		return 'Enter the anchor ID this link should use.'
	}

	return true
}

function validateRoutePageSection(value?: string, context?: {document?: SitePageValue}) {
	const sectionKey = context?.document?.sectionKey

	if (!value || !sectionKey) {
		return true
	}

	const option = routePageOptions.find((routePageOption) => routePageOption.value === value)

	return option?.section === sectionKey
		? true
		: 'Choose a primary internal page that belongs to the selected section.'
}

export const linkDestination = defineType({
	name: 'linkDestination',
	title: 'Link destination',
	type: 'object',
	fields: [
		defineField({
			name: 'type',
			title: 'Destination type',
			description:
				'Controls what kind of link this is. Choose internal page for a route in this site, external URL for another website or email link, download for a file, or anchor link for a section on a page.',
			type: 'string',
			options: {
				list: [
					{title: 'Internal page', value: 'internalPage'},
					{title: 'External URL', value: 'externalUrl'},
					{title: 'Download', value: 'download'},
					{title: 'Anchor link', value: 'anchor'}
				],
				layout: 'radio'
			},
			initialValue: 'internalPage',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'pageKey',
			title: 'Internal page',
			description:
				'Chooses the page this link should open when the destination is an internal page or an anchor on an internal page.',
			type: 'string',
			options: {
				list: routePageOptions.map(({title, value}) => ({title, value}))
			},
			hidden: ({parent}) => !['internalPage', 'anchor'].includes(parent?.type)
		}),
		defineField({
			name: 'href',
			title: 'External URL',
			description:
				'Controls the exact external destination for this link, such as https://example.org, mailto:name@example.org, tel:+15555555555, or #.',
			type: 'string',
			hidden: ({parent}) => parent?.type !== 'externalUrl'
		}),
		defineField({
			name: 'file',
			title: 'Download file',
			description:
				'Uploads the file visitors download when they click this link.',
			type: 'file',
			hidden: ({parent}) => parent?.type !== 'download'
		}),
		defineField({
			name: 'anchorId',
			title: 'Anchor ID',
			type: 'string',
			description:
				'Controls the section ID this link jumps to on the chosen internal page. Enter the anchor without the # symbol.',
			hidden: ({parent}) => parent?.type !== 'anchor'
		})
	],
	validation: (rule) => rule.custom((value) => validateLinkDestination(value as LinkDestinationValue)),
	preview: {
		select: {
			type: 'type',
			pageKey: 'pageKey',
			href: 'href',
			anchorId: 'anchorId'
		},
		prepare: ({type, pageKey, href, anchorId}) => ({
			title: type === 'externalUrl' ? href : pageKey || anchorId || 'Link destination',
			subtitle: type
		})
	}
})

export const navItem = defineType({
	name: 'navItem',
	title: 'Navigation item',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			description:
				'Controls the visible navigation text visitors click in a subnav or footer link list.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'destination',
			title: 'Destination',
			description:
				'Controls where visitors go when they select this navigation item.',
			type: 'linkDestination',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'disabled',
			title: 'Disabled',
			description:
				'When enabled, this item appears as unavailable text instead of a working link. Use it only for destinations that should be visible but not clickable yet.',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'hidden',
			title: 'Hide from navigation',
			description:
				'When enabled, this item is omitted from generated navigation lists while the document and route can still exist.',
			type: 'boolean',
			initialValue: false
		})
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'destination.type'
		}
	}
})

export const sitePage = defineType({
	name: 'sitePage',
	title: 'Site page',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Editor title',
			description:
				'Editor-facing name for this site page record. This helps identify the page in Studio and is not the main public page headline.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'sectionKey',
			title: 'Section',
			description:
				'Controls which top-level site section this page belongs to, such as EDU, DSU, Resources, or Events.',
			type: 'string',
			options: {
				list: sectionOptions.map(({title, value}) => ({title, value}))
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'routePageKey',
			title: 'Primary internal page',
			description:
				'Connects this navigation record to the actual route in the website. Choose a page that belongs to the selected section.',
			type: 'string',
			options: {
				list: routePageOptions.map(({title, value}) => ({title, value}))
			},
			validation: (rule) =>
				rule
					.required()
					.custom((value, context) => validateRoutePageSection(value, context as {document?: SitePageValue}))
		}),
		defineField({
			name: 'navLabel',
			title: 'Primary navigation label',
			description:
				'Controls the public label used for this page in primary navigation, subnavigation, breadcrumbs, and footer navigation.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'sortOrder',
			title: 'Navigation order',
			description:
				'Controls the order this page appears within its section navigation. Lower numbers appear earlier.',
			type: 'number',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'disabled',
			title: 'Disabled',
			description:
				'When enabled, this page appears as unavailable in navigation instead of as a clickable link. The page content is not deleted.',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'hidden',
			title: 'Hide from primary navigation and footer',
			description:
				'When enabled, this page is omitted from generated primary navigation and footer links. Use this for pages that should exist but not be promoted globally.',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'navigationItems',
			title: 'Subnav and footer items',
			description:
				'Adds child links for this section in subnavigation and footer areas. Use these for section pages, supporting links, downloads, or external destinations.',
			type: 'array',
			of: [{type: 'navItem'}]
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'sectionKey'
		}
	}
})
