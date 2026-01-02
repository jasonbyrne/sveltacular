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
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
</style>
