<script lang="ts">
	import { randomInt } from '../helpers/random.js';

	let {
		minWidth = 50,
		maxWidth = 100,
		animation = 'shimmer'
	}: {
		minWidth?: number;
		maxWidth?: number;
		animation?: 'pulse' | 'shimmer' | 'none';
	} = $props();

	let width = $derived(randomInt(minWidth, maxWidth));
</script>

<div class="skeleton {animation}" style="width: {width}%"></div>

<style lang="scss">
	.skeleton {
		height: 1rem;
		background-color: var(--gray-200);
		border-radius: var(--radius-md);
		margin-bottom: var(--spacing-base);
		position: relative;
		overflow: hidden;

		&.pulse {
			animation: pulse 2s ease-in-out infinite;
		}

		&.shimmer {
			background: linear-gradient(
				90deg,
				var(--gray-200) 0%,
				var(--gray-300) 40%,
				var(--gray-200) 80%
			);
			background-size: 200% 100%;
			animation: shimmer 2s ease-in-out infinite;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	/* Respect prefers-reduced-motion */
	@media (prefers-reduced-motion: reduce) {
		.skeleton.pulse,
		.skeleton.shimmer {
			animation: none;
			opacity: 0.7;
		}
	}
</style>
