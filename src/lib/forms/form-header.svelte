<script lang="ts">
	import type { SectionLevel } from '../types/generic.js';
	import Headline from '../typography/headline.svelte';

	export let title: string;
	export let level: SectionLevel = 4;
</script>

<div>
	<Headline {level}>{title}</Headline>
</div>

<style lang="scss">
	div {
		margin-bottom: 1rem;
	}
</style>
