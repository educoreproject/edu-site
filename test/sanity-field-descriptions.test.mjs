import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const schemaDir = 'studio/schemaTypes';

function findDefineFieldBlocks(source) {
	const blocks = [];
	let index = 0;

	while (index < source.length) {
		const callIndex = source.indexOf('defineField({', index);
		if (callIndex === -1) {
			break;
		}

		const objectStart = source.indexOf('{', callIndex);
		let cursor = objectStart + 1;
		let depth = 1;
		let quote = null;
		let inLineComment = false;
		let inBlockComment = false;

		while (cursor < source.length && depth > 0) {
			const char = source[cursor];
			const next = source[cursor + 1];

			if (inLineComment) {
				if (char === '\n') {
					inLineComment = false;
				}
			} else if (inBlockComment) {
				if (char === '*' && next === '/') {
					inBlockComment = false;
					cursor += 1;
				}
			} else if (quote) {
				if (char === '\\') {
					cursor += 1;
				} else if (char === quote) {
					quote = null;
				}
			} else if (char === '/' && next === '/') {
				inLineComment = true;
				cursor += 1;
			} else if (char === '/' && next === '*') {
				inBlockComment = true;
				cursor += 1;
			} else if (char === "'" || char === '"' || char === '`') {
				quote = char;
			} else if (char === '{') {
				depth += 1;
			} else if (char === '}') {
				depth -= 1;
			}

			cursor += 1;
		}

		blocks.push({
			start: objectStart,
			body: source.slice(objectStart + 1, cursor - 1)
		});
		index = cursor;
	}

	return blocks;
}

function hasTopLevelDescription(body) {
	let depth = 1;
	let quote = null;
	let inLineComment = false;
	let inBlockComment = false;

	for (let index = 0; index < body.length; index += 1) {
		const char = body[index];
		const next = body[index + 1];

		if (inLineComment) {
			if (char === '\n') {
				inLineComment = false;
			}
			continue;
		}

		if (inBlockComment) {
			if (char === '*' && next === '/') {
				inBlockComment = false;
				index += 1;
			}
			continue;
		}

		if (quote) {
			if (char === '\\') {
				index += 1;
			} else if (char === quote) {
				quote = null;
			}
			continue;
		}

		if (char === '/' && next === '/') {
			inLineComment = true;
			index += 1;
			continue;
		}

		if (char === '/' && next === '*') {
			inBlockComment = true;
			index += 1;
			continue;
		}

		if (char === "'" || char === '"' || char === '`') {
			quote = char;
			continue;
		}

		if (char === '{') {
			depth += 1;
			continue;
		}

		if (char === '}') {
			depth -= 1;
			continue;
		}

		if (
			depth === 1 &&
			body.slice(index, index + 'description'.length) === 'description' &&
			/\s*:/.test(body.slice(index + 'description'.length, index + 'description'.length + 8))
		) {
			return true;
		}
	}

	return false;
}

function getFieldName(body) {
	return body.match(/name:\s*['"]([^'"]+)['"]/)?.[1] ?? '(unknown field)';
}

function getLineNumber(source, index) {
	return source.slice(0, index).split('\n').length;
}

test('every Sanity field explains what it changes on the live site or editor experience', () => {
	const missingDescriptions = [];

	for (const file of readdirSync(schemaDir).filter((name) => name.endsWith('.ts')).sort()) {
		const filePath = join(schemaDir, file);
		const source = readFileSync(filePath, 'utf8');

		for (const block of findDefineFieldBlocks(source)) {
			if (!hasTopLevelDescription(block.body)) {
				missingDescriptions.push(`${filePath}:${getLineNumber(source, block.start)} ${getFieldName(block.body)}`);
			}
		}
	}

	assert.deepEqual(missingDescriptions, []);
});
