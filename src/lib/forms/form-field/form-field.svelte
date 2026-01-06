<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ComponentSize } from '$src/lib/types/size.js';
	import { getMaxWidth, getDisplayType } from '$src/lib/types/size.js';
	import FormLabel from '$src/lib/forms/form-label/form-label.svelte';

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

<div class="form-field {size} {displayType} {maxWidth}">
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
	@use '$styles/breakpoints' as *;

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;

		// Switch to column layout on mobile phones and below
		@include breakpoint-down('phablet') {
			width: 100%;
		}
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
