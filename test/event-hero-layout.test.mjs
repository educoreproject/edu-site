import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('events use the compact Figma-style hero layout', () => {
	const heroSource = readFileSync('src/lib/components/site/Hero.svelte', 'utf8');
	const eventsSource = readFileSync('src/routes/events/+page.svelte', 'utf8');

	assert.match(heroSource, /layout\?: "default" \| "event";/);
	assert.match(heroSource, /class:eventHero=\{layout === "event"\}/);
	assert.match(heroSource, /section\.eventHero[\s\S]*?min-height: 13rem/);
	assert.match(heroSource, /\.eventHero \.hero-content[\s\S]*?grid-template-columns: minmax\(0, 1fr\) auto/);
	assert.match(heroSource, /\.eventHero \.supplement[\s\S]*?grid-column: 2/);

	assert.equal(eventsSource.includes('<Hero content={page.hero} background="teal" icon="event" layout="event">'), true);
	assert.match(eventsSource, /\.event-counter[\s\S]*?min-width: 6\.25rem/);
	assert.match(eventsSource, /\.event-counter strong[\s\S]*?font-size: 2rem/);
});
