<script lang="ts">
	export let colspan = 1;
	export let type: string | undefined = undefined;
	export let width: number | string | undefined = undefined;

	$: styleProperties = [
		`text-align: ${
			type === 'currency' || type === 'number' ? 'right' : type === 'boolean' ? 'center' : 'left'
		}`,
		`width: ${width ? width : 'auto'}`
	];
</script>

<td {colspan} class={type} style={styleProperties.join('; ')}>
	<slot />
</td>

<style lang="scss">
	td {
		padding: 0.25rem;
		font-size: 1rem;

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
	}
</style>
