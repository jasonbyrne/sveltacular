<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ComponentSize } from '$src/lib/types/size.js';
	import Spinner from '$src/lib/generic/spinner/spinner.svelte';

	let {
		type = 'spinner' as 'spinner' | 'block',
		spinnerSize = 'md' as ComponentSize,
		spinnerVariant = 'primary' as 'primary' | 'secondary',
		children
	}: {
		type?: 'spinner' | 'block';
		spinnerSize?: ComponentSize;
		spinnerVariant?: 'primary' | 'secondary';
		children?: Snippet;
	} = $props();
</script>

<div class={type}>
	{#if type === 'spinner'}
		<Spinner size={spinnerSize} variant={spinnerVariant} />
		<span class="spinner-text">
			{@render children?.()}
		</span>
	{:else}
		<span>
			{@render children?.()}
		</span>
	{/if}
</div>

<style lang="scss">
	div {
		text-align: center;

		span {
			display: block;
			width: 100%;
			padding: var(--spacing-base);
		}

		&.spinner {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: var(--spacing-base);
		}

		.spinner-text {
			padding: 0;
		}

		&.block {
			width: 100%;
			height: 100%;
			background-color: var(--gray-300);
			color: var(--gray-500);
			font-size: var(--font-2xl);
			font-family: var(--base-font-family);
			animation: pulse 2s infinite;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.5;
			transform: scale(0.95);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
