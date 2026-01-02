<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<table>
	{@render children?.()}
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		font-family: var(--base-font-family, sans-serif);
	}
</style>
