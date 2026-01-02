<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './card.svelte';

	/**
	 * Card component for displaying content in a contained box.
	 *
	 * **Accessibility**: Cards with href use proper link semantics.
	 * Ensure card content is readable by screen readers.
	 *
	 * **Usage**:
	 * ```svelte
	 * <Card title="Card Title" href="/details">
	 *   Card content goes here
	 * </Card>
	 * ```
	 */
	const { Story } = defineMeta({
		component: Card,
		title: 'Generic/Card',
		tags: ['autodocs'],
		argTypes: {
			title: {
				control: 'text',
				description: 'Card title',
				table: {
					type: { summary: 'string' }
				}
			},
			href: {
				control: 'text',
				description: 'Optional link URL - makes card clickable',
				table: {
					type: { summary: 'string | undefined' }
				}
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
				description: 'Size of the card',
				table: {
					type: { summary: 'ComponentSize' }
				}
			}
		}
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
