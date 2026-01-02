<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CodeBlock from './code-block.svelte';

	const { Story } = defineMeta({
		component: CodeBlock,
		title: 'Typography/CodeBlock',
		tags: ['autodocs']
	});
</script>

<Story name="Default">const lang = "JavaScript";</Story>


