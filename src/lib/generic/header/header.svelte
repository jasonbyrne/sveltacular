<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';
	import Headline from '$src/lib/typography/headline.svelte';
	import Subtitle from '$src/lib/typography/subtitle.svelte';
	import { getContext } from 'svelte';

	const section: { title: string; level: SectionLevel } | undefined = getContext('section');

	let {
		level = (section?.level || 2) as SectionLevel,
		title = section?.title || '',
		subtitle = '',
		underline = false,
		children = undefined
	}: {
		level?: SectionLevel;
		title?: string;
		subtitle?: string;
		underline?: boolean;
		children?: Snippet;
	} = $props();
</script>

<header class:underline data-level={level}>
	<hgroup>
		<Headline {level}>{title}</Headline>
		{#if subtitle}
			<Subtitle {level}>{subtitle}</Subtitle>
		{/if}
	</hgroup>
	<div>
		{#if children}
			{@render children?.()}
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		gap: var(--spacing-base, 1rem);
		margin-bottom: var(--spacing-base, 1rem);
		font-family: var(--base-headline-font-family, sans-serif);

		&.underline {
			padding-bottom: var(--spacing-xs, 0.25rem);
			border-bottom: solid var(--border-thin, 1px) var(--divider-color, rgba(127, 127, 127, 0.5));
		}
	}
</style>
