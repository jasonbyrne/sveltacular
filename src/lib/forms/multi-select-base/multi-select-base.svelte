<script lang="ts" module>
	import type { ReferenceItem } from '$src/lib/types/form.js';

	// Generic adapter interface for value operations
	export interface MultiSelectAdapter<T> {
		// Convert value item to display label
		getLabel: (item: T) => string;
		// Convert value item to unique key
		getKey: (item: T) => string;
		// Check if two items are equal
		equals: (a: T, b: T) => boolean;
		// Convert menu option to value item
		fromMenuOption: (option: ReferenceItem) => T;
		// Get chip link (optional)
		getLink?: (item: T) => string | undefined;
		// Get chip tooltip (optional)
		getTooltip?: (item: T) => string | undefined;
	}
</script>

<script lang="ts" generics="T">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import Chip from '$src/lib/generic/chip/chip.svelte';
	import Menu from '$src/lib/generic/menu/menu.svelte';
	import type { ComponentSize } from '$src/lib/types/form.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';

	const id = uniqueId();
	const listboxId = `${id}-listbox`;

	let {
		value = $bindable([] as T[]),
		adapter,
		placeholder = 'Search and add items...',
		required = false,
		disabled = false,
		menuOptions = [] as ReferenceItem[],
		size = 'md' as ComponentSize,
		label = undefined as string | undefined,
		helperText = undefined as string | undefined,
		feedback = undefined as FormFieldFeedback | undefined,
		maxItems = undefined as number | undefined,
		onChange = undefined as ((value: T[]) => void) | undefined,
		// Dropdown behavior
		filterSuggestions = true,
		caseInsensitive = true,
		// Loading state
		isLoading = false,
		// Input handling
		onInputChange = undefined as ((text: string) => void) | undefined,
		separators = [] as string[],
		// Keyboard behavior
		deleteOnBackspace = false,
		// Additional UI
		showNoResults = false,
		additionalDropdownContent = undefined as Snippet | undefined,
		inputSuffix = undefined as Snippet | undefined,
		// Validation feedback
		invalidFeedbackMessage = undefined as string | undefined,
		ariaLabel = 'Multi-select input'
	}: {
		value?: T[];
		adapter: MultiSelectAdapter<T>;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		menuOptions?: ReferenceItem[];
		size?: ComponentSize;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback | undefined;
		maxItems?: number | undefined;
		onChange?: ((value: T[]) => void) | undefined;
		filterSuggestions?: boolean;
		caseInsensitive?: boolean;
		isLoading?: boolean;
		onInputChange?: ((text: string) => void) | undefined;
		separators?: string[];
		deleteOnBackspace?: boolean;
		showNoResults?: boolean;
		additionalDropdownContent?: Snippet | undefined;
		inputSuffix?: Snippet | undefined;
		invalidFeedbackMessage?: string | undefined;
		ariaLabel?: string;
	} = $props();

	let inputText = $state('');
	let isMenuOpen = $state(false);
	let highlightIndex = $state(-1);
	let inputElement: HTMLInputElement | null = $state(null);
	let containerElement: HTMLDivElement | null = $state(null);
	let invalidAttempt = $state(false);

	// Filter out items that are already selected
	let availableOptions = $derived.by(() => {
		return menuOptions.filter((option) => {
			return !value.some((v) => adapter.equals(v, adapter.fromMenuOption(option)));
		});
	});

	// Filter suggestions based on current input
	let filteredOptions = $derived.by(() => {
		if (!filterSuggestions || !inputText.trim()) {
			return availableOptions;
		}

		const searchText = inputText.trim();
		const searchLower = caseInsensitive ? searchText.toLowerCase() : searchText;

		return availableOptions.filter((option) => {
			const optionText = caseInsensitive ? option.label.toLowerCase() : option.label;
			return optionText.includes(searchLower);
		});
	});

	// Check if max items reached
	function isMaxItemsReached(): boolean {
		return maxItems !== undefined && value.length >= maxItems;
	}

	function addItem(itemToAdd: T) {
		// Check max items
		if (isMaxItemsReached()) {
			showInvalidFeedback();
			return;
		}

		// Check duplicate
		if (value.some((v) => adapter.equals(v, itemToAdd))) {
			showInvalidFeedback();
			return;
		}

		// Add the item
		value = [...value, itemToAdd];
		inputText = '';
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

	function removeItem(itemToRemove: T) {
		value = value.filter((item) => !adapter.equals(item, itemToRemove));
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

		// Enter - select from dropdown
		if (event.key === 'Enter') {
			event.preventDefault();
			if (isMenuOpen && highlightIndex >= 0 && filteredOptions[highlightIndex]) {
				const selectedOption = filteredOptions[highlightIndex];
				addItem(adapter.fromMenuOption(selectedOption));
			} else if (isMenuOpen && filteredOptions.length === 1) {
				// Auto-select if only one suggestion
				addItem(adapter.fromMenuOption(filteredOptions[0]));
			}
			return;
		}

		// Tab - select highlighted suggestion
		if (event.key === 'Tab') {
			if (isMenuOpen && highlightIndex >= 0 && filteredOptions[highlightIndex]) {
				event.preventDefault();
				const selectedOption = filteredOptions[highlightIndex];
				addItem(adapter.fromMenuOption(selectedOption));
			} else if (isMenuOpen && filteredOptions.length === 1) {
				event.preventDefault();
				addItem(adapter.fromMenuOption(filteredOptions[0]));
			}
			return;
		}

		// Backspace - remove last item if input is empty
		if (event.key === 'Backspace' && inputText === '' && value.length > 0 && deleteOnBackspace) {
			removeItem(value[value.length - 1]);
			return;
		}

		// Arrow Down - navigate suggestions
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (!isMenuOpen && filteredOptions.length > 0) {
				openDropdown();
			}
			if (filteredOptions.length > 0) {
				highlightIndex = Math.min(highlightIndex + 1, filteredOptions.length - 1);
			}
			return;
		}

		// Arrow Up - navigate suggestions
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (isMenuOpen && filteredOptions.length > 0) {
				highlightIndex = Math.max(highlightIndex - 1, 0);
			}
			return;
		}
	}

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const inputValue = input.value;

		// Clear invalid feedback when user types
		invalidAttempt = false;

		// Check if the last character is a separator
		if (separators.length > 0 && inputValue.length > 0) {
			const lastChar = inputValue[inputValue.length - 1];
			if (separators.includes(lastChar)) {
				// Extract text before the separator
				const textBeforeSeparator = inputValue.slice(0, -1).trim();
				if (textBeforeSeparator) {
					inputText = textBeforeSeparator;
					// Notify parent (e.g., TagBox will try to add the tag)
					onInputChange?.(inputText);
					inputText = ''; // Clear after handling
				} else {
					inputText = '';
				}
				return;
			}
		}

		// Open dropdown when typing if there are suggestions
		if (inputValue.trim() && filteredOptions.length > 0) {
			openDropdown();
			// Auto-highlight first item
			highlightIndex = 0;
		} else if (!inputValue.trim()) {
			closeDropdown();
		}

		// Notify parent of input change
		onInputChange?.(inputValue);
	}

	function openDropdown() {
		if (!disabled && filteredOptions.length > 0) {
			isMenuOpen = true;
		}
	}

	function closeDropdown() {
		isMenuOpen = false;
		highlightIndex = -1;
	}

	function onSelectFromMenu(item: ReferenceItem) {
		addItem(adapter.fromMenuOption(item));
	}

	// Get ARIA active descendant
	let activeDescendant = $derived(
		highlightIndex >= 0 && filteredOptions[highlightIndex]
			? `${listboxId}-option-${highlightIndex}`
			: undefined
	);

	// Has no results
	let hasNoResults = $derived(
		showNoResults && inputText.trim() && filteredOptions.length === 0 && !isLoading
	);

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

	// Export function for parent components to manually trigger addition
	export function addFromInput(textToAdd?: string) {
		const text = textToAdd || inputText;
		if (!text.trim()) return false;

		// Find matching option
		const matchingOption = availableOptions.find((opt) => {
			if (caseInsensitive) {
				return opt.label.toLowerCase() === text.trim().toLowerCase();
			}
			return opt.label === text.trim();
		});

		if (matchingOption) {
			addItem(adapter.fromMenuOption(matchingOption));
			return true;
		}

		return false;
	}

	// Export function to clear input
	export function clearInput() {
		inputText = '';
	}

	// Export function to get current input text
	export function getInputText(): string {
		return inputText;
	}

	// Export function to set input text
	export function setInputText(text: string) {
		inputText = text;
	}
</script>

<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
	<!-- ARIA live region for screen reader announcements -->
	<div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
		{#if isMenuOpen && isLoading}
			Loading...
		{:else if isMenuOpen && filteredOptions.length > 0}
			{filteredOptions.length}
			{filteredOptions.length === 1 ? 'suggestion' : 'suggestions'} available
		{:else if invalidAttempt}
			{#if invalidFeedbackMessage}
				{invalidFeedbackMessage}
			{:else if isMaxItemsReached()}
				Maximum {maxItems} items reached
			{:else}
				Item already exists
			{/if}
		{/if}
	</div>

	<div class="multi-select-base" bind:this={containerElement}>
		<div class="input-container">
			<div
				class="input {disabled ? 'disabled' : 'enabled'} {invalidAttempt
					? 'invalid'
					: ''} {isMenuOpen ? 'open' : ''}"
			>
				<input
					{id}
					type="text"
					bind:value={inputText}
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
					aria-label={ariaLabel}
					aria-busy={isLoading}
				/>
				{#if isLoading}
					<div class="loading-indicator" aria-hidden="true">
						<div class="spinner"></div>
					</div>
				{/if}
				{#if inputSuffix}
					{@render inputSuffix()}
				{/if}
			</div>
		</div>

		<!-- Autocomplete dropdown -->
		{#if isMenuOpen || hasNoResults}
			<div class="dropdown">
				{#if hasNoResults}
					<div class="no-results" role="status">No results found</div>
				{:else if filteredOptions.length > 0}
					<Menu
						items={filteredOptions}
						open={isMenuOpen}
						closeAfterSelect={true}
						searchText={inputText}
						onSelect={onSelectFromMenu}
						bind:highlightIndex
						{listboxId}
					/>
				{/if}
				{#if additionalDropdownContent}
					{@render additionalDropdownContent()}
				{/if}
			</div>
		{/if}

		{#if value.length > 0}
			<div class="items">
				{#each value as item (adapter.getKey(item))}
					<Chip
						label={adapter.getLabel(item)}
						removable={!disabled}
						onRemove={() => removeItem(item)}
						link={adapter.getLink
							? adapter.getLink(item)
								? { url: adapter.getLink(item)!, target: '_blank' }
								: undefined
							: undefined}
						tooltip={adapter.getTooltip ? adapter.getTooltip(item) : undefined}
					/>
				{/each}
			</div>
		{/if}
	</div>
</FormField>

<style lang="scss">
	.multi-select-base {
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

		.items {
			display: flex;
			flex-wrap: wrap;
			gap: var(--spacing-sm);
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
</style>
