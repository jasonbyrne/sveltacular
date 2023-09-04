<script lang="ts">
	export let colspan = 1;
</script>

<td {colspan}>
	<div>
		<slot />
	</div>
</td>

<style>
	td {
		font-size: 0.8rem;
		font-family: sans-serif;
		text-shadow: 1px 1px 1px black;
	}

	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
