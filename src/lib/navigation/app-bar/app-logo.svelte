<script lang="ts">
	import Image from '$src/lib/images/image.svelte';

	export let src: string;
	export let alt: string;
	export let href: string;
</script>

<div class="logo">
	<Image {src} {alt} {href} align="left" />
</div>

<style>
	div {
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
