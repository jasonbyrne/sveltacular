<script lang="ts">
	import { untrack } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import FormInputWrapper from '$src/lib/forms/form-input-wrapper';
	import type { AllowedTextInputTypes, FormFieldSizeOptions } from '$src/lib/types/form.js';

	const id = uniqueId();

	let {
		value = $bindable('' as string | null),
		placeholder = '',
		helperText = '',
		feedback = undefined,
		isLoading = false,
		showCharacterCount = false,
		size = 'full',
		type = 'text',
		disabled = false,
		required = false,
		readonly = false,
		nullable = false,
		maxlength = undefined,
		minlength = undefined,
		pattern = undefined,
		prefix = undefined,
		suffix = undefined,
		allowSpaces = true,
		allowNumbers = true,
		allowLetters = true,
		textCase = undefined,
		onChange = undefined,
		onCheckChanged = undefined,
		onInput = undefined,
		onFocus = undefined,
		onBlur = undefined,
		label = undefined,
		nullText = ''
	}: {
		value?: string | null;
		placeholder?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		isLoading?: boolean;
		showCharacterCount?: boolean;
		size?: FormFieldSizeOptions;
		type?: AllowedTextInputTypes;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		nullable?: boolean;
		maxlength?: number | undefined;
		minlength?: number | undefined;
		pattern?: string | undefined;
		prefix?: string | undefined;
		suffix?: string | undefined;
		allowSpaces?: boolean;
		allowNumbers?: boolean;
		allowLetters?: boolean;
		textCase?: 'lower' | 'upper' | undefined;
		onChange?: ((value: string | null) => void) | undefined;
		onCheckChanged?: ((isChecked: boolean) => void) | undefined;
		onInput?: ((value: string | null) => void) | undefined;
		onFocus?: ((value: string | null) => void) | undefined;
		onBlur?: ((value: string | null) => void) | undefined;
		label?: string;
		nullText?: string;
	} = $props();

	// Track whether the nullable checkbox is checked (i.e., whether field has a value)
	let isChecked = $state(untrack(() => !!value));

	// Remember the last non-null value so we can restore it when re-checking
	let lastValue = $state<string | undefined>(undefined);

	// Derive the actual disabled state: disabled prop OR (nullable and unchecked)
	let inputDisabled = $derived(disabled || (nullable && !isChecked));

	let hasError = $derived(!!feedback?.isError);
	let hasSuccess = $derived(!!feedback && !feedback.isError);
	let describedByIds = $state<string[]>([]);
	let characterCount = $derived((value || '').length);
	let characterLimitClass = $derived(
		maxlength && characterCount > maxlength * 0.9
			? characterCount >= maxlength
				? 'at-limit'
				: 'near-limit'
			: ''
	);

	// Update describedByIds array when helper/feedback changes
	$effect(() => {
		// Track the dependencies we care about
		const hasHelper = !!helperText && !feedback;
		const hasFeedback = !!feedback;

		// Use untrack to write to describedByIds without triggering this effect again
		untrack(() => {
			describedByIds = [];
			if (hasHelper) {
				describedByIds.push(`${id}-helper`);
			} else if (hasFeedback) {
				if (feedback.isError) {
					describedByIds.push(`${id}-error`);
				} else {
					describedByIds.push(`${id}-success`);
				}
			}
		});
	});

	// Don't allow certain characters to be typed into the input
	const handleKeyPress = (e: KeyboardEvent) => {
		if (!allowSpaces && e.key === ' ') {
			e.preventDefault();
		}
		if (!allowNumbers && !isNaN(Number(e.key))) {
			e.preventDefault();
		}
		if (!allowLetters && /^[a-zA-Z]$/.test(e.key)) {
			e.preventDefault();
		}
	};

	const checkChanged = () => {
		if (nullable) {
			if (isChecked) {
				// Restore last value if available, otherwise use empty string
				value = lastValue || '';
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

	// When the value changes, make sure it is in the correct case
	const handleInput = (e: Event) => {
		const cleanValue = String(value);
		if (textCase === 'lower') {
			value = cleanValue.toLowerCase();
		} else if (textCase === 'upper') {
			value = cleanValue.toUpperCase();
		}
		if (type === 'email') {
			value = cleanValue.replace(/\s/g, '');
		}
		if (type === 'tel') {
			value = cleanValue.replace(/[^0-9]/g, '');
		}
		if (type === 'url') {
			value = cleanValue.replace(/\s/g, '');
		}
		handleInputChange();
	};

	const handleFocus = (e: FocusEvent) => {
		onFocus?.(value);
	};

	const handleBlur = (e: FocusEvent) => {
		onBlur?.(value);
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

	let effectiveNullText = $derived(nullText || placeholder || '--');
</script>

<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
	<FormInputWrapper
		{disabled}
		error={hasError}
		success={hasSuccess}
		{prefix}
		{suffix}
		{nullable}
		nullText={effectiveNullText}
		{isLoading}
		onCheckChanged={checkChanged}
	>
		<input
			{id}
			{placeholder}
			bind:value
			{...{ type }}
			disabled={inputDisabled}
			{readonly}
			{required}
			{maxlength}
			{minlength}
			{pattern}
			aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
			aria-required={required}
			aria-invalid={hasError}
			aria-busy={isLoading}
			onkeypress={handleKeyPress}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
		/>
	</FormInputWrapper>
	{#if showCharacterCount && maxlength}
		<div class="character-count {characterLimitClass}">
			{characterCount} / {maxlength}
		</div>
	{/if}
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

	.character-count {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		text-align: right;
		color: var(--body-fg);
		position: absolute;
		right: 0;

		&.near-limit {
			color: var(--warning, #ffc107);
			font-weight: 500;
		}

		&.at-limit {
			color: var(--danger, #dc3545);
			font-weight: 600;
		}
	}
</style>
