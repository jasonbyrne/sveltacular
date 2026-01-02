<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<p>
	{@render children?.()}
</p>

<style>
	p {
		margin-top: 0;
		margin-bottom: 1rem;
		font-weight: 300;
		font-size: 1rem;
		font-family: var(--base-font-family, sans-serif);
	}
</style>
