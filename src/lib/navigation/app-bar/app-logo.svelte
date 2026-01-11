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
		display: flex;
		align-items: center;
		width: auto;
		height: 100%;
		overflow: visible;

		a {
			display: flex;
			align-items: center;
			width: auto;
			height: 100%;
			text-decoration: none;
			color: var(--nav-link, #333);
			line-height: 1;

			&:hover {
				color: var(--nav-link-hover, #333);
			}
		}
	}
</style>
