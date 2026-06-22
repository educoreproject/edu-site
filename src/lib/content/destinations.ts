import { getRoutePage } from './route-metadata';
import type { LinkDestination, ResolvedLink } from './types';

function withAnchor(href: string, anchorId?: string) {
	const cleanAnchorId = anchorId?.trim().replace(/^#/, '');

	if (!cleanAnchorId) {
		return href;
	}

	return `${href}#${cleanAnchorId}`;
}

export function resolveDestination(destination?: LinkDestination): ResolvedLink {
	if (!destination) {
		return {};
	}

	switch (destination.type) {
		case 'internalPage': {
			if (!destination.pageKey) {
				return {};
			}

			const page = getRoutePage(destination.pageKey);
			return {
				href: withAnchor(page.path, destination.anchorId)
			};
		}
		case 'externalUrl':
			return destination.href
				? {
						href: destination.href,
						target: '_blank',
						rel: 'noopener noreferrer'
					}
				: {};
		case 'download':
			return destination.file?.url
				? {
						href: destination.file.url,
						download: destination.file.filename ?? true,
						mimeType: destination.file.mimeType,
						size: destination.file.size
					}
				: {};
		case 'anchor': {
			if (destination.pageKey) {
				return {
					href: withAnchor(getRoutePage(destination.pageKey).path, destination.anchorId)
				};
			}

			const href = withAnchor('', destination.anchorId);
			return href ? { href } : {};
		}
		default:
			return {};
	}
}
