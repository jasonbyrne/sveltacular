<script lang="ts">
	import type { FormFieldSizeOptions } from '$src/lib/index.js';
	import type { HttpProtocol } from '$src/lib/types/generic.js';
	import TextBox from '../text-box/text-box.svelte';

	let {
		protocol = $bindable('https' as HttpProtocol),
		value = $bindable('' as string | null),
		size = 'lg' as FormFieldSizeOptions,
		placeholder = 'example.com',
		label = undefined,
		helperText = undefined,
		feedback = undefined,
		disabled = false,
		required = false,
		readonly = false,
		maxlength = undefined,
		minlength = undefined,
		pattern = undefined,
		isLoading = false,
		onChange = undefined
	}: {
		protocol?: HttpProtocol;
		value?: string | null;
		size?: FormFieldSizeOptions;
		placeholder?: string;
		label?: string;
		helperText?: string;
		feedback?: import('../form-field/form-field.svelte').FormFieldFeedback;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		maxlength?: number | undefined;
		minlength?: number | undefined;
		pattern?: string | undefined;
		isLoading?: boolean;
		onChange?: ((value: string) => void) | undefined;
	} = $props();

	// On input, parse the value and set the protocol
	const handleInput = (inputValue: string) => {
		const cleanValue = inputValue ?? '';
		const urlParts = cleanValue.split('://');
		if (['http', 'https'].includes(urlParts[0])) {
			protocol = urlParts[0] as HttpProtocol;
			value = urlParts[1];
		}
		onChange?.(cleanValue);
	};
</script>

<TextBox
	bind:value
	type="text"
	{placeholder}
	prefix={protocol + '://'}
	{size}
	onInput={handleInput}
	onChange={handleInput}
	allowSpaces={false}
	{label}
	{helperText}
	{feedback}
	{disabled}
	{required}
	{readonly}
	{maxlength}
	{minlength}
	{pattern}
	{isLoading}
/>
