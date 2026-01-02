<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ComponentSize } from '$src/lib/types/size.js';
	import { getMaxWidth, getDisplayType } from '$src/lib/types/size.js';

	let {
		size = 'full',
		children
	}: {
		size?: ComponentSize;
		children: Snippet;
	} = $props();

	let displayType = $derived(getDisplayType(size));
	let maxWidth = $derived(getMaxWidth(size));
</script>

<div style={`display: ${displayType}; width: 100%; min-width: 10rem; max-width: ${maxWidth}`}>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		margin-bottom: var(--spacing-base);
		margin-right: var(--spacing-base);
	}
</style>
