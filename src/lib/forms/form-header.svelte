<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SectionLevel } from '../types/generic.js';
	import Headline from '../typography/headline.svelte';

	let {
		level = 4,
		underline = true,
		children
	}: {
		level?: SectionLevel;
		underline?: boolean;
		children: Snippet;
	} = $props();
</script>

<div class:underline>
	<Headline {level}>
		{@render children?.()}
	</Headline>
</div>

<style lang="scss">
	div {
		margin-bottom: 1rem;

		&.underline {
			padding-bottom: 0.5rem;
			border-bottom: solid 1px var(--divider-color, rgba(127, 127, 127, 0.5));
		}
	}
</style>
