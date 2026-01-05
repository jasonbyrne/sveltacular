<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ComponentSize } from '$src/lib/types/size.js';
	import { getMaxWidth, getDisplayType } from '$src/lib/types/size.js';
	import FormLabel from '$src/lib/forms/form-label.svelte';

	let {
		size = 'full',
		label = undefined,
		id = undefined,
		required = false,
		disabled = false,
		helperText = undefined,
		errorText = undefined,
		successText = undefined,
		children
	}: {
		size?: ComponentSize;
		label?: string | undefined;
		id?: string | undefined;
		required?: boolean;
		disabled?: boolean;
		helperText?: string | undefined;
		errorText?: string | undefined;
		successText?: string | undefined;
		children: Snippet;
	} = $props();

	let displayType = $derived(getDisplayType(size));
	let maxWidth = $derived(getMaxWidth(size));

	let showHelperText = $derived(!!helperText && !errorText && !successText);
	let showSuccessText = $derived(!!successText && !errorText);
	let showErrorText = $derived(!!errorText);
</script>

<div style={`display: ${displayType}; width: 100%; min-width: 10rem; max-width: ${maxWidth}`}>
	{#if label}
		<FormLabel {id} {required} {disabled} {label} />
	{/if}
	{@render children?.()}
	{#if showHelperText}
		<div class="helper-text" id="{id}-helper">{helperText}</div>
	{/if}
	{#if showSuccessText}
		<div class="success-text" id="{id}-success" role="status" aria-live="polite">
			{successText}
		</div>
	{/if}
	{#if showErrorText}
		<div class="error-text" id="{id}-error" role="alert" aria-live="assertive">
			{errorText}
		</div>
	{/if}
</div>

<style lang="scss">
	div {
		margin-bottom: var(--spacing-base);
		margin-right: var(--spacing-base);
	}

	.helper-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--body-fg);
	}

	.success-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--success, #28a745);
		font-weight: 500;
	}

	.error-text {
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		color: var(--danger, #dc3545);
		font-weight: 500;
	}
</style>
