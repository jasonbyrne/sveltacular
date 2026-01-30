<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Section from './section.svelte';
	import Header from '../header/header.svelte';
	import Button from '$src/lib/forms/button/button.svelte';

	const { Story } = defineMeta({
		component: Section,
		title: 'Generic/Section',
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<Header level={1} title="Section Component" />
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel, ducimus itaque veniam
		nostrum, nemo repellendus optio odit, in quam velit nesciunt? Fugiat eius est, impedit
		consectetur nisi atque laborum?
	</p>
	<Button>Click Me</Button>
</Story>

<Story name="WithTitleAttribute" args={{ title: 'Some Title' }}>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel, ducimus itaque veniam
	nostrum, nemo repellendus optio odit, in quam velit nesciunt? Fugiat eius est, impedit consectetur
	nisi atque laborum?
</Story>
