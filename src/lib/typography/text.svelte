<script lang="ts">
	export let transform: 'uppercase' | 'lowercase' | 'capitalize' | 'none' = 'none';
</script>

<div class={transform}>
	<slot />
</div>

<style lang="scss">
	div {
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
