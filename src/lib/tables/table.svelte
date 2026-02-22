<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PlainObject } from '$src/lib/types/data.js';
	import { createTableContext, type TableContextConfig } from './table-context.svelte.js';
	import { untrack } from 'svelte';

	let {
		children,
		rows = [],
		enableSorting = true,
		selectionMode = 'none',
		rowIdKey = 'id',
		stickyHeader = false,
		onSort = undefined,
		onSelectionChange = undefined
	}: {
		children?: Snippet;
		rows?: PlainObject[];
		enableSorting?: boolean;
		selectionMode?: 'none' | 'single' | 'multi';
		rowIdKey?: string;
		stickyHeader?: boolean;
		onSort?: (column: string, direction: 'asc' | 'desc') => void;
		onSelectionChange?: (selectedRowIds: (string | number)[]) => void;
	} = $props();

	// Create table context for child components
	// Using untrack() to indicate we intentionally want non-reactive initial values
	const config: TableContextConfig<PlainObject> = {
		enableSorting: untrack(() => enableSorting),
		selectionMode: untrack(() => selectionMode),
		rowIdKey: untrack(() => rowIdKey),
		onSort: untrack(() => onSort),
		onSelectionChange: untrack(() => onSelectionChange),
		rows: untrack(() => rows)
	};

	const context = createTableContext(config);

	// Keep context.rows (reactive) updated when rows prop changes so selection header/cells
	// always see the current table rows (e.g. after load or when rows change)
	$effect(() => {
		context.rows = rows;
		context.config.rows = rows; // backward compatibility
	});
</script>

<table
	class:sticky-header={stickyHeader}
	role="grid"
	aria-rowcount={undefined}
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
