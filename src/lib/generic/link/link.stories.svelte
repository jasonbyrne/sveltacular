<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Link from './link.svelte';

	const { Story } = defineMeta({
		component: Link,
		title: 'Generic/Link',
		tags: ['autodocs']
	});
</script>

<Story name="Standard" args={{ href: 'https://www.google.com' }}>Google</Story>

<Story name="UnderlineOnHover" args={{ href: 'https://www.google.com', underline: 'hover' }}>Google</Story>

<Story name="UnderlineAlways" args={{ href: 'https://www.google.com', underline: 'always' }}>Google</Story>

<Story name="Disabled" args={{ href: 'https://www.google.com', disabled: true }}>Google</Story>


