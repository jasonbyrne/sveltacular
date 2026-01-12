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
		nullable = false,
		maxlength = undefined,
		minlength = undefined,
		pattern = undefined,
		isLoading = false,
		onChange = undefined,
		onCheckChanged = undefined,
		onInput = undefined,
		onFocus = undefined,
		onBlur = undefined,
		nullText = ''
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
		nullable?: boolean;
		maxlength?: number | undefined;
		minlength?: number | undefined;
		pattern?: string | undefined;
		isLoading?: boolean;
		onChange?: ((value: string | null) => void) | undefined;
		onCheckChanged?: ((isChecked: boolean) => void) | undefined;
		onInput?: ((value: string | null) => void) | undefined;
		onFocus?: ((e: FocusEvent) => void) | undefined;
		onBlur?: ((e: FocusEvent) => void) | undefined;
		nullText?: string;
	} = $props();

	// On input, parse the value and set the protocol
	const handleInput = (inputValue: string | null) => {
		const cleanValue = inputValue ?? '';
		const urlParts = cleanValue.split('://');
		if (['http', 'https'].includes(urlParts[0])) {
			protocol = urlParts[0] as HttpProtocol;
			value = urlParts[1];
		}
		onInput?.(inputValue);
	};

	const handleChange = (inputValue: string | null) => {
		onChange?.(inputValue);
	};
</script>

<TextBox
	bind:value
	type="text"
	{placeholder}
	prefix={protocol + '://'}
	{size}
	onInput={handleInput}
	onChange={handleChange}
	{onCheckChanged}
	{onFocus}
	{onBlur}
	allowSpaces={false}
	{label}
	{helperText}
	{feedback}
	{disabled}
	{required}
	{readonly}
	{nullable}
	{maxlength}
	{minlength}
	{pattern}
	{isLoading}
	{nullText}
/>
