import { describe, expect, it } from 'vitest';
import type { ColumnDef } from '$src/lib/types/data.js';
import {
	compareValues,
	formatArrayCell,
	formatBooleanCell,
	formatCell,
	formatCurrencyCell,
	formatCustomCell,
	formatDateCell,
	formatEmailCell,
	formatNumberCell,
	formatTextCell,
	getCellAlignment,
	getCellLink,
	getCellTypeClass,
	getCellValue,
	isEmpty,
	isNullish,
	sortRows
} from './cell-renderers.js';

type Row = {
	id: number;
	name: string;
	count: number | string | null;
	price: number;
	active: boolean | null;
	email: string;
	created: string | Date;
	tags: Array<string | { label: string; slug: string }>;
};

const row: Row = {
	id: 2,
	name: 'Ada',
	count: 1234,
	price: 19.5,
	active: true,
	email: 'ada@example.com',
	created: '2026-05-01T12:00:00.000Z',
	tags: ['math', { label: 'computing', slug: 'computing' }]
};

describe('cell renderers', () => {
	it('reads cell values and detects empty states', () => {
		expect(getCellValue(row, 'name')).toBe('Ada');
		expect(isNullish(null)).toBe(true);
		expect(isNullish(undefined)).toBe(true);
		expect(isNullish('')).toBe(false);
		expect(isEmpty('   ')).toBe(true);
		expect(isEmpty(0)).toBe(false);
	});

	it('formats text with null, empty, and custom formatting support', () => {
		expect(formatTextCell(row, { type: 'text', key: 'name', label: 'Name' })).toBe('Ada');
		expect(
			formatTextCell(
				{ ...row, name: '' },
				{ type: 'text', key: 'name', label: 'Name', emptyText: 'None' }
			)
		).toBe('None');
		expect(
			formatTextCell(
				{ ...row, name: null as unknown as string },
				{ type: 'text', key: 'name', label: 'Name', nullText: 'Missing' }
			)
		).toBe('Missing');
		expect(
			formatTextCell(row, {
				type: 'text',
				key: 'name',
				label: 'Name',
				format: (value) => value.toUpperCase()
			})
		).toBe('ADA');
	});

	it('formats numeric and currency values', () => {
		expect(formatNumberCell(row, { type: 'number', key: 'count', label: 'Count' })).toBe('1,234');
		expect(
			formatNumberCell(
				{ ...row, count: 'nope' },
				{ type: 'number', key: 'count', label: 'Count', emptyText: 'n/a' }
			)
		).toBe('n/a');
		expect(formatCurrencyCell(row, { type: 'currency', key: 'price', label: 'Price' })).toBe(
			'$19.50'
		);
		expect(
			formatCurrencyCell(row, { type: 'currency', key: 'price', label: 'Price', currency: 'EUR' })
		).toBe('€19.50');
	});

	it('formats dates, booleans, email, and custom columns', () => {
		expect(formatDateCell(row, { type: 'date', key: 'created', label: 'Created' })).toBe(
			'2026-05-01'
		);
		expect(
			formatBooleanCell(row, { type: 'boolean', key: 'active', label: 'Active', trueText: 'Yes' })
		).toBe('Yes');
		expect(
			formatBooleanCell(
				{ ...row, active: false },
				{ type: 'check', key: 'active', label: 'Active', falseText: 'No' }
			)
		).toBe('No');
		expect(
			formatBooleanCell(
				{ ...row, active: null },
				{ type: 'boolean', key: 'active', label: 'Active', nullText: 'Unknown' }
			)
		).toBe('Unknown');
		expect(formatEmailCell(row, { type: 'email', key: 'email', label: 'Email' })).toBe(
			'ada@example.com'
		);
		expect(
			formatCustomCell(row, {
				type: 'custom',
				key: 'id',
				label: 'ID',
				render: (item) => `#${item.id}`
			})
		).toBe('#2');
		expect(formatCustomCell(row, { type: 'custom', key: 'id', label: 'ID' })).toBe('');
	});

	it('formats array cells with display keys, custom formatting, and links', () => {
		const formatted = formatArrayCell(row, {
			type: 'array',
			key: 'tags',
			label: 'Tags',
			displayKey: 'label',
			separator: 'pill',
			link: (element, item, index) => `/rows/${item.id}/tags/${index}`
		});

		expect(formatted.separator).toBe('pill');
		expect(formatted.items).toEqual([
			{ text: 'math', link: '/rows/2/tags/0' },
			{ text: 'computing', link: '/rows/2/tags/1' }
		]);

		expect(
			formatArrayCell(row, {
				type: 'array',
				key: 'tags',
				label: 'Tags',
				format: (_element, _row, index) => `Tag ${index + 1}`
			}).items.map((item) => item.text)
		).toEqual(['Tag 1', 'Tag 2']);
	});

	it('dispatches generic formatCell by column type', () => {
		const columns: ColumnDef<Row>[] = [
			{ type: 'text', key: 'name', label: 'Name' },
			{ type: 'number', key: 'count', label: 'Count' },
			{ type: 'currency', key: 'price', label: 'Price' },
			{ type: 'date', key: 'created', label: 'Created' },
			{ type: 'date-time', key: 'created', label: 'Created at' },
			{ type: 'boolean', key: 'active', label: 'Active' },
			{ type: 'email', key: 'email', label: 'Email' },
			{ type: 'array', key: 'tags', label: 'Tags' },
			{ type: 'custom', key: 'id', label: 'ID', render: (item) => item.id }
		];

		expect(columns.map((column) => formatCell(row, column))).toEqual([
			'Ada',
			'1,234',
			'$19.50',
			'2026-05-01',
			new Date(row.created).toLocaleString(),
			'✓',
			'ada@example.com',
			'',
			'2'
		]);
	});

	it('derives links, alignment, type classes, and sorted rows', () => {
		expect(getCellLink(row, { type: 'email', key: 'email', label: 'Email' })).toBe(
			'mailto:ada@example.com'
		);
		expect(
			getCellLink(row, {
				type: 'text',
				key: 'name',
				label: 'Name',
				link: (item) => `/users/${item.id}`
			})
		).toBe('/users/2');
		expect(getCellLink(row, { type: 'array', key: 'tags', label: 'Tags' })).toBeNull();

		expect(getCellAlignment({ type: 'number', key: 'count', label: 'Count' })).toBe('right');
		expect(getCellAlignment({ type: 'boolean', key: 'active', label: 'Active' })).toBe('center');
		expect(getCellAlignment({ type: 'text', key: 'name', label: 'Name', align: 'center' })).toBe(
			'center'
		);
		expect(getCellTypeClass({ type: 'currency', key: 'price', label: 'Price' })).toBe('currency');

		expect(compareValues(1, 2, 'asc')).toBeLessThan(0);
		expect(compareValues(1, 2, 'desc')).toBeGreaterThan(0);
		expect(compareValues(null, 2, 'asc')).toBe(1);
		expect(compareValues(new Date('2026-01-01'), new Date('2026-02-01'), 'asc')).toBeLessThan(0);

		const sorted = sortRows(
			[
				{ id: 2, name: 'B' },
				{ id: 1, name: 'A' }
			],
			{ type: 'number', key: 'id', label: 'ID' },
			'asc'
		);
		expect(sorted.map((item) => item.id)).toEqual([1, 2]);
	});
});
