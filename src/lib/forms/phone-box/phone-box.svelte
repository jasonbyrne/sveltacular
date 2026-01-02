<script lang="ts">
	import { uniqueId, type FormFieldSizeOptions } from '$src/lib/index.js';
	import FormField from '../form-field.svelte';
	import FormLabel from '../form-label.svelte';

	let {
		value = $bindable('' as string | null),
		size = 'md' as FormFieldSizeOptions,
		onChange = undefined,
		label = undefined
	}: {
		value?: string | null;
		size?: FormFieldSizeOptions;
		onChange?: ((value: string) => void) | undefined;
		label?: string;
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
		value = getCombinedValue();
		onChange?.(value);
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

	// Set the initial value
	setValue(value ?? '');

	$effect(() => {
		if (areaCode || localExt || lastFour) {
			publishChange();
		}
	});
</script>

<FormField {size}>
	{#if label}
		<FormLabel id="{id}-areaCode" {label} />
	{/if}
	<div class="input">
		<span class="areaCode segment">
			<span>(</span>
			<input
				id="{id}-areaCode"
				type="text"
				oninput={valueChanged}
				onkeyup={keyUp}
				onchange={valueChanged}
				bind:value={areaCode}
				name="areaCode"
				data-maxlength="3"
			/>
			<span>)</span>
		</span>
		<span class="localExt segment">
			<input
				id="{id}-localExt"
				type="text"
				oninput={valueChanged}
				onchange={valueChanged}
				onkeyup={keyUp}
				bind:value={localExt}
				name="localExt"
				data-maxlength="3"
			/>
		</span>
		<span class="lastFour segment">
			<span>-</span>
			<input
				id="{id}-lastFour"
				type="text"
				oninput={valueChanged}
				onchange={valueChanged}
				onkeyup={keyUp}
				bind:value={lastFour}
				name="lastFour"
				data-maxlength="4"
			/></span
		>
	</div>
</FormField>

<style lang="scss">
	.input {
		background-color: var(--form-input-bg, #fff);
		color: var(--form-input-fg, #000);
		font-size: 1rem;
		width: 100%;
		padding-left: 0.5rem;
		border: solid 1px var(--form-input-border, black);
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.5rem;

		.segment {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.areaCode {
			flex-basis: 100px;
		}

		.localExt {
			flex-basis: 80px;
		}

		.lastFour {
			flex-basis: 140px;
		}

		input {
			line-height: 2rem;
			flex-grow: 1;
			font-size: 1rem;
			border: none;
			background-color: transparent;
			color: inherit;
			padding: 0;
			margin: 0;
			text-align: center;
			width: 100%;

			&:focus {
				outline: none;
			}
		}
	}
</style>
