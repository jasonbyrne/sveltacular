import type { Component } from 'svelte';

export type Primitive = string | number | boolean | null | undefined;
export type JSONValue = string | number | boolean | null | { [x: string]: JSONValue } | JSONValue[];
export type PlainObject = Record<string, any>;

// Base column configuration
interface BaseColumn<T extends PlainObject = PlainObject> {
	key: keyof T & string;
	label: string;
	width?: string | number;
	sortable?: boolean;
	hidden?: boolean;
	align?: 'left' | 'center' | 'right';
	emptyText?: string;
	nullText?: string;
}

// Text column
export interface TextColumn<T extends PlainObject = PlainObject> extends BaseColumn<T> {
	type: 'text';
	format?: (value: string, row: T) => string;
	link?: (row: T) => string;
}

// Number column
export interface NumberColumn<T extends PlainObject = PlainObject> extends BaseColumn<T> {
	type: 'number';
	format?: (value: number, row: T) => string;
	link?: (row: T) => string;
}

// Currency column
export interface CurrencyColumn<T extends PlainObject = PlainObject> extends BaseColumn<T> {
	type: 'currency';
	currency?: string;
	format?: (value: number, row: T) => string;
	link?: (row: T) => string;
}

// Date column
export interface DateColumn<T extends PlainObject = PlainObject> extends BaseColumn<T> {
	type: 'date';
	format?: (value: string | Date, row: T) => string;
	link?: (row: T) => string;
}

// DateTime column
export interface DateTimeColumn<T extends PlainObject = PlainObject> extends BaseColumn<T> {
	type: 'date-time';
	format?: (value: string | Date, row: T) => string;
	link?: (row: T) => string;
}

// Boolean/Check column
export interface BooleanColumn<T extends PlainObject = PlainObject> extends BaseColumn<T> {
	type: 'boolean' | 'check';
	trueText?: string;
	falseText?: string;
	link?: (row: T) => string;
}

// Email column
export interface EmailColumn<T extends PlainObject = PlainObject> extends BaseColumn<T> {
	type: 'email';
	format?: (value: string, row: T) => string;
}

// Array column for iterating over array values
export interface ArrayColumn<T extends PlainObject = PlainObject> extends BaseColumn<T> {
	type: 'array';
	// For object arrays - which property to display
	displayKey?: string;
	// Format each element
	format?: (element: unknown, row: T, index: number) => string;
	// Generate link for each element
	link?: (element: unknown, row: T, index: number) => string | null;
	// Separator between elements
	separator?: 'comma' | 'semicolon' | 'line' | 'pill';
}

// Cell renderer props for custom components
export interface CellRendererProps<T extends PlainObject = PlainObject> {
	row: T;
	value: unknown;
	column: ColumnDef<T>;
	rowIndex: number;
}

// Custom column with render function
export interface CustomColumn<T extends PlainObject = PlainObject> extends BaseColumn<T> {
	type: 'custom';
	// Option A: Simple string output (existing)
	render?: (row: T) => string | number | boolean;
	// Option B: Full Svelte component
	component?: Component<CellRendererProps<T>>;
}

// Discriminated union of all column types
export type ColumnDef<T extends PlainObject = PlainObject> =
	| TextColumn<T>
	| NumberColumn<T>
	| CurrencyColumn<T>
	| DateColumn<T>
	| DateTimeColumn<T>
	| BooleanColumn<T>
	| EmailColumn<T>
	| ArrayColumn<T>
	| CustomColumn<T>;

// Legacy type for backward compatibility (deprecated)
export type DataCol = {
	key: string;
	label: string;
	type?: string;
	nullText?: string;
	emptyText?: string;
	format?: (row: PlainObject, key: string) => string;
	link?: (row: PlainObject, key: string) => string;
	hide?: boolean;
	width?: number | string;
};

export type PaginationProperties = { page: number; perPage: number; total?: number };

// Sort direction
export type SortDirection = 'asc' | 'desc';

// Sort state
export interface SortState {
	column: string | null;
	direction: SortDirection;
}

// Selection state
export interface SelectionState<T = string | number> {
	selectedIds: Set<T>;
	lastSelectedIndex: number | null;
}

// Action configuration for DataGrid rows
export interface DataGridAction<T extends PlainObject = PlainObject> {
	text: string;
	variant?: string; // ButtonVariant from form types
	href?: (row: T) => string;
	onClick?: (row: T) => unknown;
}

// Actions configuration for DataGrid
export interface DataGridActions<T extends PlainObject = PlainObject> {
	text?: string;
	type?: 'buttons' | 'dropdown';
	variant?: string; // ButtonVariant | 'default'
	size?: string; // FormFieldSizeOptions
	align?: 'left' | 'center' | 'right';
	items: DataGridAction<T>[];
}
