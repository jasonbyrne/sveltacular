<script lang="ts">
	import type { JsonObject } from '$src/lib/types/data.js';
	import { getTableContext } from './table-context.svelte.js';
	import CheckBox from '../forms/check-box/check-box.svelte';
	import RadioBox from '../forms/radio-group/radio-box.svelte';

	let {
		row = undefined,
		rowIndex = undefined
	}: {
		row?: JsonObject;
		rowIndex?: number;
	} = $props();

	const context = getTableContext();

	if (!context) {
		throw new Error('TableSelectionCell must be used within a Table component');
	}

	// Get row ID for selection
	let rowId = $derived(
		row && context?.config.rowIdKey ? (row[context.config.rowIdKey] as string | number) : undefined
	);

	// Derive selection state from context - this is the source of truth
	// Access selectedIds directly to ensure reactivity is tracked properly
	let isSelectedInContext = $derived.by(() => {
		if (rowId === undefined || !context) return false;
		// Explicitly access selectedIds to set up reactivity tracking
		const selectedIds = context.selectedIds;
		return selectedIds.has(rowId);
	});

	let selectionMode = $derived(context?.config.selectionMode ?? 'none');

	// Local state for checkbox binding - synced from context
	let localChecked = $state(false);

	// Sync local state FROM context whenever context selection changes
	// This ensures external changes (like "select all") update the checkbox
	$effect(() => {
		localChecked = isSelectedInContext;
	});

	// For radio buttons in single selection mode
	let radioGroupLocal = $state<string | undefined>(undefined);

	// Sync radio state FROM context
	$effect(() => {
		if (selectionMode === 'single' && context) {
			radioGroupLocal = context.radioGroup;
		}
	});

	// Handle checkbox change - update context (source of truth)
	function handleCheckboxChange(data: { isChecked: boolean; value: string }) {
		if (rowId !== undefined && rowIndex !== undefined && context) {
			const rows = context.config.rows ?? [];
			// Toggle the row in context - context is the source of truth
			context.toggleRow(rowId, rowIndex, false, rows);
		}
	}

	// Handle radio button change
	function handleRadioChange(value: string) {
		if (context && selectionMode === 'single') {
			const rows = context.config.rows ?? [];
			// Toggle: if already selected, deselect; otherwise select
			if (context.radioGroup === value) {
				context.setRadioSelection(undefined, rows);
			} else {
				context.setRadioSelection(value, rows);
			}
		}
	}

	// Handle cell click - toggle selection when clicking anywhere in the cell
	function handleCellClick(event: MouseEvent) {
		const target = event.target as HTMLElement;

		if (selectionMode === 'multi') {
			// For checkboxes: skip if clicking on input to avoid double-toggle
			if (target.tagName === 'INPUT') return;
			handleCheckboxChange({ isChecked: !localChecked, value: '' });
		} else if (selectionMode === 'single' && rowId !== undefined) {
			// For radios: always handle the click ourselves to enable deselection
			// Native radio buttons don't allow unchecking, so we take control
			if (target.tagName === 'INPUT') {
				event.preventDefault();
			}
			handleRadioChange(String(rowId));
		}
	}
</script>

{#if selectionMode === 'multi'}
	<td class="selection-cell" role="gridcell" onclick={handleCellClick}>
		<CheckBox
			bind:isChecked={localChecked}
			onChange={handleCheckboxChange}
			inline={true}
			ariaLabel="Select row"
		/>
	</td>
{:else if selectionMode === 'single'}
	<td class="selection-cell" role="gridcell" onclick={handleCellClick}>
		<RadioBox
			value={String(rowId ?? '')}
			bind:group={radioGroupLocal}
			onChange={handleRadioChange}
			ariaLabel="Select row"
		/>
	</td>
{/if}

<style lang="scss">
	.selection-cell {
		text-align: center;
		padding: 0.5rem 0.25rem;
		width: 48px;
		min-width: 48px;
		vertical-align: middle;
		cursor: pointer;
		display: table-cell;
	}

	:global(.selection-cell .checkbox-label),
	:global(.selection-cell label) {
		margin: 0 auto;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
