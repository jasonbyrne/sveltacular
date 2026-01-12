<script lang="ts">
	import { untrack } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import FormInputWrapper from '$src/lib/forms/form-input-wrapper';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	const id = uniqueId();

	let {
		value = $bindable('' as string | null),
		size = 'full' as FormFieldSizeOptions,
		nullable = false,
		disabled = false,
		required = false,
		readonly = false,
		onChange = undefined,
		onCheckChanged = undefined,
		onInput = undefined,
		onFocus = undefined,
		onBlur = undefined,
		label = undefined,
		helperText = undefined,
		nullText = '-- : -- : --',
		feedback = undefined
	}: {
		value?: string | null;
		size?: FormFieldSizeOptions;
		nullable?: boolean;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		onChange?: ((value: string | null) => void) | undefined;
		onCheckChanged?: ((isChecked: boolean) => void) | undefined;
		onInput?: ((value: string | null) => void) | undefined;
		onFocus?: ((e: FocusEvent) => void) | undefined;
		onBlur?: ((e: FocusEvent) => void) | undefined;
		label?: string;
		helperText?: string;
		nullText?: string;
		feedback?: FormFieldFeedback;
	} = $props();

	// Track whether the nullable checkbox is checked (i.e., whether field has a value)
	let isChecked = $state(untrack(() => !!value));

	// Remember the last non-null value so we can restore it when re-checking
	let lastValue = $state<string | undefined>(undefined);

	// Derive the actual disabled state: disabled prop OR (nullable and unchecked)
	let inputDisabled = $derived(disabled || (nullable && !isChecked));

	const getCurrentTime = () => {
		const now = new Date();
		return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
	};

	const checkChanged = () => {
		if (nullable) {
			if (isChecked) {
				// Restore last value if available, otherwise use current time
				value = lastValue || getCurrentTime();
			} else {
				// Store current value before clearing
				if (value) {
					lastValue = value;
				}
				value = '';
			}
		}
		onCheckChanged?.(isChecked);
		handleInputChange();
	};

	const handleInputChange = () => {
		const currentValue = !nullable || isChecked ? value : null;
		// Remember the value if it's not empty
		if (isChecked && value) {
			lastValue = value;
		}
		onChange?.(currentValue);
		onInput?.(currentValue);
	};

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = target.value;
		handleInputChange();
	};

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = target.value;
		handleInputChange();
	};

	$effect(() => {
		if (!value) {
			// Use untrack to prevent writes to isChecked/value from triggering this effect again
			untrack(() => {
				if (nullable) isChecked = false;
			});
		} else {
			// Initialize lastValue if we have an initial value
			if (!lastValue) {
				lastValue = value;
			}
		}
	});

	let showInput = $derived(!nullable || isChecked);
</script>

<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
	<FormInputWrapper
		{disabled}
		{nullable}
		nullText={nullText || '-- : -- : --'}
		onCheckChanged={checkChanged}
	>
		<input
			{id}
			type="time"
			bind:value
			disabled={inputDisabled}
			{required}
			{readonly}
			oninput={handleInput}
			onchange={handleChange}
			onfocus={onFocus}
			onblur={onBlur}
			aria-required={required}
		/>
	</FormInputWrapper>
</FormField>

<style lang="scss">
	input[type='time'] {
		background-color: transparent;
		border: none;
		line-height: 2rem;
		height: 2rem;
		font-size: var(--font-md);
		width: 100%;
		flex-grow: 1;
		padding: 0 var(--spacing-base);
		margin: 0;
		box-sizing: border-box;

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

		&:read-only {
			cursor: default;
		}
	}
</style>
