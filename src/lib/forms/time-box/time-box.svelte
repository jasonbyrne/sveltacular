<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { ComponentSize } from '$src/lib/types/size.js';

	const id = uniqueId();

	let {
		value = $bindable('' as string | null),
		size = 'full' as ComponentSize,
		disabled = false,
		required = false,
		onChange = undefined,
		label = undefined
	}: {
		value?: string | null;
		size?: ComponentSize;
		disabled?: boolean;
		required?: boolean;
		onChange?: ((value: string) => void) | undefined;
		label?: string;
	} = $props();

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = target.value;
		onChange?.(target.value);
	};
</script>

<FormField {size}>
	{#if label}
		<FormLabel {id} {required} {label} />
	{/if}
	<input
		{id}
		type="time"
		bind:value
		{disabled}
		{required}
		oninput={handleInput}
		aria-required={required}
	/>
</FormField>

<style lang="scss">
	input[type='time'] {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-base);
		border-radius: var(--radius-md);
		border: var(--border-thin) solid var(--form-input-border);
		background-color: var(--form-input-bg);
		color: var(--form-input-fg);
		font-size: var(--font-md);
		font-weight: 500;
		line-height: 2rem;
		transition:
			background-color var(--transition-base) var(--ease-in-out),
			border-color var(--transition-base) var(--ease-in-out),
			color var(--transition-base) var(--ease-in-out);

		&:focus {
			outline: none;
			border-color: var(--form-input-border-focus, #3182ce);
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>

