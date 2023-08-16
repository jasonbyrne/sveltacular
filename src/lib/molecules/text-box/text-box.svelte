<script lang="ts">
	import { uniqueId } from '$src/helpers/unique-id.js';
	import FormField from '$src/lib/atoms/form-field.svelte';
	import FormLabel from '$src/lib/atoms/form-label.svelte';
	import type { FormFieldSizeOptions } from '$src/types/form.js';

	const id = uniqueId();

	type AllowedInputTypes = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

	export let value = '';
	export let placeholder = '';
	export let size: FormFieldSizeOptions = 'md';
	export const type: AllowedInputTypes = 'text';
</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel {id}><slot /></FormLabel>
	{/if}
	<div>
		<input {id} {placeholder} bind:value {...{ type }} />
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
