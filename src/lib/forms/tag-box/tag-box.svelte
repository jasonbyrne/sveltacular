<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import Chip from '$src/lib/generic/chip/chip.svelte';
	import Menu from '$src/lib/generic/menu/menu.svelte';
	import type { FormFieldSizeOptions, MenuOption } from '$src/lib/types/form.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const id = uniqueId();
	const listboxId = `${id}-listbox`;

	let {
		value = $bindable([] as string[]),
		placeholder = 'Add a tag...',
		required = false,
		disabled = false,
		autocomplete = [] as string[],
		separators = [',', ';'] as string[],
		size = 'full' as FormFieldSizeOptions,
		label = undefined as string | undefined,
		helperText = undefined as string | undefined,
		feedback = undefined as FormFieldFeedback | undefined,
		showAddButton = false,
		strict = false,
		caseInsensitive = true,
		maxTags = undefined as number | undefined,
		onChange = undefined as ((value: string[]) => void) | undefined,
		deleteOnBackspace = false
	}: {
		value?: string[];
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		autocomplete?: string[];
		separators?: string[];
		size?: FormFieldSizeOptions;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		showAddButton?: boolean;
		strict?: boolean;
		caseInsensitive?: boolean;
		maxTags?: number | undefined;
		onChange?: ((value: string[]) => void) | undefined;
		deleteOnBackspace?: boolean;
	} = $props();

	let newTag = $state('');
	let isMenuOpen = $state(false);
	let highlightIndex = $state(-1);
	let inputElement: HTMLInputElement | null = $state(null);
	let containerElement: HTMLDivElement | null = $state(null);
	let invalidTagAttempt = $state(false);

	// Filter out empty tags from value (in case they come from props)
	$effect(() => {
		const filtered = value.filter((tag) => tag.trim() !== '');
		if (filtered.length !== value.length) {
			value = filtered;
		}
	});

	// Convert autocomplete strings to menu options
	let menuOptions = $derived(
		autocomplete.map((tag) => ({
			value: tag,
			name: tag
		}))
	);

	// Filter suggestions based on current input and already selected tags
	let filteredSuggestions = $derived.by(() => {
		if (!autocomplete.length || !newTag.trim()) {
			return [];
		}

		const searchText = newTag.trim();
		const searchLower = caseInsensitive ? searchText.toLowerCase() : searchText;
		const valueLower = caseInsensitive ? value.map((v) => v.toLowerCase()) : value;

		return menuOptions
			.filter((option) => {
				const optionText = caseInsensitive ? option.name.toLowerCase() : option.name;
				// Don't show already selected tags
				if (valueLower.includes(optionText)) {
					return false;
				}
				// Filter by search text
				return optionText.includes(searchLower);
			})
			.map((option, index) => ({ ...option, index }));
	});

	// Check if a tag already exists (with case sensitivity option)
	function tagExists(tag: string): boolean {
		if (caseInsensitive) {
			const tagLower = tag.toLowerCase();
			return value.some((v) => v.toLowerCase() === tagLower);
		}
		return value.includes(tag);
	}

	// Check if a tag is valid (for strict mode)
	function isValidTag(tag: string): boolean {
		if (!strict) return true;
		if (!autocomplete.length) return true;

		if (caseInsensitive) {
			const tagLower = tag.toLowerCase();
			return autocomplete.some((ac) => ac.toLowerCase() === tagLower);
		}
		return autocomplete.includes(tag);
	}

	// Check if max tags reached
	function isMaxTagsReached(): boolean {
		return maxTags !== undefined && value.length >= maxTags;
	}

	function addTag(tagToAdd?: string) {
		const tag = (tagToAdd || newTag).trim();

		// Prevent empty tags
		if (!tag) {
			newTag = '';
			return;
		}

		// Check max tags
		if (isMaxTagsReached()) {
			showInvalidFeedback();
			return;
		}

		// Check duplicate
		if (tagExists(tag)) {
			showInvalidFeedback();
			newTag = '';
			return;
		}

		// Check if valid in strict mode
		if (!isValidTag(tag)) {
			showInvalidFeedback();
			return;
		}

		// Add the tag
		value = [...value, tag];
		newTag = '';
		invalidTagAttempt = false;
		isMenuOpen = false;
		highlightIndex = -1;
		onChange?.(value);

		// Focus back on input
		if (browser && inputElement) {
			inputElement.focus();
		}
	}

	function showInvalidFeedback() {
		invalidTagAttempt = true;
		setTimeout(() => {
			invalidTagAttempt = false;
		}, 500);
	}

	function removeTag(tagToRemove: string) {
		value = value.filter((tag) => tag !== tagToRemove);
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

		// Enter - add tag or select from dropdown
		if (event.key === 'Enter') {
			event.preventDefault();
			if (isMenuOpen && highlightIndex >= 0 && filteredSuggestions[highlightIndex]) {
				addTag(filteredSuggestions[highlightIndex].name);
			} else if (isMenuOpen && filteredSuggestions.length === 1) {
				// Auto-select if only one suggestion
				addTag(filteredSuggestions[0].name);
			} else {
				addTag();
			}
			return;
		}

		// Tab - select highlighted suggestion or add current text
		if (event.key === 'Tab') {
			if (isMenuOpen && highlightIndex >= 0 && filteredSuggestions[highlightIndex]) {
				event.preventDefault();
				addTag(filteredSuggestions[highlightIndex].name);
			} else if (isMenuOpen && filteredSuggestions.length === 1) {
				event.preventDefault();
				addTag(filteredSuggestions[0].name);
			}
			return;
		}

		// Backspace - remove last tag if input is empty
		if (event.key === 'Backspace' && newTag === '' && value.length > 0) {
			if (deleteOnBackspace) {
				removeTag(value[value.length - 1]);
			}
			return;
		}

		// Arrow Down - navigate suggestions
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (!isMenuOpen && filteredSuggestions.length > 0) {
				openDropdown();
			}
			if (filteredSuggestions.length > 0) {
				highlightIndex = Math.min(highlightIndex + 1, filteredSuggestions.length - 1);
			}
			return;
		}

		// Arrow Up - navigate suggestions
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (isMenuOpen && filteredSuggestions.length > 0) {
				highlightIndex = Math.max(highlightIndex - 1, 0);
			}
			return;
		}
	}

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const inputValue = input.value;

		// Clear invalid feedback when user types
		invalidTagAttempt = false;

		// Open dropdown when typing if there are suggestions
		if (inputValue.trim() && autocomplete.length > 0) {
			openDropdown();
			// Auto-highlight first item
			highlightIndex = 0;
		} else {
			closeDropdown();
		}

		// Check if the last character is a separator
		if (inputValue.length > 0) {
			const lastChar = inputValue[inputValue.length - 1];
			if (separators.includes(lastChar)) {
				// Extract the tag before the separator
				const tagBeforeSeparator = inputValue.slice(0, -1).trim();
				if (tagBeforeSeparator) {
					// Prevent the separator from being added
					newTag = tagBeforeSeparator;
					// Add the tag
					addTag(tagBeforeSeparator);
				} else {
					// If there's no text before the separator, just clear it
					newTag = '';
				}
			}
		}
	}

	function openDropdown() {
		if (!disabled && filteredSuggestions.length > 0) {
			isMenuOpen = true;
		}
	}

	function closeDropdown() {
		isMenuOpen = false;
		highlightIndex = -1;
	}

	function onSelectFromMenu(item: MenuOption) {
		addTag(item.name);
	}

	// Get ARIA active descendant
	let activeDescendant = $derived(
		highlightIndex >= 0 && filteredSuggestions[highlightIndex]
			? `${listboxId}-option-${highlightIndex}`
			: undefined
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
</script>

<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
	<!-- ARIA live region for screen reader announcements -->
	<div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
		{#if isMenuOpen && filteredSuggestions.length > 0}
			{filteredSuggestions.length}
			{filteredSuggestions.length === 1 ? 'suggestion' : 'suggestions'} available
		{:else if invalidTagAttempt}
			{#if isMaxTagsReached()}
				Maximum {maxTags} tags reached
			{:else if strict}
				Tag must be from the suggestions list
			{:else}
				Tag already exists
			{/if}
		{/if}
	</div>

	<div class="tag-box" bind:this={containerElement}>
		<div class="input-container">
			<div
				class="input {disabled ? 'disabled' : 'enabled'} {invalidTagAttempt
					? 'invalid'
					: ''} {isMenuOpen ? 'open' : ''}"
			>
				<input
					{id}
					type="text"
					bind:value={newTag}
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
					aria-label="Tag input"
				/>
			</div>
			{#if showAddButton}
				<button
					type="button"
					class="add-button"
					onclick={() => addTag()}
					disabled={disabled || !newTag.trim() || isMaxTagsReached()}
					aria-label="Add tag"
				>
					Add
				</button>
			{/if}
		</div>

		<!-- Autocomplete dropdown -->
		{#if autocomplete.length > 0}
			<div class="dropdown">
				<Menu
					items={filteredSuggestions}
					open={isMenuOpen}
					closeAfterSelect={true}
					searchText={newTag}
					onSelect={onSelectFromMenu}
					size="full"
					bind:highlightIndex
					{listboxId}
				/>
			</div>
		{/if}

		{#if value.length > 0}
			<div class="tags">
				{#each value as tag}
					<Chip label={tag} removable={!disabled} onRemove={() => removeTag(tag)} />
				{/each}
			</div>
		{/if}
	</div>
</FormField>

<style lang="scss">
	.tag-box {
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
			}

			.add-button {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 var(--spacing-base);
				background-color: var(--button-primary-bg);
				color: var(--button-primary-fg);
				border: var(--border-thin) solid var(--button-primary-border);
				border-radius: var(--radius-md);
				font-size: var(--font-sm);
				font-weight: 500;
				cursor: pointer;
				transition:
					background-color var(--transition-base) var(--ease-in-out),
					border-color var(--transition-base) var(--ease-in-out),
					color var(--transition-base) var(--ease-in-out);
				white-space: nowrap;
				height: 100%;
				line-height: 2rem;

				&:hover:not(:disabled) {
					background-color: var(--button-primary-hover-bg);
					color: var(--button-primary-hover-fg);
				}

				&:disabled {
					background-color: var(--gray-400);
					border-color: var(--gray-400);
					color: var(--gray-600);
					cursor: not-allowed;
					opacity: 0.6;
				}

				&:active:not(:disabled) {
					transform: scale(0.98);
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

		.tags {
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
</style>
