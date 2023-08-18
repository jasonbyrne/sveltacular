<script lang="ts">
	import type {
		DropdownOption,
		FormFieldSizeOptions,
		RadioButtonValue
	} from '$src/lib/types/form.js';
	import FormField from '$src/lib/forms//form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import CheckBox from './check-box.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';

	const id = uniqueId();

	export let group: RadioButtonValue[] = [];
	export let items: DropdownOption[] = [];
	export let size: FormFieldSizeOptions = 'md';
	export let disabled = false;
	export let required = false;
</script>

<FormField {size}>
	<FormLabel {id} {required}><slot /></FormLabel>
	<div>
		{#each items as item}
			<CheckBox bind:group name={id} {disabled} value={item.value}>{item.name}</CheckBox>
		{/each}
	</div>
</FormField>
