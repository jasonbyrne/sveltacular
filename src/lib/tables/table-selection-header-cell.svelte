<script lang="ts">
	import { getTableContext } from './table-context.svelte.js';
	import CheckBox from '../forms/check-box/check-box.svelte';

	const context = getTableContext();

	if (!context) {
		throw new Error('TableSelectionHeaderCell must be used within a Table component');
	}

	let selectionMode = $derived(context?.config.selectionMode ?? 'none');
	let rows = $derived(context?.config.rows ?? []);

	// Compute whether all rows are selected - source of truth from context
	let isAllSelectedInContext = $derived.by(() => {
		if (!context || !rows.length) return false;
		// Access selectedIds directly to ensure reactivity is tracked
		const selectedIds = context.selectedIds;
		const rowIdKey = context.config.rowIdKey!;
		// Check if every row's ID is in the selected set
		return rows.every((row) => {
			const id = row[rowIdKey] as string | number;
			return id !== undefined && selectedIds.has(id);
		});
	});

	// Local state for checkbox binding - synced from context
	let localChecked = $state(false);

	// Sync local state FROM context whenever selection changes
	// This ensures the header checkbox reflects the actual selection state
	$effect(() => {
		localChecked = isAllSelectedInContext;
	});

	// Handle "select all" checkbox change
	function handleSelectAllChange(data: { isChecked: boolean; value: string }) {
		if (!context) return;
		const currentRows = rows;
		if (!currentRows || currentRows.length === 0) return;

		// data.isChecked is the NEW desired state from user interaction
		if (data.isChecked) {
			// User wants to select all
			context.selectAll(currentRows);
		} else {
			// User wants to deselect all
			context.deselectAll(currentRows);
		}
		// The effect will sync localChecked from context after this
	}

	// Handle header cell click - toggle select all when clicking anywhere in the cell
	function handleCellClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const currentTarget = event.currentTarget as HTMLElement;

		// If the click is on the label or any of its children (input, span, etc.),
		// let the component's native handlers take care of it
		const label = currentTarget.querySelector('label');
		if (label && (target === label || label.contains(target))) {
			// Let the native checkbox handler work
			return;
		}

		// Only handle cell click if clicking directly on the cell (not on the label/input)
		if (target === currentTarget) {
			handleSelectAllChange({ isChecked: !localChecked, value: '' });
		}
	}
</script>

{#if selectionMode === 'multi'}
	<th
		class="selection-header"
		style="width: 48px; min-width: 48px; text-align: center;"
		onclick={handleCellClick}
	>
		<div class="header-content">
			<CheckBox
				bind:isChecked={localChecked}
				onChange={handleSelectAllChange}
				inline={true}
				ariaLabel="Select all rows"
			/>
		</div>
	</th>
{:else if selectionMode === 'single'}
	<th class="selection-header" style="width: 48px; min-width: 48px; text-align: center;"></th>
{/if}

<style lang="scss">
	.selection-header {
		padding: 0.5rem 0.25rem !important;
		vertical-align: middle;
		text-align: center;
		cursor: pointer;
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	:global(.header-content .checkbox-label) {
		margin: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
