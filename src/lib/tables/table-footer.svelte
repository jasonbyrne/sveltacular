<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<tfoot>
	{@render children?.()}
</tfoot>

<style>
	tfoot {
		background: var(--table-footer-bg);
		color: var(--table-footer-fg);
		border-top: solid var(--border-thin) var(--table-footer-border);
		border-bottom: solid var(--border-thin) var(--table-footer-border);
		font-size: var(--font-sm);
	}
</style>
