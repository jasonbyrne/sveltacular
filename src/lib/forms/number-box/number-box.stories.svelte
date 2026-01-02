<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import NumberBox from './number-box.svelte';

	const { Story } = defineMeta({
		component: NumberBox,
		title: 'Forms/NumberBox',
		tags: ['autodocs'],
		args: {
			onChange: fn(),
			onInput: fn()
		}
	});
</script>

<Story name="Standard" args={{ placeholder: 'Enter a Number', type: 'number', label: 'Value' }} />

<Story name="Currency" args={{ placeholder: 'Price of tea in china', type: 'currency', decimals: 0, prefix: '$', label: 'Value' }} />

<Story name="Units" args={{ placeholder: 'Enter your weight', type: 'number', decimals: 0, suffix: 'pounds', label: 'Value' }} />

<Story name="Decimals" args={{ placeholder: 'Enter your weight', type: 'number', decimals: 2, step: 0.01, suffix: 'kg', label: 'Value' }} />


