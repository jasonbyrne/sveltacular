<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Modal from './modal.svelte';
</script>

<Meta title="Modals/Modal" component={Modal} />

<Story name="Generic Modal">
	<Modal open>
		<p>Modal content</p>
	</Modal>
</Story>
