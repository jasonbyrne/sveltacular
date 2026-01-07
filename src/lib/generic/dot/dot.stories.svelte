<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Dot from './dot.svelte';

	const { Story } = defineMeta({
		component: Dot,
		title: 'Generic/Dot',
		tags: ['autodocs']
	});
</script>

<Story name="Standard" args={{}} />

<Story name="XLarge" args={{ size: 'xl', color: 'red' }} />
