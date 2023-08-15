<script lang="ts">
	import { roundToDecimals } from '$src/helpers/round-to-decimals.js';
	import { uniqueId } from '$src/helpers/unique-id.js';
	import FormField from '$src/lib/atoms/form-field.svelte';
	import FormLabel from '$src/lib/atoms/form-label.svelte';
	import type { FormFieldSizeOptions } from '$src/types/form.js';

	const id = uniqueId();

	type AllowedInputTypes = 'number' | 'currency';

	export let value = 0;
	export let placeholder = '';
	export let size: FormFieldSizeOptions = 'md';
	export let type: AllowedInputTypes = 'number';
	export let step = 1;
	export let min = 0;
	export let max = 1000000;
	export let decimals = 0;
	export let symbol: string | null = null;

	$: hasSymbol = symbol !== null;

	const valueChanged = () => {
		value = roundToDecimals(value, decimals);
	};
</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel {id}><slot /></FormLabel>
	{/if}
	<div class={type} class:hasSymbol>
		<input
			{id}
			{placeholder}
			bind:value
			type="number"
			{step}
			{min}
			{max}
			on:change={valueChanged}
		/>
		{#if symbol}
			<span class="symbol">{symbol}</span>
		{/if}
	</div>
</FormField>

<style lang="scss">
	div {
		position: relative;

		.symbol {
			position: absolute;
			top: 0.32rem;
			left: 0.5rem;
			color: #000;
			font-size: 1.125rem;
			line-height: 1.75rem;
		}

		input {
			width: 100%;
			padding: 0.5rem 1rem;
			border-radius: 0.25rem;
			border: 1px solid #b7b7b7;
			background-color: #fff;
			color: #5c5c5c;
			font-size: 0.875rem;
			font-weight: 500;
			line-height: 1.25rem;
			transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
				color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out,
				box-shadow 0.2s ease-in-out;
			user-select: none;
			white-space: nowrap;
		}

		&.hasSymbol {
			input {
				padding-left: 2rem;
			}
		}
	}
</style>
