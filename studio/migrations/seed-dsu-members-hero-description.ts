import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})

const description =
	'DSU members bring together standards organizations and partners committed to open, interoperable data standards for lifelong learning and employment.'

for (const documentId of ['dsuMembers', 'drafts.dsuMembers']) {
	const document = await client.getDocument(documentId)

	if (!document) {
		continue
	}

	await client.patch(documentId).set({'hero.description': description}).commit()
}

console.log('Seeded DSU members hero description.')
