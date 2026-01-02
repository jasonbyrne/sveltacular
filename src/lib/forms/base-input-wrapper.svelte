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

		&.disabled {
			opacity: 0.5;
		}

		&.error {
			border-color: var(--form-input-border-error);
		}

		.prefix,
		.suffix {
			font-size: var(--font-md);
			line-height: 2rem;
			padding-left: var(--spacing-base);
			padding-right: var(--spacing-base);
			background-color: var(--form-input-accent-bg);
			color: var(--form-input-accent-fg);
		}

		.prefix {
			border-right: var(--border-thin) solid var(--form-input-border);
		}

		.suffix {
			border-left: var(--border-thin) solid var(--form-input-border);
		}
	}

	.helper-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--form-input-helper-text-fg);
	}

	.error-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--form-input-error-fg);
	}
</style>

