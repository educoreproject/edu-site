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
			type: 'string',
			options: {
				list: routePageOptions.map(({title, value}) => ({title, value}))
			},
			hidden: ({parent}) => !['internalPage', 'anchor'].includes(parent?.type)
		}),
		defineField({
			name: 'href',
			title: 'External URL',
			type: 'string',
			hidden: ({parent}) => parent?.type !== 'externalUrl'
		}),
		defineField({
			name: 'file',
			title: 'Download file',
			type: 'file',
			hidden: ({parent}) => parent?.type !== 'download'
		}),
		defineField({
			name: 'anchorId',
			title: 'Anchor ID',
			type: 'string',
			description: 'Enter the anchor without the # symbol.',
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
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'destination',
			title: 'Destination',
			type: 'linkDestination',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'disabled',
			title: 'Disabled',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'hidden',
			title: 'Hide from navigation',
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
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'sectionKey',
			title: 'Section',
			type: 'string',
			options: {
				list: sectionOptions.map(({title, value}) => ({title, value}))
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'routePageKey',
			title: 'Primary internal page',
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
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'sortOrder',
			title: 'Navigation order',
			type: 'number',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'disabled',
			title: 'Disabled',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'hidden',
			title: 'Hide from primary navigation and footer',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'navigationItems',
			title: 'Subnav and footer items',
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
