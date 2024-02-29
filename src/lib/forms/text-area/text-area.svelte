<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	const id = uniqueId();

	export let size: FormFieldSizeOptions = 'full';
	export let value: string | null = '';
	export let placeholder = '';
	export let rows = 4;
	export let disabled = false;
	export let required = false;
	export let readonly = false;
</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel {id} {required}><slot /></FormLabel>
	{/if}
	<textarea wrap="soft" {id} {placeholder} {rows} bind:value {required} {disabled} {readonly} />
</FormField>

<style lang="scss">
	textarea {
		width: 100%;
		height: auto;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		border: 1px solid var(--form-input-border, black);
		background-color: var(--form-input-bg, white);
		color: var(--form-input-fg, black);
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out;
		user-select: none;
		resize: vertical;
		white-space: normal;

		&::placeholder {
			color: var(--form-input-placeholder, #a0aec0);
		}
	}
</style>
