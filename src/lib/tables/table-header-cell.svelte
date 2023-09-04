<script lang="ts">
	export let colspan = 1;
	export let type: string | undefined = undefined;
	export let width: number | string | undefined = undefined;

	$: styleProperties = [
		`text-align: ${
			type === 'currency' || type === 'number' ? 'right' : type === 'boolean' ? 'center' : 'left'
		}`,
		'text-overflow: ellipsis',
		'overflow: hidden',
		`width: ${width ? width : 'auto'}`
	];
</script>

<th {colspan} class={type} style={styleProperties.join('; ')}>
	<slot />
</th>

<style lang="scss">
	th {
		text-align: left;
		padding: 0.5rem 0.75rem;
		font-weight: 500;
		font-size: 0.8rem;
		font-family: sans-serif;
		line-height: 1.25rem;
		letter-spacing: 0.015em;
		text-transform: uppercase;
		text-shadow: 1px 1px 1px black;

		&.currency,
		&.number {
			text-align: right;
		}

		&.boolean {
			text-align: center;
		}
	}
</style>
