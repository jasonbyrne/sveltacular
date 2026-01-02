<script lang="ts">
	import type { DropdownOption, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import FormField from '$src/lib/forms//form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import CheckBox from './check-box.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';

	const id = uniqueId();

	let {
		group = $bindable([] as string[]),
		items = [],
		size = 'full' as FormFieldSizeOptions,
		disabled = false,
		required = false,
		onChange,
		label
	}: {
		group?: string[];
		items?: DropdownOption[];
		size?: FormFieldSizeOptions;
		disabled?: boolean;
		required?: boolean;
		onChange?: ((selected: string[]) => void) | undefined;
		label?: string;
	} = $props();

	// Create reactive items with checked state, synced with group
	let itemsWithState = $state<Array<DropdownOption & { isChecked: boolean }>>([]);

	// Sync itemsWithState when items or group changes (one-way: items/group -> itemsWithState)
	// Reassign the entire array to avoid reading itemsWithState in the effect
	$effect(() => {
		// Rebuild itemsWithState from items, using group to determine checked state
		// Reassign instead of mutate to avoid circular dependency
		const newItems = items.map((item) => ({
			...item,
			isChecked: group.includes(item.value ?? '')
		}));
		itemsWithState = newItems;
	});

	const handleCheckboxChange = (data: { isChecked: boolean; value: string }) => {
		// Update group based on checkbox change (this will trigger the effect to sync itemsWithState)
		if (data.isChecked) {
			if (!group.includes(data.value)) {
				group = [...group, data.value];
			}
		} else {
			group = group.filter((v) => v !== data.value);
		}
		onChange?.(group);
	};
</script>

<FormField {size}>
	{#if label}
		<FormLabel {id} {required} {label} />
	{/if}
	<div>
		{#each itemsWithState as item}
			<CheckBox
				{disabled}
				value={item.value ?? undefined}
				bind:isChecked={item.isChecked}
				onChange={handleCheckboxChange}
				label={item.name}
			/>
		{/each}
	</div>
</FormField>
