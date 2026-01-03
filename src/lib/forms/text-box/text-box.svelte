<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import { animateShake, animateScaleIn } from '$src/lib/helpers/animations.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import CheckIcon from '$src/lib/icons/check-icon.svelte';
	import type { AllowedTextInputTypes, FormFieldSizeOptions } from '$src/lib/types/form.js';

	const id = uniqueId();

	let {
		value = $bindable('' as string | null),
		placeholder = '',
		helperText = '',
		errorText = '',
		successText = '',
		isLoading = false,
		showCharacterCount = false,
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
		successText?: string;
		isLoading?: boolean;
		showCharacterCount?: boolean;
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
	let hasSuccess = $derived(!!successText && !errorText);
	let describedByIds = $state<string[]>([]);
	let inputElement: HTMLDivElement | null = $state(null);
	let successIconElement: HTMLDivElement | null = $state(null);
	let characterCount = $derived((value || '').length);
	let characterLimitClass = $derived(
		maxlength && characterCount > maxlength * 0.9
			? characterCount >= maxlength
				? 'at-limit'
				: 'near-limit'
			: ''
	);
	
	$effect(() => {
		describedByIds = [];
		if (helperText) describedByIds.push(`${id}-helper`);
		if (errorText) describedByIds.push(`${id}-error`);
		if (successText) describedByIds.push(`${id}-success`);
	});

	// Trigger shake animation when error appears
	$effect(() => {
		if (hasError && inputElement) {
			animateShake(inputElement);
		}
	});

	// Trigger scale-in animation when success appears
	$effect(() => {
		if (hasSuccess && successIconElement) {
			animateScaleIn(successIconElement);
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
	<div class="input {disabled ? 'disabled' : 'enabled'}" class:error={hasError} class:success={hasSuccess} bind:this={inputElement}>
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
			aria-busy={isLoading}
			onkeypress={onKeyPress}
			oninput={handleInput}
		/>
		{#if isLoading}
			<div class="loading-indicator" aria-label="Loading">
				<div class="spinner"></div>
			</div>
		{:else if hasSuccess}
			<div class="success-indicator" bind:this={successIconElement}>
				<CheckIcon />
			</div>
		{/if}
		{#if suffix}
			<div class="suffix">{suffix}</div>
		{/if}
	</div>
	{#if showCharacterCount && maxlength}
		<div class="character-count {characterLimitClass}">
			{characterCount} / {maxlength}
		</div>
	{/if}
	{#if helperText}
		<div class="helper-text" id="{id}-helper">{helperText}</div>
	{/if}
	{#if successText}
		<div class="success-text" id="{id}-success" role="status" aria-live="polite">
			{successText}
		</div>
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

		&.success {
			border-color: var(--success, #28a745);
		}

		.loading-indicator,
		.success-indicator {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 var(--spacing-base);
		}

		.loading-indicator {
			.spinner {
				width: 1rem;
				height: 1rem;
				border: 2px solid var(--form-input-border);
				border-top-color: var(--primary-500, #3b82f6);
				border-radius: 50%;
				animation: spin 0.6s linear infinite;
			}
		}

		@keyframes spin {
			to {
				transform: rotate(360deg);
			}
		}

		.success-indicator {
			color: var(--success, #28a745);
			width: 1.5rem;
			height: 1.5rem;

			:global(svg) {
				width: 100%;
				height: 100%;
			}
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

	.character-count {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		text-align: right;
		color: var(--body-fg);

		&.near-limit {
			color: var(--warning, #ffc107);
			font-weight: 500;
		}

		&.at-limit {
			color: var(--danger, #dc3545);
			font-weight: 600;
		}
	}

	.helper-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--body-fg);
	}

	.success-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--success, #28a745);
		font-weight: 500;
	}

	.error-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--danger, #dc3545);
		font-weight: 500;
	}
</style>
