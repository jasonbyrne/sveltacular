<script lang="ts">
	export let src: string;
	export let alt: string;
	export let href: string;
</script>

<a {href}>
	<img {src} {alt} />
</a>

<style lang="scss">
	a {
		position: relative;
		height: 100%;

		img {
			width: auto;
			height: 100%;
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>
