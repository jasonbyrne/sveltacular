<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import DataGrid from './data-grid.svelte';
	import { Countries } from '$src/lib/data/countries.js';

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
	];

	function formatCurrency(row, key) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(Number(row[key]));
	}

	const cols = [
		{ key: 'name', label: 'Name' },
		{ key: 'age', label: 'Age' },
		{
			key: 'email',
			label: 'Email',
			type: 'email'
		},
		{ key: 'isActive', label: 'Active?', type: 'check' },
		{
			key: 'salary',
			label: 'Salary',
			format: formatCurrency
		},
		{
			key: 'updatedAt',
			label: 'Updated',
			type: 'date'
		}
	];

	const countryCols = [
		{ key: 'name', label: 'Name' },
		{ key: 'value', label: 'Abbreviation', width: '50px' }
	];

	const pagination = {
		page: 1,
		perPage: 25,
		total: rows.length
	};

	const countriesTotal = Countries.length;
	const countriesPagination = {
		page: 4,
		perPage: 5,
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
			onPageChange: fn()
		}
	});
</script>

<Story name="Standard" args={{ rows, cols }}>Employees</Story>

<Story name="WithEdit" args={{ rows, cols, actions: editAction }}>Employees</Story>

<Story name="WithMultipleActions" args={{ rows, cols, actions: multiAction }}>Employees</Story>

<Story
	name="WithPagination"
	args={{
		rows: Countries,
		cols: countryCols,
		pagination: countriesPagination
	}}
>
	Countries
</Story>

<Story name="NoData" args={{ rows: [], cols }}>Employees</Story>

<Story name="NoColumns" args={{ rows, cols: [] }} />


