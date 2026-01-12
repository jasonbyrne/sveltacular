<script lang="ts">
	import { roundToDecimals } from '$src/lib/helpers/round-to-decimals.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import FormInputWrapper from '$src/lib/forms/form-input-wrapper';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	const baseId = uniqueId();

	// Generate unique IDs for each dimension input
	function getDimensionId(index: number) {
		return `${baseId}-dimension-${index}`;
	}

	let {
		dimensions = ['Width', 'Depth', 'Height'] as string[],
		value = $bindable([] as (number | null)[]),
		minAllowed = 0,
		maxAllowed = 99999,
		step = 1,
		decimals = 0,
		prefix = null as string | null,
		suffix = null as string | null,
		required = false,
		size = 'full' as FormFieldSizeOptions,
		label = undefined as string | undefined,
		helperText = undefined as string | undefined,
		feedback = undefined as FormFieldFeedback | undefined,
		disabled = false,
		onChange = undefined as ((value: (number | null)[]) => void) | undefined
	}: {
		dimensions?: string[];
		value?: (number | null)[];
		minAllowed?: number;
		maxAllowed?: number;
		step?: number;
		decimals?: number;
		prefix?: string | null;
		suffix?: string | null;
		required?: boolean;
		size?: FormFieldSizeOptions;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		disabled?: boolean;
		onChange?: ((value: (number | null)[]) => void) | undefined;
	} = $props();

	// Ensure value array matches dimensions array length
	$effect(() => {
		if (dimensions.length > 0 && value.length !== dimensions.length) {
			const newValue = Array(dimensions.length)
				.fill(null)
				.map((_, i) => (i < value.length && value[i] !== undefined ? value[i] : null));
			value = newValue;
		}
	});

	const handleChange = (index: number) => {
		const currentValue = value[index];

		if (currentValue === null || currentValue === undefined) {
			onChange?.(value);
			return;
		}

		// Round to decimals
		value[index] = roundToDecimals(currentValue, decimals);

		// Ensure value is within allowed range
		if (value[index]! < minAllowed) {
			value[index] = minAllowed;
		}
		if (value[index]! > maxAllowed) {
			value[index] = maxAllowed;
		}

		onChange?.(value);
	};

	const onInput = (e: Event, index: number) => {
		const input = e.target as HTMLInputElement;
		const newValue = parseFloat(input.value);
		if (isNaN(newValue)) {
			value[index] = null;
			return;
		}
		value[index] = newValue;
	};

	// Don't allow certain characters to be typed into the input
	const onKeyPress = (e: KeyboardEvent) => {
		const isNumber = !isNaN(Number(e.key));
		const isDecimal = e.key === '.';
		const allowDecimals = decimals > 0;
		const isAllowed =
			isNumber ||
			isDecimal ||
			['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', '-'].includes(e.key);
		if (!isAllowed) return e.preventDefault();
		if (isDecimal && !allowDecimals) return e.preventDefault();
	};

	const getPlaceholder = (dimension: string) => {
		return dimension;
	};

	let hasError = $derived(!!feedback?.isError);
</script>

<FormField {size} {label} id={getDimensionId(0)} {required} {disabled} {helperText} {feedback}>
	<div class="dimension-inputs">
		{#each dimensions as dimension, index}
			<div class="input-group">
				<FormInputWrapper
					{disabled}
					error={hasError}
					prefix={prefix || undefined}
					suffix={suffix || undefined}
				>
					<input
						id={getDimensionId(index)}
						type="number"
						placeholder={getPlaceholder(dimension)}
						min={minAllowed}
						max={maxAllowed}
						{step}
						bind:value={value[index]}
						onchange={() => handleChange(index)}
						oninput={(e) => onInput(e, index)}
						onkeypress={onKeyPress}
						{required}
						{disabled}
					/>
				</FormInputWrapper>
			</div>
			{#if index < dimensions.length - 1}
				<span class="separator">×</span>
			{/if}
		{/each}
	</div>
</FormField>

<style lang="scss">
	.dimension-inputs {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		width: 100%;
	}

	.input-group {
		flex: 1;
	}

	.separator {
		font-size: var(--font-lg);
		font-weight: 500;
		color: var(--form-input-fg);
		user-select: none;
		flex-shrink: 0;
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
</style>
