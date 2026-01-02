<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id = undefined,
		children
	}: {
		id?: string | undefined;
		children?: Snippet;
	} = $props();
</script>

<header>
	<h1 {id}>{@render children?.()}</h1>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1.75rem;
		overflow: hidden;
		color: #000;
		font-family: var(--base-headline-font-family, sans-serif);

		h1 {
			margin: 0;
			flex-grow: 1;
			font-size: 1.25rem;
			line-height: 1.75rem;
		}
	}
</style>
