<script lang="ts">
	import type { FormFieldSizeOptions } from '$src/lib/index.js';

	let {
		color = '#b7b7b7',
		shadow = false,
		size = 'md' as FormFieldSizeOptions
	}: {
		color?: string;
		shadow?: boolean;
		size?: FormFieldSizeOptions;
	} = $props();
</script>

<span style="background: {color}" class="{size} {shadow ? 'shadow' : ''}" />

<style lang="scss">
	span {
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;

		&.shadow {
			box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.25);
		}

		&.sm {
			width: 0.25rem;
			height: 0.25rem;
		}

		&.lg {
			width: 0.75rem;
			height: 0.75rem;
		}

		&.xl {
			width: 1rem;
			height: 1rem;
		}
	}
</style>
