<script lang="ts">
	import { untrack } from 'svelte';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import FormInputWrapper from '$src/lib/forms/form-input-wrapper';
	import type { ComponentSize } from '$src/lib/types/form.js';

	const id = uniqueId();

	let {
		size = 'md' as ComponentSize,
		value = $bindable('' as string | null),
		placeholder = '',
		rows = 4,
		disabled = false,
		required = false,
		readonly = false,
		autoResize = false,
		minRows = 2,
		maxRows = undefined,
		label = undefined,
		helperText = undefined,
		feedback = undefined,
		isLoading = false,
		showCharacterCount = false,
		maxlength = undefined,
		minlength = undefined,
		pattern = undefined,
		onChange = undefined,
		onInput = undefined,
		onFocus = undefined,
		onBlur = undefined
	}: {
		size?: ComponentSize;
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
		helperText?: string;
		feedback?: FormFieldFeedback;
		isLoading?: boolean;
		showCharacterCount?: boolean;
		maxlength?: number | undefined;
		minlength?: number | undefined;
		pattern?: string | undefined;
		onChange?: ((value: string) => void) | undefined;
		onInput?: ((value: string) => void) | undefined;
		onFocus?: ((e: FocusEvent) => void) | undefined;
		onBlur?: ((e: FocusEvent) => void) | undefined;
	} = $props();

	let textareaElement: HTMLTextAreaElement | null = $state(null);

	// Character count functionality
	let characterCount = $derived((value || '').length);
	let characterLimitClass = $derived(
		maxlength && characterCount > maxlength * 0.9
			? characterCount >= maxlength
				? 'at-limit'
				: 'near-limit'
			: ''
	);

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

	const handleInput = (e: Event) => {
		handleAutoResize();
		onInput?.(value || '');
	};

	const handleChange = (e: Event) => {
		onChange?.(value || '');
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

<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
	<div class="textarea-container">
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
			{maxlength}
			{minlength}
			aria-busy={isLoading}
			data-auto-resize={autoResize}
			oninput={handleInput}
			onchange={handleChange}
			onfocus={onFocus}
			onblur={onBlur}
		></textarea>
		{#if showCharacterCount && maxlength}
			<div class="character-count {characterLimitClass}">
				{characterCount} / {maxlength}
			</div>
		{/if}
	</div>
</FormField>

<style lang="scss">
	.textarea-container {
		position: relative;
		width: 100%;
	}

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

	.character-count {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		text-align: right;
		color: var(--body-fg);
		position: absolute;
		right: 0;
		bottom: 0;

		&.near-limit {
			color: var(--warning, #ffc107);
			font-weight: 500;
		}

		&.at-limit {
			color: var(--danger, #dc3545);
			font-weight: 600;
		}
	}
</style>
