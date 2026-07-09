import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})

const documentId = 'sitePageDsu'
const navItemKey = 'standards'

const navItem = {
	_key: navItemKey,
	_type: 'navItem',
	label: 'Standards',
	disabled: false,
	hidden: false,
	destination: {
		_type: 'linkDestination',
		type: 'internalPage',
		pageKey: 'dsuStandards'
	}
}

const document = await client.getDocument(documentId)

if (!document) {
	console.warn(`Skipped ${documentId}: document not found.`)
} else {
	const navigationItems = (document.navigationItems ?? []) as Array<{_key: string}>
	const alreadyPresent = navigationItems.some((item) => item._key === navItemKey)

	if (alreadyPresent) {
		console.log(`${documentId} already has a "${navItemKey}" navigation item. Nothing to do.`)
	} else {
		await client
			.patch(documentId)
			.insert('after', 'navigationItems[-1]', [navItem])
			.commit()
		console.log(`Added "Standards" navigation item to ${documentId}.`)
	}
}
