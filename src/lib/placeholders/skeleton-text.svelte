<script lang="ts">
	import { randomInt } from '../helpers/random.js';

	export let min = 50;
	export let max = 100;

	$: width = randomInt(min, max);
</script>

<div style="width: {width}%" />

<style>
	div {
		height: 1rem;
		background-color: var(--base-color-fg, #ccc);
		opacity: 0.5;
		border-radius: 1rem;
		margin-bottom: 1rem;
	}
</style>
