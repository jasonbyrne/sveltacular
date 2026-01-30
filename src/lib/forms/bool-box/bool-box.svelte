<script lang="ts">
	import ListBox from '../list-box/list-box.svelte';
	import FormField from '../form-field/form-field.svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import type { ComponentSize } from '$src/lib/index.js';
	import type { FormFieldFeedback } from '../form-field/form-field.svelte';

	type BoolBoxVariant = 'dropdown' | 'switch' | 'checkbox' | 'radio';

	let {
		value = $bindable(false),
		options = ['Yes', 'No'] as [yes: string, no: string],
		size = 'md' as ComponentSize,
		onChange = undefined,
		label = undefined,
		helperText = undefined,
		feedback = undefined,
		disabled = false,
		required = false,
		variant = 'dropdown'
	}: {
		value?: boolean;
		options?: [yes: string, no: string];
		size?: ComponentSize;
		onChange?: ((value: boolean) => void) | undefined;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		disabled?: boolean;
		required?: boolean;
		variant?: BoolBoxVariant;
	} = $props();

	const id = uniqueId();
	let stringValue = $state(value ? 'true' : 'false');

	// Handle dropdown changes
	const handleDropdownChange = () => {
		value = stringValue == 'true';
		onChange?.(value);
	};

	// Handle direct boolean changes (switch, checkbox)
	const handleBooleanChange = () => {
		onChange?.(value);
	};

	// Handle radio changes
	const handleRadioChange = (newValue: boolean) => {
		value = newValue;
		onChange?.(value);
	};

	let items = $derived([
		{ value: 'true', name: options[0] },
		{ value: 'false', name: options[1] }
	]);
</script>

{#if variant === 'dropdown'}
	<ListBox
		{items}
		bind:value={stringValue}
		{size}
		onChange={handleDropdownChange}
		{label}
		{helperText}
		{feedback}
		{disabled}
		{required}
	/>
{:else if variant === 'switch'}
	<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
		<label class="switch-box {value ? 'checked' : ''} {size}">
			<input
				type="checkbox"
				bind:checked={value}
				onchange={handleBooleanChange}
				{id}
				{disabled}
				{required}
			/>
			<span class="switch">
				<span class="slider"></span>
			</span>
			{#if options[0]}
				<span class="text">{value ? options[0] : options[1]}</span>
			{/if}
		</label>
	</FormField>
{:else if variant === 'checkbox'}
	<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
		<label class="checkbox-box {size}">
			<input
				type="checkbox"
				bind:checked={value}
				onchange={handleBooleanChange}
				{id}
				{disabled}
				{required}
			/>
			<span class="checkmark"></span>
			{#if options[0]}
				<span class="text">{value ? options[0] : options[1]}</span>
			{/if}
		</label>
	</FormField>
{:else if variant === 'radio'}
	<FormField {size} {label} id={`${id}-group`} {required} {disabled} {helperText} {feedback}>
		<div class="radio-group {size}">
			<label class="radio-option">
				<input
					type="radio"
					name={id}
					checked={value === true}
					onchange={() => handleRadioChange(true)}
					{disabled}
					{required}
				/>
				<span class="radio-mark"></span>
				<span class="text">{options[0]}</span>
			</label>
			<label class="radio-option">
				<input
					type="radio"
					name={id}
					checked={value === false}
					onchange={() => handleRadioChange(false)}
					{disabled}
					{required}
				/>
				<span class="radio-mark"></span>
				<span class="text">{options[1]}</span>
			</label>
		</div>
	</FormField>
{/if}

<style lang="scss">
	/* Switch Styles */
	.switch-box {
		display: flex;
		align-items: center;
		cursor: pointer;

		input {
			width: 0;
			height: 0;
			position: absolute;
			opacity: 0;
		}

		.switch {
			background-color: var(--form-switch-unchecked-bg);
			position: relative;
			cursor: pointer;
			transition: background-color var(--transition-base) var(--ease-in-out);
			vertical-align: middle;
			flex-shrink: 0;
		}

		.slider {
			border-radius: var(--radius-full);
			position: absolute;
			transition: left var(--transition-base) var(--ease-in-out);
			background-color: var(--form-switch-unchecked-fg);
		}

		&.checked {
			.switch {
				background-color: var(--form-switch-checked-bg, #3182ce);
			}
			.slider {
				background-color: var(--form-switch-checked-fg, white);
			}
		}

		.text {
			margin-left: 0.65rem;
		}

		/* Switch Sizes */
		&.xl {
			.switch {
				width: 4rem;
				height: 2rem;
				border-radius: 1rem;
			}

			.slider {
				width: 1.6rem;
				height: 1.6rem;
				top: 0.2rem;
				left: 0.2rem;
			}

			&.checked .slider {
				left: 2.25rem;
			}

			.text {
				font-size: 1.5rem;
				margin-left: 1rem;
			}
		}

		&.lg {
			.switch {
				width: 3rem;
				height: 1.5rem;
				border-radius: 0.75rem;
			}

			.slider {
				width: 1.2rem;
				height: 1.2rem;
				top: 0.15rem;
				left: 0.15rem;
			}

			&.checked .slider {
				left: 1.65rem;
			}

			.text {
				font-size: 1.2rem;
				margin-left: 0.8rem;
			}
		}

		&.md,
		&.full {
			.switch {
				width: 2.5rem;
				height: 1.4rem;
				border-radius: 0.7rem;
			}

			.slider {
				width: 1.2rem;
				height: 1.2rem;
				top: 0.1rem;
				left: 0.1rem;
			}

			&.checked .slider {
				left: 1.2rem;
			}

			.text {
				font-size: 1rem;
				margin-left: 0.65rem;
			}
		}

		&.sm {
			.switch {
				width: 1.5rem;
				height: 0.75rem;
				border-radius: 0.375rem;
			}

			.slider {
				width: 0.6rem;
				height: 0.6rem;
				top: 0.075rem;
				left: 0.075rem;
			}

			&.checked .slider {
				left: 0.825rem;
			}

			.text {
				font-size: 0.8rem;
				margin-left: 0.5rem;
			}
		}
	}

	/* Checkbox Styles */
	.checkbox-box {
		display: flex;
		align-items: center;
		cursor: pointer;

		input {
			position: absolute;
			opacity: 0;
			width: 0;
			height: 0;
		}

		.checkmark {
			position: relative;
			background-color: var(--form-input-bg, white);
			border: 2px solid var(--form-input-border, #d1d5db);
			border-radius: var(--radius-sm, 0.25rem);
			transition: all var(--transition-base) var(--ease-in-out);
			flex-shrink: 0;
		}

		input:checked ~ .checkmark {
			background-color: var(--form-switch-checked-bg, #3182ce);
			border-color: var(--form-switch-checked-bg, #3182ce);
		}

		.checkmark::after {
			content: '';
			position: absolute;
			display: none;
			left: 35%;
			top: 15%;
			width: 25%;
			height: 50%;
			border: solid white;
			border-width: 0 2px 2px 0;
			transform: rotate(45deg);
		}

		input:checked ~ .checkmark::after {
			display: block;
		}

		input:disabled ~ .checkmark {
			opacity: 0.5;
			cursor: not-allowed;
		}

		.text {
			margin-left: 0.5rem;
		}

		/* Checkbox Sizes */
		&.xl {
			.checkmark {
				width: 2rem;
				height: 2rem;
			}

			.text {
				font-size: 1.5rem;
				margin-left: 1rem;
			}
		}

		&.lg {
			.checkmark {
				width: 1.5rem;
				height: 1.5rem;
			}

			.text {
				font-size: 1.2rem;
				margin-left: 0.8rem;
			}
		}

		&.md,
		&.full {
			.checkmark {
				width: 1.25rem;
				height: 1.25rem;
			}

			.text {
				font-size: 1rem;
			}
		}

		&.sm {
			.checkmark {
				width: 1rem;
				height: 1rem;
			}

			.text {
				font-size: 0.8rem;
			}
		}
	}

	/* Radio Styles */
	.radio-group {
		display: flex;
		gap: 1rem;

		.radio-option {
			display: flex;
			align-items: center;
			cursor: pointer;

			input {
				position: absolute;
				opacity: 0;
				width: 0;
				height: 0;
			}

			.radio-mark {
				position: relative;
				background-color: var(--form-input-bg, white);
				border: 2px solid var(--form-input-border, #d1d5db);
				border-radius: var(--radius-full);
				transition: all var(--transition-base) var(--ease-in-out);
				flex-shrink: 0;
			}

			input:checked ~ .radio-mark {
				border-color: var(--form-switch-checked-bg, #3182ce);
			}

			.radio-mark::after {
				content: '';
				position: absolute;
				display: none;
				border-radius: var(--radius-full);
				background-color: var(--form-switch-checked-bg, #3182ce);
			}

			input:checked ~ .radio-mark::after {
				display: block;
			}

			input:disabled ~ .radio-mark {
				opacity: 0.5;
				cursor: not-allowed;
			}

			.text {
				margin-left: 0.5rem;
			}
		}

		/* Radio Sizes */
		&.xl {
			.radio-mark {
				width: 2rem;
				height: 2rem;
			}

			.radio-mark::after {
				top: 25%;
				left: 25%;
				width: 50%;
				height: 50%;
			}

			.text {
				font-size: 1.5rem;
				margin-left: 1rem;
			}
		}

		&.lg {
			.radio-mark {
				width: 1.5rem;
				height: 1.5rem;
			}

			.radio-mark::after {
				top: 25%;
				left: 25%;
				width: 50%;
				height: 50%;
			}

			.text {
				font-size: 1.2rem;
				margin-left: 0.8rem;
			}
		}

		&.md,
		&.full {
			.radio-mark {
				width: 1.25rem;
				height: 1.25rem;
			}

			.radio-mark::after {
				top: 25%;
				left: 25%;
				width: 50%;
				height: 50%;
			}

			.text {
				font-size: 1rem;
			}
		}

		&.sm {
			.radio-mark {
				width: 1rem;
				height: 1rem;
			}

			.radio-mark::after {
				top: 25%;
				left: 25%;
				width: 50%;
				height: 50%;
			}

			.text {
				font-size: 0.8rem;
			}
		}
	}
</style>
