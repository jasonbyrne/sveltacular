<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<main>
	<a
		id="top"
		aria-hidden="true"
		style="position: absolute; top: 0; left: 0; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
	></a>
	{@render children?.()}
</main>

<style lang="scss">
	@use '$styles/breakpoints' as *;

	main {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		max-width: 1000px; /* Desktop: good for 1366px-1920px screens */
		margin: 0 auto;
		padding: 0 var(--spacing-base, 1rem);

		/* Improve touch scrolling on iOS */
		-webkit-overflow-scrolling: touch;
		overflow-x: hidden; /* Prevent horizontal scroll */

		/* Responsive padding for larger screens */
		@include breakpoint-up('tablet') {
			padding: 0 var(--spacing-md, 1rem);
		}

		/* Increase max-width on large screens to better utilize space */
		/* 1440px provides good readability while using more of the screen */
		@include breakpoint-up('large') {
			max-width: 1440px;
		}

		/* Add extra bottom padding on mobile for better UX */
		@include breakpoint-down('phablet') {
			padding-bottom: 2rem;
		}
	}
</style>
