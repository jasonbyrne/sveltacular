<script>
	import FlexRow from '../layout/flex-row.svelte';
</script>

<footer>
	<FlexRow layout="stretch">
		<slot />
	</FlexRow>
</footer>

<style lang="scss">
	footer {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		height: 4rem;
		padding: 0 0.5rem;
		text-align: center;
	}
</style>
