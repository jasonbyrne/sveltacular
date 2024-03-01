<script lang="ts">
	import { addUnits, currentDateTime, isDateString, isDateOrDateTimeString, isDateTimeString } from '$src/lib/helpers/date.js';
	import { uniqueId } from '$src/lib/helpers/unique-id.js';
	import FormField from '$src/lib/forms/form-field.svelte';
	import FormLabel from '$src/lib/forms/form-label.svelte';
	import type { DateUnit, FormFieldSizeOptions } from '$src/lib/index.js';
	import Button from '../button/button.svelte';
	import { createEventDispatcher } from 'svelte';

	type DateIncrementStep = { label: string; value: number, unit: DateUnit };

	const id = uniqueId();

	export let value: string | undefined | null = undefined;
	export let defaultValue: string | undefined = undefined;
	export let size: FormFieldSizeOptions = 'full';
	export let placeholder = '';
	export let nullable = false;
	export let enabled = true;
	export let type: 'date' | 'datetime-local' = 'date';
	export let required = false;
	export let steps: DateIncrementStep[] = [];

	const dipatch = createEventDispatcher<{ value: string | null, checkChanged: boolean }>();

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
		dipatch('checkChanged', enabled);
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
		dipatch('value', enabled ? value : null);
	};

	if (!value) {
		if (nullable) enabled = false;
		else value = getDefaultValue();
	}
	$: disabled = !enabled;
</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel {id} {required}><slot /></FormLabel>
	{/if}
	<div class:nullable class:disabled>
		<span class="input">
			<input {...{ type }} {id} {placeholder} {disabled} bind:value {required} on:input={onInput} />
		</span>
		{#if nullable}
			<span class="toggle">
				<input type="checkbox" bind:checked={enabled} on:change={checkChanged} />
			</span>
		{/if}
		{#if steps.length > 0}
			<span class="steps">
				{#each steps as step}
					<Button noMargin={true} collapse={true} on:click={() => incrementValue(step)}>{step.label}</Button>
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
