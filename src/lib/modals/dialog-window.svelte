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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class={size} onclick={captureClick} {...restProps}>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		position: relative;
		border: solid 0.1rem #000;
		padding: 1rem;
		background-color: #fff;
		border-radius: 1rem;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		z-index: 9999;
		font-family: var(--base-font-family, sans-serif);

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
