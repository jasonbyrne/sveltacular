<script lang="ts">
	import { roundToDecimals } from '$src/lib/helpers/round-to-decimals.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';
	import { createEventDispatcher } from 'svelte';

	const id = uniqueId();
	const dipatch = createEventDispatcher<{ change: number | null; }>();

	type AllowedInputTypes = 'number' | 'currency';

	export let value: number | null = 0;
	export let placeholder = '';
	export let size: FormFieldSizeOptions = 'full';
	export let type: AllowedInputTypes = 'number';
	export let min = 0;
	export let max = 1000000;
	export let decimals = 0;
	export let prefix: string | null = null;
	export let suffix: string | null = null;
	export let step = 1;

	const valueChanged = () => {
		if (value === null || value === undefined) return;
		if (value < min) value = min;
		if (value > max) value = max;
		value = roundToDecimals(value, decimals);
		dipatch('change', value);
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

<FormField {size}>
	{#if $$slots.default}
		<FormLabel {id}><slot /></FormLabel>
	{/if}
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
			on:change={valueChanged}
			on:input={onInput}
			on:keypress={onKeyPress}
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
		border-radius: 0.25rem;
		border: 1px solid var(--form-input-border, black);
		background-color: var(--form-input-bg, white);
		color: var(--form-input-fg, black);
		font-size: 1rem;
		font-weight: 500;
		line-height: 2rem;
		transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
		user-select: none;
		white-space: nowrap;

		input {
			background-color: transparent;
			border: none;
			line-height: 2rem;
			font-size: 1rem;
			width: 100%;
			flex-grow: 1;
			padding-left: 1rem;

			&:focus {
				outline: none;
			}
		}

		.prefix,
		.suffix {
			font-size: 1rem;
			line-height: 2rem;
			padding-left: 1rem;
			padding-right: 1rem;
			background-color: var(--form-input-accent-bg, #ccc);
			color: var(--form-input-accent-fg, black);
		}

		.prefix {
			border-right: 1px solid var(--form-input-border, black);
		}

		.suffix {
			border-left: 1px solid var(--form-input-border, black);
		}
	}
</style>
