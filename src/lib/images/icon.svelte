<script lang="ts">
	let {
		href,
		color = 'rgb(0, 0, 0)'
	}: {
		href: string;
		color?: string;
	} = $props();
</script>

<span style={`--icon-path: url("${href}"); --icon-color: ${color};`} />

<style lang="scss">
	span {
		display: block;
		background-color: var(--icon-color, rgb(0, 0, 0));
		width: 100%;
		height: 100%;
		-moz-mask-size: contain;
		-moz-mask-image: var(--icon-path);
		-moz-mask-repeat: no-repeat;
		-moz-mask-position: center;
		-ms-mask-size: contain;
		-ms-mask-image: var(--icon-path);
		-ms-mask-repeat: no-repeat;
		-ms-mask-position: center;
		-webkit-mask-size: contain;
		-webkit-mask-image: var(--icon-path);
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-size: contain;
		mask-image: var(--icon-path);
		mask-repeat: no-repeat;
		mask-position: center;
	}
</style>
