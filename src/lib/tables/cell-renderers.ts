import type {
	PlainObject,
	ColumnDef,
	TextColumn,
	NumberColumn,
	CurrencyColumn,
	DateColumn,
	DateTimeColumn,
	BooleanColumn,
	EmailColumn,
	ArrayColumn,
	CustomColumn
} from '$src/lib/types/data.js';

export interface CellRenderContext<T extends PlainObject = PlainObject> {
	row: T;
	column: ColumnDef<T>;
	value: unknown;
	rowIndex: number;
}

// Helper to safely get value from row
export function getCellValue<T extends PlainObject>(row: T, key: string): unknown {
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

// Generic formatter factory to reduce repetition
interface FormatterConfig<T extends PlainObject, V = unknown> {
	getValue: (row: T, column: ColumnDef<T>) => V;
	checkEmpty?: (value: V) => boolean;
	defaultFormat: (value: V) => string;
	customFormat?: (value: V, row: T) => string;
}

function createFormatter<T extends PlainObject, C extends ColumnDef<T>, V = unknown>(
	config: FormatterConfig<T, V>
) {
	return (row: T, column: C): string => {
		const value = config.getValue(row, column);

		// Check for null/undefined
		if (isNullish(value) && 'nullText' in column && column.nullText) {
			return column.nullText;
		}

		// Check for empty (if applicable)
		if (config.checkEmpty && config.checkEmpty(value)) {
			if ('emptyText' in column && column.emptyText) {
				return column.emptyText;
			}
		}

		// Use custom format if provided
		if (config.customFormat && 'format' in column && column.format) {
			return (column.format as (value: V, row: T) => string)(value, row);
		}

		// Use default format
		return config.defaultFormat(value);
	};
}

// Format text column
export function formatTextCell<T extends PlainObject>(row: T, column: TextColumn<T>): string {
	const formatter = createFormatter<T, TextColumn<T>, unknown>({
		getValue: (row, column) => getCellValue(row, column.key),
		checkEmpty: isEmpty,
		defaultFormat: (value) => String(value ?? ''),
		customFormat: (value, row) => String(value)
	});
	return formatter(row, column);
}

// Format number column
export function formatNumberCell<T extends PlainObject>(row: T, column: NumberColumn<T>): string {
	const formatter = createFormatter<T, NumberColumn<T>, number>({
		getValue: (row, column) => {
			const value = getCellValue(row, column.key);
			return Number(value);
		},
		checkEmpty: (value) => isNaN(value),
		defaultFormat: (value) => value.toLocaleString(),
		customFormat: (value, row) => value.toString()
	});
	return formatter(row, column);
}

// Format currency column
export function formatCurrencyCell<T extends PlainObject>(
	row: T,
	column: CurrencyColumn<T>
): string {
	const formatter = createFormatter<T, CurrencyColumn<T>, number>({
		getValue: (row, column) => {
			const value = getCellValue(row, column.key);
			return Number(value);
		},
		checkEmpty: (value) => isNaN(value),
		defaultFormat: (value) =>
			new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: column.currency ?? 'USD'
			}).format(value),
		customFormat: (value, row) => value.toString()
	});
	return formatter(row, column);
}

// Format date column
export function formatDateCell<T extends PlainObject>(row: T, column: DateColumn<T>): string {
	const formatter = createFormatter<T, DateColumn<T>, unknown>({
		getValue: (row, column) => getCellValue(row, column.key),
		checkEmpty: isEmpty,
		defaultFormat: (value) => {
			try {
				const date = typeof value === 'string' ? new Date(value) : (value as Date);
				return date.toISOString().substring(0, 10);
			} catch {
				return String(value ?? '');
			}
		},
		customFormat: (value, row) => String(value)
	});
	return formatter(row, column);
}

// Format datetime column
export function formatDateTimeCell<T extends PlainObject>(
	row: T,
	column: DateTimeColumn<T>
): string {
	const formatter = createFormatter<T, DateTimeColumn<T>, unknown>({
		getValue: (row, column) => getCellValue(row, column.key),
		checkEmpty: isEmpty,
		defaultFormat: (value) => {
			try {
				const date = typeof value === 'string' ? new Date(value) : (value as Date);
				return date.toLocaleString();
			} catch {
				return String(value ?? '');
			}
		},
		customFormat: (value, row) => String(value)
	});
	return formatter(row, column);
}

// Format boolean column
export function formatBooleanCell<T extends PlainObject>(row: T, column: BooleanColumn<T>): string {
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
export function formatEmailCell<T extends PlainObject>(row: T, column: EmailColumn<T>): string {
	const formatter = createFormatter<T, EmailColumn<T>, unknown>({
		getValue: (row, column) => getCellValue(row, column.key),
		checkEmpty: isEmpty,
		defaultFormat: (value) => String(value ?? ''),
		customFormat: (value, row) => String(value)
	});
	return formatter(row, column);
}

// Array cell result type
export interface ArrayCellResult {
	items: Array<{ text: string; link: string | null }>;
	separator: 'comma' | 'semicolon' | 'line' | 'pill';
}

// Format array column
export function formatArrayCell<T extends PlainObject>(
	row: T,
	column: ArrayColumn<T>
): ArrayCellResult {
	const value = getCellValue(row, column.key);
	const arr = Array.isArray(value) ? value : [];
	const separator = column.separator ?? 'comma';

	const items = arr.map((element, index) => {
		let text: string;
		if (column.format) {
			text = column.format(element, row, index);
		} else if (column.displayKey && typeof element === 'object' && element !== null) {
			text = String((element as Record<string, unknown>)[column.displayKey] ?? '');
		} else {
			text = String(element);
		}

		const link = column.link ? column.link(element, row, index) : null;
		return { text, link };
	});

	return { items, separator };
}

// Format custom column
export function formatCustomCell<T extends PlainObject>(row: T, column: CustomColumn<T>): string {
	if (isNullish(row) && column.nullText) {
		return column.nullText;
	}

	if (!column.render) {
		return '';
	}

	const value = column.render(row);
	return String(value ?? '');
}

// Main formatter that dispatches to specific formatters
export function formatCell<T extends PlainObject>(row: T, column: ColumnDef<T>): string {
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
		case 'array':
			// Array type returns structured data, not a string
			// Use formatArrayCell directly instead
			return '';
		case 'custom':
			return formatCustomCell(row, column);
	}
}

// Get link for a cell if applicable
export function getCellLink<T extends PlainObject>(row: T, column: ColumnDef<T>): string | null {
	// Array columns handle their own links via formatArrayCell
	if (column.type === 'array') {
		return null;
	}

	if ('link' in column && column.link) {
		// Type guard to ensure we're not dealing with array column
		if (typeof column.link === 'function') {
			return (column.link as (row: T) => string)(row);
		}
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
export function getCellAlignment<T extends PlainObject>(
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
export function getCellTypeClass<T extends PlainObject>(column: ColumnDef<T>): string {
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
export function sortRows<T extends PlainObject>(
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
