<script lang="ts">
	import TableBody from '$src/lib/tables/table-body.svelte';
	import TableCell from '$src/lib/tables/table-cell.svelte';
	import TableFooterCell from '$src/lib/tables/table-footer-cell.svelte';
	import TableFooterRow from '$src/lib/tables/table-footer-row.svelte';
	import TableFooter from '$src/lib/tables/table-footer.svelte';
	import TableHeaderCell from '$src/lib/tables/table-header-cell.svelte';
	import TableHeaderRow from '$src/lib/tables/table-header-row.svelte';
	import TableHeader from '$src/lib/tables/table-header.svelte';
	import TableRow from '$src/lib/tables/table-row.svelte';
	import Table from '$src/lib/tables/table.svelte';
	import type { DataCol, DataRow, Pagination } from '$src/lib/types/data.js';
	import Text from '../typography/text.svelte';
	import TableCaption from './table-caption.svelte';

	type Action = undefined | ((row: DataRow) => unknown);

	export let caption: string = '';
	export let data: DataRow[];
	export let cols: DataCol[];
	export let pagination: Pagination | undefined = undefined;
	export let editRow: Action = undefined;
	export let deleteRow: Action = undefined;

	const getColType = (col: DataCol) => {
		if (col.type) return col.type;
		if (data.length === 0) return 'string';
		return typeof data[0][col.key];
	};

	const clickEdit = async (row: DataRow) => {
		if (editRow) await editRow(row);
	};

	const clickDelete = async (row: DataRow) => {
		if (deleteRow) await deleteRow(row);
	};

	$: hasActionRow = editRow || deleteRow;
	$: colCount = Math.max(1, cols.filter((col) => !col.hide).length) + (hasActionRow ? 1 : 0);
	$: totalPages = pagination
		? Math.ceil((pagination.total || data.length) / pagination.perPage)
		: 1;
</script>

<Table>
	{#if caption}
		<TableCaption>{caption}</TableCaption>
	{/if}
	<TableHeader>
		<TableHeaderRow>
			{#each cols as col}
				{#if !col.hide}
					<TableHeaderCell type={getColType(col)}>{col.label}</TableHeaderCell>
				{/if}
			{/each}
			{#if hasActionRow}
				<TableHeaderCell type="string" />
			{/if}
		</TableHeaderRow>
	</TableHeader>
	<TableBody>
		{#each data as row}
			<TableRow>
				{#each cols as col}
					{#if !col.hide}
						<TableCell type={col.type || typeof row[col.key]}>
							{#if col.format}
								{col.format(row, col.key)}
							{:else}
								{row[col.key]}
							{/if}
						</TableCell>
					{/if}
				{/each}
				{#if hasActionRow}
					<TableCell type="actions">
						{#if editRow}
							<button on:click={() => clickEdit(row)}>Edit</button>
						{/if}
						{#if deleteRow}
							<button on:click={() => clickDelete(row)}>Delete</button>
						{/if}
					</TableCell>
				{/if}
			</TableRow>
		{/each}
	</TableBody>
	{#if pagination}
		<TableFooter>
			<TableFooterRow>
				<TableFooterCell colspan={colCount}>
					<Text transform="uppercase">
						Page {pagination.page} of {totalPages}
					</Text>
				</TableFooterCell>
			</TableFooterRow>
		</TableFooter>
	{/if}
</Table>
