export function isExternalLink(href?: string) {
	if (!href) {
		return false;
	}

	return /^(https?:|mailto:|tel:)/.test(href) || href.startsWith('//');
}
