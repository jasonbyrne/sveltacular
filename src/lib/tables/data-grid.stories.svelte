<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import DataGrid from './data-grid.svelte';
	import type { Pagination } from '../index.js';

	const rows = [
		{
			id: 1,
			name: 'John Doe',
			age: 30,
			email: 'john.doe@gmail.com',
			isActive: false,
			salary: 100000
		},
		{
			id: 2,
			name: 'Jane Doe',
			age: 79,
			email: 'jd1954@aol.com',
			isActive: true,
			salary: 50000
		},
		{
			id: 3,
			name: 'John Smith',
			age: 35,
			email: 'johnnyboy23@yahoo.com',
			isActive: false,
			salary: 75000
		},
		{
			id: 4,
			name: 'Jane Smith',
			age: 40,
			email: 'countrySky983@live.com',
			isActive: false,
			salary: 85733
		}
	];

	const badCol = { key: 'foobar', label: 'Foo' };

	const cols = [
		{ key: 'name', label: 'Name' },
		{ key: 'age', label: 'Age' },
		{ key: 'email', label: 'Email' },
		{ key: 'isActive', label: 'Active?' },
		{
			key: 'salary',
			label: 'Salary',
			format: (row: Record<string, unknown>, key: string) => {
				return new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
					maximumFractionDigits: 0
				}).format(row[key] as number);
			}
		}
	];

	const pagination: Pagination = {
		page: 1,
		perPage: 25,
		total: rows.length
	};
</script>

<Meta title="Tables/DataGrid" component={DataGrid} />

<Story name="Standard">
	<DataGrid {rows} {cols} caption="Employees" />
</Story>

<Story name="With Edit">
	<DataGrid {rows} {cols} caption="Employees" editRow={() => true} />
</Story>

<Story name="With Pagination">
	<DataGrid {rows} {cols} caption="Employees" {pagination} />
</Story>

<Story name="No Data">
	<DataGrid rows={[]} {cols} caption="Employees" />
</Story>

<Story name="Bad Columns">
	<DataGrid {rows} cols={[...cols, badCol]} caption="Employees" {pagination} />
</Story>

<Story name="No Columns">
	<DataGrid {rows} cols={[]} />
</Story>
