<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Card from './card.svelte';
</script>

<Meta title="Generic/Card" component={Card} />

<Story name="Default">
	<Card title="Card Number One">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis voluptates, voluptatum alias
		recusandae corrupti unde dicta. Aliquam cupiditate quaerat iure, voluptatibus a quibusdam. Quae
		voluptas dolor ipsa, accusantium numquam aut.
	</Card>
	<Card title="Card Number 2"
		>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis voluptates, voluptatum alias
		recusandae corrupti unde dicta. Aliquam cupiditate quaerat iure, voluptatibus a quibusdam. Quae
		voluptas dolor ipsa, accusantium numquam aut.</Card
	>
</Story>

<Story name="Large Links">
	<Card title="Card Number One" href="https://www.google.com" size="lg">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis voluptates, voluptatum alias
		recusandae corrupti unde dicta. Aliquam cupiditate quaerat iure, voluptatibus a quibusdam. Quae
		voluptas dolor ipsa, accusantium numquam aut.
	</Card>
	<Card title="Card Number 2" href="https://www.google.com" size="lg">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis voluptates, voluptatum alias
		recusandae corrupti unde dicta. Aliquam cupiditate quaerat iure, voluptatibus a quibusdam. Quae
		voluptas dolor ipsa, accusantium numquam aut.</Card
	>
</Story>

<Story name="Full">
	<Card title="Card Number One" size="full">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis voluptates, voluptatum alias
		recusandae corrupti unde dicta. Aliquam cupiditate quaerat iure, voluptatibus a quibusdam. Quae
		voluptas dolor ipsa, accusantium numquam aut.
	</Card>
	<Card title="Card Number 2" size="full">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis voluptates, voluptatum alias
		recusandae corrupti unde dicta. Aliquam cupiditate quaerat iure, voluptatibus a quibusdam. Quae
		voluptas dolor ipsa, accusantium numquam aut.</Card
	>
</Story>
