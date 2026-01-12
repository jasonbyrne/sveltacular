<script lang="ts">
	import { untrack } from 'svelte';
	import { roundToDecimals } from '$src/lib/helpers/round-to-decimals.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import FormInputWrapper from '$src/lib/forms/form-input-wrapper';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	const id = uniqueId();

	type AllowedInputTypes = 'number' | 'currency';

	let {
		value = $bindable(0 as number | null),
		placeholder = '',
		size = 'full' as FormFieldSizeOptions,
		type = 'number' as AllowedInputTypes,
		min = 0,
		max = 1000000,
		decimals = 0,
		prefix = null as string | null,
		suffix = null as string | null,
		step = 1,
		nullable = false,
		onChange = undefined,
		onCheckChanged = undefined,
		onInput = undefined,
		onFocus = undefined,
		onBlur = undefined,
		label = undefined,
		helperText = undefined,
		feedback = undefined,
		disabled = false,
		required = false,
		readonly = false,
		nullText = ''
	}: {
		value?: number | null;
		placeholder?: string;
		size?: FormFieldSizeOptions;
		type?: AllowedInputTypes;
		min?: number;
		max?: number;
		decimals?: number;
		prefix?: string | null;
		suffix?: string | null;
		step?: number;
		nullable?: boolean;
		onChange?: ((value: number | null) => void) | undefined;
		onCheckChanged?: ((isChecked: boolean) => void) | undefined;
		onInput?: ((value: number | null) => void) | undefined;
		onFocus?: ((e: FocusEvent) => void) | undefined;
		onBlur?: ((e: FocusEvent) => void) | undefined;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		nullText?: string;
	} = $props();

	// Track whether the nullable checkbox is checked (i.e., whether field has a value)
	let isChecked = $state(untrack(() => value !== null && value !== undefined));

	// Remember the last non-null value so we can restore it when re-checking
	let lastValue = $state<number | undefined>(undefined);

	// Derive the actual disabled state: disabled prop OR (nullable and unchecked)
	let inputDisabled = $derived(disabled || (nullable && !isChecked));

	let showInput = $derived(!nullable || isChecked);

	const checkChanged = () => {
		if (nullable) {
			if (isChecked) {
				// Restore last value if available, otherwise use 0
				value = lastValue !== undefined ? lastValue : 0;
			} else {
				// Store current value before clearing
				if (value !== null && value !== undefined) {
					lastValue = value;
				}
				value = null;
			}
		}
		onCheckChanged?.(isChecked);
		handleInputChange();
	};

	const handleInputChange = () => {
		const currentValue = !nullable || isChecked ? value : null;
		// Remember the value if it's not null
		if (isChecked && value !== null && value !== undefined) {
			lastValue = value;
		}
		onChange?.(currentValue);
		onInput?.(currentValue);
	};

	const valueChanged = () => {
		if (value === null || value === undefined) return;
		if (value < min) value = min;
		if (value > max) value = max;
		value = roundToDecimals(value, decimals);
		handleInputChange();
	};

	const handleInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const newValue = parseFloat(input.value);
		if (isNaN(newValue)) return;
		value = newValue;
		handleInputChange();
	};

	$effect(() => {
		if (value === null || value === undefined) {
			// Use untrack to prevent writes to isChecked/value from triggering this effect again
			untrack(() => {
				if (nullable) isChecked = false;
			});
		} else {
			// Initialize lastValue if we have an initial value
			if (lastValue === undefined) {
				lastValue = value;
			}
		}
	});

	let effectiveNullText = $derived(nullText || placeholder || '--');

	// Don't allow certain characters to be typed into the input
	const onKeyPress = (e: KeyboardEvent) => {
		const isNumber = !isNaN(Number(e.key));
		const isDecimal = e.key === '.';
		const isAllowed =
			isNumber ||
			isDecimal ||
			['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key);
		if (!isAllowed) return e.preventDefault();
		if (isDecimal && decimals === 0) return e.preventDefault();
		const newValue = `${value}${e.key}`;
		const decimalPart = newValue.split('.')[1];
		if (decimalPart && decimalPart.length > decimals) return e.preventDefault();
	};
</script>

<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
	<FormInputWrapper
		{disabled}
		prefix={prefix || undefined}
		suffix={suffix || undefined}
		{nullable}
		nullText={effectiveNullText}
		onCheckChanged={checkChanged}
	>
		<input
			{id}
			{placeholder}
			bind:value
			type="number"
			{step}
			{min}
			{max}
			disabled={inputDisabled}
			{readonly}
			{required}
			onchange={valueChanged}
			oninput={handleInput}
			onkeypress={onKeyPress}
			onfocus={onFocus}
			onblur={onBlur}
		/>
	</FormInputWrapper>
</FormField>

<style lang="scss">
	input {
		background-color: transparent;
		border: none;
		line-height: 2rem;
		font-size: var(--font-md);
		width: 100%;
		flex-grow: 1;
		padding: 0 0 0 var(--spacing-base);

		&:focus {
			outline: none;
		}

		&:focus-visible {
			outline: 2px solid var(--focus-ring, #007bff);
			outline-offset: 2px;
		}

		&:disabled {
			cursor: not-allowed;
		}
	}
</style>
