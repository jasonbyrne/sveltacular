<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { JsonObject } from '$src/lib/types/data.js';
	import { getTableContext } from './table-context.svelte.js';

	let {
		children,
		row = undefined,
		rowIndex = undefined,
		selectable = false
	}: {
		children?: Snippet;
		row?: JsonObject;
		rowIndex?: number;
		selectable?: boolean;
	} = $props();

	const context = getTableContext();

	// Get row ID for selection
	let rowId = $derived(
		row && context?.config.rowIdKey ? (row[context.config.rowIdKey] as string | number) : undefined
	);

	let isSelected = $derived(rowId !== undefined && context ? context.isRowSelected(rowId) : false);

	let canSelect = $derived(selectable && context?.config.enableSelection && rowId !== undefined);

	function handleClick(event: MouseEvent) {
		if (canSelect && rowId !== undefined && rowIndex !== undefined) {
			const shiftKey = event.shiftKey;
			context?.toggleRow(rowId, rowIndex, shiftKey);
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (canSelect && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			if (rowId !== undefined && rowIndex !== undefined) {
				context?.toggleRow(rowId, rowIndex, event.shiftKey);
			}
		}
	}
</script>

<tr
	class:selectable={canSelect}
	class:selected={isSelected}
	aria-selected={canSelect ? isSelected : undefined}
	tabindex={canSelect ? 0 : undefined}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	role={canSelect ? 'row' : undefined}
>
	{@render children?.()}
</tr>

<style>
	tr {
		background-color: var(--table-row-even-bg, #fff);
		color: var(--table-row-even-fg, #000);
		border-bottom: solid 1px var(--table-row-even-border, #ddd);
		transition: background-color 0.15s ease;
	}

	tr:nth-of-type(odd) {
		background-color: var(--table-row-odd-bg, #f9f9f9);
		color: var(--table-row-odd-fg, #000);
	}

	tr.selectable {
		cursor: pointer;

		&:hover {
			background-color: var(--table-row-hover-bg, rgba(0, 0, 0, 0.05));
		}

		&:focus {
			outline: 2px solid var(--focus-color, #0066cc);
			outline-offset: -2px;
		}
	}

	tr.selected {
		background-color: var(--table-row-selected-bg, rgba(0, 102, 204, 0.1)) !important;
		border-color: var(--table-row-selected-border, #0066cc);
	}

	tr.selected.selectable:hover {
		background-color: var(--table-row-selected-hover-bg, rgba(0, 102, 204, 0.15)) !important;
	}
</style>
