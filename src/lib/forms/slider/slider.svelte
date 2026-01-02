<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { ComponentSize } from '$src/lib/types/size.js';

	const id = uniqueId();

	let {
		value = $bindable(50 as number),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		size = 'full' as ComponentSize,
		onChange = undefined,
		label = undefined
	}: {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		size?: ComponentSize;
		onChange?: ((value: number) => void) | undefined;
		label?: string;
	} = $props();

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = Number(target.value);
		onChange?.(value);
	};

	let percentage = $derived(((value - min) / (max - min)) * 100);
</script>

<FormField {size}>
	{#if label}
		<FormLabel {id} {label} />
	{/if}
	<div class="slider-wrapper">
		<input
			{id}
			type="range"
			{min}
			{max}
			{step}
			{disabled}
			bind:value
			oninput={handleInput}
			aria-label={label || 'Slider'}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
		/>
		<div class="value-display">{value}</div>
	</div>
</FormField>

<style lang="scss">
	.slider-wrapper {
		position: relative;
		width: 100%;
		padding: 0.5rem 0;

		input[type='range'] {
			width: 100%;
			height: 0.5rem;
			border-radius: 0.25rem;
			background: var(--form-input-border, #ccc);
			outline: none;
			-webkit-appearance: none;
			appearance: none;

			&::-webkit-slider-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: 1.25rem;
				height: 1.25rem;
				border-radius: 50%;
				background: var(--form-input-selected-bg, #3182ce);
				cursor: pointer;
			}

			&::-moz-range-thumb {
				width: 1.25rem;
				height: 1.25rem;
				border-radius: 50%;
				background: var(--form-input-selected-bg, #3182ce);
				cursor: pointer;
				border: none;
			}

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}

		.value-display {
			text-align: center;
			margin-top: 0.5rem;
			font-size: 0.875rem;
			color: var(--form-input-fg, #000);
		}
	}
</style>

