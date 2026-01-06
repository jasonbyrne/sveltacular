<script lang="ts">
	import ListBox from '../list-box/list-box.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/index.js';
	import type { FormFieldFeedback } from '../form-field/form-field.svelte';

	let {
		value = $bindable(false),
		options = ['Yes', 'No'] as [yes: string, no: string],
		size = 'md' as FormFieldSizeOptions,
		onChange = undefined,
		label = undefined,
		helperText = undefined,
		feedback = undefined,
		disabled = false,
		required = false
	}: {
		value?: boolean;
		options?: [yes: string, no: string];
		size?: FormFieldSizeOptions;
		onChange?: ((value: boolean) => void) | undefined;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		disabled?: boolean;
		required?: boolean;
	} = $props();

	let stringValue = $state(value ? 'true' : 'false');

	const handleChange = () => {
		value = stringValue == 'true';
		onChange?.(value);
	};

	let items = $derived([
		{ value: 'true', name: options[0] },
		{ value: 'false', name: options[1] }
	]);
</script>

<ListBox
	{items}
	bind:value={stringValue}
	{size}
	onChange={handleChange}
	{label}
	{helperText}
	{feedback}
	{disabled}
	{required}
/>
