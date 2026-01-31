<script lang="ts">
	import type { ReferenceItem, ComponentSize } from '$src/lib/types/form.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import RadioBox from './radio-box.svelte';

	const id = uniqueId();

	let {
		group = '',
		items = [],
		size = 'md' as ComponentSize,
		disabled = false,
		required = false,
		label = undefined,
		helperText = undefined,
		feedback = undefined,
		onChange = undefined
	}: {
		group?: string;
		items?: ReferenceItem[];
		size?: ComponentSize;
		disabled?: boolean;
		required?: boolean;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		onChange?: ((value: string) => void) | undefined;
	} = $props();
</script>

<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
	<div>
		{#each items as item}
			<RadioBox bind:group {disabled} value={item.value} {onChange}>{item.label}</RadioBox>
		{/each}
	</div>
</FormField>
