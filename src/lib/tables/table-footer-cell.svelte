<script lang="ts">
	export let colspan = 1;
</script>

<td {colspan}>
	<slot />
</td>

<style>
	td {
		padding: 0.5rem;
		font-size: 0.8rem;
		font-family: sans-serif;
		text-shadow: 1px 1px 1px black;
	}
</style>
