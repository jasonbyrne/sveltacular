<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<ul>
	{@render children()}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding-left: var(--spacing-base);
		padding-top: var(--spacing-base);
		padding-bottom: var(--spacing-base);
		margin: 0;
		border-left: var(--border-base) solid var(--base-color-fg);
		font-family: var(--base-font-family);
	}
</style>
