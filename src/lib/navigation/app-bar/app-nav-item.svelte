<script lang="ts">
	import type { Snippet } from 'svelte';
	import { navigateTo } from '$src/lib/index.js';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let {
		href = undefined,
		title,
		onClick = undefined,
		children = undefined
	}: {
		href?: string | undefined;
		title: string;
		onClick?: (() => void) | undefined;
		children?: Snippet;
	} = $props();

	const open: Writable<boolean> = getContext('app-nav-state');
	const click = () => {
		if (href) navigateTo(href);
		onClick?.();
	};
</script>

<button type="button" class={$open ? 'open' : 'closed'} onclick={click}>
	{#if children}
		<div class="icon">
			{@render children?.()}
		</div>
	{/if}
	<div class="title">
		{title}
	</div>
</button>

<style lang="scss">
	button {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		align-items: center;
		justify-content: center;
		height: 100%;
		min-width: 0;
		padding: 0.25rem 0.5rem;
		font-family: var(--nav-font-family, sans-serif);
		color: var(--nav-link, black);
		text-decoration: none;
		appearance: none;
		border: none;
		background-color: transparent;
		cursor: pointer;
		overflow: visible;

		&:hover {
			color: var(--nav-link-hover, black);
			text-decoration: underline;
		}

		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 1.5rem;
			height: 1.5rem;
			flex-shrink: 0;
			fill: var(--nav-link, black);
			stroke: var(--nav-link, black);

			:global(svg) {
				width: 100%;
				height: 100%;
				max-width: 1.5rem;
				max-height: 1.5rem;
			}
		}

		.title {
			font-size: 0.875rem;
			white-space: nowrap;
			overflow: visible;
			text-overflow: ellipsis;
			line-height: 1.2;
		}
	}

	:global(header.sm button),
	:global(header.xs button) {
		flex-direction: row;
		padding: 0.125rem 0.375rem;
		gap: 0.375rem;
		align-items: center;

		.icon {
			width: 1.25rem;
			height: 1.25rem;
			flex-shrink: 0;

			:global(svg) {
				max-width: 1.25rem;
				max-height: 1.25rem;
			}
		}

		.title {
			font-size: 0.75rem;
			line-height: 1;
		}
	}

	@media (max-width: 640px) {
		button.open {
			flex-direction: row;
			gap: 1rem;
			width: 100%;
			padding: 1rem;
			text-align: left;

			&:hover {
				text-decoration: none;
				background-color: var(--nav-menu-hover-bg, #ddd);
				color: var(--nav-menu-hover-fg, black);
			}

			.title {
				flex-grow: 1;
				font-size: 1rem;
			}

			.icon {
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}
</style>
