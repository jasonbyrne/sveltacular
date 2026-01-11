<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Icon } from '$src/lib/index.js';
	import { hasContext } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';

	let {
		open = $bindable(false),
		text = undefined,
		variant = 'standard' as 'standard' | 'ghost',
		icon = 'arrow' as 'arrow' | 'none',
		children
	}: {
		open?: boolean;
		text?: string;
		variant?: 'standard' | 'ghost';
		icon?: 'arrow' | 'none';
		children: Snippet;
	} = $props();

	const id = uniqueId();
	const buttonId = `dropdown-button-${id}`;
	const menuId = `dropdown-menu-${id}`;

	const onClick = () => {
		open = !open;
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && open) {
			e.preventDefault();
			open = false;
			// Return focus to button
			document.getElementById(buttonId)?.focus();
		}
	};

	let hasText = $derived(text && text.length > 0);
</script>

<div
	class="dropdown-button {variant} icon-{icon}"
	class:open
	role="presentation"
	onkeydown={handleKeyDown}
>
	<button
		id={buttonId}
		type="button"
		onclick={onClick}
		class:hasText
		aria-expanded={open}
		aria-controls={menuId}
		aria-haspopup="true"
		aria-label={text || 'Open menu'}
	>
		{#if hasText}
			<div class="text">
				{text}
			</div>
		{/if}
		{#if icon === 'arrow'}
			<div class="icon" aria-hidden="true">
				<span>
					<Icon type="angle-up" size="sm" />
				</span>
			</div>
		{/if}
	</button>
	{#if open}
		<div id={menuId} class="menu" role="menu">
			{@render children?.()}
		</div>
	{/if}
</div>

<style lang="scss">
	.dropdown-button {
		position: relative;
		display: inline-block;

		button {
			width: 100%;
			min-width: 7rem;
			position: relative;
			text-align: left;
			cursor: pointer;
			border-radius: 0.5rem 0.5rem 0 0;
			border-width: 1px;
			border-style: solid;
			user-select: none;
			white-space: nowrap;
			display: inline-block;
			font-size: 0.875rem;
			font-weight: 500;
			line-height: 1.25rem;
			padding: 0.5rem 1rem;
			font-family: var(--base-font-family, sans-serif);
			background-color: var(--button-secondary-bg, #555);
			border-color: var(--button-secondary-border, #aaa);
			color: var(--button-secondary-fg, #fff);

			&:hover {
				background-color: var(--button-secondary-hover-bg, #333);
				color: var(--button-secondary-hover-fg, #fff);
			}

			.icon {
				display: block;
				text-align: center;
				line-height: 1.5rem;

				span {
					display: inline-block;
					width: 1rem;
					height: 1rem;
				}
			}

			&.hasText {
				.text {
					padding-right: 2rem;
					min-height: 1.5rem;
					line-height: 1.5rem;
				}

				.icon {
					position: absolute;
					top: 0;
					right: 0;
					height: 100%;
					width: 2rem;
					padding: 0.5rem;
				}
			}
		}

		.menu {
			position: absolute;
			top: 100%;
			left: 0;
			min-width: 100%;
			background-color: #fff;
			color: #000;
			border-style: solid;
			border-width: 1px;
			border-color: var(--button-secondary-border, #aaa);
			z-index: 999;
			text-align: center;
		}

		&.open {
			.icon {
				transition: transform 0.3s linear;
				transform: rotate(180deg);
			}
		}

		&.icon-none {
			button {
				.text {
					padding-right: 0.5rem;
				}
				.icon {
					display: none;
				}
			}
		}

		&.ghost {
			button {
				background-color: inherit;
				border: none;
				color: inherit;

				&:hover {
					background-color: var(--button-ghost-hover-bg, #333);
					color: var(--button-ghost-hover-fg, #fff);
				}
			}
		}
	}
</style>
