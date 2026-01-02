<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<thead>
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
</style>
