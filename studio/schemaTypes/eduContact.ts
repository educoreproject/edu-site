import {defineField, defineType} from 'sanity'

export const eduContact = defineType({
	name: 'eduContact',
	title: 'Contact page',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			description:
				'Controls the large introduction at the top of the Contact page, including the label, headline, optional summary, and hero buttons.',
			type: 'heroContent',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'fields',
			title: 'Fields',
			description:
				'Controls the form fields visitors fill out on the Contact page. Changing these fields changes the visible form labels, placeholders, and required fields.',
			type: 'array',
			of: [{type: 'contactField'}],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: 'recipientOptions',
			title: 'Recipient options',
			description:
				'Controls the organization dropdown in the contact form and the email address the form opens for the visitor. If empty, the site uses the direct and collaborative card emails.',
			type: 'array',
			of: [{type: 'contactRecipient'}]
		}),
		defineField({
			name: 'directCard',
			title: 'Direct card',
			description:
				'Controls the informational card for direct EDU contact. Its heading, text, email, and optional button appear next to the contact form.',
			type: 'infoCard',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'collaborativeCard',
			title: 'Collaborative card',
			description:
				'Controls the informational card for collaborative or DSU-related contact. Its heading, text, email, and optional button appear next to the contact form.',
			type: 'infoCard',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'ctas',
			title: 'CTAs',
			description:
				'Selects the shared call-to-action bands shown near the bottom of the Contact page. The order here is the order visitors see.',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'sharedCta'}]}]
		})
	],
	preview: {
		prepare: () => ({
			title: 'Contact page'
		})
	}
})
