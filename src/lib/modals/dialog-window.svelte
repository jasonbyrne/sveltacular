<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ComponentWidth } from '../types';
	import type { AriaRole } from 'svelte/elements';

	let {
		size = 'md',
		glass = false,
		role = 'dialog',
		ariaLabelledby = undefined,
		children
	}: {
		size?: ComponentWidth;
		glass?: boolean;
		role?: AriaRole;
		ariaLabelledby?: string;
		children: Snippet;
	} = $props();

	const captureClick = (e: Event) => {
		e.stopPropagation();
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="{size} {glass ? 'glass' : ''}"
	onclick={captureClick}
	{role}
	aria-modal="true"
	aria-labelledby={ariaLabelledby}
>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		position: relative;
		border: solid var(--border-thin) var(--gray-300);
		padding: var(--spacing-base);
		background-color: var(--modal-bg);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-2xl);
		z-index: 9999;
		font-family: var(--base-font-family);

		&.glass {
			background: var(--glass-bg);
			backdrop-filter: blur(var(--glass-blur));
			-webkit-backdrop-filter: blur(var(--glass-blur));
			border: var(--border-thin) solid var(--glass-border);

			/* Fallback for browsers without backdrop-filter support */
			@supports not (backdrop-filter: blur(12px)) {
				background: var(--modal-bg);
				border: var(--border-thin) solid var(--gray-300);
			}
		}

		&.sm {
			width: 25rem;
			max-width: 80%;
		}

		&.md {
			width: 35rem;
			max-width: 85%;
		}

		&.lg {
			width: 50rem;
			max-width: 90%;
		}

		&.xl {
			width: 65rem;
			max-width: 95%;
		}

		&.full {
			max-width: 100%;
			width: 100%;
			height: 100%;
			border-radius: 0;
			border: none;
		}
	}

	@media (max-width: 640px) {
		div {
			max-width: 100%;
		}
	}
</style>
