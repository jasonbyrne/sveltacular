<script lang="ts">
	let {
		id = undefined,
		required = false,
		disabled = false,
		label = ''
	}: {
		id?: string;
		required?: boolean;
		disabled?: boolean;
		label: string;
	} = $props();
</script>

<label for={id} class:required class:disabled aria-required={required}>{label}</label>

<style lang="scss">
	label {
		display: block;
		margin-bottom: var(--spacing-sm);
		font-weight: 500;
		font-size: var(--font-base);
		margin: 0;

		&.required::after {
			content: '*';
			margin-left: var(--spacing-xs);
			color: var(--color-danger);
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
