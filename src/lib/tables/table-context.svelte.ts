import { getContext, setContext } from 'svelte';
import type { JsonObject, SortDirection, SortState } from '$src/lib/types/data.js';

const TABLE_CONTEXT_KEY = Symbol('table-context');

export interface TableContextConfig<T extends JsonObject = JsonObject> {
	enableSorting?: boolean;
	enableSelection?: boolean;
	selectionMode?: 'single' | 'multi';
	rowIdKey?: keyof T & string;
	onSort?: (column: string, direction: SortDirection) => void;
	onSelectionChange?: (selectedIds: Set<string | number>) => void;
}

export class TableContext<T extends JsonObject = JsonObject> {
	// Sort state
	sortColumn = $state<string | null>(null);
	sortDirection = $state<SortDirection>('asc');

	// Selection state
	selectedIds = $state<Set<string | number>>(new Set());
	lastSelectedIndex = $state<number | null>(null);

	// Configuration
	config: TableContextConfig<T>;

	constructor(config: TableContextConfig<T> = {}) {
		this.config = {
			enableSorting: true,
			enableSelection: false,
			selectionMode: 'multi',
			rowIdKey: 'id' as keyof T & string,
			...config
		};
	}

	// Sorting methods
	toggleSort(columnKey: string) {
		if (!this.config.enableSorting) return;

		if (this.sortColumn === columnKey) {
			// Toggle direction or clear
			if (this.sortDirection === 'asc') {
				this.sortDirection = 'desc';
			} else {
				this.sortColumn = null;
				this.sortDirection = 'asc';
			}
		} else {
			this.sortColumn = columnKey;
			this.sortDirection = 'asc';
		}

		this.config.onSort?.(this.sortColumn ?? '', this.sortDirection);
	}

	setSortColumn(columnKey: string | null, direction: SortDirection = 'asc') {
		this.sortColumn = columnKey;
		this.sortDirection = direction;
		if (columnKey) {
			this.config.onSort?.(columnKey, direction);
		}
	}

	clearSort() {
		this.sortColumn = null;
		this.sortDirection = 'asc';
	}

	getSortState(): SortState {
		return {
			column: this.sortColumn,
			direction: this.sortDirection
		};
	}

	// Selection methods
	toggleRow(id: string | number, index: number, shiftKey = false) {
		if (!this.config.enableSelection) return;

		if (this.config.selectionMode === 'single') {
			// Single selection mode
			if (this.selectedIds.has(id)) {
				this.selectedIds.delete(id);
			} else {
				this.selectedIds.clear();
				this.selectedIds.add(id);
			}
			this.lastSelectedIndex = index;
		} else {
			// Multi selection mode
			if (shiftKey && this.lastSelectedIndex !== null) {
				// Range selection
				this.selectRange(this.lastSelectedIndex, index);
			} else {
				// Toggle single row
				if (this.selectedIds.has(id)) {
					this.selectedIds.delete(id);
				} else {
					this.selectedIds.add(id);
				}
				this.lastSelectedIndex = index;
			}
		}

		this.config.onSelectionChange?.(new Set(this.selectedIds));
	}

	selectRange(startIndex: number, endIndex: number, rows?: T[]) {
		if (!rows) return;

		const start = Math.min(startIndex, endIndex);
		const end = Math.max(startIndex, endIndex);

		for (let i = start; i <= end; i++) {
			const row = rows[i];
			if (row) {
				const id = row[this.config.rowIdKey!] as string | number;
				if (id !== undefined) {
					this.selectedIds.add(id);
				}
			}
		}

		this.config.onSelectionChange?.(new Set(this.selectedIds));
	}

	selectAll(rows: T[]) {
		if (!this.config.enableSelection) return;

		rows.forEach((row) => {
			const id = row[this.config.rowIdKey!] as string | number;
			if (id !== undefined) {
				this.selectedIds.add(id);
			}
		});

		this.config.onSelectionChange?.(new Set(this.selectedIds));
	}

	deselectAll() {
		this.selectedIds.clear();
		this.lastSelectedIndex = null;
		this.config.onSelectionChange?.(new Set(this.selectedIds));
	}

	isRowSelected(id: string | number): boolean {
		return this.selectedIds.has(id);
	}

	isAllSelected(rows: T[]): boolean {
		if (!rows.length) return false;
		return rows.every((row) => {
			const id = row[this.config.rowIdKey!] as string | number;
			return id !== undefined && this.selectedIds.has(id);
		});
	}

	isSomeSelected(rows: T[]): boolean {
		if (!rows.length) return false;
		return rows.some((row) => {
			const id = row[this.config.rowIdKey!] as string | number;
			return id !== undefined && this.selectedIds.has(id);
		});
	}

	getSelectedCount(): number {
		return this.selectedIds.size;
	}

	getSelectedRows(rows: T[]): T[] {
		return rows.filter((row) => {
			const id = row[this.config.rowIdKey!] as string | number;
			return id !== undefined && this.selectedIds.has(id);
		});
	}
}

export function createTableContext<T extends JsonObject = JsonObject>(
	config?: TableContextConfig<T>
): TableContext<T> {
	const context = new TableContext<T>(config);
	setContext(TABLE_CONTEXT_KEY, context);
	return context;
}

export function getTableContext<T extends JsonObject = JsonObject>(): TableContext<T> | undefined {
	return getContext(TABLE_CONTEXT_KEY);
}
