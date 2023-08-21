<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { AllowedTextInputTypes, FormFieldSizeOptions } from '$src/lib/types/form.js';

	const id = uniqueId();

	export let value = '';
	export let placeholder = '';
	export let size: FormFieldSizeOptions = 'full';
	export let disabled = false;
	export let required = false;
	export let readonly = false;
	export let multiple = false;
	export let mimeTypes: string[] = [];
	export let capture: boolean | undefined | 'environment' | 'user' = undefined;
</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel {id} {required}><slot /></FormLabel>
	{/if}
	<div>
		<input
			{id}
			{placeholder}
			{multiple}
			bind:value
			type="file"
			{disabled}
			{readonly}
			{required}
			accept={mimeTypes.join(',')}
			{capture}
		/>
	</div>
</FormField>

<style lang="scss">
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
</style>
