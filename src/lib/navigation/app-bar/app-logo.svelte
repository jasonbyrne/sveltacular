<script lang="ts">
	import Image from '$src/lib/images/image.svelte';

	export let src: string | undefined = undefined;
	export let alt: string;
	export let href: string;
</script>

<div class="logo">
	{#if src}
		<Image {src} {alt} {href} align="left" />
	{:else}
		<a {href} title={alt}><slot /></a>
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
