<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { listContext, type ListContext, type ListVariant } from './list.js';

	let {
		type = 'unordered' as 'unordered' | 'ordered',
		variant = 'none' as ListVariant,
		children
	}: {
		type?: 'unordered' | 'ordered';
		variant?: ListVariant;
		children: Snippet;
	} = $props();

	const ctx: ListContext = {
		variant
	};
	setContext(listContext, ctx);
</script>

{#if type === 'unordered'}
	<ul class={variant}>
		{@render children?.()}
	</ul>
{:else}
	<ol>
		{@render children?.()}
	</ol>
{/if}

<style lang="scss">
	.none {
		list-style-type: none;
		padding-left: 0.5rem;
	}

	.striped {
		list-style-type: none;
		padding-left: 0;
	}

	.disc {
		list-style-type: disc;
	}

	.circle {
		list-style-type: circle;
	}

	.square {
		list-style-type: square;
	}

	.decimal {
		list-style-type: decimal;
	}

	.decimal-leading-zero {
		list-style-type: decimal-leading-zero;
	}
</style>
