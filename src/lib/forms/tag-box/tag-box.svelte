<script lang="ts">
	import MultiSelectBase, {
		type MultiSelectAdapter
	} from '../multi-select-base/multi-select-base.svelte';
	import type { FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import type { ComponentSize, ReferenceItem } from '$src/lib/types/form.js';

	let {
		value = $bindable([] as string[]),
		placeholder = 'Add a tag...',
		required = false,
		disabled = false,
		autocomplete = [] as string[],
		separators = [',', ';'] as string[],
		size = 'md' as ComponentSize,
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
		size?: ComponentSize;
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

	let baseComponent: MultiSelectBase<string> | null = $state(null);
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
			label: tag
		}))
	);

	// Adapter to convert between strings and ReferenceItem
	const stringAdapter: MultiSelectAdapter<string> = {
		getLabel: (item: string) => item,
		getKey: (item: string) => item,
		equals: (a: string, b: string) => {
			if (caseInsensitive) {
				return a.toLowerCase() === b.toLowerCase();
			}
			return a === b;
		},
		fromMenuOption: (option: ReferenceItem) => option.label
	};

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

	function handleInputChange(text: string) {
		// Clear invalid feedback when typing
		invalidTagAttempt = false;
	}

	function handleSeparatorInput() {
		if (!baseComponent) return;

		const inputText = baseComponent.getInputText();
		const tag = inputText.trim();

		if (!tag) return;

		// Check if valid in strict mode
		if (!isValidTag(tag)) {
			showInvalidFeedback();
			return;
		}

		// Try to add from available options
		const success = baseComponent.addFromInput(tag);
		if (success) {
			baseComponent.clearInput();
		} else {
			// If not in autocomplete but strict mode is off, add manually
			if (!strict) {
				value = [...value, tag];
				baseComponent.clearInput();
				onChange?.(value);
			} else {
				showInvalidFeedback();
			}
		}
	}

	function showInvalidFeedback() {
		invalidTagAttempt = true;
		setTimeout(() => {
			invalidTagAttempt = false;
		}, 500);
	}

	// Custom onChange handler that wraps the base component's onChange
	function handleChange(newValue: string[]) {
		onChange?.(newValue);
	}

	// Generate invalid feedback message
	let invalidFeedbackMessage = $derived.by(() => {
		if (!invalidTagAttempt) return undefined;

		if (maxTags !== undefined && value.length >= maxTags) {
			return `Maximum ${maxTags} tags reached`;
		} else if (strict) {
			return 'Tag must be from the suggestions list';
		} else {
			return 'Tag already exists';
		}
	});

	// Handle input changes with separator detection
	function onInputChangeWithSeparators(text: string) {
		handleInputChange(text);

		// Check if we should handle separator (happens in the base component's handleInput)
		if (separators.length > 0 && text.endsWith(separators[0])) {
			handleSeparatorInput();
		}
	}

	// Add button handler
	function handleAddButtonClick() {
		if (!baseComponent) return;

		const inputText = baseComponent.getInputText();
		const tag = inputText.trim();

		if (!tag) return;

		// Check if valid in strict mode
		if (!isValidTag(tag)) {
			showInvalidFeedback();
			return;
		}

		// Try to add from available options
		const success = baseComponent.addFromInput(tag);
		if (success) {
			baseComponent.clearInput();
		} else {
			// If not in autocomplete but strict mode is off, add manually
			if (!strict) {
				value = [...value, tag];
				baseComponent.clearInput();
				onChange?.(value);
			} else {
				showInvalidFeedback();
			}
		}
	}
</script>

<MultiSelectBase
	bind:this={baseComponent}
	bind:value
	adapter={stringAdapter}
	{placeholder}
	{required}
	{disabled}
	{menuOptions}
	{size}
	{label}
	{helperText}
	{feedback}
	maxItems={maxTags}
	onChange={handleChange}
	{caseInsensitive}
	onInputChange={onInputChangeWithSeparators}
	{separators}
	{deleteOnBackspace}
	{invalidFeedbackMessage}
	ariaLabel="Tag input"
>
	{#snippet inputSuffix()}
		{#if showAddButton}
			<button
				type="button"
				class="add-button"
				onclick={handleAddButtonClick}
				disabled={disabled || !baseComponent?.getInputText().trim() || (maxTags !== undefined && value.length >= maxTags)}
				aria-label="Add tag"
			>
				Add
			</button>
		{/if}
	{/snippet}
</MultiSelectBase>

<style lang="scss">
	.add-button {
		position: absolute;
		right: var(--spacing-xs);
		top: 50%;
		transform: translateY(-50%);
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
		height: calc(100% - var(--spacing-xs) * 2);

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
			transform: translateY(-50%) scale(0.98);
		}
	}
</style>
