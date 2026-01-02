<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		sticky = false
	}: {
		children?: Snippet;
		sticky?: boolean;
	} = $props();
</script>

<thead class:sticky>
	{@render children?.()}
</thead>

<style>
	thead {
		display: table-header-group;
		vertical-align: middle;
		background: var(--table-header-bg);
		color: var(--table-header-fg);
		border-top: solid var(--border-thin) var(--table-header-border);
		border-bottom: solid var(--border-thin) var(--table-header-border);
	}

	thead.sticky {
		position: sticky;
		top: 0;
		z-index: 10;
	}

	thead.sticky :global(th) {
		position: sticky;
		top: 0;
		background: var(--table-header-bg);
		box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1);
	}
</style>
