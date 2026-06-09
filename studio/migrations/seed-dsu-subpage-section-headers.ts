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

async function patchIfExists(documentId: string, fields: Record<string, unknown>, unset: string[] = []) {
	const document = await client.getDocument(documentId)

	if (!document) {
		return
	}

	let patch = client.patch(documentId).set(fields)

	if (unset.length > 0) {
		patch = patch.unset(unset)
	}

	await patch.commit()
}

const membersFields = {
	videosHeader: {
		_type: 'sectionHeader',
		eyebrow: 'Video Testimonials',
		heading: 'Hear from DSU members'
	},
	signatoryMembersHeader: {
		_type: 'sectionHeader',
		eyebrow: 'Signatory Members',
		heading: "Organizations committed to DSU's core values"
	},
	affiliateMembersHeader: {
		_type: 'sectionHeader',
		eyebrow: 'Affiliate Members',
		heading: 'Supporting organizations',
		body: paragraph(
			'affiliate-members-body',
			"Affiliate members support DSU's mission in an advisory capacity - typically organizations that are not standards development bodies, or whose governance does not allow full signatory commitment."
		)
	},
	'joinCta.eyebrow': 'Join DSU'
}

const joinFields = {
	membershipHeader: {
		_type: 'sectionHeader',
		eyebrow: 'Membership Types',
		heading: 'Two ways to join'
	},
	'process.header': {
		_type: 'sectionHeader',
		eyebrow: 'Process',
		heading: 'How to join'
	}
}

const projectsFields = {
	projectsHeader: {
		_type: 'sectionHeader',
		eyebrow: 'Projects',
		heading: 'DSU supported initiatives'
	},
	'joinCta.eyebrow': 'Join DSU'
}

for (const documentId of ['dsuMembers', 'drafts.dsuMembers']) {
	await patchIfExists(documentId, membersFields)
}

for (const documentId of ['dsuJoin', 'drafts.dsuJoin']) {
	await patchIfExists(documentId, joinFields, ['process.eyebrow', 'process.heading'])
}

for (const documentId of ['dsuProjects', 'drafts.dsuProjects']) {
	await patchIfExists(documentId, projectsFields)
}

console.log('Seeded DSU subpage section headers.')
