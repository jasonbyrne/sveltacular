<script lang="ts">
	import type { CellRendererProps } from '$src/lib/types/data.js';
	import Pill from '../generic/pill/pill.svelte';

	type StatusValue = 'active' | 'completed' | 'on-hold';

	let { value }: CellRendererProps = $props();
</script>

{#if value === 'active'}
	<Pill variant="positive" compact label="✓ Active" />
{:else if value === 'completed'}
	<Pill variant="standard" compact label="✓ Completed" />
{:else}
	<Pill variant="negative" compact label="⚠ On Hold" />
{/if}
