<script lang="ts">
	import { randomInt } from '../helpers/random.js';
	import SkeletonText from './skeleton-text.svelte';

	let {
		minLines = 3,
		maxLines = 5,
		animation = 'shimmer'
	}: {
		minLines?: number;
		maxLines?: number;
		animation?: 'pulse' | 'shimmer' | 'none';
	} = $props();

	let lines = $derived(randomInt(minLines, maxLines));
	let lineArray = $derived(Array.from({ length: lines }, (_, i) => i));
</script>

{#each lineArray as index}
	<SkeletonText
		{animation}
		minWidth={index === lines - 1 ? 30 : 80}
		maxWidth={index === lines - 1 ? 60 : 100}
	/>
{/each}
