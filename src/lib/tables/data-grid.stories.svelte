<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import DataGrid from './data-grid.svelte';

	const data = [
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
</script>

<Meta title="Tables/DataGrid" component={DataGrid} />

<Story name="Standard">
	<DataGrid {data} {cols} caption="Employees" />
</Story>
