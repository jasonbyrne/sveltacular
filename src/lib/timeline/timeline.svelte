<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<ul>
	{@render children()}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding-left: 1rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
		margin: 0;
		border-left: 0.2rem solid #000;
		font-family: var(--base-font-family, sans-serif);
	}
</style>
