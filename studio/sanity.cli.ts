import {defineCliConfig} from 'sanity/cli'

// Build-friendly fallback; set SANITY_STUDIO_PROJECT_ID for a real connected Studio.
const projectId =
	process.env.SANITY_STUDIO_PROJECT_ID ||
	process.env.PUBLIC_SANITY_PROJECT_ID ||
	'educoreplaceholder'
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
	api: {
		projectId,
		dataset
	}
})
