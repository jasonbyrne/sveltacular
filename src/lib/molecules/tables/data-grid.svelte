<script lang="ts">
	import TableBody from '$src/lib/atoms/table-body.svelte';
	import TableCell from '$src/lib/atoms/table-cell.svelte';
	import TableFooterCell from '$src/lib/atoms/table-footer-cell.svelte';
	import TableFooterRow from '$src/lib/atoms/table-footer-row.svelte';
	import TableFooter from '$src/lib/atoms/table-footer.svelte';
	import TableHeaderCell from '$src/lib/atoms/table-header-cell.svelte';
	import TableHeaderRow from '$src/lib/atoms/table-header-row.svelte';
	import TableHeader from '$src/lib/atoms/table-header.svelte';
	import TableRow from '$src/lib/atoms/table-row.svelte';
	import Table from '$src/lib/atoms/table.svelte';
	import type { DataCol, DataRow } from '$src/types/data.js';

	export let data: DataRow[];
	export let cols: DataCol[];

	$: colCount = Math.max(1, cols.filter((col) => !col.hide).length);
</script>

<Table>
	<TableHeader>
		<TableHeaderRow>
			{#each cols as col}
				{#if !col.hide}
					<TableHeaderCell>{col.label}</TableHeaderCell>
				{/if}
			{/each}
		</TableHeaderRow>
	</TableHeader>
	<TableBody>
		{#each data as row}
			<TableRow>
				{#each cols as col}
					{#if !col.hide}
						<TableCell>{row[col.key]}</TableCell>
					{/if}
				{/each}
			</TableRow>
		{/each}
	</TableBody>
	<TableFooter>
		<TableFooterRow>
			<TableFooterCell colspan={colCount}>Page 1 of 50</TableFooterCell>
		</TableFooterRow>
	</TableFooter>
</Table>
