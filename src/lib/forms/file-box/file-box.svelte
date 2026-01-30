<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field/form-field.svelte';
	import FormInputWrapper from '$src/lib/forms/form-input-wrapper';
	import type { ComponentSize } from '$src/lib/types/form.js';

	const id = uniqueId();

	let {
		value = $bindable(''),
		placeholder = '',
		size = 'md' as ComponentSize,
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
		size?: ComponentSize;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		multiple?: boolean;
		mimeTypes?: string[];
		capture?: boolean | undefined | 'environment' | 'user';
		label?: string;
	} = $props();
</script>

<FormField {size} {label} {id} {required} {disabled}>
	<FormInputWrapper {disabled}>
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
	</FormInputWrapper>
</FormField>

<style lang="scss">
	input {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0;
		padding-left: var(--spacing-base);
		padding-right: var(--spacing-base);
		margin: 0;
		background-color: transparent;
		border: none;
		line-height: 2rem;
		font-size: var(--font-md);
		color: inherit;

		&:focus {
			outline: none;
		}

		&:focus-visible {
			outline: 2px solid var(--focus-ring, #007bff);
			outline-offset: 2px;
		}

		&::placeholder {
			color: var(--form-input-placeholder, #888);
			font-style: italic;
		}
	}
</style>
