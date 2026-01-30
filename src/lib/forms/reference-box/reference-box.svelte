<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import Chip from '$src/lib/generic/chip/chip.svelte';
	import Menu from '$src/lib/generic/menu/menu.svelte';
	import type { FormFieldSizeOptions, MenuOption } from '$src/lib/types/form.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import debounce from '$src/lib/helpers/debounce.js';
	import Prompt from '$src/lib/modals/prompt.svelte';
	import { ucfirst } from '$src/lib/helpers/ucfirst.js';
	import Icon from '$src/lib/icons/icon.svelte';
	import type { SearchFunction, CreateNewFunction } from '$src/lib/types/form.js';
	import type { ReferenceItem, LinkBuilderFunction } from './reference-box.js';

	const id = uniqueId();
	const listboxId = `${id}-listbox`;

	let {
		value = $bindable([] as ReferenceItem[]),
		items = [] as ReferenceItem[],
		search = undefined,
		createNew = undefined,
		linkBuilder = undefined as LinkBuilderFunction | undefined,
		resourceName = undefined as string | undefined,
		placeholder = 'Search and add items...',
		required = false,
		disabled = false,
		size = 'full' as FormFieldSizeOptions,
		label = undefined as string | undefined,
		helperText = undefined as string | undefined,
		feedback = undefined as FormFieldFeedback | undefined,
		maxItems = undefined as number | undefined,
		onChange = undefined as ((value: ReferenceItem[]) => void) | undefined
	}: {
		value?: ReferenceItem[];
		items?: ReferenceItem[];
		search?: SearchFunction<ReferenceItem> | undefined;
		createNew?: CreateNewFunction<ReferenceItem> | undefined;
		linkBuilder?: LinkBuilderFunction | undefined;
		resourceName?: string | undefined;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		size?: FormFieldSizeOptions;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback | undefined;
		maxItems?: number | undefined;
		onChange?: ((value: ReferenceItem[]) => void) | undefined;
	} = $props();

	let searchText = $state('');
	let isMenuOpen = $state(false);
	let highlightIndex = $state(-1);
	let inputElement: HTMLInputElement | null = $state(null);
	let containerElement: HTMLDivElement | null = $state(null);
	let invalidAttempt = $state(false);
	let localItems = $state<ReferenceItem[]>([]);
	let isLoading = $state(false);
	let showPrompt = $state(false);
	let isCreating = $state(false);
	let createError = $state<string | null>(null);
	let promptKey = $state(0);

	// Use local items when search function is provided, otherwise use static items
	let currentItems = $derived(search ? localItems : items);

	// Convert ReferenceItem[] to MenuOption[] for Menu component
	let menuOptions = $derived.by(() => {
		return currentItems
			.filter((item) => {
				// Don't show already selected items
				return !value.some((v) => v.id === item.id);
			})
			.map((item, index) => ({
				value: String(item.id),
				name: item.name,
				index
			}));
	});

	// Filter suggestions based on current input
	let filteredSuggestions = $derived.by(() => {
		if (!searchText.trim()) {
			return menuOptions;
		}

		const searchLower = searchText.trim().toLowerCase();
		return menuOptions.filter((option) => {
			const optionText = option.name.toLowerCase();
			return optionText.includes(searchLower);
		});
	});

	// Check if an item already exists (by id)
	function itemExists(item: ReferenceItem): boolean {
		return value.some((v) => v.id === item.id);
	}

	// Check if max items reached
	function isMaxItemsReached(): boolean {
		return maxItems !== undefined && value.length >= maxItems;
	}

	function addItem(itemToAdd: ReferenceItem) {
		// Check max items
		if (isMaxItemsReached()) {
			showInvalidFeedback();
			return;
		}

		// Check duplicate
		if (itemExists(itemToAdd)) {
			showInvalidFeedback();
			return;
		}

		// Add the item
		value = [...value, itemToAdd];
		searchText = '';
		invalidAttempt = false;
		isMenuOpen = false;
		highlightIndex = -1;
		onChange?.(value);

		// Focus back on input
		if (browser && inputElement) {
			inputElement.focus();
		}
	}

	function showInvalidFeedback() {
		invalidAttempt = true;
		setTimeout(() => {
			invalidAttempt = false;
		}, 500);
	}

	function removeItem(itemToRemove: ReferenceItem) {
		value = value.filter((item) => item.id !== itemToRemove.id);
		onChange?.(value);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		// Escape - close dropdown
		if (event.key === 'Escape') {
			event.preventDefault();
			closeDropdown();
			return;
		}

		// Enter - add item or select from dropdown
		if (event.key === 'Enter') {
			event.preventDefault();
			if (isMenuOpen && highlightIndex >= 0 && filteredSuggestions[highlightIndex]) {
				const selectedOption = filteredSuggestions[highlightIndex];
				const selectedItem = currentItems.find((item) => String(item.id) === selectedOption.value);
				if (selectedItem) {
					addItem(selectedItem);
				}
			} else if (isMenuOpen && createNew && highlightIndex === filteredSuggestions.length) {
				// "Create new..." is highlighted
				openCreatePrompt();
			} else if (isMenuOpen && filteredSuggestions.length > 0) {
				// Auto-select first item if available
				const firstItem = currentItems.find(
					(item) => String(item.id) === filteredSuggestions[0].value
				);
				if (firstItem) {
					addItem(firstItem);
				}
			}
			return;
		}

		// Tab - select highlighted suggestion or add current text
		if (event.key === 'Tab') {
			if (isMenuOpen && highlightIndex >= 0 && filteredSuggestions[highlightIndex]) {
				event.preventDefault();
				const selectedOption = filteredSuggestions[highlightIndex];
				const selectedItem = currentItems.find((item) => String(item.id) === selectedOption.value);
				if (selectedItem) {
					addItem(selectedItem);
				}
			} else if (isMenuOpen && createNew && highlightIndex === filteredSuggestions.length) {
				// "Create new..." is highlighted
				event.preventDefault();
				openCreatePrompt();
			} else if (isMenuOpen && filteredSuggestions.length > 0) {
				event.preventDefault();
				const firstItem = currentItems.find(
					(item) => String(item.id) === filteredSuggestions[0].value
				);
				if (firstItem) {
					addItem(firstItem);
				}
			}
			return;
		}

		// Arrow Down - navigate suggestions
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (!isMenuOpen && (filteredSuggestions.length > 0 || createNew)) {
				openDropdown();
			}
			// Allow highlighting "Create new..." option if it exists
			const maxIndex = createNew ? filteredSuggestions.length : filteredSuggestions.length - 1;
			if (maxIndex >= 0) {
				highlightIndex = Math.min(highlightIndex + 1, maxIndex);
			}
			return;
		}

		// Arrow Up - navigate suggestions
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (isMenuOpen) {
				// Allow highlighting "Create new..." option if it exists
				const maxIndex = createNew ? filteredSuggestions.length : filteredSuggestions.length - 1;
				if (maxIndex >= 0) {
					highlightIndex = Math.max(highlightIndex - 1, 0);
				}
			}
			return;
		}
	}

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const inputValue = input.value;
		searchText = inputValue;

		// Clear invalid feedback when user types
		invalidAttempt = false;

		// Open dropdown when typing if there are items or search function
		if (inputValue.trim() && (currentItems.length > 0 || search)) {
			openDropdown();
			// Auto-highlight first item
			highlightIndex = 0;
		} else {
			closeDropdown();
		}

		// Trigger search if search function is provided
		if (search && inputValue.trim()) {
			triggerSearch();
		}
	}

	function openDropdown() {
		if (!disabled && (filteredSuggestions.length > 0 || createNew)) {
			isMenuOpen = true;
		}
	}

	function closeDropdown() {
		isMenuOpen = false;
		highlightIndex = -1;
	}

	function onSelectFromMenu(item: MenuOption) {
		const selectedItem = currentItems.find((i) => String(i.id) === item.value);
		if (selectedItem) {
			addItem(selectedItem);
		}
	}

	// Get ARIA active descendant
	let activeDescendant = $derived(
		highlightIndex >= 0 && filteredSuggestions[highlightIndex]
			? `${listboxId}-option-${highlightIndex}`
			: highlightIndex === filteredSuggestions.length && createNew
				? `${listboxId}-option-create`
				: undefined
	);

	// Check if we should show "Create new..." option
	let showCreateNew = $derived(!!createNew && isMenuOpen);

	// Check if there are no results when searching
	let hasNoResults = $derived(
		searchText.trim() && filteredSuggestions.length === 0 && !isLoading && !createNew
	);

	// Debounced search function
	const triggerSearch = debounce(async () => {
		if (search && searchText.trim()) {
			isLoading = true;
			try {
				localItems = await search(searchText);
			} finally {
				isLoading = false;
			}
		}
	}, 300);

	// Handle creating new item
	const handleCreateNew = async (name: string) => {
		if (!createNew) return;

		isCreating = true;
		createError = null;

		try {
			const result = await createNew(name);

			if (result) {
				// Add to local items if using search (for display in dropdown)
				if (search) {
					localItems = [...localItems, result];
				}
				// Note: For static items, the parent should update the items prop
				// The newly created item will be added to value, which is what matters

				// Add the newly created item
				addItem(result);
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
		{#if isMenuOpen && isLoading}
			Searching...
		{:else if isMenuOpen && filteredSuggestions.length > 0}
			{filteredSuggestions.length}
			{filteredSuggestions.length === 1 ? 'result' : 'results'} available
		{:else if invalidAttempt}
			{#if isMaxItemsReached()}
				Maximum {maxItems} items reached
			{:else}
				Item already exists
			{/if}
		{/if}
	</div>

	<div class="reference-box" bind:this={containerElement}>
		<div class="input-container">
			<div
				class="input {disabled ? 'disabled' : 'enabled'} {invalidAttempt
					? 'invalid'
					: ''} {isMenuOpen ? 'open' : ''}"
			>
				<input
					{id}
					type="text"
					bind:value={searchText}
					bind:this={inputElement}
					{placeholder}
					onkeydown={handleKeydown}
					oninput={handleInput}
					{disabled}
					{required}
					role="combobox"
					aria-expanded={isMenuOpen}
					aria-controls={listboxId}
					aria-autocomplete="list"
					aria-activedescendant={activeDescendant}
					aria-haspopup="listbox"
					aria-label="Reference input"
					aria-busy={isLoading}
				/>
				{#if isLoading}
					<div class="loading-indicator" aria-hidden="true">
						<div class="spinner"></div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Autocomplete dropdown -->
		{#if isMenuOpen}
			<div class="dropdown">
				{#if hasNoResults}
					<div class="no-results" role="status">No results found</div>
				{:else}
					<Menu
						items={filteredSuggestions}
						open={isMenuOpen}
						closeAfterSelect={true}
						{searchText}
						onSelect={onSelectFromMenu}
						bind:highlightIndex
						{listboxId}
					/>
				{/if}
				{#if showCreateNew}
					<button
						type="button"
						class="create-new"
						class:selected={highlightIndex === filteredSuggestions.length}
						onclick={openCreatePrompt}
						role="option"
						id={listboxId ? `${listboxId}-option-create` : undefined}
						aria-selected={highlightIndex === filteredSuggestions.length}
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
		{/if}

		{#if value.length > 0}
			<div class="items">
				{#each value as item}
					{@const linkUrl = linkBuilder ? linkBuilder(item) : undefined}
					<span class="item">
						<Chip
							label={item.name}
							removable={!disabled}
							onRemove={() => removeItem(item)}
							link={linkUrl ? { url: linkUrl, target: '_blank' } : undefined}
							tooltip={item.description}
						>
							{item.description}
						</Chip>
					</span>
				{/each}
			</div>
		{/if}
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
	.reference-box {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		width: 100%;
		position: relative;

		.input-container {
			display: flex;
			gap: var(--spacing-sm);
			align-items: stretch;

			.input {
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
					stroke var(--transition-base) var(--ease-in-out),
					box-shadow var(--transition-base) var(--ease-in-out);
				user-select: none;
				white-space: nowrap;
				flex: 1;

				&.disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}

				&.open {
					border-color: var(--focus-ring, #007bff);
					box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
				}

				&.invalid {
					border-color: var(--danger, #dc3545);
					animation: shake 0.3s ease-in-out;
					box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
				}

				input {
					background-color: transparent;
					border: none;
					line-height: 2rem;
					height: 2rem;
					font-size: var(--font-md);
					width: 100%;
					flex-grow: 1;
					padding: 0 var(--spacing-base);
					margin: 0;

					&:focus {
						outline: none;
					}

					&:disabled {
						cursor: not-allowed;
					}

					&::placeholder {
						color: var(--form-input-placeholder);
					}
				}

				.loading-indicator {
					position: absolute;
					right: var(--spacing-base);
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
			}
		}

		.dropdown {
			position: absolute;
			top: calc(100% - var(--spacing-sm));
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
				border: var(--border-thin) solid var(--form-input-border);
				border-top: none;
				border-radius: 0 0 var(--radius-md) var(--radius-md);

				&:hover,
				&.selected {
					background: var(--form-input-selected-bg, #003c75);
					color: var(--form-input-selected-fg, white);
				}

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
				border-radius: var(--radius-md);

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

	// Shake animation for invalid attempts
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translateX(-4px);
		}
		20%,
		40%,
		60%,
		80% {
			transform: translateX(4px);
		}
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

	.item {
		display: inline-block;
		vertical-align: middle;
		line-height: 1;
		margin-right: var(--spacing-xs);
		margin-bottom: var(--spacing-xs);
		padding: 0;
		border: none;
		background: none;
		font: inherit;
		color: inherit;
		text-align: left;
	}
</style>
