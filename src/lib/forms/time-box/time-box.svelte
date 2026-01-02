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
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		border: 1px solid var(--form-input-border, black);
		background-color: var(--form-input-bg, white);
		color: var(--form-input-fg, black);
		font-size: 1rem;
		font-weight: 500;
		line-height: 2rem;
		transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			color 0.2s ease-in-out;

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

