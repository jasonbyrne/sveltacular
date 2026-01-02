<script lang="ts">
	import type { Snippet } from 'svelte';
	import FlexRow from '$src/lib/layout/flex-row.svelte';
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
	<FlexRow>
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
	</FlexRow>
</header>

<style lang="scss">
	header {
		margin-bottom: 1rem;
		font-family: var(--base-headline-font-family, sans-serif);

		&.underline {
			padding-bottom: 0.5rem;
			border-bottom: solid 1px #ccc;
		}
	}
</style>
