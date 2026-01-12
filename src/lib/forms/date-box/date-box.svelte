<script lang="ts">
	import { untrack } from 'svelte';
	import {
		addUnits,
		currentDateTime,
		isDateString,
		isDateOrDateTimeString,
		isDateTimeString
	} from '$src/lib/helpers/date.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import type { DateUnit, FormFieldSizeOptions } from '$src/lib/index.js';
	import Button from '../button/button.svelte';

	type DateIncrementStep = { label: string; value: number; unit: DateUnit };

	const id = uniqueId();

	let {
		value = $bindable(undefined as string | undefined | null),
		defaultValue = undefined,
		size = 'full' as FormFieldSizeOptions,
		placeholder = '',
		nullable = false,
		disabled = false,
		type = 'date' as 'date' | 'datetime-local',
		required = false,
		steps = [] as DateIncrementStep[],
		onChange = undefined,
		onCheckChanged = undefined,
		onInput = undefined,
		onFocus = undefined,
		onBlur = undefined,
		label = undefined,
		helperText = undefined,
		nullText = '-- / -- / ----',
		feedback = undefined
	}: {
		value?: string | undefined | null;
		defaultValue?: string | undefined;
		size?: FormFieldSizeOptions;
		placeholder?: string;
		nullable?: boolean;
		disabled?: boolean;
		type?: 'date' | 'datetime-local';
		required?: boolean;
		steps?: DateIncrementStep[];
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

	const getDefaultValue = () => {
		const _defaultValue = defaultValue || value || currentDateTime();
		if (type === 'date') {
			return isDateString(_defaultValue) ? _defaultValue : currentDateTime().substring(0, 10);
		}
		return isDateTimeString(_defaultValue) ? _defaultValue : currentDateTime();
	};

	const checkChanged = () => {
		if (nullable) {
			if (isChecked) {
				// Restore last value if available, otherwise use default
				value = lastValue || getDefaultValue();
			} else {
				// Store current value before clearing
				if (value) {
					lastValue = value;
				}
				value = '';
			}
		}
		onCheckChanged?.(isChecked);
		handleInput();
	};

	const incrementValue = (step: DateIncrementStep) => {
		if (isDateOrDateTimeString(value)) {
			const newDate = addUnits(step.value, step.unit, value);
			newDate.setUTCDate(newDate.getUTCDate() + step.value);
			value = newDate.toISOString().substring(0, type === 'date' ? 10 : 19);
		}
	};

	const handleInput = () => {
		const currentValue = !nullable || isChecked ? value : null;
		// Remember the value if it's not empty
		if (isChecked && value) {
			lastValue = value;
		}
		onChange?.(currentValue);
		onInput?.(currentValue);
	};

	$effect(() => {
		if (!value) {
			// Use untrack to prevent writes to isChecked/value from triggering this effect again
			untrack(() => {
				if (nullable) isChecked = false;
				else value = getDefaultValue();
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
	<div class:nullable class:disabled>
		<span class="input">
			{#if showInput}
				<input
					{...{ type }}
					{id}
					{placeholder}
					disabled={inputDisabled}
					bind:value
					{required}
					oninput={handleInput}
					onfocus={onFocus}
					onblur={onBlur}
				/>
			{:else}
				<div class="input-null-text">
					{nullText || '-- / -- / ----'}
				</div>
			{/if}
		</span>
		{#if nullable}
			<span class="toggle">
				<input type="checkbox" bind:checked={isChecked} onchange={checkChanged} />
			</span>
		{/if}
		{#if steps.length > 0}
			<span class="steps">
				{#each steps as step}
					<Button
						noMargin={true}
						collapse={true}
						onClick={() => incrementValue(step)}
						label={step.label}
					/>
				{/each}
			</span>
		{/if}
	</div>
</FormField>

<style lang="scss">
	div {
		display: flex;
		position: relative;
		gap: 0.5rem;

		.input {
			flex-grow: 1;
			display: flex;
			align-items: center;
			position: relative;
			border-radius: var(--radius-md);
			border: var(--border-thin) solid var(--form-input-border);
			background-color: var(--form-input-bg);
			color: var(--form-input-fg);
			font-size: 0.875rem;
			font-weight: 500;
			line-height: 1.25rem;
			transition:
				background-color var(--transition-base) var(--ease-in-out),
				border-color var(--transition-base) var(--ease-in-out),
				color var(--transition-base) var(--ease-in-out);
			user-select: none;
			white-space: nowrap;

			input {
				background-color: transparent;
				border: none;
				color: inherit;
				font-size: inherit;
				font-weight: inherit;
				line-height: inherit;
				width: 100%;
				flex-grow: 1;
				padding: 0.5rem 1rem;
				margin: 0;
				box-sizing: border-box;

				&:focus {
					outline: none;
				}

				&:focus-visible {
					outline: 2px solid var(--focus-ring, #007bff);
					outline-offset: 2px;
				}

				&::placeholder {
					color: var(--form-input-placeholder, #a0aec0);
				}

				&:disabled {
					cursor: not-allowed;
				}
			}

			.input-null-text {
				width: 100%;
				padding: 0.5rem 1rem;
				margin: 0;
				font-size: inherit;
				line-height: inherit;
				display: flex;
				align-items: center;
				box-sizing: border-box;
			}
		}

		.steps {
			display: flex;
			gap: 0.25rem;
		}

		&:focus-within .input {
			border-color: var(--form-input-border-focus, #3182ce);
		}

		&.nullable {
			.input {
				input,
				.input-null-text {
					padding-left: 2.5rem;
				}
			}

			.toggle {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0.4rem;
				z-index: 1;
			}
		}

		&.disabled {
			.input {
				opacity: 0.5;
			}
		}
	}
</style>
