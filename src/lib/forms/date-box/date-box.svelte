<script lang="ts">
	import { addUnits, currentDateTime, isDateString, isDateOrDateTimeString, isDateTimeString } from '$src/lib/helpers/date.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { DateUnit, FormFieldSizeOptions } from '$src/lib/index.js';
	import Button from '../button/button.svelte';

	type DateIncrementStep = { label: string; value: number, unit: DateUnit };

	const id = uniqueId();

	let {
		value = $bindable(undefined as string | undefined | null),
		defaultValue = undefined,
		size = 'full' as FormFieldSizeOptions,
		placeholder = '',
		nullable = false,
		enabled = $bindable(true),
		type = 'date' as 'date' | 'datetime-local',
		required = false,
		steps = [] as DateIncrementStep[],
		onChange = undefined,
		onCheckChanged = undefined,
		label = undefined
	}: {
		value?: string | undefined | null;
		defaultValue?: string | undefined;
		size?: FormFieldSizeOptions;
		placeholder?: string;
		nullable?: boolean;
		enabled?: boolean;
		type?: 'date' | 'datetime-local';
		required?: boolean;
		steps?: DateIncrementStep[];
		onChange?: ((value: string | null) => void) | undefined;
		onCheckChanged?: ((enabled: boolean) => void) | undefined;
		label?: string;
	} = $props();

	const _defaultValue = defaultValue || value || currentDateTime();
	const getDefaultValue = () => {
		if (type === 'date') {
			return isDateString(_defaultValue) ? _defaultValue : currentDateTime().substring(0, 10);
		}
		return isDateTimeString(_defaultValue) ? _defaultValue : currentDateTime();
	};

	const checkChanged = () => {
		if (nullable) {
			value = enabled ? getDefaultValue() : '';
		}
		onCheckChanged?.(enabled);
		onInput();
	};

	const incrementValue = (step: DateIncrementStep) => {
		if (isDateOrDateTimeString(value)) {
			const newDate = addUnits(step.value, step.unit, value);
			newDate.setUTCDate(newDate.getUTCDate() + step.value);
			value = newDate.toISOString().substring(0, type === 'date' ? 10 : 19);
		}
	};

	const onInput = () => {
		onChange?.(enabled ? value : null);
	};

	if (!value) {
		if (nullable) enabled = false;
		else value = getDefaultValue();
	}
	let disabled = $derived(!enabled);
</script>

<FormField {size}>
	{#if label}
		<FormLabel {id} {required} {label} />
	{/if}
	<div class:nullable class:disabled>
		<span class="input">
			<input {...{ type }} {id} {placeholder} {disabled} bind:value {required} oninput={onInput} />
		</span>
		{#if nullable}
			<span class="toggle">
				<input type="checkbox" bind:checked={enabled} onchange={checkChanged} />
			</span>
		{/if}
		{#if steps.length > 0}
			<span class="steps">
				{#each steps as step}
					<Button noMargin={true} collapse={true} onclick={() => incrementValue(step)} label={step.label} />
				{/each}
			</span>
		{/if}
	</div>
</FormField>

<style lang="scss">
	input {
		width: 100%;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		border: 1px solid var(--form-input-border, black);
		background-color: var(--form-input-bg, white);
		color: var(--form-input-fg, black);
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
			color 0.2s ease-in-out, fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
		user-select: none;
		white-space: nowrap;

		&::placeholder {
			color: var(--form-input-placeholder, #a0aec0);
		}
	}

	div {
		display: flex;
		position: relative;
		gap: 0.5rem;

		.input {
			flex-grow: 1;
		}

		.steps {
			display: flex;
			gap: 0.25rem;
		}

		&.nullable {
			input {
				padding-left: 2.5rem;
			}

			.toggle {
				position: absolute;
				top: 0.7rem;
				left: 0.4rem;
			}
		}

		&.disabled {
			input {
				background-color: #f5f5f5;
				border-color: #e0e0e0;
				color: #a0a0a0;
			}
		}
	}
</style>
