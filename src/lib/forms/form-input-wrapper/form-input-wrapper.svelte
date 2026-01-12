<script lang="ts">
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';
	import { animateShake, animateScaleIn } from '$src/lib/helpers/animations.js';
	import Icon from '$src/lib/icons/icon.svelte';

	let {
		disabled = false,
		error = false,
		success = false,
		prefix = undefined,
		suffix = undefined,
		nullable = false,
		nullText = '--',
		isLoading = false,
		onCheckChanged = undefined,
		children
	}: {
		disabled?: boolean;
		error?: boolean;
		success?: boolean;
		prefix?: string | undefined;
		suffix?: string | undefined;
		nullable?: boolean;
		nullText?: string;
		isLoading?: boolean;
		onCheckChanged?: ((isChecked: boolean) => void) | undefined;
		children: Snippet;
	} = $props();

	// Track whether the nullable checkbox is checked (i.e., whether field has a value)
	let isChecked = $state(true);
	
	// Show input when not nullable, or when nullable and checked
	let showInput = $derived(!nullable || isChecked);

	let inputElement_ref: HTMLDivElement | null = $state(null);
	let successIconElement: HTMLDivElement | null = $state(null);

	// Trigger shake animation when error appears (track previous error state)
	let prevHasError = $state(false);
	$effect(() => {
		if (error && !prevHasError && inputElement_ref) {
			// Use untrack to prevent animation from triggering effect again
			untrack(() => {
				animateShake(inputElement_ref!);
			});
		}
		prevHasError = error;
	});

	// Trigger scale-in animation when success appears (track previous success state)
	let prevHasSuccess = $state(false);
	$effect(() => {
		if (success && !prevHasSuccess && successIconElement) {
			// Use untrack to prevent animation from triggering effect again
			untrack(() => {
				animateScaleIn(successIconElement!);
			});
		}
		prevHasSuccess = success;
	});

	const checkChanged = () => {
		onCheckChanged?.(isChecked);
	};
</script>

<div
	class="input"
	class:disabled
	class:error
	class:success
	class:nullable
	bind:this={inputElement_ref}
>
	{#if prefix}
		<div class="prefix">{prefix}</div>
	{/if}
	{#if showInput}
		{@render children()}
	{:else}
		<div class="input-null-text">
			{nullText}
		</div>
	{/if}
	{#if isLoading}
		<div class="loading-indicator" aria-label="Loading">
			<div class="spinner"></div>
		</div>
	{:else if success}
		<div class="success-indicator" bind:this={successIconElement}>
			<Icon type="check" size="sm" />
		</div>
	{/if}
	{#if suffix}
		<div class="suffix">{suffix}</div>
	{/if}
	{#if nullable}
		<span class="toggle">
			<input type="checkbox" bind:checked={isChecked} onchange={checkChanged} />
		</span>
	{/if}
</div>

<style lang="scss">
	.input {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		min-height: 2.125rem;
		border-radius: var(--radius-md);
		border: var(--border-thin) solid var(--form-input-border);
		background-color: var(--form-input-bg);
		color: var(--form-input-fg);
		font-size: var(--font-md);
		font-weight: 500;
		line-height: 2rem;
		padding: 0;
		gap: var(--spacing-sm);
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
			border-color: var(--danger, #dc3545);
		}

		&.success {
			border-color: var(--success, #28a745);
		}

		&.nullable {
			.toggle {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0.4rem;
				z-index: 1;
			}

			// When there's a prefix, only the prefix needs padding
			.prefix {
				padding-left: 2.5rem;
			}

			// When there's NO prefix, child input and null text need padding
			&:not(:has(.prefix)) {
				:global(input),
				.input-null-text {
					padding-left: 2.5rem;
				}
			}
		}

		.loading-indicator,
		.success-indicator {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 var(--spacing-base);
		}

		.loading-indicator {
			.spinner {
				width: 1rem;
				height: 1rem;
				border: 2px solid var(--form-input-border);
				border-top-color: var(--primary-500, #3b82f6);
				border-radius: 50%;
				animation: spin 0.6s linear infinite;
			}
		}

		@keyframes spin {
			to {
				transform: rotate(360deg);
			}
		}

		.success-indicator {
			color: var(--success, #28a745);
			width: 1.5rem;
			height: 1.5rem;

			:global(svg) {
				width: 100%;
				height: 100%;
			}
		}

		.input-null-text {
			font-size: var(--font-md);
			line-height: 2rem;
			text-align: left;
			padding-left: var(--spacing-base);
			margin: 0;
			flex-grow: 1;
			display: flex;
			align-items: center;
			box-sizing: border-box;
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

</style>
