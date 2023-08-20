<script lang="ts">
	export let colspan = 1;
	export let type: string | undefined = undefined;
</script>

<td {colspan} class={type}>
	<slot />
</td>

<style lang="scss">
	td {
		padding: 0.5rem;
		font-size: 1rem;

		&.currency,
		&.number {
			text-align: right;
		}

		&.boolean {
			text-align: center;
			text-transform: uppercase;
		}
	}
</style>
