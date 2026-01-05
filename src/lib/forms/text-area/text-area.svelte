<script lang="ts">
	import { untrack } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	const id = uniqueId();

	let {
		size = 'full' as FormFieldSizeOptions,
		value = $bindable('' as string | null),
		placeholder = '',
		rows = 4,
		disabled = false,
		required = false,
		readonly = false,
		autoResize = false,
		minRows = 2,
		maxRows = undefined,
		label = undefined
	}: {
		size?: FormFieldSizeOptions;
		value?: string | null;
		placeholder?: string;
		rows?: number;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		autoResize?: boolean;
		minRows?: number;
		maxRows?: number | undefined;
		label?: string;
	} = $props();

	let textareaElement: HTMLTextAreaElement | null = $state(null);

	// Auto-resize functionality
	const handleAutoResize = () => {
		if (!autoResize || !textareaElement) return;

		// Reset height to auto to get the correct scrollHeight
		textareaElement.style.height = 'auto';

		// Calculate new height based on content
		const lineHeight = parseInt(getComputedStyle(textareaElement).lineHeight);
		const paddingTop = parseInt(getComputedStyle(textareaElement).paddingTop);
		const paddingBottom = parseInt(getComputedStyle(textareaElement).paddingBottom);
		const minHeight = lineHeight * minRows + paddingTop + paddingBottom;
		const maxHeight = maxRows ? lineHeight * maxRows + paddingTop + paddingBottom : Infinity;

		const newHeight = Math.min(Math.max(textareaElement.scrollHeight, minHeight), maxHeight);
		textareaElement.style.height = `${newHeight}px`;
	};

	// Run auto-resize when value changes
	$effect(() => {
		if (value !== null && value !== undefined) {
			// Use untrack to prevent DOM manipulations from triggering effects
			untrack(() => {
				handleAutoResize();
			});
		}
	});

	// Run auto-resize on mount
	$effect(() => {
		if (textareaElement && autoResize) {
			// Use untrack to prevent DOM manipulations from triggering effects
			untrack(() => {
				handleAutoResize();
			});
		}
	});
</script>

<FormField {size} {label} {id} {required} {disabled}>
	<textarea
		wrap="soft"
		{id}
		{placeholder}
		rows={autoResize ? minRows : rows}
		bind:value
		bind:this={textareaElement}
		{required}
		{disabled}
		{readonly}
		data-auto-resize={autoResize}
		oninput={handleAutoResize}
	></textarea>
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
		transition:
			background-color 0.2s ease-in-out,
			border-color 0.2s ease-in-out,
			color 0.2s ease-in-out,
			fill 0.2s ease-in-out,
			stroke 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out;
		user-select: text;
		resize: vertical;
		white-space: normal;
		overflow-y: auto;
		box-sizing: border-box;

		&::placeholder {
			color: var(--form-input-placeholder, #a0aec0);
		}

		&[data-auto-resize='true'] {
			resize: none;
			overflow-y: hidden;
		}
	}
</style>
