<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		grow = false,
		align = 'auto',
		children
	}: {
		grow?: boolean;
		align?: 'start' | 'center' | 'end' | 'stretch' | 'auto';
		children: Snippet;
	} = $props();
</script>

<div style={`flex: ${grow ? 1 : 0}; align-self: ${align}`}>
	{@render children?.()}
</div>
