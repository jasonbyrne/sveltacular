<script lang="ts">
	import type { Snippet } from 'svelte';
	import FlexRow from '../layout/flex-row.svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<footer>
	<FlexRow justifyContent="stretch">
		{@render children?.()}
	</FlexRow>
</footer>
