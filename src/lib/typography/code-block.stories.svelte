<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CodeBlock from './code-block.svelte';

	const { Story } = defineMeta({
		component: CodeBlock,
		title: 'Typography/CodeBlock',
		tags: ['autodocs']
	});
</script>

<Story name="Default">const greeting = "Hello, World!";</Story>

<Story name="JavaScript" args={{ lang: 'js' }}>const x = 42;</Story>

<Story name="TypeScript" args={{ lang: 'ts' }}>const greeting: string = "Hello";</Story>

<Story name="Python" args={{ lang: 'python' }}>print("Hello, World!")</Story>

<Story name="HTML" args={{ lang: 'html' }}>Hello World</Story>


