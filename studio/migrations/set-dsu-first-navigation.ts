import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})

const sortOrderByDocumentId: Record<string, number> = {
	sitePageDsu: 10,
	sitePageEdu: 20
}

for (const [documentId, sortOrder] of Object.entries(sortOrderByDocumentId)) {
	const document = await client.getDocument(documentId)

	if (!document) {
		console.warn(`Skipped ${documentId}: document not found.`)
		continue
	}

	await client.patch(documentId).set({sortOrder}).commit()
	console.log(`Set ${documentId} sortOrder to ${sortOrder}.`)
}

console.log('DSU now sorts before EDU in the primary navigation.')
