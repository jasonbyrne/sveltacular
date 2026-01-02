<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Popover from './popover.svelte';
	import Button from '$src/lib/forms/button/button.svelte';

	const { Story } = defineMeta({
		component: Popover,
		title: 'Generic/Popover',
		tags: ['autodocs']
	});
</script>

{#snippet triggerSnippet()}
	<Button label="Click me" />
{/snippet}

<Story name="Bottom" args={{ position: 'bottom', trigger: triggerSnippet }}>
	<div>Popover content goes here</div>
</Story>

<Story name="Top" args={{ position: 'top', trigger: triggerSnippet }}>
	<div>Popover content goes here</div>
</Story>
