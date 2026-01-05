<script lang="ts">
	import { roundToDecimals } from '$src/lib/helpers/round-to-decimals.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	const id = uniqueId();

	type AllowedInputTypes = 'number' | 'currency';

	let {
		value = $bindable(0 as number | null),
		placeholder = '',
		size = 'full' as FormFieldSizeOptions,
		type = 'number' as AllowedInputTypes,
		min = 0,
		max = 1000000,
		decimals = 0,
		prefix = null as string | null,
		suffix = null as string | null,
		step = 1,
		onChange = undefined,
		label = undefined
	}: {
		value?: number | null;
		placeholder?: string;
		size?: FormFieldSizeOptions;
		type?: AllowedInputTypes;
		min?: number;
		max?: number;
		decimals?: number;
		prefix?: string | null;
		suffix?: string | null;
		step?: number;
		onChange?: ((value: number | null) => void) | undefined;
		label?: string;
	} = $props();

	const valueChanged = () => {
		if (value === null || value === undefined) return;
		if (value < min) value = min;
		if (value > max) value = max;
		value = roundToDecimals(value, decimals);
		onChange?.(value);
	};

	const onInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const newValue = parseFloat(input.value);
		if (isNaN(newValue)) return;
		value = newValue;
	};

	// Don't allow certain characters to be typed into the input
	const onKeyPress = (e: KeyboardEvent) => {
		const isNumber = !isNaN(Number(e.key));
		const isDecimal = e.key === '.';
		const isAllowed = isNumber || isDecimal || ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key);
		if (!isAllowed) return e.preventDefault();
		if (isDecimal && decimals === 0) return e.preventDefault();
		const newValue = `${value}${e.key}`;
		const decimalPart = newValue.split('.')[1];
		if (decimalPart && decimalPart.length > decimals) return e.preventDefault();
	};
</script>

<FormField {size} {label} {id}>
	<div class="input {type}">
		{#if prefix}
			<span class="prefix">{prefix}</span>
		{/if}

		<input
			{id}
			{placeholder}
			bind:value
			type="number"
			{step}
			{min}
			{max}
			onchange={valueChanged}
			oninput={onInput}
			onkeypress={onKeyPress}
		/>

		{#if suffix}
			<span class="suffix">{suffix}</span>
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
