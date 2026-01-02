<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Wizard from './wizard.svelte';

	const { Story } = defineMeta({
		component: Wizard,
		title: 'Navigation/Wizard',
		tags: ['autodocs'],
		args: {
			onNext: fn(),
			onPrevious: fn(),
			onCancel: fn()
		}
	});
</script>

<Story name="Default" args={{ title: 'Create New Customer' }}>Wizard steps would be rendered here</Story>

<Story
	name="Errors"
	args={{
		title: 'Create New Customer',
		onNext: async () => ['Some field was not completed.', 'Another field was the wrong format.']
	}}
>
	Wizard steps would be rendered here
</Story>


