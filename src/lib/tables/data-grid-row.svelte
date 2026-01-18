<script lang="ts" generics="T extends PlainObject">
	import type { Snippet } from 'svelte';
	import type { ColumnDef, PlainObject, RowActions } from '$src/lib/types/data.js';
	import type { ButtonVariant, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import TableRow from './table-row.svelte';
	import TableSelectionCell from './table-selection-cell.svelte';
	import DataGridCell from './data-grid-cell.svelte';
	import DataGridActionsCell from './data-grid-actions-cell.svelte';

	interface CellContext<TRow extends PlainObject = PlainObject> {
		row: TRow;
		value: unknown;
		column: ColumnDef<TRow>;
		rowIndex: number;
	}

	let {
		row,
		rowIndex,
		visibleCols,
		hasSelectionCol = false,
		hasActionCol = false,
		actions = undefined,
		cells = undefined,
		actionButtonVariant = 'outline',
		actionButtonSize = 'sm',
		actionAlign = 'center'
	}: {
		row: T;
		rowIndex: number;
		visibleCols: ColumnDef<T>[];
		hasSelectionCol?: boolean;
		hasActionCol?: boolean;
		actions?: RowActions<T>;
		cells?: Record<string, Snippet<[CellContext<T>]>>;
		actionButtonVariant?: ButtonVariant;
		actionButtonSize?: FormFieldSizeOptions;
		actionAlign?: 'left' | 'center' | 'right';
	} = $props();
</script>

<TableRow {row} {rowIndex} selectable={hasSelectionCol}>
	{#if hasSelectionCol}
		<TableSelectionCell {row} {rowIndex} />
	{/if}
	{#each visibleCols as col}
		<DataGridCell {row} column={col} {rowIndex} cellSnippet={cells?.[col.key]} width={col.width} />
	{/each}
	{#if hasActionCol && actions}
		<DataGridActionsCell {actions} {row} {actionButtonVariant} {actionButtonSize} {actionAlign} />
	{/if}
</TableRow>
