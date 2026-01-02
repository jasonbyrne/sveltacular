<script lang="ts">
	import type { Snippet } from 'svelte';
	import Image from '$src/lib/images/image.svelte';

	let {
		src = undefined,
		alt,
		href,
		children = undefined
	}: {
		src?: string;
		alt: string;
		href: string;
		children?: Snippet;
	} = $props();
</script>

<div class="logo">
	{#if src}
		<Image {src} {alt} {href} align="left" />
	{:else}
		<a {href} title={alt}>
		{#if children}
			{@render children?.()}
		{/if}
		</a>
	{/if}
</div>

<style lang="scss">
	div {
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;

		a {
			display: block;
			width: 100%;
			height: 100%;
			text-decoration: none;
			color: var(--nav-link, #333);

			&:hover {
				color: var(--nav-link-hover, #333);
			}
		}
	}
</style>
