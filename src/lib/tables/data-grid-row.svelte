<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ColumnDef, JsonObject } from '$src/lib/types/data.js';
	import type { ButtonVariant, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import TableRow from './table-row.svelte';
	import TableSelectionCell from './table-selection-cell.svelte';
	import DataGridCell from './data-grid-cell.svelte';
	import DataGridActionsCell from './data-grid-actions-cell.svelte';

	interface CellContext<T extends JsonObject = JsonObject> {
		row: T;
		value: unknown;
		column: ColumnDef<T>;
		rowIndex: number;
	}

	interface Action {
		text: string;
		variant?: ButtonVariant;
		href?: (row: JsonObject) => string;
		onClick?: (row: JsonObject) => unknown;
	}

	interface Actions {
		text?: string;
		type?: 'buttons' | 'dropdown';
		variant?: ButtonVariant | 'default';
		size?: FormFieldSizeOptions;
		align?: 'left' | 'center' | 'right';
		items: Action[];
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
		row: JsonObject;
		rowIndex: number;
		visibleCols: ColumnDef[];
		hasSelectionCol?: boolean;
		hasActionCol?: boolean;
		actions?: Actions;
		cells?: Record<string, Snippet<[CellContext]>>;
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
		<DataGridCell
			{row}
			column={col}
			{rowIndex}
			cellSnippet={cells?.[col.key]}
			width={col.width}
		/>
	{/each}
	{#if hasActionCol && actions}
		<DataGridActionsCell {actions} {row} {actionButtonVariant} {actionButtonSize} {actionAlign} />
	{/if}
</TableRow>
