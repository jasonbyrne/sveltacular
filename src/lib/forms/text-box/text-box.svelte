<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { AllowedTextInputTypes, FormFieldSizeOptions } from '$src/lib/types/form.js';
	import { createEventDispatcher } from 'svelte';

	const id = uniqueId();
	const dipatch = createEventDispatcher<{ change: string; input: string }>();

	export let value = '';
	export let placeholder = '';
	export let helperText = '';
	export let size: FormFieldSizeOptions = 'full';
	export let type: AllowedTextInputTypes = 'text';
	export let disabled = false;
	export let required = false;
	export let readonly = false;
	export let maxlength: number | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let prefix: string | undefined = undefined;
	export let suffix: string | undefined = undefined;
	export let allowSpaces = true;
	export let allowNumbers = true;
	export let allowLetters = true;
	export let textCase: 'lower' | 'upper' | undefined = undefined;

	// Don't allow certain characters to be typed into the input
	const onKeyPress = (e: KeyboardEvent) => {
		if (!allowSpaces && e.key === ' ') {
			e.preventDefault();
		}
		if (!allowNumbers && !isNaN(Number(e.key))) {
			e.preventDefault();
		}
		if (!allowLetters && /^[a-zA-Z]$/.test(e.key)) {
			e.preventDefault();
		}
	};

	// When the value changes, make sure it is in the correct case
	const onInput = (e: Event) => {
		if (textCase === 'lower') {
			value = value.toLowerCase();
		} else if (textCase === 'upper') {
			value = value.toUpperCase();
		}
		if (type === 'email') {
			value = value.replace(/\s/g, '');
		}
		if (type === 'tel') {
			value = value.replace(/[^0-9]/g, '');
		}
		if (type === 'url') {
			value = value.replace(/\s/g, '');
		}
		dipatch('input', value);
	};
</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel {id} {required}><slot /></FormLabel>
	{/if}
	<div class="input {disabled ? 'disabled' : 'enabled'}">
		{#if prefix}
			<div class="prefix">{prefix}</div>
		{/if}
		<input
			{id}
			{placeholder}
			bind:value
			{...{ type }}
			{disabled}
			{readonly}
			{required}
			{maxlength}
			{minlength}
			{pattern}
			on:keypress={onKeyPress}
			on:input={onInput}
		/>
		{#if suffix}
			<div class="suffix">{suffix}</div>
		{/if}
	</div>
	{#if helperText}
		<div class="helper-text">{helperText}</div>
	{/if}
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

		&.disabled {
			opacity: 0.5;
		}

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
			background-color: var(--base-accent-bg, #ccc);
			color: var(--base-accent-fg, black);
		}

		.prefix {
			border-right: 1px solid var(--form-input-border, black);
		}

		.suffix {
			border-left: 1px solid var(--form-input-border, black);
		}
	}

	.helper-text {
		font-size: 0.75rem;
		line-height: 1.25rem;
		padding: 0.25rem;
	}
</style>
