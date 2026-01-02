<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { JsonObject } from '$src/lib/types/data.js';
	import { createTableContext, type TableContextConfig } from './table-context.svelte.js';
	import { untrack } from 'svelte';

	let {
		children,
		enableSorting = true,
		enableSelection = false,
		selectionMode = 'multi',
		rowIdKey = 'id',
		stickyHeader = false,
		onSort = undefined,
		onSelectionChange = undefined
	}: {
		children?: Snippet;
		enableSorting?: boolean;
		enableSelection?: boolean;
		selectionMode?: 'single' | 'multi';
		rowIdKey?: string;
		stickyHeader?: boolean;
		onSort?: (column: string, direction: 'asc' | 'desc') => void;
		onSelectionChange?: (selectedIds: Set<string | number>) => void;
	} = $props();

	// Create table context for child components
	// Using untrack() to indicate we intentionally want non-reactive initial values
	const config: TableContextConfig<JsonObject> = {
		enableSorting: untrack(() => enableSorting),
		enableSelection: untrack(() => enableSelection),
		selectionMode: untrack(() => selectionMode),
		rowIdKey: untrack(() => rowIdKey),
		onSort: untrack(() => onSort),
		onSelectionChange: untrack(() => onSelectionChange)
	};

	createTableContext(config);
</script>

<table
	class:sticky-header={stickyHeader}
	role="grid"
	aria-rowcount={enableSelection ? undefined : undefined}
	aria-colcount={undefined}
>
	{@render children?.()}
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		font-family: var(--base-font-family, sans-serif);
		position: relative;
	}

	table.sticky-header :global(thead) {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--table-header-bg);
	}

	table.sticky-header :global(thead th) {
		position: sticky;
		top: 0;
		background: var(--table-header-bg);
	}
</style>
