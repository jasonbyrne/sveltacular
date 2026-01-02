<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Loading from './loading.svelte';

	const { Story } = defineMeta({
		component: Loading,
		title: 'Placeholders/Loading',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{}}>Loading...</Story>

<Story name="Spinner" args={{ type: 'spinner' }}>Loading...</Story>

<Story name="ContentBlock" args={{ type: 'block' }}>Loading Content...</Story>


