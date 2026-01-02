<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	let {
		size = 'md' as FormFieldSizeOptions,
		children,
		...restProps
	}: {
		size?: FormFieldSizeOptions;
		children: Snippet;
		[key: string]: any;
	} = $props();

	const captureClick = (e: Event) => {
		e.stopPropagation();
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={size} onclick={captureClick} {...restProps}>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		position: relative;
		border: solid var(--border-thin) var(--gray-300);
		padding: var(--spacing-base);
		background-color: var(--modal-bg);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-xl);
		z-index: 9999;
		font-family: var(--base-font-family);

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
			width: 98%;
			max-width: 98%;
		}
	}

	@media (max-width: 640px) {
		div {
			max-width: 100%;
		}
	}
</style>
