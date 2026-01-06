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

<label for={id} class:required class:disabled aria-required={required}>{label}</label>

<style lang="scss">
	label {
		display: block;
		margin-bottom: var(--spacing-sm);
		font-weight: 500;
		font-size: var(--font-base);

		&.required::after {
			content: '*';
			margin-left: var(--spacing-xs);
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
