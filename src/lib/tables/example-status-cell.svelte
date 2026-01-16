<script lang="ts">
	import type { CellRendererProps } from '$src/lib/types/data.js';

	interface MyData {
		name: string;
	}

	let { row }: CellRendererProps<MyData> = $props();
</script>

<div>foobar {row.name}</div>
