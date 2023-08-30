<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import NumberBox from './number-box.svelte';
</script>

<Meta title="Forms/NumberBox" component={NumberBox} />

<Template let:args>
	<NumberBox {...args}>Value</NumberBox>
</Template>

<Story name="Stanard" args={{ placeholder: 'Enter a Number', type: 'number' }} />

<Story
	name="Currency"
	args={{ placeholder: 'Price of tea in china', type: 'currency', decimals: 0, prefix: '$' }}
/>

<Story
	name="Units"
	args={{ placeholder: 'Enter your weight', type: 'number', decimals: 0, suffix: 'pounds' }}
/>

<Story
	name="Decimals"
	args={{ placeholder: 'Enter your weight', type: 'number', decimals: 2, step: 0.01, suffix: 'kg' }}
/>
