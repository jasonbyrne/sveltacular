<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		colspan = 1,
		children
	}: {
		colspan?: number;
		children: Snippet;
	} = $props();
</script>

<td {colspan}>
	<div>
		{@render children?.()}
	</div>
</td>

<style>
	td {
		font-size: 0.8rem;
		font-family: sans-serif;
		text-shadow: 1px 1px 1px black;
	}

	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
