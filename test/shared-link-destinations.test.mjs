import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('frontend destination resolver supports internal, external, download, and anchor links', () => {
	const script = `
		const { resolveDestination } = await import('./src/lib/content/destinations.ts');

		console.log(JSON.stringify({
			internal: resolveDestination({
				type: 'internalPage',
				pageKey: 'resourcesLibrary',
				anchorId: '#downloads'
			}),
			external: resolveDestination({
				type: 'externalUrl',
				href: 'https://example.com'
			}),
			download: resolveDestination({
				type: 'download',
				file: {
					url: 'https://cdn.example.com/reports/report.pdf',
					filename: 'report.pdf',
					mimeType: 'application/pdf',
					size: 1234
				}
			}),
			downloadWithoutFilename: resolveDestination({
				type: 'download',
				file: {
					url: 'https://cdn.example.com/reports/report.pdf'
				}
			}),
			currentPageAnchor: resolveDestination({
				type: 'anchor',
				anchorId: '#contact'
			}),
			spacedAnchor: resolveDestination({
				type: 'anchor',
				pageKey: 'resourcesFaq',
				anchorId: ' #questions '
			}),
			routeAnchor: resolveDestination({
				type: 'anchor',
				pageKey: 'eduBoard',
				anchorId: 'members'
			}),
			missingInternalPage: resolveDestination({
				type: 'internalPage'
			})
		}));
	`;
	const output = execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', script], {
		encoding: 'utf8'
	});
	const result = JSON.parse(output);

	assert.deepEqual(result.internal, { href: '/resources/library#downloads' });
	assert.deepEqual(result.external, {
		href: 'https://example.com',
		target: '_blank',
		rel: 'noopener noreferrer'
	});
	assert.deepEqual(result.download, {
		href: 'https://cdn.example.com/reports/report.pdf',
		download: 'report.pdf',
		mimeType: 'application/pdf',
		size: 1234
	});
	assert.deepEqual(result.downloadWithoutFilename, {
		href: 'https://cdn.example.com/reports/report.pdf',
		download: true
	});
	assert.deepEqual(result.currentPageAnchor, { href: '#contact' });
	assert.deepEqual(result.spacedAnchor, { href: '/resources/faq#questions' });
	assert.deepEqual(result.routeAnchor, { href: '/edu/board#members' });
	assert.deepEqual(result.missingInternalPage, {});
});

test('shared frontend types expose destination-aware link contracts', () => {
	const types = readFileSync('src/lib/content/types.ts', 'utf8');

	assert.match(types, /import type \{ RoutePageKey/);
	assert.match(types, /export type LinkDestinationKind = 'internalPage' \| 'externalUrl' \| 'download' \| 'anchor';/);
	assert.match(types, /export type LinkDestination = \{/);
	assert.match(types, /pageKey\?:\s*RoutePageKey/);
	assert.match(types, /href\?:\s*string/);
	assert.match(types, /anchorId\?:\s*string/);
	assert.match(types, /filename\?:\s*string/);
	assert.match(types, /mimeType\?:\s*string/);
	assert.match(types, /size\?:\s*number/);
	assert.match(types, /export type ResolvedLink = \{/);
	assert.match(types, /target\?:\s*'_blank'/);
	assert.match(types, /rel\?:\s*'noopener noreferrer'/);
	assert.match(types, /download\?:\s*string \| boolean/);
	assert.match(types, /export type LinkItem = ResolvedLink & \{/);
	assert.match(types, /export type Cta = ResolvedLink & \{/);
	assert.match(types, /export type SiteNavSection = LinkItem & \{/);
	assert.match(types, /key:\s*SiteSectionKey/);
	assert.match(types, /pageKey:\s*RoutePageKey/);
	assert.match(types, /children:\s*LinkItem\[\]/);
	assert.match(types, /sections:\s*SiteNavSection\[\]/);
	assert.match(types, /footerColumns:\s*FooterColumn\[\]/);
});
