<script lang="ts">
	import Icon from '$src/lib/icons/icon.svelte';
	import type { ComponentSize, ComponentWidth, ReferenceItem } from '$src/lib/index.js';
	import FlexItem from '$src/lib/layout/flex-item.svelte';
	import FlexRow from '$src/lib/layout/flex-row.svelte';
	import { useVirtualList } from '$src/lib/helpers/use-virtual-list.svelte.js';

	let {
		items = [] as ReferenceItem[],
		value = $bindable(null as string | null),
		instructions = '',
		open = $bindable(false),
		size = 'full',
		closeAfterSelect = true,
		searchText = '',
		highlightIndex = $bindable(0),
		onSelect = undefined,
		virtualScroll = false,
		itemHeight = 40,
		listboxId = undefined
	}: {
		items?: ReferenceItem[];
		value?: string | null;
		instructions?: string;
		open?: boolean;
		size?: ComponentWidth;
		closeAfterSelect?: boolean;
		searchText?: string;
		highlightIndex?: number;
		onSelect?: ((item: ReferenceItem) => void) | undefined;
		virtualScroll?: boolean;
		itemHeight?: number;
		listboxId?: string | undefined;
	} = $props();

	const selectItem = (item: ReferenceItem) => {
		value = item.value != null ? String(item.value) : null;
		onSelect?.(item);
		if (closeAfterSelect) open = false;
	};

	const scrollToItem = (index: number) => {
		if (virtualScroll && virtual) {
			virtual.scrollToIndex(index, 'smooth');
		} else {
			const el = document.querySelector(`[data-index="${index}"]`);
			if (el) el.scrollIntoView({ block: 'nearest' });
		}
	};

	// Virtual scrolling setup
	let containerRef: HTMLElement | null = null;
	let virtual = $state<ReturnType<typeof useVirtualList<ReferenceItem>> | null>(null);

	// Initialize virtual list
	$effect(() => {
		if (virtualScroll) {
			if (!virtual) {
				virtual = useVirtualList(items, { itemHeight });
				if (containerRef) {
					virtual.setContainer(containerRef);
				}
			} else {
				virtual.setItems(items);
			}
		} else if (virtual) {
			virtual.destroy();
			virtual = null;
		}
	});

	// Set container when ref is available
	$effect(() => {
		if (virtual && containerRef) {
			virtual.setContainer(containerRef);
		}
	});

	$effect(() => {
		if (highlightIndex >= 0) {
			scrollToItem(highlightIndex);
		}
	});
</script>

<ul
	role="listbox"
	id={listboxId}
	class="menu {open ? 'open' : 'closed'} {size}"
	bind:this={containerRef}
	aria-label="Options"
>
	{#if instructions}
		<li class="instructions" role="presentation">{instructions}</li>
	{/if}

	{#if virtualScroll && virtual}
		<!-- Virtual scrolling mode -->
		<div style="height: {virtual.totalHeight}px; position: relative;">
			{#each virtual.visibleItems as vItem (vItem.index)}
				{@const item = vItem.data}
				{@const i = vItem.index}
				<li
					id={listboxId ? `${listboxId}-option-${i}` : undefined}
					onclick={() => selectItem(item)}
					onkeypress={() => selectItem(item)}
					role="option"
					aria-selected={item.value === value}
					data-index={i}
					style="position: absolute; top: {vItem.offsetTop}px; height: {vItem.height}px; width: 100%; box-sizing: border-box;"
				>
					<div class:selected={i == highlightIndex}>
						<FlexRow>
							<FlexItem grow>
								{#if searchText}
									{@html item.label.replace(
										new RegExp(searchText, 'gi'),
										(match: string) => `<strong>${match}</strong>`
									)}
								{:else}
									{item.label}
								{/if}
							</FlexItem>
							<FlexItem>
								{#if item.value === value}
									<span class="check" aria-hidden="true"><Icon type="check" size="sm" /></span>
								{/if}
							</FlexItem>
						</FlexRow>
					</div>
				</li>
			{/each}
		</div>
	{:else}
		<!-- Regular rendering mode -->
		{#each items as item, i}
			<li
				id={listboxId ? `${listboxId}-option-${i}` : undefined}
				onclick={() => selectItem(item)}
				onkeypress={() => selectItem(item)}
				role="option"
				aria-selected={item.value === value}
				data-index={i}
			>
				<div class:selected={i == highlightIndex}>
					<FlexRow>
						<FlexItem grow>
							{#if searchText}
								{@html item.label.replace(
									new RegExp(searchText, 'gi'),
									(match: string) => `<strong>${match}</strong>`
								)}
							{:else}
								{item.label}
							{/if}
						</FlexItem>
						<FlexItem>
							{#if item.value === value}
								<span class="check" aria-hidden="true"><Icon type="check" size="sm" /></span>
							{/if}
						</FlexItem>
					</FlexRow>
				</div>
			</li>
		{/each}
	{/if}
</ul>

<style lang="scss">
	.menu {
		position: relative;
		width: 8rem;
		list-style: none;
		z-index: 999;
		margin: 0;
		padding: 0;
		max-width: 100%;
		max-height: 15rem;
		overflow-y: auto;
		font-family: var(--base-font-family, sans-serif);
		border: 1px solid var(--form-input-border, black);
		background-color: var(--form-input-bg, white);
		color: var(--form-input-fg, black);

		&.closed {
			display: none;
		}

		&.xl {
			width: 25rem;
		}

		&.lg {
			width: 20rem;
		}

		&.md {
			width: 15rem;
		}

		&.sm {
			width: 10rem;
		}

		&.xs {
			width: 7rem;
		}

		&.full {
			width: 100%;
		}

		li {
			div {
				cursor: pointer;
				padding: 0.5rem 1rem;
			}

			&.instructions {
				padding: 0.5rem 1rem;
				font-style: italic;
				color: var(--form-input-placeholder, #aaa);
				cursor: pointer;
			}

			div:hover,
			div.selected {
				background: var(--form-input-selected-bg, #003c75);
				color: var(--form-input-selected-fg, white);
			}

			.check {
				display: inline-block;
				width: 1rem;
				height: 1rem;
			}
		}
	}
</style>
