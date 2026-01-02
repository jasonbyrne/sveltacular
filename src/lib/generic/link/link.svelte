<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		target = undefined,
		underline = 'none' as 'none' | 'hover' | 'always',
		disabled = false,
		display = 'inline' as 'inline' | 'block' | 'inline-block',
		children
	}: {
		href: string;
		target?: string;
		underline?: 'none' | 'hover' | 'always';
		disabled?: boolean;
		display?: 'inline' | 'block' | 'inline-block';
		children: Snippet;
	} = $props();
</script>

{#if disabled}
	<span class="link disabled underline-{underline} {display}">
		{@render children?.()}
	</span>
{:else}
	<a {href} {target} class="link underline-{underline} {display}">
		{@render children?.()}
	</a>
{/if}

<style lang="scss">
	.link {
		text-decoration: underline;

		&.disabled {
			cursor: not-allowed;
		}

		&.underline-none,
		&.underline-hover {
			text-decoration: none;
		}

		&.block {
			display: block;
			width: 100%;
		}

		&.inline-block {
			display: inline-block;
		}

		&[href].underline-hover:hover {
			text-decoration: underline;
		}
	}
</style>
