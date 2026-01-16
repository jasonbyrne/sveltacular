<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import DataGrid from './data-grid.svelte';
	import { Countries } from '$src/lib/data/countries.js';
	import type { ColumnDef, JsonObject } from '$src/lib/types/data.js';
	import Pill from '../generic/pill/pill.svelte';
	import Icon from '../icons/icon.svelte';
	import ExampleStatusCell from './example-status-cell.svelte';

	interface Employee extends JsonObject {
		id: number;
		name: string;
		age: number;
		email: string;
		isActive: boolean;
		salary: number;
		updatedAt: string;
	}

	interface Project extends JsonObject {
		id: number;
		name: string;
		tags: string[];
		team: Array<{ id: number; name: string }>;
		status: 'active' | 'completed' | 'on-hold';
		budget: number;
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

	// Data for array column examples
	const projects: Project[] = [
		{
			id: 1,
			name: 'Website Redesign',
			tags: ['design', 'frontend', 'urgent'],
			team: [
				{ id: 1, name: 'Alice' },
				{ id: 2, name: 'Bob' }
			],
			status: 'active',
			budget: 50000
		},
		{
			id: 2,
			name: 'Mobile App',
			tags: ['mobile', 'react-native'],
			team: [
				{ id: 3, name: 'Charlie' },
				{ id: 4, name: 'Diana' },
				{ id: 5, name: 'Eve' }
			],
			status: 'active',
			budget: 120000
		},
		{
			id: 3,
			name: 'API Integration',
			tags: ['backend', 'api', 'security'],
			team: [{ id: 6, name: 'Frank' }],
			status: 'completed',
			budget: 30000
		},
		{
			id: 4,
			name: 'Database Migration',
			tags: ['database', 'devops'],
			team: [
				{ id: 7, name: 'Grace' },
				{ id: 8, name: 'Henry' }
			],
			status: 'on-hold',
			budget: 25000
		}
	];

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

<Story name="WithMultiSelection" args={{ rows, cols, selectionMode: 'multi', enableSorting: true }}>
	Employees with Multi-Select (checkboxes with select all)
</Story>

<Story name="WithSingleSelection" args={{ rows, cols, selectionMode: 'single', enableSorting: true }}>
	Employees with Single Selection (radio buttons)
</Story>

<Story name="WithStickyHeader" args={{ rows, cols, stickyHeader: true }}>
	Employees with Sticky Header (scroll down)
</Story>

<Story name="WithActions" args={{ rows, cols: colsNoSort, actions: multiAction }}>
	Employees with Actions
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

<Story name="NoData" args={{ rows: [], cols }}>Employees (No Data)</Story>

<Story name="Loading" args={{ rows: undefined, cols }}>Employees (Loading...)</Story>

<Story name="WithActionsBottomRow" args={{ rows, cols: colsNoSort, actions: multiAction }}>
	Employees with Actions (test dropdown on last rows)
</Story>

<Story
	name="WithPaginationAndActions"
	args={{
		rows: Countries,
		cols: countryCols,
		pagination: countriesPagination,
		actions: multiAction,
		enableSorting: true
	}}
>
	Countries with Pagination and Actions (test dropdown on last row of each page)
</Story>

<Story
	name="WithArrayColumns"
	args={{
		rows: projects,
		cols: [
			{ key: 'name', label: 'Project', type: 'text' },
			{
				key: 'tags',
				label: 'Tags (Pills)',
				type: 'array',
				separator: 'pill',
				link: (tag: string) => `/tags/${tag}`
			},
			{
				key: 'team',
				label: 'Team (Comma)',
				type: 'array',
				displayKey: 'name',
				separator: 'comma',
				link: (member: any) => `/users/${member.id}`
			},
			{ key: 'budget', label: 'Budget', type: 'currency' }
		] as ColumnDef<Project>[]
	}}
>
	Projects with Array Columns (Pills & Comma separated with links)
</Story>

<Story
	name="WithArrayColumnsSemicolon"
	args={{
		rows: projects,
		cols: [
			{ key: 'name', label: 'Project', type: 'text' },
			{
				key: 'tags',
				label: 'Tags',
				type: 'array',
				separator: 'semicolon',
				format: (tag: string) => tag.toUpperCase()
			},
			{
				key: 'team',
				label: 'Team Members',
				type: 'array',
				displayKey: 'name',
				separator: 'line'
			}
		] as ColumnDef<Project>[]
	}}
>
	Projects with Semicolon and Line separators
</Story>

{#snippet nameCell({ row, value }: { row: Project; value: unknown })}
	<div style="display: flex; flex-direction: column; gap: 0.25rem;">
		<a href="/projects/{row.id}" style="font-weight: 600; color: var(--primary-500);">
			{value}
		</a>
		<small style="color: var(--text-muted); font-size: 0.85em;">Budget: ${row.budget.toLocaleString()}</small>
	</div>
{/snippet}

{#snippet statusCell({ row, value }: { row: Project; value: unknown })}
	{#if value === 'active'}
		<Pill variant="positive" compact label="✓ Active" />
	{:else if value === 'completed'}
		<Pill variant="standard" compact label="✓ Completed" />
	{:else}
		<Pill variant="negative" compact label="⚠ On Hold" />
	{/if}
{/snippet}

<Story
	name="WithCellSnippets"
	args={{
		rows: projects,
		cols: [
			{ key: 'name', label: 'Project', type: 'text' },
			{ key: 'status', label: 'Status', type: 'text', align: 'center' },
			{ key: 'budget', label: 'Budget', type: 'currency' },
			{
				key: 'tags',
				label: 'Tags',
				type: 'array',
				separator: 'pill'
			}
		] as ColumnDef<Project>[],
		cells: {
			name: nameCell,
			status: statusCell
		}
	}}
>
	Projects with Custom Cell Snippets (name with email, status with icons)
</Story>

<Story
	name="WithComponentCells"
	args={{
		rows: projects,
		cols: [
			{ key: 'name', label: 'Project', type: 'text' },
			{
				key: 'status',
				label: 'Status',
				type: 'custom',
				component: ExampleStatusCell,
				align: 'center'
			},
			{
				key: 'tags',
				label: 'Tags',
				type: 'array',
				separator: 'pill',
				link: (tag: string) => `/tags/${tag}`
			},
			{ key: 'budget', label: 'Budget', type: 'currency' }
		] as ColumnDef<Project>[]
	}}
>
	Projects with Component-Based Custom Cells (reusable StatusCell component)
</Story>
