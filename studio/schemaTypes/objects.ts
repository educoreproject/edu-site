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

export const videoTestimonial = defineType({
	name: 'videoTestimonial',
	title: 'Video testimonial',
	type: 'object',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
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
			name: 'organization',
			title: 'Organization',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'provider',
			title: 'Provider',
			type: 'string'
		}),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url'
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'organization'
		}
	}
})

export const memberOrganization = defineType({
	name: 'memberOrganization',
	title: 'Member organization',
	type: 'object',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'logoLabel',
			title: 'Logo label',
			type: 'string'
		}),
		defineField({
			name: 'logoColor',
			title: 'Logo color',
			type: 'string'
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'url'
		}
	}
})

export const membershipType = defineType({
	name: 'membershipType',
	title: 'Membership type',
	type: 'object',
	fields: [
		defineField({
			name: 'kind',
			title: 'Kind',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'kindColor',
			title: 'Kind color',
			type: 'string'
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
		}),
		defineField({
			name: 'bullets',
			title: 'Bullets',
			type: 'array',
			of: [{type: 'string'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			type: 'cta',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'featured',
			title: 'Featured',
			type: 'boolean',
			initialValue: false
		})
	],
	preview: {
		select: {
			title: 'kind',
			subtitle: 'title'
		}
	}
})

export const processStep = defineType({
	name: 'processStep',
	title: 'Process step',
	type: 'object',
	fields: [
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
			rows: 3,
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description'
		}
	}
})

export const checklist = defineType({
	name: 'checklist',
	title: 'Checklist',
	type: 'object',
	fields: [
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'items',
			title: 'Items',
			type: 'array',
			of: [{type: 'string'}],
			validation: (rule) => rule.required().min(1)
		})
	],
	preview: {
		select: {
			title: 'heading'
		}
	}
})

export const contactPrompt = defineType({
	name: 'contactPrompt',
	title: 'Contact prompt',
	type: 'object',
	fields: [
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'email',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'heading',
			subtitle: 'email'
		}
	}
})

export const dsuProject = defineType({
	name: 'dsuProject',
	title: 'DSU project',
	type: 'object',
	fields: [
		defineField({
			name: 'tag',
			title: 'Tag',
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
			name: 'category',
			title: 'Category',
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
			name: 'logoLabel',
			title: 'Logo label',
			type: 'string'
		}),
		defineField({
			name: 'logoColor',
			title: 'Logo color',
			type: 'string'
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'category'
		}
	}
})

export const joinCta = defineType({
	name: 'joinCta',
	title: 'Join CTA',
	type: 'object',
	fields: [
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			type: 'cta',
			validation: (rule) => rule.required()
		})
	]
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
