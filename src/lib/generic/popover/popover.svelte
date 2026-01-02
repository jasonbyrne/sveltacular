<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import { browser } from '$app/environment';

	let {
		open = $bindable(false),
		position = 'bottom' as 'top' | 'bottom' | 'left' | 'right',
		trigger,
		children
	}: {
		open?: boolean;
		position?: 'top' | 'bottom' | 'left' | 'right';
		trigger?: Snippet;
		children?: Snippet;
	} = $props();

	const popoverId = uniqueId();
	let triggerElement: HTMLElement | null = $state(null);
	let popoverElement: HTMLElement | null = $state(null);

	const handleClickOutside = (e: MouseEvent) => {
		if (
			browser &&
			popoverElement &&
			triggerElement &&
			!popoverElement.contains(e.target as Node) &&
			!triggerElement.contains(e.target as Node)
		) {
			open = false;
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			open = !open;
		}
	};

	$effect(() => {
		if (open && browser) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<div class="popover-wrapper">
	<div
		bind:this={triggerElement}
		onclick={() => (open = !open)}
		onkeydown={handleKeyDown}
		role="button"
		tabindex="0"
		aria-expanded={open}
		aria-haspopup="true"
	>
		{@render trigger?.()}
	</div>
	{#if open}
		<div
			bind:this={popoverElement}
			class="popover {position}"
			role="dialog"
			id={popoverId}
			aria-modal="false"
		>
			{@render children?.()}
		</div>
	{/if}
</div>

<style lang="scss">
	.popover-wrapper {
		position: relative;
		display: inline-block;
	}

	.popover {
		position: absolute;
		z-index: 1000;
		padding: var(--spacing-md);
		background-color: var(--popover-bg);
		border: var(--border-thin) solid var(--popover-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		min-width: 12rem;
		max-width: 20rem;

		&.top {
			bottom: 100%;
			left: 50%;
			transform: translateX(-50%);
			margin-bottom: var(--spacing-sm);
		}

		&.bottom {
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
			margin-top: var(--spacing-sm);
		}

		&.left {
			right: 100%;
			top: 50%;
			transform: translateY(-50%);
			margin-right: var(--spacing-sm);
		}

		&.right {
			left: 100%;
			top: 50%;
			transform: translateY(-50%);
			margin-left: var(--spacing-sm);
		}
	}
</style>
