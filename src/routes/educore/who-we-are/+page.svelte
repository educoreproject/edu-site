<script lang="ts">
	import Container from '$lib/components/site/Container.svelte';
	import Seo from '$lib/components/site/Seo.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import RichText from '$lib/components/site/RichText.svelte';
	import SectionChrome from '$lib/components/site/SectionChrome.svelte';
	import type { SiteChrome, TeamMember, WhoWeArePage } from '$lib/content/types';

	type Props = {
		data: {
			page: WhoWeArePage;
			chrome: SiteChrome;
		};
	};

	let { data }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);

	function initials(name: string): string {
		const parts = name.trim().split(/\s+/).filter(Boolean);
		if (!parts.length) return '?';
		const first = parts[0][0] ?? '';
		const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
		return (first + last).toUpperCase();
	}
</script>

<Seo seo={page.seo} hero={page.hero} {chrome} />

<SectionChrome {chrome} routeKey="educoreWhoWeAre" logoImage={page.headerLogo} />

<main>
	<Hero content={page.hero} compact />

	<section class="section section-padded" aria-labelledby="team-heading">
		<Container>
			<div class="section-header">
				{#if page.hero.chip}<p class="eyebrow">{page.hero.chip}</p>{/if}
				<h2 id="team-heading">Team</h2>
			</div>

			<div class="team-grid">
				{#each page.members as member (member._key)}
					<article class="team-card">
						{#if member.photo?.url}
							<img
								class="team-photo"
								src={member.photo.url}
								alt={member.photo.alt ?? member.name}
								loading="lazy"
							/>
						{:else}
							<div class="team-photo team-photo--placeholder" aria-hidden="true">
								{initials(member.name)}
							</div>
						{/if}

						<h3>{member.name}</h3>
						{#if member.role}<p class="team-role">{member.role}</p>{/if}
						{#if member.affiliation}<p class="team-affiliation">{member.affiliation}</p>{/if}
						{#if member.bio?.length}
							<div class="team-bio"><RichText blocks={member.bio} /></div>
						{/if}
					</article>
				{/each}
			</div>
		</Container>
	</section>
</main>

<PageFooter {chrome} />

<style>
	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 18.75rem), 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.team-card {
		background: var(--ec-white);
		border: 1px solid var(--ec-border-soft);
		border-radius: 12px;
		padding: 1.5rem;
		min-width: 0;
		transition: box-shadow 0.2s ease;
	}

	.team-card:hover {
		box-shadow: 0 8px 32px rgba(20, 43, 69, 0.1);
	}

	.team-photo {
		width: 8.75rem;
		height: 8.75rem;
		border-radius: 12px;
		object-fit: cover;
		display: block;
		margin-bottom: 1rem;
	}

	.team-photo--placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--ec-navy), var(--ec-navy-mid));
		color: var(--ec-white);
		font-size: 2rem;
		font-weight: 700;
	}

	.team-card h3 {
		color: var(--ec-navy);
		font-size: 1.05rem;
		font-weight: 700;
		line-height: 1.3;
		margin: 0 0 0.25rem;
		text-wrap: balance;
	}

	.team-role {
		color: var(--ec-teal-dark);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		margin: 0 0 0.5rem;
	}

	.team-affiliation {
		color: var(--ec-ink);
		font-size: 0.85rem;
		font-weight: 600;
		margin: 0 0 0.5rem;
	}

	.team-bio {
		color: var(--ec-ink-soft);
		font-size: 0.9rem;
		line-height: 1.65;
	}

	@media (max-width: 760px) {
		.team-grid {
			grid-template-columns: 1fr;
			margin-top: 1.5rem;
		}
	}
</style>
