<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';
	import Headline from '$src/lib/typography/headline.svelte';
	import Subtitle from '$src/lib/typography/subtitle.svelte';
	import { getContext } from 'svelte';
	import Paragraph from '$src/lib/typography/paragraph.svelte';

	const section: { title: string; level: SectionLevel } | undefined = getContext('section');

	let {
		level = (section?.level || 2) as SectionLevel,
		title = section?.title || '',
		subtitle = '',
		description = '',
		underline = false,
		children = undefined
	}: {
		level?: SectionLevel;
		title?: string | undefined;
		subtitle?: string | undefined;
		description?: string | undefined;
		underline?: boolean;
		children?: Snippet | undefined;
	} = $props();
</script>

<header class:underline data-level={level}>
	<hgroup>
		<Headline {level}>{title}</Headline>
		{#if subtitle}
			<Subtitle {level}>{subtitle}</Subtitle>
		{/if}
		{#if description}
			<Paragraph>{description}</Paragraph>
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
