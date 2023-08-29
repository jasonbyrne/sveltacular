<script lang="ts">
	export let title: string | undefined = undefined;
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
		border: soild 1px;
		border-radius: 0.5rem;
		border-color: var(--base-fg, #ccc);
		font-family: var(--base-font-family, sans-serif);

		&.no-border {
			border: none;
		}

		legend {
			font-size: 1rem;
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 0.1rem;
			color: var(--base-fg, #ccc);
			font-family: var(--base-headline-font-family, sans-serif);
		}
	}
</style>
