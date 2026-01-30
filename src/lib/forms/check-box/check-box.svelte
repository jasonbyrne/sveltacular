<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import Icon from '$src/lib/icons/icon.svelte';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import type { ComponentSize } from '$src/lib/types/form.js';

	let {
		value = '',
		isChecked = $bindable(false),
		disabled = false,
		name = undefined,
		onChange = undefined,
		label,
		ariaLabel,
		children,
		size = 'md' as ComponentSize,
		helperText = undefined,
		feedback = undefined,
		required = false,
		inline = false
	}: {
		value?: string;
		isChecked?: boolean;
		disabled?: boolean;
		name?: string | undefined;
		onChange?: ((data: { isChecked: boolean; value: string }) => void) | undefined;
		label?: string;
		ariaLabel?: string;
		children?: Snippet;
		size?: ComponentSize;
		helperText?: string;
		feedback?: FormFieldFeedback;
		required?: boolean;
		inline?: boolean;
	} = $props();

	// Use ariaLabel if provided, otherwise fall back to label for accessibility
	let inputAriaLabel = $derived(ariaLabel ?? label);

	const id = uniqueId();

	const onChecked = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const newChecked = target.checked;
		// Update isChecked (will work whether bound or not)
		isChecked = newChecked;
		// Always notify parent via onChange callback
		onChange?.({ isChecked: newChecked, value });
	};
</script>

{#if inline}
	<label class="checkbox-label">
		<input
			type="checkbox"
			{id}
			{disabled}
			{name}
			{value}
			bind:checked={isChecked}
			onchange={onChecked}
			{required}
			aria-label={inputAriaLabel}
		/>
		<span class="checkbox">
			<span class="checkmark"><Icon type="check" size="sm" fill="#fff" mask /></span>
		</span>
		{#if !ariaLabel}
			{#if children}
				<div class="text">
					{@render children()}
				</div>
			{:else if label}
				<div class="text">
					{label}
				</div>
			{/if}
		{/if}
	</label>
{:else}
	<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
		<label class="checkbox-label">
			<input
				type="checkbox"
				{id}
				{disabled}
				{name}
				{value}
				bind:checked={isChecked}
				onchange={onChecked}
				{required}
				aria-label={inputAriaLabel}
			/>
			<span class="checkbox">
				<span class="checkmark"> <Icon type="check" size="sm" fill="#fff" mask /></span>
			</span>
			{#if children}
				<div class="text">
					{@render children()}
				</div>
			{:else if label}
				<div class="text">
					{label}
				</div>
			{/if}
		</label>
	</FormField>
{/if}

<style lang="scss">
	.checkbox-label {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		cursor: pointer;

		.text {
			display: block;
			margin-left: var(--spacing-sm);
			font-size: var(--font-md);
			line-height: 2rem;
		}

		.checkbox {
			position: relative;
			display: block;
			width: var(--spacing-base);
			height: var(--spacing-base);
			border: var(--border-thin) solid var(--form-input-border);
			background-color: var(--form-input-bg);
			color: var(--form-input-fg);
			transition:
				background-color var(--transition-base) var(--ease-in-out),
				border-color var(--transition-base) var(--ease-in-out),
				color var(--transition-base) var(--ease-in-out),
				fill var(--transition-base) var(--ease-in-out),
				stroke var(--transition-base) var(--ease-in-out);
			user-select: none;

			.checkmark {
				display: none;
				position: absolute;
				top: 0;
				left: 0;
				width: 0;
				height: 0;
				line-height: 100%;
				background-color: var(--form-input-selected-bg);
				color: var(--form-input-selected-fg);
				fill: var(--form-input-selected-bg);
				stroke: var(--form-input-selected-fg);
				transition:
					width var(--transition-base) var(--ease-in-out),
					height var(--transition-base) var(--ease-in-out);
			}
		}

		input {
			width: 0;
			height: 0;

			&:checked + .checkbox {
				background-color: var(--form-input-bg);
				border-color: var(--form-input-border);

				.checkmark {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
