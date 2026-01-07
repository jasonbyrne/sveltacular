<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import Modal from './modal.svelte';

	const { Story } = defineMeta({
		component: Modal,
		title: 'Modals/Modal',
		tags: ['autodocs'],
		args: {
			onClose: fn()
		}
	});
</script>

<Story name="GenericModal" args={{ open: true }}>Modal content</Story>

<Story name="NonDismissable" args={{ open: true, dismissable: false }}>Modal content</Story>

<Story name="ModalSmall" args={{ open: true, size: 'sm' }}>Modal content with header and body</Story
>

<Story name="ModalMedium" args={{ open: true, size: 'md' }}
	>Modal content with header and body</Story
>

<Story name="ModalLarge" args={{ open: true, size: 'lg' }}>Modal content with header and body</Story
>

<Story name="ModalExtraLarge" args={{ open: true, size: 'xl' }}
	>Modal content with header and body</Story
>

<Story name="ModalFullWidth" args={{ open: true, size: 'full' }}
	>Modal content with header and body</Story
>
