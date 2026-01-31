<script lang="ts">
	let {
		variant = 'solid'
	}: {
		variant?: 'solid' | 'dotted' | 'dashed';
	} = $props();
</script>

<hr class={variant} />

<style lang="scss">
	hr {
		border: 0;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.solid {
		height: 0.1rem;
		background: var(--divider-color, rgba(127, 127, 127, 0.5));
	}

	.dotted {
		height: 0;
		border-top: 0.1rem dotted var(--divider-color, rgba(127, 127, 127, 0.5));
	}

	.dashed {
		height: 0;
		border-top: 0.1rem dashed var(--divider-color, rgba(127, 127, 127, 0.5));
	}
</style>
