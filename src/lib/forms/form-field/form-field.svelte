<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ComponentSize } from '$src/lib/types/size.js';
	import FormLabel from '$src/lib/forms/form-label/form-label.svelte';
	import type { AriaRole } from 'svelte/elements';

	export type FormFieldMessage = {
		text: string;
		isError?: boolean;
	};

	export type FormFieldFeedback = FormFieldMessage & {
		details?: FormFieldMessage[];
	};

	/**
	 * Maps size to flex-grow value for relative sizing in flexbox containers (FormRow).
	 * The size prop controls how much space the field takes relative to its siblings.
	 */
	const getFlexGrow = (size: ComponentSize): number => {
		const flexMap: Record<ComponentSize, number> = {
			sm: 1,
			md: 2,
			lg: 3,
			xl: 4
		};
		return flexMap[size];
	};

	let {
		size = 'md',
		label = undefined,
		id = undefined,
		required = false,
		disabled = false,
		helperText,
		feedback,
		children
	}: {
		size?: ComponentSize;
		label?: string | undefined;
		id?: string | undefined;
		required?: boolean;
		disabled?: boolean;
		helperText?: string;
		feedback?: FormFieldFeedback;
		children: Snippet;
	} = $props();

	let flexGrow = $derived(getFlexGrow(size));

	// Determine which message to show: feedback takes precedence over helperText
	let message = $derived.by<FormFieldFeedback | undefined>(() => {
		if (feedback) return feedback;
		if (helperText) {
			return { text: helperText, isError: false };
		}
		return undefined;
	});

	// Determine if we're showing helper text (no feedback) or actual feedback
	let isHelperText = $derived(!feedback && !!helperText);

	let ariaLive = $derived<'assertive' | 'polite' | undefined>(
		message && !isHelperText ? (message.isError ? 'assertive' : 'polite') : undefined
	);

	let ariaRole = $derived<AriaRole | undefined>(
		message && !isHelperText ? (message.isError ? 'alert' : 'status') : undefined
	);

	let messageClass = $derived(
		message ? (isHelperText ? 'helper' : message.isError ? 'error' : 'success') : undefined
	);

	let messageId = $derived(
		message && id
			? isHelperText
				? `${id}-helper`
				: message.isError
					? `${id}-error`
					: `${id}-success`
			: undefined
	);
</script>

<div class="form-field {size}" style="--flex-grow: {flexGrow};">
	{#if label}
		<FormLabel {id} {required} {disabled} {label} />
	{/if}
	{@render children?.()}
	{#if message}
		<div
			class="message-container {messageClass}"
			role={ariaRole}
			aria-live={ariaLive}
			id={messageId}
		>
			<div class="message-text">{message.text}</div>
			{#if message.details && message.details.length > 0}
				<ul class="message-details">
					{#each message.details as detail}
						<li class="message-detail" class:error={detail.isError} class:success={!detail.isError}>
							{detail.text}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	@use '$styles/breakpoints' as *;

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		// Use flex-grow for relative sizing when inside FormRow (flexbox container)
		// Size prop controls the flex-grow value for relative sizing
		flex-grow: var(--flex-grow, 1);
		flex-shrink: 1;
		flex-basis: 0;

		// Switch to column layout on mobile phones and below
		@include breakpoint-down('phablet') {
			width: 100%;
		}
	}

	.message-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: var(--font-sm);
		line-height: 1.25rem;
		padding: var(--spacing-xs);
		transition:
			color var(--transition-base) var(--ease-in-out),
			opacity var(--transition-base) var(--ease-in-out);

		&.helper {
			color: var(--form-input-helper-text-fg, var(--body-fg-muted));
		}

		&.success {
			color: var(--color-success, #28a745);
			font-weight: 500;
		}

		&.error {
			color: var(--color-error, #dc3545);
			font-weight: 500;
		}
	}

	.message-text {
		line-height: 1.25rem;
	}

	.message-details {
		list-style: none;
		margin: 0;
		padding: 0;
		padding-left: var(--spacing-sm);
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.message-detail {
		font-size: var(--font-sm);
		margin: 0;
		padding: 0;
		transition:
			color var(--transition-base) var(--ease-in-out),
			opacity var(--transition-base) var(--ease-in-out);

		&::before {
			content: '- ';
			border-radius: 50%;
		}

		&.error {
			color: var(--color-error, #dc3545);
		}

		&.success {
			color: var(--color-success, #28a745);
		}
	}
</style>
