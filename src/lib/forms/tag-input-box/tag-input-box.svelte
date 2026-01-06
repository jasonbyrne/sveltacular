<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField, { type FormFieldFeedback } from '$src/lib/forms/form-field/form-field.svelte';
	import Chip from '$src/lib/generic/chip/chip.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/types/form.js';

	const id = uniqueId();
	const datalistId = uniqueId();

	let {
		value = $bindable([] as string[]),
		placeholder = 'Add a tag...',
		required = false,
		disabled = false,
		autocomplete = [] as string[],
		separators = [',', ';'] as string[],
		size = 'full' as FormFieldSizeOptions,
		label = undefined as string | undefined,
		helperText = undefined as string | undefined,
		feedback = undefined as FormFieldFeedback | undefined,
		onChange = undefined as ((value: string[]) => void) | undefined
	}: {
		value?: string[];
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		autocomplete?: string[];
		separators?: string[];
		size?: FormFieldSizeOptions;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		onChange?: ((value: string[]) => void) | undefined;
	} = $props();

	let newTag = $state('');

	function addTag(tagToAdd?: string) {
		const tag = tagToAdd || newTag.trim();
		if (tag && !value.includes(tag)) {
			value = [...value, tag];
			newTag = '';
			onChange?.(value);
		}
	}

	function removeTag(tagToRemove: string) {
		value = value.filter((tag) => tag !== tagToRemove);
		onChange?.(value);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			addTag();
		} else if (event.key === 'Backspace' && newTag === '' && value.length > 0) {
			removeTag(value[value.length - 1]);
		}
	}

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const inputValue = input.value;

		// Check if the last character is a separator
		if (inputValue.length > 0) {
			const lastChar = inputValue[inputValue.length - 1];
			if (separators.includes(lastChar)) {
				// Extract the tag before the separator
				const tagBeforeSeparator = inputValue.slice(0, -1).trim();
				if (tagBeforeSeparator) {
					// Prevent the separator from being added
					newTag = tagBeforeSeparator;
					// Add the tag
					addTag(tagBeforeSeparator);
				} else {
					// If there's no text before the separator, just clear it
					newTag = '';
				}
			}
		}
	}
</script>

<FormField {size} {label} {id} {required} {disabled} {helperText} {feedback}>
	<div class="tag-input">
		<div class="input-container">
			<div class="input-wrapper">
				<input
					{id}
					type="text"
					bind:value={newTag}
					{placeholder}
					onkeydown={handleKeydown}
					oninput={handleInput}
					{disabled}
					{required}
					list={autocomplete.length > 0 ? datalistId : undefined}
					aria-label="Tag input"
					class="tag-input-field"
				/>
				{#if autocomplete.length > 0}
					<datalist id={datalistId}>
						{#each autocomplete as option}
							<option value={option}></option>
						{/each}
					</datalist>
				{/if}
			</div>
			<button
				type="button"
				class="add-button"
				onclick={() => addTag()}
				disabled={disabled || !newTag.trim()}
				aria-label="Add tag"
			>
				Add
			</button>
		</div>

		{#if value.length > 0}
			<div class="tags">
				{#each value as tag}
					<Chip label={tag} removable={true} onRemove={() => removeTag(tag)} />
				{/each}
			</div>
		{/if}
	</div>
</FormField>

<style lang="scss">
	.tag-input {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		width: 100%;

		.input-container {
			display: flex;
			gap: var(--spacing-sm);
			align-items: flex-end;

			.input-wrapper {
				flex: 1;
				position: relative;
			}

			.tag-input-field {
				width: 100%;
				height: 100%;
				padding-left: var(--spacing-base);
				padding-right: var(--spacing-base);
				border: var(--border-thin) solid var(--form-input-border);
				border-radius: var(--radius-md);
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
					border-color: var(--form-input-border-focus);
					background-color: var(--form-input-bg);
				}

				&:disabled {
					opacity: 0.6;
					cursor: not-allowed;
				}

				&::placeholder {
					color: var(--form-input-placeholder);
				}
			}

			.add-button {
				padding: var(--spacing-sm) var(--spacing-base);
				background-color: var(--button-primary-bg);
				color: var(--button-primary-fg);
				border: var(--border-thin) solid var(--button-primary-border);
				border-radius: var(--radius-md);
				font-size: var(--font-sm);
				font-weight: 500;
				cursor: pointer;
				transition:
					background-color var(--transition-base) var(--ease-in-out),
					border-color var(--transition-base) var(--ease-in-out),
					color var(--transition-base) var(--ease-in-out);
				white-space: nowrap;
				height: fit-content;
				line-height: 2rem;

				&:hover:not(:disabled) {
					background-color: var(--button-primary-hover-bg);
					color: var(--button-primary-hover-fg);
				}

				&:disabled {
					background-color: var(--gray-400);
					border-color: var(--gray-400);
					color: var(--gray-600);
					cursor: not-allowed;
					opacity: 0.6;
				}

				&:active:not(:disabled) {
					transform: scale(0.98);
				}
			}
		}

		.tags {
			display: flex;
			flex-wrap: wrap;
			gap: var(--spacing-sm);
		}
	}
</style>
