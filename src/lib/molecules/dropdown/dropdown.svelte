<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { DropdownOption, FormFieldSizeOptions } from '$src/types/form.js';
	import FormField from '$src/lib/atoms/form-field.svelte';
	import FormLabel from '$src/lib/atoms/form-label.svelte';
	import { uniqueId } from '$src/helpers/unique-id.js';

	const dispatch = createEventDispatcher<{ change: string }>();
	const id = uniqueId();

	export let value = '';
	export let items: DropdownOption[] = [];
	export let size: FormFieldSizeOptions = 'md';
</script>

<FormField {size}>
	<FormLabel {id}><slot /></FormLabel>
	<select {id} bind:value on:change={() => dispatch('change', value)}>
		{#each items as item}
			<option value={item.value}>{item.name}</option>
		{/each}
	</select>
</FormField>

<style lang="scss">
	select {
		width: 100%;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		border: 1px solid #b7b7b7;
		background-color: #fff;
		color: #5c5c5c;
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out;
		user-select: none;
		white-space: nowrap;
	}
</style>
