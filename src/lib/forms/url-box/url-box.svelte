<script lang="ts">
	import type { FormFieldSizeOptions } from '$src/lib/index.js';
	import type { HttpProtocol } from '$src/lib/types/generic.js';
	import TextBox from '../text-box/text-box.svelte';

	export let protocol: HttpProtocol = 'https';
	export let value: string | null = '';
	export let size: FormFieldSizeOptions = 'lg';
	export let placeholder = 'example.com';

	// On input, parse the value and set the protocol
	const onInput = () => {
		const cleanValue = value ?? '';
		const urlParts = cleanValue.split('://');
		if (['http', 'https'].includes(urlParts[0])) {
			protocol = urlParts[0] as HttpProtocol;
			value = urlParts[1];
		}
	};
</script>

<TextBox
	bind:value
	type="text"
	{placeholder}
	prefix={protocol + '://'}
	{size}
	on:input={onInput}
	on:change={onInput}
	allowSpaces={false}
>
	<slot />
</TextBox>
