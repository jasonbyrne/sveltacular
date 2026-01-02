<script lang="ts">
	import { randomInt } from '../helpers/random.js';

	let {
		minWidth = 50,
		maxWidth = 100,
		animation = 'pulse'
	}: {
		minWidth?: number;
		maxWidth?: number;
		animation?: 'pulse' | 'none';
	} = $props();

	let width = $derived(randomInt(minWidth, maxWidth));
</script>

<div class={animation} style="width: {width}%"></div>

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
			opacity: 0.2;
		}
		50% {
			opacity: 0.8;
		}
	}
</style>
