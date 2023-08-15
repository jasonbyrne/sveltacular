<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Numberbox from './numberbox.svelte';
</script>

<Meta title="Number Input" component={Numberbox} />

<Template let:args>
	<Numberbox {...args}>Value</Numberbox>
</Template>

<Story name="Stanard" args={{ placeholder: 'Enter a Number', type: 'number' }} />

<Story
	name="Currency"
	args={{ placeholder: 'Price of tea in china', type: 'currency', decimals: 0, symbol: '$' }}
/>
