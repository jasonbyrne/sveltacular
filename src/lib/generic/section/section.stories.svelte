<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Section from './section.svelte';
	import Header from '../header/header.svelte';
	import Divider from '../divider/divider.svelte';
</script>

<Meta title="Generic/Section" component={Section} />

<Story name="Default">
	<Section>
		<Header title="Section Title" />
		<p>Some content.</p>
	</Section>
	<Divider />
	<Section>
		<Header title="Section Title" />
		<p>Some content.</p>
	</Section>
</Story>

<Story name="Wtih Title Attribute">
	<Section title="Some Title">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vel, ducimus itaque veniam
			nostrum, nemo repellendus optio odit, in quam velit nesciunt? Fugiat eius est, impedit
			consectetur nisi atque laborum?
		</p>
	</Section>
	<Divider />
</Story>
