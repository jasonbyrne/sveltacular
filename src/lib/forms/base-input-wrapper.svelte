<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	let {
		id,
		disabled = false,
		error = false,
		prefix = undefined,
		suffix = undefined,
		helperText = undefined,
		errorMessage = undefined,
		inputElement,
		labelElement
	}: {
		id: string;
		disabled?: boolean;
		error?: boolean;
		prefix?: string | undefined;
		suffix?: string | undefined;
		helperText?: string | undefined;
		errorMessage?: string | undefined;
		inputElement: Snippet;
		labelElement?: Snippet | undefined;
	} = $props();
</script>

{#if labelElement}
	{@render labelElement()}
{/if}
<div class="input {disabled ? 'disabled' : 'enabled'} {error ? 'error' : ''}">
	{#if prefix}
		<div class="prefix">{prefix}</div>
	{/if}
	{@render inputElement()}
	{#if suffix}
		<div class="suffix">{suffix}</div>
	{/if}
</div>
{#if errorMessage}
	<div class="error-text">{errorMessage}</div>
{:else if helperText}
	<div class="helper-text">{helperText}</div>
{/if}

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

		&.error {
			border-color: var(--form-input-border-error, #a00);
		}

		.prefix,
		.suffix {
			font-size: 1rem;
			line-height: 2rem;
			padding-left: 1rem;
			padding-right: 1rem;
			background-color: var(--form-input-accent-bg, #ccc);
			color: var(--form-input-accent-fg, black);
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
		color: var(--form-input-helper-text-fg, #666);
	}

	.error-text {
		font-size: 0.75rem;
		line-height: 1.25rem;
		padding: 0.25rem;
		color: var(--form-input-error-fg, #a00);
	}
</style>

