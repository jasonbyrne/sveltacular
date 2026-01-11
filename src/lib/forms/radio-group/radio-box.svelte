<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import Icon from '$src/lib/icons/icon.svelte';

	type RadioValue = string | number | boolean | undefined | null;

	let {
		value = undefined as RadioValue,
		group = $bindable(undefined as string | undefined),
		disabled = false,
		ariaLabel,
		children = undefined,
		onChange = undefined
	}: {
		value?: RadioValue;
		group?: string | undefined;
		disabled?: boolean;
		ariaLabel?: string;
		children?: Snippet;
		onChange?: ((value: string) => void) | undefined;
	} = $props();

	const id = uniqueId();
</script>

<label>
	<input
		type="radio"
		bind:group
		{value}
		{disabled}
		{id}
		aria-label={ariaLabel}
		onchange={() => onChange?.(String(value || ''))}
	/>
	<span class="radio-circle">
		<span class="radio-dot"></span>
	</span>
	{#if !ariaLabel && children}
		<div class="text">
			{@render children?.()}
		</div>
	{/if}
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		line-height: 2rem;
		font-size: 1rem;
		cursor: pointer;

		.radio-circle {
			position: relative;
			width: 1.2rem;
			height: 1.2rem;
			border-radius: 50%;
			border: 1px solid var(--form-input-border, black);
			background-color: var(--form-input-bg, white);
			transition:
				background-color 0.2s ease-in-out,
				border-color 0.2s ease-in-out;
			user-select: none;
			display: flex;
			align-items: center;
			justify-content: center;

			.radio-dot {
				display: none;
				width: 0.5rem;
				height: 0.5rem;
				border-radius: 50%;
				background-color: var(--form-input-selected-bg, #3182ce);
				transition: opacity 0.2s ease-in-out;
			}
		}

		input {
			width: 0;
			height: 0;
			position: absolute;

			&:checked + .radio-circle {
				border-color: var(--form-input-selected-bg, #3182ce);

				.radio-dot {
					display: block;
				}
			}
		}
	}
</style>
