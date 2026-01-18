<script lang="ts" generics="T extends PlainObject">
	import type { Snippet } from 'svelte';
	import type { ColumnDef, PlainObject } from '$src/lib/types/data.js';
	import TableCell from './table-cell.svelte';
	import Pill from '../generic/pill/pill.svelte';
	import {
		formatCell,
		getCellLink,
		getCellAlignment,
		getCellTypeClass,
		getCellValue,
		formatArrayCell
	} from './cell-renderers.js';

	interface CellContext<TRow extends PlainObject = PlainObject> {
		row: TRow;
		value: unknown;
		column: ColumnDef<TRow>;
		rowIndex: number;
	}

	let {
		row,
		column,
		rowIndex,
		cellSnippet = undefined,
		width = undefined
	}: {
		row: T;
		column: ColumnDef<T>;
		rowIndex: number;
		cellSnippet?: Snippet<[CellContext<T>]>;
		width?: number | string;
	} = $props();

	let cellValue = $derived(getCellValue(row, column.key));
	let cellAlign = $derived(getCellAlignment(column));
</script>

<TableCell type={getCellTypeClass(column)} {width} align={cellAlign}>
	{#if cellSnippet}
		{@render cellSnippet({ row, value: cellValue, column, rowIndex })}
	{:else if column.type === 'custom' && column.component}
		{@const CellComponent = column.component}
		<CellComponent {row} value={cellValue} column={column} {rowIndex} />
	{:else if column.type === 'array'}
		{@const arrayResult = formatArrayCell(row, column)}
		<span class="array-cell array-{arrayResult.separator}">
			{#each arrayResult.items as item, i}
				{#if arrayResult.separator === 'pill'}
					<Pill compact>
						{#if item.link}<a href={item.link}>{item.text}</a>{:else}{item.text}{/if}
					</Pill>
				{:else if arrayResult.separator === 'line'}
					<div>
						{#if item.link}<a href={item.link}>{item.text}</a>{:else}{item.text}{/if}
					</div>
				{:else}
					{#if i > 0}
						{#if arrayResult.separator === 'comma'},
						{:else if arrayResult.separator === 'semicolon'};
						{/if}
					{/if}
					{#if item.link}<a href={item.link}>{item.text}</a>{:else}{item.text}{/if}
				{/if}
			{/each}
		</span>
	{:else if column.type === 'check' || column.type === 'boolean'}
		{#if row[column.key]}
			<Pill shape="circle" variant="positive" compact label="✔" />
		{/if}
	{:else}
		{@const cellLink = getCellLink(row, column)}
		{#if cellLink}
			<a href={cellLink}>{formatCell(row, column)}</a>
		{:else}
			{formatCell(row, column)}
		{/if}
	{/if}
</TableCell>

<style lang="scss">
	a {
		color: var(--table-link-fg, rgb(0, 0, 200));
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.array-cell {
		display: inline-flex;
		align-items: flex-start;
		flex-wrap: wrap;

		&.array-comma,
		&.array-semicolon {
			gap: 0;
		}

		&.array-line {
			flex-direction: column;
			gap: 0.25rem;
		}

		&.array-pill {
			gap: 0.25rem;
		}
	}
</style>
