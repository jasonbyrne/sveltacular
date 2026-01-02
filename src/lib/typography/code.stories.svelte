<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Code from './code.svelte';

	const { Story } = defineMeta({
		component: Code,
		title: 'Typography/Code',
		tags: ['autodocs']
	});
</script>

<Story name="Default">console.log('Hello, World!');</Story>

<Story name="ShortCommand">npm install</Story>

<Story name="Variable">const x = 42;</Story>

<Story name="LongCommand">npm install @storybook/addon-svelte-csf --save-dev</Story>

<Story name="FunctionCall">getUserById(123)</Story>

<Story name="ImportStatement">import &#123; Code &#125; from 'sveltacular';</Story>

<Story name="EnvironmentVariable">export NODE_ENV=production</Story>

<Story name="ArrayAccess">array[0]</Story>
