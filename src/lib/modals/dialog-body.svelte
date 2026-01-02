<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		color: #000;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
