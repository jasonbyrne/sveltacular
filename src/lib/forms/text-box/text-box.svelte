<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { AllowedTextInputTypes, FormFieldSizeOptions } from '$src/lib/types/form.js';

	const id = uniqueId();

	export let value = '';
	export let placeholder = '';
	export let helperText = '';
	export let size: FormFieldSizeOptions = 'md';
	export let type: AllowedTextInputTypes = 'text';
	export let disabled = false;
	export let required = false;
	export let readonly = false;
	export let maxlength: number | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let units: string | undefined = undefined;
</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel {id} {required}><slot /></FormLabel>
	{/if}
	<div>
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
		/>
		{#if helperText}
			<div class="helper-text">{helperText}</div>
		{/if}
		{#if units}
			<div class="units">{units}</div>
		{/if}
	</div>
</FormField>

<style lang="scss">
	div {
		position: relative;

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

			&::placeholder {
				color: #b7b7b7;
				font-style: italic;
			}
		}

		.units {
			position: absolute;
			top: 0.32rem;
			right: 1rem;
			color: #888;
			font-size: 1rem;
			line-height: 1.75rem;
			text-align: right;
		}

		.helper-text {
			font-size: 0.75rem;
			font-weight: 300;
			line-height: 1.2rem;
			display: none;
		}

		input:focus {
			& + .helper-text {
				display: block;
			}
		}
	}
</style>
