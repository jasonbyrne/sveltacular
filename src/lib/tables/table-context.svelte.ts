import { getContext, setContext } from 'svelte';
import type { JsonObject, SortDirection, SortState } from '$src/lib/types/data.js';

const TABLE_CONTEXT_KEY = Symbol('table-context');

export interface TableContextConfig<T extends JsonObject = JsonObject> {
	enableSorting?: boolean;
	selectionMode?: 'none' | 'single' | 'multi';
	rowIdKey?: keyof T & string;
	onSort?: (column: string, direction: SortDirection) => void;
	onSelectionChange?: (selectedRowIds: (string | number)[]) => void;
	rows?: T[]; // Needed to compute selectedRows from selectedIds
}

export class TableContext<T extends JsonObject = JsonObject> {
	// Sort state
	sortColumn = $state<string | null>(null);
	sortDirection = $state<SortDirection>('asc');

	// Selection state
	selectedIds = $state<Set<string | number>>(new Set());
	lastSelectedIndex = $state<number | null>(null);
	
	// Radio button group state (for single selection mode)
	radioGroup = $state<string | undefined>(undefined);
	
	// Reactive selected count
	selectedCount = $derived(this.selectedIds.size);

	// Configuration
	config: TableContextConfig<T>;

	constructor(config: TableContextConfig<T> = {}) {
		this.config = {
			enableSorting: true,
			selectionMode: 'none',
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
	toggleRow(id: string | number, index: number, shiftKey = false, rows?: T[]) {
		if (this.config.selectionMode === 'none') return;

		if (this.config.selectionMode === 'single') {
			// Single selection mode
			if (this.selectedIds.has(id)) {
				this.selectedIds.delete(id);
				this.radioGroup = undefined;
				// Trigger reactivity
				this.selectedIds = new Set(this.selectedIds);
			} else {
				this.selectedIds.clear();
				this.selectedIds.add(id);
				this.radioGroup = String(id);
				// Trigger reactivity
				this.selectedIds = new Set(this.selectedIds);
			}
			this.lastSelectedIndex = index;
		} else {
			// Multi selection mode
			if (shiftKey && this.lastSelectedIndex !== null && rows) {
				// Range selection
				this.selectRange(this.lastSelectedIndex, index, rows);
			} else {
				// Toggle single row
				if (this.selectedIds.has(id)) {
					this.selectedIds.delete(id);
				} else {
					this.selectedIds.add(id);
				}
				// Trigger reactivity
				this.selectedIds = new Set(this.selectedIds);
				this.lastSelectedIndex = index;
			}
		}

		this.notifySelectionChange(rows);
	}
	
	private notifySelectionChange(rows?: T[]) {
		if (this.config.onSelectionChange) {
			const selectedRowIds = Array.from(this.selectedIds);
			this.config.onSelectionChange(selectedRowIds);
		}
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
		
		// Trigger reactivity
		this.selectedIds = new Set(this.selectedIds);

		this.notifySelectionChange(rows);
	}

	selectAll(rows: T[]) {
		if (this.config.selectionMode === 'none') return;

		// Clear first, then add all to ensure proper state update
		this.selectedIds.clear();
		rows.forEach((row) => {
			const id = row[this.config.rowIdKey!] as string | number;
			if (id !== undefined) {
				this.selectedIds.add(id);
			}
		});
		
		// Trigger reactivity by reassigning (Svelte 5 tracks Set mutations, but ensure it's reactive)
		this.selectedIds = new Set(this.selectedIds);

		this.notifySelectionChange(rows);
	}

	deselectAll(rows?: T[]) {
		this.selectedIds.clear();
		// Trigger reactivity by reassigning
		this.selectedIds = new Set(this.selectedIds);
		this.lastSelectedIndex = null;
		this.radioGroup = undefined;
		this.notifySelectionChange(rows);
	}
	
	// Method to handle radio group changes (from radio button bindings)
	setRadioSelection(value: string | undefined, rows?: T[]) {
		if (this.config.selectionMode !== 'single') return;
		
		if (value) {
			this.selectedIds.clear();
			this.selectedIds.add(value);
			// Trigger reactivity
			this.selectedIds = new Set(this.selectedIds);
			this.radioGroup = value;
			this.notifySelectionChange(rows);
		} else {
			this.selectedIds.clear();
			// Trigger reactivity
			this.selectedIds = new Set(this.selectedIds);
			this.radioGroup = undefined;
			this.notifySelectionChange(rows);
		}
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

	// selectedCount is now a reactive derived state, but keep this method for backwards compatibility
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
