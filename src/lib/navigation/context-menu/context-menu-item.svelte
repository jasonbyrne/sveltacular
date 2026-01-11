<script lang="ts">
	/**
	 * ContextMenuItem Component
	 *
	 * Individual item in a context menu. Can contain a submenu.
	 *
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import { getContext } from 'svelte';
	import Icon from '$src/lib/icons/icon.svelte';

	let {
		onClick = undefined,
		disabled = false,
		danger = false,
		icon = undefined,
		submenu = undefined,
		children
	}: {
		onClick?: (() => void) | undefined;
		disabled?: boolean;
		danger?: boolean;
		icon?: Snippet | undefined;
		submenu?: Snippet | undefined;
		children: Snippet;
	} = $props();

	let showSubmenu = $state(false);
	let itemRef: HTMLDivElement | null = null;
	let submenuRef = $state<HTMLDivElement | null>(null);
	let submenuTimeout: number | null = null;

	/**
	 * Handle item click
	 */
	function handleClick(event: Event) {
		if (disabled) {
			event.preventDefault();
			return;
		}

		// If there's a submenu, toggle it instead of closing
		if (submenu) {
			event.stopPropagation();
			showSubmenu = !showSubmenu;
			return;
		}

		onClick?.();

		// Get the context menu and tell it to close
		const contextMenu = getContext('contextMenu') as any;
		if (contextMenu?.handleItemClick) {
			contextMenu.handleItemClick();
		}
	}

	/**
	 * Handle keyboard interaction
	 */
	function handleKeyDown(event: KeyboardEvent) {
		if (disabled) return;

		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault();
				handleClick(event);
				break;

			case 'ArrowRight':
				if (submenu) {
					event.preventDefault();
					event.stopPropagation();
					showSubmenu = true;
					// Focus first item in submenu
					setTimeout(() => {
						const firstItem = submenuRef?.querySelector('[role="menuitem"]') as HTMLElement;
						firstItem?.focus();
					}, 0);
				}
				break;

			case 'ArrowLeft':
				if (showSubmenu) {
					event.preventDefault();
					event.stopPropagation();
					showSubmenu = false;
					itemRef?.focus();
				}
				break;
		}
	}

	/**
	 * Show submenu on hover
	 */
	function handleMouseEnter() {
		if (submenu && !disabled) {
			if (submenuTimeout) {
				clearTimeout(submenuTimeout);
			}
			submenuTimeout = window.setTimeout(() => {
				showSubmenu = true;
			}, 200);
		}
	}

	/**
	 * Hide submenu on leave
	 */
	function handleMouseLeave() {
		if (submenuTimeout) {
			clearTimeout(submenuTimeout);
			submenuTimeout = null;
		}
		// Don't hide if mouse is over submenu
		if (submenu) {
			setTimeout(() => {
				const isOverSubmenu = submenuRef?.matches(':hover');
				if (!isOverSubmenu) {
					showSubmenu = false;
				}
			}, 100);
		}
	}

	/**
	 * Position submenu
	 */
	function getSubmenuPosition() {
		if (!itemRef) return 'left: 100%; top: 0;';

		const rect = itemRef.getBoundingClientRect();
		const viewportWidth = window.innerWidth;

		// Check if submenu would go off right edge
		const wouldOverflow = rect.right + 200 > viewportWidth; // Assume 200px submenu width

		if (wouldOverflow) {
			return 'right: 100%; top: 0;';
		}

		return 'left: 100%; top: 0;';
	}
</script>

<div
	bind:this={itemRef}
	class="context-menu-item"
	class:disabled
	class:danger
	class:has-submenu={!!submenu}
	role="menuitem"
	tabindex={disabled ? -1 : 0}
	aria-disabled={disabled}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	{#if icon}
		<span class="icon" aria-hidden="true">
			{@render icon()}
		</span>
	{/if}

	<span class="label">
		{@render children()}
	</span>

	{#if submenu}
		<span class="arrow" aria-hidden="true">
			<Icon type="angle-right" size="sm" />
		</span>

		{#if showSubmenu}
			<div
				bind:this={submenuRef}
				class="submenu"
				role="menu"
				aria-orientation="vertical"
				style={getSubmenuPosition()}
			>
				{@render submenu()}
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.context-menu-item {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		color: var(--form-input-fg, #000);
		font-size: 0.875rem;
		transition: background-color 0.15s ease;
		outline: none;

		&:hover:not(.disabled) {
			background-color: var(--form-input-selected-bg, #0066cc);
			color: var(--form-input-selected-fg, white);
		}

		&:focus-visible {
			background-color: var(--form-input-selected-bg, #0066cc);
			color: var(--form-input-selected-fg, white);
			outline: 2px solid var(--focus-ring-color, #0066cc);
			outline-offset: -2px;
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&.danger {
			color: var(--danger-color, #dc2626);

			&:hover:not(.disabled),
			&:focus-visible {
				background-color: var(--danger-color, #dc2626);
				color: white;
			}
		}

		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 1rem;
			height: 1rem;
			flex-shrink: 0;
		}

		.label {
			flex: 1;
			white-space: nowrap;
		}

		.arrow {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 1rem;
			height: 1rem;
			flex-shrink: 0;
			margin-left: auto;
		}

		.submenu {
			position: absolute;
			z-index: 10001;
			min-width: 12rem;
			background: var(--form-input-bg, white);
			border: 1px solid var(--form-input-border, #ccc);
			border-radius: var(--border-radius-md, 0.375rem);
			box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
			padding: 0.25rem 0;
			animation: fadeIn 0.15s ease;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
