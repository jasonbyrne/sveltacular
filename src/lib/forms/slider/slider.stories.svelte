<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Slider from './slider.svelte';

	const { Story } = defineMeta({
		component: Slider,
		title: 'Forms/Slider',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ label: 'Volume', value: 50, min: 0, max: 100 }} />

<Story name="WithSteps" args={{ label: 'Rating', value: 3, min: 1, max: 5, step: 1 }} />

<Story name="Disabled" args={{ label: 'Volume', value: 30, disabled: true }} />


