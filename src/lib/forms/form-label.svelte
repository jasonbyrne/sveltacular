<script lang="ts">
	export let id: string | undefined = undefined;
	export let required = false;
	export let disabled = false;
</script>

<label for={id} class:required class:disabled><slot /></label>

<style lang="scss">
	label {
		display: block;
		margin-bottom: 0.5rem;

		&.required::after {
			content: '*';
			margin-left: 0.25rem;
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
