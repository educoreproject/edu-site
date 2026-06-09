import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})

function paragraph(key: string, text: string) {
	return [
		{
			_key: key,
			_type: 'block',
			style: 'normal',
			markDefs: [],
			children: [
				{
					_key: `${key}-span`,
					_type: 'span',
					text,
					marks: []
				}
			]
		}
	]
}

const sectionHeaderFields = {
	pillarsHeader: {
		_type: 'sectionHeader',
		eyebrow: 'Foundation',
		heading: 'Built to align standards bodies without flattening their independence.'
	},
	valuesHeader: {
		_type: 'sectionHeader',
		eyebrow: 'Core Values',
		heading: 'How we operate',
		body: [
			{
				_key: 'values-body',
				_type: 'block',
				style: 'normal',
				markDefs: [],
				children: [
					{
						_key: 'values-body-before',
						_type: 'span',
						text: 'All organizations within ',
						marks: []
					},
					{
						_key: 'values-body-emphasis',
						_type: 'span',
						text: 'Data Standards United',
						marks: ['strong']
					},
					{
						_key: 'values-body-after',
						_type: 'span',
						text: ' abide by these operating principles.',
						marks: []
					}
				]
			}
		]
	},
	'initiative.header': {
		_type: 'sectionHeader',
		eyebrow: 'Our Initiative',
		heading: 'Data Standards United for Lifelong Learning and Employment',
		body: paragraph(
			'initiative-body',
			'With many data standards in use across many sectors and markets, coordinating and aligning data standards.'
		)
	},
	voicesHeader: {
		_type: 'sectionHeader',
		eyebrow: 'Member Voices',
		heading: 'Why organizations choose DSU'
	}
}

const documentIds = ['dsuHome', 'drafts.dsuHome']

for (const documentId of documentIds) {
	const document = await client.getDocument(documentId)

	if (!document) {
		continue
	}

	await client
		.patch(documentId)
		.set(sectionHeaderFields)
		.unset(['initiative.heading', 'valuesHeader.bodyEmphasis'])
		.commit()
}

console.log('Seeded DSU home section headers.')
