<script lang="ts">
	import type { DropdownOption, FormFieldSizeOptions, MenuOption } from '$lib/types/form.js';
	import FormField, { type FormFieldFeedback } from '$lib/forms/form-field/form-field.svelte';
	import { uniqueId } from '$lib/helpers/unique-id.js';
	import Menu from '$lib/generic/menu/menu.svelte';
	import Icon from '$lib/icons/icon.svelte';
	import debounce from '$lib/helpers/debounce.js';
	import { browser } from '$app/environment';
	import { onMount, untrack } from 'svelte';
	import Prompt from '$lib/modals/prompt.svelte';
	import { ucfirst } from '$lib/helpers/ucfirst.js';
	import type { CreateNewFunction, SearchFunction } from '$lib/types/form.js';

	let {
		value = $bindable(null as string | null),
		items = [] as DropdownOption[],
		size = 'full' as FormFieldSizeOptions,
		disabled = false,
		required = false,
		readonly = false,
		searchable = false,
		search = undefined,
		placeholder = '',
		onChange = undefined,
		onFocus = undefined,
		onBlur = undefined,
		label = undefined,
		helperText = undefined,
		feedback = undefined,
		virtualScroll = false,
		itemHeight = 40,
		createNew = undefined,
		resourceName = undefined
	}: {
		value?: string | null;
		items?: DropdownOption[];
		size?: FormFieldSizeOptions;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		searchable?: boolean;
		search?: SearchFunction<DropdownOption> | undefined;
		placeholder?: string;
		onChange?: ((value: string | null) => void) | undefined;
		onFocus?: ((e: FocusEvent) => void) | undefined;
		onBlur?: ((e: FocusEvent) => void) | undefined;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		virtualScroll?: boolean;
		itemHeight?: number;
		createNew?: CreateNewFunction<DropdownOption> | undefined;
		resourceName?: string;
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
	let showPrompt = $state(false);
	let isCreating = $state(false);
	let createError = $state<string | null>(null);
	let promptKey = $state(0);

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
	let hasNoResults = $derived(
		isSearchable && text.trim() && filteredItems.length === 0 && !isLoading
	);

	// Get the ID of the highlighted option for ARIA
	let activeDescendant = $derived(
		highlightIndex >= 0 && filteredItems[highlightIndex]
			? `${listboxId}-option-${highlightIndex}`
			: undefined
	);

	// Reset highlight when filter changes
	$effect(() => {
		// Account for "Create new..." option if it exists
		const maxIndex = filteredItems.length - 1;
		if (highlightIndex > maxIndex) {
			highlightIndex = maxIndex;
		}
	});

	let open = $derived(isMenuOpen && !disabled && !readonly);

	// Check if we should show "Create new..." option
	let showCreateNew = $derived(!!createNew && open);

	// When an item is selected from the dropdown menu
	const onSelect = (item: MenuOption) => {
		isUserTyping = false;
		value = item.value != null ? String(item.value) : null;
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
		if (!disabled && !readonly) {
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

	const handleFocus = (e: FocusEvent) => {
		onFocus?.(e);
	};

	const handleBlur = (e: FocusEvent) => {
		onBlur?.(e);
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
		if (disabled || readonly) return;
		// For non-searchable mode, clicking the input should open the dropdown
		if (!isSearchable && !isMenuOpen) {
			e.preventDefault();
			openDropdown();
		}
	};

	// Handle key presses in the input
	const onInputKeyDown = (e: KeyboardEvent) => {
		if (disabled || readonly) return;

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
			if (
				isMenuOpen &&
				highlightIndex >= 0 &&
				highlightIndex < filteredItems.length &&
				filteredItems[highlightIndex]
			) {
				onSelect(filteredItems[highlightIndex]);
			} else if (isMenuOpen && createNew && highlightIndex === filteredItems.length) {
				// "Create new..." is highlighted
				openCreatePrompt();
			} else if (isMenuOpen && isSearchable && filteredItems.length > 0) {
				// In searchable mode with matches but no highlight, select first item
				onSelect(filteredItems[0]);
			} else if (!isMenuOpen) {
				openDropdown();
			}
			return;
		}

		if (e.key === 'Tab') {
			if (
				isMenuOpen &&
				highlightIndex >= 0 &&
				highlightIndex < filteredItems.length &&
				filteredItems[highlightIndex]
			) {
				e.preventDefault();
				onSelect(filteredItems[highlightIndex]);
			} else if (isMenuOpen && createNew && highlightIndex === filteredItems.length) {
				// "Create new..." is highlighted
				e.preventDefault();
				openCreatePrompt();
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
			// Allow highlighting "Create new..." option if it exists
			const maxIndex = createNew ? filteredItems.length : filteredItems.length - 1;
			if (maxIndex >= 0) {
				highlightIndex = Math.min(highlightIndex + 1, maxIndex);
			}
			return;
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (isMenuOpen) {
				// Allow highlighting "Create new..." option if it exists
				const maxIndex = createNew ? filteredItems.length : filteredItems.length - 1;
				if (maxIndex >= 0) {
					highlightIndex = Math.max(highlightIndex - 1, 0);
				}
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
		if (disabled || readonly) return;
		isUserTyping = false;
		text = '';
		value = null;
		onChange?.(null);
		if (browser && inputElement) {
			inputElement.focus();
		}
	};

	const handleCreateNew = async (name: string) => {
		if (!createNew) return;

		isCreating = true;
		createError = null;

		try {
			const result = await createNew(name);

			if (result) {
				items = [...items, result];
				localItems = [...localItems, result];

				// Select the newly created item
				value = result.value != null ? String(result.value) : null;
				onChange?.(value);
				text = result.name;
				isMenuOpen = false;
				showPrompt = false;
			} else {
				// Handle error - show message to user
				createError = 'Failed to create new item';
				// Keep prompt open so user can try again
			}
		} catch (error) {
			createError = error instanceof Error ? error.message : 'An error occurred';
			// Keep prompt open so user can try again
		} finally {
			isCreating = false;
		}
	};

	const openCreatePrompt = () => {
		createError = null;
		// Increment key to force Prompt to remount and reset its value
		promptKey++;
		showPrompt = true;
		// Close dropdown when opening prompt
		isMenuOpen = false;
	};

	// Reset error when prompt closes
	$effect(() => {
		if (!showPrompt) {
			createError = null;
		}
	});

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
			readonly={readonly || !isSearchable}
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
			onfocus={handleFocus}
			onblur={handleBlur}
			data-value={value}
			data-text={text}
		/>
		<button
			type="button"
			class="icon"
			onclick={clickArrow}
			onkeydown={clickArrow}
			disabled={disabled || readonly}
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
				disabled={disabled || readonly}
				aria-label="Clear selection"
				tabindex="-1"
			>
				X
			</button>
		{/if}
		<div class="dropdown">
			{#if hasNoResults && open}
				<div class="no-results" role="status">No results found</div>
			{/if}
			{#if !hasNoResults || !open}
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
			{#if showCreateNew}
				<button
					type="button"
					class="create-new"
					class:selected={highlightIndex === filteredItems.length}
					onclick={openCreatePrompt}
					role="option"
					id={listboxId ? `${listboxId}-option-create` : undefined}
					aria-selected={highlightIndex === filteredItems.length}
				>
					<Icon type="plus" size="sm" />
					<span>
						{#if resourceName}
							Create new {resourceName}...
						{:else}
							Create new...
						{/if}
					</span>
				</button>
			{/if}
		</div>
	</div>
</FormField>

{#key promptKey}
	<Prompt
		bind:open={showPrompt}
		title={resourceName ? `Create New ${ucfirst(resourceName)}` : 'Create New'}
		placeholder="Enter name"
		required={true}
		okText={resourceName ? `Create ${ucfirst(resourceName)}` : 'Create'}
		cancelText="Cancel"
		onOk={handleCreateNew}
		onCancel={() => {
			createError = null;
		}}
	>
		{#if createError}
			<div class="create-error" role="alert">
				{createError}
			</div>
		{/if}
		{#if isCreating}
			<div class="creating-indicator" aria-live="polite">Creating...</div>
		{/if}
	</Prompt>
{/key}

<style lang="scss">
	.listbox-container {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		min-height: 2.125rem;
		border-radius: var(--radius-md);
		border: var(--border-thin) solid var(--form-input-border);
		background-color: var(--form-input-bg);
		color: var(--form-input-fg);
		font-size: var(--font-md);
		font-weight: 500;
		line-height: 2rem;
		padding: 0;
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

			.create-new {
				width: 100%;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.5rem 1rem;
				border: none;
				background-color: var(--form-input-bg);
				color: var(--form-input-fg);
				font-size: var(--font-sm, 0.875rem);
				cursor: pointer;
				border-top: var(--border-thin) solid var(--form-input-border);
				transition:
					background-color var(--transition-base) var(--ease-in-out),
					color var(--transition-base) var(--ease-in-out);

				&:hover,
				&.selected {
					background: var(--form-input-selected-bg, #003c75);
					color: var(--form-input-selected-fg, white);
				}
				border: var(--border-thin) solid var(--form-input-border);
				border-top: none;

				&:focus {
					outline: none;
				}

				&:focus-visible {
					outline: 2px solid var(--focus-ring, #007bff);
					outline-offset: -2px;
				}

				span {
					flex: 1;
				}
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

	.create-error {
		color: var(--color-danger, #dc3545);
		font-size: var(--font-sm, 0.875rem);
		margin-top: 0.5rem;
		padding: 0.5rem;
		background-color: var(--color-danger-bg, #f8d7da);
		border-radius: var(--radius-sm, 0.25rem);
	}

	.creating-indicator {
		color: var(--text-muted, #6c757d);
		font-size: var(--font-sm, 0.875rem);
		margin-top: 0.5rem;
		font-style: italic;
	}
</style>
