<script lang="ts">
	import { untrack } from 'svelte';
	import { uniqueId, type FormFieldSizeOptions } from '$src/lib/index.js';
	import FormField, { type FormFieldFeedback } from '../form-field/form-field.svelte';
	import FormInputWrapper from '$src/lib/forms/form-input-wrapper';

	let {
		value = $bindable('' as string | null),
		size = 'md' as FormFieldSizeOptions,
		placeholder = '',
		onChange = undefined,
		onCheckChanged = undefined,
		label = undefined,
		helperText = undefined,
		feedback = undefined,
		disabled = false,
		required = false,
		readonly = false,
		nullable = false,
		nullText = ''
	}: {
		value?: string | null;
		size?: FormFieldSizeOptions;
		placeholder?: string;
		onChange?: ((value: string | null) => void) | undefined;
		onCheckChanged?: ((isChecked: boolean) => void) | undefined;
		label?: string;
		helperText?: string;
		feedback?: FormFieldFeedback;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		nullable?: boolean;
		nullText?: string;
	} = $props();

	const id = uniqueId();
	const fieldOrder = ['areaCode', 'localExt', 'lastFour'];
	let areaCode = $state('');
	let localExt = $state('');
	let lastFour = $state('');

	const getValueByField = (field: string) => {
		if (field === 'areaCode') return areaCode;
		if (field === 'localExt') return localExt;
		if (field === 'lastFour') return lastFour;
		return '';
	};

	const getValueByIndex = (index: number) => {
		return getValueByField(fieldOrder[index]);
	};

	const getTargetProperties = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const name = target.getAttribute('name');
		const currentIndex = fieldOrder.indexOf(name ?? 'areaCode');
		const nextId = currentIndex == 2 ? null : fieldOrder[currentIndex + 1];
		const prevId = currentIndex == 0 ? null : fieldOrder[currentIndex - 1];
		return {
			target,
			name,
			value: target.value,
			maxLength: Number(target.getAttribute('data-maxlength')),
			nextInput: document.getElementById(`${id}-${nextId}`),
			prevId: document.getElementById(`${id}-${prevId}`)
		};
	};

	const cleanValue = (value: string) => {
		return value.replace(/[^0-9]/g, '').slice(0, 10);
	};

	const getCombinedValue = () => {
		return cleanValue(`${areaCode}${localExt}${lastFour}`);
	};

	const publishChange = () => {
		const currentValue = !nullable || isChecked ? getCombinedValue() : null;
		value = currentValue;
		onChange?.(currentValue);
		return value;
	};

	const setValue = (value: string) => {
		const newValue = cleanValue(value);
		if (newValue.length == 7) {
			areaCode = '';
			localExt = newValue.slice(0, 3);
			lastFour = newValue.slice(3, 7);
		} else {
			areaCode = newValue.slice(0, 3);
			localExt = newValue.slice(3, 6);
			lastFour = newValue.slice(6, 10);
		}
	};

	// Only accept number input
	const valueChanged = (event: Event) => {
		const props = getTargetProperties(event);
		const newValue = cleanValue(props.value);
		// If they put in 10 digits, in any input, consider that the whole number
		if (newValue.length >= 10) return setValue(newValue);
		// If they put in 7 or more digits in the localExt input, flow the second 4 to the lastFour input
		if (props.name == 'localExt' && newValue.length >= 7) {
			return setValue(`${areaCode}${newValue}`);
		}
		// Otherwise, just accept it into the current input
		props.target.value = newValue.slice(0, props.maxLength);
		// Then focus on the next input
		if (newValue.length >= props.maxLength && props.nextInput) {
			props.nextInput.focus();
		}
	};

	// Key down event handler, don't accept non-numeric characters
	const keyUp = (event: KeyboardEvent) => {
		const props = getTargetProperties(event);
		const isBackspace = event.key === 'Backspace';
		const isDelete = event.key === 'Delete';
		const isBackspaceOrDelete = isBackspace || isDelete;
		const isNumeric = !isNaN(Number(event.key));
		const isCursorHighlighting = props.target.selectionStart !== props.target.selectionEnd;
		const isAcceptable = isNumeric || isBackspaceOrDelete;
		const isRightArrow = event.key === 'ArrowRight' || event.key === 'Tab';
		const isLeftArrow = event.key === 'ArrowLeft';
		// If they are trying to move the cursor, let them
		if (isRightArrow || isLeftArrow) return;
		// Do not allow any non-numeric characters
		if (!isAcceptable) event.preventDefault();
		// Parse what they typed and update the value
		const newValue = (() => {
			if (isCursorHighlighting) {
				const start = props.target.selectionStart || 0;
				const end = props.target.selectionEnd || 0;
				return isBackspaceOrDelete
					? props.value.slice(0, start) + props.value.slice(end)
					: props.value.slice(0, start) + event.key + props.value.slice(end);
			}
			return props.value;
		})();
		if (newValue.length >= props.maxLength) {
			props.target.value = newValue.slice(0, props.maxLength);
			if (props.nextInput) props.nextInput.focus();
		}
		// If backspace and the length is now 0, focus the previous input
		if (isBackspace) {
			if (newValue.length === 0 && props.prevId) {
				props.prevId.focus();
			}
		}
	};

	// Track whether the nullable checkbox is checked (i.e., whether field has a value)
	let isChecked = $state(untrack(() => !!value));

	// Remember the last non-null value so we can restore it when re-checking
	let lastValue = $state<string | undefined>(undefined);

	// Derive the actual disabled state: disabled prop OR (nullable and unchecked)
	let inputDisabled = $derived(disabled || (nullable && !isChecked));

	let showInput = $derived(!nullable || isChecked);

	let effectiveNullText = $derived(nullText || '(___) ___-____');

	const checkChanged = () => {
		if (nullable) {
			if (isChecked) {
				// Restore last value if available, otherwise use empty string
				const restoreValue = lastValue || '';
				setValue(restoreValue);
			} else {
				// Store current value before clearing
				const currentValue = getCombinedValue();
				if (currentValue) {
					lastValue = currentValue;
				}
				areaCode = '';
				localExt = '';
				lastFour = '';
				value = null;
			}
		}
		onCheckChanged?.(isChecked);
	};

	// Set the initial value
	setValue(value ?? '');

	$effect(() => {
		if (!value) {
			// Use untrack to prevent writes to isChecked/value from triggering this effect again
			untrack(() => {
				if (nullable) isChecked = false;
			});
		} else {
			// Initialize lastValue if we have an initial value
			if (!lastValue) {
				lastValue = value;
			}
		}
	});

	$effect(() => {
		// Only trigger when the phone number parts change
		const hasValue = areaCode || localExt || lastFour;
		if (hasValue) {
			// Use untrack to prevent value changes from triggering this effect again
			untrack(() => {
				publishChange();
			});
		}
	});
</script>

<FormField {size} {label} id="{id}-areaCode" {required} {disabled} {helperText} {feedback}>
	<FormInputWrapper
		{disabled}
		{nullable}
		nullText={effectiveNullText}
		onCheckChanged={checkChanged}
	>
		<span class="areaCode segment">
			<span>(</span>
			<input
				id="{id}-areaCode"
				type="text"
				{placeholder}
				oninput={valueChanged}
				onkeyup={keyUp}
				onchange={valueChanged}
				bind:value={areaCode}
				name="areaCode"
				data-maxlength="3"
				disabled={inputDisabled}
				{readonly}
				{required}
			/>
			<span>)</span>
		</span>
		<span class="localExt segment">
			<input
				id="{id}-localExt"
				type="text"
				{placeholder}
				oninput={valueChanged}
				onchange={valueChanged}
				onkeyup={keyUp}
				bind:value={localExt}
				name="localExt"
				data-maxlength="3"
				disabled={inputDisabled}
				{readonly}
				{required}
			/>
		</span>
		<span class="lastFour segment">
			<span>-</span>
			<input
				id="{id}-lastFour"
				type="text"
				{placeholder}
				oninput={valueChanged}
				onchange={valueChanged}
				onkeyup={keyUp}
				bind:value={lastFour}
				name="lastFour"
				data-maxlength="4"
				disabled={inputDisabled}
				{readonly}
				{required}
			/>
		</span>
	</FormInputWrapper>
</FormField>

<style lang="scss">
	.segment {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
	}

	.areaCode {
		flex-basis: 100px;
		padding-left: var(--spacing-base);
	}

	.localExt {
		flex-basis: 80px;
	}

	.lastFour {
		flex-basis: 140px;
	}

	input {
		background-color: transparent;
		border: none;
		line-height: 2rem;
		font-size: var(--font-md);
		width: 100%;
		flex-grow: 1;
		padding: 0;
		margin: 0;
		text-align: center;
		color: inherit;

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

		&:read-only {
			cursor: default;
		}
	}
</style>
