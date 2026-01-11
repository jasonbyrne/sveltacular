<script lang="ts">
	import { roundToDecimals } from '$src/lib/helpers/round-to-decimals.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field/form-field.svelte';
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
</script>

<FormField {size} {label} id={getDimensionId(0)} {required}>
	<div class="dimension-inputs">
		{#each dimensions as dimension, index}
			<div class="input-group">
				<div class="input">
					{#if prefix}
						<span class="prefix">{prefix}</span>
					{/if}
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
					/>
					{#if suffix}
						<span class="suffix">{suffix}</span>
					{/if}
				</div>
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
