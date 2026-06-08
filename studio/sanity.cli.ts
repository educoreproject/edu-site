import {defineCliConfig} from 'sanity/cli'

const placeholderProjectId = 'educoreplaceholder'
const configuredProjectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID
const allowsPlaceholderProject =
	process.env.SANITY_ALLOW_PLACEHOLDER_PROJECT === 'true' ||
	configuredProjectId === placeholderProjectId
const missingProjectIdMessage =
	'Missing Sanity project ID. Set SANITY_STUDIO_PROJECT_ID or PUBLIC_SANITY_PROJECT_ID, or opt into local placeholder builds with SANITY_ALLOW_PLACEHOLDER_PROJECT=true.'

if (!configuredProjectId && !allowsPlaceholderProject) {
	console.error(missingProjectIdMessage)
	throw new Error(missingProjectIdMessage)
}

const projectId = configuredProjectId || placeholderProjectId
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
	api: {
		projectId,
		dataset
	}
})
