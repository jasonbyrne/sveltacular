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
	import type { DataCol, DataRow, PaginationProperties } from '$src/lib/types/data.js';
	import Empty from '../generic/empty/empty.svelte';
	import FolderOpenIcon from '../icons/folder-open-icon.svelte';
	import Pagination from '../navigation/pagination/pagination.svelte';
	import Loading from '../placeholders/loading.svelte';
	import TableCaption from './table-caption.svelte';

	type Action = undefined | ((row: DataRow) => unknown);
	type PaginationEvent = (pagination: PaginationProperties) => Promise<DataRow[]>;

	export let caption: string = '';
	export let rows: DataRow[] | undefined = undefined;
	export let cols: DataCol[];
	export let pagination: PaginationProperties | undefined = undefined;
	export let editRow: Action = undefined;
	export let deleteRow: Action = undefined;

	/**
	 * Handle page change, which should return the new filtered/fetched rows.
	 */
	export let onPageChange: PaginationEvent | null = null;

	const getColType = (col: DataCol) => {
		if (col.type) return col.type;
		if (!rows?.length) return 'string';
		return typeof rows[0][col.key];
	};

	const clickEdit = async (row: DataRow) => {
		if (editRow) await editRow(row);
	};

	const clickDelete = async (row: DataRow) => {
		if (deleteRow) await deleteRow(row);
	};

	const format = (row: DataRow, key: string) => {
		const col = cols.find((col) => col.key === key);
		if (!col) return row[key];
		if (col.format) return col.format(row, key);
		return row[key];
	};

	const calculateTotalPages = () => {
		if (!pagination || !rows) return 1;
		const totalRows = Math.max(pagination.total || rows.length);
		return Math.ceil(totalRows / pagination.perPage);
	};

	const changePage = async (e: CustomEvent<number>) => {
		pagination = { page: e.detail, perPage: pagination?.perPage || 5 };
		if (onPageChange) {
			rows = await onPageChange(pagination);
		}
	};

	const filterRows = () => {
		// If we don't have rows or pagination, we don't need to filter the rows.
		if (!rows?.length || !pagination) return rows;
		// If we have an onPageChange handler, we don't need to filter the rows because that will be handled by the handler.
		if (onPageChange) return rows;
		// Filter the rows based on the current page and perPage.
		const currentPage = pagination.page || 1;
		const perPage = pagination.perPage || 5;
		const startIndex = currentPage * perPage - perPage;
		const endIndex = startIndex + perPage;
		return rows.filter((_row, index) => index >= startIndex && index < endIndex);
	};

	$: hasActionRow = editRow || deleteRow;
	$: colCount = Math.max(1, cols.filter((col) => !col.hide).length) + (hasActionRow ? 1 : 0);
	$: totalPages = pagination && rows ? calculateTotalPages() : 1;
	$: filteredRows = rows && pagination ? filterRows() : rows;
</script>

<Table>
	{#if caption}
		<TableCaption>{caption}</TableCaption>
	{/if}
	<TableHeader>
		<TableHeaderRow>
			{#each cols as col}
				{#if !col.hide}
					<TableHeaderCell type={getColType(col)} width={col.width}>{col.label}</TableHeaderCell>
				{/if}
			{/each}
			{#if hasActionRow}
				<TableHeaderCell type="string" />
			{/if}
		</TableHeaderRow>
	</TableHeader>
	<TableBody>
		{#if !filteredRows?.length}
			<TableRow>
				<TableCell colspan={colCount}>
					<div class="empty">
						{#if rows === undefined}
							<Loading />
						{:else}
							<Empty>
								<FolderOpenIcon />
							</Empty>
						{/if}
					</div>
				</TableCell>
			</TableRow>
		{:else}
			{#each filteredRows as row}
				<TableRow>
					{#each cols as col}
						{#if !col.hide}
							<TableCell type={col.type || typeof row[col.key]} width={col.width}>
								{#if col.link}
									<a href={col.link(row, col.key)}>{format(row, col.key)}</a>
								{:else}
									{format(row, col.key)}
								{/if}
							</TableCell>
						{/if}
					{/each}
					{#if hasActionRow}
						<TableCell type="actions">
							{#if editRow}
								<button type="button" on:click={() => clickEdit(row)}>Edit</button>
							{/if}
							{#if deleteRow}
								<button type="button" on:click={() => clickDelete(row)}>Delete</button>
							{/if}
						</TableCell>
					{/if}
				</TableRow>
			{/each}
		{/if}
	</TableBody>
	{#if pagination}
		<TableFooter>
			<TableFooterRow>
				<TableFooterCell colspan={colCount}>
					<Pagination
						currentPage={pagination.page}
						{totalPages}
						style="flat"
						size="sm"
						align="center"
						on:page={changePage}
					/>
				</TableFooterCell>
			</TableFooterRow>
		</TableFooter>
	{/if}
</Table>

<style lang="scss">
	.empty {
		padding: 2rem;
		text-transform: uppercase;
		letter-spacing: 0.2rem;
	}

	a {
		color: var(--table-link-fg, #00f);
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	button {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--table-link-fg, #00f);
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
</style>
