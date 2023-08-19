<script lang="ts">
	import type { DropdownOption, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import FormField from '$src/lib/forms//form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import CheckBox from './check-box.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import { createEventDispatcher } from 'svelte';

	const id = uniqueId();
	const dispatch = createEventDispatcher<{ change: { selected: string[] } }>();

	export let group: string[] = [];
	export let items: Array<DropdownOption & { isChecked?: true }> = [];
	export let size: FormFieldSizeOptions = 'md';
	export let disabled = false;
	export let required = false;

	const onChecked = () => {
		const newGroup: string[] = [];
		items.forEach((item) => {
			if (item.isChecked) {
				newGroup.push(item.value);
			}
		});
		group = newGroup;
		dispatch('change', { selected: group });
	};

	onChecked();
</script>

<FormField {size}>
	<FormLabel {id} {required}><slot /></FormLabel>
	<div>
		{#each items as item}
			<CheckBox {disabled} value={item.value} bind:isChecked={item.isChecked} on:change={onChecked}
				>{item.name}</CheckBox
			>
		{/each}
	</div>
</FormField>
