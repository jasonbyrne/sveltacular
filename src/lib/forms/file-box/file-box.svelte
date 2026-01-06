<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field/form-field.svelte';
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

<FormField {size} {label} {id} {required} {disabled}>
	<div class="input">
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
	.input {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border-radius: var(--radius-md);
		border: var(--border-thin) solid var(--form-input-border);
		background-color: var(--form-input-bg);
		color: var(--form-input-fg);
		font-size: var(--font-md);
		font-weight: 500;
		line-height: 2rem;
		transition:
			background-color var(--transition-base) var(--ease-in-out),
			border-color var(--transition-base) var(--ease-in-out),
			color var(--transition-base) var(--ease-in-out),
			fill var(--transition-base) var(--ease-in-out),
			stroke var(--transition-base) var(--ease-in-out);
		user-select: none;
		white-space: nowrap;

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
	}
</style>
