<script lang="ts">
	/**
	 * ContextMenu Component
	 * 
	 * A right-click menu with keyboard support and nested submenus.
	 * Fully accessible with ARIA roles and keyboard navigation.
	 * 
	 * @component
	 * @example
	 * ```svelte
	 * <ContextMenu bind:this={menu}>
	 *   <ContextMenuItem onClick={() => console.log('Edit')}>Edit</ContextMenuItem>
	 *   <ContextMenuItem onClick={() => console.log('Copy')}>Copy</ContextMenuItem>
	 *   <ContextMenuDivider />
	 *   <ContextMenuItem onClick={() => console.log('Delete')}>Delete</ContextMenuItem>
	 * </ContextMenu>
	 * 
	 * <div oncontextmenu={(e) => { e.preventDefault(); menu.show(e); }}>
	 *   Right-click me
	 * </div>
	 * ```
	 */
	import type { Snippet } from 'svelte';
	import { onMount, setContext } from 'svelte';
	import { fadeIn } from '$src/lib/helpers/animation-actions.js';

	let {
		children,
		onOpen = undefined,
		onClose = undefined,
		closeOnClick = true
	}: {
		children: Snippet;
		onOpen?: (() => void) | undefined;
		onClose?: (() => void) | undefined;
		closeOnClick?: boolean;
	} = $props();

	let isOpen = $state(false);
	let x = $state(0);
	let y = $state(0);
	let menuRef = $state<HTMLDivElement | null>(null);
	let highlightedIndex = $state(0);
	
	/**
	 * Show the context menu at the given position
	 */
	export function show(event: MouseEvent | { clientX: number; clientY: number }) {
		x = event.clientX;
		y = event.clientY;
		isOpen = true;
		highlightedIndex = 0;
		
		// Wait for next tick to ensure menu is rendered
		setTimeout(() => {
			adjustPosition();
			focusMenu();
			onOpen?.();
		}, 0);
	}

	/**
	 * Hide the context menu
	 */
	export function hide() {
		isOpen = false;
		onClose?.();
	}

	/**
	 * Adjust position to keep menu in viewport
	 */
	function adjustPosition() {
		if (!menuRef) return;

		const rect = menuRef.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Adjust horizontal position if menu goes off right edge
		if (x + rect.width > viewportWidth - 10) {
			x = viewportWidth - rect.width - 10;
		}

		// Adjust vertical position if menu goes off bottom edge
		if (y + rect.height > viewportHeight - 10) {
			y = viewportHeight - rect.height - 10;
		}

		// Ensure menu doesn't go off left edge
		if (x < 10) {
			x = 10;
		}

		// Ensure menu doesn't go off top edge
		if (y < 10) {
			y = 10;
		}
	}

	/**
	 * Focus the menu for keyboard navigation
	 */
	function focusMenu() {
		if (menuRef) {
			menuRef.focus();
		}
	}

	/**
	 * Get all menu items (not dividers)
	 */
	function getMenuItems(): HTMLElement[] {
		if (!menuRef) return [];
		return Array.from(menuRef.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])'));
	}

	/**
	 * Handle keyboard navigation
	 */
	function handleKeyDown(event: KeyboardEvent) {
		const items = getMenuItems();
		if (items.length === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				highlightedIndex = (highlightedIndex + 1) % items.length;
				(items[highlightedIndex] as HTMLElement).focus();
				break;

			case 'ArrowUp':
				event.preventDefault();
				highlightedIndex = highlightedIndex <= 0 ? items.length - 1 : highlightedIndex - 1;
				(items[highlightedIndex] as HTMLElement).focus();
				break;

			case 'Home':
				event.preventDefault();
				highlightedIndex = 0;
				(items[0] as HTMLElement).focus();
				break;

			case 'End':
				event.preventDefault();
				highlightedIndex = items.length - 1;
				(items[highlightedIndex] as HTMLElement).focus();
				break;

			case 'Escape':
				event.preventDefault();
				hide();
				break;
		}
	}

	/**
	 * Handle clicks outside the menu
	 */
	function handleClickOutside(event: MouseEvent) {
		if (!isOpen || !menuRef) return;
		
		const target = event.target as Node;
		if (!menuRef.contains(target)) {
			hide();
		}
	}

	/**
	 * Handle item clicks
	 */
	export function handleItemClick() {
		if (closeOnClick) {
			hide();
		}
	}

	// Provide context menu methods to child items
	setContext('contextMenu', {
		handleItemClick
	});

	onMount(() => {
		// Listen for clicks outside
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('contextmenu', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('contextmenu', handleClickOutside);
		};
	});
</script>

{#if isOpen}
	<div
		bind:this={menuRef}
		class="context-menu"
		role="menu"
		tabindex="-1"
		aria-orientation="vertical"
		onkeydown={handleKeyDown}
		style="left: {x}px; top: {y}px;"
		use:fadeIn={{ duration: 150 }}
	>
		{@render children()}
	</div>
{/if}

<style lang="scss">
	.context-menu {
		position: fixed;
		z-index: 10000;
		min-width: 12rem;
		background: var(--form-input-bg, white);
		border: 1px solid var(--form-input-border, #ccc);
		border-radius: var(--border-radius-md, 0.375rem);
		box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
		padding: 0.25rem 0;
		font-family: var(--base-font-family, sans-serif);
		outline: none;
		
		&:focus-visible {
			outline: 2px solid var(--focus-ring-color, #0066cc);
			outline-offset: 2px;
		}
	}
</style>

