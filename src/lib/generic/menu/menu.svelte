<script lang="ts">
	import CheckIcon from '$src/lib/icons/check-icon.svelte';
	import type { FormFieldSizeOptions, MenuOption } from '$src/lib/index.js';
	import FlexItem from '$src/lib/layout/flex-item.svelte';
	import FlexRow from '$src/lib/layout/flex-row.svelte';
	import { createEventDispatcher } from 'svelte';

	export let items: MenuOption[] = [];
	export let value: string = '';
	export let instructions: string = '';
	export let open = false;
	export let size: FormFieldSizeOptions = 'md';
	export let closeAfterSelect = true;
	export let searchText = '';
	export let highlightIndex = 0;

	const dispatch = createEventDispatcher<{ select: MenuOption }>();

	const selectItem = (item: MenuOption) => {
		value = item.value;
		dispatch('select', item);
		if (closeAfterSelect) open = false;
	};

	const scrollToItem = (index: number) => {
		const el = document.querySelector(`[data-index="${index}"]`);
		if (el) el.scrollIntoView({ block: 'nearest' });
	};

	$: highlightIndex >= 0 && scrollToItem(highlightIndex);
</script>

<ul role="listbox" class="menu {open ? 'open' : 'closed'} {size}">
	{#if instructions}
		<li class="instructions">{instructions}</li>
	{/if}
	{#each items as item, i}
		<li
			on:click={() => selectItem(item)}
			on:keypress={() => selectItem(item)}
			role="option"
			aria-selected={item.value === value}
			data-index={i}
		>
			<div class:selected={i == highlightIndex}>
				<FlexRow>
					<FlexItem grow>
						{#if searchText}
							{@html item.name.replace(
								new RegExp(searchText, 'gi'),
								(match) => `<strong>${match}</strong>`
							)}
						{:else}
							{item.name}
						{/if}
					</FlexItem>
					<FlexItem>
						{#if item.value === value}
							<span class="check"><CheckIcon /></span>
						{/if}
					</FlexItem>
				</FlexRow>
			</div>
		</li>
	{/each}
</ul>

<style lang="scss">
	.menu {
		position: relative;
		width: 8rem;
		background: white;
		color: #000;
		border: 1px solid black;
		list-style: none;
		z-index: 999;
		margin: 0;
		padding: 0;
		max-width: 100%;
		max-height: 15rem;
		overflow-y: auto;
		font-family: var(--base-font-family, sans-serif);

		&.closed {
			display: none;
		}

		&.xl {
			width: 20rem;
		}

		&.lg {
			width: 16rem;
		}

		&.md {
			width: 12rem;
		}

		&.sm {
			width: 8rem;
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
				color: #b7b7b7;
				cursor: pointer;
			}

			div:hover,
			div.selected {
				background: #4e4eff;
				color: #fff;
			}

			.check {
				display: inline-block;
				width: 1rem;
				height: 1rem;
			}
		}
	}
</style>
