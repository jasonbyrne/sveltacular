<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import TextArea from './text-area.svelte';

	const { Story } = defineMeta({
		component: TextArea,
		title: 'Forms/TextArea',
		tags: ['autodocs'],
		args: {
			onChange: fn(),
			onInput: fn()
		}
	});
</script>

<Story name="TextAreaSmall" args={{ placeholder: 'Placeholder text', rows: 3, size: 'sm' }} />

<Story name="TextAreaLarge" args={{ placeholder: 'Placeholder text', rows: 10, size: 'lg' }} />

<Story name="TextAreaWithLabel" args={{ placeholder: 'Placeholder text', rows: 10, label: 'Comments' }} />


