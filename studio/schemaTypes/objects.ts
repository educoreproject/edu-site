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
			description:
				'Controls the visible link text visitors see in navigation or footer link lists.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'href',
			title: 'Href',
			description:
				'Controls the destination for this basic link. Use a full URL, route path, email link, phone link, or anchor that the live site can open.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'disabled',
			title: 'Disabled',
			description:
				'When enabled, this link appears as unavailable text instead of a clickable link. Use it for planned or temporarily unavailable destinations.',
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
			description:
				'Controls the visible button text for this call to action.',
			type: 'string',
			validation: (rule) => rule.custom((value, context) => requireCtaValue(value, context, 'CTA label'))
		}),
		defineField({
			name: 'destination',
			title: 'Destination',
			description:
				'Controls where visitors go when they click this call-to-action button.',
			type: 'linkDestination',
			validation: (rule) =>
				rule.custom((value, context) => requireCtaValue(value, context, 'CTA destination'))
		}),
		defineField({
			name: 'variant',
			title: 'Variant',
			description:
				'Controls the visual button style on the live site, such as primary, outline, teal, or gold.',
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
			description:
				'Editor-facing name used when selecting this CTA from another page. Visitors do not see this title directly.',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'type',
			title: 'Type',
			description:
				'Controls which shared CTA layout the site renders. Generic shows normal text and a button; Newsletter uses the newsletter signup treatment.',
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
			description:
				'Controls the small label above the shared CTA heading. This only appears for generic CTAs.',
			type: 'string',
			hidden: ({parent}) => parent?.type !== 'generic'
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			description:
				'Controls the main headline visitors see in this shared CTA band.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the supporting paragraph shown below the shared CTA heading.',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			description:
				'Controls the button label, destination, and visual style used in this shared CTA band.',
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
			description:
				'Controls how newsletter visitors sign up. External link sends them to another destination; direct email signup lets the site render an email capture form.',
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
			description:
				'Adds short helper text below the newsletter CTA, such as reassurance about updates or signup frequency.',
			type: 'string',
			hidden: ({parent}) => parent?.type !== 'newsletter'
		}),
		defineField({
			name: 'background',
			title: 'Background',
			description:
				'Controls the background color treatment for the shared CTA band.',
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
			description:
				'Controls the small label shown above the hero headline, usually the section or page category.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			description:
				'Controls the main hero headline at the top of the page.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the optional summary text below the hero headline. Use it to orient visitors before they reach the rest of the page.',
			type: 'text',
			rows: 4
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Adds buttons inside the hero area. The order here is the order the buttons appear.',
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
			description:
				'Controls the short heading or label for this text block.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'text',
			title: 'Text',
			description:
				'Controls the body copy shown inside this text block.',
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
			description:
				'Controls the small label above the section heading. Leave blank when the section does not need a label.',
			type: 'string'
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			description:
				'Controls the main heading for this page section.',
			type: 'string'
		}),
		defineField({
			name: 'body',
			title: 'Body',
			description:
				'Controls the optional rich text introduction below the section heading. Use this for short explanatory copy before cards, lists, or other content.',
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
			description:
				'Controls the visible number or ordering marker shown with this value card.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			description:
				'Controls the headline text for this numbered value.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the supporting copy shown below this numbered value title.',
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
			description:
				'Controls the testimonial quote text visitors read.',
			type: 'text',
			rows: 5,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'name',
			title: 'Name',
			description:
				'Controls the person name attributed to this quote.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'organization',
			title: 'Organization',
			description:
				'Controls the organization name shown with the quoted person.',
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
			description:
				'Controls the speaker name shown for this video testimonial.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			description:
				'Controls the speaker title or role shown with this video testimonial.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'organization',
			title: 'Organization',
			description:
				'Controls the organization shown with this video testimonial.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'provider',
			title: 'Provider',
			description:
				'Optional editor note for the video service. The live site currently expects Vimeo content in the URL field.',
			type: 'string'
		}),
		defineField({
			name: 'url',
			title: 'Vimeo URL or embed code',
			description:
				'Controls the video embedded for this testimonial. Paste the Vimeo player URL from the iframe src, a Vimeo page URL, or the full iframe embed code.',
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
			description:
				'Controls the organization name shown in member lists.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'url',
			title: 'URL',
			description:
				'Controls where visitors go when they open this member organization.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'logoImage',
			title: 'Logo image',
			description:
				'Uploads the organization logo shown in the member list. Leave blank if the page should rely on text only.',
			type: 'image',
			options: {
				hotspot: false
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description:
						'Describes the logo for screen reader users. Defaults to the organization name when left blank.'
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
			description:
				'Controls the short membership type label, such as Signatory or Affiliate.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'kindColor',
			title: 'Kind color',
			description:
				'Controls the color treatment for the membership type label when the site uses a custom kind color.',
			type: 'string'
		}),
		defineField({
			name: 'title',
			title: 'Title',
			description:
				'Controls the main heading for this membership type card.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the paragraph that explains who this membership type is for and what it means.',
			type: 'text',
			rows: 4,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'bullets',
			title: 'Bullets',
			description:
				'Adds the short benefit or requirement bullets shown inside this membership type card.',
			type: 'array',
			of: [{type: 'string'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			description:
				'Controls the button shown on this membership type card.',
			type: 'cta',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'featured',
			title: 'Featured',
			description:
				'When enabled, this membership type receives the featured visual treatment on the live page.',
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
			description:
				'Controls the heading for this process step.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the explanatory text shown for this process step.',
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
			description:
				'Controls the heading above this checklist.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'items',
			title: 'Items',
			description:
				'Adds the checklist items visitors see. Each entry should be a single requirement, document, or preparation step.',
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

export const contactRecipient = defineType({
	name: 'contactRecipient',
	title: 'Contact recipient',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			title: 'Label',
			description:
				'Controls the visible organization option shown in the contact form dropdown.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'email',
			title: 'Email',
			description:
				'Controls the email address used when a visitor selects this recipient in the contact form.',
			type: 'email',
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: 'label',
			subtitle: 'email'
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
			description:
				'Controls the small label above this contact prompt heading.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			description:
				'Controls the main heading shown in this contact prompt.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the explanatory copy that tells visitors when and why to use this contact option.',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'email',
			title: 'Email',
			description:
				'Controls the email address shown or linked from this contact prompt.',
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
			description:
				'Controls the visible project name shown on the DSU projects page.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'category',
			title: 'Category',
			description:
				'Controls the optional category label shown with this DSU project.',
			type: 'string'
		}),
		defineField({
			name: 'href',
			title: 'Href',
			description:
				'Controls where visitors go when they open this DSU project.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'logoImage',
			title: 'Logo image',
			description:
				'Uploads the project logo shown on the DSU projects page. Leave blank if the project should appear as text only.',
			type: 'image',
			options: {
				hotspot: false
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description:
						'Describes the project logo for screen reader users. Defaults to the project title when left blank.'
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
			description:
				'Controls the small label or category text shown above the resource card title.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			description:
				'Controls the main heading for this resource card.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the short summary text shown on this resource card.',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			description:
				'Controls the button or link action shown on this resource card.',
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
			description:
				'Controls which Resources library filter this document appears under.',
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
			description:
				'Controls the visible document title in the Resources library list.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'documentType',
			title: 'Type',
			description:
				'Controls the document type label shown with this Resources library item, such as PDF or Word doc.',
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
			description:
				'Controls the optional summary text shown with this Resources library document.',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'document',
			title: 'Document',
			description:
				'Uploads the file visitors download from this Resources library item.',
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
			description:
				'Controls whether this item appears under Press releases or Charters on the Press & charter page.',
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
			description:
				'Controls the visible document title on the Press & charter page.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'documentType',
			title: 'Type',
			description:
				'Controls the document type label shown with this press or charter item, such as PDF or Word doc.',
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
			description:
				'Controls the optional summary text shown with this press or charter document.',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'document',
			title: 'Document',
			description:
				'Uploads the file visitors download from this press or charter item.',
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
			description:
				'Controls the month/year archive filter for this newsletter, such as January 2026.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			description:
				'Controls the visible newsletter title in the archive list.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'documentType',
			title: 'Type',
			description:
				'Controls the document type label shown with this newsletter, such as PDF or Word doc.',
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
			description:
				'Controls the optional summary text shown with this newsletter archive item.',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'document',
			title: 'Document',
			description:
				'Uploads the file visitors download from this newsletter archive item.',
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
			description:
				'Uploads the event image shown on event cards. Leave blank only when the event should use the no-image layout.',
			type: 'image',
			options: {
				hotspot: true
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description:
						'Describes the event image for screen reader users. Use concise, meaningful text rather than repeating the event title.'
				})
			]
		}),
		defineField({
			name: 'tag',
			title: 'Tag',
			description:
				'Controls the small category or status label shown on this event card.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'date',
			title: 'Date',
			description:
				'Controls the date text shown on this event card. Enter it exactly as visitors should read it.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			description:
				'Controls the visible event title.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the event summary text shown on the event card.',
			type: 'text',
			rows: 4,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'href',
			title: 'Href',
			description:
				'Controls where visitors go when they open this event, such as a registration page, recording, recap, or event detail link.',
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
			description:
				'Controls the year heading used to group past events in the archive.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'events',
			title: 'Events',
			description:
				'Adds the past events shown under this archive year. The order here is the order visitors see within the year.',
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
			description:
				'Controls the glossary term visitors can browse or search for.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'definition',
			title: 'Definition',
			description:
				'Controls the definition text shown for this glossary term.',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'category',
			title: 'Category',
			description:
				'Controls which glossary filter this term appears under. Match one of the category labels on the Glossary page.',
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
			description:
				'Controls the FAQ question text visitors see in the FAQ list.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'answer',
			title: 'Answer',
			description:
				'Controls the answer text shown beneath this FAQ question.',
			type: 'text',
			rows: 4,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'category',
			title: 'Category',
			description:
				'Controls which FAQ filter this item appears under. Match one of the category labels on the FAQ page.',
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
			description:
				'Controls the small optional label above this EDU overview section heading.',
			type: 'string'
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			description:
				'Controls the main heading for this EDU overview section.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'paragraphs',
			title: 'Paragraphs',
			description:
				'Controls the body paragraphs for this EDU overview section. Each entry appears as a separate paragraph on the live page.',
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
			description:
				'Controls the heading for this EDU list group.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the short explanatory text shown before this EDU list.',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'items',
			title: 'Items',
			description:
				'Adds the list items shown in this EDU list group. Each entry should be one clear statement.',
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
			description:
				'Controls the icon shown on this EDUcore feature card. The site uses Tabler icon names, such as robot or building-community.',
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
			description:
				'Controls the heading shown on this EDUcore feature card.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the explanatory copy shown on this EDUcore feature card.',
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
			description:
				'Controls the visible title for this EDUcore demo card.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'presenter',
			title: 'Presenter',
			description:
				'Controls the presenter name shown on this EDUcore demo card.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'organization',
			title: 'Organization',
			description:
				'Controls the optional organization shown with the presenter on this EDUcore demo card.',
			type: 'string'
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Controls the summary text shown for this EDUcore demo.',
			type: 'text',
			rows: 4,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'thumbnailImage',
			title: 'Thumbnail image',
			description:
				'Uploads the thumbnail image shown for this EDUcore demo card.',
			type: 'image',
			options: {
				hotspot: false
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
					description:
						'Describes the demo thumbnail for screen reader users. Include the meaningful visual content, not just the demo title.',
					validation: (rule) => rule.required()
				})
			],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'videoUrl',
			title: 'Video URL',
			description:
				'Controls the URL visitors open to watch this EDUcore demo video.',
			type: 'url',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'linkLabel',
			title: 'Link label',
			description:
				'Controls the visible text for the demo video link, such as Watch on Drive.',
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
			description:
				'Controls the board role or office shown for this person.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'name',
			title: 'Name',
			description:
				'Controls the board member name shown on the EDU board page.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'organization',
			title: 'Organization',
			description:
				'Controls the optional organization shown with this board member.',
			type: 'string'
		}),
		defineField({
			name: 'email',
			title: 'Email',
			description:
				'Controls the optional email address shown or linked for this board member.',
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
			description:
				'Controls the year or date label shown for this history timeline entry.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'title',
			title: 'Title',
			description:
				'Controls the heading for this history timeline entry.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'text',
			title: 'Text',
			description:
				'Controls the explanatory text shown for this history timeline entry.',
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
			description:
				'Controls the visible label for this Contact page form field.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'placeholder',
			title: 'Placeholder',
			description:
				'Controls the hint text shown inside this form field before a visitor types.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'name',
			title: 'Name',
			description:
				'Controls the technical form field name submitted with the message. Keep this stable unless the form handling is updated too.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'type',
			title: 'Type',
			description:
				'Controls the kind of form control visitors see, such as a single-line text field, email field, or larger message textarea.',
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
			description:
				'When enabled, visitors must fill out this field before submitting the contact form.',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'full',
			title: 'Full width',
			description:
				'When enabled, this form field spans the full form width instead of sharing a row with another field.',
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
			description:
				'Controls the small optional label shown above this information card heading.',
			type: 'string'
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			description:
				'Controls the main heading shown on this information card.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'text',
			title: 'Text',
			description:
				'Controls the supporting text shown inside this information card.',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'email',
			title: 'Email',
			description:
				'Controls the optional email address shown or linked from this information card.',
			type: 'email'
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			description:
				'Controls the optional button shown on this information card.',
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
			description:
				'Controls the heading shown above this footer link column.',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'links',
			title: 'Links',
			description:
				'Adds the links shown under this footer column heading.',
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
