<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InfoBox from './info-box.svelte';

	const { Story } = defineMeta({
		component: InfoBox,
		title: 'Forms/InfoBox',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ value: 'Some text goes here', label: 'Some Label' }} />

<Story name="WithLink" args={{ value: 'Some text goes here', href: 'https://www.google.com', label: 'Some Label' }} />


