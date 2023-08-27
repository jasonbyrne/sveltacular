<script>
	import FlexRow from '../layout/flex-row.svelte';
</script>

<div>
	<FlexRow layout="stretch">
		<slot />
	</FlexRow>
</div>

<style>
	div {
		margin-top: 1.5rem;
	}
</style>
