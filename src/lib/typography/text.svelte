<script lang="ts">
	export let transform: 'uppercase' | 'lowercase' | 'capitalize' | 'none' = 'none';
</script>

<div class={transform}>
	<slot />
</div>

<style lang="scss">
	div {
		font-family: var(--base-font-family, sans-serif);

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
