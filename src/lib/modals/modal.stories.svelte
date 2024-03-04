<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Modal from './modal.svelte';
	import DialogHeader from './dialog-header.svelte';
	import DialogBody from './dialog-body.svelte';
</script>

<Meta title="Modals/Modal" component={Modal} />

<Story name="Generic Modal">
	<Modal open>
		<p>Modal content</p>
	</Modal>
</Story>


<Story name="Non-Dismissable">
	<Modal open dismissable={false}>
		<p>Modal content</p>
	</Modal>
</Story>

<Story name="Modal (Small)">
	<Modal open size="sm">
		<DialogHeader>Title</DialogHeader>
		<DialogBody>
			<p>Modal content</p>
		</DialogBody>
	</Modal>
</Story>

<Story name="Modal (Medium)">
	<Modal open size="md">
		<DialogHeader>Title</DialogHeader>
		<DialogBody>
			<p>Modal content</p>
		</DialogBody>
	</Modal>
</Story>

<Story name="Modal (Large)">
	<Modal open size="lg">
		<DialogHeader>Title</DialogHeader>
		<DialogBody>
			<p>Modal content</p>
		</DialogBody>
	</Modal>
</Story>

<Story name="Modal (Extra Large)">
	<Modal open size="xl">
		<DialogHeader>Title</DialogHeader>
		<DialogBody>
			<p>Modal content</p>
		</DialogBody>
	</Modal>
</Story>

<Story name="Modal (Full Width)">
	<Modal open size="full">
		<DialogHeader>Title</DialogHeader>
		<DialogBody>
			<p>Modal content</p>
		</DialogBody>
	</Modal>
</Story>
