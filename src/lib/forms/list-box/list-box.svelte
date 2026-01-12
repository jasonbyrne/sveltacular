<script lang="ts">
	import type { DropdownOption, FormFieldSizeOptions, MenuOption } from '$src/lib/types/form.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import Menu from '$src/lib/generic/menu/menu.svelte';
	import Icon from '$src/lib/icons/icon.svelte';
	import debounce from '$src/lib/helpers/debounce.js';
	import { browser } from '$app/environment';
	import { onMount, untrack } from 'svelte';
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
		helperText = undefined,
		feedback = undefined,
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
		helperText?: string;
		feedback?: FormFieldFeedback;
		virtualScroll?: boolean;
		itemHeight?: number;
	} = $props();

	const id = uniqueId();
	const listboxId = `${id}-listbox`;

	// Use local items state when search function is provided, otherwise use prop
	let localItems = $state<DropdownOption[]>([]);
	let currentItems = $derived(search ? localItems : items);

	const getText = () => currentItems.find((item) => item.value == value)?.name || '';

	let text = $state('');
	let isMenuOpen = $state(false);
	let highlightIndex = $state(-1);
	let isSearchable = $derived(searchable || !!search);
	let inputElement: HTMLInputElement | null = $state(null);
	let containerElement: HTMLDivElement | null = $state(null);
	let isUserTyping = $state(false);
	let isLoading = $state(false);

	// Initialize localItems when items prop changes (only when no search function)
	$effect(() => {
		if (!search) {
			localItems = [...items];
		}
	});

	// Initialize text from value on mount and when value/items change (but not when user is typing)
	$effect(() => {
		// Track value and currentItems to update text when they change
		const currentValue = value;
		const itemsForText = currentItems;
		const userIsTyping = isUserTyping;

		// Don't change text if user is currently typing in searchable mode
		if (isSearchable && userIsTyping) {
			return;
		}

		const newText = itemsForText.find((item) => item.value == currentValue)?.name || '';
		// Use untrack to read current text without making effect reactive to text changes
		const currentText = untrack(() => text);
		if (currentText !== newText) {
			text = newText;
		}
	});

	// Compute filtered items reactively
	let filteredItems = $derived.by(() => {
		const searchText = text.trim().toLowerCase();
		return searchText && isSearchable
			? currentItems
					.map((item, index) => ({ ...item, index }))
					.filter((item) => item.name.toLowerCase().includes(searchText))
			: currentItems.map((item, index) => ({ ...item, index }));
	});

	// Check if there are no results when searching
	let hasNoResults = $derived(isSearchable && text.trim() && filteredItems.length === 0 && !isLoading);

	// Get the ID of the highlighted option for ARIA
	let activeDescendant = $derived(
		highlightIndex >= 0 && filteredItems[highlightIndex]
			? `${listboxId}-option-${highlightIndex}`
			: undefined
	);

	// Reset highlight when filter changes
	$effect(() => {
		if (highlightIndex >= filteredItems.length) {
			highlightIndex = -1;
		}
	});

	// When an item is selected from the dropdown menu
	const onSelect = (item: MenuOption) => {
		isUserTyping = false;
		value = item.value;
		onChange?.(value);
		text = getText();
		isMenuOpen = false;
		highlightIndex = -1;
		if (browser && inputElement) {
			inputElement.blur();
		}
	};

	// Open/close dropdown
	const openDropdown = () => {
		if (!disabled) {
			isMenuOpen = true;
			if (browser && inputElement) {
				inputElement.focus();
			}
		}
	};

	const closeDropdown = () => {
		isMenuOpen = false;
		highlightIndex = -1;
		isUserTyping = false;
		// Reset text to selected value when closing dropdown
		text = getText();
	};

	const toggleDropdown = () => {
		if (isMenuOpen) {
			closeDropdown();
		} else {
			openDropdown();
		}
	};

	// Click arrow button
	const clickArrow = (e: MouseEvent | KeyboardEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (disabled) return;
		toggleDropdown();
	};

	// Handle clicks on the input (for non-searchable mode)
	const handleInputClick = (e: MouseEvent) => {
		if (disabled) return;
		// For non-searchable mode, clicking the input should open the dropdown
		if (!isSearchable && !isMenuOpen) {
			e.preventDefault();
			openDropdown();
		}
	};

	// Handle key presses in the input
	const onInputKeyDown = (e: KeyboardEvent) => {
		if (disabled) return;

		if (e.key === 'Escape') {
			e.preventDefault();
			closeDropdown();
			if (browser && inputElement) {
				inputElement.blur();
			}
			return;
		}

		if (e.key === 'Enter') {
			e.preventDefault();
			if (isMenuOpen && highlightIndex >= 0 && filteredItems[highlightIndex]) {
				onSelect(filteredItems[highlightIndex]);
			} else if (isMenuOpen && isSearchable && filteredItems.length > 0) {
				// In searchable mode with matches but no highlight, select first item
				onSelect(filteredItems[0]);
			} else if (!isMenuOpen) {
				openDropdown();
			}
			return;
		}

		if (e.key === 'Tab') {
			if (isMenuOpen && highlightIndex >= 0 && filteredItems[highlightIndex]) {
				e.preventDefault();
				onSelect(filteredItems[highlightIndex]);
			} else if (isMenuOpen && isSearchable && filteredItems.length > 0) {
				// In searchable mode with matches but no highlight, select first item
				e.preventDefault();
				onSelect(filteredItems[0]);
			}
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (!isMenuOpen) {
				openDropdown();
			}
			if (filteredItems.length > 0) {
				highlightIndex = Math.min(highlightIndex + 1, filteredItems.length - 1);
			}
			return;
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (isMenuOpen && filteredItems.length > 0) {
				highlightIndex = Math.max(highlightIndex - 1, 0);
			}
			return;
		}

		// For searchable mode, allow typing
		if (isSearchable && (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete')) {
			isUserTyping = true;
			if (!isMenuOpen) {
				openDropdown();
			}
			// Auto-highlight first item when typing for easier selection
			highlightIndex = 0;
			// Let the input handle the character, then trigger search
			if (browser) {
				setTimeout(() => triggerSearch(), 0);
			}
		}
	};

	// User is typing in the search box
	const triggerSearch = debounce(async () => {
		if (search && isSearchable) {
			isLoading = true;
			try {
				localItems = await search(text);
			} finally {
				isLoading = false;
			}
		}
	}, 300);

	const clear = (e: MouseEvent | KeyboardEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (disabled) return;
		isUserTyping = false;
		text = '';
		value = null;
		onChange?.(null);
		if (browser && inputElement) {
			inputElement.focus();
		}
	};

	// Close dropdown when clicking outside
	onMount(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerElement && !containerElement.contains(e.target as Node)) {
				closeDropdown();
			}
		};

		if (browser) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	});

	let open = $derived(isMenuOpen && !disabled);
</script>

<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
	<!-- ARIA live region for screen reader announcements -->
	<div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
		{#if isSearchable && text && isLoading}
			Searching...
		{:else if isSearchable && text}
			{filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'} found
		{/if}
	</div>
	<div
		class="listbox-container {open ? 'open' : 'closed'} {disabled ? 'disabled' : 'enabled'}"
		bind:this={containerElement}
	>
		<input
			type="text"
			{id}
			bind:value={text}
			bind:this={inputElement}
			{required}
			{disabled}
			{placeholder}
			readonly={!isSearchable}
			role="combobox"
			aria-expanded={open}
			aria-controls={listboxId}
			aria-autocomplete={isSearchable ? 'list' : 'none'}
			aria-activedescendant={activeDescendant}
			aria-haspopup="listbox"
			aria-busy={isLoading}
			onkeydown={onInputKeyDown}
			onclick={handleInputClick}
			oninput={() => {
				if (isSearchable) {
					isUserTyping = true;
					triggerSearch();
				}
			}}
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
			<Icon type="angle-up" size="sm" />
		</button>
		{#if isLoading}
			<div class="loading-indicator" aria-hidden="true">
				<div class="spinner"></div>
			</div>
		{/if}
		{#if value && isSearchable && !isLoading}
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
			{#if hasNoResults && open}
				<div class="no-results" role="status">No results found</div>
			{:else}
				<Menu
					items={filteredItems}
					{open}
					closeAfterSelect={true}
					searchText={isSearchable ? text : ''}
					{onSelect}
					size="full"
					bind:highlightIndex
					bind:value
					{listboxId}
					{virtualScroll}
					{itemHeight}
				/>
			{/if}
		</div>
	</div>
</FormField>

<style lang="scss">
	.listbox-container {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: var(--radius-md);
		border: var(--border-thin) solid var(--form-input-border);
		background-color: var(--form-input-bg);
		color: var(--form-input-fg);
		font-size: var(--font-md);
		font-weight: 500;
		line-height: 2rem;
		transition:
			background-color var(--transition-base) var(--ease-in-out),
			border-color var(--transition-base) var(--ease-in-out),
			color var(--transition-base) var(--ease-in-out),
			fill var(--transition-base) var(--ease-in-out),
			stroke var(--transition-base) var(--ease-in-out);

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
		}

		input {
			background-color: transparent;
			border: none;
			line-height: 2rem;
			font-size: var(--font-md);
			width: 100%;
			flex-grow: 1;
			padding-left: var(--spacing-base);
			padding-right: var(--spacing-base);
			color: var(--form-input-fg);
			user-select: none;
			white-space: nowrap;
			cursor: pointer;

			&:focus {
				outline: none;
			}

			&:focus-visible {
				outline: 2px solid var(--focus-ring, #007bff);
				outline-offset: 2px;
			}

			&[readonly] {
				cursor: pointer;
			}
		}

		button {
			border: 0;
			appearance: none;
			background: transparent;
			padding: 0;
			margin: 0;
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 2;
			color: var(--form-input-fg, black);
			cursor: pointer;

			&:focus {
				outline: none;
			}

			&:focus-visible {
				outline: 2px solid var(--focus-ring, #007bff);
				outline-offset: 2px;
			}

			&.icon {
				right: var(--spacing-base);
				width: 1rem;
				height: 1rem;
				transition: transform 0.3s linear;
				transform: rotate(180deg);

				:global(svg) {
					width: 100%;
					height: 100%;
				}
			}

		&.clear {
			right: calc(var(--spacing-base) + 2rem);
			width: 1.25rem;
			height: 1.25rem;
			font-size: var(--font-sm);
			font-weight: 600;
		}
	}

	&.open .icon {
		transform: rotate(0deg);
	}

	.loading-indicator {
		position: absolute;
		right: calc(var(--spacing-base) + 2rem);
		width: 1.25rem;
		height: 1.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;

		.spinner {
			width: 1rem;
			height: 1rem;
			border: 2px solid var(--form-input-border);
			border-top-color: var(--form-input-fg);
			border-radius: 50%;
			animation: spin 0.8s linear infinite;
		}
	}

	.dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		z-index: 1000;
		margin-top: 0.25rem;

		.no-results {
			padding: 1rem;
			text-align: center;
			color: var(--text-muted, #6c757d);
			font-size: var(--font-sm, 0.875rem);
			background-color: var(--form-input-bg);
			border: var(--border-thin) solid var(--form-input-border);
			border-radius: var(--radius-md);
		}

		:global(.menu) {
			font-size: var(--font-sm, 0.875rem);

			:global(li) {
				:global(div) {
					padding: 0.25rem 0.5rem;
					line-height: 1.25;
					font-size: var(--font-sm, 0.875rem);
				}
			}
		}
	}
}

// Screen reader only content
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
}

// Animation for loading spinner
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
