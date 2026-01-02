<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import DataGrid from './data-grid.svelte';
	import { Countries } from '$src/lib/data/countries.js';
	import type { ColumnDef, JsonObject } from '$src/lib/types/data.js';

	interface Employee extends JsonObject {
		id: number;
		name: string;
		age: number;
		email: string;
		isActive: boolean;
		salary: number;
		updatedAt: string;
	}

	const rows: Employee[] = [
		{
			id: 1,
			name: 'John Doe',
			age: 30,
			email: 'john.doe@gmail.com',
			isActive: false,
			salary: 100000,
			updatedAt: '2021-01-01T00:00:00Z'
		},
		{
			id: 2,
			name: 'Jane Doe',
			age: 79,
			email: 'jd1954@aol.com',
			isActive: true,
			salary: 50000,
			updatedAt: '2021-01-01T00:00:00Z'
		},
		{
			id: 3,
			name: 'John Smith',
			age: 35,
			email: 'johnnyboy23@yahoo.com',
			isActive: false,
			salary: 75000,
			updatedAt: '2021-01-01T00:00:00Z'
		},
		{
			id: 4,
			name: 'Jane Smith',
			age: 40,
			email: 'countrySky983@live.com',
			isActive: false,
			salary: 85733,
			updatedAt: '2021-01-01T00:00:00Z'
		},
		{
			id: 5,
			name: 'Bob Johnson',
			age: 45,
			email: 'bjohnson@company.com',
			isActive: true,
			salary: 120000,
			updatedAt: '2024-06-15T14:30:00Z'
		},
		{
			id: 6,
			name: 'Alice Williams',
			age: 28,
			email: 'alice.w@tech.io',
			isActive: true,
			salary: 95000,
			updatedAt: '2024-12-01T09:00:00Z'
		}
	];

	// Using new type-safe column definitions
	const cols: ColumnDef<Employee>[] = [
		{ key: 'name', label: 'Name', type: 'text', sortable: true },
		{ key: 'age', label: 'Age', type: 'number', sortable: true },
		{ key: 'email', label: 'Email', type: 'email', sortable: true },
		{ key: 'isActive', label: 'Active?', type: 'check', sortable: true },
		{ key: 'salary', label: 'Salary', type: 'currency', sortable: true },
		{ key: 'updatedAt', label: 'Updated', type: 'date', sortable: true }
	];

	const colsNoSort: ColumnDef<Employee>[] = [
		{ key: 'name', label: 'Name', type: 'text' },
		{ key: 'age', label: 'Age', type: 'number' },
		{ key: 'email', label: 'Email', type: 'email' },
		{ key: 'isActive', label: 'Active?', type: 'check' },
		{ key: 'salary', label: 'Salary', type: 'currency' },
		{ key: 'updatedAt', label: 'Updated', type: 'date' }
	];

	const countryCols: ColumnDef[] = [
		{ key: 'name', label: 'Name', type: 'text', sortable: true },
		{ key: 'value', label: 'Abbreviation', type: 'text', width: '100px', sortable: true }
	];

	const pagination = {
		page: 1,
		perPage: 25,
		total: rows.length
	};

	const countriesTotal = Countries.length;
	const countriesPagination = {
		page: 1,
		perPage: 10,
		total: countriesTotal
	};

	const editAction = {
		type: 'button',
		items: [{ text: 'Edit', onClick: fn() }]
	};

	const multiAction = {
		type: 'dropdown',
		items: [
			{ text: 'Edit', onClick: fn() },
			{ text: 'Delete', onClick: fn() }
		]
	};

	const { Story } = defineMeta({
		component: DataGrid,
		title: 'Tables/DataGrid',
		tags: ['autodocs'],
		args: {
			onPageChange: fn(),
			onSort: fn(),
			onSelectionChange: fn()
		}
	});
</script>

<Story name="Standard" args={{ rows, cols: colsNoSort }}>Employees</Story>

<Story name="WithSorting" args={{ rows, cols, enableSorting: true }}>
	Sortable Employees (click column headers)
</Story>

<Story name="WithSelection" args={{ rows, cols, enableSelection: true, selectionMode: 'multi' }}>
	Employees with Multi-Select (click rows, use Shift for range)
</Story>

<Story
	name="WithSingleSelection"
	args={{ rows, cols, enableSelection: true, selectionMode: 'single' }}
>
	Employees with Single Selection
</Story>

<Story
	name="WithSortingAndSelection"
	args={{ rows, cols, enableSorting: true, enableSelection: true }}
>
	Fully Interactive Table
</Story>

<Story name="WithStickyHeader" args={{ rows, cols, stickyHeader: true }}>
	Employees with Sticky Header (scroll down)
</Story>

<Story name="WithEdit" args={{ rows, cols: colsNoSort, actions: editAction }}>Employees</Story>

<Story name="WithMultipleActions" args={{ rows, cols: colsNoSort, actions: multiAction }}>
	Employees
</Story>

<Story
	name="WithPagination"
	args={{
		rows: Countries,
		cols: countryCols,
		pagination: countriesPagination,
		enableSorting: true
	}}
>
	Countries with Pagination
</Story>

<Story
	name="FullFeatured"
	args={{
		rows,
		cols,
		enableSorting: true,
		enableSelection: true,
		stickyHeader: true,
		actions: multiAction
	}}
>
	All Features Combined
</Story>

<Story name="NoData" args={{ rows: [], cols }}>Employees (No Data)</Story>

<Story name="Loading" args={{ rows: undefined, cols }}>Employees (Loading...)</Story>

<Story name="NoColumns" args={{ rows, cols: [] }}>No Columns Defined</Story>
