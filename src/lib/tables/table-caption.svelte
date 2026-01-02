<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		side = 'top' as 'top' | 'bottom',
		align = 'center' as 'left' | 'center' | 'right',
		children
	}: {
		side?: 'top' | 'bottom';
		align?: 'left' | 'center' | 'right';
		children: Snippet;
	} = $props();
</script>

<caption class="{side} {align}">
	{@render children?.()}
</caption>

<style lang="scss">
	caption {
		padding: 0.5rem 0.75rem;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.25rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-family: sans-serif;
		text-align: center;
		caption-side: top;

		&.bottom {
			caption-side: bottom;
		}

		&.left {
			text-align: left;
		}

		&.right {
			text-align: right;
		}
	}
</style>
