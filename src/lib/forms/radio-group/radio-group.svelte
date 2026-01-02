<script lang="ts">
	import type { DropdownOption, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import FormField from '$src/lib/forms//form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import RadioBox from './radio-box.svelte';

	const id = uniqueId();

	let {
		group = '',
		items = [],
		size = 'full' as FormFieldSizeOptions,
		disabled = false,
		required = false,
		label = undefined
	}: {
		group?: string;
		items?: DropdownOption[];
		size?: FormFieldSizeOptions;
		disabled?: boolean;
		required?: boolean;
		label?: string;
	} = $props();
</script>

<FormField {size}>
	{#if label}
		<FormLabel {id} {required} {label} />
	{/if}
	<div>
		{#each items as item}
			<RadioBox bind:group={group} {disabled} value={item.value}>{item.name}</RadioBox>
		{/each}
	</div>
</FormField>
