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
			margin-left: 0.5em;
			font-size: 1rem;
			line-height: 2rem;
		}

		.checkbox {
			position: relative;
			display: block;
			width: 1rem;
			height: 1rem;
			border: 1px solid var(--form-input-border, black);
			background-color: var(--form-input-bg, white);
			color: var(--form-input-fg, black);
			transition:
				background-color 0.2s ease-in-out,
				border-color 0.2s ease-in-out,
				color 0.2s ease-in-out,
				fill 0.2s ease-in-out,
				stroke 0.2s ease-in-out;
			user-select: none;

			.checkmark {
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				width: 0;
				height: 0;
				background-color: var(--form-input-selected-bg, #3182ce);
				color: var(--form-input-selected-fg, white);
				fill: var(--form-input-selected-bg, #3182ce);
				stroke: var(--form-input-selected-fg, white);
				transition:
					width 0.2s ease-in-out,
					height 0.2s ease-in-out;
			}
		}

		input {
			width: 0;
			height: 0;

			&:checked + .checkbox {
				background-color: var(--form-input-bg, white);
				border-color: var(--form-input-border, black);

				.checkmark {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
