<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';

	let { children }: { children?: Snippet } = $props();

	setContext('app-branding', true);
</script>

<div class="branding">
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
		width: 100%;
		height: 100%;
		padding-left: var(--spacing-sm);
		padding-right: var(--spacing-sm);
		overflow: visible;
	}
</style>
