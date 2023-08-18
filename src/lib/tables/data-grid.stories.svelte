<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import DataGrid from './data-grid.svelte';

	const data = [
		{
			id: 1,
			name: 'John Doe',
			age: 30,
			email: 'john.doe@gmail.com'
		},
		{
			id: 2,
			name: 'Jane Doe',
			age: 79,
			email: 'jd1954@aol.com'
		},
		{
			id: 3,
			name: 'John Smith',
			age: 35,
			email: 'johnnyboy23@yahoo.com'
		},
		{
			id: 4,
			name: 'Jane Smith',
			age: 40,
			email: 'countrySky983@live.com'
		}
	];

	const cols = [
		{ key: 'name', label: 'Name' },
		{ key: 'age', label: 'Age' },
		{ key: 'email', label: 'Email' }
	];
</script>

<Meta title="Tables/DataGrid" component={DataGrid} />

<Story name="Standard">
	<DataGrid {data} {cols} />
</Story>
