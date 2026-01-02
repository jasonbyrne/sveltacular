<script lang="ts">
	import type { Snippet } from 'svelte';
	import FlexRow from '../layout/flex-row.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div>
	<FlexRow justifyContent="stretch">
		{@render children?.()}
	</FlexRow>
</div>

<style>
	div {
		margin-top: 1.5rem;
	}
</style>
