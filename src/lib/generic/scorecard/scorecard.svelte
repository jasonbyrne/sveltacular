<script lang="ts">
	export let value: string | number;
</script>

<figure>
	<div>{value}</div>
	<figcaption><slot /></figcaption>
</figure>

<style lang="scss">
	figure {
		display: inline-block;
		text-align: center;
		background: #fff;
		border-radius: 0.25rem;
		padding: 1rem;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
		font-family: sans-serif;
		min-width: 6rem;

		div {
			font-size: 2.5rem;
			font-weight: 500;
			color: #000;
		}

		figcaption {
			font-size: 0.875rem;
			font-weight: 300;
			color: #4a5568;
		}
	}
</style>
