<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '$lib/icons/icon.svelte';
	import type { IconType } from '$lib/icons/types.js';

	let {
		colspan = 1,
		type = undefined,
		width = undefined,
		sortable = false,
		sortKey = undefined,
		align = undefined,
		isSorted = false,
		sortDirection = undefined,
		onSort = undefined,
		children
	}: {
		colspan?: number;
		type?: string;
		width?: number | string;
		sortable?: boolean;
		sortKey?: string;
		align?: 'left' | 'center' | 'right';
		isSorted?: boolean;
		sortDirection?: 'asc' | 'desc';
		onSort?: (column: string, direction: 'asc' | 'desc') => void;
		children: Snippet;
	} = $props();

	let canSort = $derived(sortable && sortKey && onSort);

	let styleProperties = $derived([
		'text-overflow: ellipsis',
		'overflow: hidden',
		`width: ${width ? width : 'auto'}`
	]);

	// Determine alignment
	let textAlign = $derived(
		align ||
			(type === 'currency' || type === 'number'
				? 'right'
				: type === 'check' || type === 'boolean'
					? 'center'
					: 'left')
	);

	// Determine aria-sort value
	let ariaSort = $derived<'ascending' | 'descending' | 'none' | 'other' | undefined>(
		isSorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined
	);

	function handleClick() {
		if (canSort && sortKey && onSort) {
			// Cycle through: null -> asc -> desc -> null
			let newDirection: 'asc' | 'desc';
			if (!isSorted) {
				newDirection = 'asc';
			} else if (sortDirection === 'asc') {
				newDirection = 'desc';
			} else {
				// Clear sort by passing empty string
				onSort('', 'asc');
				return;
			}
			onSort(sortKey, newDirection);
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (canSort && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			if (sortKey && onSort && sortDirection) {
				onSort(sortKey, sortDirection === 'asc' ? 'desc' : 'asc');
			}
		}
	}

	// Determine which icon to show based on sort state
	let sortIconType = $derived<IconType | undefined>(
		canSort
			? isSorted
				? sortDirection === 'asc'
					? 'triangle-up'
					: 'triangle-down'
				: 'triangle-up-down'
			: undefined
	);
</script>

<th
	{colspan}
	class="{type} {textAlign}"
	class:sortable={canSort}
	class:sorted={isSorted}
	style={styleProperties.join('; ')}
	aria-sort={ariaSort}
	role={canSort ? 'columnheader button' : 'columnheader'}
	tabindex={canSort ? 0 : undefined}
	onclick={handleClick}
	onkeydown={handleKeyDown}
>
	<div class="header-content">
		<span class="header-text">
			{@render children?.()}
		</span>
		{#if canSort && sortIconType}
			<span class="sort-indicator" aria-hidden="true">
				<Icon
					type={sortIconType}
					size="sm"
					variant="secondary"
					class="sort-arrow {isSorted ? '' : 'unsorted'}"
				/>
			</span>
		{/if}
	</div>
</th>

<style lang="scss">
	th {
		padding: 0.5rem;
		font-size: 0.8rem;
		font-weight: 500;
		font-family: sans-serif;
		line-height: 1.5rem;
		letter-spacing: 0.015em;
		text-transform: uppercase;
		text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
		position: relative;

		&.left {
			text-align: left;
		}

		&.center {
			text-align: center;
		}

		&.right {
			text-align: right;
		}

		&.sortable {
			cursor: pointer;
			user-select: none;

			&:hover {
				background: var(--table-header-hover-bg, rgba(0, 0, 0, 0.05));
			}

			&:focus {
				outline: 2px solid var(--focus-color, #0066cc);
				outline-offset: -2px;
			}
		}

		&.sorted {
			background: var(--table-header-sorted-bg, rgba(0, 0, 0, 0.08));
		}
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.header-text {
		flex: 1;
		min-width: 0;
	}

	.sort-indicator {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		opacity: 0.7;
	}

	.sort-arrow {
		display: inline-block;
		transition: opacity 0.2s;

		&.unsorted {
			opacity: 0.3;
		}
	}

	th.sortable:hover :global(.sort-arrow.unsorted) {
		opacity: 0.6;
	}
</style>
