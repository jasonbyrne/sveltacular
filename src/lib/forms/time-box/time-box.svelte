<script lang="ts">
	import { untrack } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import type { ComponentSize } from '$src/lib/types/size.js';

	const id = uniqueId();

	let {
		value = $bindable('' as string | null),
		size = 'full' as ComponentSize,
		nullable = false,
		disabled = false,
		required = false,
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
		size?: ComponentSize;
		nullable?: boolean;
		disabled?: boolean;
		required?: boolean;
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
	<div class="input" class:nullable class:disabled>
		{#if showInput}
			<input
				{id}
				type="time"
				bind:value
				disabled={inputDisabled}
				{required}
				oninput={handleInput}
				onchange={handleChange}
				onfocus={onFocus}
				onblur={onBlur}
				aria-required={required}
			/>
		{:else}
			<div class="input-null-text">
				{nullText || '-- : -- : --'}
			</div>
		{/if}
		{#if nullable}
			<span class="toggle">
				<input type="checkbox" bind:checked={isChecked} onchange={checkChanged} />
			</span>
		{/if}
	</div>
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
			color var(--transition-base) var(--ease-in-out);
		user-select: none;
		white-space: nowrap;

		&.disabled {
			opacity: 0.5;
		}

		&.nullable {
			input[type='time'] {
				padding: 0 var(--spacing-base) 0 2.5rem;
			}

			.toggle {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0.4rem;
				z-index: 1;
			}
		}

		input[type='time'] {
			background-color: transparent;
			border: none;
			line-height: 2rem;
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
		}

		&:focus-within {
			border-color: var(--form-input-border-focus, #3182ce);
		}

		.input-null-text {
			font-size: var(--font-md);
			line-height: 2rem;
			text-align: left;
			padding: 0 var(--spacing-base) 0 2.5rem;
			margin: 0;
			flex-grow: 1;
			display: flex;
			align-items: center;
			box-sizing: border-box;
		}
	}
</style>
