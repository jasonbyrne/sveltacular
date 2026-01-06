<script lang="ts">
	import { roundToDecimals } from '$src/lib/helpers/round-to-decimals.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field/form-field.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	const minId = uniqueId();
	const maxId = uniqueId();

	let {
		minValue = $bindable(null as number | null),
		maxValue = $bindable(null as number | null),
		minAllowed = 0,
		maxAllowed = 99999,
		step = 1,
		allowDecimals = false,
		minPlaceholder = '0',
		maxPlaceholder = 'No limit',
		prefix = null as string | null,
		suffix = null as string | null,
		stickyEnd = false,
		required = false,
		size = 'full' as FormFieldSizeOptions,
		label = undefined as string | undefined,
		onChange = undefined as ((minValue: number | null, maxValue: number | null) => void) | undefined
	}: {
		minValue?: number | null;
		maxValue?: number | null;
		minAllowed?: number;
		maxAllowed?: number;
		step?: number;
		allowDecimals?: boolean;
		minPlaceholder?: string;
		maxPlaceholder?: string;
		prefix?: string | null;
		suffix?: string | null;
		stickyEnd?: boolean;
		required?: boolean;
		size?: FormFieldSizeOptions;
		label?: string;
		onChange?: ((minValue: number | null, maxValue: number | null) => void) | undefined;
	} = $props();

	const handleChange = () => {
		// Calculate decimal places from step (e.g., step 0.1 = 1 decimal, step 0.01 = 2 decimals)
		const decimalPlaces = step < 1 ? Math.abs(Math.log10(step)) : 0;

		// If no decimals, must round to integer
		if (!allowDecimals) {
			if (minValue !== null) minValue = Math.round(minValue);
			if (maxValue !== null) maxValue = Math.round(maxValue);
		}
		// If decimals, must round to step precision
		else {
			if (minValue !== null) minValue = roundToDecimals(minValue, decimalPlaces);
			if (maxValue !== null) maxValue = roundToDecimals(maxValue, decimalPlaces);
		}

		// Ensure min value is not less than minAllowed
		if (minValue !== null && minValue < minAllowed) {
			minValue = minAllowed;
		}

		// Ensure max value is not greater than maxAllowed
		if (maxValue !== null && maxValue > maxAllowed) {
			maxValue = maxAllowed;
		}

		// Ensure max value is greater than or equal to min value
		if (minValue !== null && maxValue !== null && minValue > maxValue) {
			maxValue = minValue;
		}

		onChange?.(minValue, maxValue);
	};

	const handleMinChange = () => {
		if (stickyEnd) {
			maxValue = minValue;
		}
		handleChange();
	};

	const onInput = (e: Event, isMin: boolean) => {
		const input = e.target as HTMLInputElement;
		const newValue = parseFloat(input.value);
		if (isNaN(newValue)) {
			if (isMin) minValue = null;
			else maxValue = null;
			return;
		}
		if (isMin) minValue = newValue;
		else maxValue = newValue;
	};

	// Don't allow certain characters to be typed into the input
	const onKeyPress = (e: KeyboardEvent, isMin: boolean) => {
		const isNumber = !isNaN(Number(e.key));
		const isDecimal = e.key === '.';
		const isAllowed =
			isNumber ||
			isDecimal ||
			['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', '-'].includes(e.key);
		if (!isAllowed) return e.preventDefault();
		if (isDecimal && !allowDecimals) return e.preventDefault();
	};
</script>

<FormField {size} {label} id={minId} {required}>
	<div class="number-range-inputs">
		<div class="input-group">
			<div class="input">
				{#if prefix}
					<span class="prefix">{prefix}</span>
				{/if}
				<input
					id={minId}
					type="number"
					placeholder={minPlaceholder}
					min={minAllowed}
					max={maxAllowed}
					{step}
					bind:value={minValue}
					onchange={handleMinChange}
					oninput={(e) => onInput(e, true)}
					onkeypress={(e) => onKeyPress(e, true)}
					{required}
				/>
				{#if suffix}
					<span class="suffix">{suffix}</span>
				{/if}
			</div>
		</div>
		<div class="input-group">
			<div class="input">
				{#if prefix}
					<span class="prefix">{prefix}</span>
				{/if}
				<input
					id={maxId}
					type="number"
					placeholder={maxPlaceholder}
					min={minAllowed}
					max={maxAllowed}
					{step}
					bind:value={maxValue}
					onchange={handleChange}
					oninput={(e) => onInput(e, false)}
					onkeypress={(e) => onKeyPress(e, false)}
					{required}
				/>
				{#if suffix}
					<span class="suffix">{suffix}</span>
				{/if}
			</div>
		</div>
	</div>
</FormField>

<style lang="scss">
	.number-range-inputs {
		display: flex;
		gap: var(--spacing-md);
		width: 100%;
	}

	.input-group {
		flex: 1;
	}

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

		input {
			background-color: transparent;
			border: none;
			line-height: 2rem;
			font-size: var(--font-md);
			width: 100%;
			flex-grow: 1;
			padding-left: var(--spacing-base);
			padding-right: var(--spacing-base);

			&:focus {
				outline: none;
			}

			&::placeholder {
				color: var(--form-input-placeholder);
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
</style>
