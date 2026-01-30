<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import type { ComponentSize } from '$src/lib/types/form.js';

	const id = uniqueId();

	let {
		value = $bindable(50 as number),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		required = false,
		size = 'md' as ComponentSize,
		showTooltip = true,
		showValue = true,
		formatValue = undefined,
		onChange = undefined,
		label = undefined,
		helperText = undefined,
		feedback = undefined
	}: {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		required?: boolean;
		size?: ComponentSize;
		showTooltip?: boolean;
		showValue?: boolean;
		formatValue?: ((value: number) => string) | undefined;
		onChange?: ((value: number) => void) | undefined;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
	} = $props();

	let isDragging = $state(false);
	let sliderRef: HTMLInputElement | null = $state(null);

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = Number(target.value);
		onChange?.(value);
	};

	const handleMouseDown = () => {
		isDragging = true;
	};

	const handleMouseUp = () => {
		isDragging = false;
	};

	let percentage = $derived(((value - min) / (max - min)) * 100);
	let displayValue = $derived(formatValue ? formatValue(value) : String(value));
</script>

<FormField {size} {label} {id} {disabled} {required} {helperText} {feedback}>
	<div class="slider-wrapper">
		<div class="slider-track-container">
			<input
				bind:this={sliderRef}
				{id}
				type="range"
				{min}
				{max}
				{step}
				{disabled}
				{required}
				bind:value
				oninput={handleInput}
				onmousedown={handleMouseDown}
				onmouseup={handleMouseUp}
				ontouchstart={handleMouseDown}
				ontouchend={handleMouseUp}
				aria-label={label || 'Slider'}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				aria-valuetext={displayValue}
			/>
			{#if showTooltip && (isDragging || sliderRef === document.activeElement)}
				<div class="slider-tooltip" style="left: {percentage}%;" role="tooltip" aria-live="polite">
					{displayValue}
				</div>
			{/if}
		</div>
		{#if showValue}
			<div class="value-display">{displayValue}</div>
		{/if}
	</div>
</FormField>

<style lang="scss">
	.slider-wrapper {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		min-height: 2rem;

		.slider-track-container {
			position: relative;
			width: 100%;
			flex: 1;
		}

		input[type='range'] {
			width: 100%;
			height: 0.5rem;
			border-radius: var(--radius-md);
			background: var(--form-input-border, #ccc);
			outline: none;
			-webkit-appearance: none;
			appearance: none;
			position: relative;
			z-index: 1;
			margin: 0;

			&::-webkit-slider-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: 1.25rem;
				height: 1.25rem;
				border-radius: 50%;
				background: var(--form-input-selected-bg, #3182ce);
				cursor: pointer;
				transition:
					transform 0.15s ease-in-out,
					box-shadow 0.15s ease-in-out;

				&:hover {
					transform: scale(1.1);
					box-shadow: 0 2px 8px rgba(49, 130, 206, 0.4);
				}

				&:active {
					transform: scale(1.15);
					box-shadow: 0 2px 12px rgba(49, 130, 206, 0.5);
				}
			}

			&::-moz-range-thumb {
				width: 1.25rem;
				height: 1.25rem;
				border-radius: 50%;
				background: var(--form-input-selected-bg, #3182ce);
				cursor: pointer;
				border: none;
				transition:
					transform 0.15s ease-in-out,
					box-shadow 0.15s ease-in-out;

				&:hover {
					transform: scale(1.1);
					box-shadow: 0 2px 8px rgba(49, 130, 206, 0.4);
				}

				&:active {
					transform: scale(1.15);
					box-shadow: 0 2px 12px rgba(49, 130, 206, 0.5);
				}
			}

			&:focus-visible {
				outline: 2px solid var(--focus-ring-color, #3b82f6);
				outline-offset: 2px;
			}

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;

				&::-webkit-slider-thumb,
				&::-moz-range-thumb {
					cursor: not-allowed;
				}
			}
		}

		.slider-tooltip {
			position: absolute;
			top: -2.5rem;
			transform: translateX(-50%);
			padding: 0.375rem 0.625rem;
			background-color: var(--tooltip-bg, #000);
			color: var(--tooltip-fg, #fff);
			border-radius: var(--radius-md, 0.25rem);
			font-size: var(--font-sm, 0.875rem);
			white-space: nowrap;
			pointer-events: none;
			box-shadow: var(--shadow-lg, 0 2px 8px rgba(0, 0, 0, 0.15));
			animation: tooltip-fade-in 0.15s ease-out;
			z-index: 10;

			&::after {
				content: '';
				position: absolute;
				top: 100%;
				left: 50%;
				transform: translateX(-50%);
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 5px 5px 0 5px;
				border-color: var(--tooltip-bg, #000) transparent transparent transparent;
			}
		}

		@keyframes tooltip-fade-in {
			from {
				opacity: 0;
				transform: translateX(-50%) translateY(-4px);
			}
			to {
				opacity: 1;
				transform: translateX(-50%) translateY(0);
			}
		}

		.value-display {
			text-align: center;
			margin-left: var(--spacing-base);
			font-size: var(--font-md);
			color: var(--form-input-fg, #000);
			font-weight: 500;
			line-height: 2rem;
			min-width: 3rem;
			flex-shrink: 0;
		}
	}
</style>
