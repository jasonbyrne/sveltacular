<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './avatar.svelte';

	const { Story } = defineMeta({
		component: Avatar,
		title: 'Generic/Avatar',
		tags: ['autodocs']
	});
</script>

<Story name="WithImage" args={{ src: '/sveltacular.png', alt: 'Avatar' }} />

<Story name="WithName" args={{ name: 'John Doe' }} />

<Story name="Placeholder" />

<Story name="Small" args={{ name: 'JD', size: 'sm' }} />

<Story name="Large" args={{ name: 'John Doe', size: 'lg' }} />











