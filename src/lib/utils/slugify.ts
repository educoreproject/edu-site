const DIACRITICS_PATTERN = new RegExp('[̀-ͯ]', 'g');

export function slugify(value: string): string {
	return value
		.normalize('NFKD')
		.replace(DIACRITICS_PATTERN, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
