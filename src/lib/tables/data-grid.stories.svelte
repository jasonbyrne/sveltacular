<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import DataGrid from './data-grid.svelte';
	import { Countries } from '$src/lib/data/countries.js';
	import type { DataCol, JsonObject, PaginationProperties } from '../index.js';

	interface MyRow extends JsonObject {
		id: number;
		name: string;
		age: number;
		email: string;
		isActive: boolean;
		salary: number;
		updatedAt: string;
	};

	const rows = [
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
		}
	] satisfies MyRow[];

	const badCol = { key: 'foobar', label: 'Foo' };

	const cols: DataCol[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'age', label: 'Age' },
		{
			key: 'email',
			label: 'Email',
			type: 'email',
		},
		{ key: 'isActive', label: 'Active?', type: 'check'},
		{
			key: 'salary',
			label: 'Salary',
			format: (row, key) => 
				new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
					maximumFractionDigits: 0
				}).format(row[key] as number)
		},
		{
			key: 'updatedAt',
			label: 'Updated',
			type: 'date',
		}
	];

	const countryCols = [
		{ key: 'name', label: 'Name' },
		{ key: 'value', label: 'Abbreviation', width: '50px' }
	];

	const pagination: PaginationProperties = {
		page: 1,
		perPage: 25,
		total: rows.length
	};
</script>

<Meta title="Tables/DataGrid" component={DataGrid} />

<Story name="Standard">
	<DataGrid {rows} {cols} >Employees</DataGrid>
</Story>

<Story name="With Edit">
	<DataGrid {rows} {cols} actions={[{ text: 'Edit', onClick: () => true}]}>Employees</DataGrid>
</Story>

<Story name="With Pagination">
	<DataGrid
		rows={Countries}
		cols={countryCols}
		pagination={{
			page: 4,
			perPage: 5,
			total: Countries.length
		}}
	>Countries</DataGrid>
</Story>

<Story name="No Data">
	<DataGrid rows={[]} {cols} >Employees</DataGrid>
</Story>

<Story name="Bad Columns">
	<DataGrid {rows} cols={[...cols, badCol]} {pagination}>Employees</DataGrid>
</Story>

<Story name="No Columns">
	<DataGrid {rows} cols={[]} />
</Story>
