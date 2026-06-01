import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './schemaTypes'

// Build-friendly fallback; set SANITY_STUDIO_PROJECT_ID for a real connected Studio.
const projectId =
	process.env.SANITY_STUDIO_PROJECT_ID ||
	process.env.PUBLIC_SANITY_PROJECT_ID ||
	'educoreplaceholder'
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
	name: 'educore',
	title: 'EDUcore',
	projectId,
	dataset,
	plugins: [structureTool(), visionTool()],
	schema: {
		types: schemaTypes
	}
})
