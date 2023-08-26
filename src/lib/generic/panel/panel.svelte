<script lang="ts">
	export let title: string;
	export let border = true;
</script>

<fieldset class={border ? 'border' : 'no-border'}>
	{#if title}
		<legend>{title}</legend>
	{/if}
	<slot />
</fieldset>

<style lang="scss">
	fieldset {
		position: relative;
		margin-bottom: 1rem;
		padding: 1rem;
		border: soild 1px rgb(100, 100, 100, 0.5);
		border-radius: 0.5rem;
		font-family: var(--base-font-family, sans-serif);

		&.no-border {
			border: none;
		}

		legend {
			font-size: 1rem;
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 0.1rem;
			font-family: var(--base-headline-font-family, sans-serif);
		}
	}
</style>
