<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div>
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		gap: var(--spacing-base);
		justify-content: flex-end;
		margin-top: var(--spacing-lg);
		margin-top: var(--spacing-xl);
	}
</style>
