<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		color: var(--modal-body-fg);
		margin-top: var(--spacing-base);
		margin-bottom: var(--spacing-base);
	}
</style>
