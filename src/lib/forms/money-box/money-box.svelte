<script lang="ts">
	import type { FormFieldSizeOptions } from '$src/lib/index.js';
	import NumberBox from '../number-box/number-box.svelte';

	export let value: number | null;
	export let symbol = '$';
	export let allowCents = false;
	export let placeholder = '';
	export let size: FormFieldSizeOptions = 'full';
	export let step = 1;
	export let min = 0;
	export let max = 1000000;
	export let isCents = false;

	let innerValue: number | null = isCents && value ? Math.round(value / 100) : value;
	$: decimals = allowCents ? 2 : 0;

	const onChange = (e: CustomEvent<number | null>) => {
		const dollars = e.detail;
		if (dollars !== null) value = isCents ? Math.round(dollars * 100) : dollars;
	};
</script>

<NumberBox bind:value={innerValue} prefix={symbol} {decimals} {placeholder} {size} {min} {max} {step} on:change={onChange}>
	<slot />
</NumberBox>
