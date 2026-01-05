<script lang="ts">
	import type { DropdownOption, FormFieldSizeOptions, MenuOption } from '$src/lib/types/form.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import Menu from '$src/lib/generic/menu/menu.svelte';
	import AngleUpIcon from '$src/lib/icons/angle-up-icon.svelte';
	import debounce from '$src/lib/helpers/debounce.js';
	import { browser } from '$app/environment';
	import type { SearchFunction } from './list-box.js';

	let {
		value = $bindable(null as string | null),
		items = [] as DropdownOption[],
		size = 'full' as FormFieldSizeOptions,
		disabled = false,
		required = false,
		searchable = false,
		search = undefined as SearchFunction | undefined,
		placeholder = '',
		onChange = undefined,
		label = undefined,
		virtualScroll = false,
		itemHeight = 40
	}: {
		value?: string | null;
		items?: DropdownOption[];
		size?: FormFieldSizeOptions;
		disabled?: boolean;
		required?: boolean;
		searchable?: boolean;
		search?: SearchFunction | undefined;
		placeholder?: string;
		onChange?: ((value: string | null) => void) | undefined;
		label?: string;
		virtualScroll?: boolean;
		itemHeight?: number;
	} = $props();

	const id = uniqueId();
	const listboxId = `${id}-listbox`;
	const getText = () => items.find((item) => item.value == value)?.name || '';

	let text = $state(getText());
	let isMenuOpen = $state(false);
	let highlightIndex = $state(-1);
	let filteredItems = $state<MenuOption[]>([]);
	let isSeachable = $derived(searchable || !!search);
	
	// Get the ID of the highlighted option for ARIA
	let activeDescendant = $derived(
		highlightIndex >= 0 && filteredItems[highlightIndex]
			? `${listboxId}-option-${highlightIndex}`
			: undefined
	);

	// When an item is selected from the dropdown menu
	const onSelect = (item: MenuOption) => {
		value = item.value;
		onChange?.(value);
		text = getText();
		applyFilter();
		isMenuOpen = false;
	};

	const focusOnInput = () => {
		if (browser) document.getElementById(id)?.focus();
	};

	// Toggle open or closed
	const toggle = () => (isMenuOpen = !open);

	// Click arrow
	const clickArrow = () => {
		if (disabled) return;
		toggle();
		if (isMenuOpen) focusOnInput();
	};

	// Handle key presses in the input
	const onInputKeyPress = (e: KeyboardEvent) => {
		if (disabled) return;
		if (e.key == 'Escape') {
			isMenuOpen = false;
			return;
		}
		if (e.key == 'Enter' || e.key == 'Tab') {
			isMenuOpen = false;
			if (highlightIndex > -1) {
				onSelect(filteredItems[highlightIndex]);
			}
			return;
		}
		if (e.key == 'ArrowDown') {
			highlightIndex = Math.min(highlightIndex + 1, filteredItems.length - 1);
			isMenuOpen = true;
			return;
		}
		if (e.key == 'ArrowUp') {
			highlightIndex = Math.max(highlightIndex - 1, -1);
			if (highlightIndex == -1) isMenuOpen = false;
			return;
		}
		if (e.key.length == 1 || e.key == 'Backspace' || e.key == 'Delete') {
			isMenuOpen = true;
			highlightIndex = 0;
			triggerSearch();
		}
	};

	// User is typing in the search box
	const triggerSearch = debounce(async () => {
		if (search && isSeachable) {
			items = await search(text);
		}
		updateText();
		applyFilter();
	}, 300);

	// Text or items have changed, we should apply the filter
	const applyFilter = () => {
		const searchText = text.trim().toLowerCase();
		filteredItems =
			searchText && isSeachable
				? items
						.map((item, index) => ({ ...item, index }))
						.filter((item) => item.name.toLowerCase().includes(searchText))
				: items.map((item, index) => ({ ...item, index }));
	};

	const clear = () => {
		if (disabled) return;
		text = '';
		value = '';
		triggerSearch();
		focusOnInput();
	};

	// When items change, we should change the text to match the value
	const updateText = async () => {
		if (browser) {
			const textBox = document.getElementById(id) as HTMLInputElement;
			// Don't change text if they're currently typing
			if (document.activeElement != textBox) text = getText();
		}
	};

	// Do initial search
	triggerSearch();

	let open = $derived(isMenuOpen && !disabled);
</script>

<FormField {size} {label} {id} {required} {disabled}>
	<div class="{open ? 'open' : 'closed'} {disabled ? 'disabled' : 'enabled'}">
		<input
			type="text"
			{id}
			bind:value={text}
			{required}
			{disabled}
			{placeholder}
			readonly={!isSeachable}
			role="combobox"
			aria-expanded={open}
			aria-controls={listboxId}
			aria-autocomplete={isSeachable ? 'list' : 'none'}
			aria-activedescendant={activeDescendant}
			aria-haspopup="listbox"
			onfocus={() => (isMenuOpen = true)}
			onkeyup={onInputKeyPress}
			data-value={value}
			data-text={text}
		/>
		<button
			type="button"
			class="icon"
			onclick={clickArrow}
			onkeydown={clickArrow}
			{disabled}
			aria-label={open ? 'Close options' : 'Open options'}
			tabindex="-1"
		>
			<AngleUpIcon />
		</button>
		{#if text && isSeachable}
			<button
				type="button"
				class="clear"
				onclick={clear}
				onkeydown={clear}
				{disabled}
				aria-label="Clear selection"
				tabindex="-1"
			>
				X
			</button>
		{/if}
		<div class="dropdown">
			<Menu
				items={filteredItems}
				{open}
				closeAfterSelect={false}
				searchText={text}
				onSelect={onSelect}
				size="full"
				bind:highlightIndex
				bind:value
				{listboxId}
				{virtualScroll}
				{itemHeight}
			/>
		</div>
	</div>
</FormField>

<style lang="scss">
	div {
		position: relative;

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
		}

		input {
			width: 100%;
			padding: var(--spacing-sm) var(--spacing-base);
			border-radius: var(--radius-md);
			border: var(--border-thin) solid var(--form-input-border);
			background-color: var(--form-input-bg);
			color: var(--form-input-fg);
			font-size: var(--font-base);
			font-weight: 500;
			line-height: 1.25rem;
			transition:
				background-color var(--transition-base) var(--ease-in-out),
				border-color var(--transition-base) var(--ease-in-out),
				color var(--transition-base) var(--ease-in-out),
				fill var(--transition-base) var(--ease-in-out),
				stroke var(--transition-base) var(--ease-in-out);
			user-select: none;
			white-space: nowrap;
		}

		button {
			border: 0;
			appearance: none;
			background: transparent;
			padding: 0;
			margin: 0;
			position: absolute;
			top: 0.65rem;
			width: 1rem;
			height: 1rem;
			z-index: 2;
			color: var(--form-input-fg, black);

			&.icon {
				right: 1rem;
				transition: transform 0.3s linear;
				transform: rotate(180deg);
			}

			&.clear {
				right: 3rem;
			}
		}

		&.open .icon {
			transform: rotate(0deg);
		}

		.dropdown {
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			z-index: 3;
		}
	}
</style>
