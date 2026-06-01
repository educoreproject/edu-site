import { createClient, type SanityClient } from '@sanity/client';
import { env } from '$env/dynamic/public';

const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET;
const apiVersion = env.PUBLIC_SANITY_API_VERSION || '2026-06-01';

export const hasSanityConfig = Boolean(projectId && dataset);

export const sanityClient: SanityClient | null = hasSanityConfig
	? createClient({
			projectId,
			dataset,
			apiVersion,
			useCdn: true
		})
	: null;
