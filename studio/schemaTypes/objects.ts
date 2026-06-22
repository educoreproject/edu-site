import {defineField, defineType} from 'sanity'

function requireCtaValue(
	value: unknown,
	context: {document?: {_type?: string; type?: string}},
	fieldLabel: string
) {
	const document = context.document

	if (document?._type === 'sharedCta' && document.type !== 'generic') {
		return true
	}

	if (typeof value === 'string') {
		return value.trim() ? true : `${fieldLabel} is required.`
	}

	return value ? true : `${fieldLabel} is required.`
}

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
			validation: (rule) => rule.custom((value, context) => requireCtaValue(value, context, 'CTA label'))
		}),
		defineField({
			name: 'destination',
			title: 'Destination',
			type: 'linkDestination',
			validation: (rule) =>
				rule.custom((value, context) => requireCtaValue(value, context, 'CTA destination'))
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
			validation: (rule) => rule.custom((value, context) => requireCtaValue(value, context, 'CTA variant'))
		})
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'destination.type'
		}
	}
})

export const sharedCta = defineType({
	name: 'sharedCta',
	title: 'Shared CTA',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Internal title',
			type: 'string',
			description: 'Editor-facing name used when selecting this CTA from another page.',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'type',
			title: 'Type',
			type: 'string',
			options: {
				list: [
					{title: 'Generic', value: 'generic'},
					{title: 'Newsletter', value: 'newsletter'}
				],
				layout: 'radio'
			},
			initialValue: 'generic',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			type: 'string',
			hidden: ({parent}) => parent?.type !== 'generic'
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
			name: 'cta',
			title: 'CTA',
			type: 'cta',
			validation: (rule) =>
				rule.custom((value, context) => {
					const parent = context.parent as {type?: string; signupMode?: string}
					const cta = value as {label?: string; destination?: unknown} | undefined

					if ((parent?.type === 'generic' || parent?.type === 'newsletter') && !cta) {
						return 'CTAs need button content.'
					}

					if (parent?.type !== 'newsletter') {
						return true
					}

					if (!cta?.label?.trim()) {
						return 'Newsletter CTAs need a CTA label.'
					}

					return parent.signupMode !== 'directEmailSignup' && !cta.destination
						? 'External newsletter signups need a CTA destination.'
						: true
				})
		}),
		defineField({
			name: 'signupMode',
			title: 'Signup mode',
			type: 'string',
			options: {
				list: [
					{title: 'External link', value: 'externalLink'},
					{title: 'Direct email signup', value: 'directEmailSignup'}
				],
				layout: 'radio'
			},
			initialValue: 'externalLink',
			hidden: ({parent}) => parent?.type !== 'newsletter',
			validation: (rule) =>
				rule.custom((value, context) =>
					(context.parent as {type?: string})?.type === 'newsletter' && !value
						? 'Newsletter CTAs need a signup mode.'
						: true
				)
		}),
		defineField({
			name: 'note',
			title: 'Note',
			type: 'string',
			hidden: ({parent}) => parent?.type !== 'newsletter'
		}),
		defineField({
			name: 'background',
			title: 'Background',
			type: 'string',
			options: {
				list: [
					{title: 'Navy', value: 'navy'},
					{title: 'Teal', value: 'teal'}
				]
			}
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'type'
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

export const sectionHeader = defineType({
	name: 'sectionHeader',
	title: 'Section header',
	type: 'object',
	fields: [
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			type: 'string'
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string'
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{title: 'Normal', value: 'normal'}],
					lists: [],
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
		select: {
			title: 'heading',
			subtitle: 'eyebrow'
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
			title: 'Vimeo URL or embed code',
			description: 'Paste the Vimeo player URL from the iframe src, a Vimeo page URL, or the full iframe embed code.',
			type: 'text',
			rows: 3,
			validation: (rule) =>
				rule.custom((value) => {
					if (!value) {
						return true
					}

					return /(?:<iframe[^>]+src=["']https:\/\/player\.vimeo\.com\/video\/[^"']+["']|https:\/\/player\.vimeo\.com\/video\/|https:\/\/vimeo\.com\/)/i.test(
						value
					)
						? true
						: 'Use a Vimeo player URL, Vimeo page URL, or Vimeo iframe embed code.'
				})
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
			name: 'logoImage',
			title: 'Logo image',
			type: 'image',
			options: {
				hotspot: false
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description: 'Defaults to the organization name when left blank.'
				})
			]
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
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string'
		}),
		defineField({
			name: 'href',
			title: 'Href',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'logoImage',
			title: 'Logo image',
			type: 'image',
			options: {
				hotspot: false
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description: 'Defaults to the project title when left blank.'
				})
			]
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'category'
		}
	}
})

export const resourceCard = defineType({
	name: 'resourceCard',
	title: 'Resource card',
	type: 'object',
	fields: [
		defineField({
			name: 'meta',
			title: 'Meta',
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
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			type: 'cta',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'meta'
		}
	}
})

export const resourceDocument = defineType({
	name: 'resourceDocument',
	title: 'Resource document',
	type: 'object',
	fields: [
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{title: 'White paper', value: 'White papers'},
					{title: 'Report', value: 'Reports'}
				],
				layout: 'radio'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'documentType',
			title: 'Type',
			type: 'string',
			options: {
				list: [
					{title: 'PDF', value: 'PDF'},
					{title: 'Word doc', value: 'Word doc'},
					{title: 'Other', value: 'Other'}
				]
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'document',
			title: 'Document',
			type: 'file',
			options: {
				accept:
					'.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			},
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'category',
			media: 'document'
		}
	}
})

export const pressDocument = defineType({
	name: 'pressDocument',
	title: 'Press document',
	type: 'object',
	fields: [
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{title: 'Press release', value: 'Press releases'},
					{title: 'Charter', value: 'Charters'}
				],
				layout: 'radio'
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'documentType',
			title: 'Type',
			type: 'string',
			options: {
				list: [
					{title: 'PDF', value: 'PDF'},
					{title: 'Word doc', value: 'Word doc'},
					{title: 'Other', value: 'Other'}
				]
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'document',
			title: 'Document',
			type: 'file',
			options: {
				accept:
					'.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			},
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'category',
			media: 'document'
		}
	}
})

export const newsletterDocument = defineType({
	name: 'newsletterDocument',
	title: 'Newsletter document',
	type: 'object',
	fields: [
		defineField({
			name: 'category',
			title: 'Category',
			description: 'Month and year label, such as January 2026.',
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
			name: 'documentType',
			title: 'Type',
			type: 'string',
			options: {
				list: [
					{title: 'PDF', value: 'PDF'},
					{title: 'Word doc', value: 'Word doc'},
					{title: 'Other', value: 'Other'}
				]
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'document',
			title: 'Document',
			type: 'file',
			options: {
				accept:
					'.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			},
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'category',
			media: 'document'
		}
	}
})

export const eventItem = defineType({
	name: 'eventItem',
	title: 'Event item',
	type: 'object',
	fields: [
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description: 'Describe the event image for screen reader users.'
				})
			]
		}),
		defineField({
			name: 'tag',
			title: 'Tag',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'date',
			title: 'Date',
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
		}),
		defineField({
			name: 'href',
			title: 'Href',
			type: 'string',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'date'
		}
	}
})

export const eventArchiveGroup = defineType({
	name: 'eventArchiveGroup',
	title: 'Event archive group',
	type: 'object',
	fields: [
		defineField({
			name: 'year',
			title: 'Year',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'events',
			title: 'Events',
			type: 'array',
			of: [{type: 'eventItem'}],
			validation: (rule) => rule.required().min(1)
		})
	],
	preview: {
		select: {
			title: 'year',
			events: 'events'
		},
		prepare: ({title, events}) => ({
			title,
			subtitle: `${events?.length ?? 0} events`
		})
	}
})

export const glossaryTerm = defineType({
	name: 'glossaryTerm',
	title: 'Glossary term',
	type: 'object',
	fields: [
		defineField({
			name: 'term',
			title: 'Term',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'definition',
			title: 'Definition',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'term',
			subtitle: 'category'
		}
	}
})

export const faqItem = defineType({
	name: 'faqItem',
	title: 'FAQ item',
	type: 'object',
	fields: [
		defineField({
			name: 'question',
			title: 'Question',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'answer',
			title: 'Answer',
			type: 'text',
			rows: 4,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string'
		})
	],
	preview: {
		select: {
			title: 'question',
			subtitle: 'category'
		}
	}
})

export const eduOverviewSection = defineType({
	name: 'eduOverviewSection',
	title: 'EDU overview section',
	type: 'object',
	fields: [
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			type: 'string'
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'paragraphs',
			title: 'Paragraphs',
			type: 'array',
			of: [{type: 'text'}],
			validation: (rule) => rule.required().min(1)
		})
	],
	preview: {
		select: {
			title: 'heading',
			subtitle: 'eyebrow'
		}
	}
})

export const eduListGroup = defineType({
	name: 'eduListGroup',
	title: 'EDU list group',
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
			name: 'items',
			title: 'Items',
			type: 'array',
			of: [{type: 'string'}],
			validation: (rule) => rule.required().min(1)
		})
	],
	preview: {
		select: {
			title: 'heading',
			subtitle: 'description'
		}
	}
})

export const educoreFeatureCard = defineType({
	name: 'educoreFeatureCard',
	title: 'EDUcore feature card',
	type: 'object',
	fields: [
		defineField({
			name: 'icon',
			title: 'Icon',
			description: 'Tabler icon name used by the site, such as robot or building-community.',
			type: 'string',
			options: {
				list: [
					{title: 'Robot', value: 'robot'},
					{title: 'School', value: 'school'},
					{title: 'Lock', value: 'lock'},
					{title: 'Building community', value: 'building-community'},
					{title: 'Network', value: 'network'},
					{title: 'Book', value: 'book'},
					{title: 'Checklist', value: 'list-check'},
					{title: 'Shield check', value: 'shield-check'},
					{title: 'Sparkles', value: 'sparkles'}
				]
			},
			initialValue: 'sparkles',
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
			subtitle: 'description'
		}
	}
})

export const educoreDemo = defineType({
	name: 'educoreDemo',
	title: 'EDUcore demo',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'presenter',
			title: 'Presenter',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'organization',
			title: 'Organization',
			type: 'string'
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'thumbnailImage',
			title: 'Thumbnail image',
			type: 'image',
			options: {
				hotspot: false
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description: 'Describe the demo thumbnail for screen reader users.',
					validation: (rule) => rule.required()
				})
			],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'videoUrl',
			title: 'Video URL',
			type: 'url',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'linkLabel',
			title: 'Link label',
			type: 'string',
			initialValue: 'Watch on Drive',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'presenter',
			media: 'thumbnailImage'
		}
	}
})

export const boardMember = defineType({
	name: 'boardMember',
	title: 'Board member',
	type: 'object',
	fields: [
		defineField({
			name: 'role',
			title: 'Role',
			type: 'string',
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
			type: 'string'
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'email'
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'role'
		}
	}
})

export const timelineEntry = defineType({
	name: 'timelineEntry',
	title: 'Timeline entry',
	type: 'object',
	fields: [
		defineField({
			name: 'year',
			title: 'Year',
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
			name: 'text',
			title: 'Text',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'year'
		}
	}
})

export const contactField = defineType({
	name: 'contactField',
	title: 'Contact field',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'placeholder',
			title: 'Placeholder',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'type',
			title: 'Type',
			type: 'string',
			options: {
				list: [
					{title: 'Text', value: 'text'},
					{title: 'Email', value: 'email'},
					{title: 'Textarea', value: 'textarea'}
				]
			},
			initialValue: 'text',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'required',
			title: 'Required',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'full',
			title: 'Full width',
			type: 'boolean',
			initialValue: false
		})
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'name'
		}
	}
})

export const infoCard = defineType({
	name: 'infoCard',
	title: 'Info card',
	type: 'object',
	fields: [
		defineField({
			name: 'eyebrow',
			title: 'Eyebrow',
			type: 'string'
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'text',
			title: 'Text',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'email'
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			type: 'cta'
		})
	],
	preview: {
		select: {
			title: 'heading',
			subtitle: 'eyebrow'
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
