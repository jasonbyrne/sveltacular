<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<main>
	{@render children?.()}
</main>

<style lang="scss">
	@use '$styles/breakpoints' as *;

	main {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		max-width: 1000px; /* Desktop: good for 1366px-1920px screens */
		margin: 0 auto;
		padding: 0 var(--spacing-base, 1rem);

		/* Responsive padding for larger screens */
		@include breakpoint-up('tablet') {
			padding: 0 var(--spacing-xl, 2rem);
		}

		/* Increase max-width on large screens to better utilize space */
		/* 1440px provides good readability while using more of the screen */
		@include breakpoint-up('large') {
			max-width: 1440px;
		}
	}
</style>
