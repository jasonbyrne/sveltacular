<script lang="ts" generics="T extends JsonObject">
	import TableCell from '$src/lib/tables/table-cell.svelte';
	import TableHeaderCell from '$src/lib/tables/table-header-cell.svelte';
	import TableHeader from '$src/lib/tables/table-header.svelte';
	import Table from '$src/lib/tables/table.svelte';
	import TableSelectionHeaderCell from './table-selection-header-cell.svelte';
	import DataGridRow from './data-grid-row.svelte';
	import type {
		ColumnDef,
		JsonObject,
		PaginationProperties,
		DataGridActions
	} from '$src/lib/types/data.js';
	import Empty from '../generic/empty/empty.svelte';
	import Icon from '../icons/icon.svelte';
	import Pagination from '../navigation/pagination/pagination.svelte';
	import Loading from '../placeholders/loading.svelte';
	import TableCaption from './table-caption.svelte';
	import { getCellAlignment, sortRows } from './cell-renderers.js';
	import type { Snippet } from 'svelte';
	import { useVirtualList } from '$src/lib/helpers/use-virtual-list.svelte.js';
	import type { ButtonVariant, FormFieldSizeOptions } from '$src/lib/types/form.js';

	type PaginationEvent = (pagination: PaginationProperties) => void;

	interface CellContext<TRow extends JsonObject = JsonObject> {
		row: TRow;
		value: unknown;
		column: ColumnDef<TRow>;
		rowIndex: number;
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
		selectionMode = 'none',
		rowIdKey = 'id',
		onPageChange = null,
		onSort = undefined,
		onSelectionChange = undefined,
		selectedCount = $bindable(0),
		children = undefined,
		cells = undefined,
		virtualScroll = false,
		rowHeight = 48,
		maxHeight = '600px'
	}: {
		captionSide?: 'top' | 'bottom';
		captionAlign?: 'left' | 'center' | 'right';
		rows?: T[];
		cols: ColumnDef<T>[];
		pagination?: PaginationProperties;
		actions?: DataGridActions<T>;
		stickyHeader?: boolean;
		enableSorting?: boolean;
		selectionMode?: 'none' | 'single' | 'multi';
		rowIdKey?: string;
		onPageChange?: PaginationEvent | null;
		onSort?: (column: string, direction: 'asc' | 'desc') => void;
		onSelectionChange?: (selectedRows: T[]) => void;
		selectedCount?: number;
		children?: Snippet;
		cells?: Record<string, Snippet<[CellContext<T>]>>;
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
	let hasSelectionCol = $derived(selectionMode !== 'none');
	let visibleCols = $derived(cols.filter((col) => !col.hidden));
	let colCount = $derived(
		Math.max(1, visibleCols.length) + (hasActionCol ? 1 : 0) + (hasSelectionCol ? 1 : 0)
	);
	let actionButtonVariant = $derived.by(() => {
		return !actions?.variant || actions.variant === 'default' ? 'outline' : actions.variant;
	});
	let actionButtonSize = $derived(actions?.size ?? 'sm');
	let actionAlign = $derived(actions?.align ?? 'center');

	// Track selected count from selection change callbacks
	let internalSelectedCount = $state(0);

	// Sync selectedCount with internal tracking
	$effect(() => {
		selectedCount = internalSelectedCount;
	});

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
	let virtual = $state<ReturnType<typeof useVirtualList<T>> | null>(null);

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
	rows={filteredRows ?? []}
	{stickyHeader}
	enableSorting={false}
	{selectionMode}
	{rowIdKey}
	onSort={handleSortChange}
	onSelectionChange={(selectedRowIds) => {
		// Convert selected IDs to actual row objects
		// Use sortedRows (before pagination) to include all selected rows, not just current page
		const selectedRowObjects = (sortedRows ?? []).filter((row) => {
			const id = row[rowIdKey] as string | number;
			return id !== undefined && selectedRowIds.includes(id);
		});
		onSelectionChange?.(selectedRowObjects);
		// Track selected count from the callback
		internalSelectedCount = selectedRowIds.length;
	}}
>
	{#if children}
		<TableCaption side={captionSide} align={captionAlign}>{@render children?.()}</TableCaption>
	{/if}

	<TableHeader sticky={stickyHeader}>
		<tr>
			{#if hasSelectionCol}
				<TableSelectionHeaderCell />
			{/if}
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
				<TableHeaderCell type="actions" align={actionAlign}>Actions</TableHeaderCell>
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
			<tr>
				<TableCell colspan={colCount}>
					<div class="empty" role="status" aria-live="polite">
						{#if rows === undefined}
							<Loading />
						{:else}
							<Empty>
								<Icon type="folder-open" size="lg" />
							</Empty>
						{/if}
					</div>
				</TableCell>
			</tr>
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
							<DataGridRow
								{row}
								rowIndex={index}
								{visibleCols}
								{hasSelectionCol}
								{hasActionCol}
								{actions}
								{cells}
								{actionButtonVariant}
								{actionButtonSize}
								{actionAlign}
							/>
						</div>
					{/each}
				</td>
			</tr>
		{:else}
			<!-- Regular rendering mode -->
			{#each filteredRows as row, index}
				<DataGridRow
					{row}
					rowIndex={index}
					{visibleCols}
					{hasSelectionCol}
					{hasActionCol}
					{actions}
					{cells}
					{actionButtonVariant}
					{actionButtonSize}
					{actionAlign}
				/>
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
