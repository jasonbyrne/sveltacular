import type {
	JsonObject,
	ColumnDef,
	TextColumn,
	NumberColumn,
	CurrencyColumn,
	DateColumn,
	DateTimeColumn,
	BooleanColumn,
	EmailColumn,
	CustomColumn
} from '$src/lib/types/data.js';

export interface CellRenderContext<T extends JsonObject = JsonObject> {
	row: T;
	column: ColumnDef<T>;
	value: unknown;
	rowIndex: number;
}

// Helper to safely get value from row
export function getCellValue<T extends JsonObject>(row: T, key: string): unknown {
	return row[key];
}

// Check if value is null or undefined
export function isNullish(value: unknown): value is null | undefined {
	return value === null || value === undefined;
}

// Check if value is empty string
export function isEmpty(value: unknown): boolean {
	return typeof value === 'string' && value.trim() === '';
}

// Format text column
export function formatTextCell<T extends JsonObject>(row: T, column: TextColumn<T>): string {
	const value = getCellValue(row, column.key);

	if (isNullish(value) && column.nullText) {
		return column.nullText;
	}

	if (isEmpty(value) && column.emptyText) {
		return column.emptyText;
	}

	if (column.format) {
		return column.format(String(value), row);
	}

	return String(value ?? '');
}

// Format number column
export function formatNumberCell<T extends JsonObject>(row: T, column: NumberColumn<T>): string {
	const value = getCellValue(row, column.key);

	if (isNullish(value) && column.nullText) {
		return column.nullText;
	}

	const numValue = Number(value);

	if (isNaN(numValue)) {
		return column.emptyText ?? '';
	}

	if (column.format) {
		return column.format(numValue, row);
	}

	return numValue.toLocaleString();
}

// Format currency column
export function formatCurrencyCell<T extends JsonObject>(
	row: T,
	column: CurrencyColumn<T>
): string {
	const value = getCellValue(row, column.key);

	if (isNullish(value) && column.nullText) {
		return column.nullText;
	}

	const numValue = Number(value);

	if (isNaN(numValue)) {
		return column.emptyText ?? '';
	}

	if (column.format) {
		return column.format(numValue, row);
	}

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: column.currency ?? 'USD'
	}).format(numValue);
}

// Format date column
export function formatDateCell<T extends JsonObject>(row: T, column: DateColumn<T>): string {
	const value = getCellValue(row, column.key);

	if (isNullish(value) && column.nullText) {
		return column.nullText;
	}

	if (isEmpty(value) && column.emptyText) {
		return column.emptyText;
	}

	if (column.format) {
		return column.format(value as string | Date, row);
	}

	try {
		const date = typeof value === 'string' ? new Date(value) : (value as Date);
		return date.toISOString().substring(0, 10);
	} catch {
		return String(value ?? '');
	}
}

// Format datetime column
export function formatDateTimeCell<T extends JsonObject>(
	row: T,
	column: DateTimeColumn<T>
): string {
	const value = getCellValue(row, column.key);

	if (isNullish(value) && column.nullText) {
		return column.nullText;
	}

	if (isEmpty(value) && column.emptyText) {
		return column.emptyText;
	}

	if (column.format) {
		return column.format(value as string | Date, row);
	}

	try {
		const date = typeof value === 'string' ? new Date(value) : (value as Date);
		return date.toLocaleString();
	} catch {
		return String(value ?? '');
	}
}

// Format boolean column
export function formatBooleanCell<T extends JsonObject>(row: T, column: BooleanColumn<T>): string {
	const value = getCellValue(row, column.key);

	if (isNullish(value) && column.nullText) {
		return column.nullText;
	}

	const boolValue = Boolean(value);

	if (boolValue && column.trueText) {
		return column.trueText;
	}

	if (!boolValue && column.falseText) {
		return column.falseText;
	}

	return boolValue ? '✓' : '';
}

// Format email column
export function formatEmailCell<T extends JsonObject>(row: T, column: EmailColumn<T>): string {
	const value = getCellValue(row, column.key);

	if (isNullish(value) && column.nullText) {
		return column.nullText;
	}

	if (isEmpty(value) && column.emptyText) {
		return column.emptyText;
	}

	if (column.format) {
		return column.format(String(value), row);
	}

	return String(value ?? '');
}

// Format custom column
export function formatCustomCell<T extends JsonObject>(row: T, column: CustomColumn<T>): string {
	if (isNullish(row) && column.nullText) {
		return column.nullText;
	}

	const value = column.render(row);
	return String(value ?? '');
}

// Main formatter that dispatches to specific formatters
export function formatCell<T extends JsonObject>(row: T, column: ColumnDef<T>): string {
	switch (column.type) {
		case 'text':
			return formatTextCell(row, column);
		case 'number':
			return formatNumberCell(row, column);
		case 'currency':
			return formatCurrencyCell(row, column);
		case 'date':
			return formatDateCell(row, column);
		case 'date-time':
			return formatDateTimeCell(row, column);
		case 'boolean':
		case 'check':
			return formatBooleanCell(row, column);
		case 'email':
			return formatEmailCell(row, column);
		case 'custom':
			return formatCustomCell(row, column);
	}
}

// Get link for a cell if applicable
export function getCellLink<T extends JsonObject>(row: T, column: ColumnDef<T>): string | null {
	if ('link' in column && column.link) {
		return column.link(row);
	}

	// Auto-link emails
	if (column.type === 'email') {
		const value = getCellValue(row, column.key);
		if (value && !isNullish(value) && !isEmpty(value)) {
			return `mailto:${value}`;
		}
	}

	return null;
}

// Get alignment for a cell
export function getCellAlignment<T extends JsonObject>(
	column: ColumnDef<T>
): 'left' | 'center' | 'right' {
	if (column.align) {
		return column.align;
	}

	// Default alignments based on type
	switch (column.type) {
		case 'number':
		case 'currency':
			return 'right';
		case 'boolean':
		case 'check':
			return 'center';
		default:
			return 'left';
	}
}

// Get CSS class for cell type
export function getCellTypeClass<T extends JsonObject>(column: ColumnDef<T>): string {
	return column.type;
}

// Sort comparison function
export function compareValues(a: unknown, b: unknown, direction: 'asc' | 'desc'): number {
	// Handle null/undefined
	if (isNullish(a) && isNullish(b)) return 0;
	if (isNullish(a)) return direction === 'asc' ? 1 : -1;
	if (isNullish(b)) return direction === 'asc' ? -1 : 1;

	// Handle numbers
	if (typeof a === 'number' && typeof b === 'number') {
		return direction === 'asc' ? a - b : b - a;
	}

	// Handle dates
	if (a instanceof Date && b instanceof Date) {
		return direction === 'asc' ? a.getTime() - b.getTime() : b.getTime() - a.getTime();
	}

	// Handle strings (default)
	const aStr = String(a).toLowerCase();
	const bStr = String(b).toLowerCase();

	if (direction === 'asc') {
		return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
	} else {
		return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
	}
}

// Sort rows by column
export function sortRows<T extends JsonObject>(
	rows: T[],
	column: ColumnDef<T>,
	direction: 'asc' | 'desc'
): T[] {
	return [...rows].sort((a, b) => {
		const aValue = getCellValue(a, column.key);
		const bValue = getCellValue(b, column.key);
		return compareValues(aValue, bValue, direction);
	});
}
