<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './card.svelte';

	const { Story } = defineMeta({
		component: Card,
		title: 'Generic/Card',
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ title: 'Card Number One' }}>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis voluptates, voluptatum alias
	recusandae corrupti unde dicta. Aliquam cupiditate quaerat iure, voluptatibus a quibusdam. Quae
	voluptas dolor ipsa, accusantium numquam aut.
</Story>

<Story name="WithTitleOnly" args={{ title: 'Card Number One', size: 'full' }} />

<Story
	name="LargeLinks"
	args={{ title: 'Card Number One', href: 'https://www.google.com', size: 'lg' }}
>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis voluptates, voluptatum alias
	recusandae corrupti unde dicta. Aliquam cupiditate quaerat iure, voluptatibus a quibusdam. Quae
	voluptas dolor ipsa, accusantium numquam aut.
</Story>

<Story name="Full" args={{ title: 'Card Number One', size: 'full' }}>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis voluptates, voluptatum alias
	recusandae corrupti unde dicta. Aliquam cupiditate quaerat iure, voluptatibus a quibusdam. Quae
	voluptas dolor ipsa, accusantium numquam aut.
</Story>
