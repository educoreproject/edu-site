import {defineField, defineType} from 'sanity'

export const linkItem = defineType({
	name: 'linkItem',
	title: 'Link item',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'href',
			title: 'Href',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'disabled',
			title: 'Disabled',
			type: 'boolean',
			initialValue: false
		})
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'href'
		}
	}
})

export const cta = defineType({
	name: 'cta',
	title: 'CTA',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'href',
			title: 'Href',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'variant',
			title: 'Variant',
			type: 'string',
			options: {
				list: [
					{title: 'Primary', value: 'primary'},
					{title: 'Outline', value: 'outline'},
					{title: 'Teal', value: 'teal'},
					{title: 'Gold', value: 'gold'}
				]
			},
			initialValue: 'primary',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'href'
		}
	}
})

export const heroContent = defineType({
	name: 'heroContent',
	title: 'Hero content',
	type: 'object',
	fields: [
		defineField({
			name: 'chip',
			title: 'Chip',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			type: 'array',
			of: [{type: 'cta'}]
		})
	]
})

export const textBlock = defineType({
	name: 'textBlock',
	title: 'Text block',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'text',
			title: 'Text',
			type: 'text',
			rows: 4,
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'text'
		}
	}
})

export const numberedValue = defineType({
	name: 'numberedValue',
	title: 'Numbered value',
	type: 'object',
	fields: [
		defineField({
			name: 'number',
			title: 'Number',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'number'
		}
	}
})

export const quote = defineType({
	name: 'quote',
	title: 'Quote',
	type: 'object',
	fields: [
		defineField({
			name: 'quote',
			title: 'Quote',
			type: 'text',
			rows: 5,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'organization',
			title: 'Organization',
			type: 'string',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'organization'
		}
	}
})

export const footerColumn = defineType({
	name: 'footerColumn',
	title: 'Footer column',
	type: 'object',
	fields: [
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'links',
			title: 'Links',
			type: 'array',
			of: [{type: 'linkItem'}]
		})
	],
	preview: {
		select: {
			title: 'heading'
		}
	}
})
