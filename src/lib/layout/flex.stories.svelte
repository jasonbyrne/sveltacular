<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FlexRow from './flex-row.svelte';

	const { Story } = defineMeta({
		component: FlexRow,
		title: 'Layout/Flex',
		tags: ['autodocs']
	});
</script>

<Story name="Normal">Flex content would go here</Story>

<Story name="DifferentSizes">Flex content with different sizes would go here</Story>

<Story name="DifferentSizesAlignMiddle" args={{ alignItems: 'center' }}>
	Flex content with different sizes aligned middle would go here
</Story>

<Story name="Wrap" args={{ alignItems: 'center', wrap: true }}
	>Flex content that wraps would go here</Story
>
