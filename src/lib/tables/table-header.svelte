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
		background: var(--table-header-bg, #333);
		color: var(--table-header-fg, #fff);
		border-top: solid 0.1rem var(--table-header-border, #000);
		border-bottom: solid 0.1rem var(--table-header-border, #000);
	}
</style>
