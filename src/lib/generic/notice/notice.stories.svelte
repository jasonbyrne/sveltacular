<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Notice from './notice.svelte';

	const noticeMessage =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam molestiae sit, nesciunt maxime illo assumenda accusantium aut tempora voluptatibus quisquam odit dolores quia voluptatum eos quos, ad provident modi!';

	const { Story } = defineMeta({
		component: Notice,
		title: 'Generic/Notice',
		tags: ['autodocs'],
		args: {
			onDismiss: fn()
		}
	});
</script>

<Story name="Standard" args={{ title: 'Notice Title' }}>Notice Message</Story>

<Story name="WithoutTitle">Notice Message</Story>

<Story name="Success" args={{ title: 'Notice Title', variant: 'success' }}>
	{noticeMessage}
</Story>

<Story name="Error" args={{ title: 'Notice Title', variant: 'error' }}>
	{noticeMessage}
</Story>

<Story name="Outline" args={{ title: 'Notice Title', variant: 'outline' }}>
	{noticeMessage}
</Story>

<Story name="Attention" args={{ title: 'Notice Title', variant: 'attention' }}>
	{noticeMessage}
</Story>

<Story name="Info" args={{ title: 'Notice Title', variant: 'info' }}>
	{noticeMessage}
</Story>

<Story name="ExtraLarge" args={{ title: 'Notice Title', size: 'xl' }}>
	{noticeMessage}
</Story>

<Story name="Large" args={{ title: 'Notice Title', size: 'lg' }}>
	{noticeMessage}
</Story>

<Story name="Medium" args={{ title: 'Notice Title', size: 'md' }}>
	{noticeMessage}
</Story>

<Story name="Small" args={{ title: 'Notice Title', size: 'sm' }}>Just a small alert message.</Story>

<Story
	name="Dismissable"
	args={{
		title: 'New Post Saved',
		variant: 'success',
		size: 'md',
		dismissable: true
	}}
>
	Your change have been saved.
</Story>

<Story
	name="AutoDismiss"
	args={{
		title: 'New Post Saved',
		variant: 'success',
		size: 'md',
		dismissable: true,
		dismissMilliseconds: 2000
	}}
>
	Your change have been saved.
</Story>
