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

<Story
	name="TextAreaWithLabel"
	args={{ placeholder: 'Placeholder text', rows: 10, label: 'Comments' }}
/>

<Story
	name="CharacterCounter"
	args={{
		placeholder: 'Tell us about yourself',
		label: 'Bio',
		showCharacterCount: true,
		maxlength: 200,
		helperText: 'Share a bit about who you are',
		value: 'I am a software developer passionate about creating user-friendly interfaces.',
		rows: 4
	}}
/>
