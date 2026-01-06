<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field/form-field.svelte';
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

<FormField {size} {label} {id} {required} {disabled}>
	<div class="input" class:disabled>
		<input
			{id}
			type="time"
			bind:value
			{disabled}
			{required}
			oninput={handleInput}
			aria-required={required}
		/>
	</div>
</FormField>

<style lang="scss">
	.input {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		height: 100%;
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
		user-select: none;
		white-space: nowrap;

		&.disabled {
			opacity: 0.5;
		}

		input {
			background-color: transparent;
			border: none;
			line-height: 2rem;
			font-size: var(--font-md);
			width: 100%;
			flex-grow: 1;
			padding-left: var(--spacing-base);
			padding-right: var(--spacing-base);

			&:focus {
				outline: none;
			}

			&:focus-visible {
				outline: 2px solid var(--focus-ring, #007bff);
				outline-offset: 2px;
			}

			&:disabled {
				cursor: not-allowed;
			}
		}

		&:focus-within {
			border-color: var(--form-input-border-focus, #3182ce);
		}
	}
</style>
