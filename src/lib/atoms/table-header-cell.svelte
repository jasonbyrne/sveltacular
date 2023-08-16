<script lang="ts">
	export let colspan = 1;
</script>

<th {colspan}>
	<slot />
</th>

<style>
	th {
		text-align: left;
		padding: 0.5rem 0.75rem;
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.25rem;
		letter-spacing: 0.015em;
		text-transform: uppercase;
	}
</style>
