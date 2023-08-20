<script>
	export let show = true;
</script>

<div class:show>
	<slot />
</div>

<style lang="scss">
	div {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9998;

		&.show {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
