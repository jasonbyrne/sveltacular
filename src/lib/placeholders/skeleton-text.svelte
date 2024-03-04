<script lang="ts">
	import { randomInt } from '../helpers/random.js';

	export let min = 50;
	export let max = 100;
    export let animation: 'pulse' | 'none' = 'none';

	$: width = randomInt(min, max);
</script>

<div class="{animation}" style="width: {width}%" />

<style lang="scss">
	div {
		height: 1rem;
		background-color: var(--base-color-fg, #ccc);
		opacity: 0.5;
		border-radius: 1rem;
		margin-bottom: 1rem;

		&.pulse {
       		animation: pulse 2s infinite;
    	}
	}

	
    @keyframes pulse {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 1;
		}
	}
</style>
