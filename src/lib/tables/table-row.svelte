<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PlainObject } from '$src/lib/types/data.js';
	import { getTableContext } from './table-context.svelte.js';

	let {
		children,
		row = undefined,
		rowIndex = undefined,
		selectable = false
	}: {
		children?: Snippet;
		row?: PlainObject;
		rowIndex?: number;
		selectable?: boolean;
	} = $props();

	const context = getTableContext();

	// Get row ID for selection
	let rowId = $derived(
		row && context?.config.rowIdKey ? (row[context.config.rowIdKey] as string | number) : undefined
	);

	let selectionMode = $derived(context?.config.selectionMode ?? 'none');
	let canSelect = $derived(selectable && selectionMode !== 'none' && rowId !== undefined);
</script>

<tr class:selectable={canSelect}>
	{@render children?.()}
</tr>

<style>
	tr {
		background-color: var(--table-row-even-bg, #fff);
		color: var(--table-row-even-fg, #000);
		border-bottom: solid 1px var(--table-row-even-border, #ddd);
		transition: background-color 0.15s ease;
		position: relative;
	}

	tr:nth-of-type(odd) {
		background-color: var(--table-row-odd-bg, #f9f9f9);
		color: var(--table-row-odd-fg, #000);
	}

	tr.selectable {
		&:hover {
			background-color: var(--table-row-hover-bg, rgba(0, 0, 0, 0.05));
		}

		&:focus {
			outline: 2px solid var(--focus-color, #0066cc);
			outline-offset: -2px;
		}
	}
</style>
