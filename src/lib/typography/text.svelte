<script lang="ts">
	export let transform: 'uppercase' | 'lowercase' | 'capitalize' | 'none' = 'none';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let display: 'block' | 'inline' = 'block';
</script>

<div class="{transform} {size} {display}">
	{#if size === 'sm'}
		<small><slot /></small>
	{:else}
		<slot />
	{/if}
</div>

<style lang="scss">
	div {
		font-family: var(--base-font-family, sans-serif);

		&.sm {
			font-size: 60%;
		}

		&.lg {
			font-size: 140%;
		}

		&.block {
			display: block;
		}

		&.inline {
			display: inline;
		}

		&.uppercase {
			text-transform: uppercase;
		}

		&.lowercase {
			text-transform: lowercase;
		}

		&.capitalize {
			text-transform: capitalize;
		}
	}
</style>
