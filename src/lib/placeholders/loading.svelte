<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ComponentSize } from '$src/lib/types/size.js';
	import Spinner from '$src/lib/generic/spinner/spinner.svelte';

	let {
		type = 'spinner' as 'spinner' | 'block',
		size = 'md' as ComponentSize,
		spinnerVariant = 'primary' as 'primary' | 'secondary',
		children
	}: {
		type?: 'spinner' | 'block';
		size?: ComponentSize;
		spinnerVariant?: 'primary' | 'secondary';
		children?: Snippet;
	} = $props();

	const iconSize = $derived.by(() => {
		switch (size) {
			case 'xs':
				return 'sm';
			case 'sm':
				return 'md';
			case 'md':
				return 'lg';
			case 'lg':
				return 'xl';
			case 'xl':
				return 'xl';
			default:
				return 'md';
		}
	});
</script>

<div class="{type} {size}">
	{#if type === 'spinner'}
		<Spinner size={iconSize} variant={spinnerVariant} />
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
		font-family: var(--base-font-family, sans-serif);

		&.xl {
			font-size: 1.25rem;
		}
		&.lg {
			font-size: 1rem;
		}
		&.md {
			font-size: 0.875rem;
		}
		&.sm {
			font-size: 0.75rem;
		}
		&.xs {
			font-size: 0.625rem;
		}

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
