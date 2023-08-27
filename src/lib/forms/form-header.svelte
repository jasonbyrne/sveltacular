<script lang="ts">
	import type { SectionLevel } from '../types/generic.js';
	import Headline from '../typography/headline.svelte';

	export let level: SectionLevel = 4;
	export let underline = true;
</script>

<div class:underline>
	<Headline {level}>
		<slot />
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
