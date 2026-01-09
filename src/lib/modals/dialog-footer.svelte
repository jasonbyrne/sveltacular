<script lang="ts">
	import type { Snippet } from 'svelte';
	import FlexRow from '../layout/flex-row.svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<footer>
	<FlexRow justify="flex-end" gap="md">
		{@render children?.()}
	</FlexRow>
</footer>
