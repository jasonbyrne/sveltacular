<script lang="ts">
	import type { CellRendererProps } from '$src/lib/types/data.js';

	let {
		row
	}: CellRendererProps<{
		name: string;
	}> = $props();
</script>

<div>foobar {row.name}</div>
