<script lang="ts">
	import { untrack } from 'svelte';
	import type { DropdownOption, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import FormField from '$src/lib/forms/form-field/form-field.svelte';
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
		// Track items and group as dependencies
		const currentItems = items;
		const currentGroup = group;

		// Use untrack to prevent writing to itemsWithState from triggering this effect again
		untrack(() => {
			// Rebuild itemsWithState from items, using group to determine checked state
			// Reassign instead of mutate to avoid circular dependency
			const newItems = currentItems.map((item) => ({
				...item,
				isChecked: currentGroup.includes(item.value != null ? String(item.value) : '')
			}));
			itemsWithState = newItems;
		});
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

<FormField {size} {label} {id} {required} {disabled}>
	<div>
		{#each itemsWithState as item}
			<CheckBox
				{disabled}
				value={item.value != null ? String(item.value) : undefined}
				bind:isChecked={item.isChecked}
				onChange={handleCheckboxChange}
				label={item.name}
				inline={true}
			/>
		{/each}
	</div>
</FormField>
