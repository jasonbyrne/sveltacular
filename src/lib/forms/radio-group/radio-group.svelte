<script lang="ts">
	import type { ReferenceItem, ComponentSize, FieldNameMapping } from '$src/lib/types/form.js';
	import { createFieldMapper } from '$src/lib/types/form.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import RadioBox from './radio-box.svelte';

	const id = uniqueId();

	let {
		group = $bindable(''),
		items = [],
		fieldNames = undefined as FieldNameMapping | undefined,
		size = 'md' as ComponentSize,
		disabled = false,
		required = false,
		label = undefined,
		helperText = undefined,
		feedback = undefined,
		onChange = undefined
	}: {
		group?: string | number;
		items?: any[];
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
		size?: ComponentSize;
		disabled?: boolean;
		required?: boolean;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		onChange?: ((value: string | number) => void) | undefined;
	} = $props();

	// Create field mapper
	const mapper = $derived(createFieldMapper<any>(fieldNames));

	// Transform items for internal use (always work with ReferenceItem internally)
	const referenceItems = $derived(
		fieldNames ? items.map(item => mapper.toReferenceItem(item)) : items as ReferenceItem[]
	);

	// Internal string group for binding to RadioBox components
	let internalGroup = $state<string>(String(group ?? ''));

	// Sync internal group from external group
	$effect(() => {
		internalGroup = String(group ?? '');
	});

	// Handle change to convert back to original type
	function handleChange(value: string) {
		// Try to convert back to number if the original was a number
		const numValue = Number(value);
		if (!isNaN(numValue) && String(numValue) === value) {
			group = numValue;
		} else {
			group = value;
		}
		onChange?.(group);
	}
</script>

<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
	<div>
		{#each referenceItems as item}
			<RadioBox bind:group={internalGroup} {disabled} value={item.value} onChange={handleChange}>{item.label}</RadioBox>
		{/each}
	</div>
</FormField>
