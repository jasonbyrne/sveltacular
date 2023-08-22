<script lang="ts">
	import Image from '$src/lib/images/image.svelte';

	export let src: string;
	export let alt: string;
	export let href: string;
</script>

<Image {src} {alt} {href} align="left" />
