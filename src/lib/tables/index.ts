// Main components
export { default as DataGrid } from './data-grid.svelte';
export { default as Table } from './table.svelte';
export { default as TableCell } from './table-cell.svelte';
export { default as TableHeader } from './table-header.svelte';
export { default as TableHeaderCell } from './table-header-cell.svelte';
export { default as TableRow } from './table-row.svelte';
export { default as TableCaption } from './table-caption.svelte';

// Context and utilities
export { createTableContext, getTableContext, TableContext } from './table-context.svelte.js';
export type { TableContextConfig } from './table-context.svelte.js';

// Cell renderers and utilities
export {
	formatCell,
	formatTextCell,
	formatNumberCell,
	formatCurrencyCell,
	formatDateCell,
	formatDateTimeCell,
	formatBooleanCell,
	formatEmailCell,
	formatArrayCell,
	formatCustomCell,
	getCellValue,
	getCellLink,
	getCellAlignment,
	getCellTypeClass,
	sortRows,
	compareValues
} from './cell-renderers.js';

export type { ArrayCellResult, CellRenderContext } from './cell-renderers.js';

// Types
export type { CellRendererProps } from '$src/lib/types/data.js';
