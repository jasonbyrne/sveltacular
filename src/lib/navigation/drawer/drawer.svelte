<script lang="ts">
	import type { Snippet } from 'svelte';
	import Overlay from '$src/lib/generic/overlay.svelte';
	import { trapFocus, storeFocus, restoreFocus } from '$src/lib/helpers/focus.js';
	import { browser } from '$app/environment';

	let {
		open = $bindable(false),
		position = 'left' as 'left' | 'right' | 'top' | 'bottom',
		dismissable = true,
		onClose = undefined,
		children
	}: {
		open?: boolean;
		position?: 'left' | 'right' | 'top' | 'bottom';
		dismissable?: boolean;
		onClose?: (() => void) | undefined;
		children: Snippet;
	} = $props();

	let drawerElement: HTMLDivElement | null = $state(null);
	let previousFocus: HTMLElement | null = $state(null);

	const close = () => {
		if (!dismissable) return;
		open = false;
		onClose?.();
		if (browser && previousFocus) {
			restoreFocus(previousFocus);
		}
	};

	$effect(() => {
		if (open && browser && drawerElement) {
			previousFocus = storeFocus();
			const untrap = trapFocus(drawerElement);
			return () => {
				untrap();
			};
		}
	});
</script>

{#if open}
	<Overlay onclick={close}>
		<div
			bind:this={drawerElement}
			class="drawer {position}"
			role="dialog"
			aria-modal="true"
			onclick={(e) => e.stopPropagation()}
		>
			{@render children()}
		</div>
	</Overlay>
{/if}

<style lang="scss">
	.drawer {
		position: fixed;
		background-color: var(--drawer-bg, #fff);
		color: var(--drawer-fg, #000);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 10000;
		overflow-y: auto;

		&.left {
			top: 0;
			left: 0;
			width: 20rem;
			max-width: 80%;
			height: 100%;
			animation: slideInLeft 0.3s ease-out;
		}

		&.right {
			top: 0;
			right: 0;
			width: 20rem;
			max-width: 80%;
			height: 100%;
			animation: slideInRight 0.3s ease-out;
		}

		&.top {
			top: 0;
			left: 0;
			width: 100%;
			height: 20rem;
			max-height: 80%;
			animation: slideInTop 0.3s ease-out;
		}

		&.bottom {
			bottom: 0;
			left: 0;
			width: 100%;
			height: 20rem;
			max-height: 80%;
			animation: slideInBottom 0.3s ease-out;
		}
	}

	@keyframes slideInLeft {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes slideInRight {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes slideInTop {
		from {
			transform: translateY(-100%);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes slideInBottom {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>

