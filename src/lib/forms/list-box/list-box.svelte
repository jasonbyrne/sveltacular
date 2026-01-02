<script lang="ts">
	import type { DropdownOption, FormFieldSizeOptions, MenuOption } from '$src/lib/types/form.js';
	import FormField from '$src/lib/forms//form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
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
		label = undefined
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
	} = $props();

	const id = uniqueId();
	const getText = () => items.find((item) => item.value == value)?.name || '';

	let text = $state(getText());
	let isMenuOpen = $state(false);
	let highlightIndex = $state(-1);
	let filteredItems = $state<MenuOption[]>([]);
	let isSeachable = $derived(searchable || !!search);

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

<FormField {size}>
	{#if label}
		<FormLabel {id} {required} {disabled} {label} />
	{/if}
	<div class="{open ? 'open' : 'closed'} {disabled ? 'disabled' : 'enabled'}">
		<input
			type="text"
			{id}
			bind:value={text}
			{required}
			{disabled}
			{placeholder}
			readonly={!isSeachable}
			onfocus={() => (isMenuOpen = true)}
			onkeyup={onInputKeyPress}
			data-value={value}
			data-text={text}
		/>
		<button type="button" class="icon" onclick={clickArrow} onkeydown={clickArrow} {disabled}>
			<AngleUpIcon />
		</button>
		{#if text && isSeachable}
			<button type="button" class="clear" onclick={clear} onkeydown={clear} {disabled}>
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
			padding: 0.5rem 1rem;
			border-radius: 0.25rem;
			border: 1px solid var(--form-input-border, black);
			background-color: var(--form-input-bg, white);
			color: var(--form-input-fg, black);
			font-size: 0.875rem;
			font-weight: 500;
			line-height: 1.25rem;
			transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
				color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
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
