<script lang="ts" generics="T = ReferenceItem">
	import MultiSelectBase, {
		type MultiSelectAdapter
	} from '../multi-select-base/multi-select-base.svelte';
	import type { FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import type {
		ComponentSize,
		ReferenceItem,
		SearchFunction,
		CreateNewFunction,
		LinkBuilderFunction,
		FieldNameMapping
	} from '$src/lib/types/form.js';
	import { createFieldMapper } from '$src/lib/types/form.js';
	import Prompt from '$src/lib/modals/prompt.svelte';
	import { ucfirst } from '$src/lib/helpers/ucfirst.js';
	import Icon from '$src/lib/icons/icon.svelte';

	let {
		value = $bindable([] as T[]),
		items = [] as T[],
		fieldNames = undefined as FieldNameMapping | undefined,
		search = undefined,
		createNew = undefined,
		linkBuilder = undefined as LinkBuilderFunction | undefined,
		resourceName = undefined as string | undefined,
		placeholder = 'Search and add items...',
		required = false,
		disabled = false,
		size = 'md',
		label = undefined as string | undefined,
		helperText = undefined as string | undefined,
		feedback = undefined as FormFieldFeedback | undefined,
		maxItems = undefined as number | undefined,
		onChange = undefined as ((value: T[]) => void) | undefined
	}: {
		value?: T[];
		items?: T[];
		/**
		 * Maps database field names to ReferenceItem properties.
		 * Use this when your data uses different field names (e.g., 'name' instead of 'label').
		 * 
		 * @example
		 * // Basic usage
		 * fieldNames={{ label: 'name', value: 'id' }}
		 * 
		 * @example
		 * // With description field
		 * fieldNames={{ label: 'title', value: 'id', description: 'subtitle' }}
		 */
		fieldNames?: FieldNameMapping | undefined;
		search?: SearchFunction | undefined;
		createNew?: CreateNewFunction<ReferenceItem> | undefined;
		linkBuilder?: LinkBuilderFunction | undefined;
		resourceName?: string | undefined;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		size?: ComponentSize;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback | undefined;
		maxItems?: number | undefined;
		onChange?: ((value: T[]) => void) | undefined;
	} = $props();

	let baseComponent: MultiSelectBase<ReferenceItem> | null = $state(null);
	let localItems = $state<ReferenceItem[]>([]);
	let isLoading = $state(false);
	let showPrompt = $state(false);
	let isCreating = $state(false);
	let createError = $state<string | null>(null);
	let promptKey = $state(0);
	let currentSearchText = $state('');

	// Create field mapper
	const mapper = $derived(createFieldMapper<T>(fieldNames));

	// Transform items for internal use (always work with ReferenceItem internally)
	const referenceItems = $derived(
		fieldNames ? items.map(item => mapper.toReferenceItem(item)) : items as unknown as ReferenceItem[]
	);

	// Internal value state (always ReferenceItem[])
	let internalValue = $state<ReferenceItem[]>([]);

	// Sync internal value from external value
	$effect(() => {
		if (fieldNames) {
			internalValue = value.map(item => mapper.toReferenceItem(item));
		} else {
			internalValue = value as unknown as ReferenceItem[];
		}
	});

	// Update external value from internal value
	function updateExternalValue(newInternalValue: ReferenceItem[]) {
		if (fieldNames) {
			value = newInternalValue.map(ref => mapper.fromReferenceItem(ref));
		} else {
			value = newInternalValue as unknown as T[];
		}
		onChange?.(value);
	}

	// Use local items when search function is provided, otherwise use transformed items
	let currentItems = $derived(search ? localItems : referenceItems);

	// Convert to menu options format
	let menuOptions = $derived(currentItems);

	// Adapter to work with ReferenceItems
	let referenceAdapter = $derived<MultiSelectAdapter<ReferenceItem>>({
		getLabel: (item: ReferenceItem) => item.label,
		getKey: (item: ReferenceItem) => String(item.value ?? item.label),
		equals: (a: ReferenceItem, b: ReferenceItem) => a.value === b.value,
		fromMenuOption: (option: ReferenceItem) => option,
		getLink: linkBuilder 
			? (item: ReferenceItem) => {
				// Find original item to pass to linkBuilder
				const original = fieldNames 
					? value.find(v => mapper.toReferenceItem(v).value === item.value)
					: item;
				return linkBuilder(original as any);
			}
			: undefined,
		getTooltip: (item: ReferenceItem) => item.description
	});

	// Debounced search function
	let searchTimeout: ReturnType<typeof setTimeout> | undefined;

	const performSearch = async (searchText: string) => {
		if (search && searchText.trim()) {
			isLoading = true;
			try {
				localItems = await search(searchText);
			} finally {
				isLoading = false;
			}
		}
	};

	const triggerSearch = (text: string) => {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
		searchTimeout = setTimeout(() => performSearch(text), 300);
	};

	function handleInputChange(text: string) {
		currentSearchText = text;

		// Trigger search if search function is provided
		if (search && text.trim()) {
			triggerSearch(text);
		} else if (!text.trim()) {
			// Clear local items when search text is empty
			localItems = [];
		}
	}

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

				// Add the newly created item to internal value, then sync to external
				const newInternalValue = [...internalValue, result];
				internalValue = newInternalValue;
				updateExternalValue(newInternalValue);
				showPrompt = false;
			} else {
				createError = 'Failed to create new item';
			}
		} catch (error) {
			createError = error instanceof Error ? error.message : 'An error occurred';
		} finally {
			isCreating = false;
		}
	};

	const openCreatePrompt = () => {
		createError = null;
		promptKey++;
		showPrompt = true;
	};

	// Reset error when prompt closes
	$effect(() => {
		if (!showPrompt) {
			createError = null;
		}
	});

	// Check if we should show "Create new..." option
	let showCreateNewInDropdown = $derived(!!createNew && currentSearchText.trim());

	// Handle highlighting for "Create new..." option
	let highlightIndex = $state(-1);
</script>

<MultiSelectBase
	bind:this={baseComponent}
	bind:value={internalValue}
	adapter={referenceAdapter}
	{placeholder}
	{required}
	{disabled}
	{menuOptions}
	{size}
	{label}
	{helperText}
	{feedback}
	{maxItems}
	onChange={updateExternalValue}
	onInputChange={handleInputChange}
	{isLoading}
	filterSuggestions={!search}
	showNoResults={!!search}
	ariaLabel="Reference input"
>
	{#snippet additionalDropdownContent()}
		{#if showCreateNewInDropdown}
			<button
				type="button"
				class="create-new"
				onclick={openCreatePrompt}
				role="option"
				aria-selected={false}
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
	{/snippet}
</MultiSelectBase>

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

		&:hover {
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
