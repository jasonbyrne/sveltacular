<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import { animateShake } from '$src/lib/helpers/animations.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { AllowedTextInputTypes, FormFieldSizeOptions } from '$src/lib/types/form.js';

	const id = uniqueId();

	let {
		value = $bindable('' as string | null),
		placeholder = '',
		helperText = '',
		errorText = '',
		size = 'full',
		type = 'text',
		disabled = false,
		required = false,
		readonly = false,
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
		onInput = undefined,
		label = undefined
	}: {
		value?: string | null;
		placeholder?: string;
		helperText?: string;
		errorText?: string;
		size?: FormFieldSizeOptions;
		type?: AllowedTextInputTypes;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		maxlength?: number | undefined;
		minlength?: number | undefined;
		pattern?: string | undefined;
		prefix?: string | undefined;
		suffix?: string | undefined;
		allowSpaces?: boolean;
		allowNumbers?: boolean;
		allowLetters?: boolean;
		textCase?: 'lower' | 'upper' | undefined;
		onChange?: ((value: string) => void) | undefined;
		onInput?: ((value: string) => void) | undefined;
		label?: string;
	} = $props();

	let hasError = $derived(!!errorText);
	let describedByIds = $state<string[]>([]);
	let inputElement: HTMLDivElement | null = $state(null);
	
	$effect(() => {
		describedByIds = [];
		if (helperText) describedByIds.push(`${id}-helper`);
		if (errorText) describedByIds.push(`${id}-error`);
	});

	// Trigger shake animation when error appears
	$effect(() => {
		if (hasError && inputElement) {
			animateShake(inputElement);
		}
	});

	// Don't allow certain characters to be typed into the input
	const onKeyPress = (e: KeyboardEvent) => {
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
		onInput?.(cleanValue);
		onChange?.(cleanValue);
	};
</script>

<FormField {size}>
	{#if label}
		<FormLabel {id} {required} {label} />
	{/if}
	<div class="input {disabled ? 'disabled' : 'enabled'}" class:error={hasError} bind:this={inputElement}>
		{#if prefix}
			<div class="prefix">{prefix}</div>
		{/if}
		<input
			{id}
			{placeholder}
			bind:value
			{...{ type }}
			{disabled}
			{readonly}
			{required}
			{maxlength}
			{minlength}
			{pattern}
			aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
			aria-required={required}
			aria-invalid={hasError}
			onkeypress={onKeyPress}
			oninput={handleInput}
		/>
		{#if suffix}
			<div class="suffix">{suffix}</div>
		{/if}
	</div>
	{#if helperText}
		<div class="helper-text" id="{id}-helper">{helperText}</div>
	{/if}
	{#if errorText}
		<div class="error-text" id="{id}-error" role="alert" aria-live="assertive">
			{errorText}
		</div>
	{/if}
</FormField>

<style lang="scss">
	.input {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: var(--radius-md);
		border: var(--border-thin) solid var(--form-input-border);
		background-color: var(--form-input-bg);
		color: var(--form-input-fg);
		font-size: var(--font-md);
		font-weight: 500;
		line-height: 2rem;
		transition:
			background-color var(--transition-base) var(--ease-in-out),
			border-color var(--transition-base) var(--ease-in-out),
			color var(--transition-base) var(--ease-in-out),
			fill var(--transition-base) var(--ease-in-out),
			stroke var(--transition-base) var(--ease-in-out);
		user-select: none;
		white-space: nowrap;

		&.disabled {
			opacity: 0.5;
		}

		&.error {
			border-color: var(--danger, #dc3545);
		}

		input {
			background-color: transparent;
			border: none;
			line-height: 2rem;
			font-size: var(--font-md);
			width: 100%;
			flex-grow: 1;
			padding-left: var(--spacing-base);

			&:focus {
				outline: none;
			}

			&:focus-visible {
				outline: 2px solid var(--focus-ring, #007bff);
				outline-offset: 2px;
			}
		}

		.prefix,
		.suffix {
			font-size: var(--font-md);
			line-height: 2rem;
			padding-left: var(--spacing-base);
			padding-right: var(--spacing-base);
			background-color: var(--form-input-accent-bg);
			color: var(--form-input-accent-fg);
		}

		.prefix {
			border-right: var(--border-thin) solid var(--form-input-border);
		}

		.suffix {
			border-left: var(--border-thin) solid var(--form-input-border);
		}
	}

	.helper-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--body-fg);
	}

	.error-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--danger, #dc3545);
		font-weight: 500;
	}
</style>
