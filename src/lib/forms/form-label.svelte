<script lang="ts">
	let {
		id = undefined,
		required = false,
		disabled = false,
		label = ''
	}: {
		id?: string | undefined;
		required?: boolean;
		disabled?: boolean;
		label?: string;
	} = $props();
</script>

<label for={id} class:required class:disabled>{label}</label>

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
