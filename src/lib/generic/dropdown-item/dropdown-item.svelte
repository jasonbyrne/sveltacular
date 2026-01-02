<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href = undefined,
		target = undefined,
		tabindex = 0,
		onClick = undefined,
		children
	}: {
		href?: string | undefined;
		target?: string | undefined;
		tabindex?: number;
		onClick?: (() => void) | undefined;
		children: Snippet;
	} = $props();

	const handleClick = () => {
		onClick?.();
	};
</script>

{#if !href}
	<span class="item" onclick={handleClick} onkeyup={handleClick} role="link" {tabindex}>
		{@render children?.()}
	</span>
{:else}
	<a {href} {target} class="item" onclick={handleClick} {tabindex}>
		{@render children?.()}
	</a>
{/if}

<style lang="scss">
	.item {
		display: block;
		cursor: pointer;
		padding: 0.5rem 1rem;
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		font-family: var(--base-font-family, sans-serif);
		white-space: nowrap;

		&:hover {
			background-color: var(--button-secondary-hover-bg, #333);
			color: var(--button-secondary-hover-fg, #fff);
		}
	}
</style>
