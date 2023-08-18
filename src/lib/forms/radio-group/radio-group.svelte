<script lang="ts">
	import type { DropdownOption, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import FormField from '$src/lib/forms//form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import RadioBox from './radio-box.svelte';

	const id = uniqueId();

	export let value = '';
	export let items: DropdownOption[] = [];
	export let size: FormFieldSizeOptions = 'md';
	export let disabled = false;
	export let required = false;
</script>

<FormField {size}>
	<FormLabel {id} {required}><slot /></FormLabel>
	<div>
		{#each items as item}
			<RadioBox bind:group={value} {disabled} value={item.value}>{item.name}</RadioBox>
		{/each}
	</div>
</FormField>
