<script lang="ts">
	export let colspan = 1;
</script>

<td {colspan}>
	<slot />
</td>

<style>
	td {
		padding: 0.5rem;
		font-size: 1rem;
	}
</style>
