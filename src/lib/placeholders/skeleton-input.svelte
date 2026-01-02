<script lang="ts">
	import FlexItem from '../layout/flex-item.svelte';

	let { animation = 'shimmer' }: { animation?: 'pulse' | 'shimmer' | 'none' } = $props();
</script>

<FlexItem>
	<div class="box">
		<div class="label {animation}"></div>
		<div class="input {animation}"></div>
	</div>
</FlexItem>

<style lang="scss">
	div.label {
		height: 1rem;
		background-color: var(--gray-200);
		border-radius: var(--radius-md);
		margin-bottom: var(--spacing-base);
		width: 35%;
		position: relative;
		overflow: hidden;

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

		&.pulse {
			animation: pulse 2s ease-in-out infinite;
		}
	}

	div.input {
		height: 2.5rem;
		width: 100%;
		border: var(--border-thin) solid var(--gray-300);
		background-color: var(--gray-100);
		border-radius: var(--radius-md);
		position: relative;
		overflow: hidden;

		&.shimmer {
			background: linear-gradient(
				90deg,
				var(--gray-100) 0%,
				var(--gray-200) 40%,
				var(--gray-100) 80%
			);
			background-size: 200% 100%;
			animation: shimmer 2s ease-in-out infinite;
		}

		&.pulse {
			animation: pulse 2s ease-in-out infinite;
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
		div.pulse,
		div.shimmer {
			animation: none;
			opacity: 0.7;
		}
	}
</style>
