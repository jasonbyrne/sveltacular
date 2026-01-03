<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		transform = 'none' as 'uppercase' | 'lowercase' | 'capitalize' | 'none',
		size = 'md' as 'sm' | 'md' | 'lg',
		display = 'block' as 'block' | 'inline',
		children
	}: {
		transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
		size?: 'sm' | 'md' | 'lg';
		display?: 'block' | 'inline';
		children: Snippet;
	} = $props();
</script>

<div class="{transform} {size} {display}">
	{#if size === 'sm'}
		<small>{@render children?.()}</small>
	{:else}
		{@render children?.()}
	{/if}
</div>

<style lang="scss">
	div {
		font-family: var(--base-font-family, sans-serif);
		color: #2d3748;

		:global([data-theme='dark']) & {
			color: #e6edf3;
		}

		&.sm {
			font-size: 60%;
		}

		&.lg {
			font-size: 140%;
		}

		&.block {
			display: block;
		}

		&.inline {
			display: inline;
		}

		&.uppercase {
			text-transform: uppercase;
		}

		&.lowercase {
			text-transform: lowercase;
		}

		&.capitalize {
			text-transform: capitalize;
		}
	}
</style>
