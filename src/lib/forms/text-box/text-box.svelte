<script lang="ts">
	import { untrack } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import { animateShake, animateScaleIn } from '$src/lib/helpers/animations.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import Icon from '$src/lib/icons/icon.svelte';
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
		onFocus?: ((e: FocusEvent) => void) | undefined;
		onBlur?: ((e: FocusEvent) => void) | undefined;
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
	let showInput = $derived(!nullable || isChecked);

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

	// Trigger shake animation when error appears (track previous error state)
	let prevHasError = $state(false);
	$effect(() => {
		if (hasError && !prevHasError && inputElement) {
			// Use untrack to prevent animation from triggering effect again
			untrack(() => {
				animateShake(inputElement!); // Already checked above
			});
		}
		prevHasError = hasError;
	});

	// Trigger scale-in animation when success appears (track previous success state)
	let prevHasSuccess = $state(false);
	$effect(() => {
		if (hasSuccess && !prevHasSuccess && successIconElement) {
			// Use untrack to prevent animation from triggering effect again
			untrack(() => {
				animateScaleIn(successIconElement!); // Already checked above
			});
		}
		prevHasSuccess = hasSuccess;
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
	<div
		class="input {disabled ? 'disabled' : 'enabled'}"
		class:error={hasError}
		class:success={hasSuccess}
		class:nullable
		bind:this={inputElement}
	>
		{#if prefix}
			<div class="prefix">{prefix}</div>
		{/if}
		{#if showInput}
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
				onkeypress={onKeyPress}
				oninput={handleInput}
				onfocus={onFocus}
				onblur={onBlur}
			/>
		{:else}
			<div class="input-null-text">
				{effectiveNullText}
			</div>
		{/if}
		{#if isLoading}
			<div class="loading-indicator" aria-label="Loading">
				<div class="spinner"></div>
			</div>
		{:else if hasSuccess}
			<div class="success-indicator" bind:this={successIconElement}>
				<Icon type="check" size="sm" />
			</div>
		{/if}
		{#if suffix}
			<div class="suffix">{suffix}</div>
		{/if}
		{#if nullable}
			<span class="toggle">
				<input type="checkbox" bind:checked={isChecked} onchange={checkChanged} />
			</span>
		{/if}
	</div>
	{#if showCharacterCount && maxlength}
		<div class="character-count {characterLimitClass}">
			{characterCount} / {maxlength}
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

		&.nullable {
			.toggle {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0.4rem;
				z-index: 1;
			}

			// When there's a prefix, only the prefix needs padding
			.prefix {
				padding-left: 2.5rem;
			}

			// When there's NO prefix, the input and null text need padding
			&:not(:has(.prefix)) {
				input,
				.input-null-text {
					padding-left: 2.5rem;
				}
			}
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

			&:disabled {
				cursor: not-allowed;
			}
		}

		.input-null-text {
			font-size: var(--font-md);
			line-height: 2rem;
			text-align: left;
			padding-left: var(--spacing-base);
			margin: 0;
			flex-grow: 1;
			display: flex;
			align-items: center;
			box-sizing: border-box;
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
