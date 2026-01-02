<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	const id = uniqueId();

	let {
		value = $bindable(''),
		placeholder = '',
		size = 'full' as FormFieldSizeOptions,
		disabled = false,
		required = false,
		readonly = false,
		multiple = false,
		mimeTypes = [],
		capture = undefined as boolean | undefined | 'environment' | 'user',
		label
	}: {
		value?: string;
		placeholder?: string;
		size?: FormFieldSizeOptions;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		multiple?: boolean;
		mimeTypes?: string[];
		capture?: boolean | undefined | 'environment' | 'user';
		label?: string;
	} = $props();
</script>

<FormField {size}>
	{#if label}
		<FormLabel {id} {required} {label} />
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
		padding: var(--spacing-sm) var(--spacing-base);
		border-radius: var(--radius-md);
		border: var(--border-thin) solid var(--form-input-border);
		background-color: var(--form-input-bg);
		color: var(--form-input-fg);
		font-size: var(--font-base);
		font-weight: 500;
		line-height: 1.25rem;
		transition:
			background-color 0.2s ease-in-out,
			border-color 0.2s ease-in-out,
			color 0.2s ease-in-out,
			fill 0.2s ease-in-out,
			stroke 0.2s ease-in-out;
		user-select: none;
		white-space: nowrap;

		&::placeholder {
			color: var(--form-input-placeholder, #888);
			font-style: italic;
		}
	}
</style>
