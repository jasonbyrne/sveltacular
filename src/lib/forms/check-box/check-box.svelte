<script lang="ts">
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import CheckIcon from '$src/lib/icons/check-icon.svelte';

	let {
		value = '',
		isChecked = $bindable(false),
		disabled = false,
		name = undefined,
		onChange = undefined,
		label
	}: {
		value?: string;
		isChecked?: boolean;
		disabled?: boolean;
		name?: string | undefined;
		onChange?: ((data: { isChecked: boolean; value: string }) => void) | undefined;
		label?: string;
	} = $props();

	const id = uniqueId();

	const onChecked = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const newChecked = target.checked;
		// Update isChecked (will work whether bound or not)
		isChecked = newChecked;
		// Always notify parent via onChange callback
		onChange?.({ isChecked: newChecked, value });
	};
</script>

<label>
	<input
		type="checkbox"
		{id}
		{disabled}
		{name}
		{value}
		bind:checked={isChecked}
		onchange={onChecked}
	/>
	<span class="checkbox">
		<span class="checkmark"><CheckIcon /></span>
	</span>
	{#if label}
		<div class="text">
			{label}
		</div>
	{/if}
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		cursor: pointer;

		.text {
			display: block;
			margin-left: var(--spacing-sm);
			font-size: var(--font-md);
			line-height: 2rem;
		}

		.checkbox {
			position: relative;
			display: block;
			width: var(--spacing-base);
			height: var(--spacing-base);
			border: var(--border-thin) solid var(--form-input-border);
			background-color: var(--form-input-bg);
			color: var(--form-input-fg);
			transition:
				background-color var(--transition-base) var(--ease-in-out),
				border-color var(--transition-base) var(--ease-in-out),
				color var(--transition-base) var(--ease-in-out),
				fill var(--transition-base) var(--ease-in-out),
				stroke var(--transition-base) var(--ease-in-out);
			user-select: none;

			.checkmark {
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				width: 0;
				height: 0;
				background-color: var(--form-input-selected-bg);
				color: var(--form-input-selected-fg);
				fill: var(--form-input-selected-bg);
				stroke: var(--form-input-selected-fg);
				transition:
					width var(--transition-base) var(--ease-in-out),
					height var(--transition-base) var(--ease-in-out);
			}
		}

		input {
			width: 0;
			height: 0;

			&:checked + .checkbox {
				background-color: var(--form-input-bg);
				border-color: var(--form-input-border);

				.checkmark {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
