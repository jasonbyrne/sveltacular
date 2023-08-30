<script lang="ts">
	import type { FormFieldSizeOptions } from '$src/lib/index.js';
	import NumberBox from '../number-box/number-box.svelte';

	export let value: number;
	export let symbol = '$';
	export let allowCents = false;
	export let placeholder = '';
	export let size: FormFieldSizeOptions = 'full';
	export let step = 1;
	export let min = 0;
	export let max = 1000000;

	$: decimals = allowCents ? 2 : 0;
</script>

<NumberBox bind:value prefix={symbol} {decimals} {placeholder} {size} {min} {max} {step}
	><slot /></NumberBox
>
