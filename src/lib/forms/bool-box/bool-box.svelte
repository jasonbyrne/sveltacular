<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ListBox from '../list-box/list-box.svelte';
	import type { FormFieldSizeOptions } from '$src/lib/index.js';

	const dispatch = createEventDispatcher<{ change: boolean }>();

	export let value: boolean = false;
	export let options: [yes: string, no: string] = ['Yes', 'No'];
	export let size: FormFieldSizeOptions = 'md';
	let stringValue = value ? 'true' : 'false';

	const onChange = () => {
		value = stringValue == 'true';
		dispatch('change', value);
	};

	$: items = [
		{ value: 'true', name: options[0] },
		{ value: 'false', name: options[1] }
	];
</script>

<ListBox {items} bind:value={stringValue} {size} on:change={onChange}><slot /></ListBox>
