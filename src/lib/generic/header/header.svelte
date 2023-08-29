<script lang="ts">
	import FlexRow from '$src/lib/layout/flex-row.svelte';
	import type { SectionLevel } from '$src/lib/types/generic.js';
	import Headline from '$src/lib/typography/headline.svelte';
	import Subtitle from '$src/lib/typography/subtitle.svelte';
	import { getContext } from 'svelte';

	const section: { title: string; level: SectionLevel } | undefined = getContext('section');

	export let level: SectionLevel = section?.level || 2;
	export let title: string = section?.title || '';
	export let subtitle = '';
	export let underline = false;
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
			<slot />
		</div>
	</FlexRow>
</header>

<style lang="scss">
	header {
		margin-bottom: 1rem;
		font-family: var(--base-head-font-family, sans-serif);

		&.underline {
			padding-bottom: 0.5rem;
			border-bottom: solid 1px #ccc;
		}
	}
</style>
