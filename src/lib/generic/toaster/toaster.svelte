<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		position = 'bottom-right' as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
		children
	}: {
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		children: Snippet;
	} = $props();
</script>

<section class="toaster {position}">
	{@render children?.()}
</section>

<style lang="scss">
	.toaster {
		display: flex;
		flex-direction: column-reverse;
		position: fixed;
		gap: 1rem;
		z-index: 9999;
		max-width: 100%;
		width: 20rem;
		padding: 1rem;

		&.top-left {
			top: 1rem;
			left: 1rem;
		}

		&.top-right {
			top: 1rem;
			right: 1rem;
		}

		&.bottom-left {
			bottom: 1rem;
			left: 1rem;
		}

		&.bottom-right {
			bottom: 1rem;
			right: 1rem;
		}
	}
</style>
