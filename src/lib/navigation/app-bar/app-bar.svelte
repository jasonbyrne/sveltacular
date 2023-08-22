<script lang="ts">
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	export let isFixed = true;
	export let position: 'top' | 'bottom' = 'top';
	export let size: FormFieldSizeOptions | 'xs' = 'md';
	export let padding: 'none' | FormFieldSizeOptions = 'md';
</script>

<header class="{position} {size} padding-{padding} {isFixed ? 'fixed' : 'absolute'}">
	<slot />
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		background: #fff;
		color: #000;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		height: 3rem;

		&.fixed {
			position: fixed;
		}

		&.bottom {
			top: auto;
			bottom: 0;
		}

		&.xs {
			height: 1rem;
		}

		&.sm {
			height: 2rem;
		}

		&.lg {
			height: 4rem;
		}

		&.xl {
			height: 5rem;
		}

		&.padding-none {
			padding: 0;
		}

		&.padding-sm {
			padding: 0.25rem;
		}

		&.padding-lg {
			padding: 1rem;
		}

		&.padding-xl {
			padding: 1.5rem;
		}
	}
</style>
