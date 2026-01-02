<script lang="ts">
	import TableCell from '$src/lib/tables/table-cell.svelte';
	import TableHeaderCell from '$src/lib/tables/table-header-cell.svelte';
	import TableHeader from '$src/lib/tables/table-header.svelte';
	import TableRow from '$src/lib/tables/table-row.svelte';
	import Table from '$src/lib/tables/table.svelte';
	import type { ColumnDef, JsonObject, PaginationProperties } from '$src/lib/types/data.js';
	import Button from '../forms/button/button.svelte';
	import DropdownItem from '../generic/dropdown-item/dropdown-item.svelte';
	import Empty from '../generic/empty/empty.svelte';
	import Pill from '../generic/pill/pill.svelte';
	import FolderOpenIcon from '../icons/folder-open-icon.svelte';
	import DropdownButton from '../navigation/dropdown-button/dropdown-button.svelte';
	import Pagination from '../navigation/pagination/pagination.svelte';
	import Loading from '../placeholders/loading.svelte';
	import TableCaption from './table-caption.svelte';
	import {
		formatCell,
		getCellLink,
		getCellAlignment,
		getCellTypeClass,
		sortRows
	} from './cell-renderers.js';
	import { getTableContext } from './table-context.svelte.js';
	import type { Snippet } from 'svelte';
	import { useVirtualList } from '$src/lib/helpers/use-virtual-list.svelte.js';
	import { onMount } from 'svelte';

	type PaginationEvent = (pagination: PaginationProperties) => void;

	interface Action {
		text: string;
		onClick: (row: JsonObject) => unknown;
	}

	interface Actions {
		text?: string;
		type?: string;
		items: Action[];
	}

	let {
		captionSide = 'top' as 'top' | 'bottom',
		captionAlign = 'center' as 'left' | 'center' | 'right',
		rows = undefined,
		cols,
		pagination = undefined,
		actions = undefined,
		stickyHeader = false,
		enableSorting = true,
		enableSelection = false,
		selectionMode = 'multi',
		rowIdKey = 'id',
		onPageChange = null,
		onSort = undefined,
		onSelectionChange = undefined,
		children = undefined,
		virtualScroll = false,
		rowHeight = 48,
		maxHeight = '600px'
	}: {
		captionSide?: 'top' | 'bottom';
		captionAlign?: 'left' | 'center' | 'right';
		rows?: JsonObject[];
		cols: ColumnDef[];
		pagination?: PaginationProperties;
		actions?: Actions;
		stickyHeader?: boolean;
		enableSorting?: boolean;
		enableSelection?: boolean;
		selectionMode?: 'single' | 'multi';
		rowIdKey?: string;
		onPageChange?: PaginationEvent | null;
		onSort?: (column: string, direction: 'asc' | 'desc') => void;
		onSelectionChange?: (selectedIds: Set<string | number>) => void;
		children?: Snippet;
		virtualScroll?: boolean;
		rowHeight?: number;
		maxHeight?: string;
	} = $props();

	// Track current page internally
	let currentPage = $state(1);

	// Update currentPage when pagination prop changes
	$effect(() => {
		const page = pagination?.page;
		if (page) {
			currentPage = page;
		}
	});

	let totalPages = $derived.by(() => {
		if (!pagination || !rows) return 1;
		const totalRows = Math.max(pagination.total || rows.length);
		return Math.ceil(totalRows / pagination.perPage);
	});

	const changePage = (page: number) => {
		if (!pagination) return;
		currentPage = page;
		// Notify parent if callback provided
		if (onPageChange) {
			const newPagination = { ...pagination, page };
			onPageChange(newPagination);
		}
	};

	// Computed values
	let hasActionCol = $derived(actions?.items && actions.items.length > 0);
	let visibleCols = $derived(cols.filter((col) => !col.hidden));
	let colCount = $derived(Math.max(1, visibleCols.length) + (hasActionCol ? 1 : 0));

	// Manage sort state directly in DataGrid (not via context)
	let currentSortColumn = $state<string | null>(null);
	let currentSortDirection = $state<'asc' | 'desc'>('asc');

	// Handle sort changes
	function handleSortChange(column: string, direction: 'asc' | 'desc') {
		// Empty column means clear sort
		if (column === '') {
			currentSortColumn = null;
		} else {
			currentSortColumn = column;
			currentSortDirection = direction;
			onSort?.(column, direction);
		}
	}

	// Apply sorting
	let sortedRows = $derived.by(() => {
		if (!rows?.length || !enableSorting) return rows;
		if (!currentSortColumn) return rows;

		const sortColumn = cols.find((col) => col.key === currentSortColumn);
		if (!sortColumn) return rows;

		return sortRows(rows, sortColumn, currentSortDirection);
	});

	// Apply pagination
	let filteredRows = $derived.by(() => {
		const dataRows = sortedRows;
		if (!dataRows?.length || !pagination) return dataRows;

		// Always do client-side pagination
		// onPageChange callback is just for notification
		const perPage = pagination.perPage || 5;
		const startIndex = currentPage * perPage - perPage;
		const endIndex = startIndex + perPage;
		return dataRows.filter((_row, index) => index >= startIndex && index < endIndex);
	});

	// Virtual scrolling setup (only when pagination is disabled)
	let tbodyRef: HTMLElement | null = null;
	let virtual = $state<ReturnType<typeof useVirtualList<JsonObject>> | null>(null);

	// Initialize virtual list
	$effect(() => {
		if (virtualScroll && !pagination) {
			if (!virtual) {
				virtual = useVirtualList(filteredRows || [], { itemHeight: rowHeight });
				if (tbodyRef) {
					virtual.setContainer(tbodyRef);
				}
			} else {
				virtual.setItems(filteredRows || []);
			}
		} else if (virtual) {
			virtual.destroy();
			virtual = null;
		}
	});

	// Set container when tbody ref is available
	$effect(() => {
		if (virtual && tbodyRef) {
			virtual.setContainer(tbodyRef);
		}
	});
</script>

<Table
	{stickyHeader}
	enableSorting={false}
	{enableSelection}
	{selectionMode}
	{rowIdKey}
	onSort={handleSortChange}
	{onSelectionChange}
>
	{#if children}
		<TableCaption side={captionSide} align={captionAlign}>{@render children?.()}</TableCaption>
	{/if}

	<TableHeader sticky={stickyHeader}>
		<tr>
			{#each visibleCols as col}
				<TableHeaderCell
					type={col.type}
					width={col.width}
					sortable={col.sortable ?? enableSorting}
					sortKey={col.key}
					align={getCellAlignment(col)}
					isSorted={currentSortColumn === col.key}
					sortDirection={currentSortColumn === col.key ? currentSortDirection : undefined}
					onSort={handleSortChange}
				>
					{col.label}
				</TableHeaderCell>
			{/each}
			{#if hasActionCol}
				<TableHeaderCell type="actions">Actions</TableHeaderCell>
			{/if}
		</tr>
	</TableHeader>

	<tbody
		bind:this={tbodyRef}
		style={virtualScroll && !pagination
			? `display: block; max-height: ${maxHeight}; overflow-y: auto;`
			: ''}
	>
		{#if !filteredRows?.length}
			<TableRow>
				<TableCell colspan={colCount}>
					<div class="empty" role="status" aria-live="polite">
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
		{:else if virtualScroll && !pagination && virtual}
			<!-- Virtual scrolling mode -->
			<tr style="height: {virtual.totalHeight}px; position: relative;">
				<td colspan={colCount} style="padding: 0; border: 0;">
					{#each virtual.visibleItems as vItem (vItem.index)}
						{@const row = vItem.data}
						{@const index = vItem.index}
						<div
							style="position: absolute; top: {vItem.offsetTop}px; height: {vItem.height}px; width: 100%; display: table; table-layout: fixed;"
						>
							<TableRow {row} rowIndex={index} selectable={enableSelection}>
								{#each visibleCols as col}
									{@const cellValue = formatCell(row, col)}
									{@const cellLink = getCellLink(row, col)}
									{@const cellAlign = getCellAlignment(col)}
									<TableCell type={getCellTypeClass(col)} width={col.width} align={cellAlign}>
										{#if cellLink}
											<a href={cellLink}>{cellValue}</a>
										{:else if col.type === 'check' || col.type === 'boolean'}
											{#if row[col.key]}
												<Pill shape="circle" variant="positive" compact label="✔" />
											{/if}
										{:else}
											{cellValue}
										{/if}
									</TableCell>
								{/each}
								{#if hasActionCol && actions}
									<TableCell type="actions">
										{#if actions.type === 'dropdown'}
											<DropdownButton text={actions.text ?? ''} variant="ghost">
												{#each actions.items as action}
													<DropdownItem onClick={() => action.onClick(row)}
														>{action.text}</DropdownItem
													>
												{/each}
											</DropdownButton>
										{:else}
											{#each actions.items as action}
												<Button
													collapse={true}
													size="sm"
													type="button"
													variant={actions.type === 'outline' ? 'outline' : 'secondary'}
													onClick={() => action.onClick(row)}
													label={action.text}
												/>
											{/each}
										{/if}
									</TableCell>
								{/if}
							</TableRow>
						</div>
					{/each}
				</td>
			</tr>
		{:else}
			<!-- Regular rendering mode -->
			{#each filteredRows as row, index}
				<TableRow {row} rowIndex={index} selectable={enableSelection}>
					{#each visibleCols as col}
						{@const cellValue = formatCell(row, col)}
						{@const cellLink = getCellLink(row, col)}
						{@const cellAlign = getCellAlignment(col)}
						<TableCell type={getCellTypeClass(col)} width={col.width} align={cellAlign}>
							{#if cellLink}
								<a href={cellLink}>{cellValue}</a>
							{:else if col.type === 'check' || col.type === 'boolean'}
								{#if row[col.key]}
									<Pill shape="circle" variant="positive" compact label="✔" />
								{/if}
							{:else}
								{cellValue}
							{/if}
						</TableCell>
					{/each}
					{#if hasActionCol && actions}
						<TableCell type="actions">
							{#if actions.type === 'dropdown'}
								<DropdownButton text={actions.text ?? ''} variant="ghost">
									{#each actions.items as action}
										<DropdownItem onClick={() => action.onClick(row)}>{action.text}</DropdownItem>
									{/each}
								</DropdownButton>
							{:else}
								{#each actions.items as action}
									<Button
										collapse={true}
										size="sm"
										type="button"
										variant={actions.type === 'outline' ? 'outline' : 'secondary'}
										onClick={() => action.onClick(row)}
										label={action.text}
									/>
								{/each}
							{/if}
						</TableCell>
					{/if}
				</TableRow>
			{/each}
		{/if}
	</tbody>

	{#if pagination}
		<tfoot>
			<tr>
				<td colspan={colCount} class="footer-cell">
					<nav aria-label="Table pagination">
						<Pagination
							bind:currentPage
							{totalPages}
							variant="flat"
							size="sm"
							align="center"
							onPage={changePage}
						/>
					</nav>
				</td>
			</tr>
		</tfoot>
	{/if}
</Table>

<style lang="scss">
	.empty {
		padding: 2rem;
		text-transform: uppercase;
		letter-spacing: 0.2rem;
	}

	a {
		color: var(--table-link-fg, rgb(0, 0, 200));
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	tfoot {
		background: var(--table-footer-bg);
		color: var(--table-footer-fg);
		border-top: solid var(--border-thin) var(--table-footer-border);
		border-bottom: solid var(--border-thin) var(--table-footer-border);
		font-size: var(--font-sm);
	}

	.footer-cell {
		padding: 0.5rem;
	}

	td.footer-cell :global(.pagination) {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
