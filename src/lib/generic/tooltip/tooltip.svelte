<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';

	let {
		text,
		position = 'top' as 'top' | 'bottom' | 'left' | 'right',
		children
	}: {
		text: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		children: Snippet;
	} = $props();

	const tooltipId = uniqueId();
	let show = $state(false);
</script>

<div
	class="tooltip-wrapper"
	onmouseenter={() => (show = true)}
	onmouseleave={() => (show = false)}
	onfocus={() => (show = true)}
	onblur={() => (show = false)}
>
	{@render children()}
	{#if show}
		<div class="tooltip {position}" role="tooltip" id={tooltipId} aria-live="polite">
			{text}
		</div>
	{/if}
</div>

<style lang="scss">
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	.tooltip {
		position: absolute;
		z-index: 1000;
		padding: 0.5rem 0.75rem;
		background-color: var(--tooltip-bg, #000);
		color: var(--tooltip-fg, #fff);
		border-radius: 0.25rem;
		font-size: 0.875rem;
		white-space: nowrap;
		pointer-events: none;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

		&.top {
			bottom: 100%;
			left: 50%;
			transform: translateX(-50%);
			margin-bottom: 0.5rem;
		}

		&.bottom {
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
			margin-top: 0.5rem;
		}

		&.left {
			right: 100%;
			top: 50%;
			transform: translateY(-50%);
			margin-right: 0.5rem;
		}

		&.right {
			left: 100%;
			top: 50%;
			transform: translateY(-50%);
			margin-left: 0.5rem;
		}
	}
</style>

