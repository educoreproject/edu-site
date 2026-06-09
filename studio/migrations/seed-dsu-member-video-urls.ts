import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})

const jasonVideoUrl = 'https://player.vimeo.com/video/1029794745?h=4711e139a1'

async function patchIfExists(documentId: string) {
	const document = await client.getDocument(documentId)

	if (!document || !Array.isArray(document.videos)) {
		return
	}

	const videos = document.videos.map((video) =>
		video?.name === 'Jason Tyszko' ? {...video, url: jasonVideoUrl, provider: video.provider ?? 'Vimeo'} : video
	)

	await client.patch(documentId).set({videos}).commit()
}

for (const documentId of ['dsuMembers', 'drafts.dsuMembers']) {
	await patchIfExists(documentId)
}

console.log('Seeded DSU member video URLs.')
