<script lang="ts">
	export let colspan = 1;
	export let type: string | undefined = undefined;
	export let width: number | string | undefined = undefined;

	$: styleProperties = [`width: ${width ? width : 'auto'}`];
</script>

<td {colspan} class={type} style={styleProperties.join('; ')}>
	<slot />
</td>

<style lang="scss">
	td {
		padding-left: 0.5rem;
		font-size: 0.9rem;
		line-height: 1.5rem;

		&.currency,
		&.number {
			text-align: right;
		}

		&.boolean {
			text-align: center;
			text-transform: uppercase;
		}

		&.actions {
			text-align: right;
		}

		&:last-child {
			padding-right: 0.5rem;
		}
	}
</style>
