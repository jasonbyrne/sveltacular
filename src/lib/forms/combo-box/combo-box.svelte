<script lang="ts">
	/**
	 * Combobox Component
	 * 
	 * A searchable select component with typeahead, multi-select support, and virtual scrolling.
	 * Follows the ARIA 1.2 Combobox pattern for full accessibility.
	 * 
	 * @component
	 * @example
	 * ```svelte
	 * <ComboBox
	 *   bind:value
	 *   items={[
	 *     { value: '1', name: 'Option 1' },
	 *     { value: '2', name: 'Option 2' }
	 *   ]}
	 *   label="Select an option"
	 *   searchable
	 * />
	 * ```
	 */
	import type { DropdownOption, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import Menu from '$src/lib/generic/menu/menu.svelte';
	import AngleUpIcon from '$src/lib/icons/angle-up-icon.svelte';
	import Chip from '$src/lib/generic/chip/chip.svelte';
	import debounce from '$src/lib/helpers/debounce.js';
	import { browser } from '$app/environment';
	import { announce } from '$src/lib/helpers/announcer.js';

	let {
		value = $bindable(null as string | string[] | null),
		items = [] as DropdownOption[],
		size = 'full' as FormFieldSizeOptions,
		disabled = false,
		required = false,
		searchable = true,
		multiSelect = false,
		placeholder = '',
		label = undefined,
		helpText = undefined,
		errorText = undefined,
		successText = undefined,
		maxSelections = undefined as number | undefined,
		virtualScroll = false,
		itemHeight = 40,
		closeOnSelect = true,
		onChange = undefined as ((value: string | string[] | null) => void) | undefined,
		onSearch = undefined as ((query: string) => Promise<DropdownOption[]> | DropdownOption[]) | undefined
	}: {
		/** Current selected value(s) - string for single-select, string[] for multi-select */
		value?: string | string[] | null;
		/** Available options to select from */
		items?: DropdownOption[];
		/** Size of the form field */
		size?: FormFieldSizeOptions;
		/** Whether the combobox is disabled */
		disabled?: boolean;
		/** Whether selection is required */
		required?: boolean;
		/** Whether to enable search/typeahead functionality */
		searchable?: boolean;
		/** Enable multi-select mode with chips */
		multiSelect?: boolean;
		/** Placeholder text for the input */
		placeholder?: string;
		/** Label text for the combobox */
		label?: string;
		/** Help text displayed below the input */
		helpText?: string;
		/** Error message to display */
		errorText?: string;
		/** Success message to display */
		successText?: string;
		/** Maximum number of selections allowed (multi-select only) */
		maxSelections?: number;
		/** Enable virtual scrolling for large lists */
		virtualScroll?: boolean;
		/** Height of each item in pixels (for virtual scrolling) */
		itemHeight?: number;
		/** Close dropdown after selection (ignored in multi-select) */
		closeOnSelect?: boolean;
		/** Callback when value changes */
		onChange?: (value: string | string[] | null) => void;
		/** Async search function for dynamic options */
		onSearch?: (query: string) => Promise<DropdownOption[]> | DropdownOption[];
	} = $props();

	const id = uniqueId();
	const listboxId = `${id}-listbox`;

	let searchQuery = $state('');
	let isMenuOpen = $state(false);
	let highlightIndex = $state(-1);
	let filteredItems = $state<DropdownOption[]>([]);
	let isSearching = $state(false);

	// Normalize value to always be an array internally for multi-select
	let selectedValues = $derived(
		multiSelect 
			? (Array.isArray(value) ? value : (value ? [value] : []))
			: []
	);

	// Get selected items for chip display
	let selectedItems = $derived(
		multiSelect
			? items.filter((item) => selectedValues.includes(item.value as string))
			: []
	);

	// Display text for single-select mode
	let displayText = $derived(
		!multiSelect && value
			? items.find((item) => item.value === value)?.name || ''
			: ''
	);

	// Update search query when value changes in single-select mode
	$effect(() => {
		if (!multiSelect && !isMenuOpen) {
			// When menu is closed, show the display text
			searchQuery = displayText;
		}
	});

	// Show placeholder when appropriate
	let showPlaceholder = $derived(
		!searchQuery && 
		(!multiSelect ? !displayText : selectedValues.length === 0)
	);

	// Get the ID of the highlighted option for ARIA
	let activeDescendant = $derived(
		highlightIndex >= 0 && filteredItems[highlightIndex]
			? `${listboxId}-option-${highlightIndex}`
			: undefined
	);

	// Check if max selections reached
	let maxSelectionsReached = $derived(
		multiSelect && maxSelections !== undefined && selectedValues.length >= maxSelections
	);

	/**
	 * Handle item selection
	 */
	const onSelect = (item: DropdownOption) => {
		if (disabled) return;

		if (multiSelect) {
			const itemValue = item.value as string;
			let newValues: string[];

			if (selectedValues.includes(itemValue)) {
				// Deselect
				newValues = selectedValues.filter((v) => v !== itemValue);
			} else {
				// Select (check max selections)
				if (maxSelectionsReached) {
					announce(`Maximum ${maxSelections} selections allowed`, 'polite');
					return;
				}
				newValues = [...selectedValues, itemValue];
			}

			value = newValues;
			onChange?.(newValues);
			announce(`${item.name} ${selectedValues.includes(itemValue) ? 'selected' : 'deselected'}`, 'polite');
		} else {
			// Single select
			value = item.value;
			onChange?.(item.value);
			searchQuery = '';
			applyFilter();
			
			if (closeOnSelect) {
				isMenuOpen = false;
			}
			
			announce(`${item.name} selected`, 'polite');
		}
	};

	/**
	 * Remove a chip in multi-select mode
	 */
	const removeChip = (itemValue: string) => {
		if (disabled || !multiSelect) return;

		const newValues = selectedValues.filter((v) => v !== itemValue);
		value = newValues;
		onChange?.(newValues);

		const item = items.find((i) => i.value === itemValue);
		if (item) {
			announce(`${item.name} removed`, 'polite');
		}

		focusOnInput();
	};

	/**
	 * Focus on the input element
	 */
	const focusOnInput = () => {
		if (browser) {
			const input = document.getElementById(id) as HTMLInputElement;
			input?.focus();
		}
	};

	/**
	 * Toggle dropdown open/closed
	 */
	const toggle = () => {
		if (disabled) return;
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) {
			focusOnInput();
			highlightIndex = 0;
		}
	};

	/**
	 * Clear all selections
	 */
	const clear = () => {
		if (disabled) return;

		if (multiSelect) {
			value = [];
			onChange?.([]);
			announce('All selections cleared', 'polite');
		} else {
			value = null;
			onChange?.(null);
			searchQuery = '';
			announce('Selection cleared', 'polite');
		}

		applyFilter();
		focusOnInput();
	};

	/**
	 * Handle keyboard navigation
	 */
	const onInputKeyPress = (e: KeyboardEvent) => {
		if (disabled) return;

		switch (e.key) {
			case 'Escape':
				isMenuOpen = false;
				searchQuery = '';
				applyFilter();
				break;

			case 'Enter':
				e.preventDefault();
				if (isMenuOpen && highlightIndex >= 0 && highlightIndex < filteredItems.length) {
					onSelect(filteredItems[highlightIndex]);
				} else {
					isMenuOpen = !isMenuOpen;
				}
				break;

			case 'Tab':
				if (isMenuOpen && highlightIndex >= 0 && highlightIndex < filteredItems.length) {
					onSelect(filteredItems[highlightIndex]);
				}
				isMenuOpen = false;
				break;

			case 'ArrowDown':
				e.preventDefault();
				if (!isMenuOpen) {
					isMenuOpen = true;
					highlightIndex = 0;
				} else {
					highlightIndex = Math.min(highlightIndex + 1, filteredItems.length - 1);
				}
				break;

			case 'ArrowUp':
				e.preventDefault();
				if (isMenuOpen) {
					if (highlightIndex <= 0) {
						isMenuOpen = false;
						highlightIndex = -1;
					} else {
						highlightIndex = Math.max(highlightIndex - 1, 0);
					}
				}
				break;

			case 'Home':
				if (isMenuOpen) {
					e.preventDefault();
					highlightIndex = 0;
				}
				break;

			case 'End':
				if (isMenuOpen) {
					e.preventDefault();
					highlightIndex = filteredItems.length - 1;
				}
				break;

			case 'Backspace':
				if (multiSelect && searchQuery === '' && selectedValues.length > 0) {
					// Remove last chip on backspace when input is empty
					removeChip(selectedValues[selectedValues.length - 1]);
				}
				break;

			default:
				// Any other key opens the menu and triggers search
				if (e.key.length === 1) {
					isMenuOpen = true;
					if (highlightIndex === -1) {
						highlightIndex = 0;
					}
					triggerSearch();
				}
				break;
		}
	};

	/**
	 * Trigger search with debounce
	 */
	const triggerSearch = debounce(async () => {
		if (onSearch && searchable) {
			isSearching = true;
			try {
				const results = await onSearch(searchQuery);
				items = results;
			} catch (error) {
				console.error('Search error:', error);
			} finally {
				isSearching = false;
			}
		}
		applyFilter();
	}, 300);

	/**
	 * Filter items based on search query
	 */
	const applyFilter = () => {
		const query = searchQuery.trim().toLowerCase();

		if (query && searchable) {
			filteredItems = items.filter((item) =>
				item.name.toLowerCase().includes(query)
			);
		} else {
			filteredItems = [...items];
		}

		// Reset highlight if out of bounds
		if (highlightIndex >= filteredItems.length) {
			highlightIndex = Math.max(0, filteredItems.length - 1);
		}
	};

	// Initial filter
	$effect(() => {
		applyFilter();
	});

	// Derived state for open/closed
	let open = $derived(isMenuOpen && !disabled && filteredItems.length > 0);

	// Clear search query when menu closes in single-select mode
	$effect(() => {
		if (!isMenuOpen && !multiSelect) {
			searchQuery = '';
		}
	});
</script>

<FormField {size}>
	{#if label}
		<FormLabel {id} {required} {disabled} {label} />
	{/if}

	<div class="combobox-wrapper {open ? 'open' : 'closed'} {disabled ? 'disabled' : 'enabled'}">
		<!-- Multi-select chip display -->
		{#if multiSelect && selectedItems.length > 0}
			<div class="chips" role="list" aria-label="Selected items">
				{#each selectedItems as item (item.value)}
					<div role="listitem">
						<Chip
							label={item.name}
							removable={!disabled}
							size="sm"
							onRemove={() => removeChip(item.value as string)}
						/>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Input wrapper -->
		<div class="input-wrapper">
			<input
				type="text"
				{id}
				bind:value={searchQuery}
				{required}
				{disabled}
				placeholder={showPlaceholder ? placeholder : ''}
				readonly={!searchable}
				role="combobox"
				aria-expanded={open}
				aria-controls={listboxId}
				aria-autocomplete={searchable ? 'list' : 'none'}
				aria-activedescendant={activeDescendant}
				aria-haspopup="listbox"
				aria-label={label}
				aria-describedby={helpText || errorText || successText ? `${id}-description` : undefined}
				aria-invalid={errorText ? 'true' : undefined}
				onfocus={() => {
					if (!disabled) {
						isMenuOpen = true;
					}
				}}
				onkeydown={onInputKeyPress}
				oninput={() => {
					if (searchable) {
						triggerSearch();
					}
				}}
			/>

			<!-- Clear button -->
			{#if (multiSelect ? selectedValues.length > 0 : value) && !disabled}
				<button
					type="button"
					class="clear-button"
					onclick={clear}
					aria-label="Clear all selections"
					tabindex="-1"
				>
					×
				</button>
			{/if}

			<!-- Dropdown toggle button -->
			<button
				type="button"
				class="toggle-button"
				onclick={toggle}
				{disabled}
				aria-label={open ? 'Close options' : 'Open options'}
				tabindex="-1"
			>
				<AngleUpIcon />
			</button>

			<!-- Loading indicator -->
			{#if isSearching}
				<div class="loading-indicator" aria-label="Searching...">
					<span class="spinner"></span>
				</div>
			{/if}
		</div>

		<!-- Dropdown menu -->
		<div class="dropdown">
			<Menu
				items={filteredItems.map((item, index) => ({ ...item, index }))}
				{open}
				closeAfterSelect={false}
				searchText={searchQuery}
				onSelect={onSelect}
				size="full"
				bind:highlightIndex
				value={multiSelect ? undefined : value}
				{listboxId}
				{virtualScroll}
				{itemHeight}
			/>
		</div>
	</div>

	<!-- Help/Error/Success text -->
	{#if helpText || errorText || successText}
		<div id="{id}-description" class="description">
			{#if errorText}
				<span class="error-text" role="alert">{errorText}</span>
			{:else if successText}
				<span class="success-text" role="status">{successText}</span>
			{:else if helpText}
				<span class="help-text">{helpText}</span>
			{/if}
		</div>
	{/if}

	<!-- Max selections indicator -->
	{#if multiSelect && maxSelections !== undefined}
		<div class="max-selections-indicator">
			{selectedValues.length} / {maxSelections} selected
		</div>
	{/if}
</FormField>

<style lang="scss">
	.combobox-wrapper {
		position: relative;

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		padding: 0.5rem;
		background-color: var(--form-input-bg);
		border: var(--border-thin) solid var(--form-input-border);
		border-radius: var(--radius-md);
		min-height: 2.5rem;
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	input {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-base);
		padding-right: 5rem; /* Space for buttons */
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
			color var(--transition-base) var(--ease-in-out);

		&:focus {
			outline: none;
			border-color: var(--primary);
		}

		&[aria-invalid='true'] {
			border-color: var(--danger);
		}
	}

	button {
		border: 0;
		appearance: none;
		background: transparent;
		padding: 0;
		margin: 0;
		position: absolute;
		width: 1rem;
		height: 1rem;
		color: var(--form-input-fg);
		cursor: pointer;
		z-index: 2;

		&:hover {
			opacity: 0.7;
		}

		&:focus-visible {
			outline: 2px solid var(--focus-ring-color);
			outline-offset: 2px;
			border-radius: var(--radius-sm);
		}
	}

	.clear-button {
		right: 3rem;
		font-size: 1.5rem;
		line-height: 1;
		top: 50%;
		transform: translateY(-50%);
	}

	.toggle-button {
		right: 1rem;
		top: 50%;
		transform: translateY(-50%) rotate(180deg);
		transition: transform 0.3s var(--ease-in-out);

		.open & {
			transform: translateY(-50%) rotate(0deg);
		}
	}

	.loading-indicator {
		position: absolute;
		right: 5rem;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;

		.spinner {
			display: inline-block;
			width: 1rem;
			height: 1rem;
			border: 2px solid var(--gray-300);
			border-top-color: var(--primary);
			border-radius: 50%;
			animation: spin 0.6s linear infinite;
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		z-index: 1000;
		margin-top: 0.25rem;
	}

	.description {
		margin-top: 0.5rem;
		font-size: var(--font-sm);
		line-height: 1.4;

		.help-text {
			color: var(--gray-600);
		}

		.error-text {
			color: var(--danger);
			font-weight: 500;
		}

		.success-text {
			color: var(--success);
			font-weight: 500;
		}
	}

	.max-selections-indicator {
		margin-top: 0.5rem;
		font-size: var(--font-sm);
		color: var(--gray-600);
		text-align: right;
	}
</style>

