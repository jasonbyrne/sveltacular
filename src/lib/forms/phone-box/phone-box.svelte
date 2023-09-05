<script lang="ts">
	import { uniqueId, type FormFieldSizeOptions } from '$src/lib/index.js';
	import { createEventDispatcher } from 'svelte';
	import FormField from '../form-field.svelte';
	import FormLabel from '../form-label.svelte';

	export let value: string;
	export let size: FormFieldSizeOptions = 'md';

	const id = uniqueId();
	const dispatch = createEventDispatcher<{ change: string }>();
	let areaCode: string;
	let localExt: string;
	let lastFour: string;

	const getTargetProperties = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const name = target.getAttribute('name');
		const nextId = name == 'areaCode' ? 'localExt' : name == 'localExt' ? 'lastFour' : 'areaCode';
		const prevId = name == 'areaCode' ? 'lastFour' : name == 'localExt' ? 'areaCode' : 'localExt';
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

	const publishChange = () => {
		value = cleanValue(`${areaCode}${localExt}${lastFour}`);
		dispatch('change', value);
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
		if (newValue.length >= props.maxLength) {
			if (props.nextInput) props.nextInput.focus();
		}
	};

	// Key down event handler, don't accept non-numeric characters
	const keyDown = (event: KeyboardEvent) => {
		const props = getTargetProperties(event);
		const isDelete = event.key === 'Delete' || event.key === 'Backspace';
		const isNumeric = !isNaN(Number(event.key));
		const isCursorHighlighting = props.target.selectionStart !== props.target.selectionEnd;
		const isAcceptable = isNumeric || isDelete;
		if (!isAcceptable) event.preventDefault();
		const newValue = (() => {
			if (isCursorHighlighting) {
				const start = props.target.selectionStart || 0;
				const end = props.target.selectionEnd || 0;
				return isDelete
					? props.value.slice(0, start) + props.value.slice(end)
					: props.value.slice(0, start) + event.key + props.value.slice(end);
			}
			return isDelete ? props.value.slice(0, -1) : props.value + event.key;
		})();
		if (newValue.length >= props.maxLength) {
			event.preventDefault();
			props.target.value = newValue.slice(0, props.maxLength);
			if (props.nextInput) props.nextInput.focus();
		}
		// If backspace and the length is now 0, focus the previous input
		if (isDelete && newValue.length === 0 && props.prevId) props.prevId.focus();
	};

	// Set the initial value
	setValue(value);

	$: areaCode || localExt || lastFour ? publishChange() : null;
</script>

<FormField {size}>
	{#if $$slots.default}
		<FormLabel id="{id}-areaCode"><slot /></FormLabel>
	{/if}
	<div class="input">
		<span class="areaCode segment">
			<span>(</span>
			<input
				id="{id}-areaCode"
				type="text"
				on:input={valueChanged}
				on:change={valueChanged}
				on:keypress={keyDown}
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
				on:input={valueChanged}
				on:change={valueChanged}
				on:keypress={keyDown}
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
				on:input={valueChanged}
				on:change={valueChanged}
				on:keypress={keyDown}
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
