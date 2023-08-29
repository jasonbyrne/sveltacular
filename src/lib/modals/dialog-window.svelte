<script lang="ts">
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	export let size: FormFieldSizeOptions = 'md';

	const captureClick = (e: Event) => {
		e.stopPropagation();
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={size} on:click={captureClick}>
	<slot />
</div>

<style lang="scss">
	div {
		position: relative;
		border: solid 0.1rem #000;
		padding: 1rem;
		background-color: #fff;
		border-radius: 1rem;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		width: 20rem;
		max-width: 70%;
		z-index: 9999;
		font-family: var(--base-font-family, sans-serif);

		&.sm {
			width: 15rem;
			max-width: 50%;
		}

		&.lg {
			width: 25rem;
			max-width: 80%;
		}

		&.xl {
			width: 90%;
			max-width: 90%;
		}

		&.full {
			width: 100%;
			max-width: 100%;
		}
	}

	@media (max-width: 640px) {
		div {
			max-width: 100%;
		}
	}
</style>
